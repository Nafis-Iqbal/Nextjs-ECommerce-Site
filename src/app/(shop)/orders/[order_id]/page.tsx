"use client";

import { useRouter } from "next/navigation";
import { queryClient } from "@/services/apiInstance";
import { useGlobalUI } from "@/hooks/state-hooks/globalStateHooks";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { OrderApi } from "@/services/api";

import ConfirmationModal from "@/components/modals/ConfirmationModal";
import TableLayout from "@/components/layout-elements/TableLayout";
import { HorizontalDivider } from "@/components/custom-elements/UIUtilities";
import { AddressManagerModule } from "@/components/modular-components/AddressManagerModule";
import { set } from "zod";


export default function BuyerOrderDetailPage() {
    const params = useParams();
    const router = useRouter();
    
    const [paymentDone, setPaymentDone] = useState(false);
    const [isOrderCancelled, setIsOrderCancelled] = useState(false);
    const [isOrderCancelConfirmationVisible, setOrderCancelConfirmationVisible] = useState(false);

    const {openNotificationPopUpMessage} = useGlobalUI();

    const {data: buyerOrderDetail, isLoading: isLoadingBuyerOrderDetail, isError: isErrorBuyerOrderDetail} = OrderApi.useGetBuyerOrderDetailRQ(params.order_id as string);

    const {mutate: updateOrderStatus} = OrderApi.useUpdateBuyerOrderStatusRQ(
        (responseData) => {
            if(responseData.status === "success")
            {
                openNotificationPopUpMessage("Your order was cancelled.");
                router.push("/orders");
                
                queryClient.invalidateQueries({ queryKey: ["cart"] });
            }
            else {
                openNotificationPopUpMessage("Failed to cancel order. An error occured.");
            }
        },
        () => {
            openNotificationPopUpMessage("Failed to cancel order. An error occured.");
        }
    );

    useEffect(() => {
        if (buyerOrderDetail?.data) {
            if(buyerOrderDetail.data.orderStatus === "PAYMENT_PENDING") {
                setPaymentDone(false);
            }
            else if(buyerOrderDetail.data.orderStatus === "CANCELLED") {
                setPaymentDone(true);
                setIsOrderCancelled(true);
            }
            else{
                setPaymentDone(true);
            }
        }
    }, [buyerOrderDetail]);

    const onOrderCancel = () => {
        setOrderCancelConfirmationVisible(true);
    };

    const onCancelOrderConfirmed = () => {
        updateOrderStatus({ order_id: params.order_id as string, orderData:{ orderStatus: "CANCELLED" } });
        setOrderCancelConfirmationVisible(false);
    };

    return (
        <div className="flex flex-col p-2 mt-5">
            <div className="ml-6 flex flex-col space-y-2 border-1 border-green-800 ">
                <div className="flex flex-col items-center text-left">
                    <h1 className="mt-7 font-satisfy">Order Details</h1>

                    <HorizontalDivider className="w-[95%] border-green-800"/>
                </div>

                <ConfirmationModal
                    isVisible={isOrderCancelConfirmationVisible}
                    message="Are you sure you want to cancel this order?"
                    onConfirm={() => onCancelOrderConfirmed()} 
                    onCancel={() => setOrderCancelConfirmationVisible(false)} 
                />

                <div className="flex space-x-5">
                    <div className="flex flex-col space-y-5 font-sans text-left w-[65%] ml-10">
                        <h4 className="text-green-300">Order ID:&nbsp;&nbsp;<span className="text-white font-semibold text-3xl">{buyerOrderDetail?.data?.id ?? "Unknown Order"}</span></h4>

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
                        
                        <div className="flex space-x-10 mb-10">
                            <button className="px-2 py-1 bg-green-600 hover:bg-green-500 rounded-sm">Print this page</button>

                            <button className="px-2 py-1 bg-green-600 hover:bg-green-500 rounded-sm" onClick={() => router.push('/orders')}>Go to my orders</button>
                        </div>
                    </div>

                    <div className="flex flex-col w-[30%] space-y-5 font-sans mr-10 mb-10">
                        <h3 className="text-green-300">Actions</h3>
                        <div className="flex justify-between">
                            <p className="text-green-200">Payment Status</p>

                            <div className="flex space-x-5 justify-right">
                                <p>{buyerOrderDetail?.data?.orderStatus === "PAYMENT_PENDING" ? "PENDING" : 
                                    buyerOrderDetail?.data?.orderStatus === "CANCELLED" ? "N/A" : "PAID"}</p>

                                {!paymentDone && (<button className="px-2 bg-green-600 hover:bg-green-400 rounded-sm text-sm">Pay Now...</button>)}
                            </div>
                        </div>
                        
                        <div className="flex justify-between">
                            <p className="text-green-200">Order Status</p>

                            <p>{buyerOrderDetail?.data?.orderStatus}</p>
                        </div>

                        {!isOrderCancelled && <button className="self px-2 py-1 bg-red-600 hover:bg-red-400 rounded-sm cursor-pointer" onClick={onOrderCancel}>Cancel Order</button>}
                        <button className="px-2 py-1 bg-green-600 hover:bg-green-500 rounded-sm cursor-pointer">Claim Refund</button>
                    </div>
                </div>
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