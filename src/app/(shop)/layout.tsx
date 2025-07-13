import Navbar from "@/components/structure-components/Navbar";
import Footer from "@/components/structure-components/Footer";
import BottomNavbar from "@/components/structure-components/BottomNavbar";
import SidebarMenu from "@/components/structure-components/SIdebarMenu";

export default function ShopLayout({children} : {children: React.ReactNode}){

    return (
        <section className="flex flex-col min-h-screen">
            <header className="relative">
                <nav>
                    <Navbar/>
                </nav>
            </header>
            
            <div className="flex border min-h-screen">
                <aside className="relative z-10 flex-grow w-[15%] border-r-4 shadow-[0_0_20px_#00FF99] font-sans">
                    <SidebarMenu isPopOutSidebar={false}/>
                </aside>

                <div className="flex flex-col flex-grow w-[60%] border-r-4">
                    {children}
                </div>

                <aside className="relative z-10 flex-grow w-[25%] shadow-[0_0_20px_#00FF99]">
                    
                </aside>
            </div>
            
            <nav>
                <BottomNavbar/>
            </nav>
            
            <footer>
                <Footer/>
            </footer>
        </section>
    )
}