import React, { useState } from 'react';
import { 
  Plus, 
  Trash2, 
  ArrowUp, 
  ArrowDown, 
  Edit3, 
  Check, 
  Download, 
  Printer, 
  RotateCcw,
  Sparkles,
  FileCheck2,
  FileSpreadsheet,
  AlertCircle
} from 'lucide-react';
import { SiapPpknData, AtpItem, ElemenPPKn } from '../types/atp';
import { ELEMEN_PPKN_LIST, ELEMEN_PPKN_CONFIG, MODEL_PEMBELAJARAN_LIST, PROFIL_PELAJAR_PANCASILA_LIST } from '../data/presets';

interface AtpPreviewEditorProps {
  data: SiapPpknData;
  onChange: (updated: Partial<SiapPpknData>) => void;
  onGoToDownload: () => void;
  onBackToForm: () => void;
  onResetAtp: () => void;
}

export const AtpPreviewEditor: React.FC<AtpPreviewEditorProps> = ({
  data,
  onChange,
  onGoToDownload,
  onBackToForm,
  onResetAtp
}) => {
  const [editingItem, setEditingItem] = useState<AtpItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Edit existing item
  const handleOpenEdit = (item: AtpItem) => {
    setEditingItem({ ...item });
    setIsModalOpen(true);
  };

  // Add new TP item
  const handleAddNewItem = () => {
    const nextNumber = data.atpItems.length + 1;
    const defaultElemen = data.elemenTerpilih[0] || 'Pancasila';
    const config = ELEMEN_PPKN_CONFIG.find(c => c.name === defaultElemen);

    const newItem: AtpItem = {
      id: `tp-new-${Date.now()}`,
      elemen: defaultElemen,
      capaianPembelajaran: config ? config.defaultCP : 'Peserta didik memahami dan menerapkan materi pembelajaran pada elemen ini.',
      tujuanPembelajaran: '',
      materiPembelajaran: '',
      profilPelajarPancasila: ['Bernalar Kritis', 'Mandiri'],
      modelPembelajaran: data.modelPembelajaranUtama || 'Problem-Based Learning (PBL)',
      alokasiWaktuJP: 8,
      asesmen: 'Tes Tertulis & Penilaian Kinerja',
      sumberBelajar: 'Buku PPKn Kemendikbudristek'
    };
    setEditingItem(newItem);
    setIsModalOpen(true);
  };

  // Save Modal
  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    const existingIndex = data.atpItems.findIndex(i => i.id === editingItem.id);
    let updatedList: AtpItem[];
    if (existingIndex > -1) {
      updatedList = [...data.atpItems];
      updatedList[existingIndex] = editingItem;
    } else {
      updatedList = [...data.atpItems, editingItem];
    }

    const newTotalJP = updatedList.reduce((acc, curr) => acc + (Number(curr.alokasiWaktuJP) || 0), 0);
    onChange({ 
      atpItems: updatedList,
      totalAlokasiWaktuJP: newTotalJP
    });
    setIsModalOpen(false);
    setEditingItem(null);
  };

  // Delete Item
  const handleDeleteItem = (id: string) => {
    if (data.atpItems.length <= 1) {
      alert('Dokumen ATP minimal memiliki satu Tujuan Pembelajaran (TP).');
      return;
    }
    const updated = data.atpItems.filter(i => i.id !== id);
    const newTotalJP = updated.reduce((acc, curr) => acc + (Number(curr.alokasiWaktuJP) || 0), 0);
    onChange({ 
      atpItems: updated,
      totalAlokasiWaktuJP: newTotalJP
    });
  };

  // Move Up
  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const updated = [...data.atpItems];
    const temp = updated[index];
    updated[index] = updated[index - 1];
    updated[index - 1] = temp;
    onChange({ atpItems: updated });
  };

  // Move Down
  const handleMoveDown = (index: number) => {
    if (index === data.atpItems.length - 1) return;
    const updated = [...data.atpItems];
    const temp = updated[index];
    updated[index] = updated[index + 1];
    updated[index + 1] = temp;
    onChange({ atpItems: updated });
  };

  // Calculate stats
  const totalJP = data.totalAlokasiWaktuJP || data.atpItems.reduce((acc, curr) => acc + (Number(curr.alokasiWaktuJP) || 0), 0);

  return (
    <div className="space-y-6">
      {/* Sticky Action Toolbar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBackToForm}
            className="px-3.5 py-2 text-xs font-bold text-slate-700 hover:text-blue-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
          >
            ← Kembali ke Form
          </button>
          <div className="h-4 w-px bg-slate-300 hidden sm:block" />
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-800">Pratinjau Dokumen ATP</span>
            <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
              {data.atpItems.length} Tujuan Pembelajaran
            </span>
            <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
              Total {totalJP} JP
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleAddNewItem}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-xl text-xs font-bold transition-all shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Tambah TP Baru</span>
          </button>

          <button
            type="button"
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors"
            title="Cetak via Browser"
          >
            <Printer className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Cetak</span>
          </button>

          <button
            type="button"
            onClick={onGoToDownload}
            className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-emerald-600/20"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Unduh Dokumen (.docx)</span>
          </button>
        </div>
      </div>

      {/* DOCUMENT PREVIEW PAPER CANVAS */}
      <div className="bg-white rounded-2xl border border-slate-300/80 shadow-md p-6 sm:p-10 font-sans print:shadow-none print:border-none print:p-0">
        {/* Document Header & Title */}
        <div className="text-center pb-6 border-b-2 border-slate-800 space-y-1">
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-blue-900 uppercase">
            ALUR TUJUAN PEMBELAJARAN (ATP)
          </h2>
          <h3 className="text-base sm:text-lg font-bold text-emerald-800 uppercase">
            MATA PELAJARAN: {data.mataPelajaran || 'PENDIDIKAN PANCASILA DAN KEWARGANEGARAAN (PPKN)'}
          </h3>
          <p className="text-xs sm:text-sm font-semibold text-slate-600">
            KURIKULUM MERDEKA - SATUAN PENDIDIKAN: {data.namaSekolah.toUpperCase() || 'SEKOLAH INDONESIA'}
          </p>
        </div>

        {/* Identity Table */}
        <div className="my-6 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-xs sm:text-sm bg-slate-50/70 p-4 rounded-xl border border-slate-200">
          <div className="space-y-1.5">
            <div className="flex">
              <span className="w-36 font-bold text-slate-700">Satuan Pendidikan</span>
              <span className="w-4 font-bold text-slate-500">:</span>
              <span className="font-semibold text-blue-900">{data.namaSekolah || '-'}</span>
            </div>
            <div className="flex">
              <span className="w-36 font-bold text-slate-700">Mata Pelajaran</span>
              <span className="w-4 font-bold text-slate-500">:</span>
              <span className="text-slate-800">{data.mataPelajaran || '-'}</span>
            </div>
            <div className="flex">
              <span className="w-36 font-bold text-slate-700">Guru Pengampu</span>
              <span className="w-4 font-bold text-slate-500">:</span>
              <span className="font-semibold text-slate-900">{data.namaGuru || '-'} (NIP: {data.nipGuru || '-'})</span>
            </div>
            <div className="flex">
              <span className="w-36 font-bold text-slate-700">Model Pembelajaran</span>
              <span className="w-4 font-bold text-slate-500">:</span>
              <span className="text-slate-800">{data.modelPembelajaranUtama || '-'}</span>
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex">
              <span className="w-36 font-bold text-slate-700">Fase / Kelas</span>
              <span className="w-4 font-bold text-slate-500">:</span>
              <span className="font-semibold text-slate-800">{data.fase} / {data.kelas}</span>
            </div>
            <div className="flex">
              <span className="w-36 font-bold text-slate-700">Tahun Akademik</span>
              <span className="w-4 font-bold text-slate-500">:</span>
              <span className="text-slate-800">{data.tahunAkademik}</span>
            </div>
            <div className="flex">
              <span className="w-36 font-bold text-slate-700">Semester</span>
              <span className="w-4 font-bold text-slate-500">:</span>
              <span className="text-slate-800">{data.semester}</span>
            </div>
            <div className="flex">
              <span className="w-36 font-bold text-slate-700">Alokasi Waktu Total</span>
              <span className="w-4 font-bold text-slate-500">:</span>
              <span className="font-bold text-emerald-700">{totalJP} Jam Pelajaran (JP)</span>
            </div>
          </div>
        </div>

        {/* Section Heading */}
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-extrabold text-blue-900 uppercase tracking-wide flex items-center gap-1.5">
            <FileSpreadsheet className="w-4 h-4 text-blue-700" />
            Matriks Alur Tujuan Pembelajaran (ATP)
          </h4>
          <span className="text-xs text-slate-500 italic hidden sm:inline">
            Klik tombol Edit pada baris untuk mengubah rincian
          </span>
        </div>

        {/* ATP TABLE (RESPONSIVE SCROLL) */}
        <div className="overflow-x-auto border border-slate-300 rounded-xl shadow-xs">
          <table className="w-full border-collapse text-left text-xs sm:text-xs">
            <thead>
              <tr className="bg-blue-900 text-white font-bold">
                <th className="p-3 w-12 text-center border-r border-blue-800">No.</th>
                <th className="p-3 w-36 border-r border-blue-800">Elemen PPKn</th>
                <th className="p-3 min-w-[180px] border-r border-blue-800">Capaian Pembelajaran (CP)</th>
                <th className="p-3 min-w-[200px] border-r border-blue-800">Tujuan Pembelajaran (TP)</th>
                <th className="p-3 min-w-[170px] border-r border-blue-800">Materi Pokok</th>
                <th className="p-3 min-w-[140px] border-r border-blue-800">Profil Pelajar Pancasila</th>
                <th className="p-3 w-16 text-center border-r border-blue-800">Alokasi</th>
                <th className="p-3 min-w-[130px] border-r border-blue-800">Asesmen</th>
                <th className="p-3 w-28 text-center print:hidden">Aksi Edit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {data.atpItems.map((item, idx) => {
                const elConfig = ELEMEN_PPKN_CONFIG.find(c => c.name === item.elemen || c.shortName === item.elemen);
                const badgeStyle = elConfig ? elConfig.badgeStyle : 'bg-blue-100 text-blue-900 border-blue-200';
                const elDisplayName = elConfig ? elConfig.shortName : item.elemen;

                return (
                  <tr 
                    key={item.id} 
                    className={`hover:bg-blue-50/50 transition-colors ${idx % 2 === 1 ? 'bg-slate-50/60' : 'bg-white'}`}
                  >
                    {/* No. Urutan */}
                    <td className="p-3 text-center font-bold text-blue-900 border-r border-slate-200 align-top">
                      {idx + 1}
                    </td>

                    {/* Elemen */}
                    <td className="p-3 font-bold border-r border-slate-200 align-top">
                      <span className={`inline-block px-2.5 py-1 rounded-md text-xs font-bold border ${badgeStyle}`}>
                        {elDisplayName}
                      </span>
                    </td>

                  {/* Capaian Pembelajaran */}
                  <td className="p-3 text-slate-700 leading-relaxed border-r border-slate-200 align-top">
                    {item.capaianPembelajaran}
                  </td>

                  {/* Tujuan Pembelajaran */}
                  <td className="p-3 font-semibold text-slate-900 leading-relaxed border-r border-slate-200 align-top">
                    {item.tujuanPembelajaran}
                  </td>

                  {/* Materi Pembelajaran */}
                  <td className="p-3 text-slate-800 border-r border-slate-200 align-top">
                    <p className="font-medium text-emerald-950">{item.materiPembelajaran}</p>
                    <span className="text-[10px] text-slate-500 mt-1 block">Model: {item.modelPembelajaran}</span>
                  </td>

                  {/* Profil Pelajar Pancasila */}
                  <td className="p-3 text-slate-600 border-r border-slate-200 align-top italic">
                    {item.profilPelajarPancasila.join(', ')}
                  </td>

                  {/* Alokasi JP */}
                  <td className="p-3 text-center font-extrabold text-emerald-700 border-r border-slate-200 align-top whitespace-nowrap">
                    {item.alokasiWaktuJP} JP
                  </td>

                  {/* Asesmen */}
                  <td className="p-3 text-slate-600 border-r border-slate-200 align-top text-[11px]">
                    {item.asesmen}
                  </td>

                  {/* Aksi Edit */}
                  <td className="p-2 text-center align-top print:hidden">
                    <div className="flex items-center justify-center gap-1">
                      <button
                        type="button"
                        onClick={() => handleOpenEdit(item)}
                        className="p-1.5 text-blue-700 hover:bg-blue-100 rounded-lg transition-colors"
                        title="Edit Baris TP Ini"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>

                      <button
                        type="button"
                        disabled={idx === 0}
                        onClick={() => handleMoveUp(idx)}
                        className={`p-1.5 rounded-lg transition-colors ${
                          idx === 0 ? 'text-slate-300' : 'text-slate-600 hover:bg-slate-100'
                        }`}
                        title="Pindah Ke Atas"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>

                      <button
                        type="button"
                        disabled={idx === data.atpItems.length - 1}
                        onClick={() => handleMoveDown(idx)}
                        className={`p-1.5 rounded-lg transition-colors ${
                          idx === data.atpItems.length - 1 ? 'text-slate-300' : 'text-slate-600 hover:bg-slate-100'
                        }`}
                        title="Pindah Ke Bawah"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDeleteItem(item.id)}
                        className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                        title="Hapus Baris Ini"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
            </tbody>
            {/* Total Row */}
            <tfoot>
              <tr className="bg-slate-100 font-bold border-t-2 border-slate-300">
                <td colSpan={6} className="p-3 text-right text-slate-800 uppercase tracking-wide">
                  Total Alokasi Waktu (Jam Pelajaran):
                </td>
                <td className="p-3 text-center text-sm font-black text-white bg-emerald-600">
                  {totalJP} JP
                </td>
                <td colSpan={2} className="p-3 text-slate-500 text-xs">
                  {data.atpItems.length} Alur Tujuan Pembelajaran
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Tanda Tangan & Pengesahan Block */}
        <div className="mt-12 pt-6 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-8 text-xs sm:text-sm">
          {/* Mengetahui Kepala Sekolah */}
          <div className="text-left space-y-1">
            <p className="text-slate-600">Mengetahui,</p>
            <p className="font-bold text-slate-800">Kepala {data.namaSekolah || 'Sekolah'}</p>
            <div className="h-16" />
            <p className="font-bold text-slate-900 underline underline-offset-4">
              {data.namaKepalaSekolah || 'Nama Kepala Sekolah, M.Pd.'}
            </p>
            <p className="text-slate-600">NIP. {data.nipKepalaSekolah || '-'}</p>
          </div>

          {/* Guru Mata Pelajaran */}
          <div className="text-left sm:text-right space-y-1">
            <p className="text-slate-600">
              {data.titimangsaKota || 'Kota'}, {data.titimangsaTanggal || '15 Juli 2024'}
            </p>
            <p className="font-bold text-slate-800">Guru Mata Pelajaran PPKn,</p>
            <div className="h-16" />
            <p className="font-bold text-slate-900 underline underline-offset-4">
              {data.namaGuru || 'Nama Guru Mata Pelajaran'}
            </p>
            <p className="text-slate-600">NIP. {data.nipGuru || '-'}</p>
          </div>
        </div>
      </div>

      {/* MODAL EDIT / TAMBAH TUJUAN PEMBELAJARAN (TP) */}
      {isModalOpen && editingItem && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="bg-blue-900 px-6 py-4 text-white flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base">Edit Rincian Alur Tujuan Pembelajaran</h3>
                <p className="text-xs text-blue-200">Sesuaikan kode TP, elemen, rumusan kompetensi, dan alokasi JP</p>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-white/70 hover:text-white p-1 rounded-lg"
              >
                ✕
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSaveModal} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto text-xs sm:text-sm">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Elemen Kurikulum Merdeka PPKn (Ketik Sendiri) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={editingItem.elemen}
                  onChange={(e) => setEditingItem({ ...editingItem, elemen: e.target.value })}
                  placeholder="Ketik elemen sendiri (contoh: Pancasila / UUD NRI 1945 / dll.)"
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-xl font-bold text-blue-950 focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
                />
                <div className="flex flex-wrap items-center gap-1.5 mt-2">
                  <span className="text-[11px] text-slate-500 mr-1">Rekomendasi Cepat:</span>
                  {ELEMEN_PPKN_CONFIG.map((el) => (
                    <button
                      key={el.id}
                      type="button"
                      onClick={() => {
                        const shouldUpdateCP = !editingItem.capaianPembelajaran || ELEMEN_PPKN_CONFIG.some(c => c.defaultCP === editingItem.capaianPembelajaran);
                        setEditingItem({
                          ...editingItem,
                          elemen: el.name,
                          ...(shouldUpdateCP ? { capaianPembelajaran: el.defaultCP } : {})
                        });
                      }}
                      className="px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-100 hover:bg-blue-100 text-slate-700 hover:text-blue-900 border border-slate-200 transition-colors"
                    >
                      {el.shortName}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Capaian Pembelajaran (CP) Elemen
                </label>
                <textarea
                  rows={2}
                  required
                  value={editingItem.capaianPembelajaran}
                  onChange={(e) => setEditingItem({ ...editingItem, capaianPembelajaran: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Tujuan Pembelajaran (TP)
                </label>
                <textarea
                  rows={2}
                  required
                  value={editingItem.tujuanPembelajaran}
                  onChange={(e) => setEditingItem({ ...editingItem, tujuanPembelajaran: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-hidden font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Materi Pokok / Lingkup Materi
                </label>
                <input
                  type="text"
                  required
                  value={editingItem.materiPembelajaran}
                  onChange={(e) => setEditingItem({ ...editingItem, materiPembelajaran: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Alokasi Waktu (JP)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="36"
                    required
                    value={editingItem.alokasiWaktuJP}
                    onChange={(e) => setEditingItem({ ...editingItem, alokasiWaktuJP: Number(e.target.value) || 2 })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-hidden font-bold text-emerald-700"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Model Pembelajaran
                  </label>
                  <select
                    value={editingItem.modelPembelajaran}
                    onChange={(e) => setEditingItem({ ...editingItem, modelPembelajaran: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
                  >
                    {MODEL_PEMBELAJARAN_LIST.map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Bentuk Asesmen & Evaluasi
                </label>
                <input
                  type="text"
                  value={editingItem.asesmen}
                  onChange={(e) => setEditingItem({ ...editingItem, asesmen: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
                  placeholder="Tes Tertulis, Presentasi Proyek, Observasi Sikap..."
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Sumber / Media Belajar
                </label>
                <input
                  type="text"
                  value={editingItem.sumberBelajar}
                  onChange={(e) => setEditingItem({ ...editingItem, sumberBelajar: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
                  placeholder="Buku Siswa Kemdikbud, Portal Berita, UUD NRI 1945..."
                />
              </div>

              {/* Modal Actions */}
              <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-emerald-600/20"
                >
                  <Check className="w-4 h-4" />
                  <span>Simpan Perubahan TP</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
