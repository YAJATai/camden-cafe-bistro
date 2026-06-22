import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ITEMS = [
  { 
    label: 'Crispy Chicken Burger', 
    category: 'Burgers', 
    description: 'Crunchy fried chicken patty with fresh lettuce, tomatoes, and house sauce.',
    img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800' 
  },
  { 
    label: 'Al Pastor Tacos', 
    category: 'Tacos', 
    description: 'Three soft tacos filled with marinated grilled meat, pineapple, and fresh salsa.',
    img: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?q=80&w=800' 
  },
  { 
    label: 'Peri Peri Fries', 
    category: 'Add-Ons', 
    description: 'Crispy golden fries tossed in spicy peri peri seasoning with dip of your choice.',
    img: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?q=80&w=800' 
  },
  { 
    label: 'Ham & Cheese Sandwich', 
    category: 'Sandwiches', 
    description: 'Toasted sandwich loaded with smoked ham, melted cheddar, and house mayo.',
    img: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?q=80&w=800' 
  },
  { 
    label: 'Cozy Cafe Ambiance', 
    category: 'The Vibe', 
    description: 'Warm lighting, comfortable seating, and a relaxed atmosphere perfect for hanging out with friends.',
    img: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1200', 
    wide: true 
  },
  { 
    label: 'Veg Mexican Burger', 
    category: 'Burgers', 
    description: 'Spiced black bean and corn patty topped with guacamole, salsa, and jalapenos.',
    img: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?q=80&w=800' 
  },
  { 
    label: 'Grilled Cheese Sandwich', 
    category: 'Sandwiches', 
    description: 'Classic grilled sandwich oozing with melted mozzarella and cheddar, served with fries.',
    img: 'https://images.unsplash.com/photo-1638733050634-78c0f158d01f?q=80&w=800' 
  },
];

export function ProductGallery() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const items = gsap.utils.toArray('.gallery-item');
    gsap.from(items, {
      y: 40,
      duration: 0.7,
      ease: 'power3.out',
      stagger: 0.08,
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        once: true
      }
    });
  }, { scope: containerRef });

  return (
    <div className="bg-white py-16 md:py-24 flex flex-col items-center justify-center overflow-hidden" ref={containerRef}>
      <div className="w-[90%] md:w-[65%]">
        
        <div className="text-center mb-16">
          <span className="text-orange-500 uppercase tracking-[0.25em] text-[11px] font-bold font-manrope">Signature Bites</span>
          <h2 className="font-luxurious text-4xl md:text-5xl text-black mt-2">
            Camden Highlights
          </h2>
          <div className="w-12 h-[1px] bg-orange-400 mx-auto my-4" />
          <p className="text-neutral-500 font-manrope text-sm max-w-lg mx-auto leading-relaxed">
            From crispy burgers and loaded tacos to gooey grilled sandwiches — explore our most loved creations.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-4 md:gap-x-6">
          {ITEMS.slice(0, 4).map((item) => (
            <GalleryCard key={item.label} item={item} />
          ))}

          <GalleryCard item={ITEMS[4]} extraClasses="col-span-2" />
          <GalleryCard item={ITEMS[5]} />
          <GalleryCard item={ITEMS[6]} />
        </div>

      </div>
    </div>
  );
}

function GalleryCard({ item, extraClasses = '' }: { key?: string; item: any; extraClasses?: string }) {
  const [isLoaded, setIsLoaded] = React.useState(false);

  return (
    <div className={`p-1 gallery-item flex flex-col group ${extraClasses}`}>
      <div 
        className="overflow-hidden rounded-sm relative bg-neutral-100 shadow-sm" 
        style={{ aspectRatio: item.wide ? '8/3' : '3/4' }}
      >
        {!isLoaded && (
          <div className="absolute inset-0 bg-neutral-100 flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-neutral-100 via-neutral-200 to-neutral-100 -translate-x-full animate-[shimmer_1.5s_infinite]" />
            <div className="w-6 h-6 border-2 border-orange-400/20 border-t-orange-400 rounded-full animate-spin" />
          </div>
        )}

        <img 
          src={item.img}
          alt={item.label}
          loading="lazy"
          referrerPolicy="no-referrer"
          onLoad={() => setIsLoaded(true)}
          className={`w-full h-full object-cover object-center transition-all duration-[4000ms] group-hover:scale-[1.15] group-hover:ease-[cubic-bezier(0.22,0.61,0.36,1)] ${
            isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          } transition-opacity duration-700 ease-out`}
        />
        
        <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded text-[9px] uppercase tracking-wider text-white font-manrope font-semibold">
          {item.category}
        </div>
      </div>

      <div className="text-left mt-3">
        <h3 className="text-black text-[15px] font-manrope font-semibold tracking-wide">
          {item.label}
        </h3>
        <p className="text-neutral-500 text-xs font-manrope mt-1.5 leading-relaxed">
          {item.description}
        </p>
      </div>
    </div>
  );
}
