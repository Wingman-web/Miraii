"use client"

import React, { useEffect, useRef, useState } from 'react'
import bg from '../Hero/sixth_ment.png'

export default function SixthElement() {
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const [showBg, setShowBg] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el || typeof window === 'undefined') return

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          setShowBg(true)
        } else {
          setShowBg(false)
        }
      }
    }, { root: null, rootMargin: '200px', threshold: 0 })

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section 
      id="sixth-element-trigger" 
      ref={sectionRef} 
      className="relative w-full"
      style={{ 
        backgroundColor: 'transparent',
        zIndex: 10,
        position: 'relative'
      }}
    >
      {/* Background Image */}
      <img
        src={bg.src}
        alt=""
        style={{
          width: '100%',
          height: 'auto',
          display: 'block',
          opacity: showBg ? 1 : 0,
          transition: 'opacity 600ms ease-in-out',
        }}
      />

      {/* Content */}
      <h2 
        className="text-white text-5xl md:text-6xl font-bold"
        style={{ 
          position: 'absolute', 
          top: '50px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10 
        }}
      >
        Hello
      </h2>
    </section>
  )
}