"use client";

import Link from "next/link"

import { ProductStatus, OrderStatus, ComplaintStatus } from "@/types/enums"

import TableLayout from "@/components/layout-elements/TableLayout"
import FilterSectionLayout from "@/components/layout-elements/FilterSectionLayout"
import { HorizontalDivider } from "@/components/UIUtilities"
import CustomSelect, {CustomTextInput} from "@/components/custom-elements/CustomInputElements"

export default function AdminDashboard() {
    const orderStatusOptions = Object.values(OrderStatus).map(status => ({
        value: status,
        label: status.replace("_", " ").toLowerCase().replace(/^\w/, c => c.toUpperCase())
    }));

    const complaintStatusOptions = Object.values(OrderStatus).map(status => ({
        value: status,
        label: status.replace("_", " ").toLowerCase().replace(/^\w/, c => c.toUpperCase())
    }));

    const productStatusOptions = Object.values(ProductStatus).map(status => ({
        value: status,
        label: status.replace("_", " ").toLowerCase().replace(/^\w/, c => c.toUpperCase())
    }));

    const filterByOrderStatus = (status: string) => {

    }

    return (
        <div className="flex flex-col p-2 font-sans">
            <div className="ml-6 flex flex-col space-y-2">
                <h3 className="text-green-500">Your Business</h3>
                <p className="text-green-200">Manage everything at a glance.</p>

                <div className="flex flex-col mt-5">
                    <TableLayout className="mr-5">
                        <div className="flex space-x-5 mb-2">
                            <h4 className="">Sell Orders</h4>
                            <button className="text-sm px-1 mt-1 bg-green-700 hover:bg-green-600 rounded-md self-center">View All</button>
                        </div>

                        <div className="flex border-1 border-green-800 p-2 bg-gray-600 text-center">
                            <p className="w-[5%]">Sr. No.</p>
                            <p className="w-[30%]">Seller Order ID</p>
                            <p className="w-[25%]">Order Owner</p>
                            <p className="w-[20%]">Total Amount</p>
                            <p className="w-[10%]">Order Status</p>
                            <p className="w-[10%]">Filter</p>
                        </div>
                        <div className="flex flex-col border-1 border-green-800">
                            <SellerOrderListTableRow id={1} seller_order_id="1" orderUserName="Nafis" totalAmount={2000} orderStatus={OrderStatus.PENDING}/>
                            <SellerOrderListTableRow id={1} seller_order_id="1" orderUserName="Nafis" totalAmount={2000} orderStatus={OrderStatus.PENDING}/>
                            <SellerOrderListTableRow id={1} seller_order_id="1" orderUserName="Nafis" totalAmount={2000} orderStatus={OrderStatus.PENDING}/>
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

                                    <button className="p-2 bg-green-700 hover:bg-green-600 text-white rounded-sm">Show Completed Order History</button>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-left space-x-6">
                            <div className="flex flex-col space-y-1">
                                <label>Minimum Total Amount</label>
                                <CustomTextInput placeholderText="Enter minimum earned"/>
                            </div>

                            <div className="flex flex-col space-y-1">
                                <label>Order Owner name</label>
                                <CustomTextInput placeholderText="Enter customer name"/>
                            </div>

                            <div className="flex flex-col space-y-1">
                                <label>Order Owner ID</label>
                                <CustomTextInput placeholderText="Enter customer ID"/>
                            </div>
                        </div>
                    </FilterSectionLayout>

                    <HorizontalDivider className="mr-5 my-10"/>
                </div>

                <div className="flex flex-col">
                    <TableLayout className="mr-5">
                        <div className="flex space-x-5 mb-2">
                            <h4 className="">Your Products</h4>
                            <button className="text-sm px-1 mt-1 bg-green-700 hover:bg-green-600 rounded-md self-center">View All</button>
                        </div>

                        <div className="flex border-1 border-green-800 p-2 bg-gray-600 text-center">
                            <p className="w-[5%]">Sr. No.</p>
                            <p className="w-[25%]">Product Name</p>
                            <p className="w-[15%]">Pending Orders</p>
                            <p className="w-[10%]">Customer Rating</p>
                            <p className="w-[10%]">Reviews</p>
                            <p className="w-[10%]">Total Units Sold</p>
                            <p className="w-[20%]">Total Earned</p>
                            <p className="w-[5%]">Filter</p>
                        </div>
                        <div className="flex flex-col border-1 border-green-800">
                            <ProductListTableRow id={1} productName="laptop" pendingOrders={3} owner_name="Nafis" customerRating={3.5} reviewCount={6} unitsSold={100} totalEarned={5000}/>
                            <ProductListTableRow id={1} productName="laptop" pendingOrders={3} owner_name="Nafis" customerRating={3.5} reviewCount={6} unitsSold={100} totalEarned={5000}/>
                            <ProductListTableRow id={1} productName="laptop" pendingOrders={3} owner_name="Nafis" customerRating={3.5} reviewCount={6} unitsSold={100} totalEarned={5000}/>
                        </div>
                    </TableLayout>

                    <button className="self-start p-2 mt-10 mb-5 mr-5 bg-green-700 hover:bg-green-600 text-white rounded-sm">Create New Product</button>

                    <FilterSectionLayout className="mr-5">
                        <div className="flex justify-left space-x-15">                   
                            <div className="flex flex-col space-y-1">
                                <label>Product Status</label>
                                <CustomSelect
                                    options={productStatusOptions}
                                    value="Active"
                                    onChange={(value) => filterByOrderStatus(value)}
                                    className="bg-gray-600"
                                />
                            </div>
                        </div>

                        <div className="flex justify-left space-x-6">
                            <div className="flex flex-col space-y-1">
                                <label>Minimum Earned</label>
                                <CustomTextInput placeholderText="Enter minimum earned"/>
                            </div>

                            <div className="flex flex-col space-y-1">
                                <label>Units Sold</label>
                                <CustomTextInput placeholderText="Enter minimum units sold"/>
                            </div>

                            <div className="flex flex-col space-y-1">
                                <label>Minimum Rating</label>
                                <CustomTextInput placeholderText="Enter minimum rating"/>
                            </div>
                        </div>
                    </FilterSectionLayout>

                    <HorizontalDivider className="mr-5 my-10"/>
                </div>

                <div className="flex flex-col">
                    <TableLayout className="mr-5">
                        <div className="flex space-x-5 mb-2">
                            <h4 className="">Buyer Complaints</h4>
                            <button className="text-sm px-1 mt-1 bg-green-700 hover:bg-green-600 rounded-md self-center">View All</button>
                        </div>

                        <div className="flex border-1 border-green-800 p-2 bg-gray-600 text-center">
                            <p className="w-[5%]">Sr. No.</p>
                            <p className="w-[10%]">Product ID</p>
                            <p className="w-[45%]">Complaint Subject</p>
                            <p className="w-[20%]">Complained by</p>
                            <p className="w-[15%]">Complaint Status</p>
                            <p className="w-[5%]">Filter</p>
                        </div>
                        <div className="flex flex-col border-1 border-green-800">
                            <ComplaintListTableRow id={1} product_id={"1"} complaintSubject="laptop" complainingUserName="Nafis" complaintStatus={ComplaintStatus.PENDING}/>
                            <ComplaintListTableRow id={1} product_id={"1"} complaintSubject="laptop" complainingUserName="Nafis" complaintStatus={ComplaintStatus.PENDING}/>
                            <ComplaintListTableRow id={1} product_id={"1"} complaintSubject="laptop" complainingUserName="Nafis" complaintStatus={ComplaintStatus.PENDING}/>
                        </div>
                    </TableLayout>

                    <FilterSectionLayout className="mr-5">
                        <div className="flex justify-left space-x-6">
                            <div className="flex flex-col space-y-1">
                                <label>Complaint Status</label>
                                <CustomSelect
                                    options={complaintStatusOptions}
                                    value="Active"
                                    onChange={(value) => filterByOrderStatus(value)}
                                    className="bg-gray-600"
                                />
                            </div>

                            <div className="flex flex-col space-y-1">
                                <label>Product ID</label>
                                <CustomTextInput placeholderText="Enter product ID"/>
                            </div>
                        </div>
                    </FilterSectionLayout>

                    <HorizontalDivider className="mr-5 my-10"/>
                </div>

                <div className="flex flex-col">
                    <h3 className="mb-5 text-green-500 font-bold">Store visibility toggle</h3>

                    <div className="flex mt-5 justify-between mr-5">
                        <div className="flex flex-col items-center space-y-2">
                            <label>Freeze All Product Stocks</label>
                            <input className="w-6 h-6" type="checkbox"></input>
                        </div>

                        <div className="flex flex-col items-center space-y-2">
                            <label className="text-red-700">Toggle Store Maintenance Mode</label>
                            <input className="w-6 h-6" type="checkbox"></input>
                        </div>
                    </div>
                </div>
            </div>

            <HorizontalDivider className="border-green-500 mt-20"/>
        </div>
    )
}

