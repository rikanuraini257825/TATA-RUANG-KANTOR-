import { ChallengeEvaluation, ChallengeScenario, PlacedFurniture } from '../types/office';
import { calculateSpaceMetrics, countOverlaps, getFurnitureBounds } from './plannerMath';

function distanceBetween(a: PlacedFurniture, b: PlacedFurniture): number {
  return Math.hypot(a.xM - b.xM, a.yM - b.yM);
}

function isNearAnyWall(item: PlacedFurniture, widthM: number, lengthM: number, thresholdM = 0.65): boolean {
  const box = getFurnitureBounds(item);
  return (
    box.minX <= thresholdM ||
    widthM - box.maxX <= thresholdM ||
    box.minY <= thresholdM ||
    lengthM - box.maxY <= thresholdM
  );
}

/**
 * Evaluates a student's furniture layout in Simulasi Penataan Furniture.
 * Scoring breakdown (100 points total):
 * - 40 pts: Completeness (all required furniture items placed)
 * - 25 pts: Collision-free placement (zero overlapping furniture)
 * - 20 pts: Circulation & K3 space efficiency (healthy 45%-82% free walkway)
 * - 15 pts: Ergonomic & functional zoning rules
 */
export function evaluateChallengeLayout(
  scenario: ChallengeScenario,
  items: PlacedFurniture[]
): ChallengeEvaluation {
  const checklist: { label: string; passed: boolean; detail: string }[] = [];
  const feedback: string[] = [];

  // 1. Completeness (40 pts)
  let reqMet = 0;
  for (const req of scenario.requirements) {
    const placedCount = items.filter((it) => it.kind === req.kind).length;
    const passed = placedCount >= req.minCount;
    if (passed) reqMet++;
    checklist.push({
      label: `${req.label} (min. ${req.minCount})`,
      passed,
      detail: passed ? `Terpasang ${placedCount}` : `Baru ${placedCount}/${req.minCount}`,
    });
  }
  const completenessScore =
    scenario.requirements.length > 0
      ? Math.round((reqMet / scenario.requirements.length) * 40)
      : 40;

  if (reqMet < scenario.requirements.length) {
    feedback.push('Lengkapi seluruh daftar furniture wajib sesuai kebutuhan fungsi ruangan.');
  }

  // 2. Overlap check (25 pts)
  const overlapCount = countOverlaps(items);
  const overlapScore = overlapCount === 0 ? 25 : Math.max(0, 25 - overlapCount * 9);
  checklist.push({
    label: 'Bebas Tumpang Tindih Furniture',
    passed: overlapCount === 0,
    detail: overlapCount === 0 ? 'Rapi & terpisah' : `${overlapCount} benturan objek`,
  });
  if (overlapCount > 0) {
    feedback.push(`Terdapat ${overlapCount} posisi furniture yang bertumpuk. Geser agar memiliki jarak gerak.`);
  }

  // 3. Circulation & K3 (20 pts)
  const metrics = calculateSpaceMetrics(items, scenario.dimensions);
  let circulationScore = 0;
  const circOk = metrics.circulationPercent >= 45 && metrics.circulationPercent <= 94;
  if (items.length === 0) {
    circulationScore = 0;
  } else if (circOk) {
    circulationScore = 20;
  } else if (metrics.circulationPercent < 45) {
    circulationScore = Math.max(5, Math.round((metrics.circulationPercent / 45) * 16));
    feedback.push('Ruang gerak (sirkulasi) terlalu sempit (<45%). Kurangi ukuran atau atur ulang penempatan.');
  } else {
    circulationScore = 15;
  }
  checklist.push({
    label: 'Sirkulasi & Ruang Gerak K3 (>= 45%)',
    passed: items.length > 0 && circOk,
    detail: `${metrics.circulationPercent}% ruang bebas`,
  });

  // 4. Ergonomics & Zoning (15 pts)
  let ergonomicsScore = 0;
  const desks = items.filter((i) => i.kind === 'meja-kerja' || i.kind === 'meja-rapat');
  const chairs = items.filter((i) => i.kind === 'kursi');
  const storage = items.filter((i) => i.kind === 'lemari' || i.kind === 'rak-arsip');

  // Rule A: Every desk/meeting table has at least one chair within 1.45m (8 pts)
  let deskChairPaired = false;
  if (desks.length > 0 && chairs.length > 0) {
    deskChairPaired = desks.every((d) => chairs.some((c) => distanceBetween(d, c) <= 1.55));
    if (deskChairPaired) ergonomicsScore += 8;
    else feedback.push('Dekatkan kursi kerja ke meja agar posisi kerja ergonomis dan efisien.');
  } else if (items.length > 0 && desks.length === 0) {
    ergonomicsScore += 4;
  }

  // Rule B: Storage cabinets/racks placed neatly near walls (7 pts)
  let storageWallOk = true;
  if (storage.length > 0) {
    storageWallOk = storage.every((s) =>
      isNearAnyWall(s, scenario.dimensions.widthM, scenario.dimensions.lengthM)
    );
    if (storageWallOk) ergonomicsScore += 7;
    else feedback.push('Tempelkan lemari atau rak arsip di sisi dinding agar tengah ruangan tetap lega.');
  } else if (items.length > 0) {
    ergonomicsScore += 7;
  }

  checklist.push({
    label: 'Zona Ergonomi (Kursi-Meja & Penyimpanan Dinding)',
    passed: (desks.length === 0 || deskChairPaired) && storageWallOk && items.length > 0,
    detail:
      items.length === 0
        ? 'Belum ada objek'
        : deskChairPaired && storageWallOk
          ? 'Sesuai prinsip tata ruang'
          : 'Perlu penyesuaian posisi',
  });

  const totalScore = Math.min(100, completenessScore + overlapScore + circulationScore + ergonomicsScore);

  let predicate: ChallengeEvaluation['predicate'] = 'Perlu Perbaikan';
  if (totalScore >= 85) predicate = 'Sangat Baik';
  else if (totalScore >= 70) predicate = 'Baik';
  else if (totalScore >= 55) predicate = 'Cukup';

  if (feedback.length === 0) {
    feedback.push('Penataan ruang sangat rapi, ergonomis, memenuhi standar K3, dan memiliki jalur sirkulasi optimal.');
  }

  return {
    totalScore,
    predicate,
    completenessScore,
    overlapScore,
    circulationScore,
    ergonomicsScore,
    overlapCount,
    circulationPercent: metrics.circulationPercent,
    checklist,
    feedback,
  };
}
