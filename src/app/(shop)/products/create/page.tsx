"use client";

import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import { ProductForm } from "@/components/forms/ProductForm";

export default function ProductCreationPage() {
    const {data: session } = useSession();

    if(!session || (session?.user.role !== "ADMIN" && session?.user.role !== "MASTER_ADMIN")) return (
        redirect("/")
    );

    return (
        <div className="flex flex-col p-2 mt-5">
            <div className="flex flex-col space-y-2 font-sans mx-auto">
                <h3 className="text-green-500">Create New Product</h3>
                <p className="text-green-200">Add a new product to your inventory.</p>

                <ProductForm mode={"create"} productData={{}}/>
            </div>
        </div>
    )
}