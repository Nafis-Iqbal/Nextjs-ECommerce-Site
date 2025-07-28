import { UserStatus } from "@/types/enums"
import { UserApi } from "@/services/api"

import TableLayout from "../layout-elements/TableLayout"
import FilterSectionLayout from "../layout-elements/FilterSectionLayout"
import CustomSelect from "../custom-elements/CustomInputElements"
import { CustomTextInput } from "../custom-elements/CustomInputElements"
import { HorizontalDivider } from "../custom-elements/UIUtilities"

export const VendorManagerModule = () => {
    const {data: usersList, isSuccess: isUsersSuccess, isError: isUsersError} = UserApi.useGetUsersRQ();

    const userStatusOptions = Object.values(UserStatus).map(status => ({
        value: status,
        label: status.replace("_", " ").toLowerCase().replace(/^\w/, c => c.toUpperCase())
    }));

    const filterByUserRole = (role: string) => {

    }

    return (
        <div className="flex flex-col">
            <div className="flex space-x-5 mb-2">
                <h4 className="">Vendors</h4>
                <button className="text-sm px-1 mt-1 bg-green-700 hover:bg-green-600 rounded-md self-center">View All</button>
            </div>
            <TableLayout className="mr-5">
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