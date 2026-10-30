import {
  Document,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  WidthType,
  AlignmentType,
  BorderStyle,
  HeadingLevel,
  Packer,
  Header,
  Footer,
  PageBreak
} from 'docx';
import { SiapPpknData } from '../types/atp';

// Helper to save Blob to user's computer
export function saveBlobToFile(blob: Blob, filename: string) {
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
}

// Common table borders
const standardBorder = {
  style: BorderStyle.SINGLE,
  size: 1,
  color: '94A3B8', // slate-400
};

const tableBorders = {
  top: standardBorder,
  bottom: standardBorder,
  left: standardBorder,
  right: standardBorder,
  insideHorizontal: standardBorder,
  insideVertical: standardBorder,
};

const headerBgColor = '1E3A8A'; // Deep Navy Blue
const zebraBgColor = 'F8FAFC';   // Slate-50

// Create ATP Table Row
function createAtpTableRow(
  no: string,
  elemen: string,
  cp: string,
  tp: string,
  materi: string,
  ppp: string,
  model: string,
  jp: string,
  asesmen: string,
  isEven: boolean
): TableRow {
  const bg = isEven ? zebraBgColor : 'FFFFFF';
  
  return new TableRow({
    children: [
      new TableCell({
        width: { size: 5, type: WidthType.PERCENTAGE },
        shading: { fill: bg },
        margins: { top: 120, bottom: 120, left: 100, right: 100 },
        children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: no, size: 18 })] })],
      }),
      new TableCell({
        width: { size: 12, type: WidthType.PERCENTAGE },
        shading: { fill: bg },
        margins: { top: 120, bottom: 120, left: 100, right: 100 },
        children: [new Paragraph({ children: [new TextRun({ text: elemen, bold: true, size: 18, color: '1E3A8A' })] })],
      }),
      new TableCell({
        width: { size: 18, type: WidthType.PERCENTAGE },
        shading: { fill: bg },
        margins: { top: 120, bottom: 120, left: 100, right: 100 },
        children: [new Paragraph({ children: [new TextRun({ text: cp, size: 17 })] })],
      }),
      new TableCell({
        width: { size: 20, type: WidthType.PERCENTAGE },
        shading: { fill: bg },
        margins: { top: 120, bottom: 120, left: 100, right: 100 },
        children: [new Paragraph({ children: [new TextRun({ text: tp, bold: true, size: 17, color: '0F172A' })] })],
      }),
      new TableCell({
        width: { size: 16, type: WidthType.PERCENTAGE },
        shading: { fill: bg },
        margins: { top: 120, bottom: 120, left: 100, right: 100 },
        children: [new Paragraph({ children: [new TextRun({ text: materi, size: 17 })] })],
      }),
      new TableCell({
        width: { size: 12, type: WidthType.PERCENTAGE },
        shading: { fill: bg },
        margins: { top: 120, bottom: 120, left: 100, right: 100 },
        children: [new Paragraph({ children: [new TextRun({ text: ppp, size: 16, italics: true })] })],
      }),
      new TableCell({
        width: { size: 7, type: WidthType.PERCENTAGE },
        shading: { fill: bg },
        margins: { top: 120, bottom: 120, left: 100, right: 100 },
        children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: jp, bold: true, size: 18, color: '059669' })] })],
      }),
      new TableCell({
        width: { size: 10, type: WidthType.PERCENTAGE },
        shading: { fill: bg },
        margins: { top: 120, bottom: 120, left: 100, right: 100 },
        children: [new Paragraph({ children: [new TextRun({ text: asesmen, size: 16 })] })],
      }),
    ],
  });
}

