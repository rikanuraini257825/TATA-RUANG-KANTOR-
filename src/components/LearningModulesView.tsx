import React, { useState } from 'react';
import { Check, ChevronRight, Lightbulb, ShieldCheck } from 'lucide-react';
import {
  FURNITURE_LEARNING_ITEMS,
  INTERIOR_ROOM_EXAMPLES,
  INTERIOR_STYLES,
  LAYOUT_TYPES,
  MODULE_1_INTRO,
  MODULE_2_THEORY,
  MODULE_4_PRINCIPLES,
} from '../data/learningContent';
import { Layout2DDiagram } from './Layout2DDiagram';
import { ResilientImage } from './ResilientImage';

export const LearningModulesView: React.FC = () => {
  const [activeMod, setActiveMod] = useState<1 | 2 | 3 | 4>(1);
  const [selectedFurnitureId, setSelectedFurnitureId] = useState(FURNITURE_LEARNING_ITEMS[0].id);

  const selectedFurniture =
    FURNITURE_LEARNING_ITEMS.find((f) => f.id === selectedFurnitureId) ?? FURNITURE_LEARNING_ITEMS[0];

  return (
    <div className="space-y-6">
      {/* Header + Module Switcher */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <div>
            <div className="text-xs font-semibold text-amber-700">
              Bahan Ajar Digital · XI MPLB · SMK Taman Harapan
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mt-0.5">Materi Pembelajaran</h2>
          </div>
          <span className="text-xs text-slate-500">Pilih Modul 1 – 4 di bawah ini</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {(
            [
              { id: 1, title: 'Modul 1', sub: 'Furniture Kantor' },
              { id: 2, title: 'Modul 2', sub: 'Interior Kantor' },
              { id: 3, title: 'Modul 3', sub: 'Tata Ruang Kantor' },
              { id: 4, title: 'Modul 4', sub: 'Prinsip Penataan Ruang' },
            ] as const
          ).map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => setActiveMod(m.id)}
              className={`p-3 rounded-lg border text-left transition-colors ${
                activeMod === m.id
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <div
                className={`text-[11px] font-semibold ${
                  activeMod === m.id ? 'text-amber-400' : 'text-amber-700'
                }`}
              >
                {m.title}
              </div>
              <div className="text-sm font-bold">{m.sub}</div>
            </button>
          ))}
        </div>
      </div>

      {/* MODUL 1: FURNITURE KANTOR */}
      {activeMod === 1 && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-xl p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-6 space-y-2">
              <h3 className="text-lg font-bold text-slate-900">Pengertian Furniture Kantor</h3>
              <p className="text-sm text-slate-700 leading-relaxed">{MODULE_1_INTRO.pengertian}</p>
            </div>
            <div className="lg:col-span-6 space-y-2">
              <h3 className="text-lg font-bold text-slate-900">Fungsi Utama Furniture Kantor</h3>
              <ul className="space-y-1.5 text-sm text-slate-700">
                {MODULE_1_INTRO.fungsi.map((fn, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{fn}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Interactive Explorer for all 11 Furniture Types */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            <div className="lg:col-span-4 bg-white border border-slate-200 rounded-xl p-4 space-y-2">
              <h3 className="text-sm font-bold text-slate-900 mb-2">
                11 Jenis Furniture Kantor
              </h3>
              <div className="space-y-1.5">
                {FURNITURE_LEARNING_ITEMS.map((item, idx) => {
                  const active = item.id === selectedFurniture.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setSelectedFurnitureId(item.id)}
                      className={`w-full px-3 py-2.5 rounded-lg text-left text-xs font-semibold flex items-center justify-between transition-colors ${
                        active
                          ? 'bg-slate-900 text-white'
                          : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <span>
                        {String(idx + 1).padStart(2, '0')}. {item.name}
                      </span>
                      <ChevronRight className="w-4 h-4 shrink-0" />
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="lg:col-span-8 bg-white border border-slate-200 rounded-xl overflow-hidden">
              <div className="aspect-[16/9] max-h-72 w-full bg-slate-100 overflow-hidden">
                <ResilientImage
                  src={selectedFurniture.image}
                  alt={selectedFurniture.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <div className="text-xs font-medium text-amber-700">{selectedFurniture.category}</div>
                  <h3 className="text-xl font-bold text-slate-900 mt-0.5">
                    {selectedFurniture.name}
                  </h3>
                </div>

                <div className="space-y-1">
                  <div className="text-xs font-bold text-slate-900">Fungsi &amp; Kegunaan</div>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    {selectedFurniture.functionDesc}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
                  <div>
                    <div className="text-xs font-bold text-slate-900 mb-1">Spesifikasi Umum</div>
                    <p className="text-xs text-slate-700 leading-relaxed font-mono">
                      {selectedFurniture.specs}
                    </p>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 mb-1">Material Pembuat</div>
                    <ul className="text-xs text-slate-700 space-y-1 list-disc pl-4">
                      {selectedFurniture.materials.map((m, i) => (
                        <li key={i}>{m}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
                  <div className="p-3 rounded-lg bg-emerald-50/70 border border-emerald-200">
                    <div className="text-xs font-bold text-emerald-900 mb-1">Kelebihan</div>
                    <ul className="text-xs text-emerald-900 space-y-1 list-disc pl-4">
                      {selectedFurniture.pros.map((p, i) => (
                        <li key={i}>{p}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-3 rounded-lg bg-amber-50/70 border border-amber-200">
                    <div className="text-xs font-bold text-amber-900 mb-1">Kekurangan</div>
                    <ul className="text-xs text-amber-900 space-y-1 list-disc pl-4">
                      {selectedFurniture.cons.map((c, i) => (
                        <li key={i}>{c}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="p-3.5 rounded-lg bg-slate-900 text-slate-100 flex items-start gap-2.5">
                  <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div className="text-xs leading-relaxed">
                    <span className="font-bold text-amber-300">Tips Pemilihan: </span>
                    {selectedFurniture.tips}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODUL 2: INTERIOR KANTOR */}
      {activeMod === 2 && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-xl p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-6 space-y-2">
              <h3 className="text-lg font-bold text-slate-900">Pengertian Interior Kantor</h3>
              <p className="text-sm text-slate-700 leading-relaxed">{MODULE_2_THEORY.pengertian}</p>
            </div>
            <div className="lg:col-span-6 space-y-2">
              <h3 className="text-lg font-bold text-slate-900">Tujuan Desain Interior Kantor</h3>
              <ul className="space-y-1.5 text-sm text-slate-700">
                {MODULE_2_THEORY.tujuan.map((tj, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{tj}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Prinsip Desain & Elemen Teknis */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {MODULE_2_THEORY.prinsip.map((pr, i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-xl p-4">
                <div className="text-xs font-mono font-bold text-amber-700">0{i + 1}</div>
                <h4 className="text-sm font-bold text-slate-900 mt-1">{pr.title}</h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">{pr.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
            <h3 className="text-lg font-bold text-slate-900">
              Elemen Teknis Interior: Warna, Pencahayaan, Ventilasi, Lantai &amp; Tanaman Hias
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {MODULE_2_THEORY.elemenTeknis.map((el, i) => (
                <div key={i} className="p-4 rounded-lg bg-slate-50 border border-slate-200">
                  <h4 className="text-sm font-bold text-slate-900">{el.title}</h4>
                  <p className="text-xs text-slate-700 mt-1.5 leading-relaxed">{el.detail}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 5 Gaya Desain Interior */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-slate-900">
              5 Gaya Desain Interior Kantor Modern
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {INTERIOR_STYLES.map((st) => (
                <div key={st.id} className="bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col">
                  <div className="aspect-[4/3] bg-slate-100 overflow-hidden">
                    <ResilientImage src={st.image} alt={st.name} />
                  </div>
                  <div className="p-4 space-y-2.5 flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <h4 className="text-base font-bold text-slate-900">{st.name}</h4>
                      <p className="text-xs text-amber-700 font-medium">{st.tagline}</p>
                      <ul className="text-xs text-slate-600 space-y-1 list-disc pl-4">
                        {st.characteristics.map((c, idx) => (
                          <li key={idx}>{c}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        {st.palette.map((p) => (
                          <span
                            key={p.hex}
                            title={p.name}
                            className="w-5 h-5 rounded border border-slate-300"
                            style={{ backgroundColor: p.hex }}
                          />
                        ))}
                      </div>
                      <span className="text-[11px] text-slate-500">Palet Khas</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 8 Contoh Visual Ruangan */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-slate-900">
              8 Contoh Visual Interior Ruangan Kantor
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {INTERIOR_ROOM_EXAMPLES.map((rm) => (
                <div key={rm.id} className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                  <div className="aspect-[4/3] bg-slate-100">
                    <ResilientImage src={rm.image} alt={rm.roomName} />
                  </div>
                  <div className="p-3.5 space-y-1.5">
                    <div className="text-[11px] text-amber-700 font-semibold">{rm.styleTag}</div>
                    <h4 className="text-sm font-bold text-slate-900">{rm.roomName}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">{rm.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* MODUL 3: TATA RUANG KANTOR */}
      {activeMod === 3 && (
        <div className="space-y-6">
          {LAYOUT_TYPES.map((lt, idx) => (
            <div key={lt.id} className="bg-white border border-slate-200 rounded-xl p-6 space-y-5">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 pb-3 border-b border-slate-100">
                <div>
                  <div className="text-xs font-mono font-semibold text-amber-700">
                    0{idx + 1} · {lt.englishTitle}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">{lt.title}</h3>
                </div>
              </div>

              <p className="text-sm text-slate-700 leading-relaxed">{lt.summary}</p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <Layout2DDiagram type={lt.id} />
                <div className="rounded-lg overflow-hidden border border-slate-200 aspect-[16/10] bg-slate-100">
                  <ResilientImage src={lt.image} alt={lt.title} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200">
                  <div className="text-xs font-bold text-slate-900 mb-1.5">Karakteristik</div>
                  <ul className="text-xs text-slate-700 space-y-1 list-disc pl-4">
                    {lt.characteristics.map((c, i) => (
                      <li key={i}>{c}</li>
                    ))}
                  </ul>
                </div>
                <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200">
                  <div className="text-xs font-bold text-slate-900 mb-1.5">Tujuan</div>
                  <ul className="text-xs text-slate-700 space-y-1 list-disc pl-4">
                    {lt.objectives.map((o, i) => (
                      <li key={i}>{o}</li>
                    ))}
                  </ul>
                </div>
                <div className="p-3.5 rounded-lg bg-emerald-50/70 border border-emerald-200">
                  <div className="text-xs font-bold text-emerald-900 mb-1.5">Kelebihan</div>
                  <ul className="text-xs text-emerald-900 space-y-1 list-disc pl-4">
                    {lt.pros.map((p, i) => (
                      <li key={i}>{p}</li>
                    ))}
                  </ul>
                </div>
                <div className="p-3.5 rounded-lg bg-amber-50/70 border border-amber-200">
                  <div className="text-xs font-bold text-amber-900 mb-1.5">Kekurangan &amp; Penerapan</div>
                  <ul className="text-xs text-amber-900 space-y-1 list-disc pl-4">
                    {lt.cons.map((c, i) => (
                      <li key={i}>{c}</li>
                    ))}
                  </ul>
                  <div className="mt-2 pt-2 border-t border-amber-200/70 text-[11px] font-semibold text-amber-950">
                    Contoh: {lt.applications.join(', ')}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MODUL 4: PRINSIP PENATAAN RUANG KANTOR */}
      {activeMod === 4 && (
        <div className="space-y-6">
          <div className="bg-slate-900 text-white rounded-xl p-6 flex items-start gap-4">
            <ShieldCheck className="w-8 h-8 text-amber-400 shrink-0" />
            <div>
              <h3 className="text-lg font-bold">
                11 Prinsip Pokok Penataan Ruang Kantor Modern
              </h3>
              <p className="text-sm text-slate-300 mt-1 leading-relaxed">
                Setiap rancangan tata letak kantor di program keahlian XI MPLB wajib memenuhi
                prinsip efisiensi, alur kerja, ergonomi, K3, hingga aksesibilitas inklusif berikut.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {MODULE_4_PRINCIPLES.map((pr) => (
              <div
                key={pr.number}
                className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col justify-between gap-3"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-mono font-bold text-amber-700">{pr.number}</span>
                    <span className="font-mono text-slate-500">{pr.standard}</span>
                  </div>
                  <h4 className="text-base font-bold text-slate-900">{pr.title}</h4>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">{pr.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
