import React, { useState, useRef, useEffect } from 'react';
import { Zap, Upload, FileJson, FileSpreadsheet, Play, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';

// --- TYPES ---
interface VisualSlice { label: string; bg: string; text: string; id: string; }
interface Winner { side: string; result: VisualSlice; customer: string; time: string; }
type PrizeKey = 'reno' | 'f27' | 'buds' | 'speaker' | 'sandwich' | 'none';

// --- CONSTANTS ---
const STORAGE_KEY = 'sector_spin_data';
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

const PRIZE_MAP: Record<PrizeKey, Omit<VisualSlice, 'id'>> = {
  none: { label: "BETTER LUCK", bg: "#0f172a", text: "#fff" },
  reno: { label: "RENO 12 PRO", bg: "#3b82f6", text: "#fff" },
  f27: { label: "OPPO F27", bg: "#ef4444", text: "#fff" },
  buds: { label: "BUDS 3 PRO+", bg: "#06b6d4", text: "#fff" },
  speaker: { label: "SPEAKER", bg: "#8b5cf6", text: "#fff" },
  sandwich: { label: "SANDWICH MAKER", bg: "#fcd34d", text: "#000" },
};

const INITIAL_STOCK = { reno: 3, f27: 7, buds: 30, speaker: 20, sandwich: 20, none: 36 };

const SectorSpinStore: React.FC = () => {
  // --- PERSISTENCE LOGIC ---
  const [history, setHistory] = useState<Winner[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved).history : [];
  });

  const [stock, setStock] = useState<Record<PrizeKey, number>>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved).stock : INITIAL_STOCK;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ history, stock }));
  }, [history, stock]);

  const resetGame = () => {
    if (window.confirm("Are you sure you want to clear all data and reset the game?")) {
      localStorage.removeItem(STORAGE_KEY);
      window.location.reload();
    }
  };

  // --- REST OF STATE ---
  const [gameState, setGameState] = useState<'landing' | 'countdown' | 'playing'>(history.length > 0 ? 'playing' : 'landing');
  const [count, setCount] = useState<number>(5);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [rotation, setRotation] = useState<number>(0);
  const [activeWinners, setActiveWinners] = useState<Winner[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const SLICE_DEGREE = 360 / 20;

  const [wheelSlices, setWheelSlices] = useState<VisualSlice[]>(() => {
    const keys: PrizeKey[] = ["none", "reno", "f27", "buds", "speaker", "sandwich", "none", "buds", "reno", "speaker"];
    return Array.from({ length: 20 }, (_, i) => ({ ...PRIZE_MAP[keys[i % keys.length] as PrizeKey], id: keys[i % keys.length] }));
  });

  useEffect(() => {
    if (gameState === 'countdown' && count > 0) {
      const timer = setTimeout(() => setCount(count - 1), 1000);
      return () => clearTimeout(timer);
    } else if (gameState === 'countdown' && count === 0) {
      setTimeout(() => setGameState('playing'), 500);
    }
  }, [gameState, count]);

  // --- UPDATED EXPORT WITH LOCATION PICKER ---
  const exportData = async (format: 'json' | 'csv') => {
    if (history.length === 0) return alert("No history to export.");
    
    let content = "";
    const suggestedName = `SectorSpin_Backup_${new Date().getTime()}.${format}`;
    
    if (format === 'json') {
      content = JSON.stringify({ history, stock }, null, 2);
    } else {
      content = "Time,Customer,Prize,Station\n" + 
                history.map(w => `${w.time},"${w.customer}","${w.result.label}","${w.side}"`).join("\n");
    }

    // Attempt to use modern File System Access API to let user choose location
    if ('showSaveFilePicker' in window) {
      try {
        const handle = await (window as any).showSaveFilePicker({
          suggestedName: suggestedName,
          types: [{
            description: format === 'json' ? 'JSON File' : 'CSV Spreadsheet',
            accept: format === 'json' ? { 'application/json': ['.json'] } : { 'text/csv': ['.csv'] },
          }],
        });
        const writable = await handle.createWritable();
        await writable.write(content);
        await writable.close();
        return; // Success
      } catch (err: any) {
        if (err.name === 'AbortError') return; // User cancelled
        console.error("Picker failed, falling back to download", err);
      }
    }

    // Fallback for older browsers
    const blob = new Blob([content], { type: format === 'json' ? 'application/json' : 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = suggestedName;
    a.click();
    URL.revokeObjectURL(url);
  };

  const restoreData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target?.result as string);
        if (data.history && data.stock) {
          setHistory(data.history);
          setStock(data.stock);
          setGameState('playing');
          alert("Session Restored Successfully!");
        }
      } catch (err) { alert("Invalid JSON file."); }
    };
    reader.readAsText(file);
  };

  const spinWheel = () => {
    if (isSpinning || history.length >= CUSTOMER_NAMES.length) return;
    setIsSpinning(true);
    const targets = [{ side: 'top', idx: 0 }, { side: 'right', idx: 5 }, { side: 'bottom', idx: 10 }, { side: 'left', idx: 15 }];
    let currentStock = { ...stock };
    let tempSlices = [...wheelSlices];
    const results: Winner[] = [];

    targets.forEach((t, i) => {
      const prizePool: PrizeKey[] = [];
      (Object.keys(currentStock) as PrizeKey[]).forEach(key => {
        for (let count = 0; count < currentStock[key]; count++) { prizePool.push(key); }
      });
      const customerIdx = history.length + i;
      if (prizePool.length > 0 && customerIdx < CUSTOMER_NAMES.length) {
        const randomIdx = Math.floor(Math.random() * prizePool.length);
        const pickedId = prizePool[randomIdx];
        const newSlice = { ...PRIZE_MAP[pickedId], id: pickedId };
        tempSlices[t.idx] = newSlice;
        currentStock[pickedId]--;
        results.push({
          side: t.side, result: newSlice, customer: CUSTOMER_NAMES[customerIdx],
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        });
      }
    });

    setWheelSlices(tempSlices);
    const extraSpins = 360 * 10;
    const finalRotation = rotation + extraSpins + (360 - (rotation % 360)) - (SLICE_DEGREE / 2);
    setRotation(finalRotation);

    setTimeout(() => {
      setStock(currentStock);
      setIsSpinning(false);
      confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
      setActiveWinners(results);
      setHistory(prev => [...results, ...prev]);
    }, 4000);
  };

  if (gameState === 'landing') {
    return (
      <div className="bg-[#020617] min-h-screen flex flex-col items-center justify-center text-slate-100 p-6">
        <div className="text-center space-y-8 animate-in fade-in zoom-in duration-700">
          <div className="w-24 h-24 bg-sky-500/20 rounded-full flex items-center justify-center mx-auto border-2 border-sky-500 shadow-[0_0_30px_rgba(14,165,233,0.4)]">
            <Zap size={48} className="text-sky-400 fill-sky-400" />
          </div>
          <h1 className="text-6xl font-black tracking-tighter italic uppercase">Sector<span className="text-sky-500">Spin</span></h1>
          <p className="text-slate-400 max-w-md mx-auto font-medium tracking-wide">Ready for the Quad-Station Draw?</p>
          <button onClick={() => setGameState('countdown')} className="px-12 py-6 bg-sky-600 rounded-2xl font-black text-xl uppercase tracking-widest hover:bg-sky-500 transition-all hover:scale-105 active:scale-95 flex items-center gap-4 mx-auto">
            <Play fill="currentColor" /> START DRAW
          </button>
        </div>
      </div>
    );
  }

  if (gameState === 'countdown') {
    return (
      <div className="bg-[#020617] min-h-screen flex flex-col items-center justify-center text-slate-100">
        <h2 className="text-4xl font-black text-sky-500 mb-4 animate-pulse uppercase tracking-widest">Are you ready?</h2>
        <div key={count} className="text-[200px] font-black tabular-nums leading-none animate-in zoom-in fade-in duration-500 text-white drop-shadow-[0_0_50px_rgba(255,255,255,0.2)]">
          {count === 0 ? "GO!" : count}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#020617] min-h-screen text-slate-100 flex flex-col items-center p-6 font-sans overflow-x-hidden animate-in fade-in duration-1000">
      
      {/* TOOLBAR */}
      <div className="w-full max-w-5xl flex flex-wrap justify-between items-center gap-4 mb-6">
        <div className="flex gap-2">
            <button onClick={() => exportData('csv')} className="flex items-center gap-2 px-3 py-1.5 bg-emerald-600/20 text-emerald-400 border border-emerald-600/30 rounded-lg text-xs font-bold hover:bg-emerald-600/30 transition-all">
                <FileSpreadsheet size={14}/> EXPORT CSV
            </button>
            <button onClick={() => exportData('json')} className="flex items-center gap-2 px-3 py-1.5 bg-amber-600/20 text-amber-400 border border-amber-600/30 rounded-lg text-xs font-bold hover:bg-amber-600/30 transition-all">
                <FileJson size={14}/> SAVE BACKUP
            </button>
        </div>
        <div className="flex items-center gap-2">
            <button onClick={resetGame} className="flex items-center gap-2 px-3 py-1.5 bg-red-600/20 text-red-400 border border-red-600/30 rounded-lg text-xs font-bold hover:bg-red-600/30 transition-all">
                <RotateCcw size={14}/> RESET GAME
            </button>
            <input type="file" accept=".json" ref={fileInputRef} onChange={restoreData} className="hidden" />
            <button onClick={() => fileInputRef.current?.click()} className="flex items-center gap-2 px-3 py-1.5 bg-sky-600/20 text-sky-400 border border-sky-600/30 rounded-lg text-xs font-bold hover:bg-sky-600/30 transition-all">
                <Upload size={14}/> RESTORE SESSION
            </button>
        </div>
      </div>

      {/* STOCK COUNTER */}
      <div className="w-full max-w-5xl grid grid-cols-3 md:grid-cols-6 gap-4 p-4 bg-slate-900/50 rounded-2xl border border-white/10 mb-8 shadow-xl">
          {(Object.keys(stock) as PrizeKey[]).map((id) => (
            <div key={id} className="text-center border-r border-white/5 last:border-0">
              <p className="text-[9px] text-slate-500 uppercase font-black">{PRIZE_MAP[id].label}</p>
              <p className="text-xl font-black text-sky-400">{stock[id]}</p>
            </div>
          ))}
      </div>

      {/* WHEEL AREA */}
      <div className="relative my-20 scale-90 md:scale-100">
        <Arrow side="top" color="#f87171" data={activeWinners.find(w => w.side === 'top')} />
        <Arrow side="bottom" color="#60a5fa" data={activeWinners.find(w => w.side === 'bottom')} />
        <Arrow side="right" color="#fbbf24" data={activeWinners.find(w => w.side === 'right')} />
        <Arrow side="left" color="#34d399" data={activeWinners.find(w => w.side === 'left')} />

        <div className="relative w-[440px] h-[440px] rounded-full p-4 bg-slate-950 border-[12px] border-slate-900 shadow-[0_0_100px_rgba(0,0,0,0.5)]">
          <div className="absolute top-[-15px] left-1/2 -translate-x-1/2 z-50">
             <div className="w-8 h-8 bg-white rotate-45 border-4 border-slate-900 shadow-xl rounded-sm" />
          </div>

          <div className="w-full h-full rounded-full transition-transform duration-[4000ms] cubic-bezier(0.15, 0, 0.15, 1)"
                style={{ transform: `rotate(${rotation}deg)` }}>
            <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                {wheelSlices.map((s, i) => {
                    const angle = i * SLICE_DEGREE;
                    const x1 = 50 + 50 * Math.cos(Math.PI * angle / 180);
                    const y1 = 50 + 50 * Math.sin(Math.PI * angle / 180);
                    const x2 = 50 + 50 * Math.cos(Math.PI * (angle + SLICE_DEGREE) / 180);
                    const y2 = 50 + 50 * Math.sin(Math.PI * (angle + SLICE_DEGREE) / 180);
                    return (
                        <g key={`${i}-${s.id}`}>
                            <path d={`M 50 50 L ${x1} ${y1} A 50 50 0 0 1 ${x2} ${y2} Z`} fill={s.bg} stroke="#020617" strokeWidth="0.2" />
                            <text x="78" y="50" fill={s.text} fontSize="2.8" fontWeight="900" textAnchor="middle" transform={`rotate(${angle + SLICE_DEGREE / 2} 50 50)`}>
                                {s.label}
                            </text>
                        </g>
                    );
                })}
            </svg>
          </div>
          
          <div className="absolute inset-0 m-auto w-16 h-16 bg-slate-950 rounded-full border-4 border-slate-700 z-20 flex items-center justify-center shadow-inner">
            <Zap className={isSpinning ? "text-yellow-400 animate-pulse" : "text-sky-400"} />
          </div>
        </div>
      </div>

      <button onClick={spinWheel} disabled={isSpinning || history.length >= CUSTOMER_NAMES.length} className="px-16 py-6 bg-sky-600 rounded-2xl font-black uppercase tracking-[0.2em] shadow-[0_10px_40px_rgba(14,165,233,0.3)] hover:bg-sky-500 transition-all active:scale-95 disabled:opacity-20">
        {isSpinning ? 'SPINNING...' : 'START QUAD DRAW'}
      </button>

      {/* HISTORY LOG */}
      <div className="w-full max-w-6xl mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-20">
          {history.map((w, i) => {
            const isLatestBatch = i < 4;
            return (
              <div 
                key={`${i}-${w.customer}`} 
                className={`relative bg-slate-900/80 backdrop-blur-sm p-4 rounded-xl border-l-4 shadow-lg transition-all duration-500 animate-in slide-in-from-bottom
                  ${isLatestBatch 
                    ? 'ring-2 ring-sky-500/50 scale-105 z-10 shadow-[0_0_20px_rgba(14,165,233,0.3)]' 
                    : 'opacity-60 hover:opacity-100'
                  }`} 
                style={{ borderColor: w.result.bg }}
              >
                {isLatestBatch && (
                  <div className="absolute -top-3 -right-2 bg-sky-500 text-white text-[8px] font-black px-2 py-1 rounded-md shadow-lg animate-bounce uppercase">
                    Latest Winner
                  </div>
                )}
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{w.side} Station</span>
                  <span className="text-[8px] text-slate-600">{w.time}</span>
                </div>
                <p className={`font-black truncate uppercase ${isLatestBatch ? 'text-white text-base' : 'text-slate-400 text-sm'}`}>
                  {w.customer}
                </p>
                <div className="mt-3 flex items-center gap-2">
                   <div className={`w-2 h-2 rounded-full ${isLatestBatch ? 'animate-pulse' : ''}`} style={{ backgroundColor: w.result.bg }} />
                   <p className="text-[10px] font-black uppercase tracking-wider" style={{ color: w.result.bg }}>{w.result.label}</p>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

const Arrow: React.FC<{side: string, color: string, data: Winner | undefined}> = ({ side, color, data }) => {
  const layouts: Record<string, string> = {
    top: "bottom-[96%] left-1/2 -translate-x-1/2 flex-col",
    bottom: "top-[96%] left-1/2 -translate-x-1/2 flex-col-reverse",
    left: "right-[96%] top-1/2 -translate-y-1/2 flex-row",
    right: "left-[96%] top-1/2 -translate-y-1/2 flex-row-reverse"
  };
  const arrows: Record<string, string> = { top: "▼", bottom: "▲", left: "▶", right: "◀" };
  
  return (
    <div className={`absolute flex items-center transition-all duration-700 ${layouts[side]} ${data ? 'opacity-100 scale-100' : 'opacity-10 scale-90'}`}>
      <div className="bg-slate-950/95 backdrop-blur-md border-2 p-3 rounded-xl min-w-[150px] text-center shadow-2xl" style={{ borderColor: color }}>
        <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">{side}</p>
        <p className="text-sm font-black text-white truncate max-w-[130px] uppercase leading-tight">{data?.customer || 'Waiting...'}</p>
        {data && <p className="text-[8px] font-bold mt-2 uppercase px-2 py-0.5 rounded inline-block" style={{ backgroundColor: data.result.bg, color: data.result.text }}>{data.result.label}</p>}
      </div>
      <div className="text-2xl m-0.5 drop-shadow-[0_0_8px_rgba(255,255,255,0.1)]" style={{ color }}>{arrows[side]}</div>
    </div>
  );
};

export default SectorSpinStore;