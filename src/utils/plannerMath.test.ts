import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateSpaceMetrics,
  clampFurnitureToRoom,
  clampRoomDimension,
  countOverlaps,
  createHistory,
  doItemsOverlap,
  pushHistory,
  redoHistory,
  undoHistory,
} from './plannerMath';
import { PlacedFurniture } from '../types/office';

const makeDesk = (id: string, xM: number, yM: number, rotationDeg = 0): PlacedFurniture => ({
  id,
  kind: 'meja-kerja',
  label: 'Meja Kerja',
  xM,
  yM,
  widthM: 1.4,
  depthM: 0.7,
  rotationDeg,
  scale: 1,
  color: '#8B5A2B',
});

test('clampRoomDimension keeps values within 2.5m..15m', () => {
  assert.equal(clampRoomDimension(1), 2.5);
  assert.equal(clampRoomDimension(20), 15);
  assert.equal(clampRoomDimension(4.56), 4.6);
});

test('clampFurnitureToRoom prevents furniture from extending outside walls', () => {
  const room = { widthM: 4, lengthM: 5 };
  const clamped = clampFurnitureToRoom(makeDesk('d1', 0.1, 4.9), room);
  assert.ok(clamped.xM >= 0.7);
  assert.ok(clamped.yM <= 4.65);
});

test('doItemsOverlap detects colliding desks and allows separated desks', () => {
  const a = makeDesk('a', 2, 2);
  const b = makeDesk('b', 2.2, 2.1);
  const c = makeDesk('c', 4, 4);
  assert.equal(doItemsOverlap(a, b), true);
  assert.equal(doItemsOverlap(a, c), false);
  assert.equal(countOverlaps([a, b, c]), 1);
});

test('calculateSpaceMetrics computes room area and circulation percent', () => {
  const room = { widthM: 4, lengthM: 5 }; // 20 m2
  const desk = makeDesk('d1', 2, 2); // 1.4 * 0.7 = 0.98 m2
  const metrics = calculateSpaceMetrics([desk], room);
  assert.equal(metrics.roomAreaM2, 20);
  assert.equal(metrics.usedAreaM2, 0.98);
  assert.equal(metrics.freeAreaM2, 19.02);
  assert.equal(metrics.circulationPercent, 95);
});

test('undoHistory and redoHistory transition states cleanly', () => {
  const h0 = createHistory([1]);
  const h1 = pushHistory(h0, [1, 2]);
  const h2 = pushHistory(h1, [1, 2, 3]);
  assert.deepEqual(h2.present, [1, 2, 3]);
  const undone = undoHistory(h2);
  assert.deepEqual(undone.present, [1, 2]);
  const redone = redoHistory(undone);
  assert.deepEqual(redone.present, [1, 2, 3]);
});