const SellerOrderListTableRow = ({
    id, seller_order_id, orderUserName, totalAmount, orderStatus, mode = ""
} : {
    id: number, seller_order_id: string, orderUserName: string, totalAmount: number, orderStatus: OrderStatus, mode?: string
}) => {
    return (
        <div className="flex p-2 w-full border-b-1 border-green-900 hover:bg-gray-600 text-center">
            <p className="w-[5%]">{id}</p>
            <p className="w-[30%]">{seller_order_id}</p>
            <p className="w-[25%]">{orderUserName}</p>
            <p className="w-[20%]">{totalAmount}</p>
            <p className="w-[10%]">{orderStatus}</p>
            <p className="w-[10%]">{mode}</p>
        </div>
    )
}

const ProductListTableRow = ({
    id, productName, pendingOrders, customerRating, reviewCount, unitsSold, totalEarned, mode = ""
} : {
    id: number, productName: string, pendingOrders: number, owner_name: string, customerRating: number, reviewCount: number, unitsSold: number, totalEarned: number, mode?: string
}) => {
    return (
        <div className="flex p-2 w-full border-b-1 border-green-900 hover:bg-gray-600 text-center">
            <p className="w-[5%]">{id}</p>
            <p className="w-[25%]">{productName}</p>
            <p className="w-[15%]">{pendingOrders}</p>
            <p className="w-[10%]">{customerRating}</p>
            <p className="w-[10%]">{reviewCount}</p>
            <p className="w-[10%]">{unitsSold}</p>
            <p className="w-[20%]">{totalEarned}</p>
            <p className="w-[5%]">{mode}</p>
        </div>
    )
}

const ComplaintListTableRow = ({
    id, product_id, complaintSubject, complainingUserName, complaintStatus, mode = ""
} : {
    id: number, product_id: string, complaintSubject: string, complainingUserName: string, complaintStatus: ComplaintStatus, mode?: string
}) => {
    return (
        <div className="flex p-2 w-full border-b-1 border-green-900 hover:bg-gray-600 text-center">
            <p className="w-[5%]">{id}</p>
            <p className="w-[10%]">{product_id}</p>
            <p className="w-[45%]">{complaintSubject}</p>
            <p className="w-[20%]">{complainingUserName}</p>
            <p className="w-[15%]">{complaintStatus}</p>
            <p className="w-[5%]">{mode}</p>
        </div>
    )
}