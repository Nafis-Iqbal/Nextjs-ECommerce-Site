"use client";

import Link from "next/link"
import { Role, UserStatus, PaymentStatus, ProductStatus, ComplaintStatus } from "@/types/enums"

import { HorizontalDivider } from "@/components/UIUtilities"
import TableLayout from "@/components/layout-elements/TableLayout";
import FilterSectionLayout from "@/components/layout-elements/FilterSectionLayout";

import CustomSelect from "@/components/custom-elements/CustomInputElements";
import { CustomTextInput } from "@/components/custom-elements/CustomInputElements";

export default function MasterAdminDashboard() {
    const userRoleOptions = Object.values(UserStatus).map(role => ({
        value: role,
        label: role.replace("_", " ").toLowerCase().replace(/^\w/, c => c.toUpperCase())
    }));

    const userStatusOptions = Object.values(UserStatus).map(status => ({
        value: status,
        label: status.replace("_", " ").toLowerCase().replace(/^\w/, c => c.toUpperCase())
    }));

    const paymentStatusOptions = Object.values(PaymentStatus).map(status => ({
        value: status,
        label: status.replace("_", " ").toLowerCase().replace(/^\w/, c => c.toUpperCase())
    }));

    const productStatusOptions = Object.values(ProductStatus).map(status => ({
        value: status,
        label: status.replace("_", " ").toLowerCase().replace(/^\w/, c => c.toUpperCase())
    }));

    const complaintStatusOptions = Object.values(ComplaintStatus).map(status => ({
        value: status,
        label: status.replace("_", " ").toLowerCase().replace(/^\w/, c => c.toUpperCase())
    }));

    const filterByUserRole = (role: string) => {

    }

    const filterByPaymentStatus = (role: string) => {

    }

    return (
        <div className="flex flex-col p-2 font-sans">
            <div className="ml-6 flex flex-col space-y-2">
                <h3 className="text-green-500">Your System</h3>
                <p className="text-green-200">Site management functions here.</p>

                <div className="flex flex-col mt-5">
                    <TableLayout className="mr-5">
                        <div className="flex mb-2 space-x-5">
                            <h4 className="">All Users</h4>
                            <button className="text-sm px-1 mt-1 bg-green-700 hover:bg-green-600 rounded-md self-center">View All</button>
                        </div>

                        <div className="flex border-1 border-green-800 p-2 bg-gray-600 text-center">
                            <p className="w-[5%]">Sr. No.</p>
                            <p className="w-[25%]">User Name</p>
                            <p className="w-[5%]">Role</p>
                            <p className="w-[30%]">Email</p>
                            <p className="w-[15%]">Spent</p>
                            <p className="w-[15%]">Joined</p>
                            <p className="w-[5%]">Filter</p>
                        </div>
                        <div className="flex flex-col border-1 border-green-800">
                            <UserListTableRow id={1} user_name="Nafis" role={Role.USER} email="nafis53@gmail.com" spent={5000} joined={new Date()}/>
                            <UserListTableRow id={1} user_name="Nafis" role={Role.USER} email="nafis53@gmail.com" spent={5000} joined={new Date()}/>
                            <UserListTableRow id={1} user_name="Nafis" role={Role.USER} email="nafis53@gmail.com" spent={5000} joined={new Date()}/>
                        </div>
                    </TableLayout>

                    <FilterSectionLayout className="mr-5">
                        <div className="flex justify-left space-x-15">
                            <div className="flex flex-col space-y-1">
                                <label>Role</label>
                                <CustomSelect
                                    options={userRoleOptions}
                                    value="User"
                                    onChange={(value) => filterByUserRole(value)}
                                    className="bg-gray-600"
                                />
                            </div>
                            
                            <div className="flex flex-col space-y-1">
                                <label>Status</label>
                                <CustomSelect
                                    options={userStatusOptions}
                                    value="Active"
                                    onChange={(value) => filterByUserRole(value)}
                                    className="bg-gray-600"
                                />
                            </div>

                            <div className="flex flex-col space-y-1">
                                <label>Payment Status</label>
                                <CustomSelect
                                    options={paymentStatusOptions}
                                    value="User"
                                    onChange={(value) => filterByPaymentStatus(value)}
                                    className="bg-gray-600"
                                />
                            </div>
                        </div>

                        <div className="flex justify-left space-x-6">
                            <div className="flex flex-col space-y-1">
                                <label>User Name</label>
                                <CustomTextInput placeholderText="Enter user name"/>
                            </div>

                            <div className="flex flex-col space-y-1">
                                <label>Email</label>
                                <CustomTextInput placeholderText="Enter user email"/>
                            </div>
                        </div>

                        <div className="flex justify-left space-x-6">
                            <div className="flex flex-col space-y-1">
                                <label>City</label>
                                <CustomTextInput placeholderText="Enter City"/>
                            </div>

                            <div className="flex flex-col space-y-1">
                                <label>Minimum Spent</label>
                                <CustomTextInput placeholderText="Enter minimum Spent"/>
                            </div>

                            <div className="flex flex-col space-y-1">
                                <label>Order Count</label>
                                <CustomTextInput placeholderText="Enter minimum Order"/>
                            </div>
                        </div>
                    </FilterSectionLayout>

                    <HorizontalDivider className="mr-5 my-10"/>
                </div>

                <div className="flex flex-col">
                    <TableLayout className="mr-5">
                        <div className="flex space-x-5 mb-2">
                            <h4 className="">Vendors</h4>
                            <button className="text-sm px-1 mt-1 bg-green-700 hover:bg-green-600 rounded-md self-center">View All</button>
                        </div>

                        <div className="flex border-1 border-green-800 p-2 bg-gray-600 text-center">
                            <p className="w-[5%]">Sr. No.</p>
                            <p className="w-[30%]">Vendor Name</p>
                            <p className="w-[30%]">Email</p>
                            <p className="w-[15%]">Earned</p>
                            <p className="w-[15%]">Joined</p>
                            <p className="w-[5%]">Filter</p>
                        </div>
                        <div className="flex flex-col border-1 border-green-800">
                            <VendorListTableRow id={1} user_name="Nafis" email="nafis53@gmail.com" earned={5000} created={new Date()}/>
                            <VendorListTableRow id={1} user_name="Nafis" email="nafis53@gmail.com" earned={5000} created={new Date()}/>
                            <VendorListTableRow id={1} user_name="Nafis" email="nafis53@gmail.com" earned={5000} created={new Date()}/>
                        </div>
                    </TableLayout>

                    <FilterSectionLayout className="mr-5">
                        <div className="flex justify-left space-x-15">                   
                            <div className="flex flex-col space-y-1">
                                <label>Status</label>
                                <CustomSelect
                                    options={userStatusOptions}
                                    value="Active"
                                    onChange={(value) => filterByUserRole(value)}
                                    className="bg-gray-600"
                                />
                            </div>
                        </div>

                        <div className="flex justify-left space-x-6">
                            <div className="flex flex-col space-y-1">
                                <label>Vendor Name</label>
                                <CustomTextInput placeholderText="Enter user name"/>
                            </div>

                            <div className="flex flex-col space-y-1">
                                <label>Email</label>
                                <CustomTextInput placeholderText="Enter user email"/>
                            </div>
                        </div>

                        <div className="flex justify-left space-x-6">
                            <div className="flex flex-col space-y-1">
                                <label>City</label>
                                <CustomTextInput placeholderText="Enter City"/>
                            </div>

                            <div className="flex flex-col space-y-1">
                                <label>Minimum Earned</label>
                                <CustomTextInput placeholderText="Enter minimum earned"/>
                            </div>

                            <div className="flex flex-col space-y-1">
                                <label>Order Count</label>
                                <CustomTextInput placeholderText="Enter minimum Orders completed"/>
                            </div>
                        </div>
                    </FilterSectionLayout>

                    <HorizontalDivider className="mr-5 my-10"/>
                </div>

                <div className="flex flex-col">
                    <TableLayout className="mr-5">
                        <div className="flex space-x-5 mb-2">
                            <h4 className="">All Vendor Products</h4>
                            <button className="text-sm px-1 mt-1 bg-green-700 hover:bg-green-600 rounded-md self-center">View All</button>
                        </div>

                        <div className="flex border-1 border-green-800 p-2 bg-gray-600 text-center">
                            <p className="w-[5%]">Sr. No.</p>
                            <p className="w-[20%]">Product Name</p>
                            <p className="w-[25%]">Owner</p>
                            <p className="w-[10%]">Rating</p>
                            <p className="w-[10%]">Reviews</p>
                            <p className="w-[10%]">Total Units Sold</p>
                            <p className="w-[15%]">Total Earned</p>
                            <p className="w-[5%]">Filter</p>
                        </div>
                        <div className="flex flex-col border-1 border-green-800">
                            <ProductListTableRow id={1} product_name="laptop" owner_name="Nafis" rating={3.5} review_count={6} units_sold={100} total_earned={5000}/>
                            <ProductListTableRow id={1} product_name="laptop" owner_name="Nafis" rating={3.5} review_count={6} units_sold={100} total_earned={5000}/>
                            <ProductListTableRow id={1} product_name="laptop" owner_name="Nafis" rating={3.5} review_count={6} units_sold={100} total_earned={5000}/>
                        </div>
                    </TableLayout>

                    <FilterSectionLayout className="mr-5">
                        <div className="flex justify-left space-x-15">                   
                            <div className="flex flex-col space-y-1">
                                <label>Product Status</label>
                                <CustomSelect
                                    options={productStatusOptions}
                                    value="Active"
                                    onChange={(value) => filterByUserRole(value)}
                                    className="bg-gray-600"
                                />
                            </div>
                        </div>

                        <div className="flex justify-left space-x-6">
                            <div className="flex flex-col space-y-1">
                                <label>Vendor Name</label>
                                <CustomTextInput placeholderText="Enter Vendor name"/>
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
                            <h4 className="">User Complaints</h4>
                            <button className="text-sm px-1 mt-1 bg-green-700 hover:bg-green-600 rounded-md self-center">View All</button>
                        </div>

                        <div className="flex border-1 border-green-800 p-2 bg-gray-600 text-center">
                            <p className="w-[5%]">Sr. No.</p>
                            <p className="w-[45%]">Complaint Subject</p>
                            <p className="w-[20%]">Complained by</p>
                            <p className="w-[10%]">User Role</p>
                            <p className="w-[15%]">Complaint Status</p>
                            <p className="w-[5%]">Filter</p>
                        </div>
                        <div className="flex flex-col border-1 border-green-800">
                            <ComplaintListTableRow id={1} complaint_subject="laptop" complaining_user_name="Nafis" user_role={Role.USER} complaint_status={ComplaintStatus.PENDING}/>
                            <ComplaintListTableRow id={1} complaint_subject="laptop" complaining_user_name="Nafis" user_role={Role.USER} complaint_status={ComplaintStatus.PENDING}/>
                            <ComplaintListTableRow id={1} complaint_subject="laptop" complaining_user_name="Nafis" user_role={Role.USER} complaint_status={ComplaintStatus.PENDING}/>
                        </div>
                    </TableLayout>

                    <FilterSectionLayout className="mr-5">
                        <div className="flex justify-left space-x-6">
                            <div className="flex flex-col space-y-1">
                                <label>User Role</label>
                                <CustomSelect
                                    options={userRoleOptions}
                                    value="User"
                                    onChange={(value) => filterByUserRole(value)}
                                    className="bg-gray-600"
                                />
                            </div>
                            
                            <div className="flex flex-col space-y-1">
                                <label>Complaint Status</label>
                                <CustomSelect
                                    options={complaintStatusOptions}
                                    value="Active"
                                    onChange={(value) => filterByUserRole(value)}
                                    className="bg-gray-600"
                                />
                            </div>
                        </div>
                    </FilterSectionLayout>

                    <HorizontalDivider className="mr-5 my-10"/>
                </div>

                <div className="flex flex-col">
                    <h3 className="mb-5 text-green-500 font-bold">Site Features Toggle</h3>

                    <div className="flex mt-5 justify-between mr-5">
                        <div className="flex flex-col items-center space-y-2">
                            <label>Freeze New Orders</label>
                            <input className="w-6 h-6" type="checkbox"></input>
                        </div>

                        <div className="flex flex-col items-center space-y-2">
                            <label>Freeze New Product Request</label>
                            <input className="w-6 h-6" type="checkbox"></input>
                        </div>

                        <div className="flex flex-col items-center space-y-2">
                            <label>Freeze New Complaints</label>
                            <input className="w-6 h-6" type="checkbox"></input>
                        </div>

                        <div className="flex flex-col items-center space-y-2">
                            <label className="text-red-700">Toggle Maintenance Mode</label>
                            <input className="w-6 h-6" type="checkbox"></input>
                        </div>
                    </div>
                </div>
            </div>
            
            <HorizontalDivider className="border-green-500 mt-20"/>
        </div>
    )
}

