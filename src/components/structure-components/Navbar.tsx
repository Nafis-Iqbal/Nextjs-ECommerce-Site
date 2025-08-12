/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

import DropdownMenu from "./DropdownMenu";
import { FaShoppingCart, FaUser, FaGift, FaGlobe, FaSignOutAlt } from "react-icons/fa";
import IconWithBadge from "../custom-elements/IconWithBadge";
import { useSelector } from "react-redux";

const Navbar: React.FC = () => {
    const router = useRouter();
    const {data: session, status} = useSession();
    const cartUpdateState: {
        isOpen: boolean, 
        items: {
            itemId: string;
            productId: string;
            productName: string;
            productPrice: number;
            productQuantity: number;
        }[]
        recentProductName: string,
        recentProductId: string
    } = useSelector((state: any) => state.cartUpdatePopUp);

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const onMenuToggle = () => {
        setIsMenuOpen(!isMenuOpen);
    }

    const onMenuNavigate = (navigateTo: string) => {
        setIsMenuOpen(false);
    }

    const onLogOutClick = () => {
        signOut({callbackUrl: "/"});
    }

    return (
        <div className="fixed top-0 z-100 md:flex items-center p-1 w-[100%] h-[55px] md:h-[70px] bg-[#00FF99]">
            <div className="relative flex justify-between items-center w-[100%] h-full bg-inherit">
                <div className="flex justify-between items-center w-[80%] md:w-[65%] bg-inherit">
                    <button 
                        className="hidden md:block w-[20%] ml-5 p-2 text-center bg-[#0F0F0F] md:text-xl lg:text-2xl text-[#00FF99] font-satisfy
                        rounded-sm transition-all duration-150 hover:scale-110 hover:brightness-130 hover:backdrop-blur-sm"
                        onClick={() => router.push("/")}
                    >
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
                    <a className="p-2 " href="#experience">
                        <FaGlobe className="md:text-2xl text-gray-800 transition-all duration-150 hover:scale-120 hover:brightness-130"/>
                    </a>

                    <Link className="p-2 text-gray-800 transition-all duration-150 hover:scale-120 hover:brightness-130" href="/cart">
                        <IconWithBadge Icon={FaGift} badgeValue={2} iconClassName="text-gray-800 md:text-2xl"/>
                    </Link>

                    <Link className="p-2 text-gray-800 transition-all duration-150 hover:scale-120 hover:brightness-130" href="/cart">
                        <IconWithBadge Icon={FaShoppingCart} badgeValue={cartUpdateState.items.reduce((acc, item) => acc + item.productQuantity, 0)} iconClassName="text-gray-800 text-xl md:text-2xl scale-110"/>
                    </Link>

                    {!session ? (<Link className="p-2 hover:scale-110" href="/login">Log In</Link>) : 
                    (
                        <Link className="p-2 text-gray-800 transition-all duration-150 hover:scale-120 hover:brightness-130" href="/dashboard#dashboard_profile">
                            <IconWithBadge Icon={FaUser} badgeValue={2} iconClassName="text-gray-800 md:text-2xl"/>
                        </Link>
                    )}

                    {session && <FaSignOutAlt className="text-2xl text-gray-800 hover:scale-110 cursor-pointer" onClick={onLogOutClick} />}
                </div>
            </div>
        </div>
    );
}

export default Navbar;