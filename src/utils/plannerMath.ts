import { PlacedFurniture, RoomDimensions } from '../types/office';

export interface HistoryState<T> {
  past: T[];
  present: T;
  future: T[];
}

export interface BoundingBox {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
}

/**
 * Clamp room dimension to safe architectural learning bounds (2.5m - 15m).
 */
export function clampRoomDimension(value: number, min = 2.5, max = 15): number {
  if (!Number.isFinite(value)) return min;
  return Math.round(Math.min(max, Math.max(min, value)) * 10) / 10;
}

/**
 * Computes axis-aligned bounding box (in meters) for a placed furniture item,
 * accounting for its scale and rotation.
 */
export function getFurnitureBounds(item: PlacedFurniture): BoundingBox {
  const w = item.widthM * item.scale;
  const d = item.depthM * item.scale;
  const rad = (item.rotationDeg * Math.PI) / 180;
  const cos = Math.abs(Math.cos(rad));
  const sin = Math.abs(Math.sin(rad));

  const halfW = (w * cos + d * sin) / 2;
  const halfD = (w * sin + d * cos) / 2;

  return {
    minX: item.xM - halfW,
    maxX: item.xM + halfW,
    minY: item.yM - halfD,
    maxY: item.yM + halfD,
  };
}

/**
 * Clamps a furniture item's center position so its rotated bounding box stays
 * cleanly inside the room's walls.
 */
export function clampFurnitureToRoom(
  item: PlacedFurniture,
  room: RoomDimensions
): PlacedFurniture {
  const bounds = getFurnitureBounds(item);
  const halfW = (bounds.maxX - bounds.minX) / 2;
  const halfD = (bounds.maxY - bounds.minY) / 2;

  const minCenterX = Math.min(halfW, room.widthM / 2);
  const maxCenterX = Math.max(room.widthM - halfW, room.widthM / 2);
  const minCenterY = Math.min(halfD, room.lengthM / 2);
  const maxCenterY = Math.max(room.lengthM - halfD, room.lengthM / 2);

  const clampedX = Math.min(maxCenterX, Math.max(minCenterX, item.xM));
  const clampedY = Math.min(maxCenterY, Math.max(minCenterY, item.yM));

  return {
    ...item,
    xM: Math.round(clampedX * 100) / 100,
    yM: Math.round(clampedY * 100) / 100,
  };
}

/**
 * Checks whether two furniture items overlap significantly (ignoring minor 4cm touch tolerances).
 */
export function doItemsOverlap(a: PlacedFurniture, b: PlacedFurniture, toleranceM = 0.04): boolean {
  const boxA = getFurnitureBounds(a);
  const boxB = getFurnitureBounds(b);

  const overlapX = Math.min(boxA.maxX, boxB.maxX) - Math.max(boxA.minX, boxB.minX);
  const overlapY = Math.min(boxA.maxY, boxB.maxY) - Math.max(boxA.minY, boxB.minY);

  return overlapX > toleranceM && overlapY > toleranceM;
}

/**
 * Counts how many pairs of furniture items overlap in the room.
 */
export function countOverlaps(items: PlacedFurniture[]): number {
  let count = 0;
  for (let i = 0; i < items.length; i++) {
    for (let j = i + 1; j < items.length; j++) {
      if (doItemsOverlap(items[i], items[j])) {
        count++;
      }
    }
  }
  return count;
}

/**
 * Calculates total room area, occupied furniture footprint, and free circulation ratio.
 */
export function calculateSpaceMetrics(
  items: PlacedFurniture[],
  room: RoomDimensions
): {
  roomAreaM2: number;
  usedAreaM2: number;
  freeAreaM2: number;
  circulationPercent: number;
} {
  const roomAreaM2 = Math.max(1, room.widthM * room.lengthM);
  const rawUsed = items.reduce(
    (sum, item) => sum + item.widthM * item.scale * (item.depthM * item.scale),
    0
  );
  const usedAreaM2 = Math.min(roomAreaM2, Math.round(rawUsed * 100) / 100);
  const freeAreaM2 = Math.max(0, Math.round((roomAreaM2 - usedAreaM2) * 100) / 100);
  const circulationPercent = Math.max(
    0,
    Math.min(100, Math.round((freeAreaM2 / roomAreaM2) * 100))
  );

  return {
    roomAreaM2: Math.round(roomAreaM2 * 100) / 100,
    usedAreaM2,
    freeAreaM2,
    circulationPercent,
  };
}

/**
 * Pure Undo/Redo history helpers.
 */
export function createHistory<T>(initial: T): HistoryState<T> {
  return { past: [], present: initial, future: [] };
}

export function pushHistory<T>(history: HistoryState<T>, next: T, maxSteps = 40): HistoryState<T> {
  const past = [...history.past, history.present];
  if (past.length > maxSteps) past.shift();
  return {
    past,
    present: next,
    future: [],
  };
}

export function undoHistory<T>(history: HistoryState<T>): HistoryState<T> {
  if (history.past.length === 0) return history;
  const previous = history.past[history.past.length - 1];
  return {
    past: history.past.slice(0, -1),
    present: previous,
    future: [history.present, ...history.future],
  };
}

export function redoHistory<T>(history: HistoryState<T>): HistoryState<T> {
  if (history.future.length === 0) return history;
  const next = history.future[0];
  return {
    past: [...history.past, history.present],
    present: next,
    future: history.future.slice(1),
  };
}
