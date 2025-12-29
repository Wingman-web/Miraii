'use client'

import React, { useState, useEffect } from 'react'
import Nav from './Nav'
import MobileNav from './MobileNav'
import TabNav from './TabNav'

type ScreenSize = 'mobile' | 'tablet' | 'desktop'

const BREAKPOINTS = {
  mobile: 480,
  tablet: 1024
} as const

const NavContainer = () => {
  const [screenSize, setScreenSize] = useState<ScreenSize>('desktop')
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    
    // Function to determine screen size based on breakpoints
    const handleResize = () => {
      const width = window.innerWidth
      
      // Mobile: 0 - 479px
      // Tablet: 480px - 1023px
      // Desktop: 1024px+
      if (width < 480) {
        setScreenSize('mobile')
      } else if (width >= 480 && width < 1024) {
        setScreenSize('tablet')
      } else {
        setScreenSize('desktop')
      }
    }

    // Set initial screen size
    handleResize()

    // Add event listener for window resize with debounce
    let resizeTimer: NodeJS.Timeout
    const resizeListener = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => {
        handleResize()
      }, 100)
    }
    
    window.addEventListener('resize', resizeListener)

    // Cleanup event listener
    return () => {
      window.removeEventListener('resize', resizeListener)
      clearTimeout(resizeTimer)
    }
  }, [])

  // Don't render until client side to avoid hydration mismatch
  if (!isClient) {
    return <nav className="bg-black h-20" /> // Loading fallback
  }

  return (
    <>
      {screenSize === 'mobile' && <MobileNav />}
      {screenSize === 'tablet' && <TabNav />}
      {screenSize === 'desktop' && <Nav />}
    </>
  )
}

export default NavContainer