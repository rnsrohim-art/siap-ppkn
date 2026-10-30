import { SiapPpknData, AtpItem } from '../types/atp';

export const ELEMEN_PPKN_LIST = [
  'Pancasila',
  'Undang-Undang Dasar Negara Republik Indonesia Tahun 1945',
  'Bhinneka Tunggal Ika',
  'Negara Kesatuan Republik Indonesia'
];

export interface ElemenMetadata {
  id: string;
  name: string;
  shortName: string;
  description: string;
  badgeStyle: string;
  defaultCP: string;
}

export const ELEMEN_PPKN_CONFIG: ElemenMetadata[] = [
  {
    id: 'pancasila',
    name: 'Pancasila',
    shortName: 'Pancasila',
    description: 'Nilai-nilai Pancasila, perumusan dasar negara, penerapan nilai dalam kehidupan sehari-hari.',
    badgeStyle: 'bg-amber-50 text-amber-900 border-amber-300 ring-amber-400',
    defaultCP: 'Peserta didik menganalisis dan menerapkan nilai-nilai Pancasila dalam kehidupan bermasyarakat, berbangsa, dan bernegara.'
  },
  {
    id: 'uud1945',
    name: 'Undang-Undang Dasar Negara Republik Indonesia Tahun 1945',
    shortName: 'UUD NRI Tahun 1945',
    description: 'Konstitusi negara, norma hukum, hak dan kewajiban warga negara, tata urutan perundang-undangan.',
    badgeStyle: 'bg-blue-50 text-blue-900 border-blue-300 ring-blue-400',
    defaultCP: 'Peserta didik menganalisis hak dan kewajiban warga negara yang diatur dalam UUD NRI Tahun 1945 serta mematuhi norma hukum dalam kehidupan bermasyarakat.'
  },
  {
    id: 'bhinneka',
    name: 'Bhinneka Tunggal Ika',
    shortName: 'Bhinneka Tunggal Ika',
    description: 'Keragaman suku, agama, budaya, toleransi, inklusivitas, persatuan, dan pencegahan diskriminasi.',
    badgeStyle: 'bg-emerald-50 text-emerald-900 border-emerald-300 ring-emerald-400',
    defaultCP: 'Peserta didik menghargai keragaman identitas budaya, menolak diskriminasi, dan membangun kolaborasi positif dalam kemajemukan bangsa.'
  },
  {
    id: 'nkri',
    name: 'Negara Kesatuan Republik Indonesia',
    shortName: 'NKRI',
    description: 'Kedaulatan wilayah kesatuan, wawasan nusantara, geopolitik, dan kesiapsiagaan bela negara.',
    badgeStyle: 'bg-rose-50 text-rose-900 border-rose-300 ring-rose-400',
    defaultCP: 'Peserta didik memahami kedaulatan wilayah NKRI, batas wilayah yurisdiksi nasional, serta berpartisipasi aktif dalam bela negara.'
  }
];

export const MODEL_PEMBELAJARAN_LIST = [
  'Problem-Based Learning (PBL)',
  'Project-Based Learning (PjBL)',
  'Discovery Learning',
  'Inquiry-Based Learning',
  'Cooperative Learning (Jigsaw/STAD)',
  'Contextual Teaching and Learning (CTL)',
  'Simulasi Sidang & Diskusi Reflektif'
];

export const PROFIL_PELAJAR_PANCASILA_LIST = [
  'Beriman, Bertakwa kepada Tuhan YME, dan Berakhlak Mulia',
  'Berkebinekaan Global',
  'Bergotong Royong',
  'Mandiri',
  'Bernalar Kritis',
  'Kreatif'
];

export const FASE_OPTIONS: { value: string; label: string; defaultKelas: string }[] = [
  { value: 'Fase E (Kelas 10 SMA/SMK)', label: 'Fase E - SMA / SMK Kelas 10', defaultKelas: 'X (Sepuluh)' },
  { value: 'Fase F (Kelas 11-12 SMA/SMK)', label: 'Fase F - SMA / SMK Kelas 11-12', defaultKelas: 'XI (Sebelas)' },
  { value: 'Fase D (Kelas 7-9 SMP)', label: 'Fase D - SMP / MTs Kelas 7-9', defaultKelas: 'VII (Tujuh)' },
  { value: 'Fase C (Kelas 5-6 SD)', label: 'Fase C - SD / MI Kelas 5-6', defaultKelas: 'V (Lima)' },
  { value: 'Fase B (Kelas 3-4 SD)', label: 'Fase B - SD / MI Kelas 3-4', defaultKelas: 'IV (Empat)' },
  { value: 'Fase A (Kelas 1-2 SD)', label: 'Fase A - SD / MI Kelas 1-2', defaultKelas: 'I (Satu)' },
];

export const createEmptyFormState = (faseVal: string = 'Fase E (Kelas 10 SMA/SMK)'): SiapPpknData => {
  const found = FASE_OPTIONS.find(f => f.value === faseVal);
  const defaultKls = found ? found.defaultKelas : 'X (Sepuluh)';
  const prefix = defaultKls.includes('X') ? '10' : defaultKls.includes('XI') ? '11' : '7';
  
  return {
    namaSekolah: '',
    alamatSekolah: '',
    kotaKabupaten: '',
    provinsi: '',
    namaKepalaSekolah: '',
    nipKepalaSekolah: '',
    namaGuru: '',
    nipGuru: '',
    mataPelajaran: 'Pendidikan Pancasila dan Kewarganegaraan (PPKn)',
    kelas: defaultKls,
    fase: faseVal as any,
    semester: 'Semester 1 & 2 (1 Tahun Penuh)',
    tahunAkademik: '2024/2025',
    elemenTerpilih: [
      'Pancasila',
      'Undang-Undang Dasar Negara Republik Indonesia Tahun 1945',
      'Bhinneka Tunggal Ika',
      'Negara Kesatuan Republik Indonesia'
    ],
    materiPokokUtama: '',
    modelPembelajaranUtama: 'Problem-Based Learning (PBL)',
    totalAlokasiWaktuJP: 72,
    titimangsaKota: '',
    titimangsaTanggal: '',
    atpItems: [
      {
        id: `tp-${Date.now()}-1`,
        kodeTP: `${prefix}.1`,
        elemen: 'Pancasila',
        capaianPembelajaran: 'Peserta didik menganalisis dan menerapkan nilai-nilai Pancasila dalam kehidupan bermasyarakat, berbangsa, dan bernegara.',
        tujuanPembelajaran: '',
        materiPembelajaran: '',
        profilPelajarPancasila: ['Bernalar Kritis', 'Mandiri'],
        modelPembelajaran: 'Problem-Based Learning (PBL)',
        alokasiWaktuJP: 8,
        asesmen: 'Tes Tertulis / Penilaian Kinerja',
        sumberBelajar: 'Buku Siswa PPKn Kemendikbudristek'
      },
      {
        id: `tp-${Date.now()}-2`,
        kodeTP: `${prefix}.2`,
        elemen: 'Undang-Undang Dasar Negara Republik Indonesia Tahun 1945',
        capaianPembelajaran: 'Peserta didik memahami norma, hak dan kewajiban warga negara yang diatur dalam UUD NRI Tahun 1945.',
        tujuanPembelajaran: '',
        materiPembelajaran: '',
        profilPelajarPancasila: ['Bernalar Kritis', 'Gotong Royong'],
        modelPembelajaran: 'Problem-Based Learning (PBL)',
        alokasiWaktuJP: 8,
        asesmen: 'Tes Formatif & Studi Kasus',
        sumberBelajar: 'UUD NRI 1945, Buku Teks'
      }
    ]
  };
};


export const PRESET_FASE_E: SiapPpknData = {
  namaSekolah: 'SMA Negeri 1 Indonesia Berkarakter',
  alamatSekolah: 'Jl. Pemuda Pendidikan No. 45, Kota Pelajar',
  kotaKabupaten: 'Jakarta Selatan',
  provinsi: 'DKI Jakarta',
  namaKepalaSekolah: 'Dr. H. Bambang Suhartono, M.Pd.',
  nipKepalaSekolah: '19750812 200003 1 004',
  namaGuru: 'Siti Rahmawati, S.Pd., M.Pd.',
  nipGuru: '19880415 201101 2 018',
  mataPelajaran: 'Pendidikan Pancasila dan Kewarganegaraan (PPKn)',
  kelas: 'X (Sepuluh)',
  fase: 'Fase E (Kelas 10 SMA/SMK)',
  semester: 'Semester 1 & 2 (1 Tahun Penuh)',
  tahunAkademik: '2024/2025',
  elemenTerpilih: [
    'Pancasila',
    'Undang-Undang Dasar Negara Republik Indonesia Tahun 1945',
    'Bhinneka Tunggal Ika',
    'Negara Kesatuan Republik Indonesia'
  ],
  materiPokokUtama: 'Pancasila dalam Kehidupan Berbangsa; UUD NRI 1945 & Norma Hukum; Mengikis Stereotip dan Diskriminasi; Sengketa Batas Wilayah & NKRI',
  modelPembelajaranUtama: 'Problem-Based Learning (PBL)',
  totalAlokasiWaktuJP: 72,
  titimangsaKota: 'Nusantara',
  titimangsaTanggal: '15 Juli 2024',
  atpItems: [
    {
      id: 'tp-10-1',
      kodeTP: '10.1',
      elemen: 'Pancasila',
      capaianPembelajaran: 'Peserta didik mampu menganalisis cara pandang para pendiri bangsa tentang rumusan dan dasar negara Pancasila serta kedudukan Pancasila sebagai ideologi terbuka.',
      tujuanPembelajaran: 'Peserta didik mampu menganalisis gagasan dan pandangan para pendiri bangsa tentang rumusan dasar negara dalam sidang BPUPK dan PPKI.',
      materiPembelajaran: 'Gagasan Pendiri Bangsa tentang Dasar Negara & Dinamika Perumusan Pancasila',
      profilPelajarPancasila: ['Bernalar Kritis', 'Berkebinekaan Global'],
      modelPembelajaran: 'Problem-Based Learning (PBL)',
      alokasiWaktuJP: 8,
      asesmen: 'Tes Tulis (Analisis Teks Sidang BPUPK) & Presentasi Portofolio Gagasan',
      sumberBelajar: 'Buku Siswa PPKn Kelas X Kemendikbudristek, Risalah Sidang BPUPK'
    },
    {
      id: 'tp-10-2',
      kodeTP: '10.2',
      elemen: 'Pancasila',
      capaianPembelajaran: 'Peserta didik mampu menerapkan nilai-nilai Pancasila dalam kehidupan keseharian di lingkungan sekolah, keluarga, dan masyarakat.',
      tujuanPembelajaran: 'Peserta didik mampu menelaah dan mengaktualisasikan penerapan 5 sila Pancasila dalam merespons tantangan era digital.',
      materiPembelajaran: 'Penerapan Nilai-Nilai Pancasila dalam Konteks Kehidupan Keseharian dan Era Digital',
      profilPelajarPancasila: ['Beriman, Bertakwa kepada Tuhan YME', 'Bergotong Royong', 'Mandiri'],
      modelPembelajaran: 'Project-Based Learning (PjBL)',
      alokasiWaktuJP: 10,
      asesmen: 'Proyek Kampanye Digital Nilai Pancasila & Rubrik Penilaian Observasi Sikap',
      sumberBelajar: 'Buku Panduan Guru PPKn Kelas X, Media Sosial Positif, Artikel Jurnal'
    },
    {
      id: 'tp-10-3',
      kodeTP: '10.3',
      elemen: 'Undang-Undang Dasar Negara Republik Indonesia Tahun 1945',
      capaianPembelajaran: 'Peserta didik mampu menganalisis hak dan kewajiban warga negara yang diatur dalam UUD NRI Tahun 1945 serta peraturan perundang-undangan.',
      tujuanPembelajaran: 'Peserta didik mampu mengidentifikasi dan memetakan hak dan kewajiban warga negara serta merumuskan solusi atas kasus pelanggaran hak.',
      materiPembelajaran: 'Hierarki Peraturan Perundang-undangan dan Hak & Kewajiban Warga Negara dalam UUD NRI 1945',
      profilPelajarPancasila: ['Bernalar Kritis', 'Mandiri'],
      modelPembelajaran: 'Discovery Learning',
      alokasiWaktuJP: 10,
      asesmen: 'Studi Kasus Pelanggaran Hak & Kuis Asesmen Formatif',
      sumberBelajar: 'Naskah UUD NRI Tahun 1945, UU No. 12 Tahun 2011, Komnas HAM'
    },
    {
      id: 'tp-10-4',
      kodeTP: '10.4',
      elemen: 'Undang-Undang Dasar Negara Republik Indonesia Tahun 1945',
      capaianPembelajaran: 'Peserta didik mendemonstrasikan praktik pembuatan kesepakatan bersama dan norma di lingkungan sekitar.',
      tujuanPembelajaran: 'Peserta didik mampu merancang tata tertib kelas berlandaskan kesepakatan musyawarah mufakat sesuai prinsip konstitusional.',
      materiPembelajaran: 'Norma Sosial, Hukum Konstitusi, dan Musyawarah Pembentukan Kesepakatan Bersama',
      profilPelajarPancasila: ['Bergotong Royong', 'Bernalar Kritis'],
      modelPembelajaran: 'Simulasi Sidang & Diskusi Reflektif',
      alokasiWaktuJP: 8,
      asesmen: 'Unjuk Kerja Simulasi Musyawarah Pembuatan Aturan Sekolah',
      sumberBelajar: 'Modul Ajar PPKn SMA, Tata Tertib Sekolah, Lembar Kerja Peserta Didik'
    },
    {
      id: 'tp-10-5',
      kodeTP: '10.5',
      elemen: 'Bhinneka Tunggal Ika',
      capaianPembelajaran: 'Peserta didik mampu mengidentifikasi pengaruh keanggotaan kelompok lokal, regional, nasional, dan global terhadap pembentukan identitas diri.',
      tujuanPembelajaran: 'Peserta didik mampu menghargai keragaman identitas budaya, suku, agama, dan gender serta mengikis prasangka dan diskriminasi.',
      materiPembelajaran: 'Identitas Diri, Keragaman Budaya Bangsa, dan Strategi Kolaborasi Antarbudaya',
      profilPelajarPancasila: ['Berkebinekaan Global', 'Bergotong Royong'],
      modelPembelajaran: 'Cooperative Learning (Jigsaw/STAD)',
      alokasiWaktuJP: 10,
      asesmen: 'Pameran Mini Budaya Nusantara & Penilaian Diri (Self-Assessment)',
      sumberBelajar: 'Dokumentasi Kebudayaan Kemendikbudristek, Video Dokumenter Budaya'
    },
    {
      id: 'tp-10-6',
      kodeTP: '10.6',
      elemen: 'Bhinneka Tunggal Ika',
      capaianPembelajaran: 'Peserta didik mampu menanggapi secara kritis terhadap ujaran kebencian, hoaks, dan stereotip di ruang publik maupun digital.',
      tujuanPembelajaran: 'Peserta didik mampu menyusun narasi perdamaian dan toleransi untuk merawat keutuhan dalam keberagaman.',
      materiPembelajaran: 'Literasi Kritis Media, Mitigasi Konflik Sosial, dan Harmoni Keberagaman',
      profilPelajarPancasila: ['Bernalar Kritis', 'Kreatif'],
      modelPembelajaran: 'Problem-Based Learning (PBL)',
      alokasiWaktuJP: 8,
      asesmen: 'Karya Esai Reflektif / Poster Ajakan Toleransi & Perdamaian',
      sumberBelajar: 'Platform Cek Fakta, Studi Kasus Kerukunan Beragama'
    },
    {
      id: 'tp-10-7',
      kodeTP: '10.7',
      elemen: 'Negara Kesatuan Republik Indonesia',
      capaianPembelajaran: 'Peserta didik mampu menjelaskan konsep kedaulatan, wilayah negara kesatuan, dan batas wilayah yurisdiksi Indonesia.',
      tujuanPembelajaran: 'Peserta didik mampu menganalisis sengketa perbatasan wilayah darat, laut, dan udara RI serta peran diplomasi kedaulatan.',
      materiPembelajaran: 'Batas Wilayah Negara Kesatuan Republik Indonesia (Darat, Laut, Udara) dan Kedaulatan Bangsa',
      profilPelajarPancasila: ['Bernalar Kritis', 'Berkebinekaan Global'],
      modelPembelajaran: 'Inquiry-Based Learning',
      alokasiWaktuJP: 10,
      asesmen: 'Laporan Investigasi Wilayah Perbatasan & Peta Tematik Batas RI',
      sumberBelajar: 'Peta Geospasial BIG, UNCLOS 1982, Buku Referensi Geopolitik Indonesia'
    },
    {
      id: 'tp-10-8',
      kodeTP: '10.8',
      elemen: 'Negara Kesatuan Republik Indonesia',
      capaianPembelajaran: 'Peserta didik mampu menunjukkan komitmen bela negara dalam menjaga keutuhan Negara Kesatuan Republik Indonesia.',
      tujuanPembelajaran: 'Peserta didik mampu merancang aksi nyata bela negara di lingkungan sekolah untuk menjaga kedaulatan dan integrasi nasional.',
      materiPembelajaran: 'Hakikat Bela Negara, Ancaman Nonmiliter Kontemporer, dan Aksi Pelajar untuk NKRI',
      profilPelajarPancasila: ['Mandiri', 'Bergotong Royong', 'Beriman, Bertakwa kepada Tuhan YME'],
      modelPembelajaran: 'Project-Based Learning (PjBL)',
      alokasiWaktuJP: 8,
      asesmen: 'Penilaian Proyek Bakti Sosial Lingkungan / Aksi Nyata Bela Negara',
      sumberBelajar: 'UU No. 23 Tahun 2019 tentang Pengelolaan Sumber Daya Nasional untuk Pertahanan Negara'
    }
  ]
};

export const PRESET_FASE_D: SiapPpknData = {
  namaSekolah: 'SMP Negeri 2 Satya Bahari',
  alamatSekolah: 'Jl. Merdeka Belajar No. 12, Jawa Timur',
  kotaKabupaten: 'Surabaya',
  provinsi: 'Jawa Timur',
  namaKepalaSekolah: 'Dra. Endang Purwanti, M.M.',
  nipKepalaSekolah: '19700101 199512 2 001',
  namaGuru: 'Ahmad Fauzan, S.Pd.',
  nipGuru: '19920310 201903 1 008',
  mataPelajaran: 'Pendidikan Pancasila dan Kewarganegaraan (PPKn)',
  kelas: 'VII (Tujuh)',
  fase: 'Fase D (Kelas 7-9 SMP)',
  semester: 'Semester 1 & 2 (1 Tahun Penuh)',
  tahunAkademik: '2024/2025',
  elemenTerpilih: [
    'Pancasila',
    'Undang-Undang Dasar Negara Republik Indonesia Tahun 1945',
    'Bhinneka Tunggal Ika',
    'Negara Kesatuan Republik Indonesia'
  ],
  materiPokokUtama: 'Sejarah Kelahiran Pancasila; Norma Masyarakat; Keberagaman Suku, Agama, Ras; Kesatuan Indonesia & Karakteristik Daerah',
  modelPembelajaranUtama: 'Problem-Based Learning (PBL)',
  totalAlokasiWaktuJP: 72,
  titimangsaKota: 'Surabaya',
  titimangsaTanggal: '15 Juli 2024',
  atpItems: [
    {
      id: 'tp-7-1',
      kodeTP: '7.1',
      elemen: 'Pancasila',
      capaianPembelajaran: 'Peserta didik memahami sejarah perumusan dan penetapan Pancasila sebagai dasar negara.',
      tujuanPembelajaran: 'Peserta didik mendeskripsikan proses perumusan Pancasila oleh BPUPK dan Panitia Sembilan dengan sikap komitmen kebangsaan.',
      materiPembelajaran: 'Sejarah Kelahiran dan Penetapan Pancasila sebagai Dasar Negara',
      profilPelajarPancasila: ['Beriman, Bertakwa kepada Tuhan YME', 'Bernalar Kritis'],
      modelPembelajaran: 'Discovery Learning',
      alokasiWaktuJP: 10,
      asesmen: 'Tes Tertulis & Pembuatan Garis Waktu (Timeline) Sejarah',
      sumberBelajar: 'Buku Siswa PPKn SMP Kelas VII Kemendikbudristek'
    },
    {
      id: 'tp-7-2',
      kodeTP: '7.2',
      elemen: 'Pancasila',
      capaianPembelajaran: 'Peserta didik mampu menerapkan nilai-nilai Pancasila dalam pergaulan sehari-hari di sekolah dan masyarakat.',
      tujuanPembelajaran: 'Peserta didik mempraktikkan perilaku gotong royong dan toleransi sesuai sila-sila Pancasila.',
      materiPembelajaran: 'Penerapan Nilai-Nilai Pancasila dalam Kehidupan Sehari-hari',
      profilPelajarPancasila: ['Bergotong Royong', 'Mandiri'],
      modelPembelajaran: 'Project-Based Learning (PjBL)',
      alokasiWaktuJP: 8,
      asesmen: 'Jurnal Refleksi Harian & Lembar Observasi Sikap',
      sumberBelajar: 'Modul Ajar PPKn Fase D, Buku Cerita Keteladanan Tokoh Bangsa'
    },
    {
      id: 'tp-7-3',
      kodeTP: '7.3',
      elemen: 'Undang-Undang Dasar Negara Republik Indonesia Tahun 1945',
      capaianPembelajaran: 'Peserta didik memahami norma, hak, dan kewajiban dalam kehidupan bermasyarakat dan bernegara.',
      tujuanPembelajaran: 'Peserta didik menganalisis macam-macam norma (agama, kesusilaan, kesopanan, hukum) serta pentingnya mentaati aturan.',
      materiPembelajaran: 'Norma dan UUD NRI Tahun 1945 dalam Kehidupan Bermasyarakat',
      profilPelajarPancasila: ['Bernalar Kritis', 'Mandiri'],
      modelPembelajaran: 'Problem-Based Learning (PBL)',
      alokasiWaktuJP: 10,
      asesmen: 'Analisis Studi Kasus Pelanggaran Norma di Sekolah',
      sumberBelajar: 'Buku PPKn Kelas VII, Kliping Berita Hukum'
    },
    {
      id: 'tp-7-4',
      kodeTP: '7.4',
      elemen: 'Undang-Undang Dasar Negara Republik Indonesia Tahun 1945',
      capaianPembelajaran: 'Peserta didik mematuhi norma dan aturan hukum di lingkungan sekolah, keluarga, dan masyarakat.',
      tujuanPembelajaran: 'Peserta didik merumuskan kesepakatan tata tertib kelas yang adil dan bertanggung jawab.',
      materiPembelajaran: 'Hak dan Kewajiban Warga Negara serta Budaya Tertib Hukum',
      profilPelajarPancasila: ['Bergotong Royong', 'Kreatif'],
      modelPembelajaran: 'Contextual Teaching and Learning (CTL)',
      alokasiWaktuJP: 8,
      asesmen: 'Produk Poster Tata Tertib Kelas & Asesmen Rekan Sejawat',
      sumberBelajar: 'Panduan Disiplin Positif Sekolah'
    },
    {
      id: 'tp-7-5',
      kodeTP: '7.5',
      elemen: 'Bhinneka Tunggal Ika',
      capaianPembelajaran: 'Peserta didik menghargai keragaman suku, agama, ras, dan antargolongan dalam bingkai Bhinneka Tunggal Ika.',
      tujuanPembelajaran: 'Peserta didik mengidentifikasi kearifan lokal daerah dan keragaman budaya nusantara sebagai kekayaan bangsa.',
      materiPembelajaran: 'Keberagaman Suku, Agama, Ras, dan Antargolongan di Indonesia',
      profilPelajarPancasila: ['Berkebinekaan Global', 'Bergotong Royong'],
      modelPembelajaran: 'Cooperative Learning (Jigsaw/STAD)',
      alokasiWaktuJP: 10,
      asesmen: 'Presentasi Kelompok Keragaman Adat Daerah & Rubrik Kinerja',
      sumberBelajar: 'Ensiklopedia Budaya Indonesia, Video Pembelajaran Kemdikbud'
    },
    {
      id: 'tp-7-6',
      kodeTP: '7.6',
      elemen: 'Bhinneka Tunggal Ika',
      capaianPembelajaran: 'Peserta didik mempromosikan perdamaian dan menolak diskriminasi di lingkungan pergaulan.',
      tujuanPembelajaran: 'Peserta didik menyajikan deklarasi anti perundungan (anti-bullying) untuk menjaga kerukunan.',
      materiPembelajaran: 'Menjaga Toleransi, Mencegah Diskriminasi & Anti Perundungan',
      profilPelajarPancasila: ['Beriman, Bertakwa kepada Tuhan YME', 'Kreatif'],
      modelPembelajaran: 'Project-Based Learning (PjBL)',
      alokasiWaktuJP: 8,
      asesmen: 'Video Pendek / Kampanye Mading Anti-Perundungan',
      sumberBelajar: 'Panduan Roots Anti-Bullying Kemdikbud'
    },
    {
      id: 'tp-7-7',
      kodeTP: '7.7',
      elemen: 'Negara Kesatuan Republik Indonesia',
      capaianPembelajaran: 'Peserta didik memahami bentuk dan kedaulatan negara kesatuan serta karakteristik daerah.',
      tujuanPembelajaran: 'Peserta didik menjelaskan kedudukan Indonesia sebagai negara kesatuan dan karakteristik daerah tempat tinggal.',
      materiPembelajaran: 'Wilayah Negara Kesatuan Republik Indonesia dan Karakteristik Daerah Tempat Tinggal',
      profilPelajarPancasila: ['Bernalar Kritis', 'Mandiri'],
      modelPembelajaran: 'Inquiry-Based Learning',
      alokasiWaktuJP: 10,
      asesmen: 'Laporan Pengamatan Profil Potensi Daerah Asal',
      sumberBelajar: 'Peta Atlas Indonesia, Profil Wilayah Kecamatan/Kabupaten'
    },
    {
      id: 'tp-7-8',
      kodeTP: '7.8',
      elemen: 'Negara Kesatuan Republik Indonesia',
      capaianPembelajaran: 'Peserta didik berpartisipasi menjaga keutuhan NKRI melalui keteladanan cinta tanah air.',
      tujuanPembelajaran: 'Peserta didik mempraktikkan sikap bangga menggunakan produk dalam negeri dan cinta tanah air.',
      materiPembelajaran: 'Cinta Tanah Air, Bela Negara Pelajar, dan Kebanggaan Produk Lokal',
      profilPelajarPancasila: ['Bergotong Royong', 'Mandiri'],
      modelPembelajaran: 'Contextual Teaching and Learning (CTL)',
      alokasiWaktuJP: 8,
      asesmen: 'Proyek Promosi Produk UMKM Lokal Pelajar',
      sumberBelajar: 'Buku PPKn Fase D, Dokumentasi Produk Kebanggaan Indonesia'
    }
  ]
};

export const PRESET_FASE_F: SiapPpknData = {
  namaSekolah: 'SMA Negeri 5 Unggulan Bangsa',
  alamatSekolah: 'Jl. Garuda Pancasila Kav. 9, Jakarta',
  kotaKabupaten: 'Jakarta Timur',
  provinsi: 'DKI Jakarta',
  namaKepalaSekolah: 'Drs. Tri Wahyudi, M.Si.',
  nipKepalaSekolah: '19681120 199403 1 003',
  namaGuru: 'Nurul Hidayati, S.Pd., Gr.',
  nipGuru: '19900214 201502 2 004',
  mataPelajaran: 'Pendidikan Pancasila dan Kewarganegaraan (PPKn)',
  kelas: 'XI (Sebelas)',
  fase: 'Fase F (Kelas 11-12 SMA/SMK)',
  semester: 'Semester 1 & 2 (1 Tahun Penuh)',
  tahunAkademik: '2024/2025',
  elemenTerpilih: [
    'Pancasila',
    'Undang-Undang Dasar Negara Republik Indonesia Tahun 1945',
    'Bhinneka Tunggal Ika',
    'Negara Kesatuan Republik Indonesia'
  ],
  materiPokokUtama: 'Pancasila dalam Konteks Global; Demokrasi Konstitusional & Supremasi Hukum; Harmoni Sosial Multikultural; Ketahanan Nasional & Geopolitik',
  modelPembelajaranUtama: 'Problem-Based Learning (PBL)',
  totalAlokasiWaktuJP: 72,
  titimangsaKota: 'Jakarta',
  titimangsaTanggal: '15 Juli 2024',
  atpItems: [
    {
      id: 'tp-11-1',
      kodeTP: '11.1',
      elemen: 'Pancasila',
      capaianPembelajaran: 'Peserta didik menganalisis kedudukan Pancasila sebagai ideologi dunia dan perbandingannya dengan ideologi lain.',
      tujuanPembelajaran: 'Peserta didik mampu membandingkan ideologi Pancasila dengan liberalisme dan sosialisme serta keunggulannya.',
      materiPembelajaran: 'Pancasila dalam Konstelasi Global dan Perbandingan Sistem Ideologi Dunia',
      profilPelajarPancasila: ['Bernalar Kritis', 'Berkebinekaan Global'],
      modelPembelajaran: 'Problem-Based Learning (PBL)',
      alokasiWaktuJP: 10,
      asesmen: 'Makalah Analisis Perbandingan Ideologi & Debat Terbimbing',
      sumberBelajar: 'Buku Siswa PPKn Kelas XI Kemendikbudristek, Jurnal Ketahanan Nasional'
    },
    {
      id: 'tp-11-2',
      kodeTP: '11.2',
      elemen: 'Pancasila',
      capaianPembelajaran: 'Peserta didik mempromosikan nilai Pancasila dalam mengatasi isu global (lingkungan hidup, perdamaian).',
      tujuanPembelajaran: 'Peserta didik merancang program kepemimpinan pemuda berbasis nilai musyawarah dan keadilan sosial.',
      materiPembelajaran: 'Etika Pancasila dalam Penyelesaian Masalah Sosial Kontemporer',
      profilPelajarPancasila: ['Mandiri', 'Bergotong Royong', 'Kreatif'],
      modelPembelajaran: 'Project-Based Learning (PjBL)',
      alokasiWaktuJP: 8,
      asesmen: 'Proposal Program Pengabdian Pelajar untuk Lingkungan',
      sumberBelajar: 'Buku Panduan Guru PPKn Kelas XI, Dokumen SDGs Bappenas'
    },
    {
      id: 'tp-11-3',
      kodeTP: '11.3',
      elemen: 'Undang-Undang Dasar Negara Republik Indonesia Tahun 1945',
      capaianPembelajaran: 'Peserta didik menganalisis praktik demokrasi konstitusional dan penegakan supremasi hukum di Indonesia.',
      tujuanPembelajaran: 'Peserta didik mampu mengevaluasi dinamika pelaksanaan demokrasi dan peran lembaga peradilan penegak hukum.',
      materiPembelajaran: 'Sistem Hukum dan Peradilan di Indonesia serta Perlindungan HAM',
      profilPelajarPancasila: ['Bernalar Kritis', 'Mandiri'],
      modelPembelajaran: 'Inquiry-Based Learning',
      alokasiWaktuJP: 10,
      asesmen: 'Bedah Kasus Putusan Pengadilan / Mahkamah Konstitusi',
      sumberBelajar: 'Putusan Mahkamah Konstitusi, UU Kehakiman, Dokumen Komisi Yudisial'
    },
    {
      id: 'tp-11-4',
      kodeTP: '11.4',
      elemen: 'Undang-Undang Dasar Negara Republik Indonesia Tahun 1945',
      capaianPembelajaran: 'Peserta didik berpartisipasi aktif dalam pengawasan tata kelola pemerintahan yang bersih dan transparan.',
      tujuanPembelajaran: 'Peserta didik merumuskan mekanisme partisipasi publik dalam pencegahan tindak korupsi.',
      materiPembelajaran: 'Budaya Anti-Korupsi, Akuntabilitas Publik, dan Keterbukaan Informasi',
      profilPelajarPancasila: ['Beriman, Bertakwa kepada Tuhan YME', 'Bernalar Kritis'],
      modelPembelajaran: 'Discovery Learning',
      alokasiWaktuJP: 8,
      asesmen: 'Infografis Edukasi Gerakan Integritas dan Anti Korupsi',
      sumberBelajar: 'Modul Anti Korupsi KPK, Undang-Undang Tindak Pidana Korupsi'
    },
    {
      id: 'tp-11-5',
      kodeTP: '11.5',
      elemen: 'Bhinneka Tunggal Ika',
      capaianPembelajaran: 'Peserta didik menganalisis potensi konflik dan strategi resolusi dalam masyarakat multikultural.',
      tujuanPembelajaran: 'Peserta didik mampu merancang strategi integrasi sosial dan resolusi konflik berlandaskan musyawarah.',
      materiPembelajaran: 'Manajemen Keberagaman Sosial Budaya dan Resolusi Damai Konflik Sosial',
      profilPelajarPancasila: ['Berkebinekaan Global', 'Bergotong Royong'],
      modelPembelajaran: 'Simulasi Sidang & Diskusi Reflektif',
      alokasiWaktuJP: 10,
      asesmen: 'Role Play Negosiasi & Mediasi Konflik Sosial Multikultural',
      sumberBelajar: 'Buku Sosiologi Hukum & Kerukunan Nasional'
    },
    {
      id: 'tp-11-6',
      kodeTP: '11.6',
      elemen: 'Bhinneka Tunggal Ika',
      capaianPembelajaran: 'Peserta didik memprakarsai kegiatan kolaborasi lintas budaya di tingkat lokal maupun internasional.',
      tujuanPembelajaran: 'Peserta didik mengorganisasikan forum dialog antarbudaya pelajar guna memupuk persaudaraan.',
      materiPembelajaran: 'Diplomasi Budaya Pelajar dan Kerjasama Lintas Komunitas',
      profilPelajarPancasila: ['Berkebinekaan Global', 'Kreatif'],
      modelPembelajaran: 'Project-Based Learning (PjBL)',
      alokasiWaktuJP: 8,
      asesmen: 'Laporan Dokumentasi Festival Dialog Kebudayaan Pelajar',
      sumberBelajar: 'Bahan Ajar Direktorat SMA, Jurnal Antropologi Budaya'
    },
    {
      id: 'tp-11-7',
      kodeTP: '11.7',
      elemen: 'Negara Kesatuan Republik Indonesia',
      capaianPembelajaran: 'Peserta didik menganalisis wawasan nusantara dan geopolitik Indonesia dalam mempertahankan kedaulatan.',
      tujuanPembelajaran: 'Peserta didik mampu menelaah tantangan geopolitik di kawasan Indo-Pasifik dan ketahanan nasional Indonesia.',
      materiPembelajaran: 'Wawasan Nusantara, Geopolitik Indonesia, dan Ketahanan Nasional',
      profilPelajarPancasila: ['Bernalar Kritis', 'Berkebinekaan Global'],
      modelPembelajaran: 'Problem-Based Learning (PBL)',
      alokasiWaktuJP: 10,
      asesmen: 'Analisis Posisi Strategis Selat Malaka & Alur Laut Kepulauan Indonesia (ALKI)',
      sumberBelajar: 'Buku Lemhannas RI, Peta Maritim Indonesia'
    },
    {
      id: 'tp-11-8',
      kodeTP: '11.8',
      elemen: 'Negara Kesatuan Republik Indonesia',
      capaianPembelajaran: 'Peserta didik menunjukkan kesiapsiagaan bela negara menghadapi ancaman hibrida (cyber, ideologi, ekonomi).',
      tujuanPembelajaran: 'Peserta didik merumuskan kesiapsiagaan pertahanan siber dan bela negara era digital.',
      materiPembelajaran: 'Sistem Pertahanan Keamanan Rakyat Semesta (Sishankamrata) & Ketahanan Siber Pelajar',
      profilPelajarPancasila: ['Mandiri', 'Bergotong Royong'],
      modelPembelajaran: 'Project-Based Learning (PjBL)',
      alokasiWaktuJP: 8,
      asesmen: 'Panduan Etika Keamanan Digital dan Ketahanan Nasional untuk Pelajar',
      sumberBelajar: 'Dokumen BSSN, UU Pertahanan Negara'
    }
  ]
};
