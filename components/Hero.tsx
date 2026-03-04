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
        
        {/* Background Image */}
        <div className="absolute inset-0 z-0 bg-black">
          <div className="w-full h-full">
            <img 
              src="https://i.imgur.com/tfyWqyy.png" 
              alt="Soccer Background Mobile" 
              className="w-full h-full object-cover object-center opacity-50 md:hidden" 
              referrerPolicy="no-referrer"
              loading="eager"
            />
            <img 
              src="https://i.imgur.com/RABMfB2.png" 
              alt="Soccer Background Desktop" 
              className="w-full h-full object-cover object-top opacity-50 hidden md:block" 
              referrerPolicy="no-referrer"
              loading="eager"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/40 to-black/90"></div> 
        </div>

        {/* Navbar */}
        <nav className="relative z-30 w-full p-6 md:p-8 flex justify-between items-center">
            <motion.img 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              src="https://bilusoccer.com/wp-content/uploads/2025/03/h2-3.png" 
              alt="Bilu Soccer" 
              className="h-8 md:h-12 w-auto object-contain"
            />
            
            {/* Language Switcher */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="flex items-center gap-1 bg-black/40 backdrop-blur-md border border-white/10 rounded-full p-1"
            >
              {(['en', 'pt', 'es'] as Language[]).map((lang) => (
                  <button 
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`
                      relative px-3 py-1.5 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-widest transition-all duration-300 flex items-center gap-1.5
                      ${language === lang ? 'text-black bg-white' : 'text-white/70 hover:text-white'}
                  `}
                  >
                  <span className="text-sm">
                    {lang === 'en' ? '🇺🇸' : lang === 'pt' ? '🇧🇷' : '🇪🇸'}
                  </span>
                  <span className="hidden sm:inline">{lang}</span>
                  </button>
              ))}
            </motion.div>
        </nav>

        {/* Center Content */}
        <div className="flex-1 flex flex-col items-center justify-center px-4 relative z-20 text-center mt-[-5vh]">
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 1, ease: "easeOut" }}
             className="max-w-5xl w-full flex flex-col items-center"
          >
              <span className="block text-bisa-gold text-xs md:text-sm font-bold tracking-[0.2em] uppercase mb-4">
                Studio F/B USA
              </span>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black font-display text-white uppercase tracking-tighter leading-[0.9] mb-6 drop-shadow-2xl">
                {t.title}
              </h1>
              
              <p className="text-base sm:text-lg md:text-xl text-gray-200 font-medium max-w-2xl mx-auto mb-10 leading-relaxed tracking-wide px-4">
                {t.subtitle}
              </p>
              
              <button
                onClick={scrollToForm}
                className="group relative inline-flex items-center justify-center gap-3 bg-bisa-gold text-bisa-navy px-10 py-4 rounded-full font-bold text-sm uppercase tracking-widest transition-all shadow-lg hover:bg-white hover:text-black"
              >
                <span>{t.cta}</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </button>
          </motion.div>
        </div>

        {/* Bottom Championship Badge */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="relative z-20 w-full pb-8 px-4"
        >
          <div className="max-w-4xl mx-auto bg-black/60 backdrop-blur-xl border border-white/20 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
             
             {/* Left Side: Text */}
             <div className="flex flex-col items-center md:items-start text-center md:text-left">
                <div className="flex items-center gap-2 mb-2">
                    <span className="bg-bisa-gold text-bisa-navy text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-full">
                        Cobertura Oficial
                    </span>
                </div>
                <h2 className="text-xl md:text-3xl font-black font-display text-white uppercase tracking-tight leading-none">
                  Bilu Academy <span className="text-white/50 font-light mx-1">×</span> St. Patrick's Cup
                </h2>
                <p className="text-white/60 text-xs font-medium uppercase tracking-widest mt-2">
                  South Carolina • March 2026
                </p>
             </div>

             {/* Right Side: Logos */}
             <div className="flex items-center gap-6 shrink-0">
                 <img 
                    src="https://bilusoccer.com/wp-content/uploads/2025/03/h2-3.png" 
                    alt="Bilu Soccer" 
                    className="h-12 w-auto object-contain"
                 />
                 <div className="h-10 w-px bg-white/20"></div>
                 <img 
                    src="https://soccer.sincsports.com/photos/tid/TRN173/user/2026_logo.png" 
                    alt="Championship Logo" 
                    className="h-14 w-auto object-contain drop-shadow-lg"
                 />
             </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default Hero;