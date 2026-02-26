import React from 'react';
import { motion } from 'framer-motion';
import { Language } from '../types';

interface HeroProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  scrollToForm: () => void;
}

const Hero: React.FC<HeroProps> = ({ language, setLanguage, scrollToForm }) => {
  
  const t = {
    pt: { 
      title: "Não assista pela tela.", 
      subtitle: "Nós capturamos os momentos. Você vive a emoção.",
      cta: "Garantir Minhas Fotos",
      coverage: "Bilu Academy no"
    },
    es: { 
      title: "No mires por la pantalla.", 
      subtitle: "Nosotros capturamos los momentos. Tú vives la emoción.",
      cta: "Asegurar Mis Fotos",
      coverage: "Bilu Academy en"
    },
    en: { 
      title: "Don't watch through a screen.", 
      subtitle: "We capture the moments. You live the emotion.",
      cta: "Secure My Photos",
      coverage: "Bilu Academy at"
    }
  }[language];

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black font-sans">
      
      {/* Main Hero Content */}
      <div className="relative h-full flex flex-col">
        
        {/* Background Image with Parallax-like scale */}
        <div className="absolute inset-0 z-0">
          <motion.div 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 10, ease: "linear" }}
            className="w-full h-full"
          >
            <img 
              src="https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
              alt="Soccer Background" 
              className="w-full h-full object-cover opacity-50" 
              referrerPolicy="no-referrer"
              loading="eager"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black/80"></div> 
        </div>

        {/* Navbar */}
        <nav className="relative z-30 w-full p-6 md:p-8 flex justify-between items-center">
            <motion.img 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              src="https://bilusoccer.com/wp-content/uploads/2025/03/h2-3.png" 
              alt="Bilu Soccer" 
              className="h-8 md:h-12 w-auto object-contain"
            />
            
            {/* Language Switcher */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="flex items-center gap-1 bg-black/40 backdrop-blur-md border border-white/10 rounded-full p-1"
            >
              {(['pt', 'es', 'en'] as Language[]).map((lang) => (
                  <button 
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`
                      relative px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-300
                      ${language === lang ? 'text-black bg-white' : 'text-white/70 hover:text-white'}
                  `}
                  >
                  {lang}
                  </button>
              ))}
            </motion.div>
        </nav>

        {/* Center Content */}
        <div className="flex-1 flex flex-col items-center justify-center px-4 relative z-20 text-center mt-[-5vh]">
          <motion.div
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
             className="max-w-4xl w-full"
          >
              <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-white font-display uppercase tracking-tighter leading-[0.9] mb-4 md:mb-8 drop-shadow-2xl">
                {t.title}
              </h1>
              <p className="text-sm sm:text-base md:text-xl text-gray-200 font-light max-w-xl mx-auto mb-8 md:mb-12 leading-relaxed tracking-wide px-4">
                {t.subtitle}
              </p>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToForm}
                className="group relative inline-flex items-center gap-3 bg-bisa-gold text-bisa-navy px-6 md:px-10 py-3 md:py-4 rounded-full font-black text-[10px] md:text-xs uppercase tracking-[0.2em] hover:bg-white transition-all duration-300 shadow-[0_0_50px_-10px_rgba(251,191,36,0.4)] overflow-hidden"
              >
                <span className="relative z-10">{t.cta}</span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                <svg className="w-3 h-3 md:w-4 md:h-4 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </motion.button>
          </motion.div>
        </div>

        {/* Bottom Championship Badge - Responsive */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="relative z-20 w-full pb-6 md:pb-10 px-4"
        >
          <div className="max-w-4xl mx-auto bg-black/60 backdrop-blur-xl border border-white/20 rounded-2xl md:rounded-3xl p-4 md:p-8 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-10 hover:bg-black/70 transition-colors duration-500 shadow-2xl">
             
             {/* Left Side: Text */}
             <div className="flex flex-col items-center md:items-start text-center md:text-left flex-1 w-full">
                <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
                    <span className="bg-bisa-gold text-bisa-navy text-[9px] md:text-xs font-black uppercase tracking-widest px-2 py-1 md:px-3 rounded-full shadow-[0_0_15px_rgba(251,191,36,0.4)]">
                        Confirmed
                    </span>
                    <span className="text-white/60 text-[9px] md:text-xs font-bold uppercase tracking-widest">
                        Tournament Participation
                    </span>
                </div>
                
                <h2 className="text-xl sm:text-2xl md:text-4xl font-black text-white font-display uppercase tracking-tighter leading-none mb-1 md:mb-2">
                  Bilu Academy <span className="text-white/30">at</span><br className="hidden md:block" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 md:ml-0 ml-1">St. Patrick's Cup</span>
                </h2>
                
                <p className="text-white/50 text-[10px] md:text-sm font-medium uppercase tracking-widest">
                  South Carolina • March 2026
                </p>
             </div>

             {/* Divider */}
             <div className="h-px w-full md:w-px md:h-24 bg-gradient-to-b from-transparent via-white/20 to-transparent my-2 md:my-0"></div>

             {/* Right Side: Logos */}
             <div className="flex items-center gap-6 md:gap-10 shrink-0">
                 <div className="flex flex-col items-center">
                    <img 
                      src="https://bilusoccer.com/wp-content/uploads/2025/03/h2-3.png" 
                      alt="Bilu Soccer" 
                      className="h-10 md:h-16 w-auto object-contain mb-1 md:mb-2"
                    />
                    <span className="text-[8px] md:text-[10px] text-white/40 font-bold uppercase tracking-wider">Academy</span>
                 </div>
                 
                 <span className="text-white/20 text-xl md:text-3xl font-light">×</span>
                 
                 <div className="flex flex-col items-center">
                    <img 
                      src="https://soccer.sincsports.com/photos/tid/TRN173/user/2026_logo.png" 
                      alt="Championship Logo" 
                      className="h-12 md:h-20 w-auto object-contain drop-shadow-lg mb-1 md:mb-2"
                    />
                    <span className="text-[8px] md:text-[10px] text-white/40 font-bold uppercase tracking-wider">Tournament</span>
                 </div>
             </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default Hero;