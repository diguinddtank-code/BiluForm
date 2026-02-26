import React from 'react';
import { motion } from 'framer-motion';
import { Language } from '../types';

interface ValuePropProps {
  language: Language;
  scrollToForm: () => void;
}

const ValueProp: React.FC<ValuePropProps> = ({ language, scrollToForm }) => {
  const t = {
    pt: {
      title: "A Essência do Jogo",
      subtitle: "Mais do que fotos, capturamos o sentimento.",
      item1Title: "Presença Real",
      item1Desc: "Quando você assiste ao jogo através da tela do celular, você perde a conexão real. Esteja lá por ele, olho no olho. Deixe o registro conosco.",
      item2Title: "O Olhar Profissional",
      item2Desc: "Nossa equipe conhece o futebol. Sabemos onde a ação acontece, antecipamos o drible e congelamos o grito de gol com qualidade de revista.",
      item3Title: "Legado Visual",
      item3Desc: "O tempo passa rápido. Essas imagens serão a história que ele contará para os filhos. Um arquivo eterno da paixão dele pelo esporte.",
      cta: "Quero Garantir Minhas Fotos"
    },
    es: {
      title: "La Esencia del Juego",
      subtitle: "Más que fotos, capturamos el sentimiento.",
      item1Title: "Presencia Real",
      item1Desc: "Cuando miras el juego a través de la pantalla del celular, pierdes la conexión real. Estate ahí para él, ojo a ojo. Deja el registro con nosotros.",
      item2Title: "La Mirada Profesional",
      item2Desc: "Nuestro equipo conoce el fútbol. Sabemos dónde ocurre la acción, anticipamos el regate y congelamos el grito de gol con calidad de revista.",
      item3Title: "Legado Visual",
      item3Desc: "El tiempo pasa rápido. Estas imágenes serán la historia que él contará a sus hijos. Un archivo eterno de su pasión por el deporte.",
      cta: "Quiero Asegurar Mis Fotos"
    },
    en: {
      title: "The Essence of the Game",
      subtitle: "More than photos, we capture the feeling.",
      item1Title: "Real Presence",
      item1Desc: "When you watch the game through your phone screen, you lose the real connection. Be there for them, eye to eye. Leave the capturing to us.",
      item2Title: "The Professional Eye",
      item2Desc: "Our team knows soccer. We know where the action happens, we anticipate the move, and we freeze the celebration with magazine quality.",
      item3Title: "Visual Legacy",
      item3Desc: "Time flies. These images will be the story they tell their children. An eternal archive of their passion for the sport.",
      cta: "I Want to Secure My Photos"
    }
  }[language];

  const items = [
    { title: t.item1Title, desc: t.item1Desc, image: "https://images.unsplash.com/photo-1511886929837-354d827aae26?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
    { title: t.item2Title, desc: t.item2Desc, image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
    { title: t.item3Title, desc: t.item3Desc, image: "https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" }
  ];

  return (
    <section className="py-16 md:py-20 bg-white text-gray-900 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">
        
        <div className="text-center mb-12 md:mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-black font-display uppercase tracking-tight mb-3 md:mb-4"
          >
            {t.title}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-base md:text-lg text-gray-500 font-light max-w-2xl mx-auto"
          >
            {t.subtitle}
          </motion.p>
        </div>

        <div className="space-y-12 md:space-y-16">
          {items.map((item, idx) => (
            <div key={idx} className={`flex flex-col md:flex-row gap-6 md:gap-12 items-center ${idx % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
              
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex-1 w-full max-w-md"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-gray-100 shadow-md">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 0, y: 30 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex-1 text-center md:text-left"
              >
                <h3 className="text-xl md:text-2xl font-bold font-display uppercase tracking-tight mb-2 md:mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm md:text-base font-light">
                  {item.desc}
                </p>
              </motion.div>

            </div>
          ))}
        </div>

        <div className="mt-12 md:mt-16 text-center">
            <button 
                onClick={scrollToForm}
                className="bg-bisa-navy text-white px-8 py-3 md:px-10 md:py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-bisa-navy/90 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-sm md:text-base"
            >
                {t.cta}
            </button>
        </div>

      </div>
    </section>
  );
};

export default ValueProp;
