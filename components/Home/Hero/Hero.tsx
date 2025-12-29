'use client'

import React, { useRef, useEffect } from 'react'
import Image from 'next/image'
import heroLogo from './logo_1.png'

const Hero = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const gsapRef = useRef<any>(null)
  const [videoReady, setVideoReady] = React.useState(false)
  const [isHidden, setIsHidden] = React.useState(false)

  useEffect(() => {
    if (!videoRef.current) return
    videoRef.current.play().catch(() => {})
  }, [])

  const handleCanPlay = () => {
    if (videoRef.current) videoRef.current.play().catch(() => {})
  }

  useEffect(() => {
    if (typeof window === 'undefined') return
    Promise.all([import('gsap'), import('gsap/ScrollToPlugin')])
      .then(([gsapModule, scrollModule]) => {
        const gsap = gsapModule.gsap || gsapModule.default || gsapModule
        const ScrollToPlugin = scrollModule.ScrollToPlugin || scrollModule.default || scrollModule
        try { gsap.registerPlugin(ScrollToPlugin) } catch(e) {}
        gsapRef.current = gsap
      })
  }, [])

  // Hide hero when scrolled near the bottom of the page
  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleScroll = () => {
      const scrollY = window.scrollY
      const windowHeight = window.innerHeight

      // Hide the hero video once the user scrolls past the hero section
      setIsHidden(scrollY >= windowHeight - 5)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial check

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const fullScreenMediaStyle: React.CSSProperties = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '101%', 
    height: '101%',
    transform: 'translate(-50%, -50%)',
    objectFit: 'cover',
    display: 'block',
    zIndex: 1,
    backfaceVisibility: 'hidden',
    WebkitBackfaceVisibility: 'hidden'
  };

  return (
    <section style={{ 
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100vh', 
      backgroundColor: '#000',
      overflow: 'hidden', 
      margin: 0,
      padding: 0,
      zIndex: 0, // lower z-index so page content can overlap on scroll
      pointerEvents: 'none', // allow interactions with overlapping content
      opacity: isHidden ? 0 : 1,
      visibility: isHidden ? 'hidden' : 'visible',
      transition: 'opacity 0.4s ease, visibility 0.4s ease'
    }}>
      {/* Logo - top center */}
      <div style={{ position: 'absolute', left: 0, top: 40, width: '100%', zIndex: 10, pointerEvents: 'none' }} aria-hidden="true">
        <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
          <div style={{ height: '1px', background: '#fff', opacity: 0.9, flex: 1 }} />

          <div style={{ padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Image src={heroLogo} alt="Mirai logo" width={240} height={88} style={{ height: 'auto', display: 'block' }} priority />
          </div>

          <div style={{ height: '1px', background: '#fff', opacity: 0.9, flex: 1 }} />
        </div>
      </div>

      {/* Video Background */}
      <video
        ref={videoRef}
        style={{ ...fullScreenMediaStyle, opacity: videoReady ? 1 : 0, transition: 'opacity 300ms ease' }}
        crossOrigin="anonymous"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        onCanPlay={() => { handleCanPlay(); setVideoReady(true); }}
        onLoadedData={() => setVideoReady(true)}
      >
        <source src="/videos/mirai_home_1.mp4" type="video/mp4" />
      </video>
    </section>
  )
}

export default Hero