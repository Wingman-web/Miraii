'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import BlurText from '../BlurText';

interface AnimatedElementProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

const AnimatedElement: React.FC<AnimatedElementProps> = ({ 
  children, 
  delay = 0, 
  className = '' 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        } else {
          setIsVisible(false);
        }
      },
      { 
        root: null, 
        rootMargin: '0px 0px -12% 0px', 
        threshold: 0 
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={elementRef}
      className={`transition-all duration-600 ease-out ${
        isVisible 
          ? 'opacity-100 translate-y-0 scale-100' 
          : 'opacity-0 translate-y-5.5 scale-[0.995]'
      } ${className}`}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          // Avoid passing `play` prop to DOM nodes (h2, p), pass only to custom components like BlurText
          if (typeof child.type === 'string') return child;
          return React.cloneElement(child as React.ReactElement<any>, { play: isVisible });
        }
        return child;
      })}
    </div>
  );
};

export default function ClubhouseIntro() {
  return (
    <section className="relative py-16 lg:py-20 bg-white">
      <div className="container max-w-275 mx-auto px-10 lg:px-0">
        <div className="text-center px-4 lg:px-20 pb-0 lg:pb-8">
          <AnimatedElement delay={0}>
            <h2 className="text-[48px] leading-[1.05] mb-4 migra-heading pods-heading" style={{ fontFamily: 'var(--font-magra)', fontWeight: 100 }}>
              4-Level Clubhouse<br />
              For Indulgence Across Storeys
            </h2>
          </AnimatedElement>
          
          <AnimatedElement delay={120} className="max-w-200 mx-auto">
            <BlurText
              text={"Nature crafted five elements - Earth that grounds us. Water that nourishes us. Fire that warms us. Air that breathes through us. Space that holds us."}
              delay={300}
              animateBy="words"
              direction="top"
              className="block text-[#6b6b6b] text-base lg:text-lg leading-relaxed"
            />
          </AnimatedElement>
        </div>
      </div>
      
      {/* Shape decoration - hidden on mobile */}
      <div className="hidden lg:block absolute -right-[6%] top-2.5 w-[55%] max-w-175 opacity-[0.12] pointer-events-none">
        <Image
          src="/media/shape-two.png"
          alt="About mirai shape"
          width={760}
          height={400}
          className="w-full h-auto drop-shadow-[0_10px_30px_rgba(0,0,0,0.08)]"
          priority={false}
        />
      </div>
    </section>
  );
}