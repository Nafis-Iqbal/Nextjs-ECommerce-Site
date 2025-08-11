import { ComplaintStatus } from "@/types/enums"

import TableLayout from "../layout-elements/TableLayout"
import FilterSectionLayout from "../layout-elements/FilterSectionLayout"
import { CustomSelectInput, CustomTextInput} from "../custom-elements/CustomInputElements"
import { HorizontalDivider } from "../custom-elements/UIUtilities"

export const ComplaintManagerModule = () => {
    const complaintStatusOptions = Object.values(ComplaintStatus).map(status => ({
        value: status,
        label: status.replace("_", " ").toLowerCase().replace(/^\w/, c => c.toUpperCase())
    }));

    const filterByOrderStatus = () => {

    }

    return (
        <section className="flex flex-col" id="dashboard_complaints">
            <div className="flex space-x-5 mb-2">
                <h4 className="">Consumer Complaints</h4>
                <button className="text-sm px-1 mt-1 bg-red-400 rounded-md self-center">Feature Not Ready</button>
            </div>
            <TableLayout className="mr-5">
                <div className="flex border-1 border-green-800 p-2 bg-gray-600 text-center">
                    <p className="w-[5%]">Sr. No.</p>
                    <p className="w-[10%]">Product ID</p>
                    <p className="w-[45%]">Complaint Subject</p>
                    <p className="w-[25%]">Complained by</p>
                    <p className="w-[15%]">Complaint Status</p>
                </div>
                <div className="flex flex-col border-1 border-green-800">
                    <ComplaintListTableRow id={1} product_id={"1"} complaintSubject="laptop" complainingUserName="Nafis" complaintStatus={ComplaintStatus.PENDING}/>
                    <ComplaintListTableRow id={1} product_id={"1"} complaintSubject="laptop" complainingUserName="Nafis" complaintStatus={ComplaintStatus.PENDING}/>
                    <ComplaintListTableRow id={1} product_id={"1"} complaintSubject="laptop" complainingUserName="Nafis" complaintStatus={ComplaintStatus.PENDING}/>
                </div>
            </TableLayout>

            <FilterSectionLayout className="mr-5" onSubmit={filterByOrderStatus}>
                <div className="flex justify-left space-x-6">
                    <div className="flex flex-col space-y-1">
                        <label>Complaint Status</label>
                        <CustomSelectInput
                            options={complaintStatusOptions}
                            value="Active"
                            onChange={() => filterByOrderStatus()}
                            className="bg-gray-600"
                            disabled
                        />
                    </div>

                    <div className="flex flex-col space-y-1">
                        <label>Product ID</label>
                        <CustomTextInput disabled placeholderText="Enter product ID"/>
                    </div>
                </div>
            </FilterSectionLayout>

            <HorizontalDivider className="mr-5 my-10"/>
        </section>
    )
}

const ComplaintListTableRow = ({
    id, product_id, complaintSubject, complainingUserName, complaintStatus, mode = ""
} : {
    id: number, product_id: string, complaintSubject: string, complainingUserName: string, complaintStatus: ComplaintStatus, mode?: string
}) => {
    return (
        <div className="pointer-events-none flex p-2 w-full border-b-1 border-green-900 hover:bg-gray-600 text-center">
            <p className="w-[5%]">{id}</p>
            <p className="w-[10%]">{product_id}</p>
            <p className="w-[45%]">{complaintSubject}</p>
            <p className="w-[25%]">{complainingUserName}</p>
            <p className="w-[15%]">{complaintStatus}</p>
        </div>
    )
}

