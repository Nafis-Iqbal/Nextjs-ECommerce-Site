"use client";

import { motion } from 'framer-motion';
import { forwardRef } from 'react';
import { redirect, usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

type SidebarMenuProps = {
    className?: string;
    style?: React.CSSProperties;
    isPopOutSidebar: boolean;
    opensOnHover?: boolean;
}

const SidebarMenuWithRef = forwardRef<HTMLDivElement, SidebarMenuProps>(({className, style, isPopOutSidebar, opensOnHover = false}, ref) => {
    const pathName = usePathname();
    const router = useRouter();
    const {data: session} = useSession();

    const navigateToPage = (pathURL: string) => {
        router.push(pathURL);
        onClose();
    }

    const navigateBySession = ({adminURL, userURL, masterAdminURL} : {adminURL: string, userURL: string, masterAdminURL?: string}) => {
        if(session) {
            if(session.user.role === "ADMIN" || session.user.role === "MASTER_ADMIN") {
                if(masterAdminURL && session.user.role === "MASTER_ADMIN") router.push(masterAdminURL);
                else router.push(adminURL);
            } else {
                router.push(userURL);
            }
        }

        onClose();
    }

    const sessionConditionedButtonName = ({adminUserButton, userButton, masterAdminUserButton} : {adminUserButton: string, userButton: string, masterAdminUserButton?: string}) => {
        if(session && (session.user.role === "ADMIN" || session.user.role === "MASTER_ADMIN")) {
            if(masterAdminUserButton && session.user.role === "MASTER_ADMIN") return masterAdminUserButton;
            else return adminUserButton;
        }
        return userButton;
    }

    const isButtonInvisible = (sessionTypesToHide: string[]) => {
        if(session && sessionTypesToHide.includes(session.user.role)) {
            return "hidden";
        }
        return "";
    }

    const onLogInPrompt = () => {
        router.push("/login");
        onClose();
    }

    const onClose = () => {

    }

    const smallScreenStyle = "fixed top-0 left-0 md:hidden w-[60%] min-h-screen border-4 border-[#00FF99] z-50 " + className;
    const bigScreenStyle = "border-4 border-[#00FF99] z-50 " + className;

    if(!session) return (
        <div ref={ref} className={isPopOutSidebar ? smallScreenStyle : bigScreenStyle} style={style}>
            {isPopOutSidebar && (
                <div>
                    <div className="flex justify-center items-center min-h-[120px] font-bold text-3xl bg-gray-400 border-b-4 border-pink-100 text-gray-100">Suit Up!</div>
                    <button className="w-[100%] h-[40px] bg-emerald-500 text-lg text-white" onClick={() => onClose()}>Close</button>
                </div>
            )}

            <div className="relative p-3 text-xl text-center border-b-4 text-pink-100 bg-gray-600 font-satisfy">Hello there!
                {opensOnHover && (<div className="absolute -right-13 -top-1 h-[108%] w-[50px] bg-[#00FF99] rounded-r-md"></div>)}
            </div>

            <div className='flex flex-col'>
                <p className="text-lg pt-20 pb-10 text-green-400 text-center">Log In to access additional features</p>
                <button className="w-[100%] h-[40px] mb-10 bg-emerald-500 text-lg text-white text-center" onClick={() => onLogInPrompt()}>Log In</button>
            </div>
        </div>
    );
  
    return (
        <div ref={ref} className={isPopOutSidebar ? smallScreenStyle : bigScreenStyle} style={style}>
            {isPopOutSidebar && (
                <div>
                    <div className="flex justify-center items-center min-h-[120px] font-bold text-3xl bg-gray-400 border-b-4 border-pink-100 text-gray-100">Suit Up!</div>
                    <button className="w-[100%] h-[40px] bg-emerald-500 text-lg text-white" onClick={() => onClose()}>Close</button>
                </div>
            )}

            <div className="relative p-3 text-xl text-center border-b-4 text-pink-100 bg-gray-600">Pages
                {opensOnHover && (<div className="absolute -right-13 -top-1 h-[108%] w-[50px] bg-[#00FF99] rounded-r-md"></div>)}
            </div>

            <ul className="flex flex-col">
                <li>
                    <button onClick={() => {
                        navigateToPage(pathName === "/dashboard" ? "/products" : "/dashboard")
                    }} className="w-[100%] p-2 hover:bg-gray-600 border-b-1 text-pink-100">
                        {pathName === "/dashboard" ? "Browse Products" : "Dashboard"}
                    </button>
                </li>
                <li>
                    <button onClick={() => 
                        navigateBySession({adminURL: `/products?user_id=${session?.user.user_id}`, userURL: `/offers`, masterAdminURL: `/users`})
                    } className="w-[100%] p-2 hover:bg-gray-600 border-b-1 text-pink-100">
                        {sessionConditionedButtonName({adminUserButton: "Your Products", userButton: "Your Offers", masterAdminUserButton: "All Users"})}
                    </button>
                </li>
                <li>
                    <button onClick={() => {navigateToPage(`/cart`);}} className="w-[100%] p-2 hover:bg-gray-600 border-b-1 text-pink-100">Cart</button>
                </li>
                <li>
                    <button onClick={() => 
                        navigateBySession({adminURL: `/seller-orders?self=true`, userURL: `/orders`})
                    } className="w-[100%] p-2 hover:bg-gray-600 border-b-1 text-pink-100">
                        {sessionConditionedButtonName({adminUserButton: "Seller Orders", userButton: "Order History"})}
                    </button>
                </li>
            </ul>

            <div className="p-3 text-xl text-center border-b-4 text-pink-100 bg-gray-600">Quick Actions</div>
            
            <ul className="flex flex-col">
                <li>
                    <button className="w-[100%] p-2 hover:bg-gray-600 border-b-1 text-pink-100" onClick={() =>navigateToPage('/products/create')}>
                        {sessionConditionedButtonName({adminUserButton: "Create New Product", userButton: "View Wishlists"})}
                    </button>
                </li>
                <li>
                    <button disabled className="w-[100%] p-2 hover:bg-gray-600 border-b-1 text-pink-100 disabled:bg-gray-400 disabled:cursor-not-allowed" onClick={() =>navigateToPage('/track-order')}>
                        Track Order
                    </button>
                </li>
                <li>
                    <button className={`w-[100%] p-2 hover:bg-gray-600 border-b-1 text-pink-100 ${isButtonInvisible(["USER"])}`} onClick={() => navigateToPage('/dashboard#dashboard_complaints')}>
                        Consumer Complaints
                    </button>
                </li>
                <li>
                    <button className={`w-[100%] p-2 hover:bg-gray-600 border-b-1 text-pink-100 ${isButtonInvisible(["USER", "ADMIN"])}`} onClick={() => navigateToPage('/dashboard#dashboard_products')}>
                        {sessionConditionedButtonName({adminUserButton: "", userButton: "", masterAdminUserButton: "All Products"})}
                    </button>
                </li>
                <li>
                    <button className={`w-[100%] p-2 hover:bg-gray-600 border-b-1 text-pink-100 ${isButtonInvisible(["USER"])}`} onClick={() => navigateToPage('/dashboard#dashboard_buyer_orders')}>
                        {sessionConditionedButtonName({adminUserButton: "Your Orders", userButton: "", masterAdminUserButton: "Your Orders"})}
                    </button>
                </li>
            </ul>

            <div className="p-3 text-xl text-center border-b-4 text-pink-100 bg-gray-600">Personalize</div>
            
            <ul className="flex flex-col">
                <li>
                    <button onClick={() => {redirect(`/dashboard#dashboard_profile`); onClose();}} className="w-[100%] p-2 hover:bg-gray-600 text-pink-100">Edit Profile</button>
                </li>
                <li>
                    <button className="w-[100%] p-2 hover:bg-gray-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-pink-100" disabled>Settings</button>
                </li>
            </ul>
        </div>
    );
});

SidebarMenuWithRef.displayName = "SidebarMenuWithRef";

export const MotionSidebarMenu = motion(SidebarMenuWithRef);

export default SidebarMenuWithRef;