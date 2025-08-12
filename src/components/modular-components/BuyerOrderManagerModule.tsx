"use client";

import { useState } from "react"
import { OrderApi } from "@/services/api"
import { OrderStatus } from "@/types/enums"

import TableLayout from "../layout-elements/TableLayout"
import { HorizontalDivider } from "../custom-elements/UIUtilities"
import FilterSectionLayout from "../layout-elements/FilterSectionLayout"
import { CustomSelectInput } from "../custom-elements/CustomInputElements"
import { NoContentTableRow } from "../placeholder-components/NoContentTableRow";
import Link from "next/link";

type BuyerOrderFilter = {
    orderStatus: OrderStatus;
}

const defaultFilterValues: BuyerOrderFilter = {
    orderStatus: OrderStatus.PENDING
}

export const BuyerOrderManagerModule = ({className} : {className?: string}) => {
    const [filters, setFilters] = useState<Partial<BuyerOrderFilter>>(defaultFilterValues);

    const {data: allBuyerOrders, isLoading: isLoadingOrders, isError: isErrorOrders} = OrderApi.useGetBuyerOrdersRQ();

    const orderStatusOptions = Object.values(OrderStatus).map(status => ({
        value: status,
        label: status.replace("_", " ").toLowerCase().replace(/^\w/, c => c.toUpperCase())
    }));

    const onSubmitFilterBuyerOrderSearch = (e: React.FormEvent<HTMLFormElement>) => {

    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        setFilters((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <section className={`flex flex-col ${className}`} id="dashboard_buyer_orders">
            <div className="flex space-x-5 mb-2">
                <h4 className="">Your Orders</h4>
                <button className="text-sm px-1 mt-1 bg-green-700 hover:bg-green-600 rounded-md self-center">View All</button>
            </div>
            <TableLayout className="mr-5">
                <div className="flex border-1 border-green-800 p-2 bg-gray-600 text-center">
                    <p className="w-[5%]">Sr. No.</p>
                    <p className="w-[35%]">Order ID</p>
                    <p className="w-[20%]">Total Amount</p>
                    <p className="w-[15%]">Order Status</p>
                    <p className="w-[25%]">Created</p>
                </div>
                <div className="flex flex-col border-1 border-green-800">
                    {
                        isLoadingOrders ? (<NoContentTableRow displayMessage="Loading Data" tdColSpan={1}/>) :
                        isErrorOrders ? (<NoContentTableRow displayMessage="An error occurred" tdColSpan={1}/>) :

                        (allBuyerOrders?.data && Array.isArray(allBuyerOrders?.data) && allBuyerOrders?.data.length <= 0) ? (<NoContentTableRow displayMessage="No products found" tdColSpan={1}/>) :
                        (Array.isArray(allBuyerOrders?.data) && 
                            allBuyerOrders?.data?.map((order: Order, index: number) => (
                                <BuyerOrderListTableRow 
                                    key={order.id} 
                                    id={index + 1} 
                                    buyerOrderID={order.id} 
                                    orderUserName={order.user?.user_name || 'Unknown'}
                                    totalAmount={order.totalAmount || 0}
                                    orderStatus={order.orderStatus || 'Unknown'}
                                    createdDate={new Date(order.createdAt)}
                                />
                            ))
                        )
                    }
                </div>
            </TableLayout>

            <FilterSectionLayout className="mr-5" onSubmit={onSubmitFilterBuyerOrderSearch}>
                <div className="flex justify-left space-x-15">                   
                    <div className="flex flex-col space-y-1 w-full">
                        <label>Order Status</label>
                        <div className="flex justify-between">
                            <CustomSelectInput
                                options={orderStatusOptions}
                                value="Active"
                                onChange={handleChange}
                                className="bg-gray-600"
                            />

                            <button className="p-2 bg-green-700 hover:bg-green-600 text-white rounded-sm">Show Ongoing Order History</button>

                            <button className="p-2 bg-green-700 hover:bg-green-600 text-white rounded-sm">Show Completed Order History</button>
                        </div>
                    </div>
                </div>
            </FilterSectionLayout>

            <HorizontalDivider className="mr-5 my-10"/>
        </section>
    );
}

const BuyerOrderListTableRow = ({
    id, buyerOrderID, totalAmount, orderStatus, createdDate
} : {
    id: number, buyerOrderID: string, orderUserName: string, totalAmount: number, orderStatus: OrderStatus, createdDate: Date
}) => {
    return (
        <div className="flex p-2 w-full border-b-1 border-green-900 text-center">
            <p className="w-[5%]">{id}</p>
            <Link className="w-[35%] hover:text-green-500 hover:scale-110 duration-150" href={`/orders/${buyerOrderID}`}>{buyerOrderID}</Link>
            <p className="w-[20%]">{totalAmount}</p>
            <p className="w-[15%]">{orderStatus}</p>
            <p className="w-[25%]">{createdDate.toDateString()}</p>
        </div>
    )
}