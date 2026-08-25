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
  preload: false,
  fallback: ["system-ui", "ui-sans-serif", "sans-serif"],
});

export const metadata: Metadata = {
  title: "Maram Group | Real Estate Development in Kuwait",
  description:
    "Maram Group develops residential towers, coastal villas and commercial addresses across Kuwait. Explore our latest launches and request a quotation.",
  openGraph: {
    title: "Maram Group | Real Estate Development in Kuwait",
    description:
      "Residential, coastal and commercial developments across Kuwait — designed with intent, delivered with discipline.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
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
