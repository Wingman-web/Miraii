'use client'

import React, { useState, useRef, useEffect } from 'react'
import { HiBars3BottomRight } from 'react-icons/hi2'
import { IoClose } from 'react-icons/io5'
import { NAV_LINKS } from '@/constant/nav_constant'
import Logo from '@/components/Helper/logo'

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [hoveredLink, setHoveredLink] = useState<number | null>(null)
  const [isPageReady, setIsPageReady] = useState(false)
  const containerRef = useRef(null)
  const STAR_COUNT = 8

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const script = document.createElement('script')
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js'
      document.head.appendChild(script)

      const onLoad = () => setIsPageReady(true)
      if (document.readyState === 'complete') onLoad()
      else window.addEventListener('load', onLoad)

      return () => {
        window.removeEventListener('load', onLoad)
      }
    }
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (isOpen) {
      document.body.classList.add('overflow-hidden')
      document.documentElement.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
      document.documentElement.classList.remove('overflow-hidden')
    }
  }, [isOpen])

  const carouselImages = [
    'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=500&h=600&fit=crop',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500&h=600&fit=crop',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=500&h=600&fit=crop',
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500&h=600&fit=crop',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=600&fit=crop'
  ]

  return (
    <>
<nav className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${isOpen ? 'bg-black' : 'bg-transparent'} ${isPageReady ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
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
        className={`fixed inset-x-0 top-20 bottom-0 bg-black transition-opacity duration-300 z-40 ${
          isOpen ? 'opacity-50' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Fullscreen Menu */}
      <div
        className={`fixed inset-x-0 top-20 bottom-0 bg-black transform transition-transform duration-500 ease-in-out z-40 ${
          isOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
        style={{
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'row'
        }}
      >
        {/* Falling Stars Background */}
        {isOpen && (
          <div style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            zIndex: 15,
            overflow: 'visible'
          }}>
            {[...Array(STAR_COUNT)].map((_, i) => {
              const randomSize = Math.random() * 2 + 1
              const randomLeft = Math.random() * 100
              const randomOpacity = Math.random() * 0.4 + 0.4
              const randomDuration = Math.random() * 8 + 8
              const randomDelay = Math.random() * 3

              const starStyle = {
                width: randomSize + 'px',
                height: randomSize + 'px',
                left: randomLeft + '%',
                top: '-20px',
                opacity: randomOpacity,
                backgroundColor: '#ffffff',
                borderRadius: '50%',
                position: 'absolute' as const,
                boxShadow: `0 0 ${randomSize * 2}px rgba(255, 255, 255, ${randomOpacity})`
              } as React.CSSProperties

              return (
                <div
                  key={i}
                  style={{
                    ...starStyle,
                    animation: `fallingStar ${randomDuration}s linear ${randomDelay}s infinite`
                  }}
                />
              )
            })}
          </div>
        )}

        {/* Content - 3 Columns */}
        <div style={{
          display: 'flex',
          height: '100%',
          width: '100%',
          position: 'relative',
          zIndex: 10
        }}>
          {/* Left Section - Navigation Links (1/3) */}
          <div style={{
            width: '28%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            padding: '38px 40px',
            overflow: 'hidden',
            backgroundColor: '#000'
          }}>
            {/* Heading removed per request */}
            
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '48px'
            }}>
              {NAV_LINKS.map((link, index) => (
                <a
                  key={link.id}
                  href={link.href}
                  onMouseEnter={() => { setHoveredLink(link.id); setActiveIndex(index); }}
                  onMouseLeave={() => setHoveredLink(null)}
                  onClick={() => setIsOpen(false)}
                  style={{
                    textDecoration: 'none',
                    position: 'relative',
                    cursor: 'pointer',
                    display: 'inline-block',
                    transform: hoveredLink === link.id ? 'translateX(12px)' : 'translateX(0)',
                    transition: 'transform 0.3s ease'
                  }}
                >
                  <span style={{
                    display: 'inline-block',
                    fontSize: '44px',
                    fontFamily: 'var(--font-magra, "Magra", "Century Gothic", Arial, sans-serif)',
                    lineHeight: '1',
                    fontWeight: 'bold',
                    color: hoveredLink === link.id ? '#78252f' : '#fff'
                  }}>
                    {link.label}
                    <span style={{
                      display: 'inline-block',
                      height: '4px',
                      backgroundColor: '#78252f',
                      marginTop: '8px',
                      width: 'auto',
                      transform: hoveredLink === link.id ? 'scaleX(1)' : 'scaleX(0)',
                      transformOrigin: 'left',
                      transition: 'transform 0.3s ease'
                    }} />
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Middle Section - Gallery (1/3) */}
          <div style={{
            width: '44%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            backgroundColor: '#000',
            overflow: 'visible',
            padding: '40px 0'
          }}>
            <div 
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                transformStyle: 'preserve-3d',
                perspective: '1200px'
              }}
            >
              <div
                ref={containerRef}
                style={{
                  transformStyle: 'preserve-3d',
                  transform: `rotateZ(-20deg) rotateX(-10deg) translateY(16px) rotateY(${activeIndex * -72}deg)`,
                  transition: 'transform 0.8s cubic-bezier(0.645, 0.045, 0.355, 1)',
                  width: '460px',
                  height: '640px',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {carouselImages.map((img, index) => {
                  const angle = (index * 360) / carouselImages.length
                  const radius = 170
                   
                  return (
                    <div
                      key={index}
                      style={{
                        position: 'absolute',
                        width: '240px',
                        height: '380px',
                        left: '50%',
                        top: '34%',
                        marginLeft: '-130px',
                        marginTop: '-170px',
                        transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                        transformStyle: 'preserve-3d',
                        backfaceVisibility: 'hidden',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.5)'
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.boxShadow = 'none'
                      }}
                      onClick={() => setActiveIndex(index)}
                    >
                      <img
                        src={img}
                        alt={`carousel-${index}`}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          borderRadius: '12px',
                          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)'
                        }}
                      />
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Carousel Controls removed */}
          </div>

          {/* Right Section - Description & CTA (1/3) */}
          <div style={{
            width: '28%',
            height: '100%',
            backgroundColor: '#000',
            padding: '40px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            overflow: 'hidden'
          }}>
            <div>
              <h3 style={{
                fontSize: '48px',
                fontWeight: 'bold',
                color: '#fff',
                marginBottom: '32px',
                letterSpacing: '-0.02em'
              }}>
                {NAV_LINKS[activeIndex]?.label}
              </h3>
              <p style={{
                color: '#d1d5db',
                fontSize: '18px',
                lineHeight: '1.6',
                fontWeight: 300
              }}>
                {NAV_LINKS[activeIndex]?.description}
              </p>
            </div>

            <button
              style={{
                backgroundColor: '#2563eb',
                color: '#fff',
                padding: '20px 48px',
                borderRadius: '8px',
                fontWeight: 'bold',
                fontSize: '18px',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                width: '100%'
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = '#1d4ed8'
                ;(e.currentTarget as HTMLElement).style.transform = 'scale(1.05)'
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = '#2563eb'
                ;(e.currentTarget as HTMLElement).style.transform = 'scale(1)'
              }}
              onMouseDown={(e) => {
                (e.currentTarget as HTMLElement).style.transform = 'scale(0.95)'
              }}
              onMouseUp={(e) => {
                (e.currentTarget as HTMLElement).style.transform = 'scale(1.05)'
              }}
              onClick={() => setIsOpen(false)}
            >
              Get In Touch
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fallingStar {
          0% {
            transform: translateY(-20px);
            opacity: 1;
          }
          100% {
            transform: translateY(calc(100vh + 100px));
            opacity: 0;
          }
        }
      `}</style>
    </>
  )
}

export default Nav