import React from 'react';
import {
  ArrowRight,
  Award,
  BookOpen,
  Compass,
  Grid2x2,
  Image as ImageIcon,
  Layers,
  PenTool,
  Target,
} from 'lucide-react';
import { IMAGES, LEARNING_OBJECTIVES } from '../data/learningContent';
import { MenuId } from '../types/office';
import { ResilientImage } from './ResilientImage';

interface HomeViewProps {
  onNavigate: (menu: MenuId) => void;
  quizScore: number | null;
  challengeScore: number | null;
  hasSavedDesign: boolean;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  quizScore,
  challengeScore,
  hasSavedDesign,
}) => {
  const quickCards: {
    id: MenuId;
    title: string;
    subtitle: string;
    icon: React.ReactNode;
    accent?: boolean;
  }[] = [
    {
      id: 'materi',
      title: 'Materi Pembelajaran (4 Modul)',
      subtitle: 'Furniture, interior, jenis tata ruang, dan prinsip K3 kantor.',
      icon: <BookOpen className="w-5 h-5" />,
    },
    {
      id: 'galeri-furniture',
      title: 'Galeri Furniture Kantor',
      subtitle: '11 jenis perabot lengkap dengan spesifikasi, material, & tips.',
      icon: <ImageIcon className="w-5 h-5" />,
    },
    {
      id: 'tata-ruang',
      title: 'Jenis Tata Ruang Kantor',
      subtitle: 'Bandingkan denah 2D tertutup, terbuka, berpanorama, & gabungan.',
      icon: <Layers className="w-5 h-5" />,
    },
    {
      id: 'simulasi-desain',
      title: 'Simulasi Desain Kantor 2D & 3D',
      subtitle: 'Rancang ruangan sendiri, atur skala, warna, & ekspor blueprint PNG.',
      icon: <PenTool className="w-5 h-5" />,
      accent: true,
    },
    {
      id: 'simulasi-penataan',
      title: 'Simulasi Penataan Furniture',
      subtitle: 'Tantangan interaktif menata 4 skenario ruang kantor sesuai standar.',
      icon: <Compass className="w-5 h-5" />,
    },
    {
      id: 'kuis',
      title: 'Kuis & Evaluasi Pembelajaran',
      subtitle: 'Uji pemahaman 16 soal dan cetak laporan kompetensi XI MPLB.',
      icon: <Award className="w-5 h-5" />,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Hero Split Section */}
      <section className="bg-slate-900 text-white rounded-2xl overflow-hidden border border-slate-800 grid grid-cols-1 lg:grid-cols-12 items-stretch">
        <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between gap-6">
          <div className="space-y-4">
            <div className="text-xs font-semibold tracking-wide text-amber-400">
              SMK TAMAN HARAPAN · PROGRAM KEAHLIAN XI MPLB
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold leading-tight text-balance">
              Office Design &amp; Space Planner
            </h1>
            <p className="text-sm sm:text-base font-medium text-amber-200">
              Furniture, Interior Kantor dan Tata Ruang Kantor
            </p>
            <p className="text-sm text-slate-300 leading-relaxed max-w-2xl">
              Media pembelajaran digital interaktif bagi siswa kelas XI Manajemen Perkantoran dan
              Layanan Bisnis SMK Taman Harapan untuk mempelajari perabot perkantoran, estetika
              interior, tata ruang, serta merancang denah kantor secara langsung dalam tampilan
              2D dan 3D.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => onNavigate('simulasi-desain')}
              className="px-5 py-2.5 rounded-lg bg-amber-500 text-slate-950 font-semibold text-sm hover:bg-amber-400 transition-colors flex items-center gap-2 whitespace-nowrap shrink-0"
            >
              Mulai Simulasi Desain
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => onNavigate('materi')}
              className="px-5 py-2.5 rounded-lg bg-slate-800 text-white border border-slate-700 font-semibold text-sm hover:bg-slate-700 transition-colors whitespace-nowrap shrink-0"
            >
              Pelajari Materi
            </button>
          </div>
        </div>

        <div className="lg:col-span-5 relative min-h-[260px]">
          <ResilientImage
            src={IMAGES.heroOffice}
            alt="Interior Kantor Modern SMK Taman Harapan"
            className="w-full h-full object-cover lg:h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent flex items-end p-5">
            <div className="text-xs text-slate-200">
              <div className="font-semibold text-white">Laboratorium Tata Ruang Digital</div>
              <div className="text-slate-300">SMK Taman Harapan · Kurikulum Merdeka Fase F</div>
            </div>
          </div>
        </div>
      </section>

      {/* Progress KPI Row */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-4">
          <div className="text-xs text-slate-500">Cakupan Materi</div>
          <div className="text-2xl font-bold font-mono tabular-nums text-slate-900 mt-1">
            4 Modul
          </div>
          <div className="text-xs text-slate-600 mt-0.5">11 Jenis Furniture &amp; 4 Tata Ruang</div>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-4">
          <div className="text-xs text-slate-500">Skor Kuis Interaktif</div>
          <div className="text-2xl font-bold font-mono tabular-nums text-slate-900 mt-1">
            {quizScore !== null ? `${quizScore}%` : 'Belum Diisi'}
          </div>
          <div className="text-xs text-slate-600 mt-0.5">16 Soal Evaluasi Modul</div>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-4">
          <div className="text-xs text-slate-500">Skor Penataan Ruang</div>
          <div className="text-2xl font-bold font-mono tabular-nums text-slate-900 mt-1">
            {challengeScore !== null ? `${challengeScore}/100` : 'Belum Uji'}
          </div>
          <div className="text-xs text-slate-600 mt-0.5">4 Studi Kasus Penataan</div>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-4">
          <div className="text-xs text-slate-500">Portofolio Desain 2D/3D</div>
          <div className="text-2xl font-bold font-mono tabular-nums text-slate-900 mt-1">
            {hasSavedDesign ? 'Tersimpan' : 'Siap Dirancang'}
          </div>
          <div className="text-xs text-slate-600 mt-0.5">Ekspor Blueprint PNG</div>
        </div>
      </section>

      {/* Quick Access Grid */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Navigasi Pembelajaran &amp; Studio Desain
            </h2>
            <p className="text-sm text-slate-600">
              Akses cepat seluruh modul pembelajaran, galeri visual, dan simulasi interaktif SMK Taman Harapan.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('tujuan')}
            className="text-xs font-semibold text-slate-900 hover:text-amber-700 flex items-center gap-1 self-start sm:self-auto"
          >
            Lihat Tujuan Pembelajaran
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickCards.map((card) => (
            <button
              key={card.id}
              type="button"
              onClick={() => onNavigate(card.id)}
              className={`p-5 rounded-xl border text-left transition-all flex flex-col justify-between gap-4 ${
                card.accent
                  ? 'bg-slate-900 text-white border-slate-900 hover:bg-slate-800'
                  : 'bg-white text-slate-900 border-slate-200 hover:border-slate-400'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    card.accent
                      ? 'bg-amber-500 text-slate-950'
                      : 'bg-slate-100 text-slate-900'
                  }`}
                >
                  {card.icon}
                </div>
                <ArrowRight
                  className={`w-4 h-4 ${card.accent ? 'text-amber-400' : 'text-slate-400'}`}
                />
              </div>
              <div>
                <h3 className="text-base font-bold">{card.title}</h3>
                <p
                  className={`text-xs mt-1 leading-relaxed ${
                    card.accent ? 'text-slate-300' : 'text-slate-600'
                  }`}
                >
                  {card.subtitle}
                </p>
              </div>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};

export const ObjectivesView: React.FC<{ onNavigate: (m: MenuId) => void }> = ({ onNavigate }) => {
  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-xl p-6">
        <div className="text-xs font-semibold text-amber-700">
          Kurikulum Merdeka Fase F · XI MPLB · SMK Taman Harapan
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mt-1">Tujuan Pembelajaran</h2>
        <div className="mt-4 p-4 rounded-xl bg-slate-900 text-slate-100">
          <div className="text-xs font-semibold text-amber-400 flex items-center gap-1.5 mb-1.5">
            <Target className="w-4 h-4" />
            Capaian Pembelajaran (CP) Elemen Pengelolaan Sarana &amp; Prasarana Kantor
          </div>
          <p className="text-sm leading-relaxed text-slate-200">
            {LEARNING_OBJECTIVES.capaianPembelajaran}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {LEARNING_OBJECTIVES.tujuanKhusus.map((tp) => (
          <div key={tp.code} className="bg-white border border-slate-200 rounded-xl p-5 space-y-2">
            <div className="text-xs font-mono font-semibold text-amber-700">{tp.code}</div>
            <h3 className="text-base font-bold text-slate-900">{tp.title}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">{tp.desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900">Siap Memulai Pembelajaran?</h3>
          <p className="text-xs text-slate-600">
            Pelajari Modul 1 hingga Modul 4 secara berurutan atau langsung uji tata letak di Studio Desain.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onNavigate('materi')}
            className="px-4 py-2 rounded-lg bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 whitespace-nowrap shrink-0"
          >
            Buka Materi Pembelajaran
          </button>
          <button
            type="button"
            onClick={() => onNavigate('simulasi-desain')}
            className="px-4 py-2 rounded-lg border border-slate-300 text-slate-800 text-xs font-semibold hover:bg-slate-50 flex items-center gap-1.5 whitespace-nowrap shrink-0"
          >
            <Grid2x2 className="w-3.5 h-3.5" />
            Buka Simulasi
          </button>
        </div>
      </div>
    </div>
  );
};
