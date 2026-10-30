import React from 'react';
import { 
  FileText, 
  Download, 
  ChevronLeft,
  FileSpreadsheet
} from 'lucide-react';

export type MainTabType = 'pelajaran' | 'download';

interface NavbarProps {
  activeTab: MainTabType;
  setActiveTab: (tab: MainTabType) => void;
  onClear: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onClear
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 py-3 md:py-0 md:h-20">
          
          {/* Left Side: < Clear Button + Logo + Title "SIAP PPKn" */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
            <div className="flex items-center gap-3">
              {/* < Clear Button */}
              <button
                type="button"
                onClick={onClear}
                className="flex items-center gap-1 px-3 py-1.5 rounded-xl border border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-bold shadow-2xs transition-all cursor-pointer"
                title="Bersihkan Formulir"
              >
                <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
                <span>Clear</span>
              </button>

              {/* Colorful SIAP Logo Icon */}
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-cyan-50 border border-cyan-300 flex items-center justify-center shadow-xs shrink-0">
                <FileSpreadsheet className="w-6 h-6 text-teal-600 stroke-[2.2]" />
              </div>

              {/* SIAP PPKn Title & Subtitle */}
              <div>
                <h1 className="text-xl sm:text-2xl font-black tracking-tight text-[#0c3149] leading-tight">
                  SIAP PPKn
                </h1>
                <p className="text-[11px] sm:text-xs text-slate-500 font-semibold tracking-tight">
                  Sistem Integrasi Administrasi Pembelajaran PPKn
                </p>
              </div>
            </div>
          </div>

          {/* Right Side: The 2 Main Menu Tabs (Data Mata Pelajaran & Download) */}
          <div className="flex items-center gap-2 sm:gap-3 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
            {/* Menu 1: Data Mata Pelajaran */}
            <button
              type="button"
              onClick={() => setActiveTab('pelajaran')}
              className={`flex items-center gap-2 px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-extrabold whitespace-nowrap transition-all cursor-pointer ${
                activeTab === 'pelajaran'
                  ? 'bg-[#037272] text-white shadow-md shadow-teal-900/20 ring-2 ring-teal-700/20'
                  : 'bg-white border border-[#037272] text-[#037272] hover:bg-teal-50/70'
              }`}
            >
              <FileText className="w-4 h-4 stroke-[2.2]" />
              <span>Data Mata Pelajaran</span>
            </button>

            {/* Menu 2: Download */}
            <button
              type="button"
              onClick={() => setActiveTab('download')}
              className={`flex items-center gap-2 px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-extrabold whitespace-nowrap transition-all cursor-pointer ${
                activeTab === 'download'
                  ? 'bg-[#ff5512] text-white shadow-md shadow-orange-500/25 ring-2 ring-orange-500/20'
                  : 'bg-white border border-[#ff5512] text-[#ff5512] hover:bg-orange-50/70'
              }`}
            >
              <Download className="w-4 h-4 stroke-[2.2]" />
              <span>Download</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
