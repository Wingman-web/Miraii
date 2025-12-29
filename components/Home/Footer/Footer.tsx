'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import NightViewImg from './night_view.png';
import footerLogo from './footer_logo.png';
import helperLogo from '../../Helper/logo.png';

export default function Footer() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [showFallbackLogo, setShowFallbackLogo] = useState(false);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    // Wait for full page load before showing the footer to avoid flash during page load
    const handleScroll = () => {
      const scroll = window.pageYOffset || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.max(0, Math.min(1, scroll / Math.max(1, height)));
      
      setScrollProgress(progress);
      setShowBackToTop(scroll > 50);
    };

    const onLoad = () => setIsVisible(true);

    if (document.readyState === 'complete') {
      onLoad();
    } else {
      window.addEventListener('load', onLoad);
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('load', onLoad);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const pathLength = 307.919; // Approximate path length for the SVG circle

  return (
    <footer
      className="relative text-[#bfc6cf] h-screen flex items-center bg-[#050505]"
      style={{ zIndex: 10 }}
      role="contentinfo"
      aria-label="Footer - Pavani Mirai"
    >
      {/* Top shadow for the "rising" effect - full width */}
      <div className="absolute -top-20 left-0 right-0 h-20 bg-linear-to-t from-[#050505] to-transparent" />

      {/* Background image (positioned behind content) */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={NightViewImg}
          alt="Night view"
          fill
          priority
          unoptimized
          className="object-cover object-center opacity-100"
          style={{ filter: 'none' }}
        />
      </div>

      {/* Background overlay for readability (lighter so image remains visible) */}
      <div className="absolute inset-0 bg-black/10 pointer-events-none" aria-hidden="true" />

      {/* Black gradient behind content - left side only */}
      <div 
        className="absolute inset-0 w-1/2 bg-linear-to-r from-black/80 via-black/50 to-transparent pointer-events-none"
        aria-hidden="true"
      />

      <section className="relative z-10 h-full px-6 lg:px-12">
        <div className="flex items-center h-full">
          <div className="max-w-md">
            {/* Logo */}
            <div className={`mb-8 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <Image
                src={showFallbackLogo ? helperLogo : footerLogo}
                alt={showFallbackLogo ? 'Fallback logo' : 'Mirai Footer Logo'}
                width={160}
                height={48}
                className="w-auto h-auto max-w-50 lg:max-w-60 drop-shadow-md block"
                priority
                onError={() => setShowFallbackLogo(true)}
                style={{ filter: 'none' }}
              />
            </div>

            {/* Description */}
            <p className={`mb-8 text-base lg:text-lg transition-all duration-500 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              Here Earth, Water, Fire, Air and Space come together to catalyse <br className="hidden lg:block" /> 
              a sixth element of life that feels like it was built for you.
            </p>

            {/* Contact Section */}
            <div className={`flex flex-col gap-2 py-2 mb-8 transition-all duration-500 delay-200 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
              <p className="mb-2 font-bold text-[#f5f5f5] tracking-wide">
                <span>Contact Us :</span>
              </p>
              <Link 
                href="tel:+919876543212" 
                className="text-[#bfc6cf] hover:text-[#f5f5f5] transition-colors duration-200 flex items-center gap-2"
              >
                <i className="bi bi-phone text-[#f5f5f5]"></i>
                +91 9876543212
              </Link>
              <Link 
                href="mailto:info@pavanimirai.com" 
                className="text-[#bfc6cf] hover:text-[#f5f5f5] transition-colors duration-200 flex items-center gap-2"
              >
                <i className="bi bi-envelope text-[#f5f5f5]"></i>
                info@pavanimirai.com
              </Link>
              <Link 
                href="#" 
                className="text-[#bfc6cf] hover:text-[#f5f5f5] transition-colors duration-200 flex items-start gap-2"
              >
                <i className="bi bi-geo-alt text-[#f5f5f5] mt-1"></i>
                <span>4th Floor, Road No.36, Jubilee Hills, Hyderabad-500 033</span>
              </Link>
            </div>

            {/* Social Links */}
            <div className={`mb-6 transition-all duration-500 delay-300 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
              <div className="flex gap-4 pt-2">
                <Link 
                  href="#" 
                  className="text-[#bfc6cf] hover:text-[#f5f5f5] transition-colors duration-200 text-lg"
                  aria-label="Facebook"
                >
                  <i className="bi bi-facebook"></i>
                </Link>
                <Link 
                  href="#" 
                  className="text-[#bfc6cf] hover:text-[#f5f5f5] transition-colors duration-200 text-lg"
                  aria-label="Instagram"
                >
                  <i className="bi bi-instagram"></i>
                </Link>
                <Link 
                  href="#" 
                  className="text-[#bfc6cf] hover:text-[#f5f5f5] transition-colors duration-200 text-lg"
                  aria-label="LinkedIn"
                >
                  <i className="bi bi-linkedin"></i>
                </Link>
                <Link 
                  href="#" 
                  className="text-[#bfc6cf] hover:text-[#f5f5f5] transition-colors duration-200 text-lg"
                  aria-label="YouTube"
                >
                  <i className="bi bi-youtube"></i>
                </Link>
              </div>
            </div>

            {/* Footer Bottom */}
            <div className={`pt-3 text-xs lg:text-sm transition-all duration-500 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <div className="flex flex-col gap-1">
                <p className="text-[#bfc6cf]">
                  Copyright © <span>{currentYear}</span> PAVANI MIRAI. All Rights Reserved.
                </p>
                <Link 
                  href="https://www.wingmanbrandworks.com/" 
                  className="text-[#bfc6cf] hover:text-[#f5f5f5] transition-colors duration-200"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Design &amp; Developed By Wingman Brandworks LLP
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed right-5 bottom-5 w-14 h-14 rounded-full bg-white/3 flex items-center justify-center cursor-pointer z-50 transition-all duration-300 hover:bg-white/6 ${
          showBackToTop ? 'opacity-95' : 'opacity-0 pointer-events-none'
        }`}
        aria-label="Scroll to top"
      >
        <svg 
          className="w-11 h-11" 
          viewBox="-1 -1 102 102"
        >
          <path
            d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98"
            fill="none"
            stroke="#ffffff"
            strokeWidth="6"
            strokeLinecap="round"
            style={{
              strokeDasharray: `${pathLength} ${pathLength}`,
              strokeDashoffset: pathLength * (1 - scrollProgress),
              transition: 'stroke-dashoffset 150ms linear'
            }}
          />
        </svg>
      </button>
    </footer>
  );
}