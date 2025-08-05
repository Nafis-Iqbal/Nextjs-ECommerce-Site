"use client";

import { useState, useEffect } from "react";
import { redirect, useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { ProductForm } from "@/components/forms/ProductForm";
import { ProductApi } from "@/services/api";
import LoadingSpinnerBlock from "@/components/placeholder-components/LoadingSpinnerBlock";

export default function ProductEditPage() {
    const {data: session } = useSession();
    const params = useParams();

    const { data: productDetailData, isError: detailFetchError, isLoading: detailFetchLoading } = ProductApi.useGetProductDetailRQ(params.product_id as string);

    if(!session || (session?.user.role !== "ADMIN" && session?.user.role !== "MASTER_ADMIN")) return (
        redirect("/")
    );

    return (
        <div className="flex flex-col p-2 mt-5">
            <div className="flex flex-col space-y-2 font-sans mx-auto">
                <h3 className="text-green-500">Edit Product</h3>
                <div className="flex space-x-10 items-center h-[40px]">
                    <p className="text-green-200">Edit product to your satisfaction.</p>

                    <LoadingSpinnerBlock isOpen={detailFetchLoading} customStyle="w-[30px] h-[30px]"/>
                </div>

                <ProductForm mode={"edit"} productData={productDetailData?.data ?? {}} product_id={params.product_id as string}/>
            </div>
        </div>
    )
}