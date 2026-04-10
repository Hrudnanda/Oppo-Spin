import React, { useState, useRef } from 'react';
import { Cpu, Zap, Save, RotateCcw, FileJson, FileSpreadsheet, Trophy } from 'lucide-react';
import confetti from 'canvas-confetti'; // Import confetti

// --- TYPES & INTERFACES ---
interface VisualSlice {
  label: string;
  bg: string;
  text: string;
  id: string;
}

interface Winner {
  side: string;
  result: VisualSlice;
  customer: string;
  time: string;
}

// --- CONSTANTS ---
const CUSTOMER_NAMES: string[] = [
  "ABHISHEK PATTANAIK", "AMIT KUMAR PANDA", "ASHIT KUMAR PATRA", "BAPI BEHERA", "BARSHA RANI NAYAK",
  "BIJAY KUMAR SENAPATI", "BIKASH JENA", "BISWAJEET DHAL", "BISWAJIT SAHOO", "BISWAKALYAN MOHANTY",
  "CHITARANJAN BEHURA", "DAMBARUDHAR SAHOO", "DEBU KUMAR DUTTA", "DILLIP KUMAR DAS", "DIPAK KUMAR DAS",
  "DIPTIRANJAN SAHOO", "JIBAN KUMAR BEHERA", "JITENDRA BARALA", "JITENDRA SAHOO", "KAIBALYA KUMAR JENA",
  "LAXMIKANTA SAHOO", "MAHESH KUMAR JENA", "MANI NAYAK", "MILI BEHERA", "MONALISHA NAYAK",
  "NIRANJAN PARIDA", "PABITRA KUMAR DAS", "PRAKASH KUMAR SAHOO", "PRIYARANJAN SWAIN", "PRUTHIRAJ PANDA",
  "PUPUN CHINERA", "RAJENDRA BEHERA", "RAJU MOHAPATRA", "RINKU RANJAN BEHERA", "SANGRAM BEHERA",
  "SRIKANTA KUMAR SAHOO", "TAPAS KUMAR SUBUDHI", "ABHISHEKH NAYAK", "AKSHAYA KUMAR PRUSTY", "ALOK RANJAN ROUT",
  "ANUPAMA PANDA", "ASHOK KUMAR JENA", "AJAY KUMAR BEHERA", "BIKASH KUMAR SAHU", "BIKASH SATAPATHY",
  "BINAYA RANJAN SARANGI", "BISHNU KUMAR GIRI", "CHANDAN BEHERA", "DEEPAK KUMAR MALLICK", "DIBYA RANJAN ROUT",
  "GOURAHARI DAS", "JOGENDRA BEHERA", "KARAN KUMAR SARANGI", "KARTIK CHANDRA SAHOO", "MD NIZAMUDDIN KHAN",
  "PRIYABRAT MOHANTY", "PURUSHOTTAM BISWAL", "RANJIT KUMAR NAYAK", "RASBIHARI DAS", "RATIKANTA BISWAL",
  "SANJIB KUMAR RAM", "SHEKH MAUSIM", "SOUBHAGYA KUMAR SAHOO", "SUBRAT KUMAR DAS", "AMAN KUMAR SAHU",
  "ANIL KUMAR PANDA", "BIBHUTI BHUSAN PATRA", "BISWA BIJAYI HIMADRI PRASAD", "CHITTARANJAN BARAD", "D TEJESWAR RAO",
  "DEBIPRASAD MAHATARAY", "JIBANANANDA MALLIK", "K GIRIJA SHANKAR PATRA", "KUMAR CHAND PATTNAIK", "MUKESH KUMAR PATRA",
  "NITYANANDA MAHARANA", "PRIYARANJAN SAHOO", "RAMA CHANDRA NAHAK", "SANTANU KUMAR SUBUDHI", "SANTOSH SAHU",
  "SANTOSH SWAIN", "SOUMYA RANJAN RATH", "TILU MAHAPATRA", "UJWAL KUMAR PADHY", "A MANOJ KUMAR",
  "ABDUL SARIF KHAN", "ALOK SAHU", "ALOKA KUMAR PRADHAN", "AMITABH PATTANAIK", "ANANTA NARAYAN PANDA",
  "ANIL KUMAR SANBAD", "ASHISH KALSAI", "BANSHI DHAR DAS", "BANSHI LOCHAN BARIK", "BINAYA KUMAR NAYAK",
  "BISWAJEET BISWAS", "BRUNDAWAN DAS", "DAVID MISHRA", "KISHORI MAHAPATRA", "KUNDAN NAIK",
  "MANOJ KUMAR SAHU", "MANORANJAN SAHOO", "MUNA BANCHHOR", "PINTU DEHURY", "PRAMOD KUMAR SAHOO",
  "PRANAB KUMAR JYOTISH", "PURUSOTTAM BAGARTI", "RAJENDRA NARAYAN SINGH", "RAJU MEHETA", "RAKESH KARA",
  "RINKU SHARMA", "SACHCHIDANAND SETH", "SIDHANTA SUNA", "SUNIL KUMAR NAYAK", "SURAJ KUMAR MOHAPATRA", "VIKASH PRASAD"
];

