import React from 'react';

const InfoSection: React.FC = () => {
  return (
    // Changed background to gray-50 for better contrast against the white form
    <div className="bg-gray-50 pt-20 pb-24 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in-up">
          <span className="text-bisa-gold font-bold tracking-widest text-sm uppercase bg-bisa-gold/10 px-3 py-1 rounded-full border border-bisa-gold/20">The BISA Method</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-bisa-navy font-display mt-4">Why Start with a Free Trial?</h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-bisa-navy to-bisa-gold mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 - See The Difference */}
          <div className="group bg-white p-8 rounded-3xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] hover:shadow-[0_25px_50px_-12px_rgba(0,39,109,0.25)] transition-all duration-300 ease-out border border-gray-100 hover:border-bisa-gold/30 hover:-translate-y-3 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-150 duration-700 z-0"></div>
            
            <div className="h-16 w-16 bg-white border border-gray-100 text-bisa-navy rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:bg-bisa-navy group-hover:text-white transition-all duration-300 relative z-10 group-hover:shadow-lg group-hover:shadow-bisa-navy/30">
              {/* Premium Icon: Analysis/Chart */}
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            
            <div className="relative z-10">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-bisa-navy transition-colors font-display">Accelerated Growth</h3>
                <p className="text-gray-500 leading-relaxed text-sm">
                  Futsal offers <span className="font-bold text-bisa-navy">6x more touches</span> than regular soccer. Watch your child develop faster reflexes, close control, and confidence in a single session.
                </p>
            </div>
          </div>

          {/* Card 2 - Meet The Team */}
          <div className="group bg-white p-8 rounded-3xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] hover:shadow-[0_25px_50px_-12px_rgba(0,39,109,0.25)] transition-all duration-300 ease-out border border-gray-100 hover:border-bisa-gold/30 hover:-translate-y-3 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-150 duration-700 z-0"></div>
             
             <div className="h-16 w-16 bg-white border border-gray-100 text-bisa-navy rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:bg-bisa-navy group-hover:text-white transition-all duration-300 relative z-10 group-hover:shadow-lg group-hover:shadow-bisa-navy/30">
               {/* Premium Icon: Whistle/Coach */}
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
             </div>
             
             <div className="relative z-10">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-bisa-navy transition-colors font-display">Expert Coaching</h3>
                <p className="text-gray-500 leading-relaxed text-sm">
                  Experience our professional environment at Sangaree Middle School Gym. Our licensed coaches don't just instruct; they <span className="font-bold text-bisa-navy">inspire</span> excellence.
                </p>
             </div>
          </div>

          {/* Card 3 - Zero Commitment */}
          <div className="group bg-white p-8 rounded-3xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] hover:shadow-[0_25px_50px_-12px_rgba(0,39,109,0.25)] transition-all duration-300 ease-out border border-gray-100 hover:border-bisa-gold/30 hover:-translate-y-3 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-150 duration-700 z-0"></div>
            
            <div className="h-16 w-16 bg-white border border-gray-100 text-bisa-navy rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:bg-bisa-navy group-hover:text-white transition-all duration-300 relative z-10 group-hover:shadow-lg group-hover:shadow-bisa-navy/30">
               {/* Premium Icon: Shield Check */}
               <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
               </svg>
            </div>
            
            <div className="relative z-10">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-bisa-navy transition-colors font-display">Zero Commitment</h3>
                <p className="text-gray-500 leading-relaxed text-sm">
                  The trial is completely <span className="font-bold text-bisa-navy">free</span>. It's the perfect, risk-free way to assess if our high-performance program is the right fit for your player.
                </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoSection;