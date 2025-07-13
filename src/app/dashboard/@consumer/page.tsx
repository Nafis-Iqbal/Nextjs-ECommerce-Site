"use client";

import Link from "next/link"
import Image from "next/image"

import { OrderStatus } from "@/types/enums"

import TableLayout from "@/components/layout-elements/TableLayout"
import FilterSectionLayout from "@/components/layout-elements/FilterSectionLayout"
import { HorizontalDivider } from "@/components/UIUtilities"
import CustomSelect, { CustomTextInput } from "@/components/custom-elements/CustomInputElements"

export default function ConsumerDashboard() {
    const orderStatusOptions = Object.values(OrderStatus).map(status => ({
        value: status,
        label: status.replace("_", " ").toLowerCase().replace(/^\w/, c => c.toUpperCase())
    }));

    const filterByOrderStatus = (status: string) => {

    }

    const deleteWishList = () => {

    }

    return (
        <div className="flex flex-col p-2 font-sans">
            <div className="ml-6 flex flex-col space-y-2">
                <h3 className="text-green-500">Your Transactions</h3>
                <p className="text-green-200">All your shopping records, in one place.</p>

                <div className="flex flex-col mt-5">
                    <TableLayout className="mr-5">
                        <h4 className="mb-2">Your Cart</h4>

                        <div className="flex border-1 border-green-800 p-2 bg-gray-600 text-center">
                            <p className="w-[5%]">Sr. No.</p>
                            <p className="w-[40%]">Item</p>
                            <p className="w-[15%]">Quantity</p>
                            <p className="w-[30%]">Price</p>
                            <p className="w-[10%]">Stock</p>
                        </div>
                        <div className="flex flex-col border-1 border-green-800">
                            <CartItemListTableRow id={1} item="Nafis" quantity={3} price={2} stock={5000}/>
                            <CartItemListTableRow id={1} item="Nafis" quantity={3} price={2} stock={5000}/>
                            <CartItemListTableRow id={1} item="Nafis" quantity={3} price={2} stock={5000}/>
                        </div>
                    </TableLayout>

                    <button className="self-start p-2 mt-10 mr-5 bg-red-700 hover:bg-red-600 text-white rounded-sm">Clear Cart</button>

                    <HorizontalDivider className="mr-5 my-10"/>
                </div>

                <div className="flex flex-col">
                    <TableLayout className="mr-5">
                        <div className="flex space-x-5 mb-2">
                            <h4 className="">User Orders</h4>
                            <button className="text-sm px-1 mt-1 bg-green-700 hover:bg-green-600 rounded-md self-center">View All</button>
                        </div>

                        <div className="flex border-1 border-green-800 p-2 bg-gray-600 text-center">
                            <p className="w-[5%]">Sr. No.</p>
                            <p className="w-[30%]">Order ID</p>
                            <p className="w-[20%]">Total Amount</p>
                            <p className="w-[15%]">Order Status</p>
                            <p className="w-[20%]">Created</p>
                            <p className="w-[10%]">Filter</p>
                        </div>
                        <div className="flex flex-col border-1 border-green-800">
                            <BuyerOrderListTableRow id={1} buyerOrderID="1" orderUserName="Nafis" totalAmount={2000} orderStatus={OrderStatus.PENDING} createdDate={new Date()}/>
                            <BuyerOrderListTableRow id={1} buyerOrderID="1" orderUserName="Nafis" totalAmount={2000} orderStatus={OrderStatus.PENDING} createdDate={new Date()}/>
                            <BuyerOrderListTableRow id={1} buyerOrderID="1" orderUserName="Nafis" totalAmount={2000} orderStatus={OrderStatus.PENDING} createdDate={new Date()}/>
                        </div>
                    </TableLayout>

                    <FilterSectionLayout className="mr-5">
                        <div className="flex justify-left space-x-15">                   
                            <div className="flex flex-col space-y-1 w-full">
                                <label>Order Status</label>
                                <div className="flex justify-between">
                                    <CustomSelect
                                        options={orderStatusOptions}
                                        value="Active"
                                        onChange={(value) => filterByOrderStatus(value)}
                                        className="bg-gray-600"
                                    />

                                    <button className="p-2 bg-green-700 hover:bg-green-600 text-white rounded-sm">Show Ongoing Order History</button>

                                    <button className="p-2 bg-green-700 hover:bg-green-600 text-white rounded-sm">Show Completed Order History</button>
                                </div>
                            </div>
                        </div>
                    </FilterSectionLayout>

                    <HorizontalDivider className="mr-5 my-10"/>
                </div>

                <div className="flex flex-col">
                    <TableLayout className="mr-5">
                        <div className="flex space-x-5 mb-2">
                            <h4 className="">User Wishlist</h4>
                            <button className="text-sm px-1 mt-1 bg-green-700 hover:bg-green-600 rounded-md self-center">View All</button>
                        </div>

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

                    <button className="self-start p-2 mt-10 mr-5 bg-red-700 hover:bg-red-600 text-white rounded-sm">Clear Wishlist</button>
                </div>
            </div>
            
            <HorizontalDivider className="border-green-500 mt-20"/>
        </div>
    )
}

const CartItemListTableRow = ({
    id, item, quantity, price, stock
} : {
    id: number, item: string, quantity: number, price: number, stock: number
}) => {
    return (
        <div className="flex p-2 w-full border-b-1 border-green-900 hover:bg-gray-600 text-center">
            <p className="w-[5%]">{id}</p>
            <p className="w-[40%]">{item}</p>
            <p className="w-[15%]">{quantity}</p>
            <p className="w-[30%]">{price}</p>
            <p className="w-[10%]">{stock}</p>
        </div>
    )
}

const BuyerOrderListTableRow = ({
    id, buyerOrderID, totalAmount, orderStatus, createdDate, mode = ""
} : {
    id: number, buyerOrderID: string, orderUserName: string, totalAmount: number, orderStatus: OrderStatus, createdDate: Date, mode?: string
}) => {
    return (
        <div className="flex p-2 w-full border-b-1 border-green-900 hover:bg-gray-600 text-center">
            <p className="w-[5%]">{id}</p>
            <p className="w-[30%]">{buyerOrderID}</p>
            <p className="w-[20%]">{totalAmount}</p>
            <p className="w-[15%]">{orderStatus}</p>
            <p className="w-[20%]">{createdDate.toDateString()}</p>
            <p className="w-[10%]">{mode}</p>
        </div>
    )
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