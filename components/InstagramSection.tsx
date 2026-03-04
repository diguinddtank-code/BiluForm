import React from 'react';
import { motion } from 'framer-motion';
import { Instagram } from 'lucide-react';

const InstagramSection: React.FC = () => {
  return (
    <section className="w-full bg-black py-16 flex justify-center border-t border-white/5">
      <div className="w-full max-w-4xl px-4 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center"
        >
          <div className="w-16 h-16 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 rounded-2xl p-[2px] mb-6">
            <div className="w-full h-full bg-black rounded-2xl flex items-center justify-center">
              <Instagram className="w-8 h-8 text-white" />
            </div>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-display font-black text-white uppercase tracking-tight mb-4">
            Follow our work
          </h2>
          
          <p className="text-gray-400 max-w-md mb-8">
            Check out our latest shots, behind the scenes, and tournament highlights on Instagram.
          </p>

          <a 
            href="https://www.instagram.com/studiofbusa_/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group relative inline-flex items-center justify-center gap-3 bg-white text-black px-8 py-4 rounded-full font-bold text-sm uppercase tracking-widest transition-all shadow-lg hover:bg-gray-200 transform hover:-translate-y-1"
          >
            <span>@studiofbusa_</span>
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default InstagramSection;
