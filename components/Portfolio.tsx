import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Portfolio: React.FC<{ scrollToForm: () => void }> = ({ scrollToForm }) => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  
  // Using a simplified masonry approach with columns
  const images = [
    { 
      id: 1,
      src: "https://i.imgur.com/GSzz8F1h.jpeg", 
      title: "The Perfect Strike",
      subtitle: "Precision & Power",
      height: "h-[400px] md:h-[500px]"
    },
    { 
      id: 2,
      src: "https://i.imgur.com/aszBBPxh.jpeg", 
      title: "Victory Moment",
      subtitle: "Pure Emotion",
      height: "h-[500px] md:h-[650px]"
    },
    { 
      id: 3,
      src: "https://i.imgur.com/JbmfIVeh.jpeg", 
      title: "Team Spirit",
      subtitle: "United We Stand",
      height: "h-[350px] md:h-[450px]"
    },
    { 
      id: 4,
      src: "https://i.imgur.com/hbCm9kvh.jpeg", 
      title: "Pure Focus",
      subtitle: "Eyes on the Goal",
      height: "h-[450px] md:h-[550px]"
    },
    { 
      id: 5,
      src: "https://i.imgur.com/BilHVIqh.jpeg", 
      title: "Game Day",
      subtitle: "The Atmosphere",
      height: "h-[300px] md:h-[400px]"
    },
    { 
      id: 6,
      src: "https://i.imgur.com/6aPmqF4h.jpeg", 
      title: "The Save",
      subtitle: "Last Line of Defense",
      height: "h-[400px] md:h-[500px]"
    },
  ];

  const selectedImage = images.find(img => img.id === selectedId);

  return (
    <section className="bg-black relative py-24 md:py-32">
      
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-8xl font-black text-white font-display uppercase tracking-tighter leading-[0.9]"
            >
              Selected<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-bisa-gold to-yellow-200">Works</span>
            </motion.h2>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:text-right max-w-xs"
          >
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              A collection of moments where preparation meets opportunity. Tap any image to view full screen.
            </p>
          </motion.div>
        </div>

        {/* Masonry Layout */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {images.map((img, i) => (
            <motion.div 
                key={img.id}
                layoutId={`card-${img.id}`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                onClick={() => setSelectedId(img.id)}
                className="break-inside-avoid group relative rounded-2xl overflow-hidden bg-gray-900 shadow-xl border border-white/10 cursor-pointer"
            >
                {/* Image Container */}
                <div className="relative w-full">
                    <motion.img 
                        layoutId={`img-${img.id}`}
                        src={img.src} 
                        alt={img.title} 
                        className="w-full h-auto object-contain block transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                    />
                </div>
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="absolute bottom-0 left-0 p-6 w-full translate-y-4 group-hover:translate-y-0 transition-transform duration-500 opacity-0 group-hover:opacity-100">
                    <p className="text-bisa-gold text-[10px] font-bold uppercase tracking-widest mb-1">
                        {img.subtitle}
                    </p>
                    <h3 className="text-xl font-black text-white font-display uppercase tracking-tighter leading-none">
                        {img.title}
                    </h3>
                </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
             <button 
              onClick={scrollToForm}
              className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-gray-200 transition-all shadow-[0_0_30px_-5px_rgba(255,255,255,0.3)] transform hover:scale-105"
            >
              Book Your Session
            </button>
        </div>

      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedId && selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 backdrop-blur-md"
            onClick={() => setSelectedId(null)}
          >
            <motion.div 
                layoutId={`card-${selectedId}`}
                className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center justify-center"
                onClick={(e) => e.stopPropagation()}
            >
                <motion.img 
                    layoutId={`img-${selectedId}`}
                    src={selectedImage.src} 
                    className="max-h-[80vh] w-auto rounded-lg shadow-2xl"
                />
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mt-4 text-center"
                >
                    <h3 className="text-2xl text-white font-display font-black uppercase tracking-tight">{selectedImage.title}</h3>
                    <p className="text-bisa-gold text-xs uppercase tracking-widest">{selectedImage.subtitle}</p>
                </motion.div>

                <button 
                    onClick={() => setSelectedId(null)}
                    className="absolute -top-12 right-0 text-white/50 hover:text-white transition-colors p-2"
                >
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};

export default Portfolio;
