import React from 'react';
import { FurnitureKind } from '../types/office';

interface Furniture2DSymbolProps {
  kind: FurnitureKind;
  color: string;
  selected?: boolean;
  hasOverlap?: boolean;
  label?: string;
}

export const Furniture2DSymbol: React.FC<Furniture2DSymbolProps> = ({
  kind,
  color,
  selected = false,
  hasOverlap = false,
  label,
}) => {
  const strokeColor = hasOverlap ? '#DC2626' : selected ? '#D49B27' : '#0F172A';
  const strokeWidth = hasOverlap || selected ? 2.5 : 1.5;

  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full overflow-visible">
      {kind === 'meja-kerja' && (
        <g>
          <rect x="3" y="5" width="94" height="90" rx="4" fill={color} stroke={strokeColor} strokeWidth={strokeWidth} />
          <rect x="14" y="14" width="72" height="16" rx="2" fill="rgba(255,255,255,0.28)" />
          <rect x="34" y="42" width="32" height="10" rx="2" fill="#0F172A" opacity="0.7" />
        </g>
      )}

      {kind === 'kursi' && (
        <g>
          <circle cx="50" cy="52" r="36" fill={color} stroke={strokeColor} strokeWidth={strokeWidth} />
          <rect x="20" y="12" width="60" height="18" rx="6" fill={color} stroke={strokeColor} strokeWidth={strokeWidth} />
          <rect x="10" y="34" width="12" height="36" rx="4" fill="#334155" />
          <rect x="78" y="34" width="12" height="36" rx="4" fill="#334155" />
        </g>
      )}

      {kind === 'lemari' && (
        <g>
          <rect x="3" y="4" width="94" height="92" rx="3" fill={color} stroke={strokeColor} strokeWidth={strokeWidth} />
          <line x1="50" y1="4" x2="50" y2="96" stroke="#0F172A" strokeWidth="1.5" />
          <rect x="38" y="76" width="8" height="12" rx="1" fill="#F8FAFC" />
          <rect x="54" y="76" width="8" height="12" rx="1" fill="#F8FAFC" />
        </g>
      )}

      {kind === 'rak-arsip' && (
        <g>
          <rect x="3" y="5" width="94" height="90" rx="2" fill={color} stroke={strokeColor} strokeWidth={strokeWidth} />
          {[20, 40, 60, 80].map((x) => (
            <line key={x} x1={x} y1="6" x2={x} y2="94" stroke="rgba(255,255,255,0.45)" strokeWidth="2" />
          ))}
        </g>
      )}

      {kind === 'sofa' && (
        <g>
          <rect x="4" y="8" width="92" height="84" rx="10" fill={color} stroke={strokeColor} strokeWidth={strokeWidth} />
          <rect x="8" y="12" width="84" height="22" rx="6" fill="rgba(0,0,0,0.22)" />
          <line x1="50" y1="36" x2="50" y2="88" stroke="rgba(255,255,255,0.28)" strokeWidth="1.5" />
        </g>
      )}

      {kind === 'meja-rapat' && (
        <g>
          <rect x="3" y="6" width="94" height="88" rx="18" fill={color} stroke={strokeColor} strokeWidth={strokeWidth} />
          <rect x="36" y="40" width="28" height="20" rx="3" fill="#0F172A" opacity="0.55" />
        </g>
      )}

      {kind === 'partisi' && (
        <g>
          <rect x="2" y="18" width="96" height="64" rx="3" fill={color} stroke={strokeColor} strokeWidth={strokeWidth} />
          <line x1="6" y1="50" x2="94" y2="50" stroke="#F8FAFC" strokeWidth="1.5" strokeDasharray="6 4" />
        </g>
      )}

      {kind === 'tanaman' && (
        <g>
          <circle cx="50" cy="50" r="42" fill="#E2E8F0" stroke={strokeColor} strokeWidth={strokeWidth} />
          <circle cx="50" cy="50" r="32" fill={color} />
          <circle cx="38" cy="40" r="14" fill="#3D8B63" opacity="0.8" />
          <circle cx="62" cy="42" r="13" fill="#3D8B63" opacity="0.8" />
          <circle cx="50" cy="62" r="14" fill="#255A3E" opacity="0.85" />
        </g>
      )}

      {kind === 'lampu' && (
        <g>
          <circle cx="50" cy="50" r="42" fill="rgba(251, 191, 36, 0.22)" />
          <circle cx="50" cy="50" r="24" fill={color} stroke={strokeColor} strokeWidth={strokeWidth} />
          <circle cx="50" cy="50" r="9" fill="#FEF3C7" />
        </g>
      )}

      {kind === 'papan-info' && (
        <g>
          <rect x="2" y="15" width="96" height="70" rx="2" fill={color} stroke={strokeColor} strokeWidth={strokeWidth} />
          <rect x="8" y="25" width="84" height="14" fill="#1B365D" />
          <rect x="8" y="48" width="54" height="8" fill="#94A3B8" />
        </g>
      )}

      {label && (
        <title>{label}</title>
      )}
    </svg>
  );
};
