import React, { useState, useEffect } from 'react';

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'py-2 bg-bisa-navy/90 backdrop-blur-md shadow-lg' : 'py-6 bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        <div className="flex items-center">
          <img 
            src="https://bilusoccer.com/wp-content/uploads/2025/03/h2-3.png" 
            alt="BISA Soccer Academy" 
            className={`transition-all duration-300 ${scrolled ? 'h-12' : 'h-16 md:h-20'} drop-shadow-md`}
          />
        </div>
        <nav className="hidden md:flex items-center space-x-8">
           <a href="#" className="text-white text-sm font-medium hover:text-bisa-gold transition-colors tracking-wide">THE PROGRAM</a>
           <a href="#" className="text-white text-sm font-medium hover:text-bisa-gold transition-colors tracking-wide">SCHEDULE</a>
           <a href="#" className="bg-white text-bisa-navy px-6 py-2.5 rounded-full font-bold text-xs hover:bg-bisa-gold hover:text-bisa-navy transition-all shadow-lg transform hover:-translate-y-0.5 tracking-wider uppercase">
             Contact Us
           </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
