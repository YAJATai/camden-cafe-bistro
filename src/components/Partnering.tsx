import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, MessageSquare } from 'lucide-react';
import { SplitText } from './ui/SplitText';

gsap.registerPlugin(ScrollTrigger);

const REVIEWS = [
  {
    name: 'Pune Foodies',
    tag: 'EazyDiner Review',
    rating: 5,
    text: "Camden Cafe & Bistro is the perfect spot for quick bites! The crispy chicken burger is absolutely delicious and the peri peri fries are a must-try. Great ambiance with friendly staff.",
    date: '3 months ago'
  },
  {
    name: 'Rahul Sharma',
    tag: 'Local Guide',
    rating: 4,
    text: "Love the Al Pastor tacos here — authentic flavors and generous portions. The grilled cheese sandwich is comfort food at its best. Definitely coming back for more!",
    date: '1 month ago'
  },
  {
    name: 'Priya Mehta',
    tag: 'Food Blogger',
    rating: 5,
    text: "Great value for money! Up to 30% off with bank offers makes it even better. The veg Mexican burger is flavourful and the coffee is excellent. Highly recommend!",
    date: '2 weeks ago'
  },
  {
    name: 'Amit Desai',
    tag: 'Regular Customer',
    rating: 4,
    text: "Been here multiple times. The chicken popcorn and loaded nachos are great starters. Casual vibe, good music, and the service is quick. Perfect for a relaxed evening.",
    date: '1 month ago'
  }
];

export function Partnering() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.set('.partner-title-char', { opacity: 0, y: 30 });
    gsap.to('.partner-title-char', {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.03,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 85%',
      }
    });

    gsap.set('.partner-card', { opacity: 0, y: 50 });
    gsap.to('.partner-card', {
      opacity: 1,
      y: 0,
      duration: 0.7,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.partner-cardsGrid',
        start: 'top 85%',
        once: true
      }
    });
  }, { scope: containerRef });

  return (
    <div 
      ref={containerRef} 
      className="relative w-full py-20 md:py-28 bg-neutral-950 overflow-hidden"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-orange-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center">
        
        <div className="flex flex-col items-center gap-2 mb-4">
          <div className="flex items-center gap-1.5 bg-neutral-900 border border-neutral-800 px-3 py-1 rounded-full">
            <span className="text-orange-400 font-bold text-xs">4.3</span>
            <div className="flex items-center text-orange-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-orange-400 text-orange-400" />
              ))}
            </div>
            <span className="text-neutral-500 text-[10px] uppercase tracking-wider font-bold">EazyDiner</span>
          </div>
        </div>

        <h2 className="text-center mb-14 overflow-hidden px-4">
          <SplitText
            text="What People Say"
            className="font-luxurious text-[32px] md:text-[44px] leading-[1.3] text-white"
            charClass="partner-title-char"
          />
        </h2>

        <div className="partner-cardsGrid w-[90%] md:w-[65%] grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {REVIEWS.map((review, i) => (
            <div 
              key={i} 
              className="partner-card bg-neutral-900/60 backdrop-blur-md border border-neutral-800/80 p-6 md:p-8 flex flex-col items-start gap-4 rounded-md transition-all duration-300 hover:border-orange-400/30 hover:bg-neutral-900/80"
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex flex-col">
                  <span className="text-white font-semibold font-manrope text-sm tracking-wide">{review.name}</span>
                  <span className="text-orange-400/80 text-[10px] tracking-wider uppercase font-semibold mt-0.5">{review.tag}</span>
                </div>
                <div className="flex items-center text-orange-400 gap-0.5">
                  {[...Array(review.rating)].map((_, idx) => (
                    <Star key={idx} className="w-3.5 h-3.5 fill-orange-400 text-orange-400" />
                  ))}
                  {review.rating < 5 && (
                    <Star className="w-3.5 h-3.5 text-neutral-700" />
                  )}
                </div>
              </div>

              <div className="relative">
                <MessageSquare className="absolute -top-3 -left-3 w-8 h-8 text-white/5 pointer-events-none" />
                <p className="text-neutral-300 text-xs md:text-sm font-manrope leading-relaxed italic pl-3 relative z-10">
                  "{review.text}"
                </p>
              </div>

              <div className="w-full h-[1px] bg-neutral-800 mt-[10px]" />

              <div className="flex items-center justify-between w-full text-[10px] text-neutral-500 font-manrope font-semibold">
                <span>Verified Review</span>
                <span>{review.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
