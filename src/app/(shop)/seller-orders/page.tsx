/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { OrderStatus } from "@/types/enums";
import { SellerOrderApi } from "@/services/api";

import TableLayout from "@/components/layout-elements/TableLayout"
import FilterSectionLayout from "@/components/layout-elements/FilterSectionLayout";
import { CustomSelectInput } from "@/components/custom-elements/CustomInputElements";
import { SellerOrderViewListTableRow } from "@/components/data-elements/DataTableRowElements"
import { NoContentTableRow } from "@/components/placeholder-components/NoContentTableRow";


export default function SellerOrderHistoryPage() {
    const searchParams = useSearchParams();
    const [queryString, setQueryString] = useState<string>('');
    const {data: allSellerOrders, isLoading: isLoadingOrders, isError: isErrorOrders, refetch: refetchSellerOrders} = SellerOrderApi.useGetSellerOrdersRQ(queryString);

    useEffect(() => {
        const qString = (window.location.search).slice(1);
        setQueryString(qString);
    }, [searchParams]);

    useEffect(() => {
        refetchSellerOrders();
    }, [queryString]);
    
    const orderStatusOptions = Object.values(OrderStatus).map(status => ({
        value: status,
        label: status.replace("_", " ").toLowerCase().replace(/^\w/, c => c.toUpperCase())
    }));

    const filterByOrderStatus = () => {

    }

    return (
        <div className="flex flex-col p-2 font-sans mt-5">
            <div className="ml-6 flex flex-col space-y-2">
                <h3 className="text-green-500">Seller Orders</h3>
                <p className="text-green-200">This text will be custom, depending on list ownsership type.</p>

                <TableLayout className="mt-5 mr-5">
                    <div className="flex border-1 border-green-800 p-2 bg-gray-600 text-center">
                        <p className="w-[5%]">Sr. No.</p>
                        <p className="w-[20%]">Seller Order ID</p>
                        <p className="w-[20%]">Buyer ID</p>
                        <p className="w-[20%]">Buyer Name</p>
                        <p className="w-[15%]">Order Date</p>
                        <p className="w-[10%]">Total Amount</p>
                        <p className="w-[10%]">Order Status</p>
                    </div>
                    <div className="flex flex-col border-1 border-green-800">
                        {
                            isLoadingOrders ? (<NoContentTableRow displayMessage="Loading Data" tdColSpan={1}/>) :
                            isErrorOrders ? (<NoContentTableRow displayMessage="An error occurred" tdColSpan={1}/>) :

                            (allSellerOrders?.data && Array.isArray(allSellerOrders?.data) && allSellerOrders?.data.length <= 0) ? (<NoContentTableRow displayMessage="No orders found" tdColSpan={1}/>) :
                            (Array.isArray(allSellerOrders?.data) &&
                                allSellerOrders?.data?.map((order, index) => (
                                    <SellerOrderViewListTableRow
                                        key={order.id}
                                        Sr={index + 1}
                                        seller_order_id={order.id}
                                        buyer_id={order.buyerId}
                                        buyerName={order.buyerName}
                                        orderDate={order.createdAt}
                                        totalAmount={order.totalAmount}
                                        orderStatus={order.orderStatus}
                                    />
                                ))
                            )
                        }
                    </div>
                </TableLayout>

                <FilterSectionLayout className="mr-5" onSubmit={filterByOrderStatus}>
                    <div className="flex justify-left space-x-15">                   
                        <div className="flex flex-col space-y-1 w-full">
                            <label>Order Status</label>
                            <div className="flex justify-between">
                                <CustomSelectInput
                                    options={orderStatusOptions}
                                    value="Active"
                                    onChange={(value) => filterByOrderStatus()}
                                    className="bg-gray-600"
                                />

                                <button className="p-2 bg-green-700 hover:bg-green-600 text-white rounded-sm">Show Ongoing Seller Order History</button>

                                <button className="p-2 bg-green-700 hover:bg-green-600 text-white rounded-sm">Show Completed Seller Order History</button>
                            </div>
                        </div>
                    </div>
                </FilterSectionLayout>
            </div>
        </div>
    )
}

