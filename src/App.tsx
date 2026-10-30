/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar, MainTabType } from './components/Navbar';
import { SubjectDataForm } from './components/SubjectDataForm';
import { AtpPreviewEditor } from './components/AtpPreviewEditor';
import { DownloadMenu } from './components/DownloadMenu';
import { SiapPpknData, AtpItem } from './types/atp';
import { PRESET_FASE_E, PRESET_FASE_D, PRESET_FASE_F, createEmptyFormState } from './data/presets';

const STORAGE_KEY = 'SIAP_PPKN_DATA_STORAGE_V3';

export default function App() {
  // 2 Main Menu Tabs: 'pelajaran' (Data Mata Pelajaran) | 'download' (Download)
  const [activeTab, setActiveTab] = useState<MainTabType>('pelajaran');
  // Subview for 'pelajaran' tab: 'form' (Form Input) | 'preview' (Pratinjau Dokumen ATP)
  const [subView, setSubView] = useState<'form' | 'preview'>('form');

  // Application Data with localStorage persistence
  const [data, setData] = useState<SiapPpknData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.namaSekolah && Array.isArray(parsed.atpItems)) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Could not read from localStorage, using default preset.', e);
    }
    return PRESET_FASE_E;
  });

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.warn('Could not save to localStorage', e);
    }
  }, [data]);

  // Update Data Handler
  const handleUpdateData = (updatedFields: Partial<SiapPpknData>) => {
    setData((prev) => ({
      ...prev,
      ...updatedFields,
    }));
  };

  // Clear entire form
  const handleClearForm = () => {
    if (window.confirm('Kosongkan semua isian formulir untuk mulai mengisi data sendiri dari awal?')) {
      setData(createEmptyFormState(data.fase));
      setActiveTab('pelajaran');
      setSubView('form');
    }
  };

  // Auto-generate ATP matching current selected elements & JP
  const handleAutoGenerateAtp = () => {
    const selectedElements = data.elemenTerpilih.length > 0 
      ? data.elemenTerpilih 
      : ['Pancasila', 'Undang-Undang Dasar Negara Republik Indonesia Tahun 1945', 'Bhinneka Tunggal Ika', 'Negara Kesatuan Republik Indonesia'];

    const targetFase = data.fase;
    let basePreset = PRESET_FASE_E;
    if (targetFase.includes('Fase D')) basePreset = PRESET_FASE_D;
    else if (targetFase.includes('Fase F')) basePreset = PRESET_FASE_F;

    const matchedItems: AtpItem[] = [];
    selectedElements.forEach((elemenName, elemIdx) => {
      const foundInPreset = basePreset.atpItems.filter(i => i.elemen === elemenName);
      if (foundInPreset.length > 0) {
        foundInPreset.forEach((item, itemIdx) => {
          matchedItems.push({
            ...item,
            id: `tp-auto-${Date.now()}-${elemIdx}-${itemIdx}`,
            modelPembelajaran: data.modelPembelajaranUtama || item.modelPembelajaran
          });
        });
      } else {
        matchedItems.push({
          id: `tp-auto-${Date.now()}-${elemIdx}`,
          elemen: elemenName,
          capaianPembelajaran: `Peserta didik mampu memahami, menganalisis, dan menginternalisasi kompetensi pada elemen ${elemenName}.`,
          tujuanPembelajaran: `Peserta didik mampu mengimplementasikan prinsip ${elemenName} dalam kehidupan berbangsa dan bermasyarakat.`,
          materiPembelajaran: `Pokok Materi ${elemenName}`,
          profilPelajarPancasila: ['Bernalar Kritis', 'Mandiri'],
          modelPembelajaran: data.modelPembelajaranUtama || 'Problem-Based Learning (PBL)',
          alokasiWaktuJP: 8,
          asesmen: 'Tes Formatif & Penilaian Kinerja',
          sumberBelajar: 'Buku Siswa PPKn Kemendikbudristek'
        });
      }
    });

    const newTotalJP = matchedItems.reduce((acc, curr) => acc + (Number(curr.alokasiWaktuJP) || 0), 0);
    setData((prev) => ({
      ...prev,
      atpItems: matchedItems,
      totalAlokasiWaktuJP: prev.totalAlokasiWaktuJP || newTotalJP
    }));
    setSubView('preview');
  };

  return (
    <div className="min-h-screen bg-[#f3f7fa] flex flex-col font-sans selection:bg-[#ff5512] selection:text-white">
      {/* Top Navbar with SIAP PPKn Branding & 2 Main Menus */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setSubView('form');
        }}
        onClear={handleClearForm}
      />

      {/* Main Content Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* MENU 1: Data Mata Pelajaran */}
        {activeTab === 'pelajaran' && (
          <div>
            {subView === 'form' ? (
              <SubjectDataForm
                data={data}
                onChange={handleUpdateData}
                onNext={() => setActiveTab('download')}
                onViewPreview={() => setSubView('preview')}
              />
            ) : (
              <AtpPreviewEditor
                data={data}
                onChange={handleUpdateData}
                onGoToDownload={() => setActiveTab('download')}
                onBackToForm={() => setSubView('form')}
                onResetAtp={handleAutoGenerateAtp}
              />
            )}
          </div>
        )}

        {/* MENU 2: Download */}
        {activeTab === 'download' && (
          <DownloadMenu
            data={data}
            onGoBackToData={() => {
              setActiveTab('pelajaran');
              setSubView('form');
            }}
            onImportData={(imported) => {
              setData(imported);
              setActiveTab('pelajaran');
              setSubView('preview');
            }}
          />
        )}
      </main>

      {/* Clean Footer */}
      <footer className="bg-white border-t border-slate-200/80 py-5 text-slate-500 text-xs print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <p className="font-bold text-[#0c3149]">
            SIAP PPKn — Sistem Integrasi Administrasi Pembelajaran PPKn
          </p>
          <p className="text-slate-400">
            Penyusun Alur Tujuan Pembelajaran (ATP) Kurikulum Merdeka • Format Word (.docx)
          </p>
        </div>
      </footer>
    </div>
  );
}
