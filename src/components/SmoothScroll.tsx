import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

export function SmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // 1. Initialize Lenis smooth scroll engine
    const lenis = new Lenis({
      duration: 0.8, // snappier cinematic duration
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // beautiful exponential spring/ease-out
      touchMultiplier: 1.5,
      infinite: false,
    });

    lenisRef.current = lenis;
    (window as any).lenis = lenis;

    // 2. Connect Lenis to GSAP ScrollTrigger to ensure they remain synchronized
    lenis.on('scroll', () => {
      ScrollTrigger.update();
    });

    // 3. Keep GSAP's ticker aligned with Lenis
    const updateTicker = (time: number) => {
      // time represents elapsed time in seconds; lenis expects milliseconds
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);

    // Disable lag smoothing to prevent jumping/glitching on heavy frames
    gsap.ticker.lagSmoothing(0);

    // 4. Overwrite standard smooth step scrolling for page anchor clicks (e.g. from nav)
    // so they trigger Lenis's gorgeous smooth scroll instead of raw browser scroll
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      if (anchor && anchor.getAttribute('href')?.startsWith('#')) {
        const id = anchor.getAttribute('href');
        if (id && id !== '#') {
          e.preventDefault();
          const targetEl = document.querySelector(id);
          if (targetEl) {
            lenis.scrollTo(targetEl as HTMLElement, {
              offset: -80, // match our header padding offset
              duration: 1.5,
            });
          }
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    // Clean up
    return () => {
      document.removeEventListener('click', handleAnchorClick);
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
    };
  }, []);

  return null;
}
