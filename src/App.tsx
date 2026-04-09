import React, { useState, useEffect } from 'react';
import { User, Gift, RotateCw, History } from 'lucide-react';

// 1. Participant List (115 Unique Names)
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

// 2. Gift Inventory (Total: 80)
const GIFT_POOL = [
  ...Array(20).fill("SPEAKER"),
  ...Array(20).fill("SANDWICH MAKER"),
  ...Array(30).fill("BUDS 3 PRO+"),
  ...Array(3).fill("RENO 12 PRO"),
  ...Array(7).fill("F27")
];

// 3. Wheel Sectors based on reference style
const WHEEL_DATA = [
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
  const [participants, setParticipants] = useState([]);
  const [prizes, setPrizes] = useState([]);
  const [currentWinners, setCurrentWinners] = useState([]);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    setParticipants(PARTICIPANTS.map((name, i) => ({ id: i, name, claimed: false })));
    setPrizes([...GIFT_POOL].sort(() => Math.random() - 0.5));
  }, []);

  const startSpin = () => {
    const available = participants.filter(p => !p.claimed);
    if (mustSpin || available.length < 4) return;

    setMustSpin(true);
    setCurrentWinners([]);

    const newRotation = rotation + (360 * 10) + Math.floor(Math.random() * 360);
    setRotation(newRotation);

    setTimeout(() => {
      const selected = [...available].sort(() => 0.5 - Math.random()).slice(0, 4);
      
      const drawResults = selected.map((person) => {
        // If prizes are left, give a prize; otherwise "Better Luck Next Time"
        const prize = prizes.length > 0 ? prizes[0] : "Better Luck Next Time";
        if (prizes.length > 0) setPrizes(prev => prev.slice(1));
        
        return { ...person, prize };
      });

      setParticipants(prev => prev.map(p => 
        drawResults.find(r => r.id === p.id) ? { ...p, claimed: true } : p
      ));

      setCurrentWinners(drawResults);
      setHistory(prev => [...drawResults, ...prev]);
      setMustSpin(false);
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white p-6 flex flex-col items-center overflow-x-hidden">
      
      {/* Header UI */}
      <div className="w-full max-w-6xl flex justify-between items-center mb-12 border-b border-white/10 pb-4">
        <h1 className="text-2xl font-black italic tracking-tighter text-blue-500 uppercase">
          OPPO LUCKY DRAW 2026
        </h1>
        <div className="bg-blue-600/20 px-6 py-2 rounded-full border border-blue-500/30 font-mono text-sm text-blue-400">
          GIFTS LEFT: {prizes.length} / 80
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-16 items-center justify-center w-full max-w-7xl">
        
        {/* Drawing Section */}
        <div className="flex flex-col items-center gap-12">
          <div className="relative flex items-center justify-center w-[380px] h-[380px] lg:w-[560px] lg:h-[560px]">
            
            {/* Pop-up Winners */}
            {currentWinners.length === 4 && (
              <div className="absolute inset-0 z-40 pointer-events-none">
                <ResultBox winner={currentWinners[0]} pos="top-[-50px] left-1/2 -translate-x-1/2" color="blue" />
                <ResultBox winner={currentWinners[1]} pos="bottom-[-50px] left-1/2 -translate-x-1/2" color="red" />
                <ResultBox winner={currentWinners[2]} pos="left-[-60px] top-1/2 -translate-y-1/2" color="green" />
                <ResultBox winner={currentWinners[3]} pos="right-[-60px] top-1/2 -translate-y-1/2" color="orange" />
              </div>
            )}

            {/* Wheel */}
            <div 
              className="w-full h-full rounded-full border-[12px] border-[#0a0a0a] shadow-[0_0_100px_rgba(59,130,246,0.25)] relative overflow-hidden transition-all duration-[4000ms] cubic-bezier(0.1, 0, 0.1, 1)"
              style={{ transform: `rotate(${rotation}deg)` }}
            >
              {WHEEL_DATA.map((sector, i) => {
                const angle = 360 / WHEEL_DATA.length;
                return (
                  <div key={i} className="absolute inset-0">
                    <div 
                      className="absolute top-0 left-1/2 w-1/2 h-1/2 origin-bottom-left"
                      style={{ 
                        backgroundColor: sector.color, 
                        transform: `rotate(${i * angle}deg) skewY(-${90 - angle}deg)` 
                      }}
                    />
                    <div 
                      className="absolute top-0 left-1/2 w-[100px] h-1/2 -translate-x-1/2 origin-bottom flex flex-col items-center justify-start pt-12 lg:pt-20"
                      style={{ transform: `rotate(${i * angle + angle / 2}deg)` }}
                    >
                      <span 
                        className={`font-black text-[10px] lg:text-[12px] uppercase tracking-widest ${sector.text === 'black' ? 'text-black' : 'text-white'}`}
                        style={{ writingMode: 'vertical-rl', textOrientation: 'upright' }}
                      >
                        {sector.label}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="absolute z-10 w-24 h-24 rounded-full bg-[#020617] border-4 border-[#1e293b] flex items-center justify-center">
              <div className="w-6 h-6 bg-blue-600 rounded-full animate-pulse" />
            </div>
          </div>

          <button 
            onClick={startSpin}
            disabled={mustSpin || participants.filter(p => !p.claimed).length === 0}
            className="group px-24 py-6 bg-blue-600 rounded-2xl font-black uppercase tracking-[0.5em] text-black hover:scale-105 active:scale-95 transition-all shadow-2xl disabled:bg-neutral-800 disabled:text-neutral-500"
          >
            {mustSpin ? 'SPINNING...' : 'ENGAGE CIRCUIT'}
          </button>
        </div>

        {/* Live Winners Feed */}
        <div className="w-full lg:w-[420px] bg-[#0f172a]/60 border border-white/5 rounded-[2.5rem] p-8 h-[600px] flex flex-col backdrop-blur-xl">
          <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-500 mb-8 flex items-center gap-3">
             <History size={18} className="text-blue-500" /> LIVE ACTIVITY LOG
          </h2>
          <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
            {history.map((item, idx) => (
              <div key={idx} className={`p-5 rounded-2xl border border-white/5 flex flex-col transition-all ${item.prize === 'Better Luck Next Time' ? 'bg-red-500/5' : 'bg-white/5'}`}>
                 <div className="flex justify-between items-center">
                   <p className="font-bold text-sm text-white">{item.name}</p>
                   <span className="text-[9px] font-black uppercase text-neutral-500">#{item.id + 1}</span>
                 </div>
                 <p className={`text-[11px] font-black uppercase tracking-widest mt-2 ${item.prize === 'Better Luck Next Time' ? 'text-red-400' : 'text-blue-400'}`}>
                   {item.prize === 'Better Luck Next Time' ? '❌ ' : '🎁 '}{item.prize}
                 </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ResultBox({ winner, pos, color }) {
  const borders = {
    blue: 'border-blue-500', red: 'border-red-500', 
    green: 'border-green-500', orange: 'border-orange-500'
  };

  return (
    <div className={`absolute ${pos} bg-black/95 border-2 ${borders[color]} px-10 py-4 rounded-2xl shadow-2xl z-50 animate-bounce`}>
      <p className="text-xs font-black text-white text-center uppercase tracking-tighter">{winner.name}</p>
      <p className={`text-[10px] font-bold text-center mt-1 uppercase ${winner.prize === 'Better Luck Next Time' ? 'text-red-500' : 'text-blue-400'}`}>
        {winner.prize}
      </p>
    </div>
  );
}