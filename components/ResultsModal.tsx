import React, { useState } from 'react';
import { BookingFormData, VoucherDetails } from '../types';
import { submitBookingToWebhook } from '../services/bookingService';

interface ResultsModalProps {
  voucher: VoucherDetails | null;
  formData: BookingFormData | null;
  onClose: () => void;
}

const ResultsModal: React.FC<ResultsModalProps> = ({ voucher, formData, onClose }) => {
  const [step, setStep] = useState<'voucher' | 'loading' | 'success'>('voucher');

  if (!voucher || !formData) return null;

  const isEligible = voucher.status === 'eligible';

  const handleConfirm = async () => {
    setStep('loading');
    await submitBookingToWebhook(formData, voucher);
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
          ) : step === 'voucher' ? (
            <div className="relative">
              {/* Clean Official Pass Design */}
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
                            <span className="block text-sm font-bold text-bisa-navy">{voucher.date}</span>
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
                       <p className="text-bisa-navy font-black text-base">{voucher.date}</p>
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