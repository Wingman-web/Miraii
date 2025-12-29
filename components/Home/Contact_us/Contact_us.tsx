'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import DayViewImg from './day_view.png';

export default function ContactForm() {
  const [bgLoaded, setBgLoaded] = useState(false);
  const [bgError, setBgError] = useState(false);

  useEffect(() => {
    const img = new window.Image();
    img.onload = () => setBgLoaded(true);
    img.onerror = () => {
      setBgLoaded(true);
      setBgError(true);
    };
    img.src = DayViewImg.src;
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, []);

  // Render a neutral placeholder until background image is ready
  if (!bgLoaded) {
    return (
      <section
        id="contact-section"
        className="fixed inset-0 flex items-center justify-start bg-gray-100"
        style={{ zIndex: 1 }}
      >
        <div className="absolute inset-0 -z-10 bg-linear-to-r from-white via-gray-100 to-white" aria-hidden="true" />
        <div className="relative z-10 h-full pl-6 lg:pl-12">
          <div className="flex items-center justify-start h-full">
            <div className="w-full max-w-md bg-white rounded-xl p-8 md:p-10 shadow-2xl">
              <h2 className="text-3xl font-bold mb-8 text-gray-900 font-serif">Contact Us</h2>
              <div className="space-y-6">
                <input 
                  placeholder="Name *" 
                  className="w-full px-4 py-4 border-b-2 border-gray-200 outline-none text-black focus:border-blue-600 transition-colors" 
                />
                <input 
                  placeholder="Email *" 
                  className="w-full px-4 py-4 border-b-2 border-gray-200 outline-none text-black focus:border-blue-600 transition-colors" 
                />
                <button className="w-full bg-blue-600 text-white py-4 rounded-lg font-bold hover:bg-blue-700 transition-all">
                  SUBMIT
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="contact-section"
      className="fixed inset-0 flex items-center justify-start bg-black"
      style={{ zIndex: 1 }}
    >
      {/* Background Image (render only if it loaded without error) */}
      {!bgError && (
        <div className="absolute inset-0 -z-10">
          <Image
            src={DayViewImg}
            alt="Day view"
            fill
            priority
            className="object-cover object-center"
          />
        </div>
      )}
      
      {/* Removed dark overlay so background image displays at full brightness */}
      
      <div className="relative z-10 h-full pl-6 lg:pl-12">
        <div className="flex items-center justify-start h-full">
          <div className="w-full max-w-md bg-white rounded-xl p-8 md:p-10 shadow-2xl">
            <h2 className="text-3xl font-bold mb-8 text-gray-900 font-serif">Contact Us</h2>
            <div className="space-y-6">
              <input 
                placeholder="Name *" 
                className="w-full px-4 py-4 border-b-2 border-gray-200 outline-none text-black focus:border-blue-600 transition-colors" 
              />
              <input 
                placeholder="Email *" 
                className="w-full px-4 py-4 border-b-2 border-gray-200 outline-none text-black focus:border-blue-600 transition-colors" 
              />
              <button className="w-full bg-blue-600 text-white py-4 rounded-lg font-bold hover:bg-blue-700 transition-all">
                SUBMIT
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}