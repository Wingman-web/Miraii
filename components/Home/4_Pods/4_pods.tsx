'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import BlurText from '../BlurText';

interface AnimatedElementProps {
  delay?: number;
  children: React.ReactNode;
  className?: string;
}

const AnimatedElement: React.FC<AnimatedElementProps> = ({ 
  delay = 0, 
  children, 
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
          // allow repeated animations by toggling visibility on leave
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
      className={`
        transition-all duration-700 ease-out
        ${isVisible 
          ? 'opacity-100 translate-y-0 scale-100' 
          : 'opacity-0 translate-y-8 scale-[0.99]'
        }
        ${className}
      `}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          // Only pass `play` to custom React components (non-primitive elements).
          // Primitive DOM elements have a string `type` (e.g. 'div', 'h2') and should not receive the prop.
          if (typeof child.type === 'string') return child;

          // Cast to ReactElement with an index signature so TypeScript accepts the extra prop
          return React.cloneElement(child as React.ReactElement<any>, { play: isVisible });
        }
        return child;
      })}
    </div>
  );
};

const MiraiPodsIntro: React.FC = () => {
  return (
    /* 1. Added z-index to slide OVER the previous scrubber 
       2. Changed overflow to hidden to stop horizontal scrolling
    */
    <section className="relative mt-0 lg:-mt-2 py-16 lg:py-32 bg-white overflow-hidden z-20">
      <div className="container max-w-275 mx-auto px-4 lg:px-6 relative z-10">
        <div className="text-center lg:px-20">
          <AnimatedElement delay={0} className="mb-6 pt-3">
            <h2 className="text-[48px] leading-[1.05] mb-4 migra-heading pods-heading" style={{ fontFamily: 'var(--font-magra)', fontWeight: 100 }}>
              4 Pods <br />
              Conceptualised by Nature,<br />
              Perfected for your Well-being
            </h2>
          </AnimatedElement>

          <AnimatedElement delay={150} className="max-w-200 mx-auto">
            <BlurText
              text={"At 220 metres, the elements rise and shape themselves into an elevated world of leisure and luxury in perfect harmony - the four sculpted Sky Pods. Each pod here is an ode to the four eternal elements of nature. Beyond them, space unfolds as the fifth, while Pavani Mirai gives rise to the sixth - life itself."}
              delay={300}
              animateBy="words"
              direction="top"
              className="block text-[#6b6b6b] text-base lg:text-lg leading-relaxed"
            />
          </AnimatedElement>
        </div>
      </div>

      {/* Background shape fix: 
          Added a container with overflow-hidden specifically for the background 
      */}
      <div className="hidden lg:block absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute right-[-5%] top-10 w-[55%] opacity-[0.12]">
          <Image
            src="/media/shape-two.png"
            alt="Background shape"
            width={760}
            height={600}
            className="w-full h-auto drop-shadow-[0_10px_300px_rgba(0,0,0,0.1)]"
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default MiraiPodsIntro;