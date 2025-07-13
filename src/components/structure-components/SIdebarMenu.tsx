"use client";

import { redirect } from 'next/navigation';

const SidebarMenu: React.FC<{isPopOutSidebar: boolean}> = ({isPopOutSidebar} : {isPopOutSidebar: boolean}) => {

    const onClose = () => {

    }

    const smallScreenStyle = "fixed top-0 left-0 md:hidden w-[60%] min-h-screen rounded-sm border-r-4 z-50";
    const bigScreenStyle = "hidden md:block md:w-[100%] rounded-sm";
  
  return (
    <aside className={isPopOutSidebar ? smallScreenStyle : bigScreenStyle}>
        {isPopOutSidebar && (
            <div>
                <div className="flex justify-center items-center min-h-[120px] font-bold text-3xl bg-pink-400 border-b-4 border-pink-100 text-gray-100">Stuff Trader</div>
                <button className="w-[100%] h-[40px] bg-emerald-500 text-lg text-white" onClick={() => onClose()}>Close</button>
            </div>
        )}

        <div className="p-3 text-xl text-center border-b-4 text-pink-100 bg-gray-600">Pages</div>

        <ul className="flex flex-col">
            <li>
                <button onClick={() => {redirect("/dashboard"); onClose();}} className="w-[100%] p-2 hover:bg-gray-600 border-b-1 text-pink-100">Dashboard</button>
            </li>
            <li>
                <button onClick={() => {redirect(`/listings`); onClose();}} className="w-[100%] p-2 hover:bg-gray-600 border-b-1 text-pink-100">Listings</button>
            </li>
            <li>
                <button onClick={() => {redirect(`/bids}`); onClose();}} className="w-[100%] p-2 hover:bg-gray-600 border-b-1 text-pink-100">Bids</button>
            </li>
            <li>
                <button onClick={() => {redirect(`/trades`); onClose();}} className="w-[100%] p-2 hover:bg-gray-600 border-b-1 text-pink-100">Trades</button>
            </li>
        </ul>

        <div className="p-3 text-xl text-center border-b-4 text-pink-100 bg-gray-600">Quick Actions</div>
        
        <ul className="flex flex-col space-y-1">
            <li>
                <button className="w-[100%] p-2 bg-pink-500 hover:bg-pink-600 text-pink-100 disabled:bg-gray-400 disabled:cursor-not-allowed" disabled>Show Popular Listings</button>
            </li>
            <li>
                <button className="w-[100%] p-2 bg-pink-500 hover:bg-pink-600 text-pink-100 disabled:bg-gray-400 disabled:cursor-not-allowed" disabled>Show Nearby Listings</button>
            </li>
            <li>
                <button className="w-[100%] p-2 bg-pink-500 hover:bg-pink-600 text-pink-100 disabled:bg-gray-400 disabled:cursor-not-allowed" disabled>Create New Listing</button>
            </li>
            <li>
                <button className="w-[100%] p-2 bg-pink-500 hover:bg-pink-600 text-pink-100 disabled:bg-gray-400 disabled:cursor-not-allowed" disabled>Show Pending Trades</button>
            </li>
        </ul>

        <div className="p-3 text-xl text-center border-b-4 text-pink-100 bg-gray-600">Personalize</div>
        
        <ul className="flex flex-col space-y-1">
            <li>
                <button onClick={() => {redirect(`/profile`); onClose();}} className="w-[100%] p-2 hover:bg-gray-600 text-pink-100">Profile</button>
            </li>
            <li>
                <button className="w-[100%] p-2 hover:bg-gray-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-pink-100" disabled>Settings</button>
            </li>
        </ul>

        <button className="display:block w-full border-b-4 hover:bg-emerald-400 p-3 text-xl text-center text-pink-100" >Logout</button>
    </aside>
  );
};

export default SidebarMenu;