import React from 'react';
import { Language } from '../types';

interface HeroProps {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const Hero: React.FC<HeroProps> = ({ language, setLanguage }) => {
  
  const translations = {
    pt: { title: "Ficha de Seleção de Fotos", subtitle: "Garanta as memórias do seu atleta" },
    es: { title: "Ficha de Selección de Fotos", subtitle: "Guarda los recuerdos de tu atleta" },
    en: { title: "Photo Selection Form", subtitle: "Secure your athlete's memories" }
  };

  const t = translations[language];

  return (
    // Reduced padding (pt-28 pb-24) to make it smaller
    <div className="relative bg-[#001f52] pt-28 pb-24 px-4 overflow-hidden shadow-xl">
      
      {/* --- Background Effects --- */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#00276D] to-[#001533]"></div>
      
      {/* Subtle Pattern */}
      <div className="absolute inset-0 opacity-[0.03]" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}>
      </div>

      {/* --- Content --- */}
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 md:gap-12">
        
        {/* Left Side: Title & Subtitle */}
        <div className="text-center md:text-left flex-1">
            <h1 className="text-2xl md:text-4xl font-black text-white font-display uppercase tracking-tight mb-2 drop-shadow-md animate-fade-in-up">
              {t.title}
            </h1>
            <p className="text-bisa-gold font-medium uppercase tracking-widest text-xs animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
               {t.subtitle}
            </p>
        </div>

        {/* Right Side: Language Switcher (Compact) */}
        <div className="flex-shrink-0 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="inline-flex bg-black/30 backdrop-blur-md p-1 rounded-lg border border-white/10">
              {(['pt', 'es', 'en'] as Language[]).map((lang) => (
                <button 
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`
                    px-4 py-1.5 rounded-md text-xs font-bold transition-all duration-300 uppercase
                    ${language === lang 
                      ? 'bg-white text-bisa-navy shadow-sm' 
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                    }
                  `}
                >
                  {lang}
                </button>
              ))}
            </div>
        </div>

      </div>
    </div>
  );
};

export default Hero;