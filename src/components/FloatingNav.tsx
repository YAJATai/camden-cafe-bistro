import React from 'react';
import { BookOpen, MapPin, MessageCircle } from 'lucide-react';

export function FloatingNav() {
  const mapUrl = "https://www.google.com/maps/search/?api=1&query=Camden+Cafe+%26+Bistro+Baner+Pune";
  const whatsappUrl = "https://wa.me/918308218627";

  const scrollToMenu = () => {
    const el = document.getElementById('full-menu');
    if (el) {
      const lenis = (window as any).lenis;
      if (lenis) {
        lenis.scrollTo(el, { offset: -80, duration: 1.2 });
      } else {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="fixed right-4 md:right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-4 select-none">
      
      <div className="group flex items-center justify-end" onClick={scrollToMenu}>
        <div className="bg-neutral-900 border border-neutral-800 text-white hover:bg-orange-500 hover:border-orange-500 hover:scale-105 transition-all duration-300 rounded-full h-12 flex items-center px-4.5 cursor-pointer shadow-lg">
          <BookOpen className="w-5 h-5 flex-shrink-0 text-orange-400 group-hover:text-white" />
          <span className="font-manrope text-xs font-bold uppercase tracking-widest overflow-hidden max-w-0 group-hover:max-w-[300px] group-hover:ml-3 transition-all duration-300 whitespace-nowrap">
            View Menu
          </span>
        </div>
      </div>

      <a 
        href={mapUrl}
        target="_blank"
        rel="noopener noreferrer" 
        className="group flex items-center justify-end"
      >
        <div className="bg-neutral-900 border border-neutral-800 text-white hover:bg-orange-500 hover:border-orange-500 hover:scale-105 transition-all duration-300 rounded-full h-12 flex items-center px-4.5 cursor-pointer shadow-lg">
          <MapPin className="w-5 h-5 flex-shrink-0 text-orange-400 group-hover:text-white animate-bounce mt-1" />
          <span className="font-manrope text-xs font-bold uppercase tracking-widest overflow-hidden max-w-0 group-hover:max-w-[300px] group-hover:ml-3 transition-all duration-300 whitespace-nowrap">
            Get Directions
          </span>
        </div>
      </a>

      <a 
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer" 
        className="group flex items-center justify-end"
      >
        <div className="bg-neutral-900 border border-neutral-800 text-white hover:bg-emerald-600 hover:border-emerald-600 hover:scale-105 transition-all duration-300 rounded-full h-12 flex items-center px-4.5 cursor-pointer shadow-lg">
          <MessageCircle className="w-5 h-5 flex-shrink-0 text-emerald-400 group-hover:text-white" />
          <span className="font-manrope text-xs font-bold uppercase tracking-widest overflow-hidden max-w-0 group-hover:max-w-[300px] group-hover:ml-3 transition-all duration-300 whitespace-nowrap">
            Order on WhatsApp
          </span>
        </div>
      </a>

    </div>
  );
}
