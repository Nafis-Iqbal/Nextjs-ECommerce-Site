"use client";

import { useSession } from "next-auth/react";

import { HorizontalDivider } from "@/components/custom-elements/UIUtilities"
import { SellerOrderManagerModule } from "@/components/modular-components/SellerOrderManagerModule"
import { VendorProductManagerModule } from "@/components/modular-components/VendorProductManagerModule"
import { ComplaintManagerModule } from "@/components/modular-components/ComplaintManagerModule"

export default function AdminDashboard() {
    const {data: session, status} = useSession();
    
    if(session?.user.role !== "ADMIN" && session?.user.role !== "MASTER_ADMIN") return (
        <>
        </>
    );

    return (
        <section className="flex flex-col p-2 font-sans" id="dashboard_admin">
            <div className="ml-6 flex flex-col space-y-2">
                <h3 className="text-green-500">Your Business</h3>
                <p className="text-green-200">Manage everything at a glance.</p>

                <SellerOrderManagerModule className="mt-5"/>
                
                <VendorProductManagerModule />

                <ComplaintManagerModule />

                <div className="flex flex-col">
                    <div className="flex items-center space-x-5">
                        <h3 className="text-green-500 font-bold">Store visibility toggle</h3>
                        <div className="text-sm px-1 bg-red-400 rounded-md self-center">Feature Not Ready</div>
                    </div>

                    <div className="flex mt-5 justify-between mr-5">
                        <div className="flex flex-col items-center space-y-2">
                            <label>Freeze All Product Stocks</label>
                            <input className="w-6 h-6" type="checkbox"></input>
                        </div>

                        <div className="flex flex-col items-center space-y-2">
                            <label className="text-red-700">Toggle Store Maintenance Mode</label>
                            <input className="w-6 h-6" type="checkbox"></input>
                        </div>
                    </div>
                </div>
            </div>

            <HorizontalDivider className="border-green-500 mt-20"/>
        </section>
    )
}