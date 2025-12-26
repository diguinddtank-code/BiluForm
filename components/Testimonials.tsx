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
    <div className="py-16 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
           <h2 className="text-3xl font-black text-bisa-navy font-display uppercase">Parents Love BISA</h2>
           <p className="text-gray-500 mt-2">Rated 5 Stars by local families</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, idx) => (
            <div key={idx} className="bg-gray-50 p-6 rounded-2xl relative border border-gray-100 hover:shadow-lg transition-all duration-300">
              <div className="absolute -top-4 left-6 bg-bisa-gold text-bisa-navy p-2 rounded-lg shadow-sm">
                 <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H12.017V5H22.017V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM5.01691 21L5.01691 18C5.01691 16.8954 5.91234 16 7.01691 16H10.0169C10.5692 16 11.0169 15.5523 11.0169 15V9C11.0169 8.44772 10.5692 8 10.0169 8H6.01691C5.46462 8 5.01691 8.44772 5.01691 9V11C5.01691 11.5523 4.56919 12 4.01691 12H3.01691V5H13.0169V15C13.0169 18.3137 10.3306 21 7.01691 21H5.01691Z" /></svg>
              </div>
              <p className="mt-4 text-gray-600 italic mb-6 text-sm leading-relaxed">"{review.text}"</p>
              <div className="flex items-center mt-auto">
                <img className="w-10 h-10 rounded-full mr-3" src={review.image} alt={review.name} />
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">{review.name}</h4>
                  <p className="text-gray-500 text-xs">{review.role}</p>
                </div>
                <div className="ml-auto flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-3 h-3 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                  ))}
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