// Generate ATP Document (.docx)
export async function generateAtpDocx(data: SiapPpknData): Promise<Blob> {
  const atpTableRows: TableRow[] = [
    // Header Row
    new TableRow({
      tableHeader: true,
      children: [
        new TableCell({
          width: { size: 5, type: WidthType.PERCENTAGE },
          shading: { fill: headerBgColor },
          margins: { top: 140, bottom: 140, left: 100, right: 100 },
          children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'No', bold: true, color: 'FFFFFF', size: 18 })] })],
        }),
        new TableCell({
          width: { size: 12, type: WidthType.PERCENTAGE },
          shading: { fill: headerBgColor },
          margins: { top: 140, bottom: 140, left: 100, right: 100 },
          children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Elemen', bold: true, color: 'FFFFFF', size: 18 })] })],
        }),
        new TableCell({
          width: { size: 18, type: WidthType.PERCENTAGE },
          shading: { fill: headerBgColor },
          margins: { top: 140, bottom: 140, left: 100, right: 100 },
          children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Capaian Pembelajaran (CP)', bold: true, color: 'FFFFFF', size: 18 })] })],
        }),
        new TableCell({
          width: { size: 20, type: WidthType.PERCENTAGE },
          shading: { fill: headerBgColor },
          margins: { top: 140, bottom: 140, left: 100, right: 100 },
          children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Tujuan Pembelajaran (TP)', bold: true, color: 'FFFFFF', size: 18 })] })],
        }),
        new TableCell({
          width: { size: 16, type: WidthType.PERCENTAGE },
          shading: { fill: headerBgColor },
          margins: { top: 140, bottom: 140, left: 100, right: 100 },
          children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Materi Pokok / Lingkup Materi', bold: true, color: 'FFFFFF', size: 18 })] })],
        }),
        new TableCell({
          width: { size: 12, type: WidthType.PERCENTAGE },
          shading: { fill: headerBgColor },
          margins: { top: 140, bottom: 140, left: 100, right: 100 },
          children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Profil Pelajar Pancasila', bold: true, color: 'FFFFFF', size: 18 })] })],
        }),
        new TableCell({
          width: { size: 7, type: WidthType.PERCENTAGE },
          shading: { fill: headerBgColor },
          margins: { top: 140, bottom: 140, left: 100, right: 100 },
          children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Alokasi (JP)', bold: true, color: 'FFFFFF', size: 18 })] })],
        }),
        new TableCell({
          width: { size: 10, type: WidthType.PERCENTAGE },
          shading: { fill: headerBgColor },
          margins: { top: 140, bottom: 140, left: 100, right: 100 },
          children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Asesmen', bold: true, color: 'FFFFFF', size: 18 })] })],
        }),
      ],
    }),
  ];

  // Data rows
  data.atpItems.forEach((item, index) => {
    const pppText = Array.isArray(item.profilPelajarPancasila) && item.profilPelajarPancasila.length > 0 
      ? item.profilPelajarPancasila.join(', ') 
      : 'Mandiri, Bernalar Kritis';

    atpTableRows.push(
      createAtpTableRow(
        `${index + 1}`,
        item.elemen || 'Pancasila',
        item.capaianPembelajaran || 'Memahami dan menganalisis materi.',
        item.tujuanPembelajaran || '-',
        item.materiPembelajaran || '-',
        pppText,
        item.modelPembelajaran || 'Problem-Based Learning (PBL)',
        `${item.alokasiWaktuJP || 0} JP`,
        item.asesmen || 'Tes Formatif & Kinerja',
        index % 2 === 1
      )
    );
  });

  // Calculate sum of JP
  const totalJP = data.totalAlokasiWaktuJP || data.atpItems.reduce((acc, curr) => acc + (Number(curr.alokasiWaktuJP) || 0), 0);

  // Total summary row
  atpTableRows.push(
    new TableRow({
      children: [
        new TableCell({
          columnSpan: 6,
          shading: { fill: 'E2E8F0' },
          margins: { top: 120, bottom: 120, left: 100, right: 100 },
          children: [
            new Paragraph({
              alignment: AlignmentType.RIGHT,
              children: [new TextRun({ text: 'TOTAL ALOKASI WAKTU (JAM PELAJARAN):', bold: true, size: 18, color: '1E293B' })],
            }),
          ],
        }),
        new TableCell({
          shading: { fill: '059669' },
          margins: { top: 120, bottom: 120, left: 100, right: 100 },
          children: [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [new TextRun({ text: `${totalJP} JP`, bold: true, color: 'FFFFFF', size: 18 })],
            }),
          ],
        }),
        new TableCell({
          shading: { fill: 'E2E8F0' },
          margins: { top: 120, bottom: 120, left: 100, right: 100 },
          children: [new Paragraph({ children: [new TextRun({ text: '', size: 16 })] })],
        }),
      ],
    })
  );

  // Identity Table
  const identityTable = new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: {
      top: { style: BorderStyle.NONE },
      bottom: { style: BorderStyle.NONE },
      left: { style: BorderStyle.NONE },
      right: { style: BorderStyle.NONE },
      insideHorizontal: { style: BorderStyle.NONE },
      insideVertical: { style: BorderStyle.NONE },
    },
    rows: [
      new TableRow({
        children: [
          new TableCell({ width: { size: 22, type: WidthType.PERCENTAGE }, children: [new Paragraph({ children: [new TextRun({ text: 'Satuan Pendidikan', bold: true, size: 20 })] })] }),
          new TableCell({ width: { size: 3, type: WidthType.PERCENTAGE }, children: [new Paragraph({ children: [new TextRun({ text: ':', size: 20 })] })] }),
          new TableCell({ width: { size: 40, type: WidthType.PERCENTAGE }, children: [new Paragraph({ children: [new TextRun({ text: data.namaSekolah, bold: true, size: 20, color: '1E3A8A' })] })] }),
          new TableCell({ width: { size: 17, type: WidthType.PERCENTAGE }, children: [new Paragraph({ children: [new TextRun({ text: 'Fase / Kelas', bold: true, size: 20 })] })] }),
          new TableCell({ width: { size: 3, type: WidthType.PERCENTAGE }, children: [new Paragraph({ children: [new TextRun({ text: ':', size: 20 })] })] }),
          new TableCell({ width: { size: 15, type: WidthType.PERCENTAGE }, children: [new Paragraph({ children: [new TextRun({ text: `${data.fase} / ${data.kelas}`, size: 20 })] })] }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({ width: { size: 22, type: WidthType.PERCENTAGE }, children: [new Paragraph({ children: [new TextRun({ text: 'Mata Pelajaran', bold: true, size: 20 })] })] }),
          new TableCell({ width: { size: 3, type: WidthType.PERCENTAGE }, children: [new Paragraph({ children: [new TextRun({ text: ':', size: 20 })] })] }),
          new TableCell({ width: { size: 40, type: WidthType.PERCENTAGE }, children: [new Paragraph({ children: [new TextRun({ text: data.mataPelajaran, size: 20 })] })] }),
          new TableCell({ width: { size: 17, type: WidthType.PERCENTAGE }, children: [new Paragraph({ children: [new TextRun({ text: 'Tahun Ajaran', bold: true, size: 20 })] })] }),
          new TableCell({ width: { size: 3, type: WidthType.PERCENTAGE }, children: [new Paragraph({ children: [new TextRun({ text: ':', size: 20 })] })] }),
          new TableCell({ width: { size: 15, type: WidthType.PERCENTAGE }, children: [new Paragraph({ children: [new TextRun({ text: data.tahunAkademik, size: 20 })] })] }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({ width: { size: 22, type: WidthType.PERCENTAGE }, children: [new Paragraph({ children: [new TextRun({ text: 'Guru Pengampu', bold: true, size: 20 })] })] }),
          new TableCell({ width: { size: 3, type: WidthType.PERCENTAGE }, children: [new Paragraph({ children: [new TextRun({ text: ':', size: 20 })] })] }),
          new TableCell({ width: { size: 40, type: WidthType.PERCENTAGE }, children: [new Paragraph({ children: [new TextRun({ text: data.namaGuru, size: 20 })] })] }),
          new TableCell({ width: { size: 17, type: WidthType.PERCENTAGE }, children: [new Paragraph({ children: [new TextRun({ text: 'Semester', bold: true, size: 20 })] })] }),
          new TableCell({ width: { size: 3, type: WidthType.PERCENTAGE }, children: [new Paragraph({ children: [new TextRun({ text: ':', size: 20 })] })] }),
          new TableCell({ width: { size: 15, type: WidthType.PERCENTAGE }, children: [new Paragraph({ children: [new TextRun({ text: data.semester, size: 20 })] })] }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({ width: { size: 22, type: WidthType.PERCENTAGE }, children: [new Paragraph({ children: [new TextRun({ text: 'Model Pembelajaran', bold: true, size: 20 })] })] }),
          new TableCell({ width: { size: 3, type: WidthType.PERCENTAGE }, children: [new Paragraph({ children: [new TextRun({ text: ':', size: 20 })] })] }),
          new TableCell({ width: { size: 40, type: WidthType.PERCENTAGE }, children: [new Paragraph({ children: [new TextRun({ text: data.modelPembelajaranUtama, size: 20 })] })] }),
          new TableCell({ width: { size: 17, type: WidthType.PERCENTAGE }, children: [new Paragraph({ children: [new TextRun({ text: 'Alokasi Total', bold: true, size: 20 })] })] }),
          new TableCell({ width: { size: 3, type: WidthType.PERCENTAGE }, children: [new Paragraph({ children: [new TextRun({ text: ':', size: 20 })] })] }),
          new TableCell({ width: { size: 15, type: WidthType.PERCENTAGE }, children: [new Paragraph({ children: [new TextRun({ text: `${totalJP} Jam Pelajaran (JP)`, bold: true, color: '059669', size: 20 })] })] }),
        ],
      }),
    ],
  });

  // Signature Block
  const signatureTable = new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: {
      top: { style: BorderStyle.NONE },
      bottom: { style: BorderStyle.NONE },
      left: { style: BorderStyle.NONE },
      right: { style: BorderStyle.NONE },
      insideHorizontal: { style: BorderStyle.NONE },
      insideVertical: { style: BorderStyle.NONE },
    },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            width: { size: 50, type: WidthType.PERCENTAGE },
            children: [
              new Paragraph({ text: '' }),
              new Paragraph({ children: [new TextRun({ text: 'Mengetahui,', size: 20 })] }),
              new Paragraph({ children: [new TextRun({ text: 'Kepala ' + data.namaSekolah, bold: true, size: 20 })] }),
              new Paragraph({ text: '' }),
              new Paragraph({ text: '' }),
              new Paragraph({ text: '' }),
              new Paragraph({ children: [new TextRun({ text: data.namaKepalaSekolah, bold: true, underline: {}, size: 20 })] }),
              new Paragraph({ children: [new TextRun({ text: 'NIP. ' + (data.nipKepalaSekolah || '-'), size: 18 })] }),
            ],
          }),
          new TableCell({
            width: { size: 50, type: WidthType.PERCENTAGE },
            children: [
              new Paragraph({ children: [new TextRun({ text: `${data.titimangsaKota || 'Kota'}, ${data.titimangsaTanggal || '15 Juli 2024'}`, size: 20 })] }),
              new Paragraph({ children: [new TextRun({ text: 'Guru Mata Pelajaran,', size: 20 })] }),
              new Paragraph({ children: [new TextRun({ text: data.mataPelajaran, bold: true, size: 20 })] }),
              new Paragraph({ text: '' }),
              new Paragraph({ text: '' }),
              new Paragraph({ text: '' }),
              new Paragraph({ children: [new TextRun({ text: data.namaGuru, bold: true, underline: {}, size: 20 })] }),
              new Paragraph({ children: [new TextRun({ text: 'NIP. ' + (data.nipGuru || '-'), size: 18 })] }),
            ],
          }),
        ],
      }),
    ],
  });

  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 720,
              bottom: 720,
              left: 720,
              right: 720,
            },
          },
        },
        headers: {
          default: new Header({
            children: [
              new Paragraph({
                alignment: AlignmentType.RIGHT,
                children: [
                  new TextRun({
                    text: 'SIAP PPKn | Kurikulum Merdeka - ' + data.namaSekolah,
                    size: 16,
                    color: '64748B',
                  }),
                ],
              }),
            ],
          }),
        },
        footers: {
          default: new Footer({
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: 'Dokumen Alur Tujuan Pembelajaran (ATP) - Pendidikan Pancasila dan Kewarganegaraan',
                    size: 16,
                    color: '94A3B8',
                  }),
                ],
              }),
            ],
          }),
        },
        children: [
          // Header / Title
          new Paragraph({
            alignment: AlignmentType.CENTER,
            heading: HeadingLevel.HEADING_1,
            spacing: { after: 100 },
            children: [
              new TextRun({
                text: 'ALUR TUJUAN PEMBELAJARAN (ATP)',
                bold: true,
                size: 28,
                color: '1E3A8A',
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 300 },
            children: [
              new TextRun({
                text: 'MATA PELAJARAN: ' + data.mataPelajaran.toUpperCase(),
                bold: true,
                size: 22,
                color: '059669',
              }),
            ],
          }),

          // Identity Table
          identityTable,

          new Paragraph({ spacing: { before: 200, after: 150 }, children: [new TextRun({ text: 'A. MATRIKS ALUR TUJUAN PEMBELAJARAN', bold: true, size: 22, color: '1E3A8A' })] }),

          // ATP Table
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            borders: tableBorders,
            rows: atpTableRows,
          }),

          new Paragraph({ spacing: { before: 250, after: 100 }, children: [new TextRun({ text: 'B. RASIONAL & ELEMEN PEMBELAJARAN PPKn', bold: true, size: 22, color: '1E3A8A' })] }),
          new Paragraph({
            children: [
              new TextRun({
                text: 'Pendidikan Pancasila dan Kewarganegaraan (PPKn) berorientasi pada pembentukan peserta didik menjadi warga negara yang berkarakter Pancasila, demokratis, berintegritas, dan menjunjung tinggi hukum, kebhinekaan serta keutuhan Negara Kesatuan Republik Indonesia (NKRI).',
                size: 18,
              }),
            ],
          }),
          new Paragraph({
            spacing: { before: 100, after: 300 },
            children: [
              new TextRun({
                text: 'Elemen yang dikembangkan: Pancasila, Undang-Undang Dasar Negara Republik Indonesia Tahun 1945, Bhinneka Tunggal Ika, dan Negara Kesatuan Republik Indonesia.',
                bold: true,
                size: 18,
                color: '059669',
              }),
            ],
          }),

          // Signatures
          new Paragraph({ spacing: { before: 200 } }),
          signatureTable,
        ],
      },
    ],
  });

  return await Packer.toBlob(doc);
}

