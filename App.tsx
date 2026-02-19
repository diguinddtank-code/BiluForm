import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import MatcherForm from './components/MatcherForm';
import Footer from './components/Footer';
import { Language } from './types';

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>('pt');

  // Auto-detect language on mount
  useEffect(() => {
    const browserLang = navigator.language.split('-')[0];
    if (browserLang === 'es') {
      setLanguage('es');
    } else if (browserLang === 'pt') {
      setLanguage('pt');
    } else {
      setLanguage('en'); // Default fallback
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900">
      <Header />
      
      {/* Pass language state to Hero (for switcher) and Form (for content) */}
      <Hero language={language} setLanguage={setLanguage} />
      
      {/* Container to pull the form up into the Hero and center it. Adjusted margin for smaller hero. */}
      <main className="flex-grow -mt-12 relative z-20 pb-20">
        <MatcherForm language={language} />
      </main>

      <Footer />
    </div>
  );
};

export default App;