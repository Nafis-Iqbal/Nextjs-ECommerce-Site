"use client";

import TableLayout from "@/components/layout-elements/TableLayout";
import { NextImage, HorizontalDivider, VerticalDivider } from "@/components/custom-elements/UIUtilities";

export default function OrderDetailPage() {
    const paymentDone = false;
    
    const onEditInfo = () => {

    }

    return (
        <div className="flex flex-col p-2 mt-5">
            <div className="ml-6 flex flex-col space-y-2 border-1 border-green-800 ">
                <div className="flex flex-col items-center text-left">
                    <h1 className="mt-7 font-satisfy">Order Details</h1>

                    <HorizontalDivider className="w-[95%] border-green-800"/>
                </div>

                <div className="flex space-x-5">
                    <div className="flex flex-col space-y-5 font-sans text-left w-[65%] ml-10">
                        <h4 className="text-green-300">Order ID:&nbsp;&nbsp;<span className="text-white font-semibold text-3xl">12345</span></h4>
                        
                        <div className="flex flex-col">
                            <h4 className="text-green-300">Name:&nbsp;&nbsp;<span className="text-white">Nafis</span></h4>
                            <h4 className="text-green-300">Email:&nbsp;&nbsp;<span className="text-white">nafisiqbal53@gmail.com</span></h4>
                        </div>

                        <h4 className="text-green-300">Ordered Items</h4>
                        <TableLayout className="">
                            <div className="flex p-2 w-full border-b-1 border-green-900 hover:bg-gray-600 text-center">
                                <p className="w-[10%] text-green-200">Sr No.</p>
                                <p className="w-[45%] text-green-200">Product Name</p>
                                <p className="w-[35%] text-green-200">Quantity</p>
                                <p className="w-[35%] text-green-200">Price</p>
                                <p className="w-[35%] text-green-200">Total</p>
                            </div>

                            <OrderItemListRow id="1" productName="Laptop1" quantity={2} price={250}></OrderItemListRow>
                            <OrderItemListRow id="1" productName="Laptop1" quantity={2} price={250}></OrderItemListRow>
                            <OrderItemListRow id="1" productName="Laptop1" quantity={2} price={250}></OrderItemListRow>

                            <div className="flex flex-col w-[40%] self-end mr-3">
                                <div className="flex justify-between">
                                    <p className="text-green-200">Items Total:</p>
                                    <p>750</p>
                                </div>

                                <div className="flex justify-between">
                                    <p className="text-green-200">Shipping Cost::</p>
                                    <p>0</p>
                                </div>

                                <div className="flex justify-between">
                                    <p className="text-green-200">Grand Total:</p>
                                    <p>750</p>
                                </div>
                            </div>
                        </TableLayout>

                        <div className="flex flex-col space-y-3">
                            <div className="flex space-x-3">
                                <h4 className="text-green-300">Shipping Address</h4>
                            </div>
                            
                            <div className="flex space-x-3">
                                <p>addressLine1, </p>
                                <p>addressLine2</p>
                            </div>

                            <div className="flex space-x-3">
                                <p className="text-green-300">Country:&nbsp; <span className="text-white">Bangladesh</span></p>
                                <p className="text-green-300">City:&nbsp; <span className="text-white">Mirpur</span></p>
                                <p className="text-green-300">State:&nbsp; <span className="text-white">Dhaka</span></p>
                            </div>
                            
                            <div className="flex space-x-3">
                                <p className="text-green-300">Postal Code:&nbsp; <span className="text-white">2100</span></p>
                                <p className="text-green-300">Phone Number:&nbsp; <span className="text-white">01884694591</span></p>
                            </div>
                        </div>

                        <h4 className="text-green-300">Selected method of payment:&nbsp;&nbsp;<span className="text-white font-bold text-3xl">Cash on Delivery</span></h4>
                        
                        <div className="flex space-x-10 mb-10">
                            <button className="px-2 py-1 bg-green-600 hover:bg-green-500 rounded-sm">Print this page</button>

                            <button className="px-2 py-1 bg-green-600 hover:bg-green-500 rounded-sm">Go to my orders</button>
                        </div>
                    </div>

                    <div className="flex flex-col w-[30%] space-y-5 font-sans mr-10 mb-10">
                        <h3 className="text-green-300">Actions</h3>
                        <div className="flex justify-between">
                            <p className="text-green-200">Payment Status</p>

                            <div className="flex space-x-5 justify-right">
                                <p>PENDING</p>

                                {!paymentDone && (<button className="px-2 bg-green-600 hover:bg-green-400 rounded-sm text-sm">Pay Now...</button>)}
                            </div>
                        </div>
                        
                        <div className="flex justify-between">
                            <p className="text-green-200">Order Status</p>

                            <p>PENDING</p>
                        </div>

                        <button className="self px-2 py-1 bg-red-600 hover:bg-red-400 rounded-sm">Cancel Order</button>
                        <button className="px-2 py-1 bg-green-600 hover:bg-green-500 rounded-sm">Claim Refund</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

const OrderItemListRow = ({id, productName, quantity, price} : {id: string, productName: string, quantity: number, price: number}) => {
    return (
        <div className="flex p-2 w-full border-b-1 border-green-900 hover:bg-gray-600 text-center">
            <p className="w-[10%]">{id}</p>
            <p className="w-[45%]">{productName}</p>
            <p className="w-[35%]">{quantity}</p>
            <p className="w-[35%]">{price}</p>
            <p className="w-[35%]">{quantity * price}</p>
        </div>
    )
}