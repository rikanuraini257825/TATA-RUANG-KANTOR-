import {
  FurnitureLearningItem,
  InteriorRoomExample,
  InteriorStyleItem,
  LayoutTypeInfo,
  QuizQuestion,
} from '../types/office';

export const IMAGES = {
  heroOffice: '/src/assets/images/hero_modern_office_1795658178610.jpg',
  workstation: '/src/assets/images/furniture_ergonomic_workstation_1795658178974.jpg',
  meeting: '/src/assets/images/furniture_executive_meeting_1795658179889.jpg',
  reception: '/src/assets/images/interior_reception_lobby_1795658180743.jpg',
  openLandscape: '/src/assets/images/interior_open_landscape_1795658180856.jpg',
  archiveAdmin: '/src/assets/images/interior_archive_admin_1795658180204.jpg',
};

export const LEARNING_OBJECTIVES = {
  capaianPembelajaran:
    'Pada akhir fase F (Kelas XI Program Keahlian Manajemen Perkantoran dan Layanan Bisnis), peserta didik mampu memahami konsep furniture kantor, merancang estetika interior ruangan, menganalisis jenis tata ruang kantor, serta menerapkan prinsip ergonomi dan K3 dalam penataan ruang kerja modern.',
  tujuanKhusus: [
    {
      code: 'TP-01',
      title: 'Mengidentifikasi & Memilih Furniture Kantor',
      desc: 'Menjelaskan pengertian, fungsi, spesifikasi, material, kelebihan-kekurangan, serta memilih 11 jenis furniture kantor sesuai kebutuhan jabatan dan fungsi ruang.',
    },
    {
      code: 'TP-02',
      title: 'Menganalisis Elemen & Gaya Interior Kantor',
      desc: 'Menerapkan pemilihan warna, pencahayaan, ventilasi, lantai/dinding, dekorasi, dan tanaman hias pada 5 gaya interior kantor modern.',
    },
    {
      code: 'TP-03',
      title: 'Membandingkan 4 Jenis Tata Ruang Kantor',
      desc: 'Menganalisis karakteristik, tujuan, kelebihan, kekurangan, serta denah 2D tata ruang tertutup, terbuka, berpanorama, dan gabungan.',
    },
    {
      code: 'TP-04',
      title: 'Menerapkan Prinsip Penataan & K3 Perkantoran',
      desc: 'Mengintegrasikan efisiensi ruang, ergonomi, alur kerja, komunikasi, privasi, keamanan, K3, dan aksesibilitas dalam tata letak ruangan.',
    },
    {
      code: 'TP-05',
      title: 'Merancang Denah Kantor Digital 2D & 3D',
      desc: 'Mengoperasikan Simulasi Desain Kantor secara proporsional untuk menentukan ukuran ruang, menempatkan furniture, dan mengekspor blueprint.',
    },
    {
      code: 'TP-06',
      title: 'Mengevaluasi Tata Letak Ruang Kerja',
      desc: 'Menyelesaikan studi kasus penataan furniture ruang pimpinan, pelayanan, rapat, dan administrasi sesuai standar kelayakan ruang kerja.',
    },
  ],
};

export const MODULE_1_INTRO = {
  pengertian:
    'Furniture kantor (perabotan kantor) adalah seluruh perlengkapan fisik berbentuk meja, kursi, lemari, rak, partisi, hingga perabot penunjang yang digunakan untuk mendukung aktivitas administrasi, pengarsipan, pelayanan, dan rapat di lingkungan perkantoran.',
  fungsi: [
    'Menunjang produktivitas dan kenyamanan postur kerja pegawai selama jam kerja.',
    'Menyimpan, melindungi, dan mengklasifikasikan arsip maupun peralatan kerja secara aman.',
    'Membentuk alur kerja (workflow) dan batas zona privasi antar unit kerja.',
    'Mencerminkan citra profesional, budaya organisasi, dan estetika instansi kepada tamu.',
  ],
};

