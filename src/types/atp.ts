export type FaseType = 'Fase A (Kelas 1-2 SD)' | 'Fase B (Kelas 3-4 SD)' | 'Fase C (Kelas 5-6 SD)' | 'Fase D (Kelas 7-9 SMP)' | 'Fase E (Kelas 10 SMA/SMK)' | 'Fase F (Kelas 11-12 SMA/SMK)';

export type ElemenPPKn = 
  | 'Pancasila' 
  | 'Undang-Undang Dasar Negara Republik Indonesia Tahun 1945' 
  | 'Bhinneka Tunggal Ika' 
  | 'Negara Kesatuan Republik Indonesia';

export interface AtpItem {
  id: string;
  kodeTP?: string;
  elemen: ElemenPPKn | string;
  capaianPembelajaran: string;
  tujuanPembelajaran: string;
  materiPembelajaran: string;
  profilPelajarPancasila: string[];
  modelPembelajaran: string;
  alokasiWaktuJP: number;
  asesmen: string;
  sumberBelajar: string;
}

export interface SiapPpknData {
  // Identitas Satuan Pendidikan
  namaSekolah: string;
  alamatSekolah: string;
  kotaKabupaten: string;
  provinsi: string;
  namaKepalaSekolah: string;
  nipKepalaSekolah: string;
  
  // Identitas Pendidik
  namaGuru: string;
  nipGuru: string;
  
  // Identitas Mata Pelajaran
  mataPelajaran: string;
  kelas: string;
  fase: FaseType;
  semester: 'Semester 1 (Ganjil)' | 'Semester 2 (Genap)' | 'Semester 1 & 2 (1 Tahun Penuh)';
  tahunAkademik: string;
  
  // Elemen & Kurikulum
  elemenTerpilih: string[];
  materiPokokUtama: string;
  modelPembelajaranUtama: string;
  totalAlokasiWaktuJP: number;
  
  // Pengesahan
  titimangsaKota: string;
  titimangsaTanggal: string;
  
  // Daftar Alur Tujuan Pembelajaran
  atpItems: AtpItem[];
}
