import React, { useState, useEffect, useRef } from 'react';
import { Zap, RotateCcw, FileJson, FileSpreadsheet, FolderInput } from 'lucide-react';
import confetti from 'canvas-confetti';

const MASTER_SCRIPT = [
  { name: "JIBANANANDA MALLIK", gift: "Soundbar", color: "#06b6d4" },
  { name: "ABHISHEK PATTANAIK", gift: "A3 Pro", color: "#3b82f6" },
  { name: "DIPAK KUMAR DAS", gift: "Buds 3 Pro+", color: "#10b981" },
  { name: "UJWAL KUMAR PADHY", gift: "Better Luck", color: "#64748b" },
  { name: "RAJENDRA NARAYAN SINGH", gift: "Reno12 Pro", color: "#8b5cf6" },
  { name: "SOUBHAGYA KUMAR SAHOO", gift: "Blender", color: "#f59e0b" },
  { name: "KARAN KUMAR SARANGI", gift: "A6x 5G", color: "#3b82f6" },
  { name: "PINTU DEHURY", gift: "Better Luck", color: "#64748b" },
  { name: "JIBAN KUMAR BEHERA", gift: "F27", color: "#ef4444" },
  { name: "BIKASH JENA", gift: "Buds 3 Pro+", color: "#10b981" },
  { name: "SOUMYA RANJAN RATH", gift: "Soundbar", color: "#06b6d4" },
  { name: "CHANDAN BEHERA", gift: "Blender", color: "#f59e0b" },
  { name: "BISWAJEET DHAL", gift: "A3x 5G", color: "#3b82f6" },
  { name: "AMAN KUMAR SAHU", gift: "Headphone", color: "#6366f1" },
  { name: "MILI BEHERA", gift: "F27", color: "#ef4444" },
  { name: "NIRANJAN PARIDA", gift: "Buds 3 Pro+", color: "#10b981" },
  { name: "RATIKANTA BISWAL", gift: "A6x 5G", color: "#3b82f6" },
  { name: "SANTANU KUMAR SUBUDHI", gift: "Better Luck", color: "#64748b" },
  { name: "MUNA BANCHHOR", gift: "Soundbar", color: "#06b6d4" },
  { name: "KUNDAN NAIK", gift: "Airfryer", color: "#ec4899" },
  { name: "BISWAKALYAN MOHANTY", gift: "Buds 3 Pro+", color: "#10b981" },
  { name: "DEBU KUMAR DUTTA", gift: "A3x 5G", color: "#3b82f6" },
  { name: "SUBRAT KUMAR DAS", gift: "Blender", color: "#f59e0b" },
  { name: "RAJU MEHETA", gift: "Reno12 Pro", color: "#8b5cf6" },
  { name: "ANIL KUMAR PANDA", gift: "Headphone", color: "#6366f1" },
  { name: "BARSHA RANI NAYAK", gift: "A6x 5G", color: "#3b82f6" },
  { name: "BISHNU KUMAR GIRI", gift: "Buds 3 Pro+", color: "#10b981" },
  { name: "PRANAB KUMAR JYOTISH", gift: "Soundbar", color: "#06b6d4" },
  { name: "DAVID MISHRA", gift: "Better Luck", color: "#64748b" },
  { name: "SANGRAM BEHERA", gift: "F27 Pro+", color: "#ef4444" },
  { name: "PRAMOD KUMAR SAHOO", gift: "Buds 3 Pro+", color: "#10b981" },
  { name: "RAJENDRA BEHERA", gift: "A6x 5G", color: "#3b82f6" },
  { name: "SACHIDANAND SETH", gift: "Better Luck", color: "#64748b" },
  { name: "D TEJESWAR RAO", gift: "Headphone", color: "#6366f1" },
  { name: "BRUNDAWAN DAS", gift: "F29 Pro", color: "#ef4444" },
  { name: "ALOK RANJAN ROUT", gift: "Buds 3 Pro+", color: "#10b981" },
  { name: "SUNIL KUMAR NAYAK", gift: "Soundbar", color: "#06b6d4" },
  { name: "RASBIHARI DAS", gift: "Better Luck", color: "#64748b" },
  { name: "RAJU MOHAPATRA", gift: "A6x 5G", color: "#3b82f6" },
  { name: "ANUPAMA PANDA", gift: "Blender", color: "#f59e0b" },
  { name: "RAKESH KARA", gift: "Buds 3 Pro+", color: "#10b981" },
  { name: "DEBIPRASAD MAHATTARAY", gift: "Soundbar", color: "#06b6d4" },
  { name: "PURUSHOTTAM BISWAL", gift: "Better Luck", color: "#64748b" },
  { name: "RINKU SHARMA", gift: "Reno14", color: "#8b5cf6" },
  { name: "KISHORI MAHAPATRA", gift: "Blender", color: "#f59e0b" },
  { name: "DAMBARUDHAR SAHOO", gift: "Buds 3 Pro+", color: "#10b981" },
  { name: "ALOK SAHU", gift: "F27 Pro+", color: "#ef4444" },
  { name: "K GIRIJA SHANKAR PATRA", gift: "Headphone", color: "#6366f1" },
  { name: "BIBHUTI BHUSAN PATRA", gift: "Better Luck", color: "#64748b" },
  { name: "KUMAR CHAND PATTNAIK", gift: "Soundbar", color: "#06b6d4" },
  { name: "JITENDRA SAHOO", gift: "A3x 5G", color: "#3b82f6" },
  { name: "SANJIB KUMAR RAM", gift: "Buds 3 Pro+", color: "#10b981" },
  { name: "BANSHI DHAR DAS", gift: "Soundbar", color: "#06b6d4" },
  { name: "ABDUL SARIF KHAN", gift: "Better Luck", color: "#64748b" },
  { name: "AKSHAYA KUMAR PRUSTY", gift: "Blender", color: "#f59e0b" },
  { name: "MONALISHA NAYAK", gift: "Buds 3 Pro+", color: "#10b981" },
  { name: "PRUTHIRAJ PANDA", gift: "Soundbar", color: "#06b6d4" },
  { name: "PRIYABRAT MOHANTY", gift: "Better Luck", color: "#64748b" },
  { name: "DIBYA RANJAN ROUT", gift: "Buds 3 Pro+", color: "#10b981" },
  { name: "RANJIT KUMAR NAYAK", gift: "A6x 5G", color: "#3b82f6" },
  { name: "AMITABH PATTANAIK", gift: "Blender", color: "#f59e0b" },
  { name: "SURAJ KUMAR MOHAPATRA", gift: "Airfryer", color: "#ec4899" },
  { name: "BISWAJEET BISWAS", gift: "Buds 3 Pro+", color: "#10b981" },
  { name: "MANOJ KUMAR SAHU", gift: "Airfryer", color: "#ec4899" },
  { name: "A MANOJ KUMAR", gift: "Better Luck", color: "#64748b" },
  { name: "ASHOK KUMAR JENA", gift: "Better Luck", color: "#64748b" },
  { name: "AMIT KUMAR PANDA", gift: "A6x 5G", color: "#3b82f6" },
  { name: "DEEPAK KUMAR MALLICK", gift: "Buds 3 Pro+", color: "#10b981" },
  { name: "BINAYA KUMAR NAYAK", gift: "Soundbar", color: "#06b6d4" },
  { name: "SANTOSH SWAIN", gift: "Better Luck", color: "#64748b" },
  { name: "GOURAHARI DAS", gift: "A6x 5G", color: "#3b82f6" },
  { name: "MANORANJAN SAHOO", gift: "Airfryer", color: "#ec4899" },
  { name: "ASHIT KUMAR PATRA", gift: "Buds 3 Pro+", color: "#10b981" },
  { name: "PABITRA KUMAR DAS", gift: "Headphone", color: "#6366f1" },
  { name: "AJAY KUMAR BEHERA", gift: "Better Luck", color: "#64748b" },
  { name: "BISWAJIT SAHOO", gift: "F27", color: "#ef4444" },
  { name: "KARTIK CHANDRA SAHOO", gift: "Buds 3 Pro+", color: "#10b981" },
  { name: "DILLIP KUMAR DAS", gift: "Headphone", color: "#6366f1" },
  { name: "MANOJ KUMAR GOUDA", gift: "Better Luck", color: "#64748b" },
  { name: "ABHISHEKH NAYAK", gift: "A6x 5G", color: "#3b82f6" },
  { name: "CHITARANJAN BEHURA", gift: "Buds 3 Pro+", color: "#10b981" },
  { name: "DIPTIRANJAN SAHOO", gift: "Airfryer", color: "#ec4899" },
  { name: "ANANTA NARAYAN PANDA", gift: "Better Luck", color: "#64748b" },
  { name: "SRIKANTA KUMAR SAHOO", gift: "Soundbar", color: "#06b6d4" },
  { name: "LAXMIKANTA SAHOO", gift: "Buds 3 Pro+", color: "#10b981" },
  { name: "TAPAS KUMAR SUBUDHI", gift: "Airfryer", color: "#ec4899" },
  { name: "PURUSOTTAM BAGARTI", gift: "Better Luck", color: "#64748b" },
  { name: "BIKASH SATAPATHY", gift: "Blender", color: "#f59e0b" },
  { name: "BAPI BEHERA", gift: "Buds 3 Pro+", color: "#10b981" },
  { name: "MUKESH KUMAR PATRA", gift: "Soundbar", color: "#06b6d4" },
  { name: "ASHISH KALSAI", gift: "Better Luck", color: "#64748b" },
  { name: "PRIYARANJAN SWAIN", gift: "Headphone", color: "#6366f1" },
  { name: "ALOKA KUMAR PRADHAN", gift: "Buds 3 Pro+", color: "#10b981" },
  { name: "RINKU RANJER BEHERA", gift: "Airfryer", color: "#ec4899" },
  { name: "BANSHI LOCHAN BARIK", gift: "Soundbar", color: "#06b6d4" },
  { name: "VIKASH PRASAD", gift: "Buds 3 Pro+", color: "#10b981" },
  { name: "PRIYARANJAN SAHOO", gift: "Airfryer", color: "#ec4899" },
  { name: "BINAYA RANJAN SARANGI", gift: "A6x 5G", color: "#3b82f6" },
  { name: "MANI NAYAK", gift: "Buds 3 Pro+", color: "#10b981" },
  { name: "RAMA CHANDRA NAHAK", gift: "Headphone", color: "#6366f1" },
  { name: "SANTOSH SAHU", gift: "Headphone", color: "#6366f1" },
  { name: "SIDHANTA SUNA", gift: "Buds 3 Pro+", color: "#10b981" },
  { name: "NITYANANDA MAHARANA", gift: "Soundbar", color: "#06b6d4" },
  { name: "BISWA BIJAYI HIMADRI PRASAD", gift: "Better Luck", color: "#64748b" },
  { name: "ANIL KUMAR SANBAD", gift: "Buds 3 Pro+", color: "#10b981" },
  { name: "CHITARANJAN BARAD", gift: "Airfryer", color: "#ec4899" },
  { name: "PUPUN CHINERA", gift: "Soundbar", color: "#06b6d4" },
  { name: "JOGENDRA BEHERA", gift: "Blender", color: "#f59e0b" },
  { name: "BADAL PANI", gift: "Airfryer", color: "#ec4899" },
  { name: "JITENDRA BARALA", gift: "Headphone", color: "#6366f1" },
  { name: "KAIBALYA KUMAR JENA", gift: "Buds 3 Pro+", color: "#10b981" },
  { name: "MD NIZAMUDDIN KHAN", gift: "Blender", color: "#f59e0b" },
  { name: "MAHESH KUMAR JENA", gift: "Buds 3 Pro+", color: "#10b981" },
  { name: "BIJAY KUMAR SENAPATI", gift: "Buds 3 Pro+", color: "#10b981" },
  { name: "PRAKASH KUMAR SAHOO", gift: "Buds 3 Pro+", color: "#10b981" }
];

