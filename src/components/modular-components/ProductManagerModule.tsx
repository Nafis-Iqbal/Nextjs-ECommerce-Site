import { ProductStatus } from "@/types/enums"
import { UserApi } from "@/services/api"

import TableLayout from "../layout-elements/TableLayout"
import FilterSectionLayout from "../layout-elements/FilterSectionLayout"
import CustomSelect from "../custom-elements/CustomInputElements"
import { CustomTextInput } from "../custom-elements/CustomInputElements"
import { HorizontalDivider } from "../custom-elements/UIUtilities"

export const ProductManagerModule = () => {
    const {data: usersList, isSuccess: isUsersSuccess, isError: isUsersError} = UserApi.useGetUsersRQ();

    const productStatusOptions = Object.values(ProductStatus).map(status => ({
        value: status,
        label: status.replace("_", " ").toLowerCase().replace(/^\w/, c => c.toUpperCase())
    }));

    const filterByUserRole = (role: string) => {

    }

    return (
        <div className="flex flex-col">
            <div className="flex space-x-5 mb-2">
                <h4 className="">All Vendor Products</h4>
                <button className="text-sm px-1 mt-1 bg-green-700 hover:bg-green-600 rounded-md self-center">View All</button>
            </div>
            <TableLayout className="mr-5">
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

