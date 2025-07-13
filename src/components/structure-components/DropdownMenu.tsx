"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import BasicButton from "../custom-elements/Buttons";

//Must use this with a navbar component. Navbar must have a child, or itself positioned relatively, so that this dropdown is positioned properly

const DropdownMenu = ({menuPosition = "top-full right-0"} : {menuPosition?: string}) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const onMenuToggle = () => {
        setIsMenuOpen(!isMenuOpen);
    }

    const onMenuNavigate = (navigateTo: string) => {
        setIsMenuOpen(false);
    }

    return (
        <>
            <BasicButton buttonColor="bg-gray-700" buttonTextColor="text-white" onClick={() => onMenuToggle()} extraStyle="md:hidden border border-white">
                <Menu className="text-[#00FF99]"></Menu>
            </BasicButton>

            {isMenuOpen && (
                <div className={`absolute ${menuPosition} flex flex-col md:hidden space-y-1 items-center text-white opacity-100 font-sans`}>
                    <a className="p-2 scroll-smooth border-b-1" href="#experience" onClick={() => onMenuNavigate("#experience")}>Language</a>
                    <a className="p-2 scroll-smooth border-b-1" href="#projectLinks" onClick={() => onMenuNavigate("#projectLinks")}>Special Deals</a>
                    <a className="p-2 scroll-smooth border-b-1" href="#skills" onClick={() => onMenuNavigate("#skills")}>Cart</a>
                    <a className="p-2 scroll-smooth border-b-1" href="#interests" onClick={() => onMenuNavigate("#interests")}>Log In</a> 
                </div>         
            )}
        </>
    );
}

export default DropdownMenu;