export const FURNITURE_LEARNING_ITEMS: FurnitureLearningItem[] = [
  {
    id: 'meja-kerja',
    name: 'Meja Kerja (Work Desk)',
    category: 'Kerja & Ergonomi',
    image: IMAGES.workstation,
    functionDesc:
      'Permukaan kerja utama bagi staf administrasi untuk mengoperasikan komputer, mengetik dokumen, dan menata perlengkapan tulis harian.',
    specs: 'Panjang 120–160 cm · Lebar 60–80 cm · Tinggi standar 72–75 cm · Dilengkapi grommet kabel.',
    materials: ['Multipleks lapis HPL', 'Particle board laminasi melamin', 'Rangka besi hollow powder-coated'],
    pros: ['Tahan gores dan mudah dibersihkan', 'Tersedia lubang manajemen kabel rapi', 'Modular untuk disusun berkelompok'],
    cons: ['Tipe particle board rentan lembap jika terkena air', 'Bobot cukup berat jika memakai rangka baja penuh'],
    tips: 'Pilih ketinggian 72–75 cm dengan ruang kaki bebas minimal 60 cm dan permukaan matte agar tidak memantulkan silau lampu.',
  },
  {
    id: 'kursi-ergonomis',
    name: 'Kursi Ergonomis (Ergonomic Chair)',
    category: 'Kerja & Ergonomi',
    image: IMAGES.workstation,
    functionDesc:
      'Menopang tulang belakang (lumbar), leher, dan lengan pegawai agar postur duduk tetap sehat selama 6–8 jam kerja.',
    specs: 'Tinggi dudukan 42–52 cm (hidrolik) · Sandaran jaring (mesh) · Roda putar 360° lima kaki.',
    materials: ['Sandaran mesh breathable', 'Busa high-density molded foam', 'Rangka nylon/aluminium alloy'],
    pros: ['Mengurangi risiko nyeri punggung dan kelelahan', 'Sirkulasi udara punggung baik', 'Tinggi dan kemiringan dapat disesuaikan'],
    cons: ['Harga lebih tinggi dibanding kursi statis biasa', 'Komponen hidrolik memerlukan perawatan berkala'],
    tips: 'Pastikan kursi memiliki penyangga pinggang (lumbar support), sandaran tangan (armrest) sejajar meja, dan kaki menapak rata di lantai.',
  },
  {
    id: 'lemari-arsip',
    name: 'Lemari Arsip (Archive Cupboard)',
    category: 'Penyimpanan & Arsip',
    image: IMAGES.archiveAdmin,
    functionDesc:
      'Menyimpan ordner, map besar, buku agenda, dan perlengkapan alat tulis kantor secara tertutup dan terlindungi dari debu.',
    specs: 'Lebar 90–100 cm · Kedalaman 40–45 cm · Tinggi 180–200 cm · 4–5 rak adjustable · Kunci pengaman.',
    materials: ['Plat baja (steel) 0,6–0,8 mm powder-coated', 'Kaca tempered (pintu geser)', 'Kayu olahan HPL'],
    pros: ['Kapasitas penyimpanan vertikal besar', 'Melindungi dokumen penting dengan kunci sentral', 'Tahan rayap dan api ringan (bahan baja)'],
    cons: ['Membutuhkan ruang ayun pintu jika memakai pintu swing', 'Berat saat harus dipindahkan penuh isi'],
    tips: 'Untuk lorong sempit, pilih lemari arsip pintu geser (sliding door) dan letakkan merapat ke dinding.',
  },
  {
    id: 'filing-cabinet',
    name: 'Filing Cabinet (Kabinet Laci Arsip)',
    category: 'Penyimpanan & Arsip',
    image: IMAGES.archiveAdmin,
    functionDesc:
      'Menyimpan dokumen aktif menggunakan map gantung (hanging folder) sistem abjad, tanggal, wilayah, atau nomor.',
    specs: '3–4 laci tarik rel teleskopik · Lebar 46 cm · Kedalaman 62 cm · Tinggi 102–132 cm.',
    materials: ['Plat baja canai dingin anti-karat', 'Rel laci ball-bearing', 'Kunci sentral anti-tilt'],
    pros: ['Pencarian arsip sangat cepat dengan tab indeks', 'Sistem anti-tilt mencegah kabinet terguling saat laci dibuka', 'Sangat awet (>10 tahun)'],
    cons: ['Memerlukan ruang tarik laci di bagian depan sekitar 60 cm', 'Bentuk kaku dan industrial'],
    tips: 'Pastikan fitur interlock aktif (hanya 1 laci terbuka dalam satu waktu) demi keselamatan kerja K3.',
  },
  {
    id: 'meja-rapat',
    name: 'Meja Rapat (Conference Table)',
    category: 'Rapat & Pelayanan',
    image: IMAGES.meeting,
    functionDesc:
      'Wadah kolaborasi tim, presentasi proyek, koordinasi pimpinan, dan pertemuan dengan mitra eksternal.',
    specs: 'Kapasitas 6–12 orang · Panjang 220–360 cm · Lebar 110–130 cm · Kotak stopkontak tanam (power box).',
    materials: ['Kayu solid atau multipleks veneer walnut/oak', 'Kaki baja/aluminium', 'Permukaan kaca/HPL'],
    pros: ['Mendukung diskusi tatap muka yang setara', 'Terintegrasi jalur kabel proyektor dan laptop', 'Menambah wibawa ruang rapat'],
    cons: ['Memakan luas lantai signifikan', 'Sulit dipindah tanpa membongkar rangka'],
    tips: 'Sisakan jarak minimal 100–120 cm di sekeliling meja rapat agar kursi dapat ditarik dan orang leluasa berjalan di belakangnya.',
  },
  {
    id: 'meja-resepsionis',
    name: 'Meja Resepsionis (Reception Counter)',
    category: 'Rapat & Pelayanan',
    image: IMAGES.reception,
    functionDesc:
      'Titik penyambutan tamu pertama, pencatatan buku tamu, penerimaan surat, dan pusat informasi layanan pelanggan.',
    specs: 'Tinggi meja luar 105–115 cm (berdiri) · Meja kerja dalam 75 cm · Panjang 160–240 cm.',
    materials: ['Solid surface / marmer sintetis', 'Multipleks finishing HPL/duco', 'Aksen strip LED tersembunyi'],
    pros: ['Menjaga privasi layar komputer petugas dari pandangan tamu', 'Membangun kesan pertama yang profesional', 'Memiliki meja ganda untuk menulis tamu'],
    cons: ['Desain kustom cenderung mahal', 'Ukuran besar sehingga posisi relatif permanen'],
    tips: 'Tempatkan meja resepsionis menghadap langsung pintu masuk utama dengan jarak area tunggu minimal 2 meter di depannya.',
  },
  {
    id: 'rak-dokumen',
    name: 'Rak Dokumen Terbuka (Document Rack)',
    category: 'Penyimpanan & Arsip',
    image: IMAGES.archiveAdmin,
    functionDesc:
      'Menata boks arsip inaktif, brosur, formulir layanan, dan referensi buku agar mudah diambil dengan cepat.',
    specs: 'Lebar 100–120 cm · Kedalaman 35–40 cm · 5 tingkat ambalan · Kapasitas beban 50–80 kg/ambalan.',
    materials: ['Besi siku/baja berlapis cat epoksi', 'Papan MDF/multipleks tebal', 'Kaki karet anti-slip'],
    pros: ['Akses dokumen sangat cepat tanpa membuka pintu', 'Sirkulasi udara baik sehingga arsip tidak lembap', 'Ekonomis dan mudah dirakit'],
    cons: ['Dokumen lebih mudah berdebu dibanding lemari tertutup', 'Keamanan dokumen rahasia lebih rendah'],
    tips: 'Gunakan boks arsip berlabel warna di setiap tingkat rak dan jangkar rak tinggi ke dinding untuk keamanan gempa/K3.',
  },
  {
    id: 'partisi-kantor',
    name: 'Partisi Kantor (Office Partition)',
    category: 'Kerja & Ergonomi',
    image: IMAGES.openLandscape,
    functionDesc:
      'Pembatas ruang semi-permanen untuk meredam kebisingan akustik, membagi zona kerja, dan menjaga fokus pegawai di kantor terbuka.',
    specs: 'Tinggi 110–150 cm (half-height) atau 210 cm · Ketebalan 4–8 cm · Panel kain akustik / kaca.',
    materials: ['Rangka aluminium ekstrusi', 'Kain fabric peredam suara (acoustic)', 'Kaca tempered / panel melamin'],
    pros: ['Fleksibel dibongkar-pasang sesuai perubahan tim', 'Mengurangi gangguan suara percakapan', 'Biaya jauh lebih hemat daripada dinding permanen'],
    cons: ['Tidak sepenuhnya kedap suara seperti ruang tertutup', 'Partisi terlalu tinggi dapat menghalangi cahaya alami'],
    tips: 'Gunakan partisi setinggi 120 cm pada ruang kerja terbuka agar privasi terjaga namun cahaya jendela tetap menembus ruangan.',
  },
  {
    id: 'furniture-pimpinan',
    name: 'Set Furniture Ruang Pimpinan',
    category: 'Ruang Khusus',
    image: IMAGES.heroOffice,
    functionDesc:
      'Paket furniture representatif bagi kepala kantor/manajer, meliputi meja L-shape eksekutif, kursi sandaran tinggi, kredenza, dan sofa tamu.',
    specs: 'Meja utama 180 x 85 cm + meja samping 120 cm · Kursi kulit/mesh high-back · Kredenza belakang.',
    materials: ['Veneer kayu jati/walnut', 'Kulit sintetis premium/genuine leather', 'Aksen logam brushed brass'],
    pros: ['Mendukung kerja eksekutif sekaligus menerima tamu penting', 'Kapasitas area meja luas untuk dokumen & perangkat', 'Menciptakan otoritas profesional'],
    cons: ['Membutuhkan luas ruang minimal 4 x 5 m hingga 5 x 6 m', 'Investasi biaya pengadaan paling tinggi'],
    tips: 'Posisikan meja pimpinan agar tidak membelakangi pintu masuk dan dekat pencahayaan alami di sisi kiri/kanan.',
  },
  {
    id: 'furniture-pelayanan',
    name: 'Set Furniture Ruang Pelayanan',
    category: 'Ruang Khusus',
    image: IMAGES.reception,
    functionDesc:
      'Perpaduan konter layanan, kursi tamu ergonomis/sofa tunggu, meja brosur, dan display nomor antrean untuk kenyamanan pengguna layanan.',
    specs: 'Konter layanan tinggi 75–105 cm · Sofa tunggu 2–3 dudukan · Jarak antar baris tunggu >= 90 cm.',
    materials: ['HPL anti-bakteri', 'Rangka besi anti-karat', 'Pelapis sofa kain/vinyl mudah dilap'],
    pros: ['Alur pelayanan tertib dan ramah disabilitas', 'Material vinyl mudah dibersihkan dari noda', 'Meningkatkan kepuasan tamu'],
    cons: ['Kain pelapis cepat aus jika intensitas tamu sangat padat'],
    tips: 'Sediakan minimal satu posisi meja pelayanan setinggi 75 cm untuk aksesibilitas pengguna kursi roda.',
  },
  {
    id: 'furniture-rapat',
    name: 'Set Furniture Ruang Rapat',
    category: 'Ruang Khusus',
    image: IMAGES.meeting,
    functionDesc:
      'Kesatuan meja konferensi, kursi rapat berlengan yang mudah digeser, papan tulis/layar presentasi, dan kabinet peralatan audio-visual.',
    specs: 'Meja konferensi modular · Kursi rapat ergonomis tanpa tuas rumit · Jarak pandang ke layar >= 2 m.',
    materials: ['Wood veneer / HPL doff', 'Rangka aluminium', 'Panel akustik dinding'],
    pros: ['Komunikasi tim efektif dengan visibilitas layar merata', 'Kursi ringan mudah diatur ulang (bentuk U, teater, atau boardroom)'],
    cons: ['Memerlukan manajemen kabel lantai agar tidak tersandung'],
    tips: 'Pilih permukaan meja tidak mengilap (matte) supaya pantulan lampu proyektor tidak menyilaukan peserta rapat.',
  },
];

