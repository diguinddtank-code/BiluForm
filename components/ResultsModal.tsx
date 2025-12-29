import React, { useState, useEffect } from 'react';
import { BookingFormData, VoucherDetails } from '../types';
import { submitBookingToWebhook, getUpcomingWednesdays } from '../services/bookingService';

interface ResultsModalProps {
  voucher: VoucherDetails | null;
  formData: BookingFormData | null;
  onClose: () => void;
}

const ResultsModal: React.FC<ResultsModalProps> = ({ voucher, formData, onClose }) => {
  // Steps: 'date-selection' -> 'voucher' -> 'loading' -> 'success'
  // If not eligible, goes straight to error view (handled in render)
  const [step, setStep] = useState<'date-selection' | 'voucher' | 'loading' | 'success'>('date-selection');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [dates, setDates] = useState<string[]>([]);

  useEffect(() => {
    setDates(getUpcomingWednesdays(4));
    // If voucher indicates ineligibility, step doesn't matter as much, 
    // but logic below handles the "Not Eligible" view regardless of step.
  }, []);

  if (!voucher || !formData) return null;

  const isEligible = voucher.status === 'eligible';

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    // Add a small delay for better UX before switching views
    setTimeout(() => {
        setStep('voucher');
    }, 300);
  };

  const handleConfirm = async () => {
    setStep('loading');
    
    // Create a new voucher object with the selected date
    const finalVoucher = { ...voucher, date: selectedDate };
    
    await submitBookingToWebhook(formData, finalVoucher);
    setStep('success');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-center justify-center min-h-screen px-4 pb-20 text-center sm:block sm:p-0">
        
        {/* Backdrop */}
        <div className="fixed inset-0 bg-bisa-navy/60 backdrop-blur-sm transition-opacity animate-fade-in" onClick={onClose}></div>

        {/* Center Trick */}
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        {/* Main Card Container */}
        <div className="inline-block align-middle transform transition-all w-full max-w-md relative animate-pop-in">
          
          <button onClick={onClose} className="absolute -top-12 right-0 md:-right-12 z-10 text-white/80 hover:text-white transition-colors transform hover:rotate-90 duration-300">
             <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>

          {!isEligible ? (
             <div className="bg-white rounded-2xl p-8 text-center shadow-2xl">
                <div className="mx-auto flex items-center justify-center h-14 w-14 rounded-full bg-red-50 mb-4 animate-bounce-slow">
                  <svg className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Program Eligibility</h3>
                <p className="text-gray-500 mb-6 text-sm leading-relaxed">
                  Our current trial sessions are designed for specific age groups. Please contact our support team for other opportunities.
                </p>
                <button
                  onClick={onClose}
                  className="w-full py-3 bg-gray-100 rounded-lg text-gray-700 font-bold hover:bg-gray-200 transition-colors"
                >
                  Close
                </button>
             </div>
          ) : step === 'date-selection' ? (
              <div className="bg-white rounded-2xl overflow-hidden shadow-2xl">
                  {/* Step 1 Header */}
                  <div className="bg-gradient-to-r from-bisa-navy to-[#00338D] p-6 text-center text-white relative overflow-hidden">
                      {/* Decorative background element */}
                      <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -mr-8 -mt-8"></div>
                      
                      <div className="flex justify-center mb-2 relative z-10">
                          <div className="bg-white/20 p-2 rounded-full ring-1 ring-white/30">
                              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                          </div>
                      </div>
                      <h2 className="text-xl font-bold font-display uppercase tracking-wider relative z-10">You Qualified!</h2>
                      <p className="text-white/80 text-xs mt-1 relative z-10">Based on age, {formData.childName} matches our:</p>
                      <div className="mt-3 bg-white/10 rounded-lg py-2 px-4 inline-block border border-white/20 relative z-10 backdrop-blur-sm">
                          <span className="font-bold text-bisa-gold text-sm block">{voucher.ageGroup} Class</span>
                          <span className="text-white/90 text-xs">{voucher.timeSlot}</span>
                      </div>
                  </div>

                  {/* Date Selector Body */}
                  <div className="p-6 md:p-8">
                      <h3 className="text-gray-900 font-bold text-center mb-6 text-lg md:text-xl font-display tracking-tight">
                        Select the best day for you
                      </h3>
                      
                      <div className="grid grid-cols-1 gap-3 mb-6">
                          {dates.map((date) => (
                              <button
                                  key={date}
                                  onClick={() => handleDateSelect(date)}
                                  className="group relative w-full bg-white border border-gray-200 hover:border-bisa-navy/60 p-3 rounded-xl transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 flex items-center justify-between"
                              >
                                  {/* Left: Date Info */}
                                  <div className="flex items-center space-x-4">
                                      <div className="bg-gray-50 rounded-lg p-2 group-hover:bg-blue-50 transition-colors">
                                          <svg className="w-5 h-5 text-gray-400 group-hover:text-bisa-navy transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                          </svg>
                                      </div>
                                      <div className="text-left">
                                          <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                                              {date.split(',')[0]}
                                          </span>
                                          <span className="block text-base font-black text-bisa-navy font-display leading-none">
                                              {date.split(',')[1]}
                                          </span>
                                      </div>
                                  </div>
                                  
                                  {/* Right: Availability Indicator */}
                                  <div className="flex items-center space-x-1.5 bg-green-50/80 px-2.5 py-1 rounded-full border border-green-100 group-hover:border-green-200 transition-colors">
                                      <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                      </span>
                                      <span className="text-[9px] font-bold text-green-700 uppercase tracking-tight">Available</span>
                                  </div>
                              </button>
                          ))}
                      </div>

                      {/* Professional Location Card */}
                      <div className="border-t border-gray-100 pt-6">
                        <div className="flex items-start space-x-4 bg-gray-50 p-4 rounded-xl border border-gray-200/60 hover:border-bisa-navy/30 transition-colors group">
                           <div className="bg-white p-2.5 rounded-full shadow-sm text-bisa-navy border border-gray-100 shrink-0 group-hover:text-white group-hover:bg-bisa-navy transition-colors">
                              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                           </div>
                           <div className="flex-1 min-w-0 text-left">
                              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Training Location</p>
                              <h4 className="font-bold text-gray-900 text-sm leading-tight mb-1 truncate">Sangaree Middle School Gym</h4>
                              <p className="text-gray-500 text-xs leading-snug">1050 Discovery Dr, Ladson, SC 29456</p>
                              
                              <a 
                                href="https://www.google.com/maps/search/?api=1&query=Sangaree+Middle+School+Gym+1050+Discovery+Dr+Ladson+SC" 
                                target="_blank" 
                                rel="noreferrer"
                                className="inline-flex items-center mt-2 text-[10px] font-bold text-bisa-navy hover:text-bisa-gold transition-colors"
                              >
                                <span>Get Directions</span>
                                <svg className="w-3 h-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                              </a>
                           </div>
                        </div>
                      </div>
                  </div>
              </div>
          ) : step === 'voucher' ? (
            <div className="relative animate-fade-in">
              {/* Clean Official Pass Design */}
              <button 
                onClick={() => setStep('date-selection')}
                className="absolute top-4 left-4 z-20 text-gray-400 hover:text-bisa-navy text-xs font-bold flex items-center transition-colors"
              >
                <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                Back
              </button>

              <div className="bg-white rounded-xl overflow-hidden shadow-2xl">
                 
                 {/* Header */}
                 <div className="bg-white border-b border-gray-100 p-6 text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-bisa-navy via-bisa-gold to-bisa-navy"></div>
                    <img 
                      src="https://bilusoccer.com/wp-content/uploads/2025/03/h2-3.png" 
                      alt="Logo" 
                      className="h-10 mx-auto mb-3"
                    />
                    <h2 className="text-bisa-navy font-black text-xl tracking-widest uppercase font-display">Official Class Pass</h2>
                    <p className="text-green-600 text-[10px] font-bold uppercase tracking-wide mt-1 bg-green-50 inline-block px-2 py-0.5 rounded">Trial Access Granted</p>
                 </div>

                 {/* Body */}
                 <div className="p-6 bg-gray-50/50">
                    <div className="space-y-4">
                      <div className="flex justify-between items-end border-b border-gray-200 pb-2 hover:bg-white transition-colors px-2 rounded">
                        <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Athlete</span>
                        <span className="text-lg font-bold text-gray-900 font-display">{formData.childName}</span>
                      </div>
                      
                      <div className="flex justify-between items-end border-b border-gray-200 pb-2 hover:bg-white transition-colors px-2 rounded">
                        <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Date</span>
                        <div className="text-right">
                            <span className="block text-sm font-bold text-bisa-navy">{selectedDate}</span>
                        </div>
                      </div>

                      <div className="flex justify-between items-end border-b border-gray-200 pb-2 hover:bg-white transition-colors px-2 rounded">
                        <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Time</span>
                        <span className="text-sm font-bold text-gray-800">{voucher.timeSlot}</span>
                      </div>

                       <div className="flex justify-between items-end border-b border-gray-200 pb-2 hover:bg-white transition-colors px-2 rounded">
                        <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Location</span>
                        <span className="text-xs font-bold text-gray-600 text-right max-w-[60%]">{voucher.location}</span>
                      </div>
                    </div>

                    <div className="mt-8">
                      <button
                        onClick={handleConfirm}
                        className="w-full py-4 bg-bisa-navy text-white font-bold uppercase tracking-wider text-sm rounded-lg hover:bg-blue-900 shadow-lg transform transition-all active:scale-[0.98] hover:-translate-y-0.5"
                      >
                        Confirm Attendance
                      </button>
                      <p className="text-center text-[10px] text-gray-400 mt-3">
                        By clicking above, you reserve your free spot.
                      </p>
                    </div>
                 </div>
              </div>
            </div>
          ) : step === 'loading' ? (
            <div className="bg-white rounded-2xl p-10 text-center shadow-2xl">
               <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-bisa-navy mx-auto mb-4"></div>
               <p className="text-gray-600 font-medium animate-pulse">Finalizing your registration...</p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl overflow-hidden shadow-2xl relative animate-pop-in">
               <div className="bg-green-500 p-8 text-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-white/10 animate-pulse"></div>
                  <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-3 relative z-10">
                    <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <h2 className="text-2xl font-black text-white font-display uppercase tracking-wide relative z-10">You're In!</h2>
               </div>
               
               <div className="p-8 text-center">
                  <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                    We are excited to welcome <span className="font-bold text-bisa-navy">{formData.childName}</span> to the Bilu International Soccer Academy family.
                  </p>
                  
                  <div className="bg-gray-50 rounded-lg p-4 mb-6 border border-gray-100 text-left transform transition-all hover:scale-[1.02] hover:shadow-md">
                    <p className="text-xs text-gray-500 font-bold uppercase mb-1">Your Session:</p>
                     <div className="mb-2 border-b border-gray-200 pb-2">
                       <p className="text-bisa-navy font-black text-base">{selectedDate}</p>
                       <p className="text-bisa-navy/80 font-bold text-sm">{voucher.timeSlot}</p>
                     </div>
                    <ul className="text-sm text-gray-700 list-disc list-inside space-y-1">
                      <li>Water bottle</li>
                      <li>Indoor soccer shoes (No cleats)</li>
                      <li>Athletic wear (Shorts/T-shirt)</li>
                    </ul>
                  </div>

                  <a 
                    href="https://www.instagram.com/bilu_soccer" 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex items-center justify-center w-full py-3 border-2 border-bisa-navy text-bisa-navy rounded-lg font-bold hover:bg-bisa-navy hover:text-white transition-all text-sm uppercase tracking-wide group"
                  >
                    <svg className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                    Follow us for Updates
                  </a>
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResultsModal;