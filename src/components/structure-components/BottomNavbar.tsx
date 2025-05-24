"use client";

const BottomNavbar = () => {
    return (
        <div className="fixed md:hidden bottom-0 flex items-center p-1 w-[100%] h-[60px] bg-gray-800">
            <div className="relative flex justify-between items-center p-1 w-[100%] h-full bg-gray-700">
                <a className="p-2 scroll-smooth" href="#experience">Language</a>
                <a className="p-2 scroll-smooth" href="#projectLinks">Special Deals</a>
                <a className="p-2 scroll-smooth" href="#skills">Cart</a>
                <a className="p-2 scroll-smooth" href="#interests">Log In</a>
            </div>
        </div>
    );
}

export default BottomNavbar;