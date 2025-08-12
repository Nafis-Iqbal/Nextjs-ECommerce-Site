"use client";

import { useParams, useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";

import TableLayout from "@/components/layout-elements/TableLayout";
import { NextImage, HorizontalDivider } from "@/components/custom-elements/UIUtilities";
import { AddressManagerModule } from "@/components/modular-components/AddressManagerModule";
import { OrderApi } from "@/services/api";

export default function OrderConfirmationPage() {
    const router = useRouter();
    const params = useParams();

    const [orderSuccess, setOrderSuccess] = useState(false);

    const {data: buyerOrderDetail, isLoading: isLoadingBuyerOrderDetail, isError: isErrorBuyerOrderDetail} = OrderApi.useGetBuyerOrderDetailRQ(params.order_id as string);

    useEffect(() => {
        if (params?.order_id) {
            setOrderSuccess(true);
        }
    }, [params]);

    return (
        <div className="flex flex-col p-2 mt-5">
            <div className="ml-6 flex flex-col space-y-2 border-1 border-green-800 items-center text-left">
                <h1 className="mt-7 font-satisfy">Order Confirmation</h1>

                <HorizontalDivider className="w-[90%] border-green-800"/>
                
                {orderSuccess ? 
                    (
                        <div className="flex flex-col space-y-5 font-sans">
                            <h3 className="text-green-300">Your Order has been placed successfully!</h3>
                            
                            <h4 className="text-green-300">Order ID:&nbsp;&nbsp;<span className="text-white font-semibold text-3xl">{params.order_id}</span></h4>
                            
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

                                {
                                    buyerOrderDetail?.data && 
                                    Array.isArray(buyerOrderDetail.data.items) && 
                                    buyerOrderDetail.data.items.map((item, index) => (
                                        <OrderItemListRow 
                                            key={item.id} 
                                            Sr={index + 1} 
                                            productName={item.product_name || "Unknown Product"} 
                                            quantity={item.product_quantity || 0} 
                                            price={item.product_price || 0}
                                        >
                                        </OrderItemListRow>
                                    ))
                                }

                                <div className="flex flex-col w-[40%] self-end mr-3">
                                    <div className="flex justify-between">
                                        <p className="text-green-200">Items Total:</p>
                                        <p className="w-[50%] text-center">{buyerOrderDetail?.data?.totalAmount}</p>
                                    </div>

                                    <div className="flex justify-between">
                                        <p className="text-green-200">Shipping Cost::</p>
                                        <p className="w-[50%] text-center">0</p>
                                    </div>

                                    <div className="flex justify-between">
                                        <p className="text-green-200">Grand Total:</p>
                                        <p className="w-[50%] text-center">{buyerOrderDetail?.data?.totalAmount}</p>
                                    </div>
                                </div>
                            </TableLayout>

                            <AddressManagerModule/>

                            <h4 className="text-green-300">Selected method of payment:&nbsp;&nbsp;<span className="text-white font-bold text-3xl">Cash on Delivery</span></h4>
                           
                            <div className="flex space-x-5 justify-between mt-5 mb-10">
                                <button className="px-2 py-1 bg-green-600 hover:bg-green-500 rounded-sm">Print this page</button>

                                <button className="px-2 py-1 bg-green-600 hover:bg-green-500 rounded-sm" onClick={() => router.push("/orders")}>Go to my orders</button>

                                <button className="px-2 py-1 bg-green-600 hover:bg-green-500 rounded-sm" onClick={() => router.push("/")}>Continue Shopping</button>
                            </div>
                        </div>
                    ) : 
                    (
                        <div className="flex flex-col space-y-5 font-sans">
                            <h3>Something went wrong: ReAsOn!</h3>

                            <NextImage className="min-h-[300px]" src="/404E.jpg" alt="oops_not_found"/>

                            <div className="flex space-x-5 justify-between mb-10">
                                <button className="px-2 py-1 bg-green-600 hover:bg-green-500 rounded-sm" onClick={() => router.push("/cart")}>Go back to Cart</button>

                                <button className="px-2 py-1 bg-green-600 hover:bg-green-500 rounded-sm" onClick={() => router.push("/orders")}>Go to my orders</button>

                                <button className="px-2 py-1 bg-green-600 hover:bg-green-500 rounded-sm" onClick={() => router.push("/")}>Continue Shopping</button>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

const OrderItemListRow = ({Sr, productName, quantity, price} : {Sr: number, productName: string, quantity: number, price: number}) => {
    return (
        <div className="flex p-2 w-full border-b-1 border-green-900 hover:bg-gray-600 text-center">
            <p className="w-[10%]">{Sr}</p>
            <p className="w-[45%]">{productName}</p>
            <p className="w-[35%]">{quantity}</p>
            <p className="w-[35%]">{price}</p>
            <p className="w-[35%]">{quantity * price}</p>
        </div>
    )
}