"use client";

import { useEffect, useState } from 'react';

export default function InitialLoader() {
  const [visible, setVisible] = useState(true);
  const [animateOut, setAnimateOut] = useState(false);

  useEffect(() => {
    const hide = () => {
      setAnimateOut(true);
      // allow fade out animation to run then hide
      setTimeout(() => setVisible(false), 260);
    };

    if (document.readyState === 'complete') {
      hide();
      return;
    }

    window.addEventListener('load', hide);

    // safety fallback in case load doesn't fire (e.g., SPA navigations)
    const fallback = setTimeout(hide, 3000);

    return () => {
      window.removeEventListener('load', hide);
      clearTimeout(fallback);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className={`loading-overlay ${animateOut ? 'loading-fade-out' : ''}`} role="status" aria-label="Loading">
      <div className="loader" role="presentation" aria-hidden="true">
        <span className="bar" />
        <span className="bar" />
        <span className="bar" />
      </div>
    </div>
  );
}
