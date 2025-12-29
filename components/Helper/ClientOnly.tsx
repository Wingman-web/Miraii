"use client";

import { useEffect, useState, ReactNode } from 'react';

export default function ClientOnly({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Render a stable wrapper so React can reliably insert children after mount
  // suppressHydrationWarning avoids hydration mismatch warnings when server renders nothing
  return (
    <div data-client-only suppressHydrationWarning>
      {mounted ? children : null}
    </div>
  );
}
