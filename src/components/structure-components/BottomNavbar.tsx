"use client";

const BottomNavbar = () => {
    return (
        <div className="fixed md:hidden bottom-0 flex items-center p-1 w-[100%] h-[60px] bg-[#00FF996D]">
            <div className="relative flex justify-between items-center p-1 w-[100%] h-full bg-inherit">
                <a className="p-2 " href="#experience">Language</a>
                <a className="p-2 " href="#projectLinks">Special Deals</a>
                <a className="p-2 " href="#skills">Cart</a>
                <a className="p-2" href="#interests">Log In</a>
            </div>
        </div>
    );
}

export default BottomNavbar;