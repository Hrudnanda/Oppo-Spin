import { useState, useEffect } from 'react';
import { User, Gift, RotateCw } from 'lucide-react';

// 1. Participant List (115 Names)
const PARTICIPANTS = [
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
  "PRANAB KUMAR JYOTISH", "PURUSHOTTAM BAGARTI", "RAJENDRA NARAYAN SINGH", "RAJU MEHETA", "RAKESH KARA",
  "RINKU SHARMA", "SACHCHIDANAND SETH", "SIDHANTA SUNA", "SUNIL KUMAR NAYAK", "SURAJ KUMAR MOHAPATRA", "VIKASH PRASAD"
];

// 2. Prize Allocation (80 Total)
const GIFT_POOL = [
  ...Array(20).fill("SPEAKER"),
  ...Array(20).fill("SANDWICH MAKER"),
  ...Array(30).fill("BUDS 3 PRO+"),
  ...Array(3).fill("RENO 12 PRO"),
  ...Array(7).fill("F27")
];

// 3. Wheel Sectors (Styling based on provided reference)
const SECTORS = [
  { label: "RENO 12 PRO", color: "#4a86e8", text: "white" },
  { label: "BETTER LUCK", color: "#e03a3e", text: "white" },
  { label: "SPEAKER",    color: "#0a0a0a", text: "white" },
  { label: "BUDS 3 PRO+", color: "#ffffff", text: "black" },
  { label: "F27",         color: "#4a86e8", text: "white" },
  { label: "BETTER LUCK", color: "#e03a3e", text: "white" },
  { label: "SANDWICH",    color: "#0a0a0a", text: "white" },
  { label: "BUDS 3 PRO+", color: "#ffffff", text: "black" },
  { label: "BETTER LUCK", color: "#e03a3e", text: "white" },
  { label: "SPEAKER",     color: "#0a0a0a", text: "white" },
];

