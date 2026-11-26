import React from 'react';

interface Layout2DDiagramProps {
  type: 'tertutup' | 'terbuka' | 'berpanorama' | 'gabungan';
}

export const Layout2DDiagram: React.FC<Layout2DDiagramProps> = ({ type }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-lg p-3">
      <div className="flex items-center justify-between text-xs text-slate-500 mb-2 font-mono tabular-nums">
        <span>DENAH SKEMATIK 2D · TOP VIEW</span>
        <span>SKALA 1:100</span>
      </div>
      <svg
        viewBox="0 0 360 220"
        className="w-full h-auto bg-slate-50 border border-slate-200 rounded"
        role="img"
        aria-label={`Ilustrasi denah 2D tata ruang ${type}`}
      >
        {/* Outer architectural wall */}
        <rect x="14" y="14" width="332" height="192" fill="#FFFFFF" stroke="#0F172A" strokeWidth="4" />
        {/* Window strip top */}
        <rect x="70" y="12" width="220" height="5" fill="#38BDF8" />
        {/* Main Door bottom */}
        <rect x="160" y="203" width="40" height="6" fill="#D97706" />
        <path d="M 160 203 A 36 36 0 0 1 196 167" fill="none" stroke="#D97706" strokeWidth="1.5" strokeDasharray="3 3" />

        {type === 'tertutup' && (
          <g>
            {/* Solid partition walls */}
            <line x1="125" y1="14" x2="125" y2="145" stroke="#0F172A" strokeWidth="3.5" />
            <line x1="235" y1="14" x2="235" y2="145" stroke="#0F172A" strokeWidth="3.5" />
            <line x1="14" y1="145" x2="346" y2="145" stroke="#0F172A" strokeWidth="3.5" />
            {/* Doors */}
            <rect x="65" y="143" width="26" height="5" fill="#D97706" />
            <rect x="167" y="143" width="26" height="5" fill="#D97706" />
            <rect x="275" y="143" width="26" height="5" fill="#D97706" />
            {/* Desks & Chairs */}
            <rect x="40" y="42" width="58" height="28" rx="2" fill="#B48454" stroke="#0F172A" strokeWidth="1.2" />
            <circle cx="69" cy="30" r="9" fill="#1E293B" />
            <rect x="151" y="42" width="58" height="28" rx="2" fill="#B48454" stroke="#0F172A" strokeWidth="1.2" />
            <circle cx="180" cy="30" r="9" fill="#1E293B" />
            <rect x="261" y="42" width="58" height="28" rx="2" fill="#B48454" stroke="#0F172A" strokeWidth="1.2" />
            <circle cx="290" cy="30" r="9" fill="#1E293B" />
            {/* Corridor label */}
            <text x="180" y="176" textAnchor="middle" fontSize="10" fill="#475569" fontWeight="600">
              KORIDOR PENGHUBUNG
            </text>
            <text x="69" y="105" textAnchor="middle" fontSize="9" fill="#1E293B" fontWeight="600">
              R. Pimpinan
            </text>
            <text x="180" y="105" textAnchor="middle" fontSize="9" fill="#1E293B" fontWeight="600">
              R. Keuangan
            </text>
            <text x="290" y="105" textAnchor="middle" fontSize="9" fill="#1E293B" fontWeight="600">
              R. Arsip
            </text>
          </g>
        )}

        {type === 'terbuka' && (
          <g>
            {/* Open plan clusters */}
            {[45, 195].map((x) => (
              <g key={x}>
                <rect x={x} y="42" width="52" height="24" rx="2" fill="#B48454" stroke="#0F172A" strokeWidth="1.2" />
                <rect x={x + 56} y="42" width="52" height="24" rx="2" fill="#B48454" stroke="#0F172A" strokeWidth="1.2" />
                <rect x={x} y="70" width="108" height="4" fill="#1B365D" />
                <rect x={x} y="78" width="52" height="24" rx="2" fill="#B48454" stroke="#0F172A" strokeWidth="1.2" />
                <rect x={x + 56} y="78" width="52" height="24" rx="2" fill="#B48454" stroke="#0F172A" strokeWidth="1.2" />
                <circle cx={x + 26} cy="31" r="7" fill="#1E293B" />
                <circle cx={x + 82} cy="31" r="7" fill="#1E293B" />
                <circle cx={x + 26} cy="113" r="7" fill="#1E293B" />
                <circle cx={x + 82} cy="113" r="7" fill="#1E293B" />
              </g>
            ))}
            {/* Wall cabinets */}
            <rect x="26" y="152" width="80" height="18" fill="#64748B" stroke="#0F172A" strokeWidth="1" />
            <rect x="254" y="152" width="80" height="18" fill="#64748B" stroke="#0F172A" strokeWidth="1" />
            <text x="180" y="148" textAnchor="middle" fontSize="9.5" fill="#1B365D" fontWeight="600">
              JALUR SIRKULASI TERBUKA TANPA DINDING SEKAT
            </text>
          </g>
        )}

        {type === 'berpanorama' && (
          <g>
            {/* Organic planter dividers */}
            <rect x="132" y="34" width="96" height="16" rx="8" fill="#2F6F4E" />
            <circle cx="42" cy="40" r="14" fill="#2F6F4E" />
            <circle cx="318" cy="40" r="14" fill="#2F6F4E" />
            <circle cx="45" cy="175" r="14" fill="#2F6F4E" />
            <circle cx="315" cy="175" r="14" fill="#2F6F4E" />
            {/* Angled collaborative desks */}
            <rect x="44" y="74" width="56" height="26" rx="3" transform="rotate(-12 72 87)" fill="#B48454" stroke="#0F172A" strokeWidth="1.2" />
            <rect x="254" y="74" width="56" height="26" rx="3" transform="rotate(12 282 87)" fill="#B48454" stroke="#0F172A" strokeWidth="1.2" />
            {/* Lounge sofa center */}
            <rect x="142" y="112" width="76" height="28" rx="6" fill="#1B365D" />
            <circle cx="180" cy="82" r="16" fill="#E2E8F0" stroke="#0F172A" strokeWidth="1.2" />
            <text x="180" y="166" textAnchor="middle" fontSize="9.5" fill="#2F6F4E" fontWeight="600">
              ZONA BIOFILIK, PLANTER PEMBATAS & LOUNGE KOLABORASI
            </text>
          </g>
        )}

        {type === 'gabungan' && (
          <g>
            {/* Private rooms on left */}
            <rect x="14" y="14" width="110" height="96" fill="none" stroke="#0F172A" strokeWidth="3" />
            <rect x="14" y="110" width="110" height="96" fill="none" stroke="#0F172A" strokeWidth="3" />
            <rect x="44" y="46" width="52" height="24" rx="2" fill="#6B4423" />
            <circle cx="70" cy="34" r="8" fill="#1E293B" />
            <text x="69" y="94" textAnchor="middle" fontSize="8.5" fill="#0F172A" fontWeight="600">
              R. Pimpinan
            </text>
            <rect x="38" y="142" width="64" height="32" rx="10" fill="#6B4423" />
            <text x="69" y="192" textAnchor="middle" fontSize="8.5" fill="#0F172A" fontWeight="600">
              R. Rapat Kaca
            </text>
            {/* Open area on right */}
            <rect x="164" y="42" width="56" height="24" rx="2" fill="#B48454" stroke="#0F172A" strokeWidth="1.2" />
            <rect x="242" y="42" width="56" height="24" rx="2" fill="#B48454" stroke="#0F172A" strokeWidth="1.2" />
            <rect x="164" y="106" width="56" height="24" rx="2" fill="#B48454" stroke="#0F172A" strokeWidth="1.2" />
            <rect x="242" y="106" width="56" height="24" rx="2" fill="#B48454" stroke="#0F172A" strokeWidth="1.2" />
            <circle cx="322" cy="175" r="12" fill="#2F6F4E" />
            <text x="235" y="166" textAnchor="middle" fontSize="9" fill="#1B365D" fontWeight="600">
              AREA KERJA STAF TERBUKA
            </text>
          </g>
        )}
      </svg>
    </div>
  );
};
