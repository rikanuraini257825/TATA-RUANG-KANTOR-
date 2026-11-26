import React, { useState } from 'react';
import {
  Armchair,
  Award,
  BookOpen,
  Building2,
  Compass,
  HelpCircle,
  Home,
  Info,
  Layers,
  Menu,
  PaintBucket,
  PenTool,
  Target,
  X,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import {
  EvaluationView,
  ProfileView,
  QuizView,
} from './components/AssessmentViews';
import { FurnitureChallengeSimulator } from './components/FurnitureChallengeSimulator';
import {
  FurnitureGalleryView,
  InteriorGalleryView,
  LayoutTypesView,
} from './components/GalleriesAndLayoutsView';
import { HomeView, ObjectivesView } from './components/HomeAndObjectivesView';
import { LearningModulesView } from './components/LearningModulesView';
import { OfficeDesignSimulator } from './components/OfficeDesignSimulator';
import { MenuId } from './types/office';

interface NavGroup {
  groupLabel: string;
  items: { id: MenuId; label: string; icon: React.ReactNode }[];
}

const NAV_GROUPS: NavGroup[] = [
  {
    groupLabel: 'Utama & Kurikulum',
    items: [
      { id: 'beranda', label: 'BERANDA', icon: <Home className="w-4 h-4" /> },
      { id: 'tujuan', label: 'TUJUAN PEMBELAJARAN', icon: <Target className="w-4 h-4" /> },
      { id: 'materi', label: 'MATERI PEMBELAJARAN', icon: <BookOpen className="w-4 h-4" /> },
    ],
  },
  {
    groupLabel: 'Galeri & Referensi',
    items: [
      { id: 'galeri-furniture', label: 'GALERI FURNITURE KANTOR', icon: <Armchair className="w-4 h-4" /> },
      { id: 'galeri-interior', label: 'GALERI INTERIOR KANTOR', icon: <PaintBucket className="w-4 h-4" /> },
      { id: 'tata-ruang', label: 'JENIS TATA RUANG KANTOR', icon: <Layers className="w-4 h-4" /> },
    ],
  },
  {
    groupLabel: 'Simulasi & Evaluasi',
    items: [
      { id: 'simulasi-desain', label: 'SIMULASI DESAIN KANTOR', icon: <PenTool className="w-4 h-4" /> },
      { id: 'simulasi-penataan', label: 'SIMULASI PENATAAN FURNITURE', icon: <Compass className="w-4 h-4" /> },
      { id: 'kuis', label: 'KUIS INTERAKTIF', icon: <HelpCircle className="w-4 h-4" /> },
      { id: 'evaluasi', label: 'EVALUASI PEMBELAJARAN', icon: <Award className="w-4 h-4" /> },
      { id: 'profil', label: 'PROFIL APLIKASI', icon: <Info className="w-4 h-4" /> },
    ],
  },
];

const ALL_MENU_IDS = new Set<MenuId>(
  NAV_GROUPS.flatMap((g) => g.items.map((i) => i.id))
);

function getInitialMenu(): MenuId {
  if (typeof window === 'undefined') return 'beranda';
  const params = new URLSearchParams(window.location.search);
  const menuParam = params.get('menu') as MenuId | null;
  if (menuParam && ALL_MENU_IDS.has(menuParam)) return menuParam;
  if (params.get('autostart') === '1') return 'simulasi-desain';
  return 'beranda';
}

export default function App() {
  const [activeMenu, setActiveMenu] = useState<MenuId>(getInitialMenu);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [quizScore, setQuizScore] = useState<number | null>(null);
  const [challengeScore, setChallengeScore] = useState<number | null>(null);
  const [hasSavedDesign, setHasSavedDesign] = useState<boolean>(() => {
    try {
      const raw = localStorage.getItem('smk_th_office_designs_v1');
      return raw ? JSON.parse(raw).length > 0 : false;
    } catch {
      return false;
    }
  });

  const activeLabel =
    NAV_GROUPS.flatMap((g) => g.items).find((i) => i.id === activeMenu)?.label ?? 'BERANDA';

  const handleSelectMenu = (id: MenuId) => {
    setActiveMenu(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex bg-slate-50 text-slate-900">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:flex-col lg:w-72 lg:shrink-0 bg-[#0B1F3A] text-slate-100 border-r border-slate-800 no-print">
        <div className="p-5 border-b border-slate-800 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center shrink-0">
            <Building2 className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <div className="text-xs font-bold text-amber-400 truncate">SMK TAMAN HARAPAN</div>
            <div className="text-sm font-bold text-white leading-tight truncate">
              Office Space Planner
            </div>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-5 overflow-y-auto" aria-label="Menu Utama">
          {NAV_GROUPS.map((group) => (
            <div key={group.groupLabel} className="space-y-1">
              <div className="px-3 text-[11px] font-semibold text-slate-400 tracking-wide">
                {group.groupLabel}
              </div>
              {group.items.map((item) => {
                const active = activeMenu === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleSelectMenu(item.id)}
                    className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-left text-xs font-semibold transition-colors ${
                      active
                        ? 'bg-amber-500 text-slate-950'
                        : 'text-slate-200 hover:bg-slate-800/80 hover:text-white'
                    }`}
                  >
                    <span className="shrink-0">{item.icon}</span>
                    <span className="truncate">{item.label}</span>
                  </button>
                );
              })}
            </div>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800 text-[11px] text-slate-400">
          <div className="font-semibold text-slate-200">Program Keahlian XI MPLB</div>
          <div>Furniture, Interior &amp; Tata Ruang Kantor</div>
        </div>
      </aside>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-slate-950/60"
            onClick={() => setMobileMenuOpen(false)}
          />
          <aside className="relative z-10 w-72 max-w-[85vw] bg-[#0B1F3A] text-slate-100 h-full flex flex-col">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-amber-400">SMK TAMAN HARAPAN</div>
                <div className="text-sm font-bold text-white">Office Space Planner</div>
              </div>
              <button
                type="button"
                aria-label="Tutup menu navigasi"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-slate-300 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="flex-1 p-3 space-y-4 overflow-y-auto" aria-label="Menu Mobile">
              {NAV_GROUPS.map((group) => (
                <div key={group.groupLabel} className="space-y-1">
                  <div className="px-3 text-[11px] font-semibold text-slate-400">
                    {group.groupLabel}
                  </div>
                  {group.items.map((item) => {
                    const active = activeMenu === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => handleSelectMenu(item.id)}
                        className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-left text-xs font-semibold ${
                          active ? 'bg-amber-500 text-slate-950' : 'text-slate-200 hover:bg-slate-800'
                        }`}
                      >
                        {item.icon}
                        <span className="truncate">{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              ))}
            </nav>
          </aside>
        </div>
      )}

      {/* Main Content Shell */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Clean Single-Row Top Header */}
        <header className="sticky top-0 z-30 bg-white border-b border-slate-200 px-4 sm:px-6 py-3 flex items-center justify-between gap-4 no-print">
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              aria-label="Buka menu navigasi"
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100 shrink-0"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="min-w-0 flex flex-col sm:flex-row sm:items-center sm:gap-2">
              <span className="font-display font-bold text-slate-900 text-xs sm:text-sm truncate">
                OFFICE DESIGN &amp; SPACE PLANNER
              </span>
              <span className="hidden sm:inline text-slate-300 text-sm" aria-hidden="true">
                ·
              </span>
              <span className="font-semibold text-amber-700 text-[11px] sm:text-sm whitespace-nowrap shrink-0">
                SMK TAMAN HARAPAN
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <span className="hidden md:inline text-xs font-medium text-slate-500 whitespace-nowrap">
              {activeLabel}
            </span>
            <button
              type="button"
              onClick={() => handleSelectMenu('simulasi-desain')}
              className="px-3.5 py-2 rounded-lg bg-slate-900 text-white hover:bg-slate-800 text-xs font-semibold whitespace-nowrap shrink-0"
            >
              Studio Desain
            </button>
          </div>
        </header>

        {/* Active View Viewport */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-[1360px] w-full mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeMenu}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
            >
              {activeMenu === 'beranda' && (
                <HomeView
                  onNavigate={handleSelectMenu}
                  quizScore={quizScore}
                  challengeScore={challengeScore}
                  hasSavedDesign={hasSavedDesign}
                />
              )}
              {activeMenu === 'tujuan' && <ObjectivesView onNavigate={handleSelectMenu} />}
              {activeMenu === 'materi' && <LearningModulesView />}
              {activeMenu === 'galeri-furniture' && <FurnitureGalleryView />}
              {activeMenu === 'galeri-interior' && <InteriorGalleryView />}
              {activeMenu === 'tata-ruang' && <LayoutTypesView />}
              {activeMenu === 'simulasi-desain' && (
                <OfficeDesignSimulator onDesignSaved={() => setHasSavedDesign(true)} />
              )}
              {activeMenu === 'simulasi-penataan' && (
                <FurnitureChallengeSimulator
                  onBestScoreChange={(s) => setChallengeScore(s)}
                />
              )}
              {activeMenu === 'kuis' && (
                <QuizView onQuizCompleted={(s) => setQuizScore(s)} />
              )}
              {activeMenu === 'evaluasi' && (
                <EvaluationView
                  quizScore={quizScore}
                  challengeScore={challengeScore}
                  hasSavedDesign={hasSavedDesign}
                  onNavigate={handleSelectMenu}
                />
              )}
              {activeMenu === 'profil' && <ProfileView />}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Clean Institutional Footer */}
        <footer className="bg-white border-t border-slate-200 px-4 sm:px-6 py-4 text-xs text-slate-600 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 no-print">
          <div>
            <span className="font-bold text-slate-900">SMK TAMAN HARAPAN</span>
            <span className="mx-2 text-slate-300">·</span>
            <span>Office Design &amp; Space Planner — Kelas XI MPLB</span>
          </div>
          <div className="text-slate-500">
            Furniture, Interior Kantor &amp; Tata Ruang Kantor
          </div>
        </footer>
      </div>
    </div>
  );
}
