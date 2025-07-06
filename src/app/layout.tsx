import type { Metadata } from "next";
import { Geist, Geist_Mono, Satisfy, Ubuntu_Mono, Fredericka_the_Great } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/structure-components/Navbar";
import Footer from "@/components/structure-components/Footer";
import BottomNavbar from "@/components/structure-components/BottomNavbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const satisfy = Satisfy({
  weight: "400",
  variable: "--font-satisfy",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "E-Commerce Now!",
  description: "Modular E-commerce app for learning",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${satisfy.className} ${geistSans.variable} antialiased`}>
      <body>
        <header className="relative">
          <nav>
            <Navbar/>
          </nav>
        </header>

          {children}
        
        <nav>
          <BottomNavbar/>
        </nav>
        
        <footer>
          <Footer/>
        </footer>
      </body>
    </html>
  );
}
