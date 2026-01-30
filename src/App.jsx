import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// Added missing icons: ChevronRight, Sparkles, ChevronLeft
import { 
  Heart, 
  Flower, 
  Sparkles, 
  BookHeart, 
  PartyPopper, 
  Rocket, 
  Baby, 
  Gift, 
  Cake, 
  ChevronRight, 
  ChevronLeft 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { memories, reasons, future } from './data';

const App = () => {
  const [stage, setStage] = useState('preface'); 
  const [activeTab, setActiveTab] = useState('memories');
  const [index, setIndex] = useState(-1); 
  const [score, setScore] = useState(0);
  const [clicks, setClicks] = useState(0);
  const [showSecret, setShowSecret] = useState(false);

  const dataMap = { memories, reasons, future };
  const currentData = dataMap[activeTab];

  const handleNext = () => {
    if (index < 24) {
      setIndex(prev => prev + 1);
    } else {
      if (activeTab === 'memories') { setActiveTab('reasons'); setIndex(-1); }
      else if (activeTab === 'reasons') { setActiveTab('future'); setIndex(-1); }
      else if (activeTab === 'future') { setStage('game'); triggerConfetti(); }
    }
  };

  const handlePrev = () => {
    if (index > -1) {
      setIndex(prev => prev - 1);
    } else {
      if (activeTab === 'reasons') { setActiveTab('memories'); setIndex(24); }
      else if (activeTab === 'future') { setActiveTab('reasons'); setIndex(24); }
      else if (activeTab === 'memories') { setStage('preface'); }
    }
  };

  const triggerConfetti = () => {
    confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
  };

  // BEAUTIFUL BACKGROUND: Mixed Dark/Light Red Hearts & Flowers
  const renderFloatingBackground = () => {
    const items = [
      { color: 'text-red-700', size: 32 }, // Dark Red Big
      { color: 'text-red-400', size: 16 }, // Light Red Small
      { color: 'text-red-900', size: 20 }, // Deep Dark Small
      { color: 'text-rose-300', size: 28 }, // Light Rose Big
    ];

    return [...Array(40)].map((_, i) => {
      const config = items[i % items.length];
      const isFlower = i % 3 === 0;
      return (
        <motion.div
          key={i}
          initial={{ y: "110vh", x: `${Math.random() * 100}vw`, opacity: 0 }}
          animate={{ 
            y: "-15vh", 
            opacity: [0, 0.8, 0.8, 0], 
            rotate: [0, 360],
            x: [`${Math.random() * 100}vw`, `${(Math.random() * 100) + (Math.random() * 20 - 10)}vw`]
          }}
          transition={{ duration: 12 + Math.random() * 15, repeat: Infinity, ease: "linear", delay: Math.random() * 10 }}
          className={`absolute ${config.color}`}
          style={{ fontSize: `${config.size}px` }}
        >
          {isFlower ? <Flower /> : <Heart fill={i % 2 === 0 ? "currentColor" : "none"} />}
        </motion.div>
      );
    });
  };

  return (
    <div className="min-h-screen bg-[#fffafa] text-slate-800 font-serif overflow-hidden flex flex-col items-center relative">
      
      {/* 1. RAINING HEARTS AND FLOWERS BACKGROUND */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-gradient-to-b from-rose-50/50 to-transparent">
        {renderFloatingBackground()}
      </div>

      <AnimatePresence mode="wait">
        
        {/* PREFACE */}
        {stage === 'preface' && (
          <motion.div key="preface" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative z-10 w-full max-w-lg h-screen flex flex-col items-center justify-center p-8 text-center">
            <motion.div animate={{ scale: [1, 1.05, 1], rotate: [0, 2, -2, 0] }} transition={{ repeat: Infinity, duration: 5 }} className="w-64 h-64 rounded-[4rem] border-8 border-white shadow-2xl overflow-hidden mb-10">
              <img src="public/Snapchat-1375650093.jpg" className="w-full h-full object-cover" alt="Cover" />
            </motion.div>
            <h1 className="text-6xl font-black text-red-600 mb-4 tracking-tighter italic">Bubu's 24</h1>
            <p className="text-xl text-slate-500 italic mb-12 px-6 font-serif">"A journey through the 24 reasons, memories, and dreams that define us."</p>
            <button onClick={() => { setStage('journey'); triggerConfetti(); }} className="px-14 py-5 bg-red-600 text-white rounded-[2rem] font-black shadow-xl hover:bg-red-700 transition-all uppercase tracking-[0.2em] text-sm">Begin the Story</button>
          </motion.div>
        )}

        {/* JOURNEY STAGE */}
        {stage === 'journey' && (
          <motion.div key="journey" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative z-10 w-full max-w-md h-screen flex flex-col py-8 px-4">
            
            <div className="text-center mb-6 shrink-0 h-12">
              {index >= 0 && index < 24 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <span className="text-[10px] font-black uppercase tracking-[0.5em] text-red-400">
                    {activeTab === 'memories' ? "Fav Memories With You" : activeTab === 'reasons' ? "Reasons I Love You" : "Our Future Together"}
                  </span>
                  <div className="h-1.5 w-full bg-red-50 mt-4 rounded-full overflow-hidden shadow-inner">
                    <motion.div className="h-full bg-red-500" animate={{ width: `${((index + 1) / 24) * 100}%` }} />
                  </div>
                </motion.div>
              )}
            </div>

            <div className="flex-grow bg-white/90 backdrop-blur-xl rounded-[3.5rem] shadow-2xl border border-white p-6 md:p-10 flex flex-col justify-between overflow-hidden relative">
              <div className="flex-1 flex flex-col items-center justify-center text-center">
                
                {/* 1. INTRO SLIDE (No "Turn Page" button, just text) */}
                {index === -1 && (
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="space-y-10">
                    <div className="bg-red-50 p-8 rounded-full inline-block text-red-500 shadow-inner">
                      {activeTab === 'memories' ? <BookHeart size={80} /> : activeTab === 'reasons' ? <PartyPopper size={80} /> : <Rocket size={80} />}
                    </div>
                    <h2 className="text-4xl font-black text-red-600 leading-[1.1] tracking-tight px-2">
                      {activeTab === 'memories' ? "24 best memories i have with you" : activeTab === 'reasons' ? "24 reasons why i love you" : "24 things i want to do with you before i die"}
                    </h2>
                    <motion.button 
                      onClick={handleNext}
                      animate={{ x: [0, 5, 0] }} 
                      transition={{ repeat: Infinity, duration: 1.5 }}
                      className="text-red-300 hover:text-red-500 transition-colors"
                    >
                       <ChevronRight size={50} />
                    </motion.button>
                  </motion.div>
                )}

                {/* 2. MAIN CONTENT SLIDES */}
                {index >= 0 && index < 24 && (
                  <div className="w-full flex flex-col h-full items-center">
                    <motion.div key={currentData[index]?.image} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative w-full aspect-square overflow-hidden rounded-[2.5rem] shadow-2xl border-[6px] border-white">
                      <img src={currentData[index]?.image} className="w-full h-full object-cover" alt="Moment" />
                    </motion.div>
                    <div className="pt-10 shrink-0 font-serif italic text-2xl text-red-900 font-bold leading-relaxed px-4">
                       "{currentData[index]?.description}"
                    </div>
                  </div>
                )}

                {/* 3. TRANSITION SLIDE (Outro) */}
                {index === 24 && (
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 px-6">
                    <Sparkles size={80} className="text-red-400 mx-auto mb-4 animate-pulse" />
                    <p className="text-2xl text-red-800 font-bold leading-snug italic">
                      {activeTab === 'memories' 
                        ? "Those were the 24 best memories with you. So what must next be on plate, hmmm??? well let's see" 
                        : activeTab === 'reasons' 
                        ? "those are just 24 of a million reasons why i love you <3, but what's next in the book" 
                        : "Our future is going to be so beautiful. Are you ready for a little challenge bubudi?"}
                    </p>
                    <button onClick={handleNext} className="mt-8 bg-red-600 text-white p-5 rounded-full shadow-xl animate-bounce">
                       <ChevronRight size={32} />
                    </button>
                  </motion.div>
                )}
              </div>

              {/* STORY NAVIGATION (Using Labels) */}
              <div className="flex justify-between mt-8 px-4 min-h-[50px] items-center">
                {/* Previous hidden on intro slide */}
                {index > -1 && index < 24 ? (
                  <button onClick={handlePrev} className="text-red-400 font-black uppercase tracking-[0.2em] text-[10px] hover:text-red-600 transition-all">
                    ← Previous
                  </button>
                ) : <div />}

                {index >= 0 && index < 24 ? (
                  <button onClick={handleNext} className="text-white font-black uppercase tracking-[0.2em] text-[10px] bg-red-600 px-8 py-3 rounded-2xl shadow-lg hover:scale-105 transition-all">
                    {index === 23 ? "End Chapter" : "Next →"}
                  </button>
                ) : <div />}
              </div>
            </div>
          </motion.div>
        )}

        {/* GAME STAGE */}
        {stage === 'game' && (
          <motion.div key="game" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative z-10 w-full max-w-md h-screen flex flex-col items-center justify-center p-6 text-center">
            <div className="bg-white/95 backdrop-blur-2xl p-10 rounded-[3.5rem] shadow-2xl border border-white w-full">
              <h2 className="text-4xl font-black text-red-600 mb-2 italic tracking-tighter">Catch My Love!</h2>
              <p className="text-slate-400 mb-8 italic text-sm">Tap 24 hearts to unlock the final letter</p>
              <div className="relative w-full h-80 bg-red-50/50 rounded-[2.5rem] border-4 border-white overflow-hidden shadow-inner flex items-center justify-center">
                <AnimatePresence>
                  {[...Array(3)].map((_, i) => (
                    <motion.button key={i + score} initial={{ y: 280, x: Math.random() * 200 - 100 }} animate={{ y: -120 }} exit={{ scale: 2, opacity: 0 }}
                      onClick={() => { setScore(s => { const newS = s + 1; if(newS >= 24) { triggerConfetti(); setStage('epilogue'); } return newS; }); }}
                      className="absolute text-red-500 drop-shadow-xl p-2 cursor-pointer transition-transform active:scale-150">
                        <Heart fill="currentColor" size={60} />
                    </motion.button>
                  ))}
                </AnimatePresence>
              </div>
              <div className="mt-10">
                <div className="h-4 w-full bg-red-100 rounded-full overflow-hidden shadow-inner flex p-1">
                   <motion.div className="h-full bg-red-600 rounded-full" animate={{ width: `${(score / 24) * 100}%` }} />
                </div>
                <p className="mt-4 text-red-600 font-black text-3xl italic tracking-widest">{score} / 24</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* FINAL NOTE STAGE */}
        {stage === 'epilogue' && (
          <motion.div key="epilogue" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 w-full max-w-md min-h-screen flex flex-col items-center justify-center p-6 text-center">
            <div className="bg-white/95 backdrop-blur-3xl p-10 rounded-[4rem] shadow-2xl border border-white w-full italic">
              <h2 className="text-5xl font-black text-red-600 italic tracking-tighter mb-10 border-b-2 border-red-50 pb-6 font-serif">Dear Bubu,</h2>
              <div className="text-left space-y-8 text-slate-700 leading-relaxed italic mb-12 max-h-96 overflow-y-auto px-6 font-serif text-xl scrollbar-hide">
                <p>Happy 24th Birthday, baby.</p>
                <p>you are the best part of my life, and you mean the world to me, i hope you like this little effort from my side, i wish i was there to hold you</p>
                <p className="text-right font-black text-red-600 pt-6 text-2xl">— Your Dudu, Soso, Babu 🤍</p>
              </div>
              <div className="flex flex-col items-center">
                <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.8 }} onClick={() => { setClicks(c => { const newC = c + 1; if(newC >= 24) { setShowSecret(true); triggerConfetti(); } return newC; }); }} className="p-8 bg-red-600 text-white rounded-full shadow-2xl group">
                  <Heart fill="currentColor" size={48} className="group-hover:animate-pulse" />
                </motion.button>
                <p className="text-[10px] text-red-400 mt-6 font-black uppercase tracking-[0.5em] animate-pulse">{clicks < 24 ? `Tap ${24 - clicks} more times` : "THE FINAL SECRET"}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FINAL SECRET OVERLAY */}
      <AnimatePresence>
        {showSecret && (
          <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[400] bg-red-600 flex flex-col items-center justify-center p-12 text-white text-center italic font-serif">
            <div className="absolute inset-0 opacity-30 pointer-events-none">
              {renderFloatingBackground()}
            </div>
            <motion.div animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 3 }}>
              <Gift size={140} className="mb-10 drop-shadow-2xl" />
            </motion.div>
            <h2 className="text-7xl font-black mb-6 leading-none tracking-tighter drop-shadow-lg uppercase">I Love You!</h2>
            <p className="text-3xl mb-12 font-serif opacity-90 italic">"24 years of you, a lifetime of us."</p>
            <button onClick={() => setShowSecret(false)} className="px-16 py-5 bg-white text-red-600 rounded-3xl font-black uppercase tracking-[0.2em] text-sm shadow-2xl hover:scale-105 transition-all active:scale-95">Back to Us</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;