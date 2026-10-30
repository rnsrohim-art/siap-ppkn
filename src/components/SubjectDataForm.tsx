import React from 'react';
import { 
  Home, 
  MapPin, 
  Building2, 
  User, 
  CreditCard, 
  BookMarked, 
  Layers, 
  Calendar, 
  Clock, 
  GraduationCap, 
  ChevronRight, 
  Eye,
  CheckCircle2,
  FileText
} from 'lucide-react';
import { SiapPpknData, FaseType } from '../types/atp';
import { 
  ELEMEN_PPKN_CONFIG, 
  MODEL_PEMBELAJARAN_LIST, 
  FASE_OPTIONS 
} from '../data/presets';

interface SubjectDataFormProps {
  data: SiapPpknData;
  onChange: (updated: Partial<SiapPpknData>) => void;
  onNext: () => void;
  onViewPreview: () => void;
}

export const SubjectDataForm: React.FC<SubjectDataFormProps> = ({
  data,
  onChange,
  onNext,
  onViewPreview
}) => {
  // Handle Fase Change
  const handleFaseSelect = (faseVal: string) => {
    const found = FASE_OPTIONS.find(f => f.value === faseVal);
    onChange({ 
      fase: faseVal as FaseType,
      kelas: found ? found.defaultKelas : data.kelas
    });
  };

  // Toggle or select element
  const handleToggleElemen = (elemenName: string) => {
    const currentList = data.elemenTerpilih || [];
    let updatedList: string[];
    if (currentList.includes(elemenName)) {
      if (currentList.length <= 1) {
        return; // maintain at least one element
      }
      updatedList = currentList.filter(e => e !== elemenName);
    } else {
      updatedList = [...currentList, elemenName];
    }
    onChange({ elemenTerpilih: updatedList });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Outer Card Container matching reference screenshot */}
      <div className="bg-white rounded-3xl border border-blue-200/80 shadow-xs p-6 sm:p-10 space-y-6">
        
        {/* BAGIAN 1: IDENTITAS SEKOLAH & GURU PENGAMPU */}
        <div className="space-y-6">
          {/* FIELD: NAMA SEKOLAH */}
          <div className="border border-blue-200/80 rounded-2xl p-4 sm:p-5 bg-white space-y-3">
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0c3149] text-white text-xs sm:text-sm font-extrabold tracking-wide uppercase shadow-xs">
                <Home className="w-4 h-4 text-cyan-300" />
                <span>NAMA SEKOLAH</span>
              </div>
              <span className="px-3.5 py-1 rounded-xl bg-[#fde4ba] text-[#78430b] text-xs font-bold tracking-wide">
                Info dll
              </span>
            </div>

            <input
              type="text"
              value={data.namaSekolah}
              onChange={(e) => onChange({ namaSekolah: e.target.value })}
              placeholder="Masukan nama sekolah Contoh: SMP Negeri 1 Nusantara..."
              className="w-full px-4 py-3 text-sm bg-slate-50/50 border border-blue-200/90 rounded-xl text-slate-800 placeholder:text-slate-400 font-medium focus:bg-white focus:ring-2 focus:ring-blue-600 focus:border-blue-600 focus:outline-hidden transition-all"
            />
          </div>

          {/* FIELD: ALAMAT SEKOLAH */}
          <div className="border border-blue-200/80 rounded-2xl p-4 sm:p-5 bg-white space-y-3">
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0c3149] text-white text-xs sm:text-sm font-extrabold tracking-wide uppercase shadow-xs">
                <MapPin className="w-4 h-4 text-cyan-300" />
                <span>ALAMAT SEKOLAH</span>
              </div>
              <span className="px-3.5 py-1 rounded-xl bg-[#fde4ba] text-[#78430b] text-xs font-bold tracking-wide">
                Peta & Nomor
              </span>
            </div>

            <input
              type="text"
              value={data.alamatSekolah}
              onChange={(e) => onChange({ alamatSekolah: e.target.value })}
              placeholder="Masukan alamat lengkap sekolah.."
              className="w-full px-4 py-3 text-sm bg-slate-50/50 border border-blue-200/90 rounded-xl text-slate-800 placeholder:text-slate-400 font-medium focus:bg-white focus:ring-2 focus:ring-blue-600 focus:border-blue-600 focus:outline-hidden transition-all"
            />
          </div>

          {/* FIELD: KOTA / KABUPATEN & PROVINSI (2 COLUMNS) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="border border-blue-200/80 rounded-2xl p-4 sm:p-5 bg-white space-y-3">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0c3149] text-white text-xs sm:text-sm font-extrabold tracking-wide uppercase shadow-xs">
                <Building2 className="w-4 h-4 text-cyan-300" />
                <span>KOTA / KABUPATEN</span>
              </div>

              <input
                type="text"
                value={data.kotaKabupaten}
                onChange={(e) => onChange({ kotaKabupaten: e.target.value, titimangsaKota: e.target.value })}
                placeholder="Contoh: Jakarta Selatan, Bandung..."
                className="w-full px-4 py-3 text-sm bg-slate-50/50 border border-blue-200/90 rounded-xl text-slate-800 placeholder:text-slate-400 font-medium focus:bg-white focus:ring-2 focus:ring-blue-600 focus:border-blue-600 focus:outline-hidden transition-all"
              />
            </div>

            <div className="border border-blue-200/80 rounded-2xl p-4 sm:p-5 bg-white space-y-3">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0c3149] text-white text-xs sm:text-sm font-extrabold tracking-wide uppercase shadow-xs">
                <Building2 className="w-4 h-4 text-cyan-300" />
                <span>PROVINSI</span>
              </div>

              <input
                type="text"
                value={data.provinsi}
                onChange={(e) => onChange({ provinsi: e.target.value })}
                placeholder="Contoh: Jawa Barat, DKI Jakarta..."
                className="w-full px-4 py-3 text-sm bg-slate-50/50 border border-blue-200/90 rounded-xl text-slate-800 placeholder:text-slate-400 font-medium focus:bg-white focus:ring-2 focus:ring-blue-600 focus:border-blue-600 focus:outline-hidden transition-all"
              />
            </div>
          </div>

          {/* FIELD: NAMA GURU & NIP GURU (2 COLUMNS) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="border border-blue-200/80 rounded-2xl p-4 sm:p-5 bg-white space-y-3">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0c3149] text-white text-xs sm:text-sm font-extrabold tracking-wide uppercase shadow-xs">
                <User className="w-4 h-4 text-cyan-300" />
                <span>NAMA GURU PENGAMPU</span>
              </div>

              <input
                type="text"
                value={data.namaGuru}
                onChange={(e) => onChange({ namaGuru: e.target.value })}
                placeholder="Nama lengkap & gelar guru..."
                className="w-full px-4 py-3 text-sm bg-slate-50/50 border border-blue-200/90 rounded-xl text-slate-800 placeholder:text-slate-400 font-medium focus:bg-white focus:ring-2 focus:ring-blue-600 focus:border-blue-600 focus:outline-hidden transition-all"
              />
            </div>

            <div className="border border-blue-200/80 rounded-2xl p-4 sm:p-5 bg-white space-y-3">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0c3149] text-white text-xs sm:text-sm font-extrabold tracking-wide uppercase shadow-xs">
                <CreditCard className="w-4 h-4 text-cyan-300" />
                <span>NIP GURU PENGAMPU</span>
              </div>

              <input
                type="text"
                value={data.nipGuru}
                onChange={(e) => onChange({ nipGuru: e.target.value })}
                placeholder="NIP guru (jika - jika belum ada)..."
                className="w-full px-4 py-3 text-sm bg-slate-50/50 border border-blue-200/90 rounded-xl text-slate-800 placeholder:text-slate-400 font-medium focus:bg-white focus:ring-2 focus:ring-blue-600 focus:border-blue-600 focus:outline-hidden transition-all"
              />
            </div>
          </div>

          {/* FIELD: NAMA KEPALA SEKOLAH & NIP KEPALA SEKOLAH (2 COLUMNS) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="border border-blue-200/80 rounded-2xl p-4 sm:p-5 bg-white space-y-3">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0c3149] text-white text-xs sm:text-sm font-extrabold tracking-wide uppercase shadow-xs">
                <User className="w-4 h-4 text-cyan-300" />
                <span>NAMA KEPALA SEKOLAH</span>
              </div>

              <input
                type="text"
                value={data.namaKepalaSekolah}
                onChange={(e) => onChange({ namaKepalaSekolah: e.target.value })}
                placeholder="Nama kepala sekolah & gelar..."
                className="w-full px-4 py-3 text-sm bg-slate-50/50 border border-blue-200/90 rounded-xl text-slate-800 placeholder:text-slate-400 font-medium focus:bg-white focus:ring-2 focus:ring-blue-600 focus:border-blue-600 focus:outline-hidden transition-all"
              />
            </div>

            <div className="border border-blue-200/80 rounded-2xl p-4 sm:p-5 bg-white space-y-3">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0c3149] text-white text-xs sm:text-sm font-extrabold tracking-wide uppercase shadow-xs">
                <CreditCard className="w-4 h-4 text-cyan-300" />
                <span>NIP KEPALA SEKOLAH</span>
              </div>

              <input
                type="text"
                value={data.nipKepalaSekolah}
                onChange={(e) => onChange({ nipKepalaSekolah: e.target.value })}
                placeholder="NIP kepala sekolah..."
                className="w-full px-4 py-3 text-sm bg-slate-50/50 border border-blue-200/90 rounded-xl text-slate-800 placeholder:text-slate-400 font-medium focus:bg-white focus:ring-2 focus:ring-blue-600 focus:border-blue-600 focus:outline-hidden transition-all"
              />
            </div>
          </div>
        </div>

        {/* BAGIAN 2: IDENTITAS MATA PELAJARAN PPKn */}
        <div className="border-t border-slate-200 pt-6 space-y-6">
          {/* MATA PELAJARAN */}
          <div className="border border-blue-200/80 rounded-2xl p-4 sm:p-5 bg-white space-y-3">
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0c3149] text-white text-xs sm:text-sm font-extrabold tracking-wide uppercase shadow-xs">
                <BookMarked className="w-4 h-4 text-cyan-300" />
                <span>MATA PELAJARAN</span>
              </div>
              <span className="px-3.5 py-1 rounded-xl bg-[#fde4ba] text-[#78430b] text-xs font-bold tracking-wide">
                PPKn
              </span>
            </div>

            <input
              type="text"
              value={data.mataPelajaran}
              onChange={(e) => onChange({ mataPelajaran: e.target.value })}
              placeholder="Pendidikan Pancasila dan Kewarganegaraan (PPKn)"
              className="w-full px-4 py-3 text-sm bg-slate-50/50 border border-blue-200/90 rounded-xl text-slate-800 font-bold focus:bg-white focus:ring-2 focus:ring-blue-600 focus:border-blue-600 focus:outline-hidden transition-all"
            />
          </div>

          {/* FASE & KELAS (2 COLUMNS) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="border border-blue-200/80 rounded-2xl p-4 sm:p-5 bg-white space-y-3">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0c3149] text-white text-xs sm:text-sm font-extrabold tracking-wide uppercase shadow-xs">
                <Layers className="w-4 h-4 text-cyan-300" />
                <span>FASE KURIKULUM</span>
              </div>
              <select
                value={data.fase}
                onChange={(e) => handleFaseSelect(e.target.value)}
                className="w-full px-4 py-3 text-sm bg-slate-50/50 border border-blue-200/90 rounded-xl text-slate-800 font-bold focus:bg-white focus:ring-2 focus:ring-blue-600 focus:border-blue-600 focus:outline-hidden transition-all cursor-pointer"
              >
                {FASE_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="border border-blue-200/80 rounded-2xl p-4 sm:p-5 bg-white space-y-3">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0c3149] text-white text-xs sm:text-sm font-extrabold tracking-wide uppercase shadow-xs">
                <Layers className="w-4 h-4 text-cyan-300" />
                <span>KELAS SPESIFIK</span>
              </div>
              <input
                type="text"
                value={data.kelas}
                onChange={(e) => onChange({ kelas: e.target.value })}
                placeholder="Contoh: X (Sepuluh), VII, XI-A"
                className="w-full px-4 py-3 text-sm bg-slate-50/50 border border-blue-200/90 rounded-xl text-slate-800 font-bold focus:bg-white focus:ring-2 focus:ring-blue-600 focus:border-blue-600 focus:outline-hidden transition-all"
              />
            </div>
          </div>

          {/* TAHUN AKADEMIK & SEMESTER (2 COLUMNS) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="border border-blue-200/80 rounded-2xl p-4 sm:p-5 bg-white space-y-3">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0c3149] text-white text-xs sm:text-sm font-extrabold tracking-wide uppercase shadow-xs">
                <Calendar className="w-4 h-4 text-cyan-300" />
                <span>TAHUN AKADEMIK</span>
              </div>
              <input
                type="text"
                value={data.tahunAkademik}
                onChange={(e) => onChange({ tahunAkademik: e.target.value })}
                placeholder="Contoh: 2024/2025"
                className="w-full px-4 py-3 text-sm bg-slate-50/50 border border-blue-200/90 rounded-xl text-slate-800 font-bold focus:bg-white focus:ring-2 focus:ring-blue-600 focus:border-blue-600 focus:outline-hidden transition-all"
              />
            </div>

            <div className="border border-blue-200/80 rounded-2xl p-4 sm:p-5 bg-white space-y-3">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0c3149] text-white text-xs sm:text-sm font-extrabold tracking-wide uppercase shadow-xs">
                <Clock className="w-4 h-4 text-cyan-300" />
                <span>SEMESTER</span>
              </div>
              <select
                value={data.semester}
                onChange={(e) => onChange({ semester: e.target.value as any })}
                className="w-full px-4 py-3 text-sm bg-slate-50/50 border border-blue-200/90 rounded-xl text-slate-800 font-bold focus:bg-white focus:ring-2 focus:ring-blue-600 focus:border-blue-600 focus:outline-hidden transition-all cursor-pointer"
              >
                <option value="Semester 1 & 2 (1 Tahun Penuh)">Semester 1 & 2 (1 Tahun Penuh)</option>
                <option value="Semester 1 (Ganjil)">Semester 1 (Ganjil)</option>
                <option value="Semester 2 (Genap)">Semester 2 (Genap)</option>
              </select>
            </div>
          </div>

          {/* TOTAL ALOKASI WAKTU (JP) DIISI SENDIRI & MODEL PEMBELAJARAN (2 COLUMNS) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="border border-blue-200/80 rounded-2xl p-4 sm:p-5 bg-white space-y-3">
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0c3149] text-white text-xs sm:text-sm font-extrabold tracking-wide uppercase shadow-xs">
                  <Clock className="w-4 h-4 text-cyan-300" />
                  <span>TOTAL ALOKASI WAKTU (JP)</span>
                </div>
                <span className="px-3 py-1 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-bold">
                  Isi Sendiri
                </span>
              </div>

              <div className="relative">
                <input
                  type="number"
                  min="1"
                  max="300"
                  value={data.totalAlokasiWaktuJP || ''}
                  onChange={(e) => onChange({ totalAlokasiWaktuJP: Number(e.target.value) || 0 })}
                  placeholder="Ketik total JP (misal: 72)"
                  className="w-full px-4 py-3 text-sm bg-slate-50/50 border border-blue-200/90 rounded-xl text-slate-800 font-black text-emerald-700 focus:bg-white focus:ring-2 focus:ring-blue-600 focus:border-blue-600 focus:outline-hidden transition-all"
                />
                <span className="absolute right-4 top-3.5 text-xs font-extrabold text-slate-400">
                  JP
                </span>
              </div>
            </div>

            <div className="border border-blue-200/80 rounded-2xl p-4 sm:p-5 bg-white space-y-3">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0c3149] text-white text-xs sm:text-sm font-extrabold tracking-wide uppercase shadow-xs">
                <GraduationCap className="w-4 h-4 text-cyan-300" />
                <span>MODEL PEMBELAJARAN</span>
              </div>
              <select
                value={data.modelPembelajaranUtama}
                onChange={(e) => onChange({ modelPembelajaranUtama: e.target.value })}
                className="w-full px-4 py-3 text-sm bg-slate-50/50 border border-blue-200/90 rounded-xl text-slate-800 font-semibold focus:bg-white focus:ring-2 focus:ring-blue-600 focus:border-blue-600 focus:outline-hidden transition-all cursor-pointer"
              >
                {MODEL_PEMBELAJARAN_LIST.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* ELEMEN PPKn (PILIH / KETIK SENDIRI) */}
          <div className="border border-blue-200/80 rounded-2xl p-4 sm:p-5 bg-white space-y-3">
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0c3149] text-white text-xs sm:text-sm font-extrabold tracking-wide uppercase shadow-xs">
                <Layers className="w-4 h-4 text-cyan-300" />
                <span>ELEMEN PEMBELAJARAN PPKn</span>
              </div>
              <span className="px-3.5 py-1 rounded-xl bg-[#e0f2fe] text-[#0369a1] text-xs font-bold tracking-wide">
                Elemen Terpilih
              </span>
            </div>

            <p className="text-xs text-slate-500 font-medium">
              Pilih elemen PPKn yang dicakup pada alur tujuan pembelajaran:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {ELEMEN_PPKN_CONFIG.map((el) => {
                const isSelected = (data.elemenTerpilih || []).includes(el.name);
                return (
                  <button
                    key={el.id}
                    type="button"
                    onClick={() => handleToggleElemen(el.name)}
                    className={`flex items-start gap-3 p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'border-blue-500 bg-blue-50/60 shadow-xs ring-1 ring-blue-500/30'
                        : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100/70 text-slate-600'
                    }`}
                  >
                    <div className="mt-0.5 shrink-0">
                      <CheckCircle2
                        className={`w-4 h-4 ${
                          isSelected ? 'text-blue-600 fill-blue-100' : 'text-slate-300'
                        }`}
                      />
                    </div>
                    <div className="space-y-1">
                      <div className="text-xs font-bold text-slate-800">
                        {el.name}
                      </div>
                      <div className="text-[11px] text-slate-500 leading-relaxed line-clamp-2">
                        {el.description}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* MATERI PEMBELAJARAN (KETIK SENDIRI) */}
          <div className="border border-blue-200/80 rounded-2xl p-4 sm:p-5 bg-white space-y-3">
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0c3149] text-white text-xs sm:text-sm font-extrabold tracking-wide uppercase shadow-xs">
                <FileText className="w-4 h-4 text-cyan-300" />
                <span>MATERI PEMBELAJARAN</span>
              </div>
              <span className="px-3.5 py-1 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-bold tracking-wide">
                Isi Sendiri
              </span>
            </div>

            <textarea
              rows={3}
              value={data.materiPokokUtama || ''}
              onChange={(e) => onChange({ materiPokokUtama: e.target.value })}
              placeholder="Masukan materi pembelajaran atau pokok bahasan, contoh: Gagasan Pendiri Bangsa tentang Dasar Negara, Penerapan Nilai-Nilai Pancasila, Norma Hukum UUD 1945, Keberagaman Budaya Bangsa, Kedaulatan NKRI..."
              className="w-full px-4 py-3 text-sm bg-slate-50/50 border border-blue-200/90 rounded-xl text-slate-800 placeholder:text-slate-400 font-medium focus:bg-white focus:ring-2 focus:ring-blue-600 focus:border-blue-600 focus:outline-hidden transition-all"
            />
          </div>
        </div>

        {/* BOTTOM NAVIGATION ACTIONS */}
        <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-end gap-4">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            {/* Pratinjau button */}
            <button
              type="button"
              onClick={onViewPreview}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-teal-50 border border-teal-300 text-teal-800 hover:bg-teal-100 font-bold text-sm transition-all cursor-pointer"
            >
              <Eye className="w-4 h-4 text-teal-700" />
              <span>Pratinjau Dokumen ATP</span>
            </button>

            {/* Next button: Vibrant Orange button matching screenshot */}
            <button
              type="button"
              onClick={onNext}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl bg-[#ff5512] hover:bg-[#eb4b0d] active:scale-[0.99] text-white font-extrabold text-sm sm:text-base shadow-md shadow-orange-500/30 transition-all cursor-pointer"
            >
              <span>Lanjut: Download</span>
              <ChevronRight className="w-5 h-5 stroke-[2.5]" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