export const MODULE_2_THEORY = {
  pengertian:
    'Interior kantor adalah seni dan ilmu merancang ruang bagian dalam gedung perkantoran—mencakup warna, pencahayaan, penghawaan, material lantai-dinding, dekorasi, dan tata letak—untuk menciptakan lingkungan kerja yang fungsional, sehat, estetis, dan produktif.',
  tujuan: [
    'Meningkatkan fokus, semangat kerja, dan kenyamanan psikologis pegawai.',
    'Mengoptimalkan efisiensi ruang, pencahayaan alami, serta penghematan energi listrik.',
    'Membangun identitas visual dan citra profesional lembaga atau perusahaan.',
    'Menjamin kesehatan dan keselamatan kerja melalui kualitas udara dan pencahayaan standar.',
  ],
  prinsip: [
    { title: 'Keseimbangan (Balance)', desc: 'Distribusi visual furniture dan elemen dinding yang terasa proporsional dan tidak berat sebelah.' },
    { title: 'Keselarasan (Harmony)', desc: 'Perpaduan warna, material, dan gaya desain yang saling mendukung dalam satu kesatuan tema.' },
    { title: 'Proporsi & Skala', desc: 'Ukuran furniture disesuaikan dengan dimensi ruangan agar tidak terasa sesak maupun terlalu kosong.' },
    { title: 'Titik Fokus (Focal Point)', desc: 'Penonjolan elemen utama seperti dinding logo, meja resepsionis, atau jendela pemandangan.' },
  ],
  elemenTeknis: [
    {
      title: 'Pemilihan Warna Ruangan',
      detail:
        'Terapkan aturan 60-30-10: 60% warna netral terang (putih/abu muda) untuk dinding agar ruangan terasa luas, 30% warna korporat (navy blue/kayu) pada furniture atau panel, dan 10% aksen hangat (kuning keemasan) untuk energi positif.',
    },
    {
      title: 'Pencahayaan Kantor',
      detail:
        'Standar iluminasi kerja perkantoran adalah 300–500 lux (SNI). Kombinasikan pencahayaan alami melalui jendela ber-tirai (blind) agar tidak silau dengan lampu LED netral (4000K–5000K) untuk mencegah kelelahan mata.',
    },
    {
      title: 'Ventilasi & Sirkulasi Udara',
      detail:
        'Pertahankan suhu nyaman 23°C–26°C dan kelembapan 40%–60%. Gunakan ventilasi silang (cross-ventilation) atau sistem AC dengan perawatan filter rutin agar kadar CO2 rendah dan pegawai tidak mudah mengantuk.',
    },
    {
      title: 'Pemilihan Lantai & Dinding',
      detail:
        'Lantai vinyl kayu, karpet modular (carpet tile), atau granit matte membantu meredam gema suara langkah. Dinding gunakan cat washable rendah VOC atau panel akustik pada ruang rapat.',
    },
    {
      title: 'Dekorasi & Tanaman Hias',
      detail:
        'Dekorasi harus fungsional (jam dinding, papan visi misi, bingkai prestasi sekolah/instansi). Tanaman hias dalam ruangan seperti Lidah Mertua (Sansevieria), Monstera, atau Sirih Gading membantu menyaring udara dan menurunkan stres visual.',
    },
  ],
};

