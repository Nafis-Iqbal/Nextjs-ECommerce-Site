"use client";

import { Github, Linkedin } from "lucide-react";

import DivGap, {HorizontalDivider, VerticalDivider} from "../custom-elements/UIUtilities";

const Footer: React.FC = () => {
    return (
        <div className="flex flex-col bg-[#00FF99]">
            <DivGap customHeightGap="h-[50px] bg-inherit"/>

            <div className="flex flex-col md:flex-row p-1 bg-inherit">
                <div className="flex flex-col w-full md:w-[50%] mr-10 items-center md:items-end justify-center space-y-6 border-right font-sans bg-inherit">
                    <a
                        href="https://github.com/Nafis-Iqbal"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-gray-300 transition duration-300"
                    >
                        <Github size={28} />
                    </a>

                    <a
                        href="https://www.linkedin.com/in/nafis-iqbal-79b645213/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-gray-300 transition duration-300"
                    >
                        <Linkedin size={28} />
                    </a>

                    <a className="text-green-800 font-semibold text-lg" href="mailto:nafis@example.com">Contact Us</a>
                </div>

                <VerticalDivider className="hidden md:block" height="h-[180px]"/>

                <HorizontalDivider className="md:hidden w-[80%] mx-auto"/>

                <div className="flex flex-col w-full md:w-[50%] text-center md:text-start text-lg text-green-800 font-sans font-semibold bg-inherit">
                    <a className="md:ml-10 p-2 scroll-smooth" href="#experience">Language</a>
                    <a className="md:ml-10 p-2 scroll-smooth" href="#projectLinks">Special Deals</a>
                    <a className="md:ml-10 p-2 scroll-smooth" href="#skills">Cart</a>
                    <a className="md:ml-10 p-2 scroll-smooth" href="#interests">Log In</a> 
                </div>
            </div>

            <DivGap customHeightGap="h-[50px] bg-inherit"/>
        </div>
    );
}

export default Footer;