const UserListTableRow = ({
    id, user_name, role, email, spent, joined, mode = ""
} : {
    id: number, user_name: string, role: Role, email: string, spent: number, joined: Date, mode?: string
}) => {
    return (
        <div className="flex p-2 w-full border-b-1 border-green-900 hover:bg-gray-600 text-center">
            <p className="w-[5%]">{id}</p>
            <p className="w-[25%]">{user_name}</p>
            <p className="w-[5%]">{role}</p>
            <p className="w-[30%]">{email}</p>
            <p className="w-[15%]">{spent}</p>
            <p className="w-[15%]">{joined.toDateString()}</p>
            <p className="w-[5%]">{mode}</p>
        </div>
    )
}

const VendorListTableRow = ({
    id, user_name, email, earned, created, mode = ""
} : {
    id: number, user_name: string, email: string, earned: number, created: Date, mode?: string
}) => {
    return (
        <div className="flex p-2 w-full border-b-1 border-green-900 hover:bg-gray-600 text-center">
            <p className="w-[5%]">{id}</p>
            <p className="w-[30%]">{user_name}</p>
            <p className="w-[30%]">{email}</p>
            <p className="w-[15%]">{earned}</p>
            <p className="w-[15%]">{created.toDateString()}</p>
            <p className="w-[5%]">{mode}</p>
        </div>
    )
}

const ProductListTableRow = ({
    id, product_name, owner_name, rating, review_count, units_sold, total_earned, mode = ""
} : {
    id: number, product_name: string, owner_name: string, rating: number, review_count: number, units_sold: number, total_earned: number, mode?: string
}) => {
    return (
        <div className="flex p-2 w-full border-b-1 border-green-900 hover:bg-gray-600 text-center">
            <p className="w-[5%]">{id}</p>
            <p className="w-[20%]">{product_name}</p>
            <p className="w-[25%]">{owner_name}</p>
            <p className="w-[10%]">{rating}</p>
            <p className="w-[10%]">{review_count}</p>
            <p className="w-[10%]">{units_sold}</p>
            <p className="w-[15%]">{total_earned}</p>
            <p className="w-[5%]">{mode}</p>
        </div>
    )
}

const ComplaintListTableRow = ({
    id, complaint_subject, complaining_user_name, user_role, complaint_status, mode = ""
} : {
    id: number, complaint_subject: string, complaining_user_name: string, user_role: Role, complaint_status: ComplaintStatus, mode?: string
}) => {
    return (
        <div className="flex p-2 w-full border-b-1 border-green-900 hover:bg-gray-600 text-center">
            <p className="w-[5%]">{id}</p>
            <p className="w-[45%]">{complaint_subject}</p>
            <p className="w-[20%]">{complaining_user_name}</p>
            <p className="w-[10%]">{user_role}</p>
            <p className="w-[15%]">{complaint_status}</p>
            <p className="w-[5%]">{mode}</p>
        </div>
    )
}