const VISUAL_WHEEL: VisualSlice[] = [
  { label: "RENO 12 PRO", bg: "#3b82f6", text: "#fff", id: 'reno' },
  { label: "SPEAKER", bg: "#1e293b", text: "#fff", id: 'speaker' },
  { label: "BUDS 3 PRO+", bg: "#3b82f6", text: "#fff", id: 'buds' },
  { label: "SANDWICH MAKER", bg: "#ffffff", text: "#000", id: 'sandwich' },
  { label: "BETTER LUCK", bg: "#020617", text: "#fff", id: 'none' },
  { label: "OPPO F27", bg: "#ef4444", text: "#fff", id: 'f27' },
  { label: "SPEAKER", bg: "#1e293b", text: "#fff", id: 'speaker' },
  { label: "BUDS 3 PRO+", bg: "#3b82f6", text: "#fff", id: 'buds' },
  { label: "BETTER LUCK", bg: "#020617", text: "#fff", id: 'none' },
  { label: "SANDWICH MAKER", bg: "#ffffff", text: "#000", id: 'sandwich' },
  { label: "RENO 12 PRO", bg: "#3b82f6", text: "#fff", id: 'reno' },
  { label: "SPEAKER", bg: "#1e293b", text: "#fff", id: 'speaker' },
  { label: "BUDS 3 PRO+", bg: "#3b82f6", text: "#fff", id: 'buds' },
  { label: "SANDWICH MAKER", bg: "#ffffff", text: "#000", id: 'sandwich' },
  { label: "BETTER LUCK", bg: "#020617", text: "#fff", id: 'none' },
  { label: "OPPO F27", bg: "#ef4444", text: "#fff", id: 'f27' },
  { label: "SPEAKER", bg: "#1e293b", text: "#fff", id: 'speaker' },
  { label: "BUDS 3 PRO+", bg: "#3b82f6", text: "#fff", id: 'buds' },
  { label: "BETTER LUCK", bg: "#020617", text: "#fff", id: 'none' },
  { label: "SANDWICH MAKER", bg: "#ffffff", text: "#000", id: 'sandwich' },
];

const generateShuffledPrizes = () => {
  const pool = [
    ...Array(20).fill('speaker'),
    ...Array(20).fill('sandwich'),
    ...Array(30).fill('buds'),
    ...Array(3).fill('reno'),
    ...Array(7).fill('f27'),
    ...Array(36).fill('none'),
  ];
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool;
};

const SHUFFLED_DISTRIBUTION = generateShuffledPrizes();