export const INTERIOR_STYLES: InteriorStyleItem[] = [
  {
    id: 'minimalis',
    name: 'Desain Interior Minimalis',
    tagline: 'Sederhana, bersih, bebas barang berlebih (Less is More)',
    characteristics: [
      'Garis desain lurus dan geometris tanpa ornamen rumit.',
      'Penyimpanan tertutup agar meja kerja selalu bersih (clean desk policy).',
      'Dominasi warna putih, abu-abu muda, dan aksen kayu alami.',
    ],
    palette: [
      { name: 'Putih Bersih', hex: '#F8FAFC' },
      { name: 'Abu Muda', hex: '#CBD5E1' },
      { name: 'Oak Terang', hex: '#C49A6C' },
    ],
    lighting: 'Pencahayaan merata LED 4000K tersembunyi (recessed downlight) dan jendela besar.',
    suitableFor: 'Ruang administrasi, ruang arsip modern, dan kantor rintisan.',
    image: IMAGES.workstation,
  },
  {
    id: 'modern',
    name: 'Desain Interior Modern',
    tagline: 'Fungsional, efisien, selaras dengan teknologi perkantoran',
    characteristics: [
      'Menggunakan material mutakhir seperti kaca partisi, baja powder-coated, dan HPL.',
      'Integrasi manajemen kabel, layar presentasi, dan furniture ergonomis.',
      'Kombinasi warna kontras tegas seperti navy blue, putih, dan aksen brass.',
    ],
    palette: [
      { name: 'Navy Korporat', hex: '#0F2544' },
      { name: 'Putih Murni', hex: '#FFFFFF' },
      { name: 'Kuning Emas', hex: '#D49B27' },
    ],
    lighting: 'Linear LED gantung dan task lighting di tiap meja kerja.',
    suitableFor: 'Ruang pimpinan, ruang rapat eksekutif, dan lobi resepsionis.',
    image: IMAGES.heroOffice,
  },
  {
    id: 'industrial',
    name: 'Desain Interior Industrial',
    tagline: 'Karakter material mentah yang terbuka dan kreatif',
    characteristics: [
      'Langit-langit ekspos memperlihatkan jalur pipa AC dan ducting rapi.',
      'Perpaduan bata ekspos, beton poles, rangka besi hitam, dan kayu tua.',
      'Tata letak terbuka mendorong kolaborasi tim kreatif.',
    ],
    palette: [
      { name: 'Beton Abu', hex: '#64748B' },
      { name: 'Besi Hitam', hex: '#1E293B' },
      { name: 'Kayu Hangat', hex: '#8B5A2B' },
    ],
    lighting: 'Lampu gantung track light dan filament LED warna warm-neutral (3500K).',
    suitableFor: 'Studio desain, ruang kerja kolaboratif, dan unit kewirausahaan sekolah.',
    image: IMAGES.openLandscape,
  },
  {
    id: 'klasik',
    name: 'Desain Interior Klasik',
    tagline: 'Berwibawa, formal, dan penuh ketelitian simetris',
    characteristics: [
      'Penggunaan panel dinding kayu (wainscoting) dan proporsi simetris.',
      'Furniture kayu solid warna gelap (mahoni/walnut) dengan detail elegan.',
      'Menonjolkan kesan stabil, mapan, dan formal.',
    ],
    palette: [
      { name: 'Walnut Gelap', hex: '#4A2E1B' },
      { name: 'Krem Gading', hex: '#F3EFE6' },
      { name: 'Emas Klasik', hex: '#B8860B' },
    ],
    lighting: 'Lampu gantung berornamen hangat (3000K) dipadukan lampu meja klasik.',
    suitableFor: 'Ruang pimpinan puncak, ruang tamu kehormatan, dan aula rapat resmi.',
    image: IMAGES.meeting,
  },
  {
    id: 'kontemporer',
    name: 'Desain Interior Kontemporer',
    tagline: 'Dinamis, fleksibel, biofilik, dan mengikuti tren masa kini',
    characteristics: [
      'Memadukan bentuk lengkung lembut pada sofa/resepsionis dengan garis tegas.',
      'Menghadirkan unsur alam (biofilik) melalui banyak tanaman hijau indoor.',
      'Ruang mudah beradaptasi untuk kerja individu maupun diskusi cepat.',
    ],
    palette: [
      { name: 'Putih Hangat', hex: '#F9FAFB' },
      { name: 'Navy Lembut', hex: '#1E3A5F' },
      { name: 'Hijau Sage', hex: '#3D7A5A' },
    ],
    lighting: 'Kombinasi cahaya alami maksimal dengan lampu arsitektural indirect (cove light).',
    suitableFor: 'Ruang resepsionis, ruang tunggu tamu, dan kantor berpanorama modern.',
    image: IMAGES.reception,
  },
];

