"use client";

import { useState } from "react"
import { OrderApi } from "@/services/api"
import { OrderStatus } from "@/types/enums"

import TableLayout from "../layout-elements/TableLayout"
import { HorizontalDivider } from "../custom-elements/UIUtilities"
import FilterSectionLayout from "../layout-elements/FilterSectionLayout"
import { CustomSelectInput } from "../custom-elements/CustomInputElements"

type BuyerOrderFilter = {
    orderStatus: OrderStatus;
}

const defaultFilterValues: BuyerOrderFilter = {
    orderStatus: OrderStatus.PENDING
}

export const BuyerOrderManagerModule = ({className} : {className?: string}) => {
    const [filters, setFilters] = useState<Partial<BuyerOrderFilter>>(defaultFilterValues);

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
                    <BuyerOrderListTableRow id={1} buyerOrderID="1" orderUserName="Nafis" totalAmount={2000} orderStatus={OrderStatus.PENDING} createdDate={new Date()}/>
                    <BuyerOrderListTableRow id={1} buyerOrderID="1" orderUserName="Nafis" totalAmount={2000} orderStatus={OrderStatus.PENDING} createdDate={new Date()}/>
                    <BuyerOrderListTableRow id={1} buyerOrderID="1" orderUserName="Nafis" totalAmount={2000} orderStatus={OrderStatus.PENDING} createdDate={new Date()}/>
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
        <div className="flex p-2 w-full border-b-1 border-green-900 hover:bg-gray-600 text-center">
            <p className="w-[5%]">{id}</p>
            <p className="w-[35%]">{buyerOrderID}</p>
            <p className="w-[20%]">{totalAmount}</p>
            <p className="w-[15%]">{orderStatus}</p>
            <p className="w-[25%]">{createdDate.toDateString()}</p>
        </div>
    )
}