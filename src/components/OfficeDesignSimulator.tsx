import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Box,
  Copy,
  Download,
  FolderOpen,
  Grid2x2,
  Plus,
  Redo2,
  RotateCcw,
  RotateCw,
  Save,
  Trash2,
  Undo2,
} from 'lucide-react';
import {
  DEFAULT_DEMO_LAYOUT,
  FURNITURE_CATALOG,
  FURNITURE_PALETTE_COLORS,
  ROOM_SIZE_PRESETS,
  ROOM_TYPE_OPTIONS,
} from '../data/simulatorCatalog';
import {
  FurnitureCatalogTemplate,
  PlacedFurniture,
  RoomDimensions,
  RoomTypeId,
  SavedDesign,
} from '../types/office';
import {
  calculateSpaceMetrics,
  clampFurnitureToRoom,
  clampRoomDimension,
  countOverlaps,
  createHistory,
  doItemsOverlap,
  HistoryState,
  pushHistory,
  redoHistory,
  undoHistory,
} from '../utils/plannerMath';
import { playPlaceFx, playRotateFx, playSuccessFx } from '../utils/soundFx';
import { Furniture2DSymbol } from './Furniture2DSymbol';
import { Office3DPreview } from './Office3DPreview';

const STORAGE_KEY = 'smk_th_office_designs_v1';

interface OfficeDesignSimulatorProps {
  onDesignSaved?: () => void;
}

