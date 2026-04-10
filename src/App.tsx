import React, { useState } from 'react';
import { Cpu, Zap, History, Trophy, User, Clock } from 'lucide-react';

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

const SectorSpinStore: React.FC = () => {
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [rotation, setRotation] = useState<number>(0);
  const [activeWinners, setActiveWinners] = useState<Winner[]>([]);
  const [history, setHistory] = useState<Winner[]>([]);

  const SLICE_DEGREE = 360 / VISUAL_WHEEL.length;

  const getPrizeIdForIndex = (index: number): string => {
    if (index < 20) return 'speaker';
    if (index < 40) return 'sandwich';
    if (index < 70) return 'buds';
    if (index < 73) return 'reno';
    if (index < 80) return 'f27';
    return 'none';
  };

  const spinWheel = () => {
    if (isSpinning || history.length >= 116) return;
    setIsSpinning(true);
    
    const primaryIndex = history.length;
    const targetPrizeId = getPrizeIdForIndex(primaryIndex);
    const matchingSlices = VISUAL_WHEEL.map((s, i) => s.id === targetPrizeId ? i : -1).filter(i => i !== -1);
    const targetSliceIndex = matchingSlices[Math.floor(Math.random() * matchingSlices.length)];

    const extraSpins = 360 * 8; 
    const currentRotMod = rotation % 360;
    
    // LANDING CENTERED LOGIC: ensure it lands in center of slice
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
          
          const prize = (side === 'top') 
            ? VISUAL_WHEEL.find(s => s.id === getPrizeIdForIndex(currentDrawIndex))!
            : VISUAL_WHEEL[visualIndex % VISUAL_WHEEL.length];

          results.push({ 
            side, 
            result: prize, 
            customer: CUSTOMER_NAMES[currentDrawIndex], 
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
          });
        }
      });

      setActiveWinners(results);
      setHistory(prev => [...results, ...prev]);
    }, 4000);
  };

  return (
    <div className="bg-[#020617] min-h-screen text-slate-100 flex flex-col items-center p-4">
      <nav className="w-full max-w-6xl flex justify-between items-center py-6 border-b border-white/5">
        <h1 className="font-black italic text-sky-500 text-2xl tracking-tighter flex items-center gap-3">
          <div className="p-2 bg-sky-500/10 rounded-lg"><Cpu size={24} /></div>
          OPPO ELITE 116
        </h1>
        <div className="text-right">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Draw Progress</p>
          <p className="text-xl font-black text-sky-400">{history.length} <span className="text-slate-700">/ 116</span></p>
        </div>
      </nav>

      <div className="relative mt-32 mb-32">
        <Arrow side="top" color="#3b82f6" data={activeWinners.find(w => w.side === 'top')} />
        <Arrow side="right" color="#f59e0b" data={activeWinners.find(w => w.side === 'right')} />
        <Arrow side="bottom" color="#ef4444" data={activeWinners.find(w => w.side === 'bottom')} />
        <Arrow side="left" color="#10b981" data={activeWinners.find(w => w.side === 'left')} />

        <div className="relative w-[320px] h-[320px] md:w-[500px] md:h-[500px] rounded-full p-2 bg-slate-800 shadow-[0_0_80px_rgba(0,0,0,0.8)]">
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
            <Zap size={30} className="text-sky-400 fill-sky-400" />
          </div>
        </div>
      </div>

      <button onClick={spinWheel} disabled={isSpinning || history.length >= 116}
              className="px-20 py-5 bg-sky-600 hover:bg-sky-500 rounded-xl font-black uppercase tracking-[0.4em] text-xs shadow-2xl transition-all active:scale-95 disabled:opacity-20 mb-20">
        {isSpinning ? 'SYSTEM SPINNING...' : history.length >= 116 ? 'CAMPAIGN COMPLETE' : 'ENGAGE DRAW'}
      </button>

      <div className="w-full max-w-6xl mb-20">
        <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-sky-500/10 rounded-lg text-sky-500"><History size={20}/></div>
            <h2 className="text-xl font-black uppercase tracking-widest italic">Live Winner Dashboard</h2>
        </div>
        {history.length === 0 ? (
            <div className="w-full p-12 border-2 border-dashed border-white/5 rounded-3xl flex flex-col items-center justify-center text-slate-600">
                <Trophy size={48} className="mb-4 opacity-20"/>
                <p className="font-bold uppercase tracking-widest text-sm text-center leading-relaxed">System Ready.<br/>Awaiting first elite engagement.</p>
            </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {history.map((winner, idx) => (
                    <div key={idx} className="bg-white/5 border border-white/10 p-5 rounded-2xl flex items-center justify-between group hover:bg-sky-500/10 hover:border-sky-500/30 transition-all">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-sky-500">
                                <User size={18}/>
                            </div>
                            <div>
                                <p className="text-sm font-black text-white uppercase truncate max-w-[150px]">{winner.customer}</p>
                                <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500">
                                    <Clock size={10}/> {winner.time} • {winner.side.toUpperCase()}
                                </div>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Awarded</p>
                            <p className="text-xs font-black text-sky-400 group-hover:text-sky-300 transition-colors">{winner.result.label}</p>
                        </div>
                    </div>
                ))}
            </div>
        )}
      </div>
    </div>
  );
};

// --- SUB-COMPONENT ---
interface ArrowProps {
  side: 'top' | 'right' | 'bottom' | 'left';
  color: string;
  data: Winner | undefined;
}

const Arrow: React.FC<ArrowProps> = ({ side, color, data }) => {
  const pos = {
    top: "top-[-110px] left-1/2 -translate-x-1/2 flex-col",
    bottom: "bottom-[-110px] left-1/2 -translate-x-1/2 flex-col-reverse",
    left: "left-[-190px] top-1/2 -translate-y-1/2 flex-row",
    right: "right-[-190px] top-1/2 -translate-y-1/2 flex-row-reverse",
  };

  const triangleStyle: Record<string, React.CSSProperties> = {
    top: { borderLeft: '12px solid transparent', borderRight: '12px solid transparent', borderTop: `16px solid ${color}`, marginTop: '-2px' },
    bottom: { borderLeft: '12px solid transparent', borderRight: '12px solid transparent', borderBottom: `16px solid ${color}`, marginBottom: '-2px' },
    left: { borderTop: '12px solid transparent', borderBottom: '12px solid transparent', borderLeft: `16px solid ${color}`, marginLeft: '-2px' },
    right: { borderTop: '12px solid transparent', borderBottom: '12px solid transparent', borderRight: `16px solid ${color}`, marginRight: '-2px' }
  };

  return (
    <div className={`absolute z-50 flex items-center justify-center transition-all duration-700 ${pos[side]} ${data ? 'opacity-100 scale-110' : 'opacity-30 scale-95'}`}>
      <div className="bg-slate-900 border-2 px-5 py-3 rounded-xl min-w-[170px] text-center shadow-[0_10px_30px_rgba(0,0,0,0.5)]" style={{ borderColor: color }}>
        <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">
            {data ? "SECURED DRAW" : `${side.toUpperCase()} SECTOR`}
        </p>
        <p className="text-xs font-black text-white uppercase truncate max-w-[140px]">
            {data ? data.customer : '---'}
        </p>
        {data && <p className="text-[10px] font-black text-sky-400 mt-1">{data.result.label}</p>}
      </div>
      <div style={triangleStyle[side]} className="drop-shadow-xl" />
    </div>
  );
};

export default SectorSpinStore;