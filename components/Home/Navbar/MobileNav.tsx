'use client'

import React, { useState, useEffect } from 'react'
import { HiBars3BottomRight } from 'react-icons/hi2'
import { IoClose } from 'react-icons/io5'
import { NAV_LINKS } from '@/constant/nav_constant'
import Logo from '@/components/Helper/logo'

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false)
  const STAR_COUNT = 20

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const script = document.createElement('script')
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js'
      document.head.appendChild(script)
    }
  }, [])

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

  return (
    <>
      <nav className={`relative z-50 transition-colors duration-300 ${isOpen ? 'bg-black' : 'bg-transparent'}`}>
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
        className={`fixed inset-x-0 top-16 bottom-0 bg-black/80 transition-opacity duration-300 z-40 ${
          isOpen ? 'opacity-50' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Fullscreen Menu */}
      <div
        className={`fixed inset-x-0 top-20 bottom-0 bg-black/90 transform transition-transform duration-500 ease-in-out z-40 overflow-hidden hide-scrollbar ${
          isOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        {/* Falling Stars Background */}
        {isOpen && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            {[...Array(STAR_COUNT)].map((_, i) => {
              const randomSize = Math.random() * 2 + 0.5
              const randomLeft = Math.random() * 100
              const randomTop = Math.random() * 100
              const randomOpacity = Math.random() * 0.6 + 0.4
              const randomDuration = Math.random() * 5 + 4
              const randomDelay = Math.random() * 3
              const randomX = Math.random() * 300 - 150

              const starStyle = {
                width: randomSize + 'px',
                height: randomSize + 'px',
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

        {/* Content */}
        <div className="h-full flex flex-col relative z-10 justify-center">
          {/* Navigation Links */}
          <div className="w-full bg-black/90 px-8 py-8 flex flex-col justify-start overflow-hidden min-h-0">
            {/* Menu heading removed per request */}
            
            <div className="flex flex-col gap-8">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="group relative inline-block transform transition-transform duration-300 hover:translate-x-2"
                >
                  <span className="block text-[44px] font-bold text-white hover:text-[#78252f] transition-all duration-300 cursor-pointer" style={{ fontFamily: 'var(--font-magra, "Magra", "Century Gothic", Arial, sans-serif)', lineHeight: '1'}}>
                    {link.label}
                    <span className="h-1 bg-[#78252f] mt-2 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" style={{width: 'auto', display: 'inline-block', marginTop: '8px'}} />
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fallingStar {
          from {
            transform: translateY(-10px) translateX(0);
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

export default MobileNav