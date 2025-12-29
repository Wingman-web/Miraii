'use client';

import { useEffect } from 'react';

export default function LoadingOverlay() {
  useEffect(() => {
    const el = document.getElementById('initial-loading-overlay');
    if (!el) return;

    // Fade out the server-rendered overlay
    el.style.transition = 'opacity 500ms ease, visibility 500ms ease';
    el.style.opacity = '0';
    el.style.visibility = 'hidden';

    // Remove element from DOM after animation
    const t = setTimeout(() => {
      const parent = el.parentNode;
      // Ensure the element is still a child of its parent before removing
      if (parent && parent.contains(el)) parent.removeChild(el);
    }, 600);

    return () => clearTimeout(t);
  }, []);

  return null; // This component doesn't render anything client-side; it only controls the server overlay.
}
