import React from 'react';

const InfoSection: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
      <div className="text-center mb-16">
        <span className="text-bisa-gold font-bold tracking-widest text-sm uppercase">Join the Academy</span>
        <h2 className="text-3xl md:text-4xl font-extrabold text-bisa-navy font-display mt-3">Why Start with a Free Trial?</h2>
        <div className="w-24 h-1 bg-gray-200 mx-auto mt-6 rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Card 1 */}
        <div className="group bg-white p-8 rounded-3xl shadow-sm hover:shadow-[0_20px_50px_rgba(0,39,109,0.1)] transition-all duration-300 border border-gray-100 hover:border-bisa-gold/30 hover:-translate-y-2">
          <div className="h-14 w-14 bg-gray-50 text-bisa-navy rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:bg-bisa-navy group-hover:text-white transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-bisa-navy transition-colors">See The Difference</h3>
          <p className="text-gray-500 leading-relaxed text-sm">
            Watch your child in action. Futsal offers 6x more touches than regular soccer, developing faster reflexes and better control in just one session.
          </p>
        </div>

        {/* Card 2 */}
        <div className="group bg-white p-8 rounded-3xl shadow-sm hover:shadow-[0_20px_50px_rgba(0,39,109,0.1)] transition-all duration-300 border border-gray-100 hover:border-bisa-gold/30 hover:-translate-y-2">
          <div className="h-14 w-14 bg-gray-50 text-bisa-navy rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:bg-bisa-navy group-hover:text-white transition-all duration-300 group-hover:scale-110 group-hover:-rotate-3">
             <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
             </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-bisa-navy transition-colors">Meet The Team</h3>
          <p className="text-gray-500 leading-relaxed text-sm">
            Experience our professional environment at Sangaree Middle School Gym and meet our expert coaches dedicated to youth development.
          </p>
        </div>

        {/* Card 3 */}
        <div className="group bg-white p-8 rounded-3xl shadow-sm hover:shadow-[0_20px_50px_rgba(0,39,109,0.1)] transition-all duration-300 border border-gray-100 hover:border-bisa-gold/30 hover:-translate-y-2">
          <div className="h-14 w-14 bg-gray-50 text-bisa-navy rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:bg-bisa-navy group-hover:text-white transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-bisa-navy transition-colors">Zero Commitment</h3>
          <p className="text-gray-500 leading-relaxed text-sm">
            The trial is completely free. It's the perfect way to assess if our high-performance program is the right fit for your player.
          </p>
        </div>
      </div>
    </div>
  );
};

export default InfoSection;