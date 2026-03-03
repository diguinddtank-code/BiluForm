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
      copy: "Copiar",
      sendProof: "Enviar Comprovante no WhatsApp"
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
      copy: "Copiar",
      sendProof: "Enviar Comprobante por WhatsApp"
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
      copy: "Copy",
      sendProof: "Send Proof via WhatsApp"
    }
  }[language];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleWhatsAppClick = () => {
    const message = `Hello, I'm sending the payment proof for athlete: ${formData.playerName} (Team: ${formData.teamName})`;
    const url = `https://wa.me/18437275264?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
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

  const inputContainerClass = "relative group";
  const inputClass = "w-full pl-4 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:bg-white focus:border-bisa-navy focus:ring-1 focus:ring-bisa-navy transition-all outline-none font-medium";
  const labelClass = "block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2";

  if (submitted) {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            id="matcher-form-container" 
            className="w-full max-w-lg mx-auto px-4 py-20"
        >
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 relative">
                
                <div className="bg-gray-50 p-10 text-center relative overflow-hidden border-b border-gray-100">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h2 className="text-3xl font-black font-display text-bisa-navy uppercase tracking-tight leading-none mb-2">{t.successTitle}</h2>
                    <p className="text-gray-500 text-xs uppercase tracking-widest font-bold">{t.receipt}</p>
                </div>

                <div className="px-8 pb-12 pt-8 text-center">
                    
                    <div className="mb-8">
                        <p className="text-gray-500 text-sm mb-1 font-medium">{t.successMsg}</p>
                        <p className="text-2xl font-black font-display text-gray-900 uppercase tracking-tight">{formData.playerName}</p>
                    </div>

                    <p className="text-gray-600 font-medium mb-8 text-sm leading-relaxed">
                        {t.successMsg2}
                    </p>
                    
                    <div className="bg-gray-50 rounded-xl p-8 border border-gray-200 relative mt-4">
                        <span className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-white px-4 py-1 text-[10px] font-bold text-bisa-navy uppercase tracking-widest border border-gray-200 rounded-full whitespace-nowrap shadow-sm">
                            Zelle Details
                        </span>
                        
                        <div className="flex flex-col items-center">
                            <p className="text-5xl font-black font-display text-bisa-navy mb-4 tracking-tight">$39<span className="text-2xl text-gray-400">.00</span></p>
                            <div className="flex items-center justify-center space-x-4 bg-white px-6 py-4 rounded-lg border border-gray-200 w-full shadow-sm">
                                <span className="font-mono text-xl text-gray-900 tracking-wider font-bold">
                                    (843) 727-5264
                                </span>
                                <button 
                                    onClick={() => navigator.clipboard.writeText('8437275264')}
                                    className="text-gray-400 hover:text-bisa-navy transition-colors shrink-0 p-2 hover:bg-gray-50 rounded-md"
                                    title="Copy"
                                >
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                                </button>
                            </div>
                            <p className="text-[10px] text-gray-500 mt-4 uppercase tracking-widest font-bold">Studio FB USA</p>
                        </div>
                    </div>

                    <button 
                        onClick={handleWhatsAppClick}
                        className="mt-8 w-full bg-[#25D366] text-white py-4 rounded-xl font-bold text-sm uppercase tracking-widest hover:bg-[#20bd5a] transition-colors flex items-center justify-center gap-3 shadow-md"
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                        </svg>
                        {t.sendProof}
                    </button>

                    <div className="mt-6 text-[10px] text-gray-400 uppercase tracking-widest font-bold">
                        {t.deadline} • {t.doubts}
                    </div>
                </div>
            </div>
        </motion.div>
    );
  }

  return (
    <div id="matcher-form-container" className="w-full bg-white border-t border-gray-100">
      
      <div className="flex flex-col lg:flex-row w-full min-h-[800px]">
        
        <div className="p-8 md:p-16 lg:p-24 flex-1 flex flex-col justify-center">
          <div className="max-w-3xl mx-auto w-full space-y-12">
          
          <div className="mb-12">
              <motion.h3 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-4xl md:text-6xl font-black font-display text-bisa-navy uppercase tracking-tight leading-none mb-4"
              >
                  {t.title}
              </motion.h3>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                className="text-lg text-gray-500 font-medium leading-relaxed max-w-2xl"
              >
                  {t.subtitle}
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="mt-8 p-6 bg-gray-50 rounded-xl border border-gray-100 lg:hidden"
              >
                  <p className="text-sm text-gray-600 font-medium leading-relaxed">
                      <span className="text-bisa-navy font-bold uppercase tracking-widest text-[10px] block mb-2">Info</span> 
                      {t.packageDetails}
                  </p>
              </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="lg:hidden bg-gray-50 rounded-2xl border border-gray-200 p-8 mb-12 relative overflow-hidden"
          >
             <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-4">{t.valueLabel}</p>
             <div className="flex items-baseline gap-1 mb-6">
                 <span className="text-5xl font-black font-display text-bisa-navy tracking-tight">$39</span>
                 <span className="text-xl text-gray-400 font-bold">.00</span>
             </div>
             <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
                 <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-2">{t.paymentInst}</p>
                 <div className="flex items-center justify-between">
                     <span className="font-mono text-lg text-gray-900 font-bold">843 727-5264</span>
                     <button type="button" onClick={() => navigator.clipboard.writeText('8437275264')} className="text-gray-400 hover:text-bisa-navy transition-colors">
                         <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                     </button>
                 </div>
                 <p className="text-[10px] text-gray-400 mt-2 uppercase tracking-widest font-bold">Studio FB USA</p>
             </div>
          </motion.div>

          <motion.form 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            onSubmit={handleSubmit} 
            className="space-y-8"
          >
            <input type="text" name="_honey" style={{display: 'none'}} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                     className={`${inputClass} appearance-none`}
                   >
                     <option value="" disabled className="text-gray-400">{t.teamPlace}</option>
                     {teams.map(team => (
                       <option key={team} value={team} className="bg-white text-gray-900">{team}</option>
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            
            <div className="mt-12 pt-8 border-t border-gray-100">
                 <button
                    type="submit"
                    disabled={loading}
                    className="w-full md:w-auto md:min-w-[300px] bg-bisa-navy text-white px-10 py-4 rounded-full font-bold text-sm uppercase tracking-widest transition-all shadow-lg hover:shadow-xl hover:bg-bisa-navy/90 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {loading ? t.sending : t.submit}
                  </button>
                  <p className="text-left text-[10px] text-gray-400 font-bold mt-4 uppercase tracking-widest">
                      {t.deadline}
                  </p>
            </div>
          </motion.form>
          </div>
        </div>

        <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="hidden lg:flex lg:w-[40%] bg-gray-50 p-12 lg:p-24 flex-col justify-center relative overflow-hidden text-gray-900 shrink-0 border-l border-gray-200"
        >
            
            <div className="relative z-10 space-y-16">
                <div>
                    <h3 className="text-gray-500 font-bold text-[10px] uppercase tracking-widest mb-4">{t.valueLabel}</h3>
                    <p className="text-7xl font-black font-display text-bisa-navy tracking-tight leading-none">$39<span className="text-3xl text-gray-400 align-top">.00</span></p>
                </div>

                <div className="space-y-8">
                    <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
                        <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-3">{t.paymentInst}</p>
                        <div className="flex items-center justify-between mb-3">
                           <p className="font-mono text-2xl font-bold tracking-wider text-gray-900">843 727-5264</p>
                           <button type="button" onClick={() => navigator.clipboard.writeText('8437275264')} className="text-gray-400 hover:text-bisa-navy transition-colors p-2 bg-gray-50 rounded-lg">
                               <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                           </button>
                        </div>
                        <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">Studio FB USA</p>
                    </div>

                    <div className="flex items-start gap-4 text-gray-600 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <svg className="w-6 h-6 text-bisa-navy shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <p className="text-sm leading-relaxed font-medium">{t.packageDetails}</p>
                    </div>
                </div>
            </div>

            <div className="relative z-10 mt-16 pt-8 border-t border-gray-200">
                <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">
                    {t.doubts}
                </p>
            </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BookingForm;
