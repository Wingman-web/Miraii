'use client'

import React, { useState, useRef, useEffect } from 'react'
import { HiBars3BottomRight } from 'react-icons/hi2'
import { IoClose } from 'react-icons/io5'
import { NAV_LINKS } from '@/constant/nav_constant'
import Logo from '@/components/Helper/logo'

const TabNav = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [hoveredLink, setHoveredLink] = useState<number | null>(null)
  const containerRef = useRef(null)
  const STAR_COUNT = 20

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (isOpen) document.body.classList.add('overflow-hidden')
    else document.body.classList.remove('overflow-hidden')
  }, [isOpen])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const script = document.createElement('script')
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js'
      document.head.appendChild(script)
    }
  }, [])

  const carouselImages = [
    'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=500&h=600&fit=crop',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500&h=600&fit=crop',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=500&h=600&fit=crop',
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500&h=600&fit=crop',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=600&fit=crop'
  ]

  return (
    <>
<nav className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${isOpen ? 'bg-black' : 'bg-transparent'}`}>
        <div className="absolute left-8 top-1/2 -translate-y-1/2 z-50">
          <Logo isOpen={isOpen} />
        </div>
        <div className="absolute right-8 top-1/2 -translate-y-1/2 z-50">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white hover:text-gray-400 transition text-2xl"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            {isOpen ? <IoClose size={28} /> : <HiBars3BottomRight size={28} />}
          </button>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex justify-between items-center h-20">

          </div>
        </div>
      </nav>

      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 z-40 ${
          isOpen ? 'opacity-50' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Fullscreen Menu */}
      <div
        className={`fixed inset-x-0 top-20 bottom-0 bg-black/90 backdrop-blur-sm transform transition-transform duration-500 ease-in-out z-50 hide-scrollbar ${
          isOpen ? 'translate-y-0' : 'translate-y-full'
        } overflow-hidden`}
      >
        {/* Falling Stars Background */}
        {isOpen && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            {[...Array(STAR_COUNT)].map((_, i) => {
              const randomSize = Math.random() * 3 + 1
              const randomLeft = Math.random() * 100
              const randomTop = Math.random() * 100
              const randomOpacity = Math.random() * 0.7 + 0.3
              const randomDuration = Math.random() * 4 + 3
              const randomDelay = Math.random() * 2
              const randomX = Math.random() * 400 - 200

              const starStyle = {
                width: (randomSize * 1.6) + 'px',
                height: (randomSize * 1.6) + 'px',
                left: randomLeft + '%',
                top: randomTop + '%',
                opacity: Math.max(randomOpacity * 0.45, 0.2),
                ['--tx' as any]: randomX + 'px',
                ['--dur' as any]: `${randomDuration}s`,
                ['--delay' as any]: `${randomDelay}s`,
                zIndex: 9999,
                filter: 'drop-shadow(0 0 2px rgba(255,255,255,0.35))',
                mixBlendMode: 'normal'
              } as React.CSSProperties

              return (
                <div
                  key={i}
                  className="absolute bg-white rounded-full star"
                  style={starStyle}
                />
              )
            })}
          </div>
        )}

        {/* Content - 2 Columns */}
        <div className="flex h-full w-full relative z-10 items-stretch gap-6">
          <button
            aria-label="Close menu"
            className="absolute top-4 right-4 text-white z-50"
            onClick={() => setIsOpen(false)}
          >
            <IoClose size={28} />
          </button>

          {/* Left Section - Navigation Links (1/2) */}
            <div style={{ width: '45%', height: '100%' }} className="bg-black p-8 pt-4 flex flex-col justify-start overflow-hidden min-h-0">
            {/* Menu heading removed per request */}
            
            <div className="flex flex-col gap-12">
              {NAV_LINKS.map((link, index) => (
                <a
                  key={link.id}
                  href={link.href}
                  onMouseEnter={() => { setHoveredLink(link.id); setActiveIndex(index); }}
                  onMouseLeave={() => setHoveredLink(null)}
                  onClick={() => setIsOpen(false)}
                  className="group relative inline-block"
                  style={{ transform: hoveredLink === link.id ? 'translateX(12px)' : 'translateX(0)', transition: 'transform 0.3s ease' }}
                >
                  <span className="inline-block text-[44px] font-bold transition-all duration-300 cursor-pointer" style={{ fontFamily: 'var(--font-magra, "Magra", "Century Gothic", Arial, sans-serif)', lineHeight: '1', color: hoveredLink === link.id ? '#78252f' : '#fff' }}>
                    {link.label}
                    <span className={`h-1 bg-[#78252f] mt-3 transform origin-left transition-transform duration-300 ${
                      hoveredLink === link.id ? 'scale-x-100' : 'scale-x-0'
                    }`} style={{width: 'auto', display: 'inline-block', marginTop: '8px'}} />
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Right Section - Gallery (1/2) */}
          <div style={{ width: '55%', height: '100%' }} className="bg-black flex flex-col items-center justify-center relative overflow-visible p-8 min-h-0">
            <div 
              className="flex items-center justify-center flex-1"
              style={{ 
                width: '100%',
                transformStyle: 'preserve-3d',
                perspective: '1200px',
              }}
            >
              <div
                ref={containerRef}
                style={{ 
                  transformStyle: 'preserve-3d',
                  transform: `rotateZ(-20deg) rotateX(-10deg) translateY(14px) rotateY(${activeIndex * -72}deg)`,
                  transition: 'transform 0.8s cubic-bezier(0.645, 0.045, 0.355, 1)',
                  width: '420px',
                  height: '600px',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {carouselImages.map((img, index) => {
                  const angle = (index * 360) / carouselImages.length
                  const radius = 148
                   
                  return (
                    <div
                      key={index}
                      className="absolute cursor-pointer hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                      style={{
                        width: '240px',
                        height: '380px',
                        left: '48%',
                        top: '39%',
                        marginLeft: '-130px',
                        marginTop: '-172px',
                        transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                        transformStyle: 'preserve-3d',
                        backfaceVisibility: 'hidden',
                      }}
                      onClick={() => setActiveIndex(index)}
                    >
                      <img
                        src={img}
                        alt={`carousel-${index}`}
                        className="w-full h-full object-cover rounded-xl shadow-2xl"
                      />
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Carousel Controls removed */}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fallingStar {
          from {
            transform: translateY(-20px) translateX(0);
            opacity: 1;
          }
          to {
            transform: translateY(100vh) translateX(var(--tx));
            opacity: 0;
          }
        }

        .star {
          animation: fallingStar var(--dur, 6s) linear infinite;
          animation-delay: var(--delay, 0s);
        }
      `}</style>
    </>
  )
}

export default TabNav