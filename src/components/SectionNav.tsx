import React, { useEffect, useState } from 'react';
import { cn } from '../lib/utils';

const SECTIONS = [
  { id: 'hero', label: 'Tour' },
  { id: 'gallery', label: 'Highlights' },
  { id: 'full-menu', label: 'Full Menu' },
  { id: 'about', label: 'Our Story' },
  { id: 'partnering', label: 'Guestbook' },
  { id: 'footer', label: 'Connect' },
];

export function SectionNav() {
  const [activeSection, setActiveSection] = useState('hero');
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // 1. Calculate overall page scroll progress
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress(window.scrollY / totalHeight);
      }

      // 2. Detect which section is active (closest to center of viewport)
      const viewportCenter = window.innerHeight / 2;
      let currentSection = 'hero';
      let minDistance = Infinity;

      SECTIONS.forEach((section) => {
        const el = document.getElementById(section.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          // Check center of the section vs viewport center
          const sectionCenter = rect.top + rect.height / 2;
          const distance = Math.abs(sectionCenter - viewportCenter);

          if (distance < minDistance) {
            minDistance = distance;
            currentSection = section.id;
          }
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSectionClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const lenis = (window as any).lenis;
      if (lenis) {
        lenis.scrollTo(el, { offset: -80, duration: 1.5 });
      } else {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Find index of the active section for dynamic indicator positioning
  const activeIndex = SECTIONS.findIndex(s => s.id === activeSection);

  return (
    <div className="fixed right-6 md:right-8 top-[65%] -translate-y-1/2 z-40 flex flex-col items-center gap-5 select-none hidden sm:flex">
      {/* Vertical Track Line */}
      <div className="relative w-[2px] h-[160px] bg-white/10 rounded-full flex flex-col justify-between items-center py-2">
        {/* Dynamic scroll progress highlights within the track */}
        <div 
          className="absolute top-0 left-0 w-full bg-orange-400/40 transition-all duration-300 rounded-full"
          style={{ height: `${scrollProgress * 100}%` }}
        />

        {/* Dynamic active line overlay indicator that follows the dots */}
        <div 
          className="absolute w-1 bg-orange-400 rounded-full transition-all duration-500 ease-out"
          style={{
            height: '24px',
            top: `${(activeIndex / (SECTIONS.length - 1)) * 128 + 8}px`
          }}
        />

        {SECTIONS.map((section, idx) => {
          const isActive = activeSection === section.id;
          return (
            <button
              key={section.id}
              onClick={() => handleSectionClick(section.id)}
              className="group relative z-10 w-4 h-4 flex items-center justify-center focus:outline-none cursor-pointer"
              aria-label={`Scroll to ${section.label}`}
            >
              {/* Outer circle animation */}
              <div 
                className={cn(
                  "w-2.5 h-2.5 rounded-full border transition-all duration-300 flex items-center justify-center",
                  isActive 
                    ? "border-orange-400 bg-orange-400 scale-125 shadow-[0_0_10px_rgba(249,115,22,0.5)]" 
                    : "border-white/40 bg-zinc-900 group-hover:border-white group-hover:scale-110"
                )}
              >
                {/* Visual core dot */}
                <div 
                  className={cn(
                    "w-1 h-1 rounded-full bg-white transition-opacity duration-300",
                    isActive ? "opacity-100" : "opacity-0 group-hover:opacity-50"
                  )}
                />
              </div>

              {/* Tooltip hovering labels */}
              <div 
                className={cn(
                  "absolute right-7 py-1 px-3 rounded bg-black/85 backdrop-blur-md border border-white/10 shadow-lg text-[10px] tracking-[0.2em] font-manrope font-semibold text-white/90 uppercase whitespace-nowrap opacity-0 pointer-events-none translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0",
                  isActive && "opacity-60 bg-orange-400/10 border-orange-400/20"
                )}
              >
                {section.label}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
