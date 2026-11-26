import test from 'node:test';
import assert from 'node:assert/strict';
import { evaluateChallengeLayout } from './challengeEvaluator';
import { ChallengeScenario, PlacedFurniture } from '../types/office';

const scenario: ChallengeScenario = {
  id: 'test-pimpinan',
  title: 'Ruang Pimpinan',
  roomType: 'pimpinan',
  dimensions: { widthM: 5, lengthM: 6 },
  difficulty: 'Dasar',
  description: 'Test scenario',
  instructions: ['Pasang meja pimpinan dan kursi'],
  doorWall: 'bottom',
  windowWall: 'top',
  requirements: [
    { kind: 'meja-kerja', label: 'Meja Pimpinan', minCount: 1 },
    { kind: 'kursi', label: 'Kursi Ergonomis', minCount: 1 },
    { kind: 'lemari', label: 'Lemari Arsip', minCount: 1 },
  ],
};

test('evaluateChallengeLayout scores zero completeness for empty room', () => {
  const res = evaluateChallengeLayout(scenario, []);
  assert.equal(res.completenessScore, 0);
  assert.equal(res.predicate, 'Perlu Perbaikan');
});

test('evaluateChallengeLayout awards high score for well-arranged non-overlapping layout', () => {
  const items: PlacedFurniture[] = [
    {
      id: '1',
      kind: 'meja-kerja',
      label: 'Meja Pimpinan',
      xM: 2.5,
      yM: 1.8,
      widthM: 1.6,
      depthM: 0.8,
      rotationDeg: 0,
      scale: 1,
      color: '#7C4D2B',
    },
    {
      id: '2',
      kind: 'kursi',
      label: 'Kursi Ergonomis',
      xM: 2.5,
      yM: 1.0,
      widthM: 0.65,
      depthM: 0.65,
      rotationDeg: 0,
      scale: 1,
      color: '#1E293B',
    },
    {
      id: '3',
      kind: 'lemari',
      label: 'Lemari Arsip',
      xM: 0.4,
      yM: 3.0,
      widthM: 0.5,
      depthM: 1.2,
      rotationDeg: 0,
      scale: 1,
      color: '#64748B',
    },
  ];
  const res = evaluateChallengeLayout(scenario, items);
  assert.equal(res.totalScore, 100);
  assert.equal(res.predicate, 'Sangat Baik');
  assert.equal(res.overlapCount, 0);
});