const SectorSpinStore: React.FC = () => {
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [rotation, setRotation] = useState<number>(0);
  const [activeWinners, setActiveWinners] = useState<Winner[]>([]);
  const [history, setHistory] = useState<Winner[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const SLICE_DEGREE = 360 / VISUAL_WHEEL.length;

  // --- WINNER SPARKLE EFFECT ---
  const triggerSparkle = () => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);

      const particleCount = 50 * (timeLeft / duration);
      // Oppo Theme Colors: Blue, Gold, Red, White
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }, colors: ['#3b82f6', '#f59e0b', '#ef4444'] });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }, colors: ['#3b82f6', '#f59e0b', '#ef4444'] });
    }, 250);
  };

  const saveFile = async (content: string, fileName: string, mimeType: string) => {
    if ('showSaveFilePicker' in window) {
      try {
        const handle = await (window as any).showSaveFilePicker({
          suggestedName: fileName,
          types: [{
            description: mimeType === 'application/json' ? 'JSON File' : 'CSV File',
            accept: { [mimeType]: [mimeType === 'application/json' ? '.json' : '.csv'] },
          }],
        });
        const writable = await handle.createWritable();
        await writable.write(content);
        await writable.close();
      } catch (err) { console.log('Save cancelled'); }
    } else {
      const blob = new Blob([content], { type: mimeType });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;
      link.click();
      URL.revokeObjectURL(url);
    }
  };

  const saveAsJSON = () => {
    if (history.length === 0) return alert("Dashboard is empty.");
    saveFile(JSON.stringify(history, null, 2), `Oppo_Winners_${Date.now()}.json`, 'application/json');
  };

  const saveAsExcelCSV = () => {
    if (history.length === 0) return alert("Dashboard is empty.");
    const headers = ["Customer Name", "Prize", "Sector", "Time"];
    const rows = history.map(w => [`"${w.customer}"`, `"${w.result.label}"`, `"${w.side.toUpperCase()}"`, `"${w.time}"`]);
    const csvContent = [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    saveFile(csvContent, `Oppo_Report_${Date.now()}.csv`, 'text/csv');
  };

  const restoreData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const json = JSON.parse(e.target?.result as string);
        if (Array.isArray(json)) setHistory(json);
      } catch (err) { alert("Invalid file."); }
    };
    reader.readAsText(file);
    event.target.value = "";
  };

  const spinWheel = () => {
    if (isSpinning || history.length >= 116) return;
    setIsSpinning(true);
    
    const primaryIndex = history.length;
    const targetPrizeId = SHUFFLED_DISTRIBUTION[primaryIndex];
    const matchingSlices = VISUAL_WHEEL.map((s, i) => s.id === targetPrizeId ? i : -1).filter(i => i !== -1);
    const targetSliceIndex = matchingSlices[Math.floor(Math.random() * matchingSlices.length)];

    const extraSpins = 360 * 10; 
    const currentRotMod = rotation % 360;
    const stopAngle = (360 - (targetSliceIndex * SLICE_DEGREE) - (SLICE_DEGREE / 2));
    const newRotation = rotation + extraSpins + ((stopAngle - currentRotMod + 360) % 360);
    
    setRotation(newRotation);

    setTimeout(() => {
      setIsSpinning(false);
      const results: Winner[] = [];
      const pointers = { top: 0, right: 90, bottom: 180, left: 270 };

      Object.entries(pointers).forEach(([side, offset]) => {
        const currentDrawIndex = history.length + results.length;
        if (currentDrawIndex < 116) {
          const normalizedRotation = (newRotation - offset) % 360;
          const visualIndex = Math.floor((360 - (normalizedRotation % 360)) % 360 / SLICE_DEGREE);
          const prizeId = (side === 'top') ? SHUFFLED_DISTRIBUTION[currentDrawIndex] : VISUAL_WHEEL[visualIndex % VISUAL_WHEEL.length].id;
          const prizeObj = VISUAL_WHEEL.find(s => s.id === prizeId) || VISUAL_WHEEL[4];

          results.push({ 
            side, 
            result: prizeObj, 
            customer: CUSTOMER_NAMES[currentDrawIndex], 
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
          });
        }
      });

      // --- TRIGGER SPARKLE BOOM ---
      triggerSparkle();
      
      setActiveWinners(results);
      setHistory(prev => [...results, ...prev]);
    }, 4000);
  };

  return (
    <div className="bg-[#020617] min-h-screen text-slate-100 flex flex-col items-center p-4">
      <div className="w-full max-w-6xl flex flex-wrap gap-4 justify-between items-center py-4 px-6 bg-white/5 rounded-2xl border border-white/10 mb-6 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <Save size={18} className="text-sky-400" />
          <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Save System</span>
        </div>
        <div className="flex gap-2">
          <button onClick={saveAsJSON} className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-xs font-bold transition-all border border-white/5 active:scale-95">
            <FileJson size={14} className="text-yellow-500"/> JSON
          </button>
          <button onClick={saveAsExcelCSV} className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-xs font-bold transition-all border border-white/5 active:scale-95">
            <FileSpreadsheet size={14} className="text-green-500"/> CSV
          </button>
          <div className="h-8 w-px bg-white/10 mx-2" />
          <input type="file" ref={fileInputRef} onChange={restoreData} className="hidden" accept=".json" />
          <button onClick={() => fileInputRef.current?.click()} className="flex items-center gap-2 px-4 py-2 bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 rounded-lg text-xs font-bold transition-all border border-sky-500/20">
            <RotateCcw size={14}/> Restore
          </button>
        </div>
      </div>

      <nav className="w-full max-w-6xl flex justify-between items-center py-6 border-b border-white/5">
        <h1 className="font-black italic text-sky-500 text-2xl tracking-tighter flex items-center gap-3">
          <Cpu size={24} /> OPPO ELITE 116
        </h1>
        <div className="text-right font-black text-sky-400">
          {history.length} <span className="text-slate-700">/ 116</span>
        </div>
      </nav>

      <div className="relative mt-32 mb-32 scale-90 md:scale-100">
        <Arrow side="top" color="#3b82f6" data={activeWinners.find(w => w.side === 'top')} />
        <Arrow side="right" color="#f59e0b" data={activeWinners.find(w => w.side === 'right')} />
        <Arrow side="bottom" color="#ef4444" data={activeWinners.find(w => w.side === 'bottom')} />
        <Arrow side="left" color="#10b981" data={activeWinners.find(w => w.side === 'left')} />

        <div className="relative w-[320px] h-[320px] md:w-[500px] md:h-[500px] rounded-full p-2 bg-slate-800 shadow-[0_0_80px_rgba(59,130,246,0.3)]">
          <div className="w-full h-full rounded-full transition-transform duration-[4000ms] cubic-bezier(0.15, 0, 0.15, 1) overflow-hidden"
               style={{ transform: `rotate(${rotation}deg)` }}>
            <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
              {VISUAL_WHEEL.map((s, i) => {
                const angle = i * SLICE_DEGREE;
                const x1 = 50 + 50 * Math.cos(Math.PI * angle / 180);
                const y1 = 50 + 50 * Math.sin(Math.PI * angle / 180);
                const x2 = 50 + 50 * Math.cos(Math.PI * (angle + SLICE_DEGREE) / 180);
                const y2 = 50 + 50 * Math.sin(Math.PI * (angle + SLICE_DEGREE) / 180);
                return (
                  <g key={i}>
                    <path d={`M 50 50 L ${x1} ${y1} A 50 50 0 0 1 ${x2} ${y2} Z`} fill={s.bg} stroke="#000" strokeWidth="0.1" />
                    <text x="75" y="50" fill={s.text} fontSize="2.2" fontWeight="900" textAnchor="middle" 
                          transform={`rotate(${angle + SLICE_DEGREE / 2} 50 50)`}>
                      {s.label}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
          <div className="absolute inset-0 m-auto w-20 h-20 bg-slate-950 rounded-full border-4 border-slate-700 shadow-2xl flex items-center justify-center z-20">
            <Zap size={30} className={isSpinning ? "text-yellow-400 animate-pulse" : "text-sky-400"} />
          </div>
        </div>
      </div>

      <button onClick={spinWheel} disabled={isSpinning || history.length >= 116}
              className="px-20 py-5 bg-sky-600 hover:bg-sky-500 rounded-xl font-black uppercase tracking-[0.4em] text-xs shadow-2xl transition-all active:scale-95 disabled:opacity-20 mb-20">
        {isSpinning ? 'SPINNING...' : history.length >= 116 ? 'FINISHED' : 'ENGAGE DRAW'}
      </button>

      <div className="w-full max-w-6xl mb-20">
        <h2 className="text-xl font-black uppercase tracking-widest italic mb-6 flex items-center gap-3"><Trophy className="text-yellow-500"/> Winners Log</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {history.map((winner, idx) => (
            <div key={idx} className="bg-white/5 border border-white/10 p-5 rounded-2xl flex items-center justify-between animate-in fade-in slide-in-from-bottom-2 duration-500">
              <div>
                <p className="text-sm font-black text-white uppercase truncate max-w-[150px]">{winner.customer}</p>
                <p className="text-[10px] text-slate-500 uppercase">{winner.side}</p>
              </div>
              <p className="text-xs font-black text-sky-400">{winner.result.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Arrow: React.FC<{side: string, color: string, data: Winner | undefined}> = ({ side, color, data }) => {
  const pos: any = {
    top: "top-[-110px] left-1/2 -translate-x-1/2 flex-col",
    bottom: "bottom-[-110px] left-1/2 -translate-x-1/2 flex-col-reverse",
    left: "left-[-190px] top-1/2 -translate-y-1/2 flex-row",
    right: "right-[-190px] top-1/2 -translate-y-1/2 flex-row-reverse",
  };
  return (
    <div className={`absolute z-50 flex items-center justify-center transition-all duration-700 ${pos[side]} ${data ? 'opacity-100 scale-110' : 'opacity-30 scale-95'}`}>
      <div className="bg-slate-900 border-2 px-5 py-3 rounded-xl min-w-[170px] text-center" style={{ borderColor: color }}>
        <p className="text-[9px] font-black text-slate-500 uppercase">{data ? "WINNER" : side}</p>
        <p className="text-xs font-black text-white uppercase truncate">{data ? data.customer : '---'}</p>
        {data && <p className="text-[10px] font-black text-sky-400 mt-1">{data.result.label}</p>}
      </div>
    </div>
  );
};

export default SectorSpinStore;