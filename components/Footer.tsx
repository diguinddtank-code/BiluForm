import React from 'react';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#050505] text-white py-24 border-t border-white/5 relative overflow-hidden">
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]" style={{ backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)', backgroundSize: '4rem 4rem' }}></div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          
          <div className="col-span-1 md:col-span-5">
            <h3 className="text-4xl md:text-5xl font-display text-white mb-6 uppercase tracking-tight leading-none">Studio F/B USA</h3>
            <p className="text-gray-400 max-w-sm text-sm leading-relaxed font-light">
              Capturing the passion, intensity, and joy of youth soccer. Professional memories that last a lifetime.
            </p>
          </div>

          <div className="col-span-1 md:col-span-4">
            <h4 className="text-[10px] font-bold text-bisa-gold uppercase tracking-[0.3em] mb-6">Contact</h4>
            <ul className="space-y-4 text-gray-400 text-sm font-light">
              <li className="flex items-center">
                 <svg className="w-4 h-4 mr-3 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                 (843) 727-5264
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 mr-3 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                studiofbusa@gmail.com
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 mr-3 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" /></svg>
                <a href="https://www.instagram.com/studiofbusa_" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">@studiofbusa_</a>
              </li>
            </ul>
          </div>

          <div className="col-span-1 md:col-span-3">
            <h4 className="text-[10px] font-bold text-bisa-gold uppercase tracking-[0.3em] mb-6">Links</h4>
            <ul className="space-y-4 text-gray-400 text-sm font-light">
              <li><a href="#" className="hover:text-white transition-colors">Portfolio</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Book Now</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-20 pt-10 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-gray-600 text-[10px] uppercase tracking-[0.2em]">
            &copy; {new Date().getFullYear()} Studio FB USA. All rights reserved.
          </div>
          <div className="text-gray-600 text-[10px] uppercase tracking-[0.2em]">
            Designed for Excellence
          </div>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
