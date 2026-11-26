import React, { useState } from 'react';
import { Eye, Lightbulb, X } from 'lucide-react';
import {
  FURNITURE_LEARNING_ITEMS,
  INTERIOR_ROOM_EXAMPLES,
  INTERIOR_STYLES,
  LAYOUT_TYPES,
} from '../data/learningContent';
import { FurnitureLearningItem } from '../types/office';
import { Layout2DDiagram } from './Layout2DDiagram';
import { ResilientImage } from './ResilientImage';

export const FurnitureGalleryView: React.FC = () => {
  const [filter, setFilter] = useState<string>('Semua');
  const [detail, setDetail] = useState<FurnitureLearningItem | null>(null);

  const categories = ['Semua', 'Kerja & Ergonomi', 'Penyimpanan & Arsip', 'Rapat & Pelayanan', 'Ruang Khusus'];
  const filtered =
    filter === 'Semua'
      ? FURNITURE_LEARNING_ITEMS
      : FURNITURE_LEARNING_ITEMS.filter((item) => item.category === filter);

  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="text-xs font-semibold text-amber-700">
            Katalog Visual · XI MPLB · SMK Taman Harapan
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mt-0.5">Galeri Furniture Kantor</h2>
          <p className="text-sm text-slate-600 mt-1">
            Jelajahi spesifikasi teknis, material pembuat, kelebihan, kekurangan, serta tips memilih furniture perkantoran.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 p-1 rounded-lg border border-slate-200">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setFilter(cat)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                filter === cat
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col justify-between"
          >
            <div>
              <div className="aspect-[4/3] bg-slate-100 overflow-hidden">
                <ResilientImage src={item.image} alt={item.name} />
              </div>
              <div className="p-4 space-y-2">
                <div className="text-xs font-medium text-amber-700">{item.category}</div>
                <h3 className="text-base font-bold text-slate-900">{item.name}</h3>
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {item.functionDesc}
                </p>
                <div className="text-[11px] font-mono text-slate-500 pt-1">{item.specs}</div>
              </div>
            </div>
            <div className="px-4 pb-4">
              <button
                type="button"
                onClick={() => setDetail(item)}
                className="w-full py-2 px-3 rounded-lg bg-slate-900 text-white hover:bg-slate-800 text-xs font-semibold flex items-center justify-center gap-1.5"
              >
                <Eye className="w-3.5 h-3.5" />
                Lihat Spesifikasi &amp; Tips
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Modal */}
      {detail && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/60 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label={`Detail ${detail.name}`}
        >
          <div className="bg-white border border-slate-200 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between p-4 border-b border-slate-200 sticky top-0 bg-white">
              <div>
                <div className="text-xs font-semibold text-amber-700">{detail.category}</div>
                <h3 className="text-lg font-bold text-slate-900">{detail.name}</h3>
              </div>
              <button
                type="button"
                aria-label="Tutup detail furniture"
                onClick={() => setDetail(null)}
                className="p-2 rounded-lg text-slate-500 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-4">
              <div className="aspect-[16/9] rounded-xl overflow-hidden bg-slate-100">
                <ResilientImage src={detail.image} alt={detail.name} />
              </div>
              <p className="text-sm text-slate-700 leading-relaxed">{detail.functionDesc}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <div className="font-bold text-slate-900 mb-1">Spesifikasi Umum</div>
                  <p className="font-mono text-slate-700">{detail.specs}</p>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <div className="font-bold text-slate-900 mb-1">Material Pembuat</div>
                  <ul className="list-disc pl-4 text-slate-700 space-y-0.5">
                    {detail.materials.map((m, i) => (
                      <li key={i}>{m}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200">
                  <div className="font-bold text-emerald-900 mb-1">Kelebihan</div>
                  <ul className="list-disc pl-4 text-emerald-900 space-y-0.5">
                    {detail.pros.map((p, i) => (
                      <li key={i}>{p}</li>
                    ))}
                  </ul>
                </div>
                <div className="p-3 rounded-lg bg-amber-50 border border-amber-200">
                  <div className="font-bold text-amber-900 mb-1">Kekurangan</div>
                  <ul className="list-disc pl-4 text-amber-900 space-y-0.5">
                    {detail.cons.map((c, i) => (
                      <li key={i}>{c}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="p-3.5 rounded-lg bg-slate-900 text-slate-100 flex items-start gap-2 text-xs">
                <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-amber-300">Tips Pemilihan: </span>
                  {detail.tips}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export const InteriorGalleryView: React.FC = () => {
  const [tab, setTab] = useState<'ruangan' | 'gaya'>('ruangan');

  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="text-xs font-semibold text-amber-700">
            Referensi Estetika Ruang · XI MPLB · SMK Taman Harapan
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mt-0.5">Galeri Interior Kantor</h2>
          <p className="text-sm text-slate-600 mt-1">
            Inspirasi visual 8 jenis ruangan kantor dan 5 gaya desain interior modern dengan standar pencahayaan.
          </p>
        </div>

        <div className="inline-flex bg-slate-100 p-1 rounded-lg border border-slate-200 self-start">
          <button
            type="button"
            onClick={() => setTab('ruangan')}
            className={`px-3.5 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap shrink-0 ${
              tab === 'ruangan' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            8 Ruangan Kantor
          </button>
          <button
            type="button"
            onClick={() => setTab('gaya')}
            className={`px-3.5 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap shrink-0 ${
              tab === 'gaya' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            5 Gaya Desain Interior
          </button>
        </div>
      </div>

      {tab === 'ruangan' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {INTERIOR_ROOM_EXAMPLES.map((rm) => (
            <div key={rm.id} className="bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col">
              <div className="aspect-[4/3] bg-slate-100">
                <ResilientImage src={rm.image} alt={rm.roomName} />
              </div>
              <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                <div className="space-y-1.5">
                  <div className="text-[11px] font-semibold text-amber-700">{rm.styleTag}</div>
                  <h3 className="text-base font-bold text-slate-900">{rm.roomName}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{rm.description}</p>
                </div>
                <div className="pt-3 border-t border-slate-100 space-y-1">
                  <div className="text-[11px] font-semibold text-slate-900">Elemen Kunci:</div>
                  <ul className="text-[11px] text-slate-600 list-disc pl-4 space-y-0.5">
                    {rm.keyElements.map((el, i) => (
                      <li key={i}>{el}</li>
                    ))}
                  </ul>
                  <div className="text-[11px] font-mono text-slate-500 pt-1">
                    Pencahayaan: {rm.lightingStandard}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {INTERIOR_STYLES.map((st) => (
            <div key={st.id} className="bg-white border border-slate-200 rounded-xl overflow-hidden grid grid-cols-1 sm:grid-cols-12">
              <div className="sm:col-span-5 bg-slate-100 min-h-[200px]">
                <ResilientImage src={st.image} alt={st.name} className="w-full h-full object-cover" />
              </div>
              <div className="sm:col-span-7 p-5 space-y-3">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">{st.name}</h3>
                  <p className="text-xs font-medium text-amber-700">{st.tagline}</p>
                </div>
                <ul className="text-xs text-slate-700 list-disc pl-4 space-y-1">
                  {st.characteristics.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
                <div className="text-xs text-slate-600">
                  <span className="font-semibold text-slate-900">Cocok untuk: </span>
                  {st.suitableFor}
                </div>
                <div className="flex items-center gap-2 pt-1">
                  {st.palette.map((p) => (
                    <div key={p.hex} className="flex items-center gap-1 text-[11px] text-slate-600">
                      <span
                        className="w-4 h-4 rounded border border-slate-300"
                        style={{ backgroundColor: p.hex }}
                      />
                      <span>{p.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export const LayoutTypesView: React.FC = () => {
  const [selectedId, setSelectedId] = useState(LAYOUT_TYPES[0].id);
  const current = LAYOUT_TYPES.find((l) => l.id === selectedId) ?? LAYOUT_TYPES[0];

  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-4">
        <div>
          <div className="text-xs font-semibold text-amber-700">
            Analisis Spasial · XI MPLB · SMK Taman Harapan
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mt-0.5">Jenis Tata Ruang Kantor</h2>
          <p className="text-sm text-slate-600 mt-1">
            Pilih masing-masing tipe tata ruang untuk membandingkan denah 2D, karakteristik, kelebihan, kekurangan, serta penerapannya.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
          {LAYOUT_TYPES.map((lt) => (
            <button
              key={lt.id}
              type="button"
              onClick={() => setSelectedId(lt.id)}
              className={`p-3 rounded-lg border text-left transition-colors ${
                selectedId === lt.id
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <div className="text-xs font-bold">{lt.title}</div>
              <div
                className={`text-[11px] mt-0.5 ${
                  selectedId === lt.id ? 'text-amber-300' : 'text-slate-500'
                }`}
              >
                {lt.englishTitle}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Selected Layout Detail */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-6">
        <div>
          <div className="text-xs font-semibold text-amber-700">{current.englishTitle}</div>
          <h3 className="text-2xl font-bold text-slate-900 mt-0.5">{current.title}</h3>
          <p className="text-sm text-slate-700 mt-2 leading-relaxed">{current.summary}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <Layout2DDiagram type={current.id} />
          <div className="rounded-lg overflow-hidden border border-slate-200 aspect-[16/10] bg-slate-100">
            <ResilientImage src={current.image} alt={current.title} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <h4 className="text-xs font-bold text-slate-900 mb-2">Karakteristik</h4>
            <ul className="text-xs text-slate-700 list-disc pl-4 space-y-1">
              {current.characteristics.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <h4 className="text-xs font-bold text-slate-900 mb-2">Tujuan</h4>
            <ul className="text-xs text-slate-700 list-disc pl-4 space-y-1">
              {current.objectives.map((o, i) => (
                <li key={i}>{o}</li>
              ))}
            </ul>
          </div>
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
            <h4 className="text-xs font-bold text-emerald-900 mb-2">Kelebihan</h4>
            <ul className="text-xs text-emerald-900 list-disc pl-4 space-y-1">
              {current.pros.map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ul>
          </div>
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
            <h4 className="text-xs font-bold text-amber-900 mb-2">Kekurangan</h4>
            <ul className="text-xs text-amber-900 list-disc pl-4 space-y-1">
              {current.cons.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <span className="text-xs font-semibold text-amber-400">Contoh Penerapan Nyata:</span>
          <span className="text-xs text-slate-200">{current.applications.join(' · ')}</span>
        </div>
      </div>

      {/* Comparison Matrix Table */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 overflow-x-auto">
        <h3 className="text-base font-bold text-slate-900 mb-3">Matriks Perbandingan Cepat</h3>
        <table className="w-full text-xs text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200 text-slate-500">
              <th className="py-2.5 pr-4">Jenis Tata Ruang</th>
              <th className="py-2.5 pr-4">Tingkat Privasi</th>
              <th className="py-2.5 pr-4">Kelancaran Komunikasi</th>
              <th className="py-2.5 pr-4">Efisiensi Biaya</th>
              <th className="py-2.5">Cocok Untuk</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            <tr>
              <td className="py-2.5 pr-4 font-semibold text-slate-900">Tertutup (Private)</td>
              <td className="py-2.5 pr-4">Sangat Tinggi</td>
              <td className="py-2.5 pr-4">Terbatas</td>
              <td className="py-2.5 pr-4">Rendah (mahal sekat)</td>
              <td className="py-2.5">Pimpinan, Keuangan, Arsip Rahasia</td>
            </tr>
            <tr>
              <td className="py-2.5 pr-4 font-semibold text-slate-900">Terbuka (Open Plan)</td>
              <td className="py-2.5 pr-4">Rendah</td>
              <td className="py-2.5 pr-4">Sangat Tinggi</td>
              <td className="py-2.5 pr-4">Sangat Tinggi</td>
              <td className="py-2.5">Staf Administrasi, Layanan Pelanggan</td>
            </tr>
            <tr>
              <td className="py-2.5 pr-4 font-semibold text-slate-900">Berpanorama (Landscape)</td>
              <td className="py-2.5 pr-4">Sedang</td>
              <td className="py-2.5 pr-4">Tinggi</td>
              <td className="py-2.5 pr-4">Sedang</td>
              <td className="py-2.5">Tim Kreatif, Ruang Kolaborasi Modern</td>
            </tr>
            <tr>
              <td className="py-2.5 pr-4 font-semibold text-slate-900">Gabungan (Hybrid)</td>
              <td className="py-2.5 pr-4">Seimbang</td>
              <td className="py-2.5 pr-4">Tinggi</td>
              <td className="py-2.5 pr-4">Optimal</td>
              <td className="py-2.5">Kantor Tata Usaha Sekolah &amp; Korporat</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