export default function OppoLuckyDraw() {
  const [mustSpin, setMustSpin] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [participantPool, setParticipantPool] = useState([]);
  const [giftPool, setGiftPool] = useState([]);
  const [winners, setWinners] = useState([]);
  const [history, setHistory] = useState([]);

  // Initialize data
  useEffect(() => {
    setParticipantPool(PARTICIPANTS.map((name, i) => ({ id: i, name, used: false })));
    setGiftPool([...GIFT_POOL].sort(() => Math.random() - 0.5));
  }, []);

  const spinWheel = () => {
    const available = participantPool.filter(p => !p.used);
    if (mustSpin || available.length < 4) return;

    setMustSpin(true);
    setWinners([]);

    const newDegrees = rotation + (360 * 10) + Math.floor(Math.random() * 360);
    setRotation(newDegrees);

    setTimeout(() => {
      const selected = [...available].sort(() => 0.5 - Math.random()).slice(0, 4);
      
      const drawResults = selected.map(person => {
        const prize = giftPool.length > 0 ? giftPool[0] : "BETTER LUCK NEXT TIME";
        if (giftPool.length > 0) setGiftPool(prev => prev.slice(1));
        return { ...person, prize };
      });

      setParticipantPool(prev => prev.map(p => 
        drawResults.find(r => r.id === p.id) ? { ...p, used: true } : p
      ));

      setWinners(drawResults);
      setHistory(prev => [...drawResults, ...prev]);
      setMustSpin(false);
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white p-8 flex flex-col items-center">
      
      {/* Header */}
      <div className="w-full max-w-6xl flex justify-between items-center mb-10 border-b border-white/10 pb-4">
        <h1 className="text-xl font-black tracking-tighter text-blue-500 uppercase flex items-center gap-2">
          OPPO LUCKY DRAW 2026
        </h1>
        <div className="flex items-center gap-4">
          <div className="bg-blue-600/20 px-4 py-1 rounded-full border border-blue-500/30 text-[10px] font-bold text-blue-400">
            GIFTS LEFT: {giftPool.length} / 80
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-20 items-center justify-center w-full max-w-7xl">
        
        {/* Wheel Display */}
        <div className="flex flex-col items-center gap-10">
          <div className="relative flex items-center justify-center w-[340px] h-[340px] lg:w-[520px] lg:h-[520px]">
            
            {/* Active Winner Tags */}
            {winners.length === 4 && (
              <div className="absolute inset-0 z-40 pointer-events-none">
                <ResultCard winner={winners[0]} pos="top-[-30px] left-1/2 -translate-x-1/2" border="border-blue-500" />
                <ResultCard winner={winners[1]} pos="bottom-[-30px] left-1/2 -translate-x-1/2" border="border-red-500" />
                <ResultCard winner={winners[2]} pos="left-[-40px] top-1/2 -translate-y-1/2" border="border-green-500" />
                <ResultCard winner={winners[3]} pos="right-[-40px] top-1/2 -translate-y-1/2" border="border-orange-500" />
              </div>
            )}

            {/* Spinning Element */}
            <div 
              className="w-full h-full rounded-full border-[10px] border-black shadow-2xl relative overflow-hidden transition-all duration-[4000ms] cubic-bezier(0.1, 0, 0.1, 1)"
              style={{ transform: `rotate(${rotation}deg)` }}
            >
              {SECTORS.map((sector, i) => {
                const step = 360 / SECTORS.length;
                return (
                  <div key={i} className="absolute inset-0">
                    <div 
                      className="absolute top-0 left-1/2 w-1/2 h-1/2 origin-bottom-left"
                      style={{ 
                        backgroundColor: sector.color, 
                        transform: `rotate(${i * step}deg) skewY(-${90 - step}deg)` 
                      }}
                    />
                    <div 
                      className="absolute top-0 left-1/2 w-[80px] h-1/2 -translate-x-1/2 origin-bottom flex flex-col items-center pt-8 lg:pt-14"
                      style={{ transform: `rotate(${i * step + step / 2}deg)` }}
                    >
                      <span className={`font-black text-[9px] lg:text-[11px] uppercase tracking-tighter ${sector.text === 'black' ? 'text-black' : 'text-white'}`} style={{ writingMode: 'vertical-rl', textOrientation: 'upright' }}>
                        {sector.label}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* Hub */}
            <div className="absolute z-10 w-20 h-20 rounded-full bg-[#020617] border-4 border-[#1e293b] flex items-center justify-center">
              <div className="w-5 h-5 bg-blue-600 rounded-full animate-pulse" />
            </div>
          </div>

          <button 
            onClick={spinWheel}
            disabled={mustSpin}
            className="flex items-center gap-3 px-20 py-5 bg-blue-600 rounded-2xl font-black uppercase tracking-[0.4em] text-black hover:bg-blue-400 transition-all shadow-xl disabled:bg-neutral-800 disabled:text-neutral-500"
          >
            <RotateCw size={20} className={mustSpin ? "animate-spin" : ""} />
            {mustSpin ? "DRAWING..." : "ENGAGE CIRCUIT"}
          </button>
        </div>

        {/* Winner History Sidebar */}
        <div className="w-full lg:w-[400px] bg-slate-900/50 border border-white/5 rounded-[2rem] p-8 h-[520px] flex flex-col backdrop-blur-md">
          <h2 className="text-[10px] font-black uppercase tracking-widest text-neutral-500 mb-6 flex items-center gap-2">
             RECENT ACTIVITY
          </h2>
          <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
            {history.map((h, idx) => (
              <div key={idx} className="bg-white/5 p-4 rounded-xl flex items-center justify-between border border-white/5 animate-in slide-in-from-right">
                <div className="flex items-center gap-3">
                  <User size={14} className="text-blue-500" />
                  <span className="text-xs font-bold text-white truncate w-32">{h.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Gift size={12} className={h.prize.includes("LUCK") ? "text-red-500" : "text-green-500"} />
                  <span className="text-[10px] font-black uppercase tracking-tighter text-blue-400">
                    {h.prize.length > 10 ? "BLNT" : h.prize}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

function ResultCard({ winner, pos, border }) {
  return (
    <div className={`absolute ${pos} bg-black/95 border-2 ${border} px-8 py-3 rounded-xl shadow-2xl z-50 animate-bounce`}>
      <p className="text-[10px] font-black text-white text-center uppercase">{winner.name}</p>
      <p className="text-[9px] font-bold text-blue-400 text-center uppercase mt-1">{winner.prize}</p>
    </div>
  );
}