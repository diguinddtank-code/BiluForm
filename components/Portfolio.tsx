import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

const Card: React.FC<{
  i: number;
  src: string;
  title: string;
  subtitle: string;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
}> = ({ i, src, title, subtitle, progress, range, targetScale }) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'start start']
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1.1, 1]); 
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div ref={container} className="h-[80vh] flex items-start justify-center sticky top-0">
      <motion.div 
        style={{ 
          scale, 
          top: `calc(16vh + ${i * 15}px)` 
        }} 
        className="relative h-[45vh] w-[90vw] md:w-[900px] md:h-[550px] rounded-2xl origin-top shadow-2xl"
      >
        <div className="relative w-full h-full rounded-2xl overflow-hidden bg-gray-900 border border-white/10">
          <motion.div className="w-full h-full" style={{ scale: imageScale }}>
            <img 
              src={src}
              alt={title}
              className="object-cover w-full h-full filter brightness-90"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80"></div>
          
          <div className="absolute bottom-0 left-0 p-5 md:p-10 w-full">
             <div className="overflow-hidden">
                 <motion.p 
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-bisa-gold text-[9px] md:text-[10px] font-bold uppercase tracking-widest mb-1 md:mb-2"
                 >
                    0{i + 1} — {subtitle}
                 </motion.p>
                 <motion.h3 
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-2xl md:text-5xl font-black text-white font-display uppercase tracking-tighter leading-none"
                 >
                    {title}
                 </motion.h3>
             </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const Portfolio: React.FC<{ scrollToForm: () => void }> = ({ scrollToForm }) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end']
  });

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
    <section ref={container} className="bg-black relative">
      
      {/* Intro Header - Sticky */}
      <div className="h-[15vh] flex items-end justify-center sticky top-0 bg-black z-20 pb-4 shadow-xl shadow-black/50">
          <div className="text-center px-4">
            <h2 className="text-3xl md:text-6xl font-black text-white font-display uppercase tracking-tighter mb-1">
                Portfolio
            </h2>
            <p className="text-bisa-gold text-[9px] md:text-[10px] font-bold uppercase tracking-[0.3em] animate-pulse">
                Scroll to Explore
            </p>
          </div>
      </div>

      {/* Cards Container */}
      <div className="relative z-10 w-full">
        {images.map((img, i) => {
          const targetScale = 1 - ( (images.length - i) * 0.05 );
          const rangeStart = i * (1 / images.length);
          const rangeEnd = 1;

          return (
            <Card 
              key={i} 
              i={i} 
              {...img} 
              progress={scrollYProgress}
              range={[rangeStart, rangeEnd]}
              targetScale={targetScale}
            />
          );
        })}
      </div>
      
      {/* Bottom Spacer */}
      <div className="h-20 bg-black"></div>
    </section>
  );
};

export default Portfolio;