export const OfficeDesignSimulator: React.FC<OfficeDesignSimulatorProps> = ({ onDesignSaved }) => {
  const [roomType, setRoomType] = useState<RoomTypeId>('pimpinan');
  const [dimensions, setDimensions] = useState<RoomDimensions>({ widthM: 5, lengthM: 6 });
  const [customW, setCustomW] = useState('5');
  const [customL, setCustomL] = useState('6');
  const [history, setHistory] = useState<HistoryState<PlacedFurniture[]>>(() =>
    createHistory(DEFAULT_DEMO_LAYOUT)
  );
  const [selectedId, setSelectedId] = useState<string | null>(DEFAULT_DEMO_LAYOUT[0]?.id ?? null);
  const [viewMode, setViewMode] = useState<'2d' | '3d'>('2d');
  const [designName, setDesignName] = useState('Desain Ruang Pimpinan XI MPLB');
  const [savedDesigns, setSavedDesigns] = useState<SavedDesign[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as SavedDesign[]) : [];
    } catch {
      return [];
    }
  });
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const canvasBoxRef = useRef<HTMLDivElement | null>(null);
  const dragStateRef = useRef<{
    id: string;
    offsetXM: number;
    offsetYM: number;
    snapshotItems: PlacedFurniture[];
    moved: boolean;
  } | null>(null);

  const items = history.present;
  const selectedItem = useMemo(
    () => items.find((it) => it.id === selectedId) ?? null,
    [items, selectedId]
  );

  const metrics = useMemo(() => calculateSpaceMetrics(items, dimensions), [items, dimensions]);
  const overlapCount = useMemo(() => countOverlaps(items), [items]);
  const currentRoomLabel =
    ROOM_TYPE_OPTIONS.find((r) => r.id === roomType)?.label ?? 'Ruang Kantor';

  // Responsive canvas pixel sizing while maintaining exact meter aspect ratio
  const maxCanvasWidth = 660;
  const maxCanvasHeight = 460;
  const pxPerMeter = Math.min(
    maxCanvasWidth / dimensions.widthM,
    maxCanvasHeight / dimensions.lengthM
  );
  const canvasWidthPx = Math.round(dimensions.widthM * pxPerMeter);
  const canvasHeightPx = Math.round(dimensions.lengthM * pxPerMeter);

  const commitItems = (nextItems: PlacedFurniture[]) => {
    setHistory((prev) => pushHistory(prev, nextItems));
  };

  const applyPresetSize = (dims: RoomDimensions) => {
    setDimensions(dims);
    setCustomW(String(dims.widthM));
    setCustomL(String(dims.lengthM));
    const reclamped = items.map((it) => clampFurnitureToRoom(it, dims));
    commitItems(reclamped);
  };

  const applyCustomSize = () => {
    const w = clampRoomDimension(parseFloat(customW));
    const l = clampRoomDimension(parseFloat(customL));
    setCustomW(String(w));
    setCustomL(String(l));
    const dims = { widthM: w, lengthM: l };
    setDimensions(dims);
    commitItems(items.map((it) => clampFurnitureToRoom(it, dims)));
  };

  const handleAddFurniture = (tpl: FurnitureCatalogTemplate) => {
    const newItem: PlacedFurniture = clampFurnitureToRoom(
      {
        id: `item-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        kind: tpl.kind,
        label: tpl.name,
        xM: Math.round((dimensions.widthM / 2 + (Math.random() - 0.5) * 0.6) * 100) / 100,
        yM: Math.round((dimensions.lengthM / 2 + (Math.random() - 0.5) * 0.6) * 100) / 100,
        widthM: tpl.defaultWidthM,
        depthM: tpl.defaultDepthM,
        rotationDeg: 0,
        scale: 1,
        color: tpl.defaultColor,
      },
      dimensions
    );
    commitItems([...items, newItem]);
    setSelectedId(newItem.id);
    playPlaceFx();
    setStatusMessage(`${tpl.name} ditambahkan ke denah.`);
  };

  const updateSelectedItem = (
    patch: Partial<PlacedFurniture>,
    recordHistory = true
  ) => {
    if (!selectedId) return;
    const next = items.map((it) => {
      if (it.id !== selectedId) return it;
      return clampFurnitureToRoom({ ...it, ...patch }, dimensions);
    });
    if (recordHistory) {
      commitItems(next);
    } else {
      setHistory((prev) => ({ ...prev, present: next }));
    }
  };

  const handleDeleteSelected = () => {
    if (!selectedId) return;
    const next = items.filter((it) => it.id !== selectedId);
    commitItems(next);
    setSelectedId(next[0]?.id ?? null);
  };

  const handleDuplicateSelected = () => {
    if (!selectedItem) return;
    const dup = clampFurnitureToRoom(
      {
        ...selectedItem,
        id: `dup-${Date.now()}`,
        xM: selectedItem.xM + 0.4,
        yM: selectedItem.yM + 0.4,
      },
      dimensions
    );
    commitItems([...items, dup]);
    setSelectedId(dup.id);
    playPlaceFx();
  };

  const handleUndo = () => setHistory((prev) => undoHistory(prev));
  const handleRedo = () => setHistory((prev) => redoHistory(prev));

  const handleReset = () => {
    commitItems([]);
    setSelectedId(null);
    setStatusMessage('Kanvas dikosongkan. Silakan tambahkan furniture dari panel kiri.');
  };

  const handleLoadDemo = () => {
    setRoomType('pimpinan');
    setDimensions({ widthM: 5, lengthM: 6 });
    setCustomW('5');
    setCustomL('6');
    commitItems(DEFAULT_DEMO_LAYOUT);
    setSelectedId(DEFAULT_DEMO_LAYOUT[0].id);
    setStatusMessage('Contoh tata ruang pimpinan dimuat.');
  };

  const handleSaveDesign = () => {
    const cleanName = designName.trim() || `${currentRoomLabel} (${dimensions.widthM}x${dimensions.lengthM}m)`;
    const entry: SavedDesign = {
      id: `des-${Date.now()}`,
      name: cleanName,
      roomType,
      dimensions,
      items,
      savedAt: new Date().toLocaleString('id-ID'),
    };
    const updated = [entry, ...savedDesigns].slice(0, 8);
    setSavedDesigns(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // Ignore quota
    }
    playSuccessFx();
    setStatusMessage(`Desain "${cleanName}" berhasil disimpan.`);
    onDesignSaved?.();
  };

  const handleLoadSaved = (saved: SavedDesign) => {
    setDesignName(saved.name);
    setRoomType(saved.roomType);
    setDimensions(saved.dimensions);
    setCustomW(String(saved.dimensions.widthM));
    setCustomL(String(saved.dimensions.lengthM));
    commitItems(saved.items);
    setSelectedId(saved.items[0]?.id ?? null);
    setStatusMessage(`Desain "${saved.name}" dimuat ke kanvas.`);
  };

  const handleDeleteSaved = (id: string) => {
    const updated = savedDesigns.filter((d) => d.id !== id);
    setSavedDesigns(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // Ignore
    }
  };

  // High-resolution architectural PNG Blueprint export
  const handleDownload2DPng = () => {
    const scale = 120; // px per meter
    const padX = 80;
    const padTop = 96;
    const padBottom = 88;
    const outW = Math.max(760, Math.round(dimensions.widthM * scale + padX * 2));
    const outH = Math.round(dimensions.lengthM * scale + padTop + padBottom);

    const canvas = document.createElement('canvas');
    canvas.width = outW;
    canvas.height = outH;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Background sheet
    ctx.fillStyle = '#F8FAFC';
    ctx.fillRect(0, 0, outW, outH);

    // Header Kop SMK Taman Harapan
    ctx.fillStyle = '#0B1F3A';
    ctx.fillRect(0, 0, outW, 68);
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 20px sans-serif';
    ctx.fillText('OFFICE DESIGN & SPACE PLANNER — SMK TAMAN HARAPAN', 28, 30);
    ctx.fillStyle = '#FBBF24';
    ctx.font = '13px sans-serif';
    ctx.fillText(
      `XI MPLB · ${designName} · ${currentRoomLabel} (${dimensions.widthM}m × ${dimensions.lengthM}m = ${metrics.roomAreaM2} m²)`,
      28,
      52
    );

    const roomOriginX = (outW - dimensions.widthM * scale) / 2;
    const roomOriginY = padTop;
    const roomW = dimensions.widthM * scale;
    const roomH = dimensions.lengthM * scale;

    // Room floor
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(roomOriginX, roomOriginY, roomW, roomH);

    // 0.5m Grid lines
    ctx.strokeStyle = '#E2E8F0';
    ctx.lineWidth = 1;
    for (let x = 0.5; x < dimensions.widthM; x += 0.5) {
      ctx.beginPath();
      ctx.moveTo(roomOriginX + x * scale, roomOriginY);
      ctx.lineTo(roomOriginX + x * scale, roomOriginY + roomH);
      ctx.stroke();
    }
    for (let y = 0.5; y < dimensions.lengthM; y += 0.5) {
      ctx.beginPath();
      ctx.moveTo(roomOriginX, roomOriginY + y * scale);
      ctx.lineTo(roomOriginX + roomW, roomOriginY + y * scale);
      ctx.stroke();
    }

    // Room outer walls
    ctx.strokeStyle = '#0F172A';
    ctx.lineWidth = 6;
    ctx.strokeRect(roomOriginX, roomOriginY, roomW, roomH);

    // Window & Door markers
    ctx.fillStyle = '#38BDF8';
    ctx.fillRect(roomOriginX + roomW * 0.25, roomOriginY - 4, roomW * 0.5, 8);
    ctx.fillStyle = '#D97706';
    ctx.fillRect(roomOriginX + roomW * 0.42, roomOriginY + roomH - 4, roomW * 0.16, 8);

    // Draw each furniture item
    items.forEach((it) => {
      const cx = roomOriginX + it.xM * scale;
      const cy = roomOriginY + it.yM * scale;
      const fw = it.widthM * it.scale * scale;
      const fd = it.depthM * it.scale * scale;

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate((it.rotationDeg * Math.PI) / 180);

      ctx.fillStyle = it.color;
      ctx.strokeStyle = '#0F172A';
      ctx.lineWidth = 2;

      if (it.kind === 'tanaman' || it.kind === 'lampu' || it.kind === 'kursi') {
        ctx.beginPath();
        ctx.ellipse(0, 0, fw / 2, fd / 2, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      } else {
        ctx.fillRect(-fw / 2, -fd / 2, fw, fd);
        ctx.strokeRect(-fw / 2, -fd / 2, fw, fd);
      }

      ctx.fillStyle = '#0F172A';
      ctx.font = 'bold 11px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(it.label, 0, fd / 2 + 14);
      ctx.restore();
    });

    // Footer metadata bar
    ctx.fillStyle = '#334155';
    ctx.font = '12px sans-serif';
    ctx.fillText(
      `Jumlah Furniture: ${items.length} unit  |  Luas Terpakai: ${metrics.usedAreaM2} m²  |  Sirkulasi Bebas: ${metrics.circulationPercent}%`,
      28,
      outH - 36
    );
    ctx.fillStyle = '#64748B';
    ctx.fillText('Skala Proporsional Top View 2D · Media Pembelajaran Digital SMK Taman Harapan', 28, outH - 16);

    const link = document.createElement('a');
    link.download = `blueprint-kantor-${roomType}-${dimensions.widthM}x${dimensions.lengthM}m.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    playSuccessFx();
  };

  // Pointer Drag & Drop Handlers on 2D Canvas
  const handleItemPointerDown = (e: React.PointerEvent, item: PlacedFurniture) => {
    e.stopPropagation();
    setSelectedId(item.id);
    const rect = canvasBoxRef.current?.getBoundingClientRect();
    if (!rect) return;
    const pointerXM = (e.clientX - rect.left) / pxPerMeter;
    const pointerYM = (e.clientY - rect.top) / pxPerMeter;

    dragStateRef.current = {
      id: item.id,
      offsetXM: item.xM - pointerXM,
      offsetYM: item.yM - pointerYM,
      snapshotItems: items,
      moved: false,
    };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handleCanvasPointerMove = (e: React.PointerEvent) => {
    const drag = dragStateRef.current;
    const rect = canvasBoxRef.current?.getBoundingClientRect();
    if (!drag || !rect) return;

    const pointerXM = (e.clientX - rect.left) / pxPerMeter;
    const pointerYM = (e.clientY - rect.top) / pxPerMeter;
    const targetX = pointerXM + drag.offsetXM;
    const targetY = pointerYM + drag.offsetYM;
    drag.moved = true;

    setHistory((prev) => ({
      ...prev,
      present: prev.present.map((it) =>
        it.id === drag.id
          ? clampFurnitureToRoom({ ...it, xM: targetX, yM: targetY }, dimensions)
          : it
      ),
    }));
  };

  const handleCanvasPointerUp = () => {
    const drag = dragStateRef.current;
    if (!drag) return;
    if (drag.moved) {
      setHistory((prev) => ({
        past: [...prev.past, drag.snapshotItems].slice(-40),
        present: prev.present,
        future: [],
      }));
      playPlaceFx();
    }
    dragStateRef.current = null;
  };

  // Keyboard Undo/Redo & Delete shortcuts
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement)?.tagName === 'INPUT') return;
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
        e.preventDefault();
        handleUndo();
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'y') {
        e.preventDefault();
        handleRedo();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div className="space-y-6">
      {/* Studio Top Header & Mode Switch */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <p className="text-xs font-medium text-amber-700 tracking-wide">
            Studio Desain Interaktif · SMK Taman Harapan (XI MPLB)
          </p>
          <h2 className="text-2xl font-bold text-slate-900 mt-0.5">
            Simulasi Desain Kantor 2D &amp; 3D
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Atur ukuran ruangan, seret dan putar furniture di denah Top View, lalu tinjau hasilnya dalam visual 3D.
          </p>
        </div>

        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 shrink-0">
          <div className="inline-flex bg-slate-100 p-1 rounded-lg border border-slate-200">
            <button
              type="button"
              onClick={() => setViewMode('2d')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 ${
                viewMode === '2d'
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Grid2x2 className="w-3.5 h-3.5" />
              Denah 2D
            </button>
            <button
              type="button"
              onClick={() => setViewMode('3d')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 ${
                viewMode === '3d'
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Box className="w-3.5 h-3.5" />
              Visual 3D
            </button>
          </div>

          <button
            type="button"
            onClick={handleDownload2DPng}
            className="px-3.5 py-2 rounded-lg text-xs font-semibold bg-amber-500 text-slate-950 hover:bg-amber-400 flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0"
          >
            <Download className="w-4 h-4" />
            Unduh PNG
          </button>
        </div>
      </div>

      {/* Room Setup & Toolbar */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 grid grid-cols-1 xl:grid-cols-12 gap-4 items-end">
        <div className="xl:col-span-3">
          <label htmlFor="sim-room-type" className="block text-xs font-semibold text-slate-700 mb-1.5">
            Jenis Ruangan Kantor
          </label>
          <select
            id="sim-room-type"
            value={roomType}
            onChange={(e) => setRoomType(e.target.value as RoomTypeId)}
            className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
          >
            {ROOM_TYPE_OPTIONS.map((opt) => (
              <option key={opt.id} value={opt.id}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div className="xl:col-span-4">
          <span className="block text-xs font-semibold text-slate-700 mb-1.5">
            Ukuran Ruangan Standar
          </span>
          <div className="flex flex-wrap sm:flex-nowrap gap-1.5">
            {ROOM_SIZE_PRESETS.map((preset) => {
              const active =
                dimensions.widthM === preset.dimensions.widthM &&
                dimensions.lengthM === preset.dimensions.lengthM;
              return (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => applyPresetSize(preset.dimensions)}
                  className={`px-2.5 py-1.5 rounded-md text-xs font-medium border transition-colors whitespace-nowrap shrink-0 ${
                    active
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  {preset.dimensions.widthM}×{preset.dimensions.lengthM} m
                </button>
              );
            })}
          </div>
        </div>

        <div className="xl:col-span-3">
          <span className="block text-xs font-semibold text-slate-700 mb-1.5">
            Ukuran Custom (2,5 – 15 m)
          </span>
          <div className="flex items-center gap-2">
            <input
              type="number"
              aria-label="Lebar ruangan dalam meter"
              step="0.5"
              min="2.5"
              max="15"
              value={customW}
              onChange={(e) => setCustomW(e.target.value)}
              className="w-20 px-2.5 py-1.5 text-sm font-mono tabular-nums bg-slate-50 border border-slate-300 rounded-lg"
            />
            <span className="text-xs text-slate-500">×</span>
            <input
              type="number"
              aria-label="Panjang ruangan dalam meter"
              step="0.5"
              min="2.5"
              max="15"
              value={customL}
              onChange={(e) => setCustomL(e.target.value)}
              className="w-20 px-2.5 py-1.5 text-sm font-mono tabular-nums bg-slate-50 border border-slate-300 rounded-lg"
            />
            <button
              type="button"
              onClick={applyCustomSize}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 text-white hover:bg-slate-700 whitespace-nowrap shrink-0"
            >
              Terapkan
            </button>
          </div>
        </div>

        <div className="xl:col-span-2 flex items-center justify-end gap-1.5">
          <button
            type="button"
            onClick={handleUndo}
            disabled={history.past.length === 0}
            aria-label="Undo perubahan"
            title="Undo (Ctrl+Z)"
            className="p-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 disabled:opacity-40"
          >
            <Undo2 className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleRedo}
            disabled={history.future.length === 0}
            aria-label="Redo perubahan"
            title="Redo (Ctrl+Y)"
            className="p-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 disabled:opacity-40"
          >
            <Redo2 className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="px-3 py-2 rounded-lg border border-red-200 text-red-700 bg-red-50 hover:bg-red-100 text-xs font-semibold flex items-center gap-1 whitespace-nowrap shrink-0"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </button>
        </div>
      </div>

      {/* Main 3-Column Studio Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left: Furniture Catalog */}
        <div className="lg:col-span-3 bg-white border border-slate-200 rounded-xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">Katalog Furniture</h3>
            <button
              type="button"
              onClick={handleLoadDemo}
              className="text-xs font-medium text-amber-700 hover:underline"
            >
              Muat Contoh
            </button>
          </div>
          <p className="text-xs text-slate-500">
            Klik item untuk menempatkannya ke tengah denah ruangan.
          </p>

          <div className="grid grid-cols-2 lg:grid-cols-1 gap-2 max-h-[460px] overflow-y-auto pr-1">
            {FURNITURE_CATALOG.map((tpl) => (
              <button
                key={tpl.kind}
                type="button"
                onClick={() => handleAddFurniture(tpl)}
                className="flex items-center justify-between gap-2 p-2.5 rounded-lg border border-slate-200 hover:border-slate-900 hover:bg-slate-50 text-left transition-colors"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 shrink-0 bg-slate-100 rounded p-1 border border-slate-200">
                    <Furniture2DSymbol kind={tpl.kind} color={tpl.defaultColor} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-semibold text-slate-900 truncate">{tpl.name}</div>
                    <div className="text-[11px] font-mono tabular-nums text-slate-500">
                      {tpl.defaultWidthM}×{tpl.defaultDepthM} m
                    </div>
                  </div>
                </div>
                <Plus className="w-4 h-4 text-slate-500 shrink-0" />
              </button>
            ))}
          </div>
        </div>

        {/* Center: 2D Top View Canvas OR 3D Viewport */}
        <div className="lg:col-span-6 space-y-3">
          {/* Metrics Strip */}
          <div className="grid grid-cols-4 gap-2 bg-white border border-slate-200 rounded-xl p-3 text-center">
            <div>
              <div className="text-[11px] text-slate-500">Luas Ruang</div>
              <div className="text-sm font-bold font-mono tabular-nums text-slate-900">
                {metrics.roomAreaM2} m²
              </div>
            </div>
            <div>
              <div className="text-[11px] text-slate-500">Terpakai</div>
              <div className="text-sm font-bold font-mono tabular-nums text-slate-900">
                {metrics.usedAreaM2} m²
              </div>
            </div>
            <div>
              <div className="text-[11px] text-slate-500">Sirkulasi K3</div>
              <div
                className={`text-sm font-bold font-mono tabular-nums ${
                  metrics.circulationPercent >= 45 ? 'text-emerald-700' : 'text-amber-700'
                }`}
              >
                {metrics.circulationPercent}%
              </div>
            </div>
            <div>
              <div className="text-[11px] text-slate-500">Benturan</div>
              <div
                className={`text-sm font-bold font-mono tabular-nums ${
                  overlapCount === 0 ? 'text-emerald-700' : 'text-red-600'
                }`}
              >
                {overlapCount === 0 ? 'Aman (0)' : `${overlapCount} Objek`}
              </div>
            </div>
          </div>

          {viewMode === '2d' ? (
            <div className="bg-slate-100 border border-slate-200 rounded-xl p-4 flex flex-col items-center justify-center min-h-[520px] overflow-auto">
              <div className="flex items-center justify-between w-full max-w-[660px] mb-2 text-xs text-slate-600 font-mono tabular-nums">
                <span>TOP VIEW 2D · {currentRoomLabel}</span>
                <span>
                  {dimensions.widthM} m × {dimensions.lengthM} m
                </span>
              </div>

              {/* Proportional Room Canvas */}
              <div
                ref={canvasBoxRef}
                data-testid="design-canvas-2d"
                onPointerMove={handleCanvasPointerMove}
                onPointerUp={handleCanvasPointerUp}
                onClick={() => setSelectedId(null)}
                style={{
                  width: `${canvasWidthPx}px`,
                  height: `${canvasHeightPx}px`,
                  backgroundSize: `${pxPerMeter * 0.5}px ${pxPerMeter * 0.5}px`,
                }}
                className="relative blueprint-grid border-[4px] border-slate-900 shadow-sm select-none touch-none"
              >
                {/* Architectural Window (Top Wall) */}
                <div
                  className="absolute -top-1.5 left-1/4 w-1/2 h-2 bg-sky-400 border border-slate-700 pointer-events-none"
                  title="Jendela Pencahayaan Alami"
                />
                <span className="absolute top-1.5 left-1/2 -translate-x-1/2 text-[10px] font-medium text-sky-700 pointer-events-none">
                  Jendela
                </span>

                {/* Architectural Door (Bottom Wall) */}
                <div
                  className="absolute -bottom-1.5 left-[42%] w-[16%] h-2 bg-amber-500 border border-slate-800 pointer-events-none"
                  title="Pintu Masuk"
                />
                <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 text-[10px] font-medium text-amber-800 pointer-events-none">
                  Pintu Masuk
                </span>

                {/* Placed Furniture Items */}
                {items.map((item) => {
                  const isSelected = item.id === selectedId;
                  const itemOverlap = items.some(
                    (other) => other.id !== item.id && doItemsOverlap(item, other)
                  );
                  const wPx = item.widthM * item.scale * pxPerMeter;
                  const hPx = item.depthM * item.scale * pxPerMeter;
                  const leftPx = item.xM * pxPerMeter - wPx / 2;
                  const topPx = item.yM * pxPerMeter - hPx / 2;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      aria-label={`${item.label} posisi ${item.xM}m, ${item.yM}m`}
                      onPointerDown={(e) => handleItemPointerDown(e, item)}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedId(item.id);
                      }}
                      style={{
                        left: `${leftPx}px`,
                        top: `${topPx}px`,
                        width: `${wPx}px`,
                        height: `${hPx}px`,
                        transform: `rotate(${item.rotationDeg}deg)`,
                      }}
                      className={`absolute cursor-grab active:cursor-grabbing group focus:outline-none ${
                        isSelected ? 'z-20' : 'z-10'
                      }`}
                    >
                      <Furniture2DSymbol
                        kind={item.kind}
                        color={item.color}
                        selected={isSelected}
                        hasOverlap={itemOverlap}
                        label={item.label}
                      />
                      <span className="sr-only">{item.label}</span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-3 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-600">
                <span>1 kotak kisi = 0,5 × 0,5 meter</span>
                <span aria-hidden="true">·</span>
                <span>Seret objek untuk memindahkan posisi</span>
              </div>
            </div>
          ) : (
            <Office3DPreview
              dimensions={dimensions}
              items={items}
              roomTitle={currentRoomLabel}
            />
          )}

          {statusMessage && (
            <div className="px-3.5 py-2 rounded-lg bg-slate-900 text-slate-100 text-xs flex items-center justify-between">
              <span>{statusMessage}</span>
              <button
                type="button"
                onClick={() => setStatusMessage(null)}
                className="text-amber-300 hover:underline ml-3"
              >
                Tutup
              </button>
            </div>
          )}
        </div>

        {/* Right: Inspector & Save/Load Panel */}
        <div className="lg:col-span-3 space-y-4">
          {/* Selected Object Inspector */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-4">
            <h3 className="text-sm font-bold text-slate-900">Properti Objek Terpilih</h3>

            {selectedItem ? (
              <div className="space-y-3.5">
                <div>
                  <label htmlFor="prop-label" className="block text-xs font-medium text-slate-600 mb-1">
                    Nama Label
                  </label>
                  <input
                    id="prop-label"
                    type="text"
                    value={selectedItem.label}
                    onChange={(e) => updateSelectedItem({ label: e.target.value })}
                    className="w-full px-2.5 py-1.5 text-sm border border-slate-300 rounded-lg"
                  />
                </div>

                {/* Rotation */}
                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-medium text-slate-600">Rotasi</span>
                    <span className="font-mono tabular-nums font-semibold text-slate-900">
                      {selectedItem.rotationDeg}°
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="range"
                      aria-label="Sudut rotasi furniture"
                      min="0"
                      max="345"
                      step="15"
                      value={selectedItem.rotationDeg}
                      onChange={(e) => {
                        updateSelectedItem({ rotationDeg: Number(e.target.value) });
                        playRotateFx();
                      }}
                      className="flex-1 accent-slate-900"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        updateSelectedItem({
                          rotationDeg: (selectedItem.rotationDeg + 45) % 360,
                        });
                        playRotateFx();
                      }}
                      aria-label="Putar 45 derajat"
                      className="px-2 py-1 rounded border border-slate-300 text-xs font-medium hover:bg-slate-100 flex items-center gap-1"
                    >
                      <RotateCw className="w-3.5 h-3.5" />
                      45°
                    </button>
                  </div>
                </div>

                {/* Scale */}
                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-medium text-slate-600">Ukuran (Skala)</span>
                    <span className="font-mono tabular-nums font-semibold text-slate-900">
                      {Math.round(selectedItem.scale * 100)}% ({(selectedItem.widthM * selectedItem.scale).toFixed(2)}×{(selectedItem.depthM * selectedItem.scale).toFixed(2)}m)
                    </span>
                  </div>
                  <input
                    type="range"
                    aria-label="Skala ukuran furniture"
                    min="0.6"
                    max="1.8"
                    step="0.05"
                    value={selectedItem.scale}
                    onChange={(e) => updateSelectedItem({ scale: Number(e.target.value) })}
                    className="w-full accent-slate-900"
                  />
                </div>

                {/* Exact Coordinates */}
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label htmlFor="prop-x" className="block text-[11px] font-medium text-slate-600 mb-1">
                      Posisi X (m)
                    </label>
                    <input
                      id="prop-x"
                      type="number"
                      step="0.1"
                      value={selectedItem.xM}
                      onChange={(e) => updateSelectedItem({ xM: parseFloat(e.target.value) || 0 })}
                      className="w-full px-2 py-1 text-xs font-mono tabular-nums border border-slate-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label htmlFor="prop-y" className="block text-[11px] font-medium text-slate-600 mb-1">
                      Posisi Y (m)
                    </label>
                    <input
                      id="prop-y"
                      type="number"
                      step="0.1"
                      value={selectedItem.yM}
                      onChange={(e) => updateSelectedItem({ yM: parseFloat(e.target.value) || 0 })}
                      className="w-full px-2 py-1 text-xs font-mono tabular-nums border border-slate-300 rounded-md"
                    />
                  </div>
                </div>

                {/* Color Palette */}
                <div>
                  <span className="block text-xs font-medium text-slate-600 mb-1.5">
                    Warna Material Furniture
                  </span>
                  <div className="grid grid-cols-4 gap-1.5">
                    {FURNITURE_PALETTE_COLORS.map((c) => (
                      <button
                        key={c.hex}
                        type="button"
                        onClick={() => updateSelectedItem({ color: c.hex })}
                        title={c.name}
                        aria-label={`Pilih warna ${c.name}`}
                        className={`h-7 rounded-md border transition-transform ${
                          selectedItem.color.toLowerCase() === c.hex.toLowerCase()
                            ? 'ring-2 ring-slate-900 scale-105 border-white'
                            : 'border-slate-300'
                        }`}
                        style={{ backgroundColor: c.hex }}
                      />
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={handleDuplicateSelected}
                    className="flex-1 py-1.5 px-2.5 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center justify-center gap-1"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    Duplikat
                  </button>
                  <button
                    type="button"
                    onClick={handleDeleteSelected}
                    className="flex-1 py-1.5 px-2.5 rounded-lg border border-red-200 bg-red-50 text-xs font-semibold text-red-700 hover:bg-red-100 flex items-center justify-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Hapus
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-xs text-slate-500 py-4 text-center">
                Pilih salah satu furniture pada denah 2D untuk mengatur rotasi, ukuran, posisi, dan warna.
              </p>
            )}
          </div>

          {/* Save & Load Designs */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-3">
            <h3 className="text-sm font-bold text-slate-900">Simpan &amp; Arsip Desain</h3>
            <div className="space-y-2">
              <input
                type="text"
                aria-label="Nama proyek desain"
                value={designName}
                onChange={(e) => setDesignName(e.target.value)}
                placeholder="Nama proyek desain..."
                className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg"
              />
              <button
                type="button"
                onClick={handleSaveDesign}
                className="w-full py-2 px-3 rounded-lg bg-slate-900 text-white hover:bg-slate-800 text-xs font-semibold flex items-center justify-center gap-1.5"
              >
                <Save className="w-3.5 h-3.5" />
                Simpan Hasil Desain
              </button>
            </div>

            {savedDesigns.length > 0 && (
              <div className="pt-2 border-t border-slate-100 space-y-2 max-h-44 overflow-y-auto">
                <div className="text-[11px] font-semibold text-slate-500">Tersimpan ({savedDesigns.length})</div>
                {savedDesigns.map((sd) => (
                  <div
                    key={sd.id}
                    className="flex items-center justify-between gap-2 p-2 rounded-lg bg-slate-50 border border-slate-200"
                  >
                    <button
                      type="button"
                      onClick={() => handleLoadSaved(sd)}
                      className="text-left min-w-0 flex-1"
                    >
                      <div className="text-xs font-semibold text-slate-900 truncate flex items-center gap-1">
                        <FolderOpen className="w-3 h-3 text-amber-600 shrink-0" />
                        {sd.name}
                      </div>
                      <div className="text-[11px] text-slate-500 font-mono tabular-nums">
                        {sd.dimensions.widthM}×{sd.dimensions.lengthM}m · {sd.items.length} objek
                      </div>
                    </button>
                    <button
                      type="button"
                      aria-label={`Hapus desain ${sd.name}`}
                      onClick={() => handleDeleteSaved(sd.id)}
                      className="p-1 text-slate-400 hover:text-red-600"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
