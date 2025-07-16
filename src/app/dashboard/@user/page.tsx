"use client";

import Link from "next/link"
import Image from "next/image"

import DivGap from "@/components/custom-elements/UIUtilities"
import { EditButton } from "@/components/custom-elements/Buttons"

export default function UserDashboard() {
    const onEditInfo = () => {

    }

    return (
        <div className="flex flex-col p-2 font-sans">
            <div className="ml-6 flex flex-col space-y-2">
                <h3 className="text-green-500">Your Profile</h3>
                <p className="text-green-200">Personalize your account info, preferences.</p>

                <div className="flex flex-col mt-8 space-y-2">
                    <div className="flex relative w-[180px] h-[180px]">
                        <Image className="bg-gray-100" src="/DP.jpg" alt="Profile Picture" fill></Image>

                        <EditButton className="absolute bottom-0 right-0" onClick={() => onEditInfo()}></EditButton>
                    </div>
                    
                    <div className="flex mt-5 items-baseline space-x-3">
                        <p>Seen as&nbsp;&nbsp;<span className="text-2xl text-green-300">Nafis Iqbal</span></p>

                        <EditButton onClick={() => onEditInfo()}></EditButton>
                    </div>

                    <div className="flex mt-5 items-baseline space-x-3">
                        <p>Role is&nbsp;&nbsp;<span className="text-3xl text-green-500">User</span></p>
                    </div>
                    
                    <div className="flex mt-5 items-baseline space-x-3">
                        <p>Email is&nbsp;&nbsp;<span className="text-xl text-green-300">nafisiqbal53@gmail.com</span></p>

                        <EditButton onClick={() => onEditInfo()}></EditButton>
                    </div>
                    
                    <div className="flex mt-5 items-baseline space-x-3">
                        <p>Born,&nbsp;&nbsp;<span className="text-xl text-green-300">14th December, 1997</span></p>

                        <EditButton onClick={() => onEditInfo()}></EditButton>
                    </div>

                    <div className="flex mt-5 items-baseline space-x-3">
                        <p>Lives in&nbsp;&nbsp;<span className="text-xl text-green-300">Dhaka, Bangladesh</span></p>

                        <EditButton onClick={() => onEditInfo()}></EditButton>
                    </div>

                    <div className="flex flex-col mt-5 space-y-3">
                        <div className="flex space-x-3">
                            <p className="text-xl text-green-300">Shipping Address</p>
                            <EditButton onClick={() => onEditInfo()}></EditButton>
                        </div>
                        
                        <div className="flex space-x-3">
                            <p>addressLine1, </p>
                            <p>addressLine2</p>
                        </div>

                        <div className="flex space-x-3">
                            <p>Country: <span className="text-green-300">Bangladesh</span></p>
                            <p>City: <span className="text-green-300">Mirpur</span></p>
                            <p>State: <span className="text-green-300">Dhaka</span></p>
                        </div>
                        
                        <div className="flex space-x-3">
                            <p>Postal Code: <span className="text-green-300">2100</span></p>
                            <p>Phone Number: <span className="text-green-300">01884694591</span></p>
                        </div>
                    </div>

                    <h2>Billing Info</h2>

                    <div className="flex mt-5 space-x-5">
                        <button className="p-2 bg-green-700 hover:bg-green-600 text-white rounded-sm">Change Password</button>
                        <button className="p-2 bg-red-700 hover:bg-red-600 text-white rounded-sm">Delete Password</button>
                    </div>
                </div>
            </div>
            
            <DivGap customHeightGap="h-[80px]"/>
        </div>
    )
}