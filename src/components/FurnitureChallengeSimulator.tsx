import React, { useMemo, useRef, useState } from 'react';
import {
  CheckCircle2,
  ClipboardCheck,
  Plus,
  RotateCcw,
  RotateCw,
  Trash2,
  Trophy,
  Volume2,
  VolumeX,
  XCircle,
} from 'lucide-react';
import { CHALLENGE_SCENARIOS, FURNITURE_CATALOG } from '../data/simulatorCatalog';
import { ChallengeEvaluation, FurnitureKind, PlacedFurniture } from '../types/office';
import { evaluateChallengeLayout } from '../utils/challengeEvaluator';
import { clampFurnitureToRoom, doItemsOverlap } from '../utils/plannerMath';
import {
  getSoundMuted,
  playPlaceFx,
  playRotateFx,
  playSuccessFx,
  playWarningFx,
  setSoundMuted,
} from '../utils/soundFx';
import { Furniture2DSymbol } from './Furniture2DSymbol';

interface FurnitureChallengeSimulatorProps {
  onBestScoreChange?: (score: number) => void;
}

export const FurnitureChallengeSimulator: React.FC<FurnitureChallengeSimulatorProps> = ({
  onBestScoreChange,
}) => {
  const [scenarioIdx, setScenarioIdx] = useState(0);
  const scenario = CHALLENGE_SCENARIOS[scenarioIdx];
  const [items, setItems] = useState<PlacedFurniture[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [evaluation, setEvaluation] = useState<ChallengeEvaluation | null>(null);
  const [bestScores, setBestScores] = useState<Record<string, number>>({});
  const [muted, setMuted] = useState(() => getSoundMuted());

  const canvasRef = useRef<HTMLDivElement | null>(null);
  const dragRef = useRef<{ id: string; offsetXM: number; offsetYM: number } | null>(null);

  const pxPerMeter = Math.min(540 / scenario.dimensions.widthM, 400 / scenario.dimensions.lengthM);
  const canvasW = Math.round(scenario.dimensions.widthM * pxPerMeter);
  const canvasH = Math.round(scenario.dimensions.lengthM * pxPerMeter);

  const selectedItem = useMemo(
    () => items.find((i) => i.id === selectedId) ?? null,
    [items, selectedId]
  );

  const resultRef = useRef<HTMLDivElement | null>(null);

  const switchScenario = (idx: number) => {
    setScenarioIdx(idx);
    setItems([]);
    setSelectedId(null);
    setEvaluation(null);
  };

  const handleAddRequired = (kind: FurnitureKind) => {
    const tpl = FURNITURE_CATALOG.find((c) => c.kind === kind);
    if (!tpl) return;
    const slot = items.length;
    const cols = 3;
    const col = slot % cols;
    const row = Math.floor(slot / cols);
    const xM = 1.1 + col * ((scenario.dimensions.widthM - 2.2) / Math.max(1, cols - 1));
    const yM = 1.1 + row * 1.45;
    const created = clampFurnitureToRoom(
      {
        id: `chal-${Date.now()}-${Math.random().toString(36).slice(2, 5)}`,
        kind: tpl.kind,
        label: tpl.name,
        xM,
        yM,
        widthM: tpl.defaultWidthM,
        depthM: tpl.defaultDepthM,
        rotationDeg: 0,
        scale: 1,
        color: tpl.defaultColor,
      },
      scenario.dimensions
    );
    setItems((prev) => [...prev, created]);
    setSelectedId(created.id);
    setEvaluation(null);
    playPlaceFx();
  };

  const handleRotateSelected = () => {
    if (!selectedId) return;
    setItems((prev) =>
      prev.map((it) =>
        it.id === selectedId
          ? clampFurnitureToRoom({ ...it, rotationDeg: (it.rotationDeg + 45) % 360 }, scenario.dimensions)
          : it
      )
    );
    setEvaluation(null);
    playRotateFx();
  };

  const handleDeleteSelected = () => {
    if (!selectedId) return;
    setItems((prev) => prev.filter((it) => it.id !== selectedId));
    setSelectedId(null);
    setEvaluation(null);
  };

  const handleReset = () => {
    setItems([]);
    setSelectedId(null);
    setEvaluation(null);
  };

  const handleCheckLayout = () => {
    const result = evaluateChallengeLayout(scenario, items);
    setEvaluation(result);

    const updatedBest = {
      ...bestScores,
      [scenario.id]: Math.max(bestScores[scenario.id] ?? 0, result.totalScore),
    };
    setBestScores(updatedBest);

    const values = Object.values(updatedBest) as number[];
    const avgOrBest = values.length > 0 ? Math.max(...values) : result.totalScore;
    onBestScoreChange?.(avgOrBest);

    if (result.totalScore >= 75) playSuccessFx();
    else playWarningFx();

    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 60);
  };

  const toggleMute = () => {
    const next = !muted;
    setMuted(next);
    setSoundMuted(next);
  };

  const onPointerDownItem = (e: React.PointerEvent, item: PlacedFurniture) => {
    e.stopPropagation();
    setSelectedId(item.id);
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const pX = (e.clientX - rect.left) / pxPerMeter;
    const pY = (e.clientY - rect.top) / pxPerMeter;
    dragRef.current = { id: item.id, offsetXM: item.xM - pX, offsetYM: item.yM - pY };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMoveCanvas = (e: React.PointerEvent) => {
    const drag = dragRef.current;
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!drag || !rect) return;
    const pX = (e.clientX - rect.left) / pxPerMeter;
    const pY = (e.clientY - rect.top) / pxPerMeter;
    setItems((prev) =>
      prev.map((it) =>
        it.id === drag.id
          ? clampFurnitureToRoom({ ...it, xM: pX + drag.offsetXM, yM: pY + drag.offsetYM }, scenario.dimensions)
          : it
      )
    );
  };

  const onPointerUpCanvas = () => {
    if (dragRef.current) {
      dragRef.current = null;
      playPlaceFx();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <p className="text-xs font-medium text-amber-700">
            Latihan Praktik Tata Ruang · SMK Taman Harapan (XI MPLB)
          </p>
          <h2 className="text-2xl font-bold text-slate-900 mt-0.5">
            Simulasi Penataan Furniture
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Pilih studi kasus ruangan kosong, tambahkan furniture sesuai daftar, tata mengikuti prinsip K3 &amp; ergonomi, lalu periksa skor Anda.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={toggleMute}
            aria-label={muted ? 'Aktifkan efek suara' : 'Bisukan efek suara'}
            className="px-3 py-2 rounded-lg border border-slate-300 text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-1.5"
          >
            {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            {muted ? 'Suara Mati' : 'Suara Aktif'}
          </button>
          <button
            type="button"
            onClick={handleCheckLayout}
            className="px-4 py-2 rounded-lg bg-slate-900 text-white hover:bg-slate-800 text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap shrink-0"
          >
            <ClipboardCheck className="w-4 h-4 text-amber-400" />
            Periksa Penataan
          </button>
        </div>
      </div>

      {/* Scenario Selector Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {CHALLENGE_SCENARIOS.map((sc, idx) => {
          const active = idx === scenarioIdx;
          const best = bestScores[sc.id];
          return (
            <button
              key={sc.id}
              type="button"
              onClick={() => switchScenario(idx)}
              className={`p-3.5 rounded-xl border text-left transition-colors ${
                active
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'bg-white text-slate-900 border-slate-200 hover:border-slate-400'
              }`}
            >
              <div className="flex items-center justify-between text-xs mb-1">
                <span className={active ? 'text-amber-300 font-semibold' : 'text-amber-700 font-semibold'}>
                  {sc.difficulty} · {sc.dimensions.widthM}×{sc.dimensions.lengthM}m
                </span>
                {best !== undefined && (
                  <span className="font-mono tabular-nums font-bold">Skor: {best}</span>
                )}
              </div>
              <div className="text-sm font-bold leading-snug">{sc.title}</div>
            </button>
          );
        })}
      </div>

      {/* Main Challenge Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Instructions & Furniture Checklist */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-3">
            <h3 className="text-sm font-bold text-slate-900">Instruksi Penataan</h3>
            <p className="text-xs text-slate-600 leading-relaxed">{scenario.description}</p>
            <ol className="space-y-1.5 text-xs text-slate-700 list-decimal pl-4">
              {scenario.instructions.map((ins, i) => (
                <li key={i}>{ins}</li>
              ))}
            </ol>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-3">
            <h3 className="text-sm font-bold text-slate-900">Daftar Furniture Wajib</h3>
            <div className="space-y-2">
              {scenario.requirements.map((req) => {
                const count = items.filter((it) => it.kind === req.kind).length;
                const done = count >= req.minCount;
                return (
                  <div
                    key={req.kind}
                    className="flex items-center justify-between gap-2 p-2.5 rounded-lg border border-slate-200 bg-slate-50"
                  >
                    <div className="min-w-0">
                      <div className="text-xs font-semibold text-slate-900">{req.label}</div>
                      <div
                        className={`text-[11px] font-mono tabular-nums ${
                          done ? 'text-emerald-700 font-semibold' : 'text-slate-500'
                        }`}
                      >
                        Terpasang: {count} / min. {req.minCount}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleAddRequired(req.kind)}
                      className="px-2.5 py-1.5 rounded-md bg-slate-900 text-white hover:bg-slate-700 text-xs font-medium flex items-center gap-1 shrink-0"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Tambah
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Empty Room Interactive Canvas + Results */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-slate-100 border border-slate-200 rounded-xl p-4 flex flex-col items-center">
            {/* Quick Controls Bar */}
            <div className="w-full flex flex-wrap items-center justify-between gap-2 mb-3">
              <div className="text-xs font-mono tabular-nums text-slate-600">
                Ruang Kosong: {scenario.dimensions.widthM}m × {scenario.dimensions.lengthM}m · Objek: {items.length}
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  disabled={!selectedItem}
                  onClick={handleRotateSelected}
                  className="px-2.5 py-1.5 rounded-lg bg-white border border-slate-300 text-xs font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-40 flex items-center gap-1"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                  Putar 45°
                </button>
                <button
                  type="button"
                  disabled={!selectedItem}
                  onClick={handleDeleteSelected}
                  className="px-2.5 py-1.5 rounded-lg bg-white border border-red-200 text-xs font-medium text-red-700 hover:bg-red-50 disabled:opacity-40 flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Hapus
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-2.5 py-1.5 rounded-lg bg-white border border-slate-300 text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Kosongkan
                </button>
              </div>
            </div>

            {/* Canvas */}
            <div
              ref={canvasRef}
              data-testid="challenge-canvas"
              onPointerMove={onPointerMoveCanvas}
              onPointerUp={onPointerUpCanvas}
              onClick={() => setSelectedId(null)}
              style={{
                width: `${canvasW}px`,
                height: `${canvasH}px`,
                backgroundSize: `${pxPerMeter * 0.5}px ${pxPerMeter * 0.5}px`,
              }}
              className="relative blueprint-grid border-[4px] border-slate-900 shadow-sm select-none touch-none"
            >
              {/* Window marker */}
              {scenario.windowWall === 'top' ? (
                <div className="absolute -top-1.5 left-1/4 w-1/2 h-2 bg-sky-400 border border-slate-700 pointer-events-none" />
              ) : (
                <div className="absolute -right-1.5 top-1/4 h-1/2 w-2 bg-sky-400 border border-slate-700 pointer-events-none" />
              )}

              {/* Door marker */}
              {scenario.doorWall === 'bottom' ? (
                <div className="absolute -bottom-1.5 left-[42%] w-[16%] h-2 bg-amber-500 border border-slate-800 pointer-events-none" />
              ) : (
                <div className="absolute -left-1.5 top-[42%] h-[16%] w-2 bg-amber-500 border border-slate-800 pointer-events-none" />
              )}

              {items.length === 0 && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none p-6 text-center">
                  <p className="text-xs font-medium text-slate-400 max-w-xs">
                    Ruangan masih kosong. Klik tombol &ldquo;+ Tambah&rdquo; pada daftar furniture wajib di sebelah kiri untuk mulai menata.
                  </p>
                </div>
              )}

              {items.map((item) => {
                const isSelected = item.id === selectedId;
                const overlap = items.some((o) => o.id !== item.id && doItemsOverlap(item, o));
                const wPx = item.widthM * item.scale * pxPerMeter;
                const hPx = item.depthM * item.scale * pxPerMeter;

                return (
                  <button
                    key={item.id}
                    type="button"
                    aria-label={`${item.label} tantangan`}
                    onPointerDown={(e) => onPointerDownItem(e, item)}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedId(item.id);
                    }}
                    style={{
                      left: `${item.xM * pxPerMeter - wPx / 2}px`,
                      top: `${item.yM * pxPerMeter - hPx / 2}px`,
                      width: `${wPx}px`,
                      height: `${hPx}px`,
                      transform: `rotate(${item.rotationDeg}deg)`,
                    }}
                    className={`absolute cursor-grab active:cursor-grabbing ${isSelected ? 'z-20' : 'z-10'}`}
                  >
                    <Furniture2DSymbol
                      kind={item.kind}
                      color={item.color}
                      selected={isSelected}
                      hasOverlap={overlap}
                      label={item.label}
                    />
                  </button>
                );
              })}
            </div>
            <div className="mt-2.5 flex items-center gap-4 text-[11px] text-slate-500">
              <span>Garis Biru: Jendela Cahaya Alami</span>
              <span>·</span>
              <span>Garis Oranye: Pintu Masuk</span>
            </div>
          </div>

          {/* Evaluation Result Card */}
          {evaluation && (
            <div
              ref={resultRef}
              data-testid="challenge-result"
              className="bg-white border border-slate-200 rounded-xl p-5 space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-slate-900 text-amber-400 flex items-center justify-center">
                    <Trophy className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xs font-medium text-slate-500">Hasil Pemeriksaan Penataan</div>
                    <div className="text-xl font-bold text-slate-900">
                      Predikat: {evaluation.predicate}
                    </div>
                  </div>
                </div>
                <div className="text-left sm:text-right">
                  <div className="text-xs text-slate-500">Skor Total</div>
                  <div className="text-3xl font-bold font-mono tabular-nums text-slate-900">
                    {evaluation.totalScore}
                    <span className="text-sm font-normal text-slate-500">/100</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {evaluation.checklist.map((c, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-lg border flex items-start gap-2.5 ${
                      c.passed
                        ? 'bg-emerald-50/70 border-emerald-200'
                        : 'bg-amber-50/70 border-amber-200'
                    }`}
                  >
                    {c.passed ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <div className="text-xs font-semibold text-slate-900">{c.label}</div>
                      <div className="text-[11px] text-slate-600">{c.detail}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-lg p-3.5">
                <div className="text-xs font-bold text-slate-900 mb-1.5">Saran Perbaikan &amp; Umpan Balik:</div>
                <ul className="space-y-1 text-xs text-slate-700 list-disc pl-4">
                  {evaluation.feedback.map((fb, idx) => (
                    <li key={idx}>{fb}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
