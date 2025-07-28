"use client";

import { useSession } from "next-auth/react";

import { HorizontalDivider } from "@/components/custom-elements/UIUtilities"
import CategoryManagerModule from "@/components/modular-components/CategoryManagerModule";
import { UserManagerModule } from "@/components/modular-components/UserManagerModule";
import { VendorManagerModule } from "@/components/modular-components/VendorManagerModule";
import { ProductManagerModule } from "@/components/modular-components/ProductManagerModule";
import { ComplaintManagerModule } from "@/components/modular-components/ComplaintManagerModule";

export default function MasterAdminDashboard() {
    const {data: session, status} = useSession();

    if(session?.user.role !== "MASTER_ADMIN"){
        return (
            <>
            </>
        );
    }

    return (
        <section className="flex flex-col p-2 font-sans" id="dashboard_master_admin">
            <div className="ml-6 flex flex-col space-y-2">
                <h2 className="text-green-500">Your System</h2>
                <p className="text-green-200">Site management functions here.</p>

                <UserManagerModule/>

                <VendorManagerModule/>

                <ProductManagerModule/>
                
                <CategoryManagerModule className="mr-5"/>

                <ComplaintManagerModule/>

                <div className="flex flex-col">
                    <h3 className="mb-5 text-green-500 font-bold">Site Features Toggle</h3>

                    <div className="flex mt-5 justify-between mr-5">
                        <div className="flex flex-col items-center space-y-2">
                            <label>Freeze New Orders</label>
                            <input className="w-6 h-6" type="checkbox"></input>
                        </div>

                        <div className="flex flex-col items-center space-y-2">
                            <label>Freeze New Product Request</label>
                            <input className="w-6 h-6" type="checkbox"></input>
                        </div>

                        <div className="flex flex-col items-center space-y-2">
                            <label>Freeze New Complaints</label>
                            <input className="w-6 h-6" type="checkbox"></input>
                        </div>

                        <div className="flex flex-col items-center space-y-2">
                            <label className="text-red-700">Toggle Maintenance Mode</label>
                            <input className="w-6 h-6" type="checkbox"></input>
                        </div>
                    </div>
                </div>
            </div>
            
            <HorizontalDivider className="border-green-500 mt-20"/>
        </section>
    )
}