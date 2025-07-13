"use client";

import DivGap, {HorizontalDividerWithText, Logo} from "@/components/UIUtilities"
import { signIn } from "next-auth/react";
import Image from 'next/image';
import { useState } from "react";

export default function LoginPage() {
    const [isSignUpPage, setIsSignUpPage] = useState<boolean>(false);
    const [isEmailSignUp, setIsEmailSignUp] = useState<boolean>(false);

    return (
        <div className="flex flex-col items-left min-h-[60vh] min-w-[50vh] border-x-4 border-b-4 border-t-2 shadow-[0_5px_20px_#00FF99] rounded-xl text-white">
            <DivGap customHeightGap="h-[20px] rounded-lg"/>
            
            <Logo textSize="md:text-xl lg:text-2xl" position="ml-7"/>

            <div className="flex flex-grow flex-col justify-between mx-8 mt-8 space-y-2 font-sans">
                {
                    isSignUpPage ? (
                        <div className="flex flex-col justify-between">
                            <p className="text-2xl mb-2">Get started</p>
                            <p className="font-light text-sm">Create a Suit Up account!!</p>
                        </div>
                    ) : (
                        <div className="flex flex-col justify-between">
                            <p className="text-2xl mb-2">Log in</p>
                            <p className="font-light text-sm">Go suit up!!</p>
                        </div>
                    )
                }
                
                <DivGap customHeightGap="h-[10px]"/>

                {
                    isSignUpPage ? (
                        isEmailSignUp ? (
                            <div className="flex flex-col space-y-1 mb-2">
                                <p className="text-lg">Email</p>

                                <input className="bg-white border border-gray-300 px-4 py-2 font-sans placeholder-gray-400 text-gray-800 rounded-md
                                    focus:outline-none focus:ring-2 focus:ring-green-600" type="text"
                                />

                                <p className="text-lg">User Name</p>

                                <input className="bg-white border border-gray-300 px-4 py-2 font-sans placeholder-gray-400 text-gray-800 rounded-md
                                    focus:outline-none focus:ring-2 focus:ring-green-600" type="text"
                                />

                                <p className="text-lg">Password</p>

                                <input className="bg-white border border-gray-300 px-4 py-2 font-sans placeholder-gray-400 text-gray-800 rounded-md
                                    focus:outline-none focus:ring-2 focus:ring-green-600" type="password"
                                />

                                <p className="text-lg">Confirm Password</p>

                                <input className="bg-white border border-gray-300 px-4 py-2 font-sans placeholder-gray-400 text-gray-800 rounded-md
                                    focus:outline-none focus:ring-2 focus:ring-green-600" 
                                    type="password" name="confirmPassword" placeholder="Confirm Password" autoComplete="new-password"
                                />

                                <button className="w-full p-2 mt-5 mx-auto bg-green-400 rounded-sm">Create Account</button>

                                <HorizontalDividerWithText className="mt-5">OR</HorizontalDividerWithText>
                            </div>
                        ) : (
                            <>
                                <div className="flex flex-col space-y-2 items-center">
                                    <button className="flex justify-center p-2 w-full bg-gray-500 hover:bg-gray-400 rounded-sm" onClick={() => setIsEmailSignUp(true)}>
                                        <Image src="/icons8-email-48.png" alt="Email Logo" width={20} height={20}/>
                                    </button>

                                    <button className="flex justify-center p-2 w-full bg-gray-500 hover:bg-gray-400 rounded-sm" onClick={() => signIn("google")}>
                                        <Image src="./icons8-google.svg" alt="Google Logo" width={20} height={20}/>
                                    </button>

                                    <button className="flex justify-center p-2 w-full bg-gray-500 hover:bg-gray-400 rounded-sm" onClick={() => signIn("facebook")}>
                                        <Image src="./icons8-facebook.svg" alt="Facebook Logo" width={20} height={20}/>
                                    </button>
                                </div>

                                <HorizontalDividerWithText className="mt-5">OR</HorizontalDividerWithText>
                            </>
                        )
                    ) : (
                        <>
                            <p className="text-xl">Email</p>

                            <input className="bg-white border border-gray-300 px-4 py-2 font-sans placeholder-gray-400 text-gray-800 rounded-md
                                focus:outline-none focus:ring-2 focus:ring-green-600" type="text"/>
                            <button className="w-full p-2 mx-auto bg-green-400 rounded-sm">Proceed with Email</button>

                            <HorizontalDividerWithText className="mt-5">OR</HorizontalDividerWithText>
                            
                            <div className="flex justify-between">
                                <button className="flex justify-center p-2 w-[45%] bg-gray-500 hover:bg-gray-400 rounded-sm" onClick={() => signIn("google")}>
                                    <Image src="./icons8-google.svg" alt="Google Logo" width={20} height={20}/>
                                </button>

                                <button className="flex justify-center p-2 w-[45%] bg-gray-500 hover:bg-gray-400 rounded-sm" onClick={() => signIn("facebook")}>
                                    <Image src="./icons8-facebook.svg" alt="Facebook Logo" width={20} height={20}/>
                                </button>
                            </div>
                        </>
                    )
                }
                
                <div className="flex flex-col justify-between mt-3">
                    {
                        isSignUpPage ? (<p>Already registered? <button className="text-green-500 ml-2" onClick={() => setIsSignUpPage(false)}>Log in!</button></p>) :
                        (<p>New to Suit Up? <button className="text-green-500 ml-2" onClick={() => {
                                setIsSignUpPage(true);
                                setIsEmailSignUp(false);
                            }
                        }>Sign up!</button></p>)
                    }
                    
                    <div className="flex flex-col mb-5 space-y-2">
                        <div>Developed by <span className="font-bold text-green-500">Nafis Iqbal</span></div>

                        <div className="flex justify-between w-[45%]">
                            <button className="flex justify-center p-2 w-[25%] bg-gray-500 hover:bg-gray-400 rounded-sm">
                                <Image src="./icons8-github.svg" alt="Github Logo" width={20} height={20}/>
                            </button>

                            <button className="flex justify-center p-2 w-[25%] bg-gray-500 hover:bg-gray-400 rounded-sm">
                                <Image src="./icons8-linkedin.svg" alt="LinkedIn Logo" width={20} height={20}/>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}