import React from 'react';

const Testimonials: React.FC = () => {
  const reviews = [
    {
      name: "Sarah Jenkins",
      role: "Soccer Mom",
      image: "https://i.pravatar.cc/150?img=35",
      text: "The difference in my son's ball control after just 3 classes is incredible. The coaches are tough but very encouraging."
    },
    {
      name: "Mike Thompson",
      role: "Parent of 2",
      image: "https://i.pravatar.cc/150?img=11",
      text: "We drove from Summerville for the trial and signed up immediately. Best indoor facility in the area."
    },
    {
      name: "Amanda Cole",
      role: "U10 Parent",
      image: "https://i.pravatar.cc/150?img=5",
      text: "Love the focus on technical skills. It's fast-paced and keeps the kids engaged the whole hour."
    }
  ];

  return (
    // Changed to Dark Navy background for maximum contrast with the previous light section
    <div className="py-20 bg-bisa-navy relative overflow-hidden">
      
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-10 left-10 w-64 h-64 bg-bisa-gold rounded-full mix-blend-overlay filter blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-400 rounded-full mix-blend-overlay filter blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-14">
           <div className="inline-flex items-center justify-center space-x-2 bg-white/10 rounded-full px-4 py-1.5 mb-4 backdrop-blur-sm border border-white/10">
              <span className="text-bisa-gold">★★★★★</span>
              <span className="text-white text-xs font-bold uppercase tracking-widest">Rated 5 Stars</span>
           </div>
           <h2 className="text-3xl md:text-4xl font-black text-white font-display uppercase tracking-tight">Parents Love BISA</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, idx) => (
            <div key={idx} className="bg-white/5 backdrop-blur-md p-8 rounded-2xl relative border border-white/10 hover:bg-white/10 transition-all duration-300 hover:-translate-y-2 hover:border-bisa-gold/50 group">
              <div className="absolute -top-5 left-8 bg-gradient-to-br from-bisa-gold to-yellow-600 text-bisa-navy p-3 rounded-xl shadow-lg transform rotate-3 group-hover:rotate-6 transition-transform">
                 <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H12.017V5H22.017V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM5.01691 21L5.01691 18C5.01691 16.8954 5.91234 16 7.01691 16H10.0169C10.5692 16 11.0169 15.5523 11.0169 15V9C11.0169 8.44772 10.5692 8 10.0169 8H6.01691C5.46462 8 5.01691 8.44772 5.01691 9V11C5.01691 11.5523 4.56919 12 4.01691 12H3.01691V5H13.0169V15C13.0169 18.3137 10.3306 21 7.01691 21H5.01691Z" /></svg>
              </div>
              
              <p className="mt-6 text-gray-200 italic mb-8 text-sm leading-relaxed font-light tracking-wide opacity-90">
                "{review.text}"
              </p>
              
              <div className="flex items-center mt-auto border-t border-white/10 pt-4">
                <img className="w-10 h-10 rounded-full mr-3 ring-2 ring-bisa-gold/50" src={review.image} alt={review.name} />
                <div>
                  <h4 className="font-bold text-white text-sm">{review.name}</h4>
                  <p className="text-gray-400 text-xs uppercase tracking-wide">{review.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;