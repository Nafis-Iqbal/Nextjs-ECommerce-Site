"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import BasicButton from "../custom-elements/Buttons";
import DropdownMenu from "./DropdownMenu";

const Navbar: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const onMenuToggle = () => {
        setIsMenuOpen(!isMenuOpen);
    }

    const onMenuNavigate = (navigateTo: string) => {
        setIsMenuOpen(false);
    }

    return (
        <div className="fixed md:relative top-0 md:flex items-center p-1 w-[100%] h-[70px] md:h-[75px] bg-[#00FF99]">
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

                <div className="hidden md:flex justify-end md:w-[30%] mr-2 md:mr-4 lg:mr-8 space-x-6 items-center md:text-xl lg:text-2xl text-green-800 font-sans font-semibold bg-inherit">
                    <a className="p-2 scroll-smooth" href="#experience">Language</a>
                    <a className="p-2 scroll-smooth" href="#projectLinks">Special Deals</a>
                    <a className="p-2 scroll-smooth" href="#skills">Cart</a>
                    <a className="p-2 scroll-smooth" href="#interests">Log In</a> 
                </div>
            </div>
        </div>
    );
}

export default Navbar;