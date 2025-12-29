"use client";

import { useEffect, useRef, useCallback, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import reveal from './reveal.png';
import mirai from './mirai.png';
import shapeTwo from './shape-two.png';
import type { StaticImageData } from 'next/image';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Pointer hotspot component with hover expand effect
interface HotspotProps {
  title: string;
  subtitle: string;
  description: string;
  position: 'left' | 'right';
}

function Hotspot({ title, subtitle, description, position }: HotspotProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className={`flex items-center ${position === 'right' ? 'flex-row-reverse' : 'flex-row'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Circle with plus icon */}
      <div 
        className="relative z-20 flex items-center justify-center w-14 h-14 rounded-full cursor-pointer transition-all duration-500 ease-out shrink-0"
        style={{
          backgroundColor: isHovered ? 'rgba(0, 0, 0, 0.7)' : 'rgba(0, 0, 0, 0.5)',
          border: '1.5px solid rgba(255, 255, 255, 0.5)',
          boxShadow: isHovered ? '0 0 30px rgba(255,255,255,0.2)' : '0 0 20px rgba(0,0,0,0.5)',
        }}
      >
        {/* Plus icon */}
        <svg 
          width="22" 
          height="22" 
          viewBox="0 0 24 24" 
          fill="none"
          className="transition-transform duration-500"
          style={{
            transform: isHovered ? 'rotate(45deg)' : 'rotate(0deg)',
          }}
        >
          <line x1="12" y1="5" x2="12" y2="19" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="5" y1="12" x2="19" y2="12" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>
      
      {/* Title & Subtitle - Always visible */}
      <div 
        className={`flex flex-col justify-center transition-all duration-500 ${position === 'left' ? 'ml-4' : 'mr-4'}`}
        style={{
          opacity: isHovered ? 0 : 1,
          transform: isHovered ? 'translateX(20px)' : 'translateX(0)',
          position: isHovered ? 'absolute' : 'relative',
          pointerEvents: isHovered ? 'none' : 'auto',
        }}
      >
        <h3 
          style={{
            color: '#FFFFFF',
            fontSize: '16px',
            fontWeight: '400',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            textShadow: '0 2px 10px rgba(0,0,0,0.8)',
            whiteSpace: 'nowrap',
          }}
        >
          {title}
        </h3>
        <p 
          style={{
            color: 'rgba(255, 255, 255, 0.6)',
            fontSize: '11px',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            textShadow: '0 2px 10px rgba(0,0,0,0.8)',
            marginTop: '2px',
            whiteSpace: 'nowrap',
          }}
        >
          {subtitle}
        </p>
      </div>
      
      {/* Expandable content panel - Shows on hover */}
      <div 
        className="overflow-hidden transition-all duration-500 ease-out"
        style={{
          maxWidth: isHovered ? '350px' : '0px',
          opacity: isHovered ? 1 : 0,
          marginLeft: position === 'left' ? '-10px' : '0',
          marginRight: position === 'right' ? '-10px' : '0',
          paddingLeft: position === 'left' ? '20px' : '0',
          paddingRight: position === 'right' ? '20px' : '0',
        }}
      >
        <div 
          className="py-5 px-6 rounded-xl"
          style={{ 
            minWidth: '280px',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
          }}
        >
          <h3 
            style={{
              color: '#FFFFFF',
              fontSize: '18px',
              fontWeight: '400',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              marginBottom: '4px',
            }}
          >
            {title}
          </h3>
          <p 
            style={{
              color: 'rgba(255, 255, 255, 0.5)',
              fontSize: '12px',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              marginBottom: '16px',
            }}
          >
            {subtitle}
          </p>
          <p 
            style={{
              color: 'rgba(255, 255, 255, 0.85)',
              fontSize: '14px',
              fontWeight: '300',
              lineHeight: '1.7',
              letterSpacing: '0.02em',
            }}
          >
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

interface ZoomRevealProps {
  buildingImage?: string | StaticImageData;
  windowImage?: string | StaticImageData;
  shapeImage?: string | StaticImageData;
  scrollDistance?: string;
  buildingZoomScale?: number;
  windowZoomScale?: number;
  windowMoveDistance?: number;
}

export function RevealZoom({
  buildingImage = reveal,
  windowImage = mirai,
  shapeImage = shapeTwo,
  scrollDistance = "+=1000%",  // Balanced scroll distance
  buildingZoomScale = 16,
  windowZoomScale = 2.5,
  windowMoveDistance = 1,
}: ZoomRevealProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const buildingRef = useRef<HTMLImageElement>(null);
  const shapeRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const pointer1Ref = useRef<HTMLDivElement>(null);
  const pointer2Ref = useRef<HTMLDivElement>(null);
  const pointer3Ref = useRef<HTMLDivElement>(null);
  const pointer4Ref = useRef<HTMLDivElement>(null);
  const ctxRef = useRef<gsap.Context | null>(null);
  const canvasCtxRef = useRef<CanvasRenderingContext2D | null>(null);
  const rafIdRef = useRef<number | null>(null);
  const needsDrawRef = useRef(false);
  
  const [imageLoaded, setImageLoaded] = useState(false);
  const imageRef = useRef<HTMLImageElement | null>(null);
  
  const animState = useRef({
    scale: 1,
    panY: 0,
    lastScale: -1,
    lastPanY: -1,
  });

  const resolvedBuildingSrc = typeof buildingImage === 'string' ? buildingImage : buildingImage.src;
  const resolvedWindowSrc = typeof windowImage === 'string' ? windowImage : windowImage.src;
  const resolvedShapeSrc = typeof shapeImage === 'string' ? shapeImage : shapeImage.src;

  const drawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvasCtxRef.current;
    const img = imageRef.current;
    
    if (!canvas || !ctx || !img || !imageLoaded) return;

    const { scale, panY, lastScale, lastPanY } = animState.current;
    
    if (Math.abs(scale - lastScale) < 0.001 && Math.abs(panY - lastPanY) < 0.001) {
      return;
    }
    
    animState.current.lastScale = scale;
    animState.current.lastPanY = panY;

    const displayWidth = canvas.clientWidth;
    const displayHeight = canvas.clientHeight;
    
    const imgAspect = img.naturalWidth / img.naturalHeight;
    const canvasAspect = displayWidth / displayHeight;
    
    let drawWidth: number, drawHeight: number;
    
    if (imgAspect > canvasAspect) {
      drawHeight = displayHeight * scale;
      drawWidth = drawHeight * imgAspect;
    } else {
      drawWidth = displayWidth * scale;
      drawHeight = drawWidth / imgAspect;
    }

    const drawX = (displayWidth - drawWidth) / 2;
    const extraHeight = drawHeight - displayHeight;
    const drawY = -extraHeight * panY;

    ctx.drawImage(
      img,
      0, 0, img.naturalWidth, img.naturalHeight,
      drawX | 0, drawY | 0, 
      (drawWidth + 0.5) | 0, (drawHeight + 0.5) | 0
    );
  }, [imageLoaded]);

  const scheduleCanvasDraw = useCallback(() => {
    if (needsDrawRef.current) return;
    needsDrawRef.current = true;
    
    rafIdRef.current = requestAnimationFrame(() => {
      needsDrawRef.current = false;
      drawCanvas();
    });
  }, [drawCanvas]);

  const setupCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
    
    const ctx = canvas.getContext('2d', {
      alpha: false,
      desynchronized: true,
    });
    
    if (ctx) {
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'low';
      canvasCtxRef.current = ctx;
    }
    
    animState.current.lastScale = -1;
    animState.current.lastPanY = -1;
    drawCanvas();
  }, [drawCanvas]);

  useEffect(() => {
    const img = new Image();
    img.decoding = 'async';
    img.onload = () => {
      imageRef.current = img;
      setImageLoaded(true);
    };
    img.src = resolvedWindowSrc;
  }, [resolvedWindowSrc]);

  useEffect(() => {
    if (imageLoaded) setupCanvas();
  }, [imageLoaded, setupCanvas]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        setupCanvas();
        ScrollTrigger.refresh();
      }, 100);
    };
    
    window.addEventListener('resize', handleResize, { passive: true });
    return () => {
      clearTimeout(resizeTimeout);
      window.removeEventListener('resize', handleResize);
    };
  }, [setupCanvas]);

  useEffect(() => {
    if (typeof window === 'undefined' || !imageLoaded) return;

    ScrollTrigger.getAll().forEach(st => st.kill());
    
    ctxRef.current = gsap.context(() => {
      gsap.set(textRef.current, { opacity: 0, y: 40 });
      gsap.set([pointer1Ref.current, pointer2Ref.current, pointer3Ref.current, pointer4Ref.current], { 
        opacity: 0, 
        scale: 0,
        force3D: true
      });
      
      gsap.set(buildingRef.current, { force3D: true });
      gsap.set(shapeRef.current, { force3D: true });
      gsap.set(textRef.current, { force3D: true });
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top top",
          end: scrollDistance,
          pin: true,
          scrub: true,
          anticipatePin: 1,
          fastScrollEnd: true,
          preventOverlaps: true,
        },
      });

      // PHASE 1: Building zoom (much slower)
      tl.to(buildingRef.current, {
        scale: buildingZoomScale,
        ease: "none",
        duration: 8.0,
      }, 0);
      
      tl.to(buildingRef.current, {
        opacity: 0,
        ease: "none",
        duration: 2.5,
      }, 5.5);
      
      // Shape disappears (much slower)
      tl.to(shapeRef.current, {
        opacity: 0,
        ease: "none",
        duration: 3.0,
      }, 0);

      // PHASE 2: Text Entry
      tl.to(textRef.current, {
        opacity: 1,
        y: 0,
        ease: "none", 
        duration: 0.8,
      }, 1.5);

      // PHASE 3: Canvas Zoom - comfortable pacing
      tl.to(animState.current, {
        scale: windowZoomScale,
        duration: 2.0,
        ease: "none", 
        onUpdate: scheduleCanvasDraw,
      }, 4.5);

      // PHASE 4: Text Exit
      tl.to(textRef.current, {
        opacity: 0,
        y: -30,
        ease: "none",
        duration: 0.5,
      }, 6.0);

      // PHASE 5: Canvas Pan (slower)
      tl.to(animState.current, {
        panY: windowMoveDistance,
        duration: 4.5, 
        ease: "none", 
        onUpdate: scheduleCanvasDraw,
      }, 6.5);

      // Animate pointers with relaxed timing
      const animatePointer = (ref: React.RefObject<HTMLDivElement | null>, inT: number, outT: number) => {
        tl.to(ref.current, { 
          opacity: 1, 
          scale: 1, 
          ease: "none", 
          duration: 0.6 
        }, inT);
        tl.to(ref.current, { 
          opacity: 0, 
          scale: 0.95, 
          ease: "none", 
          duration: 0.5 
        }, outT);
      };

      animatePointer(pointer1Ref, 6.8, 8.0);
      animatePointer(pointer2Ref, 8.3, 9.5);
      animatePointer(pointer3Ref, 9.8, 11.0);
      animatePointer(pointer4Ref, 11.3, 12.5);

    }, wrapperRef);

    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      ctxRef.current?.revert();
    };
  }, [scrollDistance, buildingZoomScale, windowZoomScale, windowMoveDistance, scheduleCanvasDraw, imageLoaded]);

  useEffect(() => {
    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, []);

  return (
    <section 
      ref={wrapperRef} 
      className="relative w-full bg-black" 
      style={{ minHeight: '100vh', zIndex: 50, contain: 'layout style paint' }}
    >
      <img
        ref={shapeRef}
        src={resolvedShapeSrc}
        alt=""
        className="fixed top-0 left-1/2 w-full max-w-[100vw] pointer-events-none"
        style={{ 
          zIndex: 100,
          height: 'auto',
          objectFit: 'contain',
          transform: 'translateX(-50%) translateZ(0)',
          willChange: 'opacity',
          backfaceVisibility: 'hidden',
        }}
      />

      <div ref={containerRef} className="relative w-full h-screen overflow-hidden">
        <canvas 
          ref={canvasRef} 
          className="absolute inset-0 w-full h-full" 
          style={{ 
            zIndex: 1, 
            backgroundColor: '#000',
            imageRendering: 'auto',
          }} 
        />

        {/* Hotspot 1 - Top Left */}
        <div 
          ref={pointer1Ref} 
          className="absolute"
          style={{ zIndex: 20, top: '18%', left: '5%' }}
        >
          <Hotspot
            title="Penthouses"
            subtitle="Floors 29-32"
            description="The top floors of the Mirai building are a collection of 16 exclusive penthouses. Your life will unfold 100 metres above the ground: this is what the elite Club 100 membership reflects."
            position="left"
          />
        </div>

        {/* Hotspot 2 - Top Right */}
        <div 
          ref={pointer2Ref} 
          className="absolute"
          style={{ zIndex: 20, top: '22%', right: '5%' }}
        >
          <Hotspot
            title="Sky Lounge"
            subtitle="Level 35 - Rooftop"
            description="An exclusive rooftop sanctuary featuring panoramic 360-degree views of the city skyline. The perfect setting for private events, sunset cocktails, and unforgettable moments above the clouds."
            position="right"
          />
        </div>

        {/* Hotspot 3 - Bottom Left */}
        <div 
          ref={pointer3Ref} 
          className="absolute"
          style={{ zIndex: 20, bottom: '28%', left: '8%' }}
        >
          <Hotspot
            title="Wellness Spa"
            subtitle="Levels 3-4"
            description="A world-class wellness destination spanning two floors. Featuring infinity pools, Turkish hammam, cryotherapy chambers, and private treatment suites designed by award-winning architects."
            position="left"
          />
        </div>

        {/* Hotspot 4 - Bottom Right */}
        <div 
          ref={pointer4Ref} 
          className="absolute"
          style={{ zIndex: 20, bottom: '32%', right: '8%' }}
        >
          <Hotspot
            title="Private Gardens"
            subtitle="Podium Level"
            description="Landscaped terraces and secret gardens create tranquil retreats within the urban landscape. Native flora, water features, and meditation pavilions offer an escape from city life."
            position="right"
          />
        </div>

        <div 
          ref={textRef} 
          className="absolute top-20 right-8 md:right-12 lg:right-16 xl:right-24" 
          style={{ zIndex: 5, backfaceVisibility: 'hidden' }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight drop-shadow-2xl">
            Where You're Always<br />
            In Your Element
          </h2>
        </div>

        <div className="absolute inset-0 w-full h-full" style={{ zIndex: 10 }}>
          <img
            ref={buildingRef}
            src={resolvedBuildingSrc}
            alt="Interior Window View"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ 
              objectPosition: 'center center', 
              transform: 'translateZ(0)', 
              willChange: 'transform, opacity',
              backfaceVisibility: 'hidden',
            }}
          />
        </div>
      </div>
    </section>
  );
}

export default RevealZoom;