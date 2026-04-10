import React, { useState, useMemo } from 'react';
import { Cpu, Zap, Trophy, CheckCircle2, Save, FolderOpen, FileSpreadsheet } from 'lucide-react';
import confetti from 'canvas-confetti';

// --- TYPES ---
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

const PRIZE_MAP: Record<string, Omit<VisualSlice, 'id'>> = {
  none: { label: "BETTER LUCK", bg: "#020617", text: "#fff" },
  reno: { label: "RENO 12 PRO", bg: "#3b82f6", text: "#fff" },
  f27: { label: "OPPO F27", bg: "#ef4444", text: "#fff" },
  buds: { label: "BUDS 3 PRO+", bg: "#3b82f6", text: "#fff" },
  speaker: { label: "SPEAKER", bg: "#1e293b", text: "#fff" },
  sandwich: { label: "SANDWICH MAKER", bg: "#ffffff", text: "#000" },
};

const SectorSpinStore: React.FC = () => {
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [rotation, setRotation] = useState<number>(0);
  const [activeWinners, setActiveWinners] = useState<Winner[]>([]);
  const [history, setHistory] = useState<Winner[]>([]);
  const [stock, setStock] = useState({
    reno: 3, f27: 7, buds: 30, speaker: 20, sandwich: 20, none: 36
  });

  const dynamicWheel = useMemo(() => {
    const slices: VisualSlice[] = [];
    const keys = ["none", "reno", "f27", "buds", "speaker", "sandwich", "none", "buds", "reno", "speaker"];
    for (let i = 0; i < 20; i++) {
      const key = keys[i % keys.length];
      slices.push({ ...PRIZE_MAP[key], id: key });
    }
    return slices;
  }, []);

  const SLICE_DEGREE = 360 / dynamicWheel.length;

  // --- SAVE, RESTORE & CSV LOGIC ---
  const saveToFile = async () => {
    const data = JSON.stringify({ history, stock, rotation }, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    try {
      if ('showSaveFilePicker' in window) {
        const handle = await (window as any).showSaveFilePicker({
          suggestedName: `oppo_elite_draw_${new Date().toISOString().split('T')[0]}.json`,
          types: [{ description: 'JSON File', accept: { 'application/json': ['.json'] } }],
        });
        const writable = await handle.createWritable();
        await writable.write(blob);
        await writable.close();
      } else {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'oppo_elite_draw_backup.json';
        link.click();
      }
    } catch (err) { console.error("Save cancelled or failed", err); }
  };

  const saveToCSV = () => {
    if (history.length === 0) {
      alert("No records to export yet.");
      return;
    }

    // Header for Winners
    let csvContent = "WINNERS LOG\n";
    csvContent += "Customer,Prize,Side,Time\n";
    
    history.forEach(w => {
      csvContent += `"${w.customer}","${w.result.label}","${w.side}","${w.time}"\n`;
    });

    // Spacer
    csvContent += "\nREMAINING STOCK\n";
    csvContent += "Prize,Remaining\n";
    Object.entries(stock).forEach(([id, count]) => {
      csvContent += `"${PRIZE_MAP[id].label}","${count}"\n`;
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `oppo_winners_${new Date().toISOString().split('T')[0]}.csv`);
    link.click();
  };

  const restoreFromFile = async () => {
    try {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = '.json';
      input.onchange = async (e) => {
        const file = (e.target as HTMLInputElement).files?.[0];
        if (!file) return;
        const text = await file.text();
        const imported = JSON.parse(text);
        if (imported.history && imported.stock) {
          setHistory(imported.history);
          setStock(imported.stock);
          setRotation(imported.rotation || 0);
          setActiveWinners([]);
          alert("Data Restored Successfully!");
        }
      };
      input.click();
    } catch (err) { alert("Invalid backup file."); }
  };

  const spinWheel = () => {
    if (isSpinning || history.length >= 116) return;
    setIsSpinning(true);

    const available = Object.entries(stock)
      .filter(([_, count]) => count > 0)
      .map(([id]) => id);
    
    const rightId = available[Math.floor(Math.random() * available.length)];
    let leftId = 'none';
    const remainingAfterRight = { ...stock, [rightId]: stock[rightId as keyof typeof stock] - 1 };
    const stillAvailable = Object.entries(remainingAfterRight)
      .filter(([_, count]) => count > 0)
      .map(([id]) => id);
    
    if (stillAvailable.length > 0) {
        leftId = stillAvailable[Math.floor(Math.random() * stillAvailable.length)];
    }

    const targetRightIdx = 5;
    const targetLeftIdx = 15;

    dynamicWheel[targetRightIdx] = { ...PRIZE_MAP[rightId], id: rightId };
    dynamicWheel[targetLeftIdx] = { ...PRIZE_MAP[leftId], id: leftId };

    const extraSpins = 360 * 8;
    const currentRotMod = rotation % 360;
    const stopAngle = (360 - (targetRightIdx * SLICE_DEGREE) - (SLICE_DEGREE / 2) + 90);
    const finalRotation = rotation + extraSpins + ((stopAngle - currentRotMod + 360) % 360);
    
    setRotation(finalRotation);

    setTimeout(() => {
      const results: Winner[] = [
        {
          side: 'right',
          result: dynamicWheel[targetRightIdx],
          customer: CUSTOMER_NAMES[history.length],
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        },
        {
          side: 'left',
          result: dynamicWheel[targetLeftIdx],
          customer: CUSTOMER_NAMES[history.length + 1],
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ].filter(w => !!w.customer);

      setStock(prev => {
        const next = { ...prev };
        results.forEach(r => { next[r.result.id as keyof typeof stock]--; });
        return next;
      });

      setIsSpinning(false);
      confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
      setActiveWinners(results);
      setHistory(prev => [...results, ...prev]);
    }, 4000);
  };

  return (
    <div className="bg-[#020617] min-h-screen text-slate-100 flex flex-col items-center p-4">
      
      {/* Utility Bar */}
      <div className="w-full max-w-5xl flex justify-end gap-3 mb-4">
        <button onClick={restoreFromFile} className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-xs font-bold transition-all border border-white/10">
          <FolderOpen size={14} /> RESTORE JSON
        </button>
        <button onClick={saveToFile} className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-xs font-bold transition-all border border-white/10">
          <Save size={14} /> SAVE JSON
        </button>
        <button onClick={saveToCSV} className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 rounded-lg text-xs font-bold transition-all border border-emerald-500/20">
          <FileSpreadsheet size={14} /> EXPORT CSV
        </button>
      </div>

      {/* Live Inventory */}
      <div className="w-full max-w-5xl grid grid-cols-2 md:grid-cols-6 gap-2 py-4 px-6 bg-white/5 rounded-2xl border border-white/10 mb-8 backdrop-blur-md">
          {Object.entries(stock).map(([id, count]) => (
            <PrizeStat key={id} 
               label={PRIZE_MAP[id].label} 
               count={count} 
               color={id === 'reno' ? 'text-blue-400' : id === 'f27' ? 'text-red-400' : id === 'buds' ? 'text-sky-400' : id === 'none' ? 'text-slate-500' : 'text-slate-300'} 
            />
          ))}
      </div>

      <h1 className="font-black italic text-sky-500 text-3xl tracking-tighter flex items-center gap-3 mb-10 uppercase">
          <Cpu size={32} className="animate-pulse" /> Oppo Elite 116 <span className="text-white/20 font-light">|</span> Dual Draw
      </h1>

      {/* Drawing Stage */}
      <div className="relative mt-20 mb-32 scale-90 md:scale-100">
        <Arrow side="right" color="#f59e0b" data={activeWinners.find(w => w.side === 'right')} />
        <Arrow side="left" color="#10b981" data={activeWinners.find(w => w.side === 'left')} />

        <div className="relative w-[340px] h-[340px] md:w-[500px] md:h-[500px] rounded-full p-4 bg-slate-800 shadow-[0_0_120px_rgba(59,130,246,0.15)] border-8 border-slate-900">
          <div className="w-full h-full rounded-full transition-transform duration-[4000ms] cubic-bezier(0.15, 0, 0.15, 1) overflow-hidden"
                style={{ transform: `rotate(${rotation}deg)` }}>
            <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
              {dynamicWheel.map((s, i) => {
                const angle = i * SLICE_DEGREE;
                const x1 = 50 + 50 * Math.cos(Math.PI * angle / 180);
                const y1 = 50 + 50 * Math.sin(Math.PI * angle / 180);
                const x2 = 50 + 50 * Math.cos(Math.PI * (angle + SLICE_DEGREE) / 180);
                const y2 = 50 + 50 * Math.sin(Math.PI * (angle + SLICE_DEGREE) / 180);
                return (
                  <g key={`${i}-${s.id}`}>
                    <path d={`M 50 50 L ${x1} ${y1} A 50 50 0 0 1 ${x2} ${y2} Z`} fill={s.bg} stroke="rgba(0,0,0,0.3)" strokeWidth="0.05" />
                    <text x="78" y="50" fill={s.text} fontSize="2.4" fontWeight="900" textAnchor="middle" 
                          transform={`rotate(${angle + SLICE_DEGREE / 2} 50 50)`}>
                      {s.label}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
          <div className="absolute inset-0 m-auto w-20 h-20 bg-slate-950 rounded-full border-4 border-slate-700 shadow-2xl flex items-center justify-center z-20">
            <Zap size={36} className={isSpinning ? "text-yellow-400 animate-bounce" : "text-sky-400"} />
          </div>
        </div>
      </div>

      <button onClick={spinWheel} disabled={isSpinning || history.length >= 116}
              className="px-20 py-6 bg-sky-600 hover:bg-sky-500 rounded-2xl font-black uppercase tracking-[0.5em] text-sm shadow-[0_20px_50px_rgba(2,132,199,0.3)] transition-all active:scale-95 disabled:opacity-20 mb-20 group">
        <span className="group-hover:scale-110 transition-transform inline-block">
          {isSpinning ? 'Synchronizing...' : 'Trigger Dual Spin'}
        </span>
      </button>

      {/* Winners Log */}
      <div className="w-full max-w-6xl mb-32">
        <h2 className="text-2xl font-black uppercase tracking-widest italic flex items-center gap-3 mb-8 border-b border-white/10 pb-4">
          <Trophy className="text-yellow-500" size={28}/> Elite Winner Records
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {history.map((winner, idx) => (
            <div key={idx} className="bg-slate-900/50 backdrop-blur-sm border-l-4 p-4 rounded-r-xl flex flex-col gap-2 relative overflow-hidden group hover:bg-slate-800 transition-colors" style={{ borderColor: winner.result.bg }}>
              <span className="text-[10px] font-bold text-slate-500 uppercase">{winner.side} Station</span>
              <p className="text-sm font-black text-white uppercase group-hover:text-sky-400 transition-colors">{winner.customer}</p>
              <p className="text-xs font-bold py-1 px-2 rounded inline-block self-start shadow-sm" style={{ backgroundColor: winner.result.bg, color: winner.result.text }}>
                {winner.result.label}
              </p>
              <CheckCircle2 size={40} className="absolute -right-2 -bottom-2 text-white/5 group-hover:text-white/10 transition-colors" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const PrizeStat: React.FC<{label: string, count: number, color: string}> = ({ label, count, color }) => (
  <div className="text-center p-2 border-r border-white/5 last:border-0">
    <p className="text-[9px] font-bold text-slate-500 uppercase truncate leading-tight">{label}</p>
    <p className={`text-base font-black ${color}`}>{count}</p>
  </div>
);

const Arrow: React.FC<{side: string, color: string, data: Winner | undefined}> = ({ side, color, data }) => {
  const pos: any = {
    left: "left-[-240px] top-1/2 -translate-y-1/2 flex-row",
    right: "right-[-240px] top-1/2 -translate-y-1/2 flex-row-reverse",
  };
  const icons: any = { left: "▶", right: "◀" };

  return (
    <div className={`absolute z-50 flex items-center justify-center transition-all duration-700 ${pos[side]} ${data ? 'opacity-100 scale-105' : 'opacity-40'}`}>
      <div className="bg-slate-950/90 border-2 px-6 py-5 rounded-2xl min-w-[210px] text-center shadow-[0_10px_30px_rgba(0,0,0,0.5)] backdrop-blur-md" style={{ borderColor: color }}>
        <p className="text-[10px] font-black text-slate-500 uppercase mb-1">{data ? "Assigned" : side}</p>
        <p className="text-sm font-black text-white uppercase truncate">{data ? data.customer : '---'}</p>
        {data && <p className="text-[10px] font-black mt-2 inline-block px-3 py-1 rounded-full uppercase" style={{ backgroundColor: data.result.bg, color: data.result.text }}>{data.result.label}</p>}
      </div>
      <div className="text-3xl font-black mx-4 animate-pulse" style={{ color }}>{icons[side]}</div>
    </div>
  );
};

export default SectorSpinStore;