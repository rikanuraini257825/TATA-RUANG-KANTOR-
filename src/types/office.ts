export type MenuId =
  | 'beranda'
  | 'tujuan'
  | 'materi'
  | 'galeri-furniture'
  | 'galeri-interior'
  | 'tata-ruang'
  | 'simulasi-desain'
  | 'simulasi-penataan'
  | 'kuis'
  | 'evaluasi'
  | 'profil';

export type RoomTypeId =
  | 'pimpinan'
  | 'administrasi'
  | 'pelayanan'
  | 'rapat'
  | 'arsip'
  | 'kerja-karyawan';

export type FurnitureKind =
  | 'meja-kerja'
  | 'kursi'
  | 'lemari'
  | 'rak-arsip'
  | 'sofa'
  | 'meja-rapat'
  | 'partisi'
  | 'tanaman'
  | 'lampu'
  | 'papan-info';

export interface RoomDimensions {
  widthM: number; // X axis in meters (3..12)
  lengthM: number; // Y/Z axis in meters (3..12)
}

export interface PlacedFurniture {
  id: string;
  kind: FurnitureKind;
  label: string;
  xM: number; // center X in meters from top-left (0..widthM)
  yM: number; // center Y in meters from top-left (0..lengthM)
  widthM: number; // base width in meters
  depthM: number; // base depth in meters
  rotationDeg: number; // 0, 90, 180, 270 or arbitrary degrees
  scale: number; // 0.6..1.8
  color: string; // hex color
}

export interface SavedDesign {
  id: string;
  name: string;
  roomType: RoomTypeId;
  dimensions: RoomDimensions;
  items: PlacedFurniture[];
  savedAt: string;
}

export interface FurnitureCatalogTemplate {
  kind: FurnitureKind;
  name: string;
  defaultWidthM: number;
  defaultDepthM: number;
  defaultColor: string;
  category: 'Utama' | 'Penyimpanan' | 'Kolaborasi' | 'Pendukung';
}

export interface FurnitureLearningItem {
  id: string;
  name: string;
  category: 'Kerja & Ergonomi' | 'Penyimpanan & Arsip' | 'Rapat & Pelayanan' | 'Ruang Khusus';
  image: string;
  functionDesc: string;
  specs: string;
  materials: string[];
  pros: string[];
  cons: string[];
  tips: string;
}

export interface InteriorStyleItem {
  id: string;
  name: string;
  tagline: string;
  characteristics: string[];
  palette: { name: string; hex: string }[];
  lighting: string;
  suitableFor: string;
  image: string;
}

export interface InteriorRoomExample {
  id: string;
  roomName: string;
  styleTag: string;
  description: string;
  keyElements: string[];
  lightingStandard: string;
  image: string;
}

export interface LayoutTypeInfo {
  id: 'tertutup' | 'terbuka' | 'berpanorama' | 'gabungan';
  title: string;
  englishTitle: string;
  summary: string;
  characteristics: string[];
  objectives: string[];
  pros: string[];
  cons: string[];
  applications: string[];
  image: string;
}

export interface ChallengeRequirement {
  kind: FurnitureKind;
  label: string;
  minCount: number;
}

export interface ChallengeScenario {
  id: string;
  title: string;
  roomType: RoomTypeId;
  dimensions: RoomDimensions;
  difficulty: 'Dasar' | 'Menengah' | 'Lanjutan';
  description: string;
  instructions: string[];
  doorWall: 'bottom' | 'left';
  windowWall: 'top' | 'right';
  requirements: ChallengeRequirement[];
}

export interface ChallengeEvaluation {
  totalScore: number;
  predicate: 'Sangat Baik' | 'Baik' | 'Cukup' | 'Perlu Perbaikan';
  completenessScore: number;
  overlapScore: number;
  circulationScore: number;
  ergonomicsScore: number;
  overlapCount: number;
  circulationPercent: number;
  checklist: { label: string; passed: boolean; detail: string }[];
  feedback: string[];
}

export interface QuizQuestion {
  id: string;
  module: 1 | 2 | 3 | 4;
  moduleTitle: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}
