import { Role, UserStatus, PaymentStatus } from "@/types/enums"
import { UserApi } from "@/services/api"

import TableLayout from "../layout-elements/TableLayout"
import FilterSectionLayout from "../layout-elements/FilterSectionLayout"
import CustomSelect from "../custom-elements/CustomInputElements"
import { CustomTextInput } from "../custom-elements/CustomInputElements"
import { HorizontalDivider } from "../custom-elements/UIUtilities"

export const UserManagerModule = () => {
    const {data: usersList, isSuccess: isUsersSuccess, isError: isUsersError} = UserApi.useGetUsersRQ();

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

    const filterByUserRole = (role: string) => {

    }

    const filterByPaymentStatus = (role: string) => {

    }

    return (
        <div className="flex flex-col mt-5">
            <div className="flex mb-2 space-x-5">
                <h4 className="">All Users</h4>
                <button className="text-sm px-1 mt-1 bg-green-700 hover:bg-green-600 rounded-md self-center">View All</button>
            </div>
            <TableLayout className="mr-5">
                <div className="flex border-1 border-green-800 p-2 bg-gray-600 text-left">
                    <p className="w-[5%]">Sr.</p>
                    <p className="w-[25%]">User Name</p>
                    <p className="w-[15%]">Role</p>
                    <p className="w-[25%]">Email</p>
                    <p className="w-[15%]">Spent</p>
                    <p className="w-[15%]">Joined</p>
                </div>
                <div className="flex flex-col border-1 border-green-800">
                    {
                        usersList?.data?.map((user, index) => (
                            <UserListTableRow key={user.id} id={index + 1} user_name={user.user_name} role={user.role} email={user.email} spent={5000} joined={user.emailVerified ?? new Date(2025, 0, 31)}/>
                        ))
                    }
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
    )
}

const UserListTableRow = ({
    id, user_name, role, email, spent, joined
} : {
    id: number, user_name: string, role: Role, email: string, spent: number, joined: Date
}) => {
    return (
        <div className="flex p-2 w-full border-b-1 border-green-900 hover:bg-gray-600 text-left">
            <p className="w-[5%]">{id}</p>
            <p className="w-[25%]">{user_name}</p>
            <p className="w-[15%]">{role}</p>
            <p className="w-[25%]">{email}</p>
            <p className="w-[15%]">{spent}</p>
            <p className="w-[15%]">{new Date(joined).toDateString()}</p>
        </div>
    )
}