const SectorSpinStore = () => {
  const [history, setHistory] = useState(() => JSON.parse(localStorage.getItem('spin_history') || '[]'));
  const [currentIndex, setCurrentIndex] = useState(() => parseInt(localStorage.getItem('spin_index') || '0'));
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [activeWinners, setActiveWinners] = useState([]);
  const [displayGifts, setDisplayGifts] = useState(Array(20).fill("..."));
  
  const fileInputRef = useRef(null);

  // --- SAVE LOGIC ---
  const saveToFile = async (data, filename, type) => {
    try {
      if ('showSaveFilePicker' in window) {
        const handle = await window.showSaveFilePicker({
          suggestedName: filename,
          types: [{
            description: type === 'text/csv' ? 'CSV File' : 'JSON File',
            accept: { [type]: [type === 'text/csv' ? '.csv' : '.json'] },
          }],
        });
        const writable = await handle.createWritable();
        await writable.write(data);
        await writable.close();
      } else {
        const blob = new Blob([data], { type });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        link.click();
        URL.revokeObjectURL(url);
      }
    } catch (err) {
      if (err.name !== 'AbortError') console.error("Export failed", err);
    }
  };

  const handleExportJSON = () => {
    const content = JSON.stringify(history, null, 2);
    saveToFile(content, `Winners_${new Date().toLocaleDateString()}.json`, 'application/json');
  };

  const handleExportCSV = () => {
    if (history.length === 0) return;
    const headers = "Customer,Gift,Color,Timestamp\n";
    const body = history.map(w => `"${w.customer}","${w.gift}","${w.color}","${new Date(w.keyId).toLocaleString()}"`).join("\n");
    saveToFile(headers + body, `Winners_${new Date().toLocaleDateString()}.csv`, 'text/csv');
  };

  // --- RESTORE LOGIC ---
  const handleRestoreJSON = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedData = JSON.parse(e.target.result);
        if (Array.isArray(importedData)) {
            if (window.confirm(`Found ${importedData.length} winners. Overwrite current progress?`)) {
                setHistory(importedData);
                const newIdx = importedData.length;
                setCurrentIndex(newIdx);
                localStorage.setItem('spin_history', JSON.stringify(importedData));
                localStorage.setItem('spin_index', newIdx.toString());
                alert("Progress Restored Successfully!");
            }
        } else {
            alert("Invalid file format.");
        }
      } catch (err) {
        alert("Error reading file.");
      }
    };
    reader.readAsText(file);
    event.target.value = ''; 
  };

  // --- SPIN LOGIC ---
  const spinWheel = () => {
    if (isSpinning || currentIndex >= MASTER_SCRIPT.length) return;
    setIsSpinning(true);
    setActiveWinners([]); 

    const targetSliceIndices = [0, 5, 10, 15]; 
    const stations = ['top', 'right', 'bottom', 'left'];
    const sessionWinners = [];
    const newLabels = [...displayGifts];

    for (let j = 0; j < 20; j++) {
      newLabels[j] = MASTER_SCRIPT[Math.floor(Math.random() * MASTER_SCRIPT.length)].gift;
    }

    for (let i = 0; i < 4; i++) {
      const scriptIdx = currentIndex + i;
      if (scriptIdx < MASTER_SCRIPT.length) {
        const entry = MASTER_SCRIPT[scriptIdx];
        newLabels[targetSliceIndices[i]] = entry.gift; 

        sessionWinners.push({
          side: stations[i],
          customer: entry.name,
          gift: entry.gift,
          color: entry.color,
          keyId: Date.now() + i
        });
      }
    }

    setDisplayGifts(newLabels);

    // EXACT ALIGNMENT CALCULATION:
    // Each slice is 18°. SVG text is at the 9° (middle) mark of slice[0].
    // To bring slice[0]'s middle to exactly 0° (Top), we rotate to -9°.
    const sliceWidth = 18;
    const centerOffset = sliceWidth / 2;
    const extraSpins = 10 * 360; 
    const targetRotation = extraSpins - centerOffset;

    // Ensure we always rotate forward from current position
    const baseRotation = Math.ceil(rotation / 360) * 360;
    setRotation(baseRotation + targetRotation);

    setTimeout(() => {
      setIsSpinning(false);
      confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
      setActiveWinners(sessionWinners);

      setHistory(prev => {
        const updated = [...sessionWinners, ...prev];
        localStorage.setItem('spin_history', JSON.stringify(updated));
        return updated;
      });

      const nextIdx = currentIndex + 4;
      setCurrentIndex(nextIdx);
      localStorage.setItem('spin_index', nextIdx.toString());
    }, 4000);
  };

  const reset = () => {
    if (window.confirm("Clear all winners and start over?")) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div className="bg-[#020617] min-h-screen text-slate-100 p-8 flex flex-col items-center font-sans">
      <div className="w-full max-w-5xl flex justify-between items-center mb-8">
        <h1 className="text-3xl font-black italic uppercase tracking-tighter">Sector<span className="text-sky-500">Spin</span></h1>
        
        <div className="flex gap-4 items-center">
            <div className="flex bg-slate-900 border border-slate-800 rounded-xl p-1 shadow-lg">
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleRestoreJSON} 
                  accept=".json" 
                  className="hidden" 
                />
                <button onClick={() => fileInputRef.current.click()}
                   className="flex items-center gap-2 px-3 py-1.5 text-[10px] font-black hover:bg-slate-800 rounded-lg transition-all uppercase text-sky-400">
                    <FolderInput size={14}/> Restore
                </button>
                <div className="w-[1px] bg-slate-800 mx-1"></div>
                <button onClick={handleExportJSON} disabled={history.length === 0} 
                   className="flex items-center gap-2 px-3 py-1.5 text-[10px] font-black hover:bg-slate-800 rounded-lg transition-all disabled:opacity-20 uppercase">
                    <FileJson size={14} className="text-amber-500"/> JSON
                </button>
                <button onClick={handleExportCSV} disabled={history.length === 0}
                   className="flex items-center gap-2 px-3 py-1.5 text-[10px] font-black hover:bg-slate-800 rounded-lg transition-all disabled:opacity-20 uppercase border-l border-slate-800">
                    <FileSpreadsheet size={14} className="text-emerald-500"/> CSV
                </button>
            </div>

            <span className="text-[10px] font-bold text-slate-500 bg-slate-900 px-4 py-1.5 rounded-full border border-slate-800 uppercase">
                Left: {MASTER_SCRIPT.length - Math.min(currentIndex, MASTER_SCRIPT.length)}
            </span>
            <button onClick={reset} className="text-red-400 font-bold text-[10px] flex items-center gap-2 border border-red-900/40 px-3 py-1.5 rounded hover:bg-red-950/30 transition-colors">
                <RotateCcw size={12}/> RESET
            </button>
        </div>
      </div>

      <div className="relative my-24 scale-110">
        {['top', 'right', 'bottom', 'left'].map((side) => {
          const win = activeWinners.find(w => w.side === side);
          const accentColor = win?.color || '#1e293b';
          
          return (
            <div key={side} className={`absolute z-30 transition-all duration-700 ${
              side === 'top' ? 'bottom-[100%] left-1/2 -translate-x-1/2 mb-12' : 
              side === 'bottom' ? 'top-[100%] left-1/2 -translate-x-1/2 mt-12' :
              side === 'left' ? 'right-[100%] top-1/2 -translate-y-1/2 mr-12' : 
              'left-[100%] top-1/2 -translate-y-1/2 ml-12'
            } ${win ? 'opacity-100 scale-100' : 'opacity-20 scale-90'}`}>
              
              <div className="bg-slate-900 border-2 p-3 rounded-2xl w-44 text-center shadow-2xl relative" style={{ borderColor: accentColor }}>
                <p className="text-[8px] font-black text-slate-500 uppercase mb-1 tracking-widest">{side} station</p>
                <p className="font-bold text-[11px] truncate uppercase mb-2 text-white">{win?.customer || 'Waiting...'}</p>
                <div className="text-[10px] font-black uppercase py-2 rounded-lg text-white" style={{ backgroundColor: accentColor }}>
                  {win?.gift || '---'}
                </div>
                <div className={`absolute w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent ${
                  side === 'top' ? 'border-t-[20px] top-full left-1/2 -translate-x-1/2' :
                  side === 'bottom' ? 'border-b-[20px] bottom-full left-1/2 -translate-x-1/2 rotate-180' :
                  side === 'left' ? 'border-t-[20px] left-full top-1/2 -translate-y-1/2 -rotate-90 ml-2' :
                  'border-t-[20px] right-full top-1/2 -translate-y-1/2 rotate-90 mr-2'
                }`} style={{ borderTopColor: accentColor }}></div>
              </div>
            </div>
          );
        })}

        <div className="w-[480px] h-[480px] rounded-full border-[12px] border-slate-900 bg-slate-950 relative shadow-[0_0_120px_rgba(0,0,0,1)] overflow-hidden">
          <div 
            className="w-full h-full transition-transform duration-[4000ms]" 
            style={{ 
                transform: `rotate(${rotation}deg)`,
                transitionTimingFunction: 'cubic-bezier(0.15, 0, 0.15, 1)' 
            }}>
            <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
              {[...Array(20)].map((_, i) => {
                const angle = i * 18;
                const x1 = 50 + 50 * Math.cos(angle * Math.PI / 180);
                const y1 = 50 + 50 * Math.sin(angle * Math.PI / 180);
                const x2 = 50 + 50 * Math.cos((angle + 18) * Math.PI / 180);
                const y2 = 50 + 50 * Math.sin((angle + 18) * Math.PI / 180);
                return (
                  <g key={i}>
                    <path d={`M 50 50 L ${x1} ${y1} A 50 50 0 0 1 ${x2} ${y2} Z`} 
                      fill={i % 2 === 0 ? "#0f172a" : "#1e293b"} stroke="#020617" strokeWidth="0.1" />
                    <text x="78" y="50" fill="white" fontSize="2.3" fontWeight="900" textAnchor="middle" 
                      transform={`rotate(${angle + 9} 50 50)`}>
                      {displayGifts[i]}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
          <div className="absolute inset-0 m-auto w-24 h-24 bg-slate-950 rounded-full border-4 border-slate-800 z-10 flex items-center justify-center shadow-inner">
             <Zap className={isSpinning ? "text-yellow-400 animate-pulse" : "text-sky-500"} size={44} />
          </div>
        </div>
      </div>

      <button onClick={spinWheel} disabled={isSpinning || currentIndex >= MASTER_SCRIPT.length}
        className="px-24 py-7 bg-sky-600 rounded-3xl font-black uppercase tracking-[0.3em] shadow-2xl hover:bg-sky-500 active:scale-95 disabled:opacity-20 transition-all border-b-8 border-sky-800 text-xl mb-16">
        {isSpinning ? 'SPINNING...' : 'START DRAW'}
      </button>

      <div className="w-full max-w-6xl px-4">
        <h2 className="text-xs font-black uppercase tracking-[0.4em] mb-8 text-slate-500 border-b border-slate-800 pb-4 text-center">Batch History</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 pb-24">
            {history.map((w, i) => (
            <div key={w.keyId || i} className="bg-slate-900/40 p-3 rounded-xl border-l-4 shadow-sm backdrop-blur-sm" style={{ borderColor: w.color }}>
                <p className="font-bold text-[9px] truncate text-white uppercase mb-1">{w.customer}</p>
                <p className="text-[8px] font-black uppercase tracking-tighter" style={{ color: w.color }}>{w.gift}</p>
            </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default SectorSpinStore;