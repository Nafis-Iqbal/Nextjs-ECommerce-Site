/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { OrderApi } from "@/services/api";
import { useSession } from "next-auth/react";
import { redirect, useSearchParams } from "next/navigation";

import TableLayout from "@/components/layout-elements/TableLayout"
import {OrderViewListTableRow} from "@/components/data-elements/DataTableRowElements"
import { OrderStatus } from "@/types/enums"
import FilterSectionLayout from "@/components/layout-elements/FilterSectionLayout"
import { CustomSelectInput } from "@/components/custom-elements/CustomInputElements"
import { NoContentTableRow } from "@/components/placeholder-components/NoContentTableRow";

export default function OrderHistoryPage() {
    const {data: session} = useSession();
    const searchParams = useSearchParams();

    const {data: allBuyerOrders, isLoading: isLoadingOrders, isError: isErrorOrders} = OrderApi.useGetBuyerOrdersRQ();

    const orderStatusOptions = Object.values(OrderStatus).map(status => ({
        value: status,
        label: status.replace("_", " ").toLowerCase().replace(/^\w/, c => c.toUpperCase())
    }));
    
    const filterByOrderStatus = () => {

    }

    if(!session)
    {
        redirect("/");
    }

    return (
        <div className="flex flex-col p-2 font-sans mt-5">
            <div className="ml-6 flex flex-col space-y-2">
                <h3 className="text-green-500">Order History</h3>
                <p className="text-green-200">This text will be custom, depending on list ownsership type.</p>

                <TableLayout className="mt-5 mr-5">
                    <div className="flex border-1 border-green-800 p-2 bg-gray-600 text-center">
                        <p className="w-[5%]">Sr. No.</p>
                        <p className="w-[30%]">Order ID</p>
                        <p className="w-[30%]">Order Placement Date</p>
                        <p className="w-[20%]">Total Amount</p>
                        <p className="w-[15%]">Order Status</p>
                    </div>
                    <div className="flex flex-col border-1 border-green-800">
                        {
                            isLoadingOrders ? (<NoContentTableRow displayMessage="Loading Data" tdColSpan={1}/>) :
                            isErrorOrders ? (<NoContentTableRow displayMessage="An error occurred" tdColSpan={1}/>) :

                            (allBuyerOrders?.data && Array.isArray(allBuyerOrders?.data) && allBuyerOrders?.data.length <= 0) ? (<NoContentTableRow displayMessage="No orders found" tdColSpan={1}/>) :
                            (Array.isArray(allBuyerOrders?.data) &&
                                allBuyerOrders?.data?.map((order, index) => (
                                    <OrderViewListTableRow
                                        key={order.id}
                                        id={index + 1}
                                        order_id={order.id}
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
                                    onChange={() => filterByOrderStatus()}
                                    className="bg-gray-600"
                                />

                                <button className="p-2 bg-green-700 hover:bg-green-600 text-white rounded-sm">Show Ongoing Order History</button>

                                <button className="p-2 bg-green-700 hover:bg-green-600 text-white rounded-sm">Show Completed Order History</button>
                            </div>
                        </div>
                    </div>
                </FilterSectionLayout>
            </div>
        </div>
    )
}