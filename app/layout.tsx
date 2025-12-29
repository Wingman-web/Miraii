import type { Metadata } from "next";
import "./globals.css";
import localFont from 'next/font/local';

const migra = localFont({
  variable: '--font-magra',
  src: [
    { path: '../components/Fonts/migra/Migra-Extralight.woff2', weight: '100', style: 'normal' },
    { path: '../components/Fonts/migra/Migra-Extrabold.woff2', weight: '800', style: 'normal' }
  ],
  display: 'swap'
});

const century = localFont({
  variable: '--font-family-century',
  src: [
    { path: '../components/Fonts/century-gothic/SansSerifFLF/SansSerifFLF.otf', weight: '300', style: 'normal' },
    { path: '../components/Fonts/century-gothic/SansSerifFLF/SansSerifBldFLF.otf', weight: '700', style: 'normal' }
  ],
  display: 'swap'
});

import NavContainer from "@/components/Home/Navbar/NavContainer";
import LoadingOverlay from '@/components/Common/LoadingOverlay';
import SafeDomPatches from '@/components/Common/SafeDomPatches';
import logoImg from "../components/Helper/logo.png";

// Using system font 'Century Gothic' instead of Geist.

export const metadata: Metadata = {
  title: "Mirai",
  description: "Welcome to pavani world",
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Playfair Display (headings) still loaded from Google */}
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap" rel="stylesheet" />
        {/* Preferred favicons in public/ to satisfy browsers requesting /favicon.ico */}
        <link rel="icon" href="/favicon.png" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon.png" />
      </head>
      <body className={`${migra.variable} ${century.variable} antialiased `}>
        {/* Server-rendered black overlay to show immediately during initial load */}
        <div id="initial-loading-overlay" className="fixed inset-0 bg-black z-9999 transition-opacity duration-500" />
        <NavContainer />
        {/* Safe DOM patches that run early on the client to prevent insertBefore runtime errors */}
        <SafeDomPatches />
        {children}
        <LoadingOverlay />
      </body>
    </html>
  );
}
