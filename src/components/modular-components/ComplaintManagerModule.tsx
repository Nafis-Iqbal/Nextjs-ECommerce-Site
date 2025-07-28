import { UserStatus, ComplaintStatus, Role } from "@/types/enums"
import { UserApi } from "@/services/api"

import TableLayout from "../layout-elements/TableLayout"
import FilterSectionLayout from "../layout-elements/FilterSectionLayout"
import CustomSelect from "../custom-elements/CustomInputElements"
import { HorizontalDivider } from "../custom-elements/UIUtilities"

export const ComplaintManagerModule = () => {
    const {data: usersList, isSuccess: isUsersSuccess, isError: isUsersError} = UserApi.useGetUsersRQ();

    const userRoleOptions = Object.values(UserStatus).map(role => ({
        value: role,
        label: role.replace("_", " ").toLowerCase().replace(/^\w/, c => c.toUpperCase())
    }));

    const complaintStatusOptions = Object.values(ComplaintStatus).map(status => ({
        value: status,
        label: status.replace("_", " ").toLowerCase().replace(/^\w/, c => c.toUpperCase())
    }));

    const filterByUserRole = (role: string) => {

    }

    return (
        <div className="flex flex-col">
            <div className="flex space-x-5 mb-2">
                <h4 className="">User Complaints</h4>
                <button className="text-sm px-1 mt-1 bg-green-700 hover:bg-green-600 rounded-md self-center">View All</button>
            </div>
            <TableLayout className="mr-5">
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

