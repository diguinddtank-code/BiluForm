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
      photoSectionTitle: "Seleção de Fotos",
      photoDesc: "As fotos do jogador serão disponibilizadas por meio de um link enviado ao responsável, onde poderá escolher as fotos do atleta.",
      photoPoint1: "Nesse link, o responsável poderá escolher as fotos do atleta.",
      photoPoint2: "Não há um número fixo de fotos, pois a quantidade varia de acordo com cada jogador.",
      valueLabel: "Valor do Pacote",
      paymentInst: "Chave Zelle (Studio FB USA)",
      deadline: "Enviar comprovante em até 24h",
      doubts: "Em caso de dúvidas, estamos à disposição. Agradecemos a confiança!",
      confirmBtn: "Confirmar Solicitação",
      sending: "Processando...",
      successTitle: "Solicitação Enviada!",
      successMsg: "Recebemos seus dados com sucesso. Por favor, lembre-se de enviar o comprovante do pagamento via Zelle para concluir o processo.",
      newOrder: "Fazer novo pedido"
    },
    es: {
      playerLabel: "Nombre del Jugador",
      playerPlace: "Nombre completo del atleta",
      parentLabel: "Nombre de la Madre / Tutor",
      parentPlace: "Nombre del tutor",
      phoneLabel: "Teléfono / WhatsApp",
      emailLabel: "Correo electrónico",
      photoSectionTitle: "Selección de Fotos",
      photoDesc: "Las fotos del jugador estarán disponibles a través de un enlace enviado al tutor, donde podrá elegir las fotos del atleta.",
      photoPoint1: "En este enlace, el responsable podrá elegir las fotos del atleta.",
      photoPoint2: "No hay un número fijo de fotos, ya que la cantidad varía según cada jugador.",
      valueLabel: "Valor del Paquete",
      paymentInst: "Zelle (Studio FB USA)",
      deadline: "Enviar comprobante dentro de las 24h",
      doubts: "En caso de dudas, estamos a disposición. ¡Agradecemos la confianza!",
      confirmBtn: "Confirmar Solicitud",
      sending: "Procesando...",
      successTitle: "¡Solicitud Enviada!",
      successMsg: "Hemos recibido sus datos con éxito. Por favor, recuerde enviar el comprobante de pago vía Zelle para completar el proceso.",
      newOrder: "Hacer nuevo pedido"
    },
    en: {
      playerLabel: "Player Name",
      playerPlace: "Full name of the athlete",
      parentLabel: "Parent / Guardian Name",
      parentPlace: "Guardian's name",
      phoneLabel: "Phone / WhatsApp",
      emailLabel: "E-mail",
      photoSectionTitle: "Photo Selection",
      photoDesc: "Player photos will be made available via a link sent to the guardian, where you can select the athlete's photos.",
      photoPoint1: "Through this link, the guardian can choose the athlete's photos.",
      photoPoint2: "There is no fixed number of photos, as the quantity varies for each player.",
      valueLabel: "Package Price",
      paymentInst: "Zelle (Studio FB USA)",
      deadline: "Send proof within 24h",
      doubts: "If you have any questions, we are here to help. Thank you for your trust!",
      confirmBtn: "Confirm Request",
      sending: "Processing...",
      successTitle: "Request Sent!",
      successMsg: "We have received your details successfully. Please remember to send the Zelle payment proof to complete the process.",
      newOrder: "Place new order"
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
            _subject: `📸 Pedido de Fotos: ${formData.playerName}`,
            _template: "table"
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

  const inputClass = "w-full bg-transparent border-b-2 border-gray-200 text-gray-900 text-lg focus:border-bisa-navy focus:bg-gray-50/50 block px-2 py-3 transition-all outline-none font-medium placeholder-gray-300 hover:border-gray-300";
  const labelClass = "block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1";

  if (submitted) {
    return (
        <div className="w-full max-w-2xl mx-auto px-4 mb-16 animate-pop-in">
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 p-10 text-center relative">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-bisa-navy to-bisa-gold"></div>
                <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce-slow">
                    <svg className="w-12 h-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h2 className="text-3xl font-black text-bisa-navy font-display uppercase mb-4">{t.successTitle}</h2>
                <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                    {t.successMsg}
                </p>
                <div className="p-4 bg-gray-50 rounded-xl mb-8 border border-gray-100 inline-block">
                    <p className="text-xs font-bold text-gray-400 uppercase mb-1">Zelle</p>
                    <p className="text-xl font-mono font-bold text-bisa-navy">(843) 727-5264</p>
                </div>
                <br/>
                <button 
                    onClick={() => setSubmitted(false)}
                    className="text-bisa-navy font-bold hover:text-bisa-gold transition-colors text-sm uppercase tracking-wider underline"
                >
                    {t.newOrder}
                </button>
            </div>
        </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto px-4 mb-16 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
      
      {/* Form Container */}
      <div className="bg-white rounded-t-2xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] overflow-hidden border border-gray-100 relative">
        
        {/* Simple Decorative Top Line */}
        <div className="h-1.5 w-full bg-bisa-navy"></div>

        <form onSubmit={handleSubmit} className="p-6 md:p-10">
          
          <div className="space-y-6">
            
            {/* Player Name */}
            <div className="group">
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

            {/* Parent Name */}
            <div className="group">
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
                {/* Phone */}
                <div className="group">
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

                {/* Email */}
                <div className="group">
                   <label className={labelClass}>{t.emailLabel}</label>
                   <input
                     type="email"
                     name="email"
                     required
                     value={formData.email}
                     onChange={handleChange}
                     className={inputClass}
                     placeholder="email@example.com"
                   />
                </div>
            </div>

            {/* Info Section - Clean Card */}
            <div className="mt-4 bg-gray-50 rounded-lg p-5 border border-gray-100">
                <h3 className="text-bisa-navy font-bold text-sm uppercase tracking-wide mb-2 flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    {t.photoSectionTitle}
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                    {t.photoDesc} <br/>
                    <span className="font-medium text-gray-700 mt-1 block">{t.photoPoint2}</span>
                </p>
            </div>

            {/* Payment Section - Simple & Clear */}
            <div className="mt-6 border-2 border-bisa-navy/10 rounded-xl p-6 flex flex-col items-center justify-center text-center bg-bisa-navy/5 relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-16 h-16 bg-bisa-gold/20 rounded-bl-full -mr-8 -mt-8"></div>
                 
                 <span className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">{t.valueLabel}</span>
                 <p className="text-5xl font-black text-bisa-navy font-display tracking-tight mb-4">$30.00</p>
                 
                 <div className="w-full border-t border-gray-200 my-3"></div>
                 
                 <p className="text-sm font-medium text-gray-600 mb-1">{t.paymentInst}</p>
                 <div className="bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm mb-2">
                    <p className="text-xl font-mono font-bold text-bisa-navy tracking-wide">(843) 727-5264</p>
                 </div>
                 <p className="text-[10px] text-red-500 font-bold uppercase tracking-wide">{t.deadline}</p>
            </div>

            {/* Footer Text */}
            <div className="text-center mt-6">
                <p className="text-gray-400 text-xs italic">
                    {t.doubts}
                </p>
            </div>

          </div>
        
          {/* Submit Button */}
          <div className="mt-8">
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-4 rounded-xl font-bold text-lg tracking-wide uppercase transition-all duration-300 transform shadow-lg hover:shadow-xl
                  ${loading 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                    : 'bg-bisa-navy text-white hover:-translate-y-1'
                  }`}
              >
                {loading ? (
                    <span className="flex items-center justify-center space-x-2">
                        <svg className="animate-spin h-5 w-5 text-white/50" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>{t.sending}</span>
                    </span>
                ) : (
                    <span>{t.confirmBtn}</span>
                )}
              </button>
          </div>
        </form>
      </div>
      
      {/* Simple shadow stack */}
      <div className="mx-auto w-[90%] bg-black/5 h-2 rounded-b-full blur-sm -mt-1 relative z-[-1]"></div>
    </div>
  );
};

export default MatcherForm;