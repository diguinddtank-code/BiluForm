import React, { useState } from 'react';
import { PhotoOrderFormData, Language } from '../types';

interface MatcherFormProps {
  language: Language;
}

const MatcherForm: React.FC<MatcherFormProps> = ({ language }) => {
  const [formData, setFormData] = useState<PhotoOrderFormData>({
    playerName: '',
    parentName: '',
    phone: '',
    email: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Translation Dictionary
  const t = {
    pt: {
      playerLabel: "Nome do Jogador",
      playerPlace: "Nome completo do atleta",
      parentLabel: "Nome da Mãe / Responsável",
      parentPlace: "Nome do responsável",
      phoneLabel: "Telefone / WhatsApp",
      emailLabel: "E-mail",
      // How it works section
      howItWorksTitle: "Processo Simples",
      step1Title: "Cadastro",
      step1Desc: "Preencha seus dados para receber o link.",
      step2Title: "Galeria Privada",
      step2Desc: "Você receberá o acesso para ver as fotos.",
      
      valueLabel: "Investimento",
      paymentInst: "Pagamento via Zelle",
      deadline: "Enviar comprovante em 24h",
      doubts: "Dúvidas? Fale conosco.",
      confirmBtn: "Solicitar Acesso Agora",
      sending: "Enviando...",
      successTitle: "Pedido Recebido!",
      successMsg: "Recebemos os dados de",
      successMsg2: "Para finalizar e liberar as fotos, realize o pagamento abaixo:",
      newOrder: "Novo Pedido",
      total: "Total a Pagar",
      receipt: "Comprovante de Solicitação"
    },
    es: {
      playerLabel: "Nombre del Jugador",
      playerPlace: "Nombre completo del atleta",
      parentLabel: "Nombre de la Madre / Tutor",
      parentPlace: "Nombre del tutor",
      phoneLabel: "Teléfono / WhatsApp",
      emailLabel: "Correo electrónico",
      // How it works section
      howItWorksTitle: "Proceso Simple",
      step1Title: "Registro",
      step1Desc: "Complete sus datos para recibir el enlace.",
      step2Title: "Galería Privada",
      step2Desc: "Recibirá acceso para ver las fotos.",

      valueLabel: "Inversión",
      paymentInst: "Pago vía Zelle",
      deadline: "Enviar comprobante en 24h",
      doubts: "¿Dudas? Contáctenos.",
      confirmBtn: "Solicitar Acceso Ahora",
      sending: "Enviando...",
      successTitle: "¡Pedido Recibido!",
      successMsg: "Recibimos los datos de",
      successMsg2: "Para finalizar y liberar las fotos, realice el pago a continuación:",
      newOrder: "Nuevo Pedido",
      total: "Total a Pagar",
      receipt: "Comprobante de Solicitud"
    },
    en: {
      playerLabel: "Player Name",
      playerPlace: "Athlete's full name",
      parentLabel: "Parent / Guardian Name",
      parentPlace: "Guardian's name",
      phoneLabel: "Phone / WhatsApp",
      emailLabel: "E-mail Address",
      // How it works section
      howItWorksTitle: "Simple Process",
      step1Title: "Registration",
      step1Desc: "Fill in details to receive the link.",
      step2Title: "Private Gallery",
      step2Desc: "You will receive access to view photos.",

      valueLabel: "Investment",
      paymentInst: "Payment via Zelle",
      deadline: "Send proof within 24h",
      doubts: "Questions? Contact us.",
      confirmBtn: "Request Access Now",
      sending: "Sending...",
      successTitle: "Order Received!",
      successMsg: "We received data for",
      successMsg2: "To finalize and unlock photos, please complete payment below:",
      newOrder: "New Order",
      total: "Total Due",
      receipt: "Request Receipt"
    }
  }[language];

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
      await fetch("https://formsubmit.co/ajax/bilusoccer@gmail.com", {
        method: "POST",
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            ...formData,
            language_used: language,
            _subject: `📸 NOVO PEDIDO: ${formData.playerName}`,
            _template: "table",
            _captcha: "false", // Disable captcha to prevent errors
            _honey: "" // Spam protection field (leave empty in UI)
        })
      });
      setSubmitted(true);
      // Scroll to top of the form area
      const formElement = document.getElementById('matcher-form-container');
      if(formElement) formElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      
    } catch (error) {
      console.error("Submission error", error);
      alert("Error submitting form. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // UX: Highlight styles for inputs
  const inputContainerClass = "relative group";
  const inputClass = "w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:bg-white focus:border-bisa-navy focus:ring-2 focus:ring-bisa-navy/10 transition-all outline-none font-medium";
  const labelClass = "block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1";
  const iconClass = "absolute left-4 top-[42px] w-5 h-5 text-gray-400 group-focus-within:text-bisa-navy transition-colors";

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
                    <div className="bg-gray-50 rounded-2xl p-6 border-2 border-dashed border-gray-200 relative">
                        <span className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-white px-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest border border-gray-200 rounded-full">
                            Zelle Details
                        </span>
                        
                        <div className="flex flex-col items-center">
                            <p className="text-4xl font-black text-bisa-navy mb-2 tracking-tighter">$30.00</p>
                            <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm w-full justify-center">
                                <span className="font-mono font-bold text-lg text-gray-800 tracking-wide selection:bg-bisa-gold">(843) 727-5264</span>
                                <button 
                                    onClick={() => navigator.clipboard.writeText('8437275264')}
                                    className="text-gray-400 hover:text-bisa-navy transition-colors"
                                    title="Copy"
                                >
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                                </button>
                            </div>
                            <p className="text-xs text-gray-400 mt-2 font-medium uppercase tracking-wide">Studio FB USA</p>
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
    <div id="matcher-form-container" className="w-full max-w-3xl mx-auto px-4 mb-20 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
      
      {/* Main Card */}
      <div className="bg-white rounded-3xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)] overflow-hidden border border-gray-100/50">
        
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row">
          
          {/* Left Column: Inputs */}
          <div className="p-8 md:p-10 flex-1 space-y-7">
            
            {/* Header for Form */}
            <div className="mb-6">
                <h3 className="text-lg font-black text-bisa-navy uppercase tracking-wide font-display border-b-2 border-bisa-gold/30 inline-block pb-1">
                    Details
                </h3>
            </div>

            {/* Spam Protection (Honey Pot) - Hidden */}
            <input type="text" name="_honey" style={{display: 'none'}} />

            {/* Player Name */}
            <div className={inputContainerClass}>
               <label className={labelClass}>{t.playerLabel}</label>
               <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
               </svg>
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

            {/* Parent Name */}
            <div className={inputContainerClass}>
               <label className={labelClass}>{t.parentLabel}</label>
               <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
               </svg>
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Phone */}
                <div className={inputContainerClass}>
                   <label className={labelClass}>{t.phoneLabel}</label>
                   <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                   </svg>
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

                {/* Email */}
                <div className={inputContainerClass}>
                   <label className={labelClass}>{t.emailLabel}</label>
                   <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                   </svg>
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

            {/* How It Works - Step by Step Section */}
            <div className="mt-2 pt-4 border-t border-gray-100">
                <h4 className="text-gray-300 font-bold text-[10px] uppercase tracking-widest mb-4 flex items-center">
                    {t.howItWorksTitle}
                </h4>
                
                <div className="space-y-4">
                    {/* Step 1 */}
                    <div className="flex items-start gap-3">
                        <div className="bg-blue-50 text-bisa-navy w-8 h-8 rounded-full flex items-center justify-center shrink-0 border border-blue-100">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                        </div>
                        <div>
                            <p className="text-bisa-navy font-bold text-xs">{t.step1Title}</p>
                            <p className="text-gray-500 text-[10px] leading-tight mt-0.5">{t.step1Desc}</p>
                        </div>
                    </div>

                    {/* Step 2 */}
                    <div className="flex items-start gap-3">
                        <div className="bg-blue-50 text-bisa-navy w-8 h-8 rounded-full flex items-center justify-center shrink-0 border border-blue-100">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                        </div>
                        <div>
                            <p className="text-bisa-navy font-bold text-xs">{t.step2Title}</p>
                            <p className="text-gray-500 text-[10px] leading-tight mt-0.5">{t.step2Desc}</p>
                        </div>
                    </div>
                </div>
            </div>

          </div>

          {/* Right Column: Payment & Submit - Dark Mode Card */}
          <div className="md:w-80 bg-[#001f52] p-8 md:p-10 flex flex-col justify-between relative overflow-hidden text-white">
              {/* Background Accents */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-bisa-gold/10 rounded-bl-full -mr-20 -mt-20"></div>
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-500/10 rounded-tr-full -ml-20 -mb-20"></div>
              
              <div className="relative z-10 space-y-8">
                  <div>
                      <h3 className="text-white/60 font-medium text-xs uppercase tracking-widest mb-1">{t.valueLabel}</h3>
                      <p className="text-5xl font-black text-white font-display tracking-tight">$30<span className="text-2xl text-white/50 align-top">.00</span></p>
                  </div>

                  <div className="space-y-4">
                      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
                          <p className="text-bisa-gold text-[10px] font-bold uppercase tracking-widest mb-1">{t.paymentInst}</p>
                          <div className="flex items-center justify-between">
                             <p className="font-mono font-bold text-lg tracking-wide">843 727-5264</p>
                             <button type="button" onClick={() => navigator.clipboard.writeText('8437275264')} className="text-white/40 hover:text-white transition-colors">
                                 <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                             </button>
                          </div>
                          <p className="text-white/40 text-[10px] mt-1">Studio FB USA</p>
                      </div>

                      <div className="flex items-start gap-2 text-white/60">
                          <svg className="w-4 h-4 mt-0.5 shrink-0 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                          <p className="text-[10px] leading-tight font-medium">{t.deadline}</p>
                      </div>
                  </div>
              </div>

              <div className="relative z-10 mt-10 md:mt-0">
                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-4 rounded-xl font-bold text-xs tracking-widest uppercase transition-all duration-300 transform shadow-xl border border-bisa-gold/50
                      ${loading 
                        ? 'bg-gray-800 text-gray-500 cursor-not-allowed' 
                        : 'bg-bisa-gold text-bisa-navy hover:bg-white hover:border-white hover:scale-105'
                      }`}
                  >
                    {loading ? (
                        <span className="flex items-center justify-center space-x-2">
                            <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <span>{t.sending}</span>
                        </span>
                    ) : (
                        <span>{t.confirmBtn}</span>
                    )}
                  </button>
                  <p className="text-center text-[10px] text-white/30 mt-4 italic">
                      {t.doubts}
                  </p>
              </div>

          </div>
        </form>
      </div>
      
      {/* Decorative Shadow/Reflection */}
      <div className="mx-auto w-[85%] bg-bisa-navy/20 h-4 rounded-[100%] blur-md -mt-2 relative z-[-1]"></div>
    </div>
  );
};

export default MatcherForm;