"use client";

import { Github, Linkedin } from "lucide-react";

import DivGap, {HorizontalDivider, VerticalDivider} from "../custom-elements/UIUtilities";

import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Footer: React.FC = () => {
    const router = useRouter();
    const {data: session, status} = useSession();

    const onLogInClick = () => {
        router.push("/login");
    }

    const onLogOutClick = () => {
        signOut({callbackUrl: "/"});
    }

    return (
        <div className="flex flex-col bg-[#00FF99]">
            <DivGap customHeightGap="h-[30px] bg-inherit"/>

            <div className="flex flex-col md:flex-row p-1 bg-inherit">
                <div className="flex flex-col w-full md:w-[50%] mr-10 items-center md:items-end justify-center space-y-6 border-right text-sm font-sans bg-inherit">
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

                    <a className="text-green-800 font-semibold" href="mailto:nafis@example.com">Contact Us</a>
                </div>

                <VerticalDivider className="hidden md:block" height="h-[150px]"/>

                <HorizontalDivider className="md:hidden w-[80%] mx-auto"/>

                <div className="flex flex-col w-full md:w-[50%] text-center md:text-start text-sm text-green-800 font-sans font-semibold bg-inherit">
                    <Link className="md:ml-10 p-2 mt-5 hover:underline hover:text-green-700" href="#experience">Language</Link>
                    <Link className="md:ml-10 p-2 hover:underline hover:text-green-700" href="#projectLinks">Special Deals</Link>
                    <Link className="md:ml-10 p-2 hover:underline hover:text-green-700" href="/cart">Cart</Link>
                    {session ? (
                        <a className="md:ml-10 p-2 cursor-pointer hover:underline hover:text-green-500" onClick={onLogOutClick}>Log Out</a>
                    ) : (
                        <button className="md:ml-10 p-2 bg-inherit border-none cursor-pointer hover:underline hover:text-green-500" onClick={onLogInClick}>Log In</button>
                    )}
                </div>
            </div>

            <DivGap customHeightGap="h-[30px] bg-inherit"/>
        </div>
    );
}

export default Footer;