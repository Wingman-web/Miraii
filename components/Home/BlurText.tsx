'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

type BlurTextProps = {
  text: string;
  delay?: number; // in ms
  animateBy?: 'words' | 'chars';
  direction?: 'top' | 'bottom' | 'left' | 'right';
  onAnimationComplete?: () => void;
  className?: string;
  play?: boolean; // when true, run the animation
};

export default function BlurText({
  text,
  delay = 0,
  animateBy = 'words',
  direction = 'top',
  onAnimationComplete,
  className = '',
  play = true
}: BlurTextProps) {
  const wrapperRef = useRef<HTMLSpanElement | null>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const selector = wrapper.querySelectorAll<HTMLElement>('span.blurtarget');
    const offset = direction === 'top' ? -18 : direction === 'bottom' ? 18 : direction === 'left' ? -12 : 12;
    const propsFrom: any = {
      y: (direction === 'left' || direction === 'right') ? 0 : offset,
      x: (direction === 'left' || direction === 'right') ? offset : 0,
      opacity: 0,
      filter: 'blur(6px)'
    };

    // If play is false, reset to initial state; if true, animate
    if (!play) {
      tweenRef.current?.kill();
      gsap.set(selector, propsFrom);
      return;
    }

    // small stagger
    tweenRef.current = gsap.fromTo(
      selector,
      propsFrom,
      {
        x: 0,
        y: 0,
        opacity: 1,
        filter: 'blur(0px)',
        duration: 0.6,
        ease: 'power3.out',
        stagger: 0.06,
        delay: (delay || 0) / 1000,
        onComplete: () => onAnimationComplete && onAnimationComplete()
      }
    );

    return () => {
      tweenRef.current?.kill();
      tweenRef.current = null;
    };
  }, [text, delay, animateBy, direction, onAnimationComplete, play]);

  // Split text into words or chars and render spans
  // For words, split with capture groups to preserve whitespace tokens exactly (e.g., spaces, newlines).
  let parts: string[];
  if (animateBy === 'words') {
    parts = text.split(/(\s+)/).filter((p) => p.length > 0);
  } else {
    parts = Array.from(text);
  }

  return (
    <span ref={wrapperRef} className={"inline-block " + className} aria-label={text} role="text">
      {parts.map((part, idx) => (
        <span
          key={idx}
          className="inline-block blurtarget"
          style={{ display: 'inline-block', whiteSpace: 'pre-wrap' }}
        >
          {part}
        </span>
      ))}
    </span>
  );
}
