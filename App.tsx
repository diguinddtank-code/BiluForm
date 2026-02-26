import React, { useState, useRef } from 'react';
import Hero from './components/Hero';
import BookingForm from './components/BookingForm';
import Footer from './components/Footer';
import ValueProp from './components/ValueProp';
import Portfolio from './components/Portfolio';
import { Language } from './types';

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>('pt');
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <Hero language={language} setLanguage={setLanguage} scrollToForm={scrollToForm} />
      
      <ValueProp language={language} />
      
      <Portfolio />

      <div ref={formRef} className="py-20 bg-gray-100 px-4">
        <BookingForm language={language} />
      </div>

      <Footer />
    </div>
  );
};

export default App;