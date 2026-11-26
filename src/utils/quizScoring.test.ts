import test from 'node:test';
import assert from 'node:assert/strict';
import { computeFinalCompetencyScore, evaluateQuizAnswers } from './quizScoring';
import { QuizQuestion } from '../types/office';

const sampleQuestions: QuizQuestion[] = [
  {
    id: 'q1',
    module: 1,
    moduleTitle: 'Furniture Kantor',
    question: 'Q1',
    options: ['A', 'B'],
    correctIndex: 0,
    explanation: 'E1',
  },
  {
    id: 'q2',
    module: 2,
    moduleTitle: 'Interior Kantor',
    question: 'Q2',
    options: ['A', 'B'],
    correctIndex: 1,
    explanation: 'E2',
  },
];

test('evaluateQuizAnswers calculates overall and per-module score accurately', () => {
  const summary = evaluateQuizAnswers(sampleQuestions, { q1: 0, q2: 0 });
  assert.equal(summary.correctCount, 1);
  assert.equal(summary.scorePercent, 50);
  assert.equal(summary.byModule[1].percent, 100);
  assert.equal(summary.byModule[2].percent, 0);
});

test('computeFinalCompetencyScore combines quiz, challenge, and design portfolio', () => {
  const high = computeFinalCompetencyScore({
    quizScore: 90,
    challengeScore: 95,
    hasSavedDesign: true,
  });
  assert.equal(high.passed, true);
  assert.ok(high.finalScore >= 88);

  const low = computeFinalCompetencyScore({
    quizScore: 40,
    challengeScore: 50,
    hasSavedDesign: false,
  });
  assert.equal(low.passed, false);
});
