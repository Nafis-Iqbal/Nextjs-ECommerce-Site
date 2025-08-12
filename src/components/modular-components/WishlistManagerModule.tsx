"use client";

import { useState } from "react"
import { WishlistApi } from "@/services/api"

import TableLayout from "../layout-elements/TableLayout"

export const WishlistManagerModule = ({className} : {className?: string}) => {
    
    const deleteWishList = () => {

    }

    return (
        <section className={`flex flex-col ${className}`} id="dashboard_wishlist">
            <div className="flex items-center space-x-5 mb-2">
                <h4 className="">User Wishlist</h4>
                <div className="text-sm px-1 bg-red-400 rounded-md self-center">Feature Not Ready</div>
                {/* <button className="text-sm px-1 mt-1 bg-green-700 hover:bg-green-600 rounded-md self-center">View All</button> */}
            </div>

            <TableLayout className="mr-5">
                <div className="flex border-1 border-green-800 p-2 bg-gray-600 text-center">
                    <p className="w-[10%]">Sr. No.</p>
                    <p className="w-[45%]">Product Name</p>
                    <p className="w-[35%]">Product Type</p>
                    <p className="w-[10%]">Action</p>
                </div>
                <div className="flex flex-col border-1 border-green-800">
                    <WishListTableRow id={1} productName="Nafis" productType="Hardware" action={() => deleteWishList()}/>
                    <WishListTableRow id={1} productName="Nafis" productType="Hardware" action={() => deleteWishList()}/>
                    <WishListTableRow id={1} productName="Nafis" productType="Hardware" action={() => deleteWishList()}/>
                    <WishListTableRow id={1} productName="Nafis" productType="Hardware" action={() => deleteWishList()}/>
                </div>
            </TableLayout>

            <button className="self-start p-2 mt-10 mr-5 bg-red-700 hover:bg-red-600 text-white rounded-sm" onClick={deleteWishList}>Clear Wishlist</button>
        </section>
    );
}

const WishListTableRow = ({
    id, productName, productType, action
} : {
    id: number, productName: string, productType: string, action: () => void
}) => {
    return (
        <div className="flex p-2 w-full border-b-1 border-green-900 hover:bg-gray-600 text-center">
            <p className="w-[10%]">{id}</p>
            <p className="w-[45%]">{productName}</p>
            <p className="w-[35%]">{productType}</p>
            <button className="w-[10%] bg-red-600 hover:bg-red-500 rounded-sm" onClick={() => action()}>Remove</button>
        </div>
    )
}