import React from 'react';

const Hero: React.FC = () => {
  return (
    // Changed h-[380px] to min-h-[460px] to ensure text fits on mobile before the form overlaps
    <div className="relative overflow-hidden min-h-[460px] md:h-[520px] flex items-start pt-28 md:pt-36 justify-center bg-bisa-navy">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full z-0 animate-fade-in">
        {/* Solid dark overlay for better text contrast */}
        <div className="absolute inset-0 bg-bisa-navy/85 z-10 mix-blend-multiply"></div>
        {/* Subtle top-down shadow for header visibility, no bottom white fade */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/20 z-10"></div>
        <video 
          className="w-full h-full object-cover transform scale-105 filter blur-[1px]"
          src="https://i.imgur.com/Qfza7yN.mp4" 
          autoPlay 
          loop 
          muted 
          playsInline
        />
      </div>

      <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center pb-10 md:pb-0">
        
        <div className="inline-flex items-center justify-center space-x-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-5 backdrop-blur-md shadow-sm animate-pop-in" style={{ animationDelay: '0.1s' }}>
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span className="text-[10px] md:text-xs font-bold text-white tracking-widest uppercase">Registrations Open</span>
        </div>
        
        <h1 className="text-3xl md:text-5xl font-black font-display tracking-tight mb-3 text-white drop-shadow-2xl uppercase leading-tight animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          Join the <span className="text-transparent bg-clip-text bg-gradient-to-r from-bisa-gold to-yellow-100 relative inline-block">#1 Soccer Academy
            <svg className="absolute w-full h-2 -bottom-1 left-0 text-bisa-gold opacity-50" viewBox="0 0 100 10" preserveAspectRatio="none">
               <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="2" fill="none" />
            </svg>
          </span><br className="hidden md:block" /> in the Region
        </h1>
        
        <p className="text-sm md:text-lg text-gray-100 font-medium leading-relaxed max-w-xl mx-auto drop-shadow-md animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
           Bilu International Soccer Academy invites you to experience professional training.
        </p>
      </div>
    </div>
  );
};

export default Hero;