// Generate Complete Administration Package (.docx)
export async function generateSemuaDokumenDocx(data: SiapPpknData): Promise<Blob> {
  const totalJP = data.atpItems.reduce((acc, curr) => acc + (Number(curr.alokasiWaktuJP) || 0), 0);

  // Table rows for ATP section inside package
  const atpTableRows: TableRow[] = [
    new TableRow({
      tableHeader: true,
      children: [
        new TableCell({ width: { size: 6, type: WidthType.PERCENTAGE }, shading: { fill: headerBgColor }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'No', bold: true, color: 'FFFFFF', size: 18 })] })] }),
        new TableCell({ width: { size: 15, type: WidthType.PERCENTAGE }, shading: { fill: headerBgColor }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Elemen', bold: true, color: 'FFFFFF', size: 18 })] })] }),
        new TableCell({ width: { size: 25, type: WidthType.PERCENTAGE }, shading: { fill: headerBgColor }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Tujuan Pembelajaran', bold: true, color: 'FFFFFF', size: 18 })] })] }),
        new TableCell({ width: { size: 25, type: WidthType.PERCENTAGE }, shading: { fill: headerBgColor }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Materi Pokok', bold: true, color: 'FFFFFF', size: 18 })] })] }),
        new TableCell({ width: { size: 15, type: WidthType.PERCENTAGE }, shading: { fill: headerBgColor }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Profil Pancasila', bold: true, color: 'FFFFFF', size: 18 })] })] }),
        new TableCell({ width: { size: 7, type: WidthType.PERCENTAGE }, shading: { fill: headerBgColor }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'JP', bold: true, color: 'FFFFFF', size: 18 })] })] }),
        new TableCell({ width: { size: 7, type: WidthType.PERCENTAGE }, shading: { fill: headerBgColor }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Model', bold: true, color: 'FFFFFF', size: 18 })] })] }),
      ],
    }),
  ];

  data.atpItems.forEach((item, index) => {
    const pppShort = Array.isArray(item.profilPelajarPancasila) && item.profilPelajarPancasila.length > 0
      ? item.profilPelajarPancasila.slice(0, 2).join(', ')
      : 'Mandiri, Kritis';
    const modelShort = (item.modelPembelajaran || 'PBL').split(' ')[0];

    atpTableRows.push(
      new TableRow({
        children: [
          new TableCell({ width: { size: 6, type: WidthType.PERCENTAGE }, shading: { fill: index % 2 === 1 ? zebraBgColor : 'FFFFFF' }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `${index + 1}`, size: 17 })] })] }),
          new TableCell({ width: { size: 15, type: WidthType.PERCENTAGE }, shading: { fill: index % 2 === 1 ? zebraBgColor : 'FFFFFF' }, children: [new Paragraph({ children: [new TextRun({ text: item.elemen || 'Pancasila', bold: true, size: 17, color: '1E3A8A' })] })] }),
          new TableCell({ width: { size: 25, type: WidthType.PERCENTAGE }, shading: { fill: index % 2 === 1 ? zebraBgColor : 'FFFFFF' }, children: [new Paragraph({ children: [new TextRun({ text: item.tujuanPembelajaran || '-', size: 17 })] })] }),
          new TableCell({ width: { size: 25, type: WidthType.PERCENTAGE }, shading: { fill: index % 2 === 1 ? zebraBgColor : 'FFFFFF' }, children: [new Paragraph({ children: [new TextRun({ text: item.materiPembelajaran || '-', size: 17 })] })] }),
          new TableCell({ width: { size: 15, type: WidthType.PERCENTAGE }, shading: { fill: index % 2 === 1 ? zebraBgColor : 'FFFFFF' }, children: [new Paragraph({ children: [new TextRun({ text: pppShort, italics: true, size: 16 })] })] }),
          new TableCell({ width: { size: 7, type: WidthType.PERCENTAGE }, shading: { fill: index % 2 === 1 ? zebraBgColor : 'FFFFFF' }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `${item.alokasiWaktuJP || 0}`, bold: true, size: 17, color: '059669' })] })] }),
          new TableCell({ width: { size: 7, type: WidthType.PERCENTAGE }, shading: { fill: index % 2 === 1 ? zebraBgColor : 'FFFFFF' }, children: [new Paragraph({ children: [new TextRun({ text: modelShort, size: 16 })] })] }),
        ],
      })
    );
  });

  // Table row distribution summary
  const distributionRows: TableRow[] = [
    new TableRow({
      tableHeader: true,
      children: [
        new TableCell({ width: { size: 10, type: WidthType.PERCENTAGE }, shading: { fill: '059669' }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'No', bold: true, color: 'FFFFFF', size: 18 })] })] }),
        new TableCell({ width: { size: 45, type: WidthType.PERCENTAGE }, shading: { fill: '059669' }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Elemen Kurikulum Merdeka PPKn', bold: true, color: 'FFFFFF', size: 18 })] })] }),
        new TableCell({ width: { size: 25, type: WidthType.PERCENTAGE }, shading: { fill: '059669' }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Jumlah Tujuan (TP)', bold: true, color: 'FFFFFF', size: 18 })] })] }),
        new TableCell({ width: { size: 20, type: WidthType.PERCENTAGE }, shading: { fill: '059669' }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Alokasi JP', bold: true, color: 'FFFFFF', size: 18 })] })] }),
      ],
    }),
  ];

  const elemenCountMap: Record<string, { count: number; jp: number }> = {};
  data.atpItems.forEach((i) => {
    if (!elemenCountMap[i.elemen]) {
      elemenCountMap[i.elemen] = { count: 0, jp: 0 };
    }
    elemenCountMap[i.elemen].count += 1;
    elemenCountMap[i.elemen].jp += Number(i.alokasiWaktuJP) || 0;
  });

  let eIndex = 1;
  for (const [elemenName, val] of Object.entries(elemenCountMap)) {
    distributionRows.push(
      new TableRow({
        children: [
          new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `${eIndex++}`, size: 18 })] })] }),
          new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: elemenName, bold: true, size: 18, color: '1E3A8A' })] })] }),
          new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `${val.count} TP`, size: 18 })] })] }),
          new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `${val.jp} JP`, bold: true, color: '059669', size: 18 })] })] }),
        ],
      })
    );
  }

  // Distribution total row
  distributionRows.push(
    new TableRow({
      children: [
        new TableCell({ columnSpan: 2, shading: { fill: 'E2E8F0' }, children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: 'TOTAL KESELURUHAN:', bold: true, size: 18 })] })] }),
        new TableCell({ shading: { fill: 'E2E8F0' }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `${data.atpItems.length} TP`, bold: true, size: 18 })] })] }),
        new TableCell({ shading: { fill: '059669' }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `${totalJP} JP`, bold: true, color: 'FFFFFF', size: 18 })] })] }),
      ],
    })
  );

  const doc = new Document({
    sections: [
      // SECTION 1: COVER
      {
        properties: {
          page: { margin: { top: 1440, bottom: 1440, left: 1440, right: 1440 } },
        },
        children: [
          new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 800, after: 100 }, children: [new TextRun({ text: 'DOKUMEN ADMINISTRASI PEMBELAJARAN', bold: true, size: 36, color: '1E3A8A' })] }),
          new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 300 }, children: [new TextRun({ text: 'KURIKULUM MERDEKA', bold: true, size: 28, color: '059669' })] }),
          new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 600 }, children: [new TextRun({ text: 'MATA PELAJARAN ' + data.mataPelajaran.toUpperCase(), bold: true, size: 26, color: '0F172A' })] }),
          
          new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 100 }, children: [new TextRun({ text: `FASE / KELAS: ${data.fase} / ${data.kelas}`, bold: true, size: 22 })] }),
          new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 100 }, children: [new TextRun({ text: `SEMESTER: ${data.semester}`, size: 20 })] }),
          new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 800 }, children: [new TextRun({ text: `TAHUN AJARAN: ${data.tahunAkademik}`, bold: true, size: 22 })] }),

          new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 100 }, children: [new TextRun({ text: 'Disusun Oleh:', size: 20 })] }),
          new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 50 }, children: [new TextRun({ text: data.namaGuru, bold: true, size: 24, color: '1E3A8A' })] }),
          new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 1000 }, children: [new TextRun({ text: 'NIP. ' + (data.nipGuru || '-'), size: 20 })] }),

          new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 100 }, children: [new TextRun({ text: data.namaSekolah.toUpperCase(), bold: true, size: 28, color: '1E3A8A' })] }),
          new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 200 }, children: [new TextRun({ text: data.alamatSekolah || 'Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi', size: 18, color: '64748B' })] }),
          new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `${data.titimangsaKota || 'Indonesia'}, Tahun ${data.tahunAkademik.split('/')[0] || '2024'}`, bold: true, size: 20 })] }),
          new Paragraph({ children: [new PageBreak()] }),
        ],
      },

      // SECTION 2: LEMBAR PENGESAHAN & DAFTAR ISI
      {
        properties: {
          page: { margin: { top: 900, bottom: 900, left: 900, right: 900 } },
        },
        children: [
          new Paragraph({ alignment: AlignmentType.CENTER, heading: HeadingLevel.HEADING_1, spacing: { after: 200 }, children: [new TextRun({ text: 'LEMBAR PENGESAHAN', bold: true, size: 28, color: '1E3A8A' })] }),
          new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            spacing: { after: 300 },
            children: [
              new TextRun({
                text: `Dokumen Alur Tujuan Pembelajaran (ATP) dan Perangkat Administrasi Pembelajaran Mata Pelajaran ${data.mataPelajaran} untuk Kelas ${data.kelas} (${data.fase}) Tahun Ajaran ${data.tahunAkademik} ini telah diperiksa, ditelaah, dan disahkan oleh Kepala Satuan Pendidikan untuk diberlakukan sebagai pedoman pelaksanaan proses belajar mengajar di lingkungan ${data.namaSekolah}.`,
                size: 20,
              }),
            ],
          }),

          new Paragraph({ spacing: { after: 300 } }),

          // Pengesahan Table
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            borders: {
              top: { style: BorderStyle.NONE },
              bottom: { style: BorderStyle.NONE },
              left: { style: BorderStyle.NONE },
              right: { style: BorderStyle.NONE },
              insideHorizontal: { style: BorderStyle.NONE },
              insideVertical: { style: BorderStyle.NONE },
            },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    width: { size: 50, type: WidthType.PERCENTAGE },
                    children: [
                      new Paragraph({ children: [new TextRun({ text: 'Mengetahui,', size: 20 })] }),
                      new Paragraph({ children: [new TextRun({ text: 'Kepala ' + data.namaSekolah, bold: true, size: 20 })] }),
                      new Paragraph({ text: '' }),
                      new Paragraph({ text: '' }),
                      new Paragraph({ text: '' }),
                      new Paragraph({ children: [new TextRun({ text: data.namaKepalaSekolah, bold: true, underline: {}, size: 20 })] }),
                      new Paragraph({ children: [new TextRun({ text: 'NIP. ' + (data.nipKepalaSekolah || '-'), size: 18 })] }),
                    ],
                  }),
                  new TableCell({
                    width: { size: 50, type: WidthType.PERCENTAGE },
                    children: [
                      new Paragraph({ children: [new TextRun({ text: `${data.titimangsaKota || 'Kota'}, ${data.titimangsaTanggal || '15 Juli 2024'}`, size: 20 })] }),
                      new Paragraph({ children: [new TextRun({ text: 'Guru Mata Pelajaran,', size: 20 })] }),
                      new Paragraph({ text: '' }),
                      new Paragraph({ text: '' }),
                      new Paragraph({ text: '' }),
                      new Paragraph({ children: [new TextRun({ text: data.namaGuru, bold: true, underline: {}, size: 20 })] }),
                      new Paragraph({ children: [new TextRun({ text: 'NIP. ' + (data.nipGuru || '-'), size: 18 })] }),
                    ],
                  }),
                ],
              }),
            ],
          }),

          new Paragraph({ spacing: { before: 500, after: 200 }, children: [new TextRun({ text: 'DISTRIBUSI ALOKASI WAKTU PER ELEMEN', bold: true, size: 22, color: '059669' })] }),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            borders: tableBorders,
            rows: distributionRows,
          }),

          new Paragraph({ children: [new PageBreak()] }),

          // SECTION 3: ATP INCLUDED
          new Paragraph({ alignment: AlignmentType.CENTER, heading: HeadingLevel.HEADING_1, spacing: { after: 150 }, children: [new TextRun({ text: 'ALUR TUJUAN PEMBELAJARAN (ATP) LENGKAP', bold: true, size: 28, color: '1E3A8A' })] }),
          new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 300 }, children: [new TextRun({ text: `${data.namaSekolah} | Tahun Ajaran ${data.tahunAkademik}`, size: 20, color: '64748B' })] }),

          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            borders: tableBorders,
            rows: atpTableRows,
          }),

          new Paragraph({ spacing: { before: 300 } }),
          new Paragraph({
            children: [
              new TextRun({
                text: 'Catatan Penyelenggaraan: Alur Tujuan Pembelajaran disusun secara runtut dan fleksibel sesuai kebutuhan peserta didik dan karakteristik kearifan lokal sekolah.',
                italics: true,
                size: 16,
                color: '64748B',
              }),
            ],
          }),
        ],
      },
    ],
  });

  return await Packer.toBlob(doc);
}
