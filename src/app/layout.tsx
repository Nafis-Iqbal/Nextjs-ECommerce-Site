import "./globals.css";

import type { Metadata } from "next";
import { Geist, Geist_Mono, Satisfy, Ubuntu_Mono, Fredericka_the_Great } from "next/font/google";

import { ClientProviders } from "@/providers/ClientProviders";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

import NotificationPopUp from "@/components/modals/NotificationPopUpModal";
import LoadingModal from "@/components/modals/LoadingContentModal";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const ubuntuMono = Ubuntu_Mono({
  weight: "400",
  variable: "--font-ubuntu-mono",
  subsets: ["latin"],
});

const satisfy = Satisfy({
  weight: "400",
  variable: "--font-satisfy",
  subsets: ["latin"],
});

const fredericka = Fredericka_the_Great({
  weight: "400",
  variable: "--font-fredericka",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "E-Commerce Now!",
  description: "Modular E-commerce app for learning",
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en" className={`${satisfy.className} ${geistSans.variable} ${geistMono.variable} ${ubuntuMono.variable} ${fredericka.variable} antialiased scroll-smooth`}>
      <body>
        <main>
          <ClientProviders session={session}>
              <NotificationPopUp/>
              <LoadingModal/>
              {children}
          </ClientProviders>
        </main>
      </body>
    </html>
  );
}

