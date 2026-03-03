import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Portfolio: React.FC<{ scrollToForm: () => void }> = ({ scrollToForm }) => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  
  // Using a simplified masonry approach with columns
  const items = [
    { 
      id: 1,
      src: "https://i.imgur.com/GSzz8F1h.jpeg", 
      title: "The Perfect Strike",
      subtitle: "Precision & Power",
      type: "image"
    },
    { 
      id: 2,
      src: "https://i.imgur.com/aszBBPxh.jpeg", 
      title: "Victory Moment",
      subtitle: "Pure Emotion",
      type: "image"
    },
    { 
      id: 3,
      src: "https://i.imgur.com/tc614RD.mp4", 
      title: "In Action",
      subtitle: "Dynamic Movement",
      type: "video"
    },
    { 
      id: 4,
      src: "https://i.imgur.com/JbmfIVeh.jpeg", 
      title: "Team Spirit",
      subtitle: "United We Stand",
      type: "image"
    },
    { 
      id: 5,
      src: "https://i.imgur.com/hbCm9kvh.jpeg", 
      title: "Pure Focus",
      subtitle: "Eyes on the Goal",
      type: "image"
    },
    { 
      id: 6,
      src: "https://i.imgur.com/BilHVIqh.jpeg", 
      title: "Game Day",
      subtitle: "The Atmosphere",
      type: "image"
    },
    { 
      id: 7,
      src: "https://i.imgur.com/6aPmqF4h.jpeg", 
      title: "The Save",
      subtitle: "Last Line of Defense",
      type: "image"
    },
  ];

  const selectedItem = items.find(item => item.id === selectedId);

  return (
    <section className="bg-gray-50 relative py-20 md:py-32">
      
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-5xl md:text-7xl font-black text-bisa-navy font-display uppercase tracking-tight leading-none"
            >
              Selected<br/>
              <span className="text-bisa-gold">Works</span>
            </motion.h2>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="md:text-right max-w-sm"
          >
            <p className="text-gray-500 text-sm md:text-base leading-relaxed font-medium">
              A collection of moments where preparation meets opportunity. Tap any image to view full screen.
            </p>
          </motion.div>
        </div>

        {/* Masonry Layout */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {items.map((item, i) => (
            <motion.div 
                key={item.id}
                layoutId={`card-${item.id}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
                onClick={() => setSelectedId(item.id)}
                className="break-inside-avoid group relative rounded-2xl overflow-hidden bg-white shadow-md cursor-pointer border border-gray-100"
            >
                {/* Image/Video Container */}
                <div className="relative w-full">
                    {item.type === 'video' ? (
                        <video 
                            src={item.src}
                            className="w-full h-auto object-contain block transition-transform duration-700 group-hover:scale-105"
                            autoPlay
                            loop
                            muted
                            playsInline
                        />
                    ) : (
                        <motion.img 
                            layoutId={`img-${item.id}`}
                            src={item.src} 
                            alt={item.title} 
                            className="w-full h-auto object-contain block transition-transform duration-700 group-hover:scale-105"
                            loading="lazy"
                            referrerPolicy="no-referrer"
                        />
                    )}
                </div>
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80"></div>
                
                <div className="absolute bottom-0 left-0 p-6 w-full">
                    <div className="mb-1">
                        <p className="text-bisa-gold text-[10px] font-bold uppercase tracking-widest">
                            {item.subtitle}
                        </p>
                    </div>
                    <div>
                        <h3 className="text-2xl text-white font-display font-black uppercase tracking-tight leading-none">
                            {item.title}
                        </h3>
                    </div>
                </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mt-20 md:mt-24 text-center"
        >
             <button 
              onClick={scrollToForm}
              className="bg-bisa-navy text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-bisa-navy/90 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-sm md:text-base"
            >
              Book Your Session
            </button>
        </motion.div>

      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedId && selectedItem && (
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
                {selectedItem.type === 'video' ? (
                    <video 
                        src={selectedItem.src}
                        className="max-h-[80vh] w-auto rounded-lg shadow-2xl"
                        controls
                        autoPlay
                        loop
                        playsInline
                    />
                ) : (
                    <motion.img 
                        layoutId={`img-${selectedId}`}
                        src={selectedItem.src} 
                        className="max-h-[80vh] w-auto rounded-lg shadow-2xl"
                    />
                )}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="mt-6 text-center"
                >
                    <h3 className="text-3xl md:text-4xl text-white font-display font-black uppercase tracking-tight mb-2">{selectedItem.title}</h3>
                    <p className="text-bisa-gold text-xs uppercase tracking-widest">{selectedItem.subtitle}</p>
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
