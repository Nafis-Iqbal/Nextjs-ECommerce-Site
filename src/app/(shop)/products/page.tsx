"use client";

import { useSearchParams } from "next/navigation";
import { redirect, useRouter } from "next/navigation";
import { ProductApi } from "@/services/api";

import TableLayout from "@/components/layout-elements/TableLayout";
import ProductViewListTableRow from "@/components/data-elements/DataTableRowElements";
import { useSession } from "next-auth/react";

export default function ProductListingsPage() {
    const router = useRouter();
    const {data: session} = useSession();
    const searchParams = useSearchParams();
    const queryString = window.location.search;

    const {data: productsList, isLoading: isFetchLoading, isError: isFetchError} = ProductApi.useGetProductsRQ(queryString);

    if(!session || 
        (session.user.role === "USER") || 
        (session.user.role === "ADMIN" && searchParams.get("owner") !== session.user.user_id)) 
    {
        redirect("/");
    }

    return (
        <div className="flex flex-col p-2 font-sans mt-5">
            <div className="ml-6 flex flex-col space-y-2">
                <h3 className="text-green-500">Products</h3>
                <p className="text-green-200">{session.user.role === "MASTER_ADMIN" ? "All products available for sale on the site." : 
                "All of your porducts, in one convenient location."}</p>

                <TableLayout className="mt-5 mr-5">
                    <div className="flex border-1 border-green-800 p-2 bg-gray-600 text-center">
                        <p className="w-[5%]">Sr. No.</p>
                        <p className="w-[20%]">Product Name</p>
                        <p className="w-[35%]">Product Image</p>
                        <p className="w-[15%]">Product Type</p>
                        <p className="w-[10%]">Price</p>
                        <p className="w-[15%]">Product ID</p>
                    </div>
                    <div className="flex flex-col border-1 border-green-800">
                        {(productsList?.data ?? []).map((product, index) => {
                            return (
                                <ProductViewListTableRow 
                                    key={product.id} 
                                    id={index + 1} 
                                    productName={product.title || ''} 
                                    product_id={product.id} 
                                    productImageURL={product.images?.[0]?.url || '/image-not-found.png'} 
                                    price={product.price || 0} 
                                    productCategoryType="Keyboard"
                                    onClickNavigate={() => router.push(`/products/${product.id}`)}
                                />
                            );
                        })}
                    </div>
                </TableLayout>
            </div>
        </div>
    )
}