export const INTERIOR_ROOM_EXAMPLES: InteriorRoomExample[] = [
  {
    id: 'ruang-pimpinan',
    roomName: 'Ruang Pimpinan',
    styleTag: 'Modern Eksekutif',
    description: 'Menonjolkan wibawa dan ketenangan kerja dengan meja eksekutif menghadap pintu, panel akustik navy, dan area diskusi tamu.',
    keyElements: ['Meja eksekutif L-shape', 'Kursi high-back ergonomis', 'Kredenza arsip & sofa tamu', 'Tanaman hias sudut'],
    lightingStandard: '400 lux (cahaya alami + task lamp)',
    image: IMAGES.heroOffice,
  },
  {
    id: 'ruang-administrasi',
    roomName: 'Ruang Administrasi',
    styleTag: 'Minimalis Efisien',
    description: 'Dirancang untuk alur pengolahan surat dan tata usaha yang cepat dengan meja sejajar, pencahayaan terang, dan akses mudah ke kabinet.',
    keyElements: ['Meja kerja standar 140 cm', 'Kursi ergonomis mesh', 'Filing cabinet dekat meja', 'Manajemen kabel rapi'],
    lightingStandard: '450–500 lux merata bebas bayangan',
    image: IMAGES.archiveAdmin,
  },
  {
    id: 'ruang-pelayanan',
    roomName: 'Ruang Pelayanan Pelanggan',
    styleTag: 'Kontemporer Ramah',
    description: 'Memudahkan interaksi tatap muka petugas dengan pengunjung melalui konter terbuka yang rapi, ramah akses, dan informatif.',
    keyElements: ['Konter pelayanan dua ketinggian', 'Papan informasi & antrean', 'Kursi pengunjung nyaman', 'Pencahayaan hangat ramah'],
    lightingStandard: '350–400 lux natural white',
    image: IMAGES.reception,
  },
  {
    id: 'ruang-rapat',
    roomName: 'Ruang Rapat',
    styleTag: 'Modern Akustik',
    description: 'Mendukung konsentrasi diskusi tim dengan dinding kaca berperedam suara, meja rapat sentral, dan layar presentasi terintegrasi.',
    keyElements: ['Meja rapat sentral ber-power box', 'Kursi rapat fleksibel', 'Layar TV/Proyektor', 'Panel peredam gema'],
    lightingStandard: '350 lux dengan kontrol dimmer saat presentasi',
    image: IMAGES.meeting,
  },
  {
    id: 'ruang-tunggu',
    roomName: 'Ruang Tunggu',
    styleTag: 'Kontemporer Biofilik',
    description: 'Memberikan pengalaman menunggu yang rileks bagi tamu melalui sofa empuk, meja majalah/profil instansi, dan tanaman hijau.',
    keyElements: ['Sofa tunggu navy mudah dibersihkan', 'Meja kopi sudut', 'Tanaman Fiddle Leaf Fig', 'Jarak lorong akses >= 120 cm'],
    lightingStandard: '250–300 lux hangat menenangkan',
    image: IMAGES.reception,
  },
  {
    id: 'ruang-arsip',
    roomName: 'Ruang Arsip',
    styleTag: 'Industrial Fungsional',
    description: 'Memaksimalkan kapasitas penyimpanan dokumen aktif dan inaktif dengan rak baja terlabel rapi dan kelembapan udara terkontrol.',
    keyElements: ['Rak arsip baja 5 susun', 'Filing cabinet ber-kunci sentral', 'Meja sortir dokumen', 'Detektor asap & ventilasi kering'],
    lightingStandard: '350 lux di sepanjang lorong rak',
    image: IMAGES.archiveAdmin,
  },
  {
    id: 'ruang-kerja-terbuka',
    roomName: 'Ruang Kerja Terbuka',
    styleTag: 'Open Landscape',
    description: 'Menyatukan tim lintas bagian dalam satu ruangan luas berpartisi rendah yang memperlancar komunikasi dan memaksimalkan cahaya jendela.',
    keyElements: ['Klaster meja berhadapan', 'Partisi akustik tinggi 120 cm', 'Planter box pembatas lorong', 'Jalur utama selebar 150 cm'],
    lightingStandard: '450 lux linear LED merata',
    image: IMAGES.openLandscape,
  },
  {
    id: 'ruang-resepsionis',
    roomName: 'Ruang Resepsionis',
    styleTag: 'Modern Korporat',
    description: 'Wajah depan instansi yang memadukan identitas logo SMK Taman Harapan, meja resepsionis elegan, dan pencahayaan aksen keemasan.',
    keyElements: ['Meja resepsionis solid surface', 'Dinding latar logo instansi', 'Buku tamu digital/manual', 'Akses langsung ke koridor utama'],
    lightingStandard: '400 lux + lampu sorot aksen logo',
    image: IMAGES.reception,
  },
];

export const LAYOUT_TYPES: LayoutTypeInfo[] = [
  {
    id: 'tertutup',
    title: 'Tata Ruang Kantor Tertutup',
    englishTitle: 'Private Office / Cubicle Room',
    summary:
      'Tata ruang kantor yang memisahkan setiap ruangan dengan dinding permanen atau partisi penuh sehingga tercipta ruang-ruang terpisah sesuai bagian atau jabatan.',
    characteristics: [
      'Setiap ruangan dibatasi tembok atau partisi kaca penuh hingga plafon.',
      'Memiliki pintu akses masing-masing untuk menjaga kerahasiaan aktivitas.',
      'Umumnya digunakan pimpinan, bagian keuangan, HRD, atau ruang arsip rahasia.',
    ],
    objectives: [
      'Menjaga kerahasiaan dokumen, data keuangan, dan pembicaraan penting.',
      'Memberikan tingkat konsentrasi tinggi tanpa gangguan suara dari unit lain.',
      'Menunjukkan status jabatan dan kewibawaan ruang pimpinan.',
    ],
    pros: [
      'Privasi dan keamanan dokumen sangat terjamin.',
      'Tingkat kebisingan luar rendah sehingga fokus kerja maksimal.',
      'Pengaturan suhu AC dan pencahayaan dapat disesuaikan per ruangan.',
    ],
    cons: [
      'Biaya pembangunan sekat, AC, dan pencahayaan lebih mahal.',
      'Komunikasi dan pengawasan antar pegawai menjadi kurang langsung.',
      'Ruang gerak terasa lebih sempit dan kurang fleksibel jika ada perubahan tim.',
    ],
    applications: [
      'Ruang Kepala Sekolah / Direktur Perusahaan',
      'Ruang Bagian Keuangan & Audit',
      'Ruang Konseling / Bimbingan / HRD',
    ],
    image: IMAGES.heroOffice,
  },
  {
    id: 'terbuka',
    title: 'Tata Ruang Kantor Terbuka',
    englishTitle: 'Open Plan Office',
    summary:
      'Tata ruang kantor di mana beberapa pegawai atau bagian bekerja bersama dalam satu ruangan besar tanpa penyekat dinding permanen.',
    characteristics: [
      'Meja kerja disusun dalam klaster atau baris dalam satu ruangan terbuka.',
      'Sekat antar meja hanya berupa partisi rendah (90–120 cm) atau tanpa sekat.',
      'Alur kerja dan posisi antar meja mudah diubah sewaktu-waktu.',
    ],
    objectives: [
      'Memperlancar komunikasi, koordinasi cepat, dan pengawasan kerja tim.',
      'Menghemat luas ruangan serta biaya listrik penerangan dan pendingin udara.',
      'Meningkatkan keterbukaan dan kerja sama antar pegawai.',
    ],
    pros: [
      'Efisiensi biaya konstruksi, AC, dan lampu jauh lebih hemat.',
      'Mudah ditata ulang sesuai penambahan atau pengurangan staf.',
      'Cahaya alami dari jendela dapat menyebar ke seluruh ruangan.',
    ],
    cons: [
      'Tingkat kebisingan lebih tinggi akibat aktivitas telepon dan diskusi.',
      'Privasi kerja individu maupun kerahasiaan dokumen berkurang.',
      'Potensi penyebaran gangguan visual atau penyakit flu lebih cepat.',
    ],
    applications: [
      'Ruang Staf Administrasi Umum',
      'Ruang Layanan Pelanggan / Call Center',
      'Kantor Agensi Kreatif dan Start-up',
    ],
    image: IMAGES.openLandscape,
  },
  {
    id: 'berpanorama',
    title: 'Tata Ruang Kantor Berpanorama',
    englishTitle: 'Landscape Office (Bürolandschaft)',
    summary:
      'Tata ruang kantor modern yang memadukan konsep ruang terbuka dengan penataan zona organik, dekorasi estetis, dan elemen taman/tanaman hijau di dalam ruangan.',
    characteristics: [
      'Tidak kaku berbentuk garis lurus; zona kerja dipisah menggunakan rak buku, sofa, atau planter tanaman.',
      'Menghadirkan pemandangan indah baik dari jendela luar maupun taman indoor.',
      'Mengutamakan kenyamanan psikologis, akustik lembut, dan kualitas udara alami.',
    ],
    objectives: [
      'Menciptakan suasana kerja segar agar pegawai tidak cepat jenuh atau stres.',
      'Memadukan keindahan alam (biofilik) dengan produktivitas kantor modern.',
      'Memecah kebisingan ruang terbuka menggunakan elemen tanaman dan panel akustik.',
    ],
    pros: [
      'Suasana kerja sangat nyaman, segar, dan meningkatkan kreativitas.',
      'Kualitas udara dalam ruangan lebih sehat berkat tanaman hidup.',
      'Memberikan citra modern dan peduli kesejahteraan pegawai.',
    ],
    cons: [
      'Memerlukan luas lantai yang cukup besar agar taman indoor tidak mempersempit jalur.',
      'Biaya desain interior dan perawatan tanaman rutin lebih tinggi.',
      'Perencanaan tata letak awal membutuhkan ketelitian estetika.',
    ],
    applications: [
      'Kantor Pusat Perusahaan Teknologi & Layanan Modern',
      'Ruang Kerja Bersama (Coworking Space)',
      'Lobi Pelayanan Publik Berkonsep Ramah Lingkungan',
    ],
    image: IMAGES.openLandscape,
  },
  {
    id: 'gabungan',
    title: 'Tata Ruang Kantor Gabungan',
    englishTitle: 'Hybrid / Mixed Office',
    summary:
      'Kombinasi terencana antara tata ruang tertutup dan terbuka dalam satu lantai kerja untuk memperoleh keunggulan privasi sekaligus kolaborasi.',
    characteristics: [
      'Area tengah berupa ruang terbuka untuk staf operasional dan kolaborasi harian.',
      'Sisi pinggir atau sudut menggunakan sekat kaca tertutup untuk pimpinan, ruang rapat, dan arsip rahasia.',
      'Menyediakan zona tenang (focus booth) dan zona diskusi santai.',
    ],
    objectives: [
      'Menyeimbangkan kebutuhan komunikasi terbuka tim dengan privasi tugas khusus.',
      'Menyesuaikan karakteristik setiap unit kerja dalam satu ekosistem gedung.',
      'Mengoptimalkan efisiensi ruang tanpa mengorbankan kenyamanan.',
    ],
    pros: [
      'Sangat fleksibel dan adaptif untuk berbagai jenis pekerjaan kantor.',
      'Mengatasi kelemahan murni ruang tertutup (kaku) maupun murni terbuka (bising).',
      'Pimpinan tetap mudah memantau tim melalui partisi kaca transparan.',
    ],
    cons: [
      'Membutuhkan perencanaan zonasi akustik yang cermat antara area ramai dan tenang.',
      'Biaya investasi awal lebih tinggi dibanding ruang terbuka murni.',
    ],
    applications: [
      'Kantor Tata Usaha & Manajemen Sekolah (SMK)',
      'Kantor Cabang Perbankan & Layanan Bisnis',
      'Gedung Perkantoran Pemerintahan Modern',
    ],
    image: IMAGES.meeting,
  },
];

export const MODULE_4_PRINCIPLES = [
  {
    number: '01',
    title: 'Efisiensi Penggunaan Ruang',
    standard: '6–9 m² per pegawai',
    desc: 'Setiap meter persegi lantai dimanfaatkan secara optimal tanpa menyisakan sudut mati, namun tetap menghindari penumpukan furniture.',
  },
  {
    number: '02',
    title: 'Kenyamanan Pegawai',
    standard: 'Suhu 23–26°C',
    desc: 'Menciptakan lingkungan visual, termal, dan akustik yang tenang agar pegawai betah bekerja sepanjang hari.',
  },
  {
    number: '03',
    title: 'Ergonomi Kerja',
    standard: 'Meja 72–75 cm · Jarak monitor 50–70 cm',
    desc: 'Menyesuaikan tinggi meja, sandaran kursi, dan jangkauan tangan terhadap ukuran tubuh manusia untuk mencegah cedera otot (MSD).',
  },
  {
    number: '04',
    title: 'Alur Kerja (Workflow)',
    standard: 'Jalur garis lurus / U-shape',
    desc: 'Penempatan meja disusun mengikuti urutan proses dokumen (penerimaan -> pemrosesan -> pengarsipan) agar pegawai tidak bolak-balik.',
  },
  {
    number: '05',
    title: 'Kemudahan Komunikasi',
    standard: 'Jarak antar tim dekat',
    desc: 'Unit kerja yang sering berkoordinasi ditempatkan berdekatan agar penyampaian informasi berlangsung cepat dan akurat.',
  },
  {
    number: '06',
    title: 'Privasi Kerja',
    standard: 'Partisi 120 cm / Ruang Tertutup',
    desc: 'Memberikan batas visual dan suara bagi pekerjaan yang membutuhkan konsentrasi tinggi atau membahas data pribadi/keuangan.',
  },
  {
    number: '07',
    title: 'Keamanan Dokumen & Aset',
    standard: 'Kunci sentral & Akses terbatas',
    desc: 'Lemari arsip penting dan perangkat bernilai tinggi ditempatkan di area terpantau, terkunci, dan jauh dari risiko kebocoran air.',
  },
  {
    number: '08',
    title: 'Keselamatan & Kesehatan Kerja (K3)',
    standard: 'Lorong utama >= 120 cm · APAR terlihat',
    desc: 'Jalur evakuasi bebas hambatan kabel atau boks arsip, stopkontak rapi bertutup, serta penempatan alat pemadam api ringan yang mudah dijangkau.',
  },
  {
    number: '09',
    title: 'Pencahayaan Optimal',
    standard: '300–500 Lux · Posisi jendela di samping',
    desc: 'Cahaya masuk dari sisi kiri atau kanan meja agar layar komputer tidak silau (glare) dan tangan tidak membentuk bayangan saat menulis.',
  },
  {
    number: '10',
    title: 'Sirkulasi Udara Segar',
    standard: 'Pertukaran udara & tanaman indoor',
    desc: 'Penempatan lemari tinggi tidak menutup ventilasi atau hembusan AC sehingga udara segar bersirkulasi merata ke seluruh meja.',
  },
  {
    number: '11',
    title: 'Aksesibilitas Inklusif',
    standard: 'Lebar pintu >= 90 cm · Ruang putar 150 cm',
    desc: 'Tata ruang memudahkan semua orang termasuk tamu lansia atau penyandang disabilitas pengguna kursi roda untuk bergerak aman.',
  },
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  // Modul 1: Furniture Kantor
  {
    id: 'q1',
    module: 1,
    moduleTitle: 'Modul 1 · Furniture Kantor',
    question: 'Berapakah ketinggian standar ergonomis permukaan meja kerja kantor bagi pegawai administrasi?',
    options: ['55 – 60 cm', '72 – 75 cm', '90 – 95 cm', '105 – 115 cm'],
    correctIndex: 1,
    explanation:
      'Ketinggian meja kerja standar adalah 72–75 cm agar siku membentuk sudut ~90 derajat saat mengetik dan kaki tetap memiliki ruang gerak nyaman.',
  },
  {
    id: 'q2',
    module: 1,
    moduleTitle: 'Modul 1 · Furniture Kantor',
    question: 'Fitur keselamatan K3 pada filing cabinet yang mencegah kabinet terguling ke depan saat laci ditarik disebut...',
    options: ['Ball-bearing rail', 'Grommet kabel', 'Sistem anti-tilt (interlock)', 'Powder coating'],
    correctIndex: 2,
    explanation:
      'Sistem anti-tilt/interlock memastikan hanya satu laci yang dapat dibuka pada satu waktu sehingga pusat beban kabinet tidak jatuh ke depan.',
  },
  {
    id: 'q3',
    module: 1,
    moduleTitle: 'Modul 1 · Furniture Kantor',
    question: 'Jika ruang arsip memiliki lorong yang sempit, jenis pintu lemari arsip yang paling disarankan adalah...',
    options: ['Pintu ayun ganda (swing door)', 'Pintu geser (sliding door)', 'Pintu lipat kayu berat', 'Tanpa rak penahan'],
    correctIndex: 1,
    explanation:
      'Lemari arsip pintu geser (sliding door) tidak memakan ruang lorong saat dibuka sehingga jalur sirkulasi K3 tetap lega.',
  },
  {
    id: 'q4',
    module: 1,
    moduleTitle: 'Modul 1 · Furniture Kantor',
    question: 'Mengapa permukaan meja rapat modern sebaiknya menggunakan finishing matte/doff daripada mengilap (glossy)?',
    options: [
      'Agar lebih berat dan sulit digeser',
      'Untuk mencegah pantulan silau lampu dan proyektor ke mata peserta',
      'Supaya dokumen mudah tergelincir',
      'Agar tidak perlu dibersihkan',
    ],
    correctIndex: 1,
    explanation:
      'Permukaan matte mengurangi pantulan cahaya lampu plafon dan layar proyektor yang dapat menyebabkan mata cepat lelah selama rapat.',
  },
  // Modul 2: Interior Kantor
  {
    id: 'q5',
    module: 2,
    moduleTitle: 'Modul 2 · Interior Kantor',
    question: 'Dalam prinsip komposisi warna interior 60-30-10, porsi 60% sebaiknya diisi oleh...',
    options: [
      'Warna aksen menyala seperti merah atau emas',
      'Warna gelap penuh di seluruh dinding dan plafon',
      'Warna netral terang seperti putih atau abu muda sebagai latar dominan',
      'Campuran lima warna primer berbeda',
    ],
    correctIndex: 2,
    explanation:
      'Proporsi 60% warna netral terang membuat ruangan terasa luas, terang, dan tidak melelahkan mata, sementara 30% warna struktur dan 10% aksen.',
  },
  {
    id: 'q6',
    module: 2,
    moduleTitle: 'Modul 2 · Interior Kantor',
    question: 'Berapakah standar tingkat pencahayaan (iluminasi) ideal untuk area kerja administrasi perkantoran?',
    options: ['50 – 100 lux', '100 – 150 lux', '300 – 500 lux', '1.500 – 2.000 lux'],
    correctIndex: 2,
    explanation:
      'Standar pencahayaan kerja kantor adalah 300–500 lux agar aktivitas membaca dan mengetik dokumen jelas tanpa membuat mata tegang.',
  },
  {
    id: 'q7',
    module: 2,
    moduleTitle: 'Modul 2 · Interior Kantor',
    question: 'Gaya desain interior yang menonjolkan langit-langit ekspos, beton poles, bata, serta rangka besi hitam adalah...',
    options: ['Klasik', 'Industrial', 'Minimalis', 'Kontemporer'],
    correctIndex: 1,
    explanation:
      'Desain interior industrial terinspirasi bangunan pabrik/gudang modern yang menampilkan tekstur material mentah secara estetis dan terbuka.',
  },
  {
    id: 'q8',
    module: 2,
    moduleTitle: 'Modul 2 · Interior Kantor',
    question: 'Salah satu fungsi utama penempatan tanaman hias indoor (seperti Sansevieria/Monstera) di ruang kantor adalah...',
    options: [
      'Menggantikan fungsi lemari arsip',
      'Menghalangi pintu darurat',
      'Membantu menyaring udara dan menurunkan kejenuhan visual pegawai',
      'Menaikkan suhu ruangan secara drastis',
    ],
    correctIndex: 2,
    explanation:
      'Konsep desain biofilik memanfaatkan tanaman hias indoor untuk menyegarkan udara, meredam stres visual, dan mempercantik ruang.',
  },
  // Modul 3: Tata Ruang Kantor
  {
    id: 'q9',
    module: 3,
    moduleTitle: 'Modul 3 · Tata Ruang Kantor',
    question: 'Unit kerja manakah yang paling tepat menerapkan tata ruang kantor tertutup (Private Office)?',
    options: [
      'Bagian layanan informasi tamu umum',
      'Ruang pimpinan dan bagian keuangan/audit rahasia',
      'Area tunggu pengunjung',
      'Tim kolaborasi desain harian',
    ],
    correctIndex: 1,
    explanation:
      'Ruang pimpinan dan keuangan membutuhkan kerahasiaan data serta fokus tinggi yang paling tepat difasilitasi oleh tata ruang tertutup.',
  },
  {
    id: 'q10',
    module: 3,
    moduleTitle: 'Modul 3 · Tata Ruang Kantor',
    question: 'Kelemahan utama dari tata ruang kantor terbuka (Open Plan Office) dibandingkan tata ruang tertutup adalah...',
    options: [
      'Biaya listrik pencahayaan sangat boros',
      'Pegawai sulit berkomunikasi dengan rekan sebelahnya',
      'Tingkat kebisingan lebih tinggi dan privasi kerja berkurang',
      'Susunan meja tidak pernah bisa diubah',
    ],
    correctIndex: 2,
    explanation:
      'Meski hemat biaya dan memudahkan komunikasi, kantor terbuka tanpa sekat penuh rentan terhadap kebisingan suara dan minim privasi.',
  },
  {
    id: 'q11',
    module: 3,
    moduleTitle: 'Modul 3 · Tata Ruang Kantor',
    question: 'Ciri khas utama tata ruang kantor berpanorama (Landscape Office) adalah...',
    options: [
      'Seluruh ruangan bersekat tembok beton rapat',
      'Pemisahan zona organik dengan dekorasi estetis dan tanaman hijau indoor',
      'Tidak memiliki jendela sama sekali',
      'Hanya memuat satu meja kerja saja',
    ],
    correctIndex: 1,
    explanation:
      'Landscape office memadukan kelancaran komunikasi ruang terbuka dengan keindahan tanaman, planter box, dan zonasi organik yang asri.',
  },
  {
    id: 'q12',
    module: 3,
    moduleTitle: 'Modul 3 · Tata Ruang Kantor',
    question: 'Mengapa banyak kantor modern termasuk unit tata usaha sekolah memilih tata ruang gabungan (Hybrid Office)?',
    options: [
      'Karena tidak memerlukan perencanaan ruangan',
      'Memadukan efisiensi area terbuka bagi staf dengan ruang tertutup untuk pimpinan/rapat',
      'Supaya seluruh dokumen diletakkan di luar gedung',
      'Agar biaya AC meningkat dua kali lipat',
    ],
    correctIndex: 1,
    explanation:
      'Tata ruang gabungan menyeimbangkan kebutuhan kolaborasi tim staf operasional dengan privasi pimpinan dan ruang rapat.',
  },
  // Modul 4: Prinsip Penataan Ruang Kantor
  {
    id: 'q13',
    module: 4,
    moduleTitle: 'Modul 4 · Prinsip Penataan Ruang',
    question: 'Arah datangnya cahaya alami jendela yang paling ideal terhadap meja kerja pegawai adalah dari...',
    options: [
      'Langsung dari belakang punggung menyorot layar monitor',
      'Langsung dari depan menyorot wajah pegawai',
      'Dari sisi samping kiri atau kanan meja kerja',
      'Dari bawah lantai',
    ],
    correctIndex: 2,
    explanation:
      'Cahaya dari samping menghindari silau langsung di mata maupun pantulan menyilaukan pada layar monitor komputer.',
  },
  {
    id: 'q14',
    module: 4,
    moduleTitle: 'Modul 4 · Prinsip Penataan Ruang',
    question: 'Berapa lebar minimal lorong sirkulasi utama di ruang kerja agar memenuhi prinsip K3 dan aksesibilitas?',
    options: ['40 cm', '60 cm', '120 cm', '300 cm'],
    correctIndex: 2,
    explanation:
      'Lorong utama minimal 120 cm (atau ruang putar 150 cm) memungkinkan dua orang berpapasan dengan nyaman dan memudahkan evakuasi maupun akses kursi roda.',
  },
  {
    id: 'q15',
    module: 4,
    moduleTitle: 'Modul 4 · Prinsip Penataan Ruang',
    question: 'Penataan meja kerja berdasarkan urutan proses pengolahan surat (penerimaan -> pencatatan -> pengarsipan) merupakan penerapan prinsip...',
    options: ['Dekorasi estetis', 'Alur kerja (Workflow)', 'Privasi absolut', 'Sentralisasi warna'],
    correctIndex: 1,
    explanation:
      'Prinsip alur kerja (workflow) memastikan dokumen bergerak lurus dan singkat sehingga menghemat waktu serta tenaga pegawai.',
  },
  {
    id: 'q16',
    module: 4,
    moduleTitle: 'Modul 4 · Prinsip Penataan Ruang',
    question: 'Di mana posisi paling efisien dan aman untuk menempatkan lemari arsip tinggi dalam sebuah ruangan kerja?',
    options: [
      'Tepat di tengah ruangan memotong jalur jalan',
      'Di depan pintu darurat',
      'Merapat ke sisi dinding tanpa menutup ventilasi atau jendela',
      'Menempel di bagian belakang kursi pegawai tanpa jarak tarik',
    ],
    correctIndex: 2,
    explanation:
      'Menempatkan lemari arsip merapat ke dinding menjaga tengah ruangan tetap lega untuk sirkulasi K3 dan tidak menghalangi cahaya jendela.',
  },
];
