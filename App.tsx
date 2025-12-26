import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import MatcherForm from './components/MatcherForm';
import InfoSection from './components/InfoSection';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import ResultsModal from './components/ResultsModal';
import { BookingFormData, VoucherDetails } from './types';

const App: React.FC = () => {
  const [voucher, setVoucher] = useState<VoucherDetails | null>(null);
  const [formData, setFormData] = useState<BookingFormData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleVoucherFound = (foundVoucher: VoucherDetails, data: BookingFormData) => {
    setVoucher(foundVoucher);
    setFormData(data);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900">
      <Header />
      <Hero />
      
      <main className="flex-grow">
        <MatcherForm onVoucherFound={handleVoucherFound} />
        <InfoSection />
        <Testimonials />
      </main>

      <Footer />

      {isModalOpen && (
        <ResultsModal 
          voucher={voucher}
          formData={formData}
          onClose={handleClose} 
        />
      )}
    </div>
  );
};

export default App;