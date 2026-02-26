import React, { useState } from 'react';
import { PhotoOrderFormData, Language } from '../types';
import { motion } from 'framer-motion';

interface BookingFormProps {
  language: Language;
}

const BookingForm: React.FC<BookingFormProps> = ({ language }) => {
  const [formData, setFormData] = useState<PhotoOrderFormData>({
    playerName: '',
    parentName: '',
    phone: '',
    email: '',
    teamName: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const teams = [
    "BISA 17 Boys Gold", "BISA 16 Boys Gold", "BISA 15 Boys Gold", "BISA 2012/13 Boys"
  ];

  const t = {
    pt: {
      title: "Ficha de Solicitação",
      subtitle: "Preencha seus dados e realize o pagamento para garantir as fotos.",
      packageDetails: "O pacote inclui todas as fotos do seu atleta em alta resolução, tratadas e enviadas digitalmente.",
      playerLabel: "Nome do Jogador",
      playerPlace: "Nome completo do atleta",
      parentLabel: "Nome do Responsável",
      parentPlace: "Seu nome",
      phoneLabel: "WhatsApp",
      emailLabel: "E-mail",
      teamLabel: "Time do Atleta",
      teamPlace: "Selecione o time",
      submit: "Confirmar Solicitação",
      sending: "Enviando...",
      successTitle: "Solicitação Recebida!",
      successMsg: "Recebemos os dados de",
      successMsg2: "Para liberar o acesso às fotos, o pagamento é obrigatório.",
      valueLabel: "Pacote Completo",
      paymentInst: "Pagar via Zelle",
      deadline: "Envie o comprovante para o nosso WhatsApp",
      doubts: "Dúvidas? Fale conosco.",
      receipt: "Instruções de Pagamento",
      copy: "Copiar"
    },
    es: {
      title: "Ficha de Solicitud",
      subtitle: "Complete sus datos y realice el pago para garantizar las fotos.",
      packageDetails: "El paquete incluye todas las fotos de su atleta en alta resolución, editadas y enviadas digitalmente.",
      playerLabel: "Nombre del Jugador",
      playerPlace: "Nombre completo del atleta",
      parentLabel: "Nombre del Tutor",
      parentPlace: "Tu nombre",
      phoneLabel: "WhatsApp",
      emailLabel: "Correo electrónico",
      teamLabel: "Equipo del Atleta",
      teamPlace: "Selecciona el equipo",
      submit: "Confirmar Solicitud",
      sending: "Enviando...",
      successTitle: "¡Solicitud Recibida!",
      successMsg: "Recibimos los datos de",
      successMsg2: "Para liberar el acceso a las fotos, el pago es obligatorio.",
      valueLabel: "Paquete Completo",
      paymentInst: "Pagar vía Zelle",
      deadline: "Envíe el comprobante a nuestro WhatsApp",
      doubts: "¿Dudas? Contáctenos.",
      receipt: "Instrucciones de Pago",
      copy: "Copiar"
    },
    en: {
      title: "Request Form",
      subtitle: "Fill in your details and complete payment to secure photos.",
      packageDetails: "Package includes all high-res photos of your athlete, professionally edited and delivered digitally.",
      playerLabel: "Player Name",
      playerPlace: "Athlete's full name",
      parentLabel: "Parent Name",
      parentPlace: "Your name",
      phoneLabel: "WhatsApp / Phone",
      emailLabel: "Email Address",
      teamLabel: "Athlete's Team",
      teamPlace: "Select team",
      submit: "Confirm Request",
      sending: "Sending...",
      successTitle: "Request Received!",
      successMsg: "We received data for",
      successMsg2: "To unlock photo access, payment is required.",
      valueLabel: "Full Package",
      paymentInst: "Pay via Zelle",
      deadline: "Send proof to our WhatsApp",
      doubts: "Questions? Contact us.",
      receipt: "Payment Instructions",
      copy: "Copy"
    }
  }[language];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await fetch("https://n8n.infra-remakingautomacoes.cloud/webhook-test/fbusa", {
        method: "POST",
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            ...formData,
            language_used: language,
            submitted_at: new Date().toISOString()
        })
      });
      setSubmitted(true);
    } catch (error) {
      console.error("Submission error", error);
      alert("Error submitting form. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // UX: Highlight styles for inputs
  const inputContainerClass = "relative group";
  const inputClass = "w-full pl-4 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:bg-white focus:border-bisa-navy focus:ring-2 focus:ring-bisa-navy/10 transition-all outline-none font-medium";
  const labelClass = "block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1";

  if (submitted) {
    return (
        <div id="matcher-form-container" className="w-full max-w-lg mx-auto px-4 mb-20 animate-pop-in">
            {/* Premium "Receipt" Card */}
            <div className="bg-white rounded-3xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)] overflow-hidden border border-gray-100 relative">
                
                {/* Status Header */}
                <div className="bg-bisa-navy p-8 text-center relative overflow-hidden">
                    {/* Confetti effect (CSS) */}
                    <div className="absolute inset-0 opacity-10" 
                         style={{ backgroundImage: `radial-gradient(#fbbf24 2px, transparent 2px)`, backgroundSize: '20px 20px' }}>
                    </div>
                    
                    <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 border border-white/20 shadow-lg animate-[bounce_1s_ease-in-out_1]">
                        <svg className="w-8 h-8 text-bisa-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-black text-white font-display uppercase tracking-wide">{t.successTitle}</h2>
                    <p className="text-white/60 text-xs uppercase tracking-widest mt-2">{t.receipt}</p>
                </div>

                {/* Receipt Cut Effect (Visual) */}
                <div className="relative h-4 bg-bisa-navy">
                     <div className="absolute top-0 left-0 w-full h-4 bg-white" style={{ clipPath: 'polygon(0 50%, 2.5% 0, 5% 50%, 7.5% 0, 10% 50%, 12.5% 0, 15% 50%, 17.5% 0, 20% 50%, 22.5% 0, 25% 50%, 27.5% 0, 30% 50%, 32.5% 0, 35% 50%, 37.5% 0, 40% 50%, 42.5% 0, 45% 50%, 47.5% 0, 50% 50%, 52.5% 0, 55% 50%, 57.5% 0, 60% 50%, 62.5% 0, 65% 50%, 67.5% 0, 70% 50%, 72.5% 0, 75% 50%, 77.5% 0, 80% 50%, 82.5% 0, 85% 50%, 87.5% 0, 90% 50%, 92.5% 0, 95% 50%, 97.5% 0, 100% 50%, 100% 100%, 0% 100%)' }}></div>
                </div>

                {/* Body */}
                <div className="px-8 pb-10 pt-4 text-center">
                    
                    <div className="mb-8">
                        <p className="text-gray-500 text-sm mb-1">{t.successMsg}</p>
                        <p className="text-2xl font-black text-bisa-navy font-display">{formData.playerName}</p>
                        <div className="w-16 h-1 bg-gray-100 mx-auto mt-4 rounded-full"></div>
                    </div>

                    <p className="text-gray-600 font-medium mb-6 text-sm">
                        {t.successMsg2}
                    </p>
                    
                    {/* Highlighted Payment Box */}
                    <div className="bg-gray-50 rounded-2xl p-6 border-2 border-dashed border-gray-200 relative mt-4">
                        <span className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-white px-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest border border-gray-200 rounded-full whitespace-nowrap">
                            Zelle Details
                        </span>
                        
                        <div className="flex flex-col items-center">
                            <p className="text-4xl font-black text-bisa-navy mb-2 tracking-tighter">$30.00</p>
                            <div className="flex items-center justify-center space-x-3 bg-white px-6 py-3 rounded-xl border border-gray-200 shadow-sm w-auto max-w-full">
                                <span className="font-mono font-bold text-lg text-gray-800 tracking-wide selection:bg-bisa-gold whitespace-nowrap">
                                    (843) 727-5264
                                </span>
                                <button 
                                    onClick={() => navigator.clipboard.writeText('8437275264')}
                                    className="text-gray-400 hover:text-bisa-navy transition-colors shrink-0 p-1 hover:bg-gray-50 rounded-md"
                                    title="Copy"
                                >
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                                </button>
                            </div>
                            <p className="text-xs text-gray-400 mt-3 font-medium uppercase tracking-wide">Studio FB USA</p>
                        </div>
                    </div>

                    <div className="mt-8 text-[10px] text-gray-400 italic">
                        {t.deadline} • {t.doubts}
                    </div>
                </div>
            </div>
            
            {/* Shadow Reflection */}
            <div className="mx-auto w-[85%] bg-black/5 h-4 rounded-[100%] blur-md -mt-4 relative z-[-1]"></div>
        </div>
    );
  }

  return (
    <div id="matcher-form-container" className="w-full bg-white border-t border-gray-100">
      
      {/* Split Section Layout */}
      <div className="flex flex-col lg:flex-row w-full min-h-[600px]">
        
        {/* Left Column: Inputs */}
        <div className="p-8 md:p-16 lg:p-24 flex-1 flex flex-col justify-center">
          <div className="max-w-3xl mx-auto w-full space-y-8">
          
          <div className="mb-8">
              <h3 className="text-4xl font-black text-bisa-navy uppercase tracking-wide font-display border-b-4 border-bisa-gold/30 inline-block pb-2">
                  {t.title}
              </h3>
              <p className="text-lg text-gray-500 mt-4 leading-relaxed max-w-2xl">{t.subtitle}</p>
              
              {/* Package Details - Visible on Mobile */}
              <div className="mt-6 p-5 bg-blue-50 rounded-xl border border-blue-100 lg:hidden">
                  <p className="text-sm text-blue-800 font-medium">
                      <span className="font-bold uppercase mr-1">Info:</span> 
                      {t.packageDetails}
                  </p>
              </div>
          </div>

          {/* Mobile Payment Info - Visible ONLY on Mobile */}
          <div className="lg:hidden bg-gray-900 text-white p-6 rounded-2xl mb-8 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-20 h-20 bg-bisa-gold/20 rounded-bl-full -mr-10 -mt-10"></div>
             <p className="text-xs text-white/60 uppercase tracking-widest mb-1">{t.valueLabel}</p>
             <div className="flex items-baseline gap-1 mb-3">
                 <span className="text-3xl font-black text-white">$30</span>
                 <span className="text-lg font-medium text-white/50">.00</span>
             </div>
             <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm border border-white/10">
                 <p className="text-[10px] text-bisa-gold uppercase font-bold mb-1">{t.paymentInst}</p>
                 <div className="flex items-center justify-between">
                     <span className="font-mono font-bold text-sm">843 727-5264</span>
                     <button onClick={() => navigator.clipboard.writeText('8437275264')} className="text-white/60 hover:text-white">
                         <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                     </button>
                 </div>
                 <p className="text-[9px] text-white/40 mt-1">Studio FB USA</p>
             </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <input type="text" name="_honey" style={{display: 'none'}} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className={inputContainerClass}>
                   <label className={labelClass}>{t.playerLabel}</label>
                   <input
                     type="text"
                     name="playerName"
                     required
                     value={formData.playerName}
                     onChange={handleChange}
                     className={inputClass}
                     placeholder={t.playerPlace}
                   />
                </div>
                
                <div className={inputContainerClass}>
                   <label className={labelClass}>{t.teamLabel}</label>
                   <select
                     name="teamName"
                     required
                     value={formData.teamName}
                     onChange={handleChange}
                     className={inputClass}
                   >
                     <option value="" disabled>{t.teamPlace}</option>
                     {teams.map(team => (
                       <option key={team} value={team}>{team}</option>
                     ))}
                   </select>
                </div>
            </div>

            <div className={inputContainerClass}>
               <label className={labelClass}>{t.parentLabel}</label>
               <input
                 type="text"
                 name="parentName"
                 required
                 value={formData.parentName}
                 onChange={handleChange}
                 className={inputClass}
                 placeholder={t.parentPlace}
               />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className={inputContainerClass}>
                   <label className={labelClass}>{t.phoneLabel}</label>
                   <input
                     type="tel"
                     name="phone"
                     required
                     value={formData.phone}
                     onChange={handleChange}
                     className={inputClass}
                     placeholder="(000) 000-0000"
                   />
                </div>

                <div className={inputContainerClass}>
                   <label className={labelClass}>{t.emailLabel}</label>
                   <input
                     type="email"
                     name="email"
                     required
                     value={formData.email}
                     onChange={handleChange}
                     className={inputClass}
                     placeholder="email@..."
                   />
                </div>
            </div>
            
            {/* Submit Button */}
            <div className="mt-12 pt-6 border-t border-gray-100">
                 <button
                    type="submit"
                    disabled={loading}
                    className="w-full md:w-auto md:min-w-[350px] py-5 bg-bisa-navy text-white rounded-xl font-bold uppercase tracking-widest shadow-xl hover:bg-bisa-navy/90 transition-all transform hover:-translate-y-1 text-base"
                  >
                    {loading ? t.sending : t.submit}
                  </button>
                  <p className="text-left text-xs text-gray-400 mt-4 ml-1">
                      {t.deadline}
                  </p>
            </div>
          </form>
          </div>
        </div>

        {/* Right Column: Payment Info - Desktop Only */}
        <div className="hidden lg:flex lg:w-[35%] bg-[#001f52] p-12 lg:p-20 flex-col justify-center relative overflow-hidden text-white shrink-0">
            {/* Background Accents */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-bisa-gold/10 rounded-bl-full -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-tr-full -ml-32 -mb-32"></div>
            
            <div className="relative z-10 space-y-12">
                <div>
                    <h3 className="text-white/60 font-medium text-sm uppercase tracking-widest mb-2">{t.valueLabel}</h3>
                    <p className="text-7xl font-black text-white font-display tracking-tighter">$30<span className="text-4xl text-white/50 align-top">.00</span></p>
                </div>

                <div className="space-y-8">
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 shadow-2xl">
                        <p className="text-bisa-gold text-xs font-bold uppercase tracking-widest mb-3">{t.paymentInst}</p>
                        <div className="flex items-center justify-between mb-2">
                           <p className="font-mono font-bold text-2xl tracking-wide">843 727-5264</p>
                           <button type="button" onClick={() => navigator.clipboard.writeText('8437275264')} className="text-white/40 hover:text-white transition-colors p-2">
                               <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                           </button>
                        </div>
                        <p className="text-white/40 text-xs">Studio FB USA</p>
                    </div>

                    <div className="flex items-start gap-4 text-white/70">
                        <svg className="w-6 h-6 mt-0.5 shrink-0 text-bisa-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <p className="text-base leading-relaxed font-medium">{t.packageDetails}</p>
                    </div>
                </div>
            </div>

            <div className="relative z-10 mt-16">
                <div className="w-full h-px bg-white/10 mb-6"></div>
                <p className="text-center text-sm text-white/40 italic">
                    {t.doubts}
                </p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
