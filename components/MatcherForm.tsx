import React, { useState } from 'react';
import { BookingFormData, VoucherDetails } from '../types';
import { findClassMatch } from '../services/geminiService';

interface MatcherFormProps {
  onVoucherFound: (voucher: VoucherDetails, formData: BookingFormData) => void;
}

const MatcherForm: React.FC<MatcherFormProps> = ({ onVoucherFound }) => {
  const [formData, setFormData] = useState<BookingFormData>({
    childName: '',
    childAge: '',
    parentName: '',
    parentPhone: '',
    email: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const voucher = await findClassMatch(formData.childAge);
      onVoucherFound(voucher, formData);
    } catch (error) {
      console.error("Error finding class", error);
    } finally {
      setLoading(false);
    }
  };

  // Clean, minimal input style with improved focus and hover states
  const inputClass = "w-full bg-gray-50 border border-gray-200 text-gray-900 text-base rounded-lg focus:bg-white focus:ring-2 focus:ring-bisa-navy/20 focus:border-bisa-navy block px-4 py-3 transition-all outline-none font-medium placeholder-gray-400 hover:bg-white hover:shadow-sm hover:border-gray-300";
  const labelClass = "block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 ml-1";

  return (
    // Adjusted negative margin top for mobile (-mt-12) to work better with the taller Hero
    <div className="w-full max-w-3xl mx-auto -mt-12 md:-mt-28 relative z-30 px-4 mb-16 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
      <div className="bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,39,109,0.15)] overflow-hidden border border-gray-100 transform transition-all hover:shadow-[0_25px_60px_rgba(0,39,109,0.2)] duration-500">
        
        {/* Professional Header */}
        <div className="bg-white px-6 pt-8 pb-4 border-b border-gray-100 text-center">
            <span className="inline-block py-1 px-3 rounded-full bg-bisa-navy/5 text-bisa-navy text-[10px] font-bold tracking-widest uppercase mb-3 border border-bisa-navy/10 animate-pulse">
              New Athlete Admissions
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-bisa-navy font-display uppercase tracking-tight">
              Trial Class
            </h2>
            <p className="text-gray-500 text-sm mt-2 max-w-md mx-auto leading-relaxed">
              Complete the profile below to schedule your athlete's first evaluation class with our technical director.
            </p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 md:p-8 bg-white">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
            
            {/* Athlete Info */}
            <div className="md:col-span-8 group">
               <label className={`${labelClass} group-focus-within:text-bisa-navy transition-colors`}>Athlete's Name</label>
               <input
                 type="text"
                 name="childName"
                 required
                 value={formData.childName}
                 onChange={handleChange}
                 className={inputClass}
                 placeholder="Enter full name"
                 autoComplete="off"
               />
            </div>

            <div className="md:col-span-4 group">
               <label className={`${labelClass} group-focus-within:text-bisa-navy transition-colors`}>Age</label>
               <input
                 type="number"
                 name="childAge"
                 required
                 min="3"
                 max="18"
                 value={formData.childAge}
                 onChange={handleChange}
                 className={inputClass}
                 placeholder="e.g. 8"
                 autoComplete="off"
               />
            </div>

            {/* Parent Info */}
             <div className="md:col-span-6 group">
               <label className={`${labelClass} group-focus-within:text-bisa-navy transition-colors`}>Parent's Name</label>
               <input
                 type="text"
                 name="parentName"
                 required
                 value={formData.parentName}
                 onChange={handleChange}
                 className={inputClass}
                 placeholder="First & Last Name"
                 autoComplete="name"
               />
            </div>

             <div className="md:col-span-6 group">
               <label className={`${labelClass} group-focus-within:text-bisa-navy transition-colors`}>Phone</label>
               <input
                 type="tel"
                 name="parentPhone"
                 required
                 value={formData.parentPhone}
                 onChange={handleChange}
                 className={inputClass}
                 placeholder="(843) 000-0000"
                 autoComplete="tel"
               />
            </div>

            {/* Email & Submit */}
            <div className="md:col-span-12 group">
               <label className={`${labelClass} group-focus-within:text-bisa-navy transition-colors`}>Email Address</label>
               <input
                 type="email"
                 name="email"
                 required
                 value={formData.email}
                 onChange={handleChange}
                 className={inputClass}
                 placeholder="For scheduling confirmation"
                 autoComplete="email"
               />
            </div>

            <div className="md:col-span-12 pt-4">
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-4 rounded-xl font-bold text-lg tracking-wide uppercase transition-all duration-300 transform shadow-lg overflow-hidden relative group
                  ${loading 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-bisa-navy via-[#00338D] to-bisa-navy bg-[length:200%_auto] hover:bg-right animate-gradient-x text-white hover:shadow-xl hover:-translate-y-1 active:scale-[0.98]'
                  }`}
              >
                {/* Decorative sheen/shine effect */}
                {!loading && (
                   <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                )}
                
                {loading ? (
                  <span className="flex items-center justify-center space-x-2">
                    <svg className="animate-spin h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Finding Class...</span>
                  </span>
                ) : (
                  <span className="flex items-center justify-center space-x-2">
                    <span>Find Next Class</span>
                    <svg className="w-5 h-5 animate-bounce-slow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                )}
              </button>
              {/* Removed "Next session" text as requested */}
            </div>
          </div>
          
          <div className="mt-8 border-t border-gray-50 pt-6 flex flex-col md:flex-row items-center justify-center space-y-3 md:space-y-0 md:space-x-6">
             <div className="flex -space-x-2">
                <img className="w-8 h-8 rounded-full border-2 border-white ring-1 ring-gray-100 hover:z-10 hover:scale-110 transition-transform" src="https://i.pravatar.cc/100?img=33" alt="Athlete" />
                <img className="w-8 h-8 rounded-full border-2 border-white ring-1 ring-gray-100 hover:z-10 hover:scale-110 transition-transform" src="https://i.pravatar.cc/100?img=12" alt="Athlete" />
                <img className="w-8 h-8 rounded-full border-2 border-white ring-1 ring-gray-100 hover:z-10 hover:scale-110 transition-transform" src="https://i.pravatar.cc/100?img=59" alt="Athlete" />
             </div>
             <p className="text-xs text-gray-500 font-medium">
               Join <span className="text-bisa-navy font-bold">500+ athletes</span> at Bilu International Soccer Academy
             </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MatcherForm;