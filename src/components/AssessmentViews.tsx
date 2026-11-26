import React, { useMemo, useState } from 'react';
import {
  Award,
  BookOpenCheck,
  CheckCircle2,
  GraduationCap,
  Printer,
  RotateCcw,
  School,
  XCircle,
} from 'lucide-react';
import { QUIZ_QUESTIONS } from '../data/learningContent';
import { MenuId } from '../types/office';
import { computeFinalCompetencyScore, evaluateQuizAnswers } from '../utils/quizScoring';
import { playSuccessFx, playWarningFx } from '../utils/soundFx';

interface QuizViewProps {
  onQuizCompleted: (scorePercent: number) => void;
}

export const QuizView: React.FC<QuizViewProps> = ({ onQuizCompleted }) => {
  const [moduleFilter, setModuleFilter] = useState<'all' | 1 | 2 | 3 | 4>('all');
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const visibleQuestions = useMemo(
    () =>
      moduleFilter === 'all'
        ? QUIZ_QUESTIONS
        : QUIZ_QUESTIONS.filter((q) => q.module === moduleFilter),
    [moduleFilter]
  );

  const summary = useMemo(
    () => evaluateQuizAnswers(visibleQuestions, answers),
    [visibleQuestions, answers]
  );

  const fullSummary = useMemo(() => evaluateQuizAnswers(QUIZ_QUESTIONS, answers), [answers]);

  const answeredCount = visibleQuestions.filter((q) => answers[q.id] !== undefined).length;

  const handleSelect = (qId: string, optionIdx: number) => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [qId]: optionIdx }));
  };

  const handleSubmit = () => {
    setSubmitted(true);
    const finalPct = fullSummary.scorePercent;
    onQuizCompleted(finalPct);
    if (summary.scorePercent >= 75) playSuccessFx();
    else playWarningFx();
  };

  const handleReset = () => {
    setAnswers({});
    setSubmitted(false);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="text-xs font-semibold text-amber-700">
            Uji Pemahaman · XI MPLB · SMK Taman Harapan
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mt-0.5">Kuis Interaktif</h2>
          <p className="text-sm text-slate-600 mt-1">
            Jawab seluruh soal pilihan ganda dari Modul 1–4 untuk mengukur penguasaan materi perkantoran.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 p-1 rounded-lg border border-slate-200">
          {(
            [
              { id: 'all', label: 'Semua (16)' },
              { id: 1, label: 'Modul 1' },
              { id: 2, label: 'Modul 2' },
              { id: 3, label: 'Modul 3' },
              { id: 4, label: 'Modul 4' },
            ] as const
          ).map((tab) => (
            <button
              key={String(tab.id)}
              type="button"
              onClick={() => {
                setModuleFilter(tab.id);
                setSubmitted(false);
              }}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap shrink-0 ${
                moduleFilter === tab.id
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Progress & Submit Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="text-xs text-slate-600 font-mono tabular-nums">
          Terjawab: <span className="font-bold text-slate-900">{answeredCount}</span> /{' '}
          {visibleQuestions.length} soal
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleReset}
            className="px-3 py-2 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Ulangi Kuis
          </button>
          <button
            type="button"
            disabled={answeredCount === 0}
            onClick={handleSubmit}
            className="px-4 py-2 rounded-lg bg-slate-900 text-white hover:bg-slate-800 disabled:opacity-40 text-xs font-semibold flex items-center gap-1.5"
          >
            <BookOpenCheck className="w-4 h-4 text-amber-400" />
            Periksa Jawaban
          </button>
        </div>
      </div>

      {/* Score Result Banner */}
      {submitted && (
        <div
          data-testid="quiz-result-banner"
          className="bg-slate-900 text-white rounded-xl p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        >
          <div>
            <div className="text-xs font-semibold text-amber-400">Hasil Kuis Interaktif</div>
            <h3 className="text-2xl font-bold mt-0.5">
              Skor Anda: <span className="font-mono tabular-nums">{summary.scorePercent}%</span>
            </h3>
            <p className="text-xs text-slate-300 mt-1">
              Benar {summary.correctCount} dari {summary.totalQuestions} soal. Pelajari pembahasan di bawah tiap soal untuk memperdalam pemahaman.
            </p>
          </div>
          <div className="text-xs font-semibold px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-amber-300 self-start sm:self-center">
            {summary.scorePercent >= 75 ? 'Lulus KKM (>= 75%)' : 'Perlu Pengayaan (< 75%)'}
          </div>
        </div>
      )}

      {/* Question List */}
      <div className="space-y-4">
        {visibleQuestions.map((q, idx) => {
          const picked = answers[q.id];
          const isCorrect = picked === q.correctIndex;

          return (
            <div key={q.id} className="bg-white border border-slate-200 rounded-xl p-5 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-amber-700">{q.moduleTitle}</span>
                <span className="font-mono tabular-nums text-slate-400">
                  Soal {idx + 1}
                </span>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900">{q.question}</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {q.options.map((opt, optIdx) => {
                  const selected = picked === optIdx;
                  let style = 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100';
                  if (!submitted && selected) {
                    style = 'bg-slate-900 border-slate-900 text-white';
                  } else if (submitted) {
                    if (optIdx === q.correctIndex) {
                      style = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-semibold';
                    } else if (selected && optIdx !== q.correctIndex) {
                      style = 'bg-red-50 border-red-400 text-red-900';
                    }
                  }

                  return (
                    <button
                      key={optIdx}
                      type="button"
                      onClick={() => handleSelect(q.id, optIdx)}
                      className={`p-3 rounded-lg border text-left text-xs transition-colors flex items-center justify-between gap-2 ${style}`}
                    >
                      <span>
                        <span className="font-mono font-bold mr-2">
                          {String.fromCharCode(65 + optIdx)}.
                        </span>
                        {opt}
                      </span>
                      {submitted && optIdx === q.correctIndex && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      )}
                      {submitted && selected && optIdx !== q.correctIndex && (
                        <XCircle className="w-4 h-4 text-red-600 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {submitted && (
                <div
                  className={`p-3 rounded-lg text-xs border ${
                    isCorrect
                      ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
                      : 'bg-amber-50/70 border-amber-200 text-amber-950'
                  }`}
                >
                  <span className="font-bold">Pembahasan: </span>
                  {q.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

interface EvaluationViewProps {
  quizScore: number | null;
  challengeScore: number | null;
  hasSavedDesign: boolean;
  onNavigate: (menu: MenuId) => void;
}

export const EvaluationView: React.FC<EvaluationViewProps> = ({
  quizScore,
  challengeScore,
  hasSavedDesign,
  onNavigate,
}) => {
  const [studentName, setStudentName] = useState('');
  const [studentClass, setStudentClass] = useState('XI MPLB 1');
  const [reflection, setReflection] = useState('');
  const [reportGenerated, setReportGenerated] = useState(false);

  const safeQuiz = quizScore ?? 0;
  const safeChallenge = challengeScore ?? 0;
  const competency = computeFinalCompetencyScore({
    quizScore: safeQuiz,
    challengeScore: safeChallenge,
    hasSavedDesign,
  });

  const handleGenerateReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim()) return;
    setReportGenerated(true);
    playSuccessFx();
  };

  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-xl p-5">
        <div className="text-xs font-semibold text-amber-700">
          Rekapitulasi Nilai Kompetensi · SMK Taman Harapan
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mt-0.5">Evaluasi Pembelajaran</h2>
        <p className="text-sm text-slate-600 mt-1">
          Gabungan penilaian pengetahuan (Kuis Interaktif 40%), keterampilan tata letak (Simulasi Penataan 45%), dan portofolio desain 2D/3D (15%).
        </p>
      </div>

      {/* Score Breakdown Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-2">
          <div className="text-xs font-medium text-slate-500">1. Kuis Interaktif (Bobot 40%)</div>
          <div className="text-3xl font-bold font-mono tabular-nums text-slate-900">
            {quizScore !== null ? `${quizScore}%` : '0%'}
          </div>
          <button
            type="button"
            onClick={() => onNavigate('kuis')}
            className="text-xs font-semibold text-amber-700 hover:underline"
          >
            {quizScore === null ? 'Kerjakan Kuis Sekarang →' : 'Ulangi Kuis →'}
          </button>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-2">
          <div className="text-xs font-medium text-slate-500">2. Simulasi Penataan (Bobot 45%)</div>
          <div className="text-3xl font-bold font-mono tabular-nums text-slate-900">
            {challengeScore !== null ? `${challengeScore}/100` : '0/100'}
          </div>
          <button
            type="button"
            onClick={() => onNavigate('simulasi-penataan')}
            className="text-xs font-semibold text-amber-700 hover:underline"
          >
            {challengeScore === null ? 'Mulai Tantangan Penataan →' : 'Tingkatkan Skor →'}
          </button>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-2">
          <div className="text-xs font-medium text-slate-500">3. Portofolio Desain (Bobot 15%)</div>
          <div className="text-3xl font-bold text-slate-900">
            {hasSavedDesign ? 'Lengkap (100)' : 'Proses (60)'}
          </div>
          <button
            type="button"
            onClick={() => onNavigate('simulasi-desain')}
            className="text-xs font-semibold text-amber-700 hover:underline"
          >
            Simpan Desain di Studio →
          </button>
        </div>
      </div>

      {/* Student Identity & Final Report Form */}
      <form
        onSubmit={handleGenerateReport}
        className="bg-white border border-slate-200 rounded-xl p-6 space-y-4"
      >
        <h3 className="text-base font-bold text-slate-900">
          Identitas Peserta Didik &amp; Refleksi Pembelajaran
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="eval-name" className="block text-xs font-semibold text-slate-700 mb-1">
              Nama Lengkap Siswa <span className="text-red-600">*</span>
            </label>
            <input
              id="eval-name"
              type="text"
              required
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              placeholder="Contoh: Nadia Putri Ramadhani"
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg"
            />
          </div>
          <div>
            <label htmlFor="eval-class" className="block text-xs font-semibold text-slate-700 mb-1">
              Kelas / Program Keahlian
            </label>
            <select
              id="eval-class"
              value={studentClass}
              onChange={(e) => setStudentClass(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white"
            >
              <option value="XI MPLB 1">XI MPLB 1 — SMK Taman Harapan</option>
              <option value="XI MPLB 2">XI MPLB 2 — SMK Taman Harapan</option>
              <option value="XI MPLB 3">XI MPLB 3 — SMK Taman Harapan</option>
            </select>
          </div>
        </div>
        <div>
          <label htmlFor="eval-reflection" className="block text-xs font-semibold text-slate-700 mb-1">
            Refleksi Singkat (Prinsip Tata Ruang yang Dipahami)
          </label>
          <textarea
            id="eval-reflection"
            rows={3}
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
            placeholder="Tuliskan kesimpulan pembelajaran Anda mengenai furniture, interior, ergonomi, dan K3 perkantoran..."
            className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg"
          />
        </div>
        <button
          type="submit"
          className="px-5 py-2.5 rounded-lg bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 flex items-center gap-2"
        >
          <Award className="w-4 h-4 text-amber-400" />
          Terbitkan Laporan Evaluasi Kompetensi
        </button>
      </form>

      {reportGenerated && (
        <div
          data-testid="evaluation-certificate"
          className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 border-2 border-amber-500/70 space-y-5"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-700">
            <div>
              <div className="text-xs font-semibold text-amber-400">
                LAPORAN HASIL EVALUASI PEMBELAJARAN · SMK TAMAN HARAPAN
              </div>
              <h3 className="text-2xl font-bold mt-1">{studentName}</h3>
              <p className="text-xs text-slate-300">{studentClass} · Kompetensi Tata Ruang Kantor</p>
            </div>
            <div className="text-left sm:text-right">
              <div className="text-xs text-slate-400">Nilai Akhir Gabungan</div>
              <div className="text-4xl font-bold font-mono tabular-nums text-amber-400">
                {competency.finalScore}
              </div>
              <div className="text-xs font-semibold text-white">{competency.predicate}</div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 text-xs">
            <div className="p-3 rounded-lg bg-slate-800">
              <div className="text-slate-400">Kuis (40%)</div>
              <div className="text-base font-bold font-mono tabular-nums mt-0.5">{safeQuiz}%</div>
            </div>
            <div className="p-3 rounded-lg bg-slate-800">
              <div className="text-slate-400">Penataan (45%)</div>
              <div className="text-base font-bold font-mono tabular-nums mt-0.5">{safeChallenge}/100</div>
            </div>
            <div className="p-3 rounded-lg bg-slate-800">
              <div className="text-slate-400">Desain 2D/3D (15%)</div>
              <div className="text-base font-bold mt-0.5">
                {hasSavedDesign ? 'Tersimpan' : 'Dasar'}
              </div>
            </div>
          </div>

          {reflection && (
            <div className="p-3.5 rounded-lg bg-slate-800/80 text-xs text-slate-200">
              <span className="font-semibold text-amber-300">Refleksi Siswa: </span>
              {reflection}
            </div>
          )}

          <div className="flex justify-end no-print">
            <button
              type="button"
              onClick={() => window.print()}
              className="px-4 py-2 rounded-lg bg-amber-500 text-slate-950 font-semibold text-xs hover:bg-amber-400 flex items-center gap-1.5"
            >
              <Printer className="w-4 h-4" />
              Cetak / Simpan PDF Laporan
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export const ProfileView: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center gap-6">
        <div className="w-16 h-16 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center shrink-0">
          <School className="w-9 h-9" />
        </div>
        <div>
          <div className="text-xs font-semibold text-amber-400">
            IDENTITAS MEDIA PEMBELAJARAN DIGITAL
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold mt-1">
            Office Design &amp; Space Planner
          </h2>
          <p className="text-sm text-amber-200 font-medium mt-0.5">
            Furniture, Interior Kantor dan Tata Ruang Kantor — SMK Taman Harapan
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-3">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-amber-600" />
            Informasi Akademik &amp; Kurikulum
          </h3>
          <dl className="space-y-2 text-xs">
            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <dt className="text-slate-500">Satuan Pendidikan</dt>
              <dd className="font-semibold text-slate-900">SMK Taman Harapan</dd>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <dt className="text-slate-500">Program Keahlian</dt>
              <dd className="font-semibold text-slate-900">Manajemen Perkantoran &amp; Layanan Bisnis (MPLB)</dd>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <dt className="text-slate-500">Tingkat / Fase</dt>
              <dd className="font-semibold text-slate-900">Kelas XI · Fase F</dd>
            </div>
            <div className="flex justify-between py-1.5">
              <dt className="text-slate-500">Fokus Kompetensi</dt>
              <dd className="font-semibold text-slate-900">Sarana Prasarana, Interior &amp; Tata Ruang Kantor</dd>
            </div>
          </dl>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-3">
          <h3 className="text-base font-bold text-slate-900">
            Panduan Penggunaan Guru &amp; Siswa
          </h3>
          <ol className="text-xs text-slate-700 space-y-2 list-decimal pl-4 leading-relaxed">
            <li>
              <span className="font-semibold text-slate-900">Eksplorasi Teori:</span> Pelajari Tujuan Pembelajaran serta Modul 1–4 pada menu Materi Pembelajaran dan Galeri Visual.
            </li>
            <li>
              <span className="font-semibold text-slate-900">Praktik Desain Bebas:</span> Gunakan menu Simulasi Desain Kantor untuk merancang ruangan 2D &amp; 3D serta mengunduh blueprint PNG.
            </li>
            <li>
              <span className="font-semibold text-slate-900">Uji Tantangan Tata Letak:</span> Selesaikan 4 skenario di Simulasi Penataan Furniture untuk mendapatkan skor ergonomi &amp; K3 otomatis.
            </li>
            <li>
              <span className="font-semibold text-slate-900">Kuis &amp; Pelaporan:</span> Kerjakan 16 soal Kuis Interaktif dan terbitkan laporan akhir di menu Evaluasi Pembelajaran.
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
};
