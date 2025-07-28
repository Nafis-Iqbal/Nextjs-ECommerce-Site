import Image from "next/image";
import Link from "next/link"

import Navbar from "@/components/structure-components/Navbar";
import Footer from "@/components/structure-components/Footer";
import BottomNavbar from "@/components/structure-components/BottomNavbar";

export default function HomePage() {

  return (
    <section className="flex flex-col min-h-screen">
      <header className="relative">
        <nav>
          <Navbar/>
        </nav>
      </header>
      
      <div className="flex flex-grow items-center justify-items-center bg-black min-h-screen"></div>
      
      <nav>
        <BottomNavbar/>
      </nav>
      
      <footer>
        <Footer/>
      </footer>
    </section>
  );
}
        