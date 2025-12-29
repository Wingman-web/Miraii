'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import SkyPodsImg from './Sky_Pods.png';
import TerraImg from './terra.png';
import AquaImg from './aqua.png';
import AviaImg from './avia.png';
import PyroImg from './pyro.png';
import ShapeTwo from './shape-two.png';

interface Slide {
  id: number;
  image: string;
  label: string;
  title: string;
}

const slides: Slide[] = [
  {
    id: 0,
    image: SkyPodsImg.src,
    label: 'Sky Pods',
    title: 'An Elemental Rooftop\nwith Four Sky Pods'
  },

  {
    id: 1,
    image: TerraImg.src,
    label: 'Terra Pod',
    title: 'Here, Stories\nGrow Roots'
  },

  {
    id: 2,
    image: AquaImg.src,
    label: 'Aqua Pod',
    title: 'Where Water\nMeets Wonder'
  },

  {
    id: 3,
    image: PyroImg.src,
    label: 'Pyro Pod',
    title: 'Ignite Your\nPassion'
  },

  {
    id: 4,
    image: AviaImg.src,
    label: 'Avia Pod',
    title: 'Soaring Above\nthe Ordinary'
  }
];

export default function MiraiPodsSlider() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  // Use browser-friendly timer type so clearInterval works reliably
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const createdAtRef = useRef<number>(Date.now());
  const touchStartRef = useRef<number>(0);

  // Reset effect moved below start/stop definitions (kept there only once)

  const stopAutoPlay = useCallback(() => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
      autoPlayRef.current = null;
    }
  }, []);

  // startAutoPlay accepts an optional force flag to ignore user pause
  const startAutoPlay = useCallback((force = false) => {
    stopAutoPlay();
    if (!isPaused || force) {
      autoPlayRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev < slides.length - 1 ? prev + 1 : 0));
      }, 3000);
    }
  }, [isPaused, stopAutoPlay]);

  // Reset slider to first image when the section enters the viewport (every time)
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          stopAutoPlay();
          setCurrentIndex(0);
          // Force restart even if the slider was paused by the user
          startAutoPlay(true);
        }
      },
      { root: null, threshold: 0.45 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [startAutoPlay, stopAutoPlay]);

  const goToSlide = useCallback((index: number) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 800);
  }, [isAnimating, currentIndex]);

  const prev = useCallback(() => {
    if (currentIndex > 0) {
      goToSlide(currentIndex - 1);
    }
  }, [currentIndex, goToSlide]);

  const next = useCallback(() => {
    goToSlide(currentIndex < slides.length - 1 ? currentIndex + 1 : 0);
  }, [currentIndex, goToSlide]);

  useEffect(() => {
    startAutoPlay();
    return () => stopAutoPlay();
  }, [startAutoPlay, stopAutoPlay]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        stopAutoPlay();
        prev();
        startAutoPlay();
      } else if (e.key === 'ArrowRight') {
        stopAutoPlay();
        next();
        startAutoPlay();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [prev, next, startAutoPlay, stopAutoPlay]);

  const handleMouseEnter = () => {
    if (Date.now() - createdAtRef.current > 500) {
      setIsPaused(true);
      stopAutoPlay();
    }
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
    startAutoPlay();
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = e.changedTouches[0].screenX;
    setIsPaused(true);
    stopAutoPlay();
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEnd = e.changedTouches[0].screenX;
    const diff = touchStartRef.current - touchEnd;
    
    if (Math.abs(diff) > 50) {
      if (diff > 0) next();
      else prev();
    }
    
    setIsPaused(false);
    startAutoPlay();
  };

  return (
    <section 
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden bg-black"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slider Container */}
      <div className="relative w-full h-screen">
        {/* Slides */}
        <div className="relative w-full h-screen overflow-hidden">
          <div 
            className="flex h-screen transition-none"
            style={{ 
              transform: `translateX(-${currentIndex * 100}%)`,
              willChange: 'transform'
            }}
          >
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className={`relative min-w-full w-full h-screen shrink-0 overflow-hidden transition-opacity duration-800 ease-in-out ${
                  index === currentIndex ? 'opacity-100' : 'opacity-0'
                }`}
              >
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/60 to-transparent z-1" />
                
                {/* Image */}
                <img
                  src={slide.image}
                  alt={slide.label}
                  className={`absolute inset-0 w-full h-full object-cover transition-transform duration-1200 ease-out ${
                    index === currentIndex ? 'scale-100' : 'scale-105'
                  }`}
                />

                {/* Content Overlay */}
                <div 
                  className={`absolute bottom-20 left-8 md:left-15 z-10 text-white max-w-125 transition-opacity duration-800 ease-out ${
                    index === currentIndex ? 'opacity-100 delay-400' : 'opacity-0'
                  }`}
                >
                  <div 
                    className={`text-[13px] tracking-[2px] uppercase font-normal mb-5 font-sans text-white/80 transition-all duration-600 ease-out ${
                      index === currentIndex ? 'opacity-100 translate-y-0 delay-500' : 'opacity-0 translate-y-5'
                    }`}
                  >
                    {slide.label}
                  </div>
                  <h2 
                    className={`text-[42px] md:text-[52px] font-light leading-[1.2] tracking-[-0.5px] whitespace-pre-line transition-all duration-700 ease-out ${
                      index === currentIndex ? 'opacity-100 translate-y-0 delay-600' : 'opacity-0 translate-y-5'
                    }`}
                    style={{ fontFamily: 'Georgia, "Playfair Display", serif' }}
                  >
                    {slide.title}
                  </h2>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={() => {
            stopAutoPlay();
            prev();
            startAutoPlay();
          }}
          disabled={currentIndex === 0}
          className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md text-white border border-white/20 w-12 h-12 rounded-full flex items-center justify-center text-xl z-20 transition-all duration-300 opacity-0 hover:opacity-80 hover:bg-white/20 hover:scale-110 disabled:opacity-20 disabled:cursor-not-allowed group-hover:opacity-80"
          aria-label="Previous"
        >
          ‹
        </button>

        <button
          onClick={() => {
            stopAutoPlay();
            next();
            startAutoPlay();
          }}
          className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md text-white border border-white/20 w-12 h-12 rounded-full flex items-center justify-center text-xl z-20 transition-all duration-300 opacity-0 hover:opacity-80 hover:bg-white/20 hover:scale-110 group-hover:opacity-80"
          aria-label="Next"
        >
          ›
        </button>
      </div>

      {/* Thumbnail Navigation */}
      <div className="absolute bottom-20 right-8 md:right-15 z-15 flex flex-row gap-3 opacity-100 translate-y-0 transition-all duration-600 ease-in-out delay-400">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            onClick={() => {
              stopAutoPlay();
              goToSlide(index);
              startAutoPlay();
            }}
            className={`w-17.5 md:w-35 h-12.5 md:h-22.5 rounded overflow-hidden cursor-pointer relative transition-all duration-400 ease-out border-2 hover:scale-105 hover:border-white/60 ${
              index === currentIndex 
                ? 'border-white shadow-[0_4px_16px_rgba(0,0,0,0.5)]' 
                : 'border-transparent'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.label}
              className="w-full h-full object-cover"
            />
            <div 
              className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
                index === currentIndex ? 'opacity-0' : 'opacity-100'
              }`}
            />
          </div>
        ))}
      </div>

      {/* Hover trigger for arrows */}
      <style jsx>{`
        section:hover button[aria-label="Previous"]:not(:disabled),
        section:hover button[aria-label="Next"] {
          opacity: 0.8;
        }
      `}</style>

      {/* Decorative shape scoped to the component: centered and scaled so full image is visible */}
      <img
        src={ShapeTwo.src}
        alt=""
        aria-hidden="true"
        className="absolute -top-2 left-1/2 -translate-x-1/2 w-screen max-w-1250 md:max-w-1050 lg:max-w-1250 max-h-screen h-auto object-contain pointer-events-none select-none z-0 opacity-100 drop-shadow-2xl"
      />

    </section>
  );
}