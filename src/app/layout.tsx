import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "@/components/providers";
import { NavigationProgress } from "@/components/site/navigation-progress";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { FloatingActions } from "@/components/site/floating-actions";
import { getCriticalCSS } from "@/lib/critical-css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-display",
  display: "swap",
  preload: false,
  fallback: ["Georgia", "ui-serif", "serif"],
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
  preload: false,
  fallback: ["system-ui", "ui-sans-serif", "sans-serif"],
});

const cairo = localFont({
  src: [
    { path: "../../public/assets/fonts/Cairo-Light.ttf",     weight: "300", style: "normal" },
    { path: "../../public/assets/fonts/Cairo-Regular.ttf",   weight: "400", style: "normal" },
    { path: "../../public/assets/fonts/Cairo-Medium.ttf",    weight: "500", style: "normal" },
    { path: "../../public/assets/fonts/Cairo-SemiBold.ttf",  weight: "600", style: "normal" },
    { path: "../../public/assets/fonts/Cairo-Bold.ttf",      weight: "700", style: "normal" },
  ],
  variable: "--font-arabic",
  display: "swap",
  preload: true,
  fallback: ["Tahoma", "Arial", "sans-serif"],
  adjustFontFallback: "Arial",
});

export const metadata: Metadata = {
  title: "MARAM Group | Engineering, Design & Real Estate | مرام جروب | استشارات هندسية وتصميم وتطوير عقاري",
  description:
    "MARAM Group, Engineering Consultancy, Architectural Design, Interior Design, Exterior Design, Execution Drawings, Construction Company, Real Estate Development, Engineering Services. مرام جروب، استشارات هندسية، تصميم معماري، تصميم داخلي، تصميم خارجي، رسومات تنفيذية، شركة إنشاءات، تطوير عقاري، خدمات هندسية.",
  manifest: '/favicon/site.webmanifest',
  icons: {
    icon: [
      { url: '/favicon/favicon.ico', sizes: 'any' },
      { url: '/favicon/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon/favicon-96x96.png', type: 'image/png', sizes: '96x96' }
    ],
    apple: [
      { url: '/favicon/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
    ],
    other: [
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '192x192',
        url: '/favicon/web-app-manifest-192x192.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '512x512',
        url: '/favicon/web-app-manifest-512x512.png',
      },
    ],
  },
  openGraph: {
    title: "MARAM Group | Engineering, Design & Real Estate | مرام جروب",
    description:
      "MARAM Group, Engineering Consultancy, Architectural Design, Interior Design, Exterior Design, Execution Drawings, Construction Company, Real Estate Development, Engineering Services. مرام جروب، استشارات هندسية، تصميم معماري، تصميم داخلي، تصميم خارجي، رسومات تنفيذية، شركة إنشاءات، تطوير عقاري، خدمات هندسية.",
    type: "website",
    siteName: "Maram Group",
    images: [
      {
        url: '/favicon/web-app-manifest-512x512.png',
        width: 512,
        height: 512,
        alt: 'Maram Group Logo',
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MARAM Group | Engineering, Design & Real Estate",
    description: "MARAM Group, Engineering Consultancy, Architectural Design, Interior Design, Exterior Design, Execution Drawings, Construction Company, Real Estate Development, Engineering Services. مرام جروب، استشارات هندسية، تصميم معماري، تصميم داخلي، تصميم خارجي، رسومات تنفيذية، شركة إنشاءات، تطوير عقاري، خدمات هندسية.",
    images: ['/favicon/web-app-manifest-512x512.png'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const criticalCSS = getCriticalCSS();
  
  return (
    <html
      lang="en"
      className={`dark ${cormorant.variable} ${manrope.variable} ${cairo.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Preload Arabic fonts for better performance */}
        <link
          rel="preload"
          href="/assets/fonts/Cairo-Regular.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/assets/fonts/Cairo-SemiBold.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        
        {/* Favicon & App Icons */}
        <link rel="icon" type="image/x-icon" href="/favicon/favicon.ico" />
        <link rel="icon" type="image/svg+xml" href="/favicon/favicon.svg" />
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon/favicon-96x96.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <meta name="theme-color" content="#c9a05f" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        
        {/* SEO Keywords */}
        <meta name="keywords" content="MARAM Group, مرام جروب, Engineering Consultancy, استشارات هندسية, Architectural Design, تصميم معماري, Interior Design, تصميم داخلي, Exterior Design, تصميم خارجي, Execution Drawings, رسومات تنفيذية, Construction Company, شركة إنشاءات, Real Estate Development, تطوير عقاري, Engineering Services, خدمات هندسية, Kuwait, الكويت, Egypt, مصر" />
        <meta name="author" content="Maram Group" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English, Arabic" />
        <meta name="revisit-after" content="7 days" />
        
        {/* Language Alternates */}
        <link rel="alternate" hrefLang="en" href="https://www.maram-kw.com" />
        <link rel="alternate" hrefLang="ar" href="https://www.maram-kw.com" />
        <link rel="alternate" hrefLang="x-default" href="https://www.maram-kw.com" />
        
        {/* Critical CSS - inlined for instant render, no blocking */}
        <style
          dangerouslySetInnerHTML={{ __html: criticalCSS }}
          data-purpose="critical-css"
        />
        
        {/* Load animations CSS asynchronously without blocking render */}
        <link
          rel="preload"
          href="/animations.css"
          as="style"
        />
        
        {/* Prevents dark-mode and RTL flash before React hydrates */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(localStorage.getItem('maram-theme')==='light'){document.documentElement.classList.remove('dark')}var l=localStorage.getItem('maram-locale');if(l==='ar'){document.documentElement.lang='ar';document.documentElement.dir='rtl'}}catch(e){}(function(){var l=document.createElement('link');l.rel='stylesheet';l.href='/animations.css';document.head.appendChild(l)})()`,
          }}
        />
      </head>
      <body className="min-h-screen bg-background">
        <NavigationProgress />
        <Providers>
          {/* Navbar and FloatingActions are persistent — never unmount between navigations */}
          <Navbar />
          {children}
          <Footer />
          <FloatingActions />
        </Providers>
      </body>
    </html>
  );
}
