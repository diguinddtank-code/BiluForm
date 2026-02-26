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

  const imageScale = useTransform(scrollYProgress, [0, 1], [1.1, 1]); // Very subtle parallax
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div ref={container} className="h-screen flex items-center justify-center sticky top-[10vh] md:top-[15vh]">
      <motion.div 
        style={{ 
          scale, 
          top: `calc(-5vh + ${i * 20}px)` 
        }} 
        className="relative h-[50vh] w-[85vw] md:w-[1000px] md:h-[600px] rounded-3xl origin-top"
      >
        <div className="relative w-full h-full rounded-3xl overflow-hidden bg-gray-900 border border-white/10 shadow-2xl">
          <motion.div className="w-full h-full" style={{ scale: imageScale }}>
            <img 
              src={src}
              alt={title}
              className="object-cover w-full h-full filter brightness-90"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80"></div>
          
          <div className="absolute bottom-0 left-0 p-6 md:p-12 w-full">
             <div className="overflow-hidden">
                 <motion.p 
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-bisa-gold text-[10px] md:text-xs font-bold uppercase tracking-widest mb-2"
                 >
                    0{i + 1} — {subtitle}
                 </motion.p>
                 <motion.h3 
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-3xl md:text-7xl font-black text-white font-display uppercase tracking-tighter leading-none"
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

const Portfolio: React.FC = () => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end']
  });

  const images = [
    { 
      src: "https://i.imgur.com/GSzz8F1.jpeg", 
      title: "The Perfect Strike",
      subtitle: "Precision & Power"
    },
    { 
      src: "https://i.imgur.com/JbmfIVe.jpeg", 
      title: "Team Spirit",
      subtitle: "United We Stand"
    },
    { 
      src: "https://i.imgur.com/aszBBPx.jpeg", 
      title: "Victory Moment",
      subtitle: "Pure Emotion"
    },
    { 
      src: "https://i.imgur.com/hbCm9kv.jpeg", 
      title: "Pure Focus",
      subtitle: "Eyes on the Goal"
    },
    { 
      src: "https://i.imgur.com/BilHVIq.jpeg", 
      title: "Game Day",
      subtitle: "The Atmosphere"
    },
    { 
      src: "https://i.imgur.com/6aPmqF4.jpeg", 
      title: "The Save",
      subtitle: "Last Line of Defense"
    },
  ];

  return (
    <section ref={container} className="bg-black relative pt-20">
      
      {/* Intro Header - Sticky to stay visible longer */}
      <div className="h-[20vh] flex items-end justify-center sticky top-0 bg-black z-0 pb-10">
          <div className="text-center px-4">
            <h2 className="text-4xl md:text-8xl font-black text-white font-display uppercase tracking-tighter mb-2">
                Portfolio
            </h2>
            <p className="text-bisa-gold text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] animate-pulse">
                Scroll to Explore
            </p>
          </div>
      </div>

      {/* Cards Container */}
      <div className="relative z-10 pb-[20vh]">
        {images.map((img, i) => {
          // Calculate dynamic range for smoother transition
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
    </section>
  );
};

export default Portfolio;
