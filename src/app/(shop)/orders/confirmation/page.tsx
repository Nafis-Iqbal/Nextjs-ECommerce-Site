"use client";

import { EditButton } from "@/components/custom-elements/Buttons";
import TableLayout from "@/components/layout-elements/TableLayout";
import { NextImage, HorizontalDivider } from "@/components/custom-elements/UIUtilities";

export default function OrderConfirmationPage() {
    const orderSuccess = true;

    const onEditInfo = () => {

    }

    return (
        <div className="flex flex-col p-2 mt-5">
            <div className="ml-6 flex flex-col space-y-2 border-1 border-green-800 items-center text-left">
                <h1 className="mt-7 font-satisfy">Order Confirmation</h1>

                <HorizontalDivider className="w-[90%] border-green-800"/>
                
                {orderSuccess ? 
                    (
                        <div className="flex flex-col space-y-5 font-sans">
                            <h3 className="text-green-300">Your Order has been placed successfully!</h3>
                            
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
                                    <EditButton onClick={() => onEditInfo()}></EditButton>
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
                           
                            <div className="flex space-x-5 justify-between mb-10">
                                <button className="px-2 py-1 bg-green-600 hover:bg-green-500 rounded-sm">Print this page</button>

                                <button className="px-2 py-1 bg-green-600 hover:bg-green-500 rounded-sm">Go to my orders</button>

                                <button className="px-2 py-1 bg-green-600 hover:bg-green-500 rounded-sm">Continue Shopping</button>
                            </div>
                        </div>
                    ) : 
                    (
                        <div className="flex flex-col space-y-5">
                            <h3>Something went wrong: ReAsOn!</h3>

                            <NextImage className="min-h-[300px]" src="/404E.jpg" alt="oops_not_found"/>

                            <div className="flex space-x-5 justify-between mb-10">
                                <button className="px-2 py-1 bg-green-600 hover:bg-green-500 rounded-sm">Go back to Cart</button>

                                <button className="px-2 py-1 bg-green-600 hover:bg-green-500 rounded-sm">Go to my orders</button>

                                <button className="px-2 py-1 bg-green-600 hover:bg-green-500 rounded-sm">Continue Shopping</button>
                            </div>
                        </div>
                    )
                }
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