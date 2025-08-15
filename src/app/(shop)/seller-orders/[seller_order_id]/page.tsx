/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { SellerOrderApi } from "@/services/api";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { queryClient } from "@/services/apiInstance";
import { OrderStatus } from "@/types/enums";

import TableLayout from "@/components/layout-elements/TableLayout";
import { HorizontalDivider } from "@/components/custom-elements/UIUtilities";
import { AddressManagerModule } from "@/components/modular-components/AddressManagerModule";
import ConfirmationModal from "@/components/modals/ConfirmationModal";
import { useGlobalUI } from "@/hooks/state-hooks/globalStateHooks";

export default function SellerOrderDetailPage() {
    const router = useRouter();
    const params = useParams();
    const {openNotificationPopUpMessage} = useGlobalUI();

    const [isStatusUpdateConfirmationVisible, setStatusUpdateConfirmationVisible] = useState(false);
    const [statusToAssign, setStatusToAssign] = useState<OrderStatus>(OrderStatus.PENDING);

    const {data: sellerOrderDetail, isLoading: isOrderLoading, isError: isOrderError, refetch: refetchSellerOrderDetail} = 
    SellerOrderApi.useGetSellerOrderDetailRQ(params.seller_order_id as string);

    const {mutate: updateSellerOrderStatus} = SellerOrderApi.useUpdateSellerOrderStatusRQ(
        (responseData) => {
            if(responseData.status === "success")
            {
                queryClient.invalidateQueries({ queryKey: ["sellerOrderDetail", params.seller_order_id] });
            }
            else openNotificationPopUpMessage("Failed to update seller order status");
        },
        () => {
            openNotificationPopUpMessage("Failed to update seller order status");
        }
    );

    useEffect(() => {
        if (params.seller_order_id) {
            refetchSellerOrderDetail();
        }
    }, [params.seller_order_id])

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sellerOrderData = sellerOrderDetail?.data;

    let sellerOrderTotal = 0;

    if (Array.isArray(sellerOrderData)) {
        sellerOrderTotal = sellerOrderData.reduce((total, item) => total + (item.product_price * item.product_quantity), 0);
    }

    const disableSellerOrderUpdate = Array.isArray(sellerOrderData) && 
    (sellerOrderData?.[0]?.orderStatus === "SHIPPED" || sellerOrderData?.[0]?.orderStatus === "COMPLETED" || sellerOrderData?.[0]?.orderStatus === "FAILED");

    const onOrderForfeitClicked = () => {
        setStatusToAssign(OrderStatus.FAILED);
        setStatusUpdateConfirmationVisible(true);
    }

    const onOrderShippedClicked = () => {
        setStatusToAssign(OrderStatus.SHIPPED);
        setStatusUpdateConfirmationVisible(true);
    }

    const onUpdateOrderStatusConfirmed = () => {
        updateSellerOrderStatus({orderId: params?.seller_order_id as string, orderData: {orderStatus: statusToAssign}});
        setStatusUpdateConfirmationVisible(false);
    }

    return (
        <div className="flex flex-col p-2 mt-5">
            <div className="ml-6 flex flex-col space-y-2 border-1 border-green-800 ">
                <div className="flex flex-col items-center text-left">
                    <h1 className="mt-7 font-satisfy">Seller Order Details</h1>

                    <HorizontalDivider className="w-[95%] border-green-800"/>
                </div>

                <ConfirmationModal
                    isVisible={isStatusUpdateConfirmationVisible}
                    message="Are you sure you want to update the status of this order?"
                    onConfirm={() => onUpdateOrderStatusConfirmed()} 
                    onCancel={() => setStatusUpdateConfirmationVisible(false)} 
                />

                <div className="flex space-x-5">
                    <div className="flex flex-col space-y-5 font-sans text-left w-[65%] ml-10">
                        <h4 className="text-green-300">Order ID:&nbsp;&nbsp;<span className="text-white font-semibold text-3xl">{params.seller_order_id || "Unknown"}</span></h4>

                        {Array.isArray(sellerOrderData) && sellerOrderData?.[0]?.buyer_id ? (
                            <div className="flex flex-col">
                                <p className="text-green-300 text-xl">Name:&nbsp;&nbsp;<span className="text-white">{sellerOrderData?.[0]?.buyer_name}</span></p>
                                <p className="text-green-300 text-xl">Email:&nbsp;&nbsp;<span className="text-white">{sellerOrderData?.[0]?.buyer_email}</span></p>
                            </div>
                        ) : (
                            <h4 className="text-green-300">Guest User</h4>
                        )}

                        <h4 className="text-green-300">Ordered Items</h4>
                        <TableLayout className="">
                            <div className="flex p-2 w-full border-b-1 border-green-900 hover:bg-gray-600 text-center">
                                <p className="w-[5%] text-green-200">Sr No.</p>
                                <p className="w-[30%] text-green-200">Product Name</p>
                                <p className="w-[15%] text-green-200">Quantity</p>
                                <p className="w-[15%] text-green-200">Price</p>
                                <p className="w-[15%] text-green-200">Total</p>
                                <p className="w-[10%] text-green-200">Stock</p>
                                <p className="w-[10%] text-green-200">Status</p>
                            </div>
                            {
                                sellerOrderData && 
                                Array.isArray(sellerOrderDetail.data) && 
                                sellerOrderDetail.data.map((item, index) => (
                                    <SellerOrderItemListRow 
                                        key={item.id} 
                                        Sr={index + 1} 
                                        productName={item.product_name || "Unknown Product"} 
                                        quantity={item.product_quantity || 0} 
                                        price={item.product_price || 0}
                                        stock={item.productStock || 0}
                                        productStatus={item.productStatus || "Unknown Status"}
                                    >
                                    </SellerOrderItemListRow>
                                ))
                            }

                            <div className="flex flex-col w-[50%] self-end my-2 mr-3">
                                <div className="flex space-x-10 items-center">
                                    <p className="text-green-200">Transaction Total:</p>
                                    <p className="text-green-500 font-semibold text-xl">{sellerOrderTotal}</p>
                                </div>
                            </div>
                        </TableLayout>

                        {Array.isArray(sellerOrderData) &&
                            <AddressManagerModule 
                                userId={null} 
                                addressBlockCustomStyle="w-[75%]" 
                                infoOnlyMode={true}
                                infoAddressId={sellerOrderData?.[0]?.address_id}
                            />
                        }
                        
                        <div className="flex space-x-10 mb-10">
                            <button className="px-2 py-1 bg-green-600 hover:bg-green-500 rounded-sm">Print this page</button>

                            <button className="px-2 py-1 bg-green-600 hover:bg-green-500 rounded-sm" onClick={() => router.push("/seller-orders?self=true")}>Go to Seller Orders</button>
                        </div>
                    </div>

                    <div className="flex flex-col w-[30%] space-y-5 font-sans mr-10 mb-10">
                        <h3 className="text-green-300">Actions</h3>
                        <div className="flex justify-between">
                            <p className="text-green-200">Payment Status</p>

                            {Array.isArray(sellerOrderData) && <div className="flex space-x-5 justify-right">
                                <p className="">{sellerOrderData?.[0]?.orderStatus === "PAYMENT_PENDING" ? "PENDING" : 
                                    sellerOrderData?.[0]?.orderStatus === "CANCELLED" ? "N/A" : "PAID"}</p>
                            </div>}
                        </div>
                        
                        <div className="flex justify-between">
                            <p className="text-green-200">Seller Order Status</p>

                            {Array.isArray(sellerOrderData) && <p>{sellerOrderData?.[0]?.orderStatus || "Unknown Status"}</p>}
                        </div>

                        <button 
                            disabled 
                            className="px-2 py-1 bg-green-600 hover:bg-green-500 rounded-sm disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                            Lock Available Product Stocks
                        </button>
                        <button 
                            disabled={disableSellerOrderUpdate}
                            className="px-2 py-1 bg-green-600 hover:bg-green-500 rounded-sm disabled:bg-gray-400 disabled:cursor-not-allowed" 
                            onClick={onOrderShippedClicked}
                        >
                            Mark Order as Shipped
                        </button>
                        <button 
                            disabled={disableSellerOrderUpdate}
                            className="self px-2 py-1 bg-red-600 hover:bg-red-400 rounded-sm disabled:bg-gray-400 disabled:cursor-not-allowed" 
                            onClick={onOrderForfeitClicked}
                        >
                            Forfeit Order
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

const SellerOrderItemListRow = ({Sr, productName, quantity, price, stock, productStatus} : {Sr: number, productName: string, quantity: number, price: number, stock: number, productStatus: string}) => {
    return (
        <div className="flex p-2 w-full border-b-1 border-green-900 hover:bg-gray-600 text-center">
            <p className="w-[5%]">{Sr}</p>
            <p className="w-[30%]">{productName}</p>
            <p className="w-[15%]">{quantity}</p>
            <p className="w-[15%]">{price}</p>
            <p className="w-[15%]">{quantity * price}</p>
            <p className="w-[10%]">{stock}</p>
            <p className="w-[10%]">{productStatus}</p>
        </div>
    )
}