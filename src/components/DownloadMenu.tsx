import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  CheckCircle2, 
  Printer, 
  Sparkles, 
  Loader2,
  FileCheck,
  ArrowLeft
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { SiapPpknData } from '../types/atp';
import { generateAtpDocx, saveBlobToFile } from '../utils/docxGenerator';

interface DownloadMenuProps {
  data: SiapPpknData;
  onGoBackToData: () => void;
  onImportData: (imported: SiapPpknData) => void;
}

export const DownloadMenu: React.FC<DownloadMenuProps> = ({
  data,
  onGoBackToData
}) => {
  const [downloadingAtp, setDownloadingAtp] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch {
      // safe fallback if confetti fails
    }
  };

  // Download Dokumen ATP (.docx)
  const handleDownloadAtp = async () => {
    try {
      setDownloadingAtp(true);
      setSuccessMessage(null);
      const blob = await generateAtpDocx(data);
      const safeSchoolName = (data.namaSekolah || 'Sekolah').replace(/[^a-zA-Z0-9]/g, '_');
      const safeFase = (data.fase || 'Fase').split(' ')[0];
      const filename = `ATP_PPKn_${safeFase}_${safeSchoolName}_${data.tahunAkademik.replace('/', '-')}.docx`;
      saveBlobToFile(blob, filename);
      triggerConfetti();
      setSuccessMessage(`Berhasil mengunduh dokumen "${filename}"! Berkas Microsoft Word siap dibuka, diedit, dan dicetak.`);
    } catch (error) {
      console.error('Error generating ATP docx:', error);
      alert('Terjadi kesalahan saat memproses dokumen Word. Silakan coba kembali.');
    } finally {
      setDownloadingAtp(false);
    }
  };

  const totalJP = data.totalAlokasiWaktuJP || data.atpItems.reduce((acc, curr) => acc + (Number(curr.alokasiWaktuJP) || 0), 0);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-emerald-800 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-emerald-300 font-semibold text-xs tracking-wider uppercase mb-1">
              <Sparkles className="w-4 h-4" /> Dokumen Siap Unduh
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              Download Dokumen ATP PPKn
            </h1>
            <p className="text-blue-100 text-sm mt-1 max-w-xl">
              Unduh hasil penyusunan Alur Tujuan Pembelajaran (ATP) dalam format resmi Microsoft Word (.docx).
            </p>
          </div>

          <button
            type="button"
            onClick={onGoBackToData}
            className="self-start md:self-center px-4 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs sm:text-sm font-bold transition-all border border-white/20 backdrop-blur-xs flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Data</span>
          </button>
        </div>
      </div>

      {/* Success Notification Alert */}
      {successMessage && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-start gap-3 shadow-xs animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm">
            <p className="font-bold">Unduhan Berhasil!</p>
            <p className="text-emerald-800">{successMessage}</p>
          </div>
        </div>
      )}

      {/* SINGLE PRIMARY DOWNLOAD CARD: HANYA DOKUMEN ATP */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-blue-200 shadow-md relative space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center shadow-xs">
              <FileText className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  Dokumen Alur Tujuan Pembelajaran (ATP)
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                {data.namaSekolah || 'Satuan Pendidikan'} • {data.mataPelajaran} • {data.fase}
              </p>
            </div>
          </div>

          <span className="self-start sm:self-center px-3.5 py-1.5 rounded-full text-xs font-extrabold bg-blue-50 text-blue-800 border border-blue-200">
            Microsoft Word (.docx)
          </span>
        </div>

        {/* Dokumen Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-slate-500 font-medium">Tujuan Pembelajaran:</span>
            <p className="text-sm font-bold text-slate-800 mt-0.5">{data.atpItems.length} Tujuan (TP)</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-slate-500 font-medium">Alokasi Waktu:</span>
            <p className="text-sm font-bold text-emerald-700 mt-0.5">{totalJP} Jam Pelajaran (JP)</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-slate-500 font-medium">Tahun Akademik:</span>
            <p className="text-sm font-bold text-slate-800 mt-0.5">{data.tahunAkademik} • {data.semester.split(' ')[0]}</p>
          </div>
        </div>

        <div className="bg-blue-50/60 rounded-xl p-4 text-xs text-slate-700 border border-blue-100 space-y-2">
          <div className="font-bold text-blue-900 flex items-center gap-1.5 text-xs uppercase tracking-wide">
            <FileCheck className="w-4 h-4 text-blue-700" /> Muatan Dokumen Word yang Diunduh:
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-4 list-disc text-slate-600">
            <li>Kop resmi & Identitas Lengkap Satuan Pendidikan</li>
            <li>Matriks Alur Tujuan Pembelajaran (ATP) berurutan</li>
            <li>Elemen, Capaian Pembelajaran, Materi Pokok & JP</li>
            <li>Kolom Tanda Tangan Pengesahan Kepala Sekolah & Guru</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
          <button
            type="button"
            disabled={downloadingAtp}
            onClick={handleDownloadAtp}
            className="w-full sm:flex-1 flex items-center justify-center gap-2.5 px-6 py-4 bg-blue-700 hover:bg-blue-800 text-white rounded-xl text-base font-black transition-all shadow-lg shadow-blue-700/25 disabled:opacity-60 cursor-pointer"
          >
            {downloadingAtp ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Menyiapkan Dokumen Word...</span>
              </>
            ) : (
              <>
                <Download className="w-5 h-5" />
                <span>Download Dokumen ATP (.docx)</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => window.print()}
            className="w-full sm:w-auto px-5 py-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-sm font-bold transition-colors flex items-center justify-center gap-2"
            title="Cetak langsung melalui peramban"
          >
            <Printer className="w-4 h-4" />
            <span>Cetak Dokumen</span>
          </button>
        </div>
      </div>
    </div>
  );
};
