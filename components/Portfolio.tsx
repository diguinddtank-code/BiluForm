import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Portfolio: React.FC<{ scrollToForm: () => void }> = ({ scrollToForm }) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-95%"]);

  const images = [
    { 
      src: "https://i.imgur.com/GSzz8F1h.jpeg", 
      title: "The Perfect Strike",
      subtitle: "Precision & Power"
    },
    { 
      src: "https://i.imgur.com/JbmfIVeh.jpeg", 
      title: "Team Spirit",
      subtitle: "United We Stand"
    },
    { 
      src: "https://i.imgur.com/aszBBPxh.jpeg", 
      title: "Victory Moment",
      subtitle: "Pure Emotion"
    },
    { 
      src: "https://i.imgur.com/hbCm9kvh.jpeg", 
      title: "Pure Focus",
      subtitle: "Eyes on the Goal"
    },
    { 
      src: "https://i.imgur.com/BilHVIqh.jpeg", 
      title: "Game Day",
      subtitle: "The Atmosphere"
    },
    { 
      src: "https://i.imgur.com/6aPmqF4h.jpeg", 
      title: "The Save",
      subtitle: "Last Line of Defense"
    },
  ];

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-black">
      
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        
        {/* Static Header Overlay */}
        <div className="absolute top-10 left-0 w-full z-20 text-center pointer-events-none">
            <h2 className="text-4xl md:text-6xl font-black text-white font-display uppercase tracking-tighter drop-shadow-lg">
                Portfolio
            </h2>
            <p className="text-bisa-gold text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] animate-pulse mt-2">
                Scroll Down to Explore
            </p>
        </div>

        <motion.div style={{ x }} className="flex gap-8 md:gap-16 px-10 md:px-20">
          {images.map((img, i) => (
            <div 
                key={i} 
                className="relative h-[60vh] w-[85vw] md:w-[60vw] lg:w-[45vw] shrink-0 rounded-3xl overflow-hidden group shadow-2xl border border-white/10"
            >
                <img 
                    src={img.src} 
                    alt={img.title} 
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 filter brightness-90 group-hover:brightness-100"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500"></div>
                
                <div className="absolute bottom-0 left-0 p-6 md:p-10 w-full translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <p className="text-bisa-gold text-[10px] md:text-xs font-bold uppercase tracking-widest mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                        0{i + 1} — {img.subtitle}
                    </p>
                    <h3 className="text-3xl md:text-5xl font-black text-white font-display uppercase tracking-tighter leading-none">
                        {img.title}
                    </h3>
                </div>
            </div>
          ))}
          
          {/* Final CTA Card */}
          <div className="relative h-[60vh] w-[85vw] md:w-[40vw] shrink-0 rounded-3xl overflow-hidden bg-bisa-navy flex flex-col items-center justify-center text-center p-8 border border-white/10">
              <h3 className="text-4xl md:text-6xl font-black text-white font-display uppercase tracking-tighter mb-6">
                  Ready?
              </h3>
              <button 
                  onClick={scrollToForm}
                  className="bg-bisa-gold text-bisa-navy px-10 py-5 rounded-full font-black text-lg uppercase tracking-widest hover:bg-white transition-all duration-300 shadow-[0_0_40px_-10px_rgba(251,191,36,0.6)] transform hover:scale-105"
              >
                  Book Now
              </button>
          </div>

        </motion.div>
      </div>
    </section>
  );
};

export default Portfolio;
