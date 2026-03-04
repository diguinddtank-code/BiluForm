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
      cta: "Garantir Minhas Fotos"
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
      cta: "Asegurar Mis Fotos"
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
      cta: "Secure My Photos"
    }
  }[language];

  const items = [
    { title: t.item1Title, desc: t.item1Desc, image: "https://i.imgur.com/C2mK9uy.jpeg" },
    { title: t.item2Title, desc: t.item2Desc, image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
    { title: t.item3Title, desc: t.item3Desc, image: "https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" }
  ];

  return (
    <section className="py-20 md:py-32 bg-white text-gray-900 overflow-hidden relative">
      <div className="max-w-6xl mx-auto px-4 md:px-8 relative z-10">
        
        <div className="mb-16 md:mb-24 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl md:text-6xl font-black font-display uppercase tracking-tight mb-4"
          >
            {t.title}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="text-lg md:text-2xl text-gray-500 font-medium max-w-2xl mx-auto"
          >
            {t.subtitle}
          </motion.p>
        </div>

        <div className="space-y-16 md:space-y-24">
          {items.map((item, idx) => (
            <div key={idx} className={`flex flex-col md:flex-row gap-8 md:gap-16 items-center ${idx % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
              
              {/* Text Content */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: idx * 0.1, ease: "easeOut" }}
                className="flex-1 w-full text-center md:text-left"
              >
                <div className="relative z-10">
                    <h3 className="text-3xl md:text-4xl font-black font-display uppercase tracking-tight mb-4 text-bisa-navy">{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed text-lg font-medium">
                    {item.desc}
                    </p>
                </div>
              </motion.div>

              {/* Image Content */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: idx * 0.1, ease: "easeOut" }}
                className="flex-1 w-full"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-gray-100 shadow-xl">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </motion.div>

            </div>
          ))}
        </div>

        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mt-20 md:mt-32 text-center"
        >
            <button 
                onClick={scrollToForm}
                className="bg-bisa-navy text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-bisa-navy/90 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-sm md:text-base"
            >
                {t.cta}
            </button>
        </motion.div>

      </div>
    </section>
  );
};

export default ValueProp;
