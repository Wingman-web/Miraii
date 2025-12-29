'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ImageScrollScrubber() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const imagesRef = useRef<HTMLImageElement[]>([]);
  const frameObj = useRef({ frame: 0 }); // Object for GSAP to animate
  const animationRef = useRef<number | null>(null); // RAF id when animating GIFs

  useEffect(() => {
    const loadImages = async () => {
      try {
        setLoading(true);
        const images: HTMLImageElement[] = [];
        const totalImages = 5;

        for (let i = 1; i <= totalImages; i++) {
          // Prefer GIF frames in the public folder (fallback to svg/png/jpg/webp)
          const exts = ['.gif', '.png', '.jpg', '.webp', '.svg'];
          let loaded = false;
          for (const ext of exts) {
            const imagePath = `/components/Home/Mirai_Grace/${i}${ext}`;
            const img = new Image();
            await new Promise<void>((resolve) => {
              img.onload = () => {
                images.push(img);
                loaded = true;
                resolve();
              };
              img.onerror = () => resolve();
              img.src = imagePath;
            });
            if (loaded) break;
          }
        }
        if (images.length === 0) throw new Error("No images loaded");
        imagesRef.current = images;
        setLoading(false);
        console.log('Mirai_Grace loaded', images.length, images[0]?.src);
        initGSAP();

        // If GIF frames are used, start a continuous RAF loop so animated GIF frames get redrawn
        const containsGif = images[0]?.src?.endsWith('.gif');
        if (containsGif) {
          if (animationRef.current == null) {
            const loop = () => {
              render();
              animationRef.current = requestAnimationFrame(loop);
            };
            animationRef.current = requestAnimationFrame(loop);
          }
        }
      } catch (err) {
        setLoading(false);
        setError(err instanceof Error ? err.message : 'Unknown error');
      }
    };

    const render = () => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');
      if (!canvas || !ctx || imagesRef.current.length === 0) return;

      const img = imagesRef.current[Math.round(frameObj.current.frame)];
      if (!img) return;

      const vw = canvas.width / (window.devicePixelRatio || 1);
      const vh = canvas.height / (window.devicePixelRatio || 1);
      const sw = img.naturalWidth || img.width;
      const sh = img.naturalHeight || img.height;
      const scale = Math.max(vw / sw, vh / sh);
      const w = sw * scale;
      const h = sh * scale;
      const x = (vw - w) / 2;
      const y = (vh - h) / 2;

      ctx.clearRect(0, 0, vw, vh);
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, vw, vh);
      ctx.drawImage(img, x, y, w, h);
    };

    const initGSAP = () => {
      const canvas = canvasRef.current;
      if (!canvas || !sectionRef.current) return;

      // Set canvas size
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.getContext('2d')?.scale(dpr, dpr);

      // Create GSAP Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=300%", // Scroll length
          pin: true,     // GSAP handles pinning instead of CSS sticky
          scrub: 0.5,    // Smooth transition between frames
          onUpdate: render,
          // Prevent the "black gap" by ensuring the pin remains active
          anticipatePin: 1, 
        }
      });

      // Animate frame property from 0 to last index
      tl.to(frameObj.current, {
        frame: imagesRef.current.length - 1,
        snap: "frame", // Optional: snap to whole numbers
        ease: "none",
        onUpdate: render
      });

      // Initial render
      render();
    };

    loadImages();

    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.getContext('2d')?.scale(dpr, dpr);
      render();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    };
  }, []);

  return (
    <div className="relative w-full bg-black overflow-hidden">
      {/* GSAP will "pin" this entire section */}
      <div ref={sectionRef} className="relative w-full h-screen bg-black">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black z-20">
            <div className="w-10 h-10 border-2 border-white border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* Canvas forced to stay inside viewport */}
        <canvas 
          ref={canvasRef}
          className="block w-full h-full object-cover"
        />
      </div>
      
      {/* Spacer below to ensure content follows correctly after unpinning */}
      <div className="h-px bg-black" />
    </div>
  );
}