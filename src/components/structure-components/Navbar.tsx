"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import DropdownMenu from "./DropdownMenu";

import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Navbar: React.FC = () => {
    const router = useRouter();
    const {data: session, status} = useSession();

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const onMenuToggle = () => {
        setIsMenuOpen(!isMenuOpen);
    }

    const onMenuNavigate = (navigateTo: string) => {
        setIsMenuOpen(false);
    }

    const onLogInClick = () => {
        router.push("/login");
    }

    const onLogOutClick = () => {
        signOut({callbackUrl: "/"});
    }

    return (
        <div className="fixed top-0 z-100 md:flex items-center p-1 w-[100%] h-[55px] md:h-[70px] bg-[#00FF99]">
            <div className="relative flex justify-between items-center w-[100%] h-full bg-inherit">
                <div className="flex justify-between items-center w-[80%] md:w-[65%] bg-inherit">
                    <button className="hidden md:block w-[20%] ml-5 p-2 text-center bg-[#0F0F0F] md:text-xl lg:text-2xl text-[#00FF99] font-satisfy
                     rounded-sm transition-all duration-150 hover:scale-110 hover:brightness-130 hover:backdrop-blur-sm">
                        Suit up!
                    </button>

                    <input type="text" placeholder="Looking for something?" 
                    className="w-[75%] bg-white border border-gray-300 rounded-md mr-3 px-4 py-2 font-sans placeholder-gray-400 text-gray-800
                     focus:outline-none focus:ring-2 focus:ring-green-600">
                    
                    </input>
                </div>
                
                {/* Small Screen Menu, relatively positioned */}
                <DropdownMenu menuPosition="top-full -right-1"/>

                <div className="hidden md:flex justify-end md:w-[30%] mr-2 md:mr-4 lg:mr-8 space-x-6 items-center md:text-lg lg:text-xl text-green-800 font-sans font-semibold bg-inherit">
                    <a className="p-2 " href="#experience">Language</a>
                    <a className="p-2 " href="#projectLinks">Special Deals</a>
                    <Link className="p-2 " href="/cart">Cart</Link>
                    {!session ? (<a className="p-2 " href="/login">Log In</a>) : 
                    (<a className="p-2 " href="/dashboard#dashboard_profile">Profile</a>)} 
                </div>
            </div>
        </div>
    );
}

export default Navbar;