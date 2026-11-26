import { QuizQuestion } from '../types/office';

export interface QuizSummary {
  totalQuestions: number;
  correctCount: number;
  scorePercent: number;
  byModule: Record<1 | 2 | 3 | 4, { total: number; correct: number; percent: number }>;
}

export function evaluateQuizAnswers(
  questions: QuizQuestion[],
  answers: Record<string, number>
): QuizSummary {
  const byModule: Record<1 | 2 | 3 | 4, { total: number; correct: number; percent: number }> = {
    1: { total: 0, correct: 0, percent: 0 },
    2: { total: 0, correct: 0, percent: 0 },
    3: { total: 0, correct: 0, percent: 0 },
    4: { total: 0, correct: 0, percent: 0 },
  };

  let correctCount = 0;
  for (const q of questions) {
    byModule[q.module].total += 1;
    if (answers[q.id] === q.correctIndex) {
      correctCount += 1;
      byModule[q.module].correct += 1;
    }
  }

  ([1, 2, 3, 4] as const).forEach((m) => {
    const entry = byModule[m];
    entry.percent = entry.total > 0 ? Math.round((entry.correct / entry.total) * 100) : 0;
  });

  const scorePercent =
    questions.length > 0 ? Math.round((correctCount / questions.length) * 100) : 0;

  return {
    totalQuestions: questions.length,
    correctCount,
    scorePercent,
    byModule,
  };
}

export function computeFinalCompetencyScore(params: {
  quizScore: number;
  challengeScore: number;
  hasSavedDesign: boolean;
}): {
  finalScore: number;
  predicate: string;
  passed: boolean;
} {
  const designPortfolioBonus = params.hasSavedDesign ? 100 : 60;
  const finalScore = Math.round(
    params.quizScore * 0.4 + params.challengeScore * 0.45 + designPortfolioBonus * 0.15
  );

  let predicate = 'Belum Kompeten';
  if (finalScore >= 88) predicate = 'Sangat Kompeten (A)';
  else if (finalScore >= 75) predicate = 'Kompeten (B)';
  else if (finalScore >= 65) predicate = 'Cukup Kompeten (C)';

  return {
    finalScore,
    predicate,
    passed: finalScore >= 75,
  };
}
