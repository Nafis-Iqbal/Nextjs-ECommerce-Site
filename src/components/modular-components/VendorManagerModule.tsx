/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react"
import { UserStatus } from "@/types/enums"
import { UserApi } from "@/services/api"
import { queryClient } from "@/services/apiInstance"
import { filterVendorsSchema } from "@/validators/userValidators"

import TableLayout from "../layout-elements/TableLayout"
import FilterSectionLayout from "../layout-elements/FilterSectionLayout"
import { CustomSelectInput } from "../custom-elements/CustomInputElements"
import { CustomTextInput } from "../custom-elements/CustomInputElements"
import { HorizontalDivider } from "../custom-elements/UIUtilities"
import { NoContentTableRow } from "../placeholder-components/NoContentTableRow"

type VendorFilter = {
    user_status: UserStatus;
    user_name: string;
    email: string;
    city: string;
    minimum_earned: number;
    minimum_order_count: number;
}

const defaultFilterValues: VendorFilter = {
    user_status: UserStatus.ACTIVE,
    user_name: '',
    email: '',
    city: '',
    minimum_earned: 0,
    minimum_order_count: 0
}

export const VendorManagerModule = () => {
    const [filters, setFilters] = useState<Partial<VendorFilter>>(defaultFilterValues);
    const [errors, setErrors] = useState<Record<string, string | undefined>>({});
    const [queryString, setQueryString] = useState<string>("role=ADMIN");
    const {data: vendorsList, isLoading: isFetchLoading, isError: isFetchError, refetch: refetchUserData} = UserApi.useGetUsersRQ(queryString);

    useEffect(() => {
        refetchUserData();
    }, [queryString]);

    useEffect(() => {
        setFilters(defaultFilterValues);
    }, [])

    const userStatusOptions = Object.values(UserStatus).map(status => ({
        value: status,
        label: status.replace("_", " ").toLowerCase().replace(/^\w/, c => c.toUpperCase())
    }));

    const onSubmitFilterVendorSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        const query = buildUserQueryString(filters);
        queryClient.invalidateQueries({queryKey: ["users"]});

        setQueryString(query);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        const numericFields = new Set(["minimum_earned", "minimum_order_count"]);

        let parsedValue: string | number | undefined;

        if (numericFields.has(name)) {
            const noLeadingZeros = value.replace(/^0+(?=\d)/, '');

            parsedValue = noLeadingZeros === '' ? undefined : Number(noLeadingZeros);
        } else {
            parsedValue = value || undefined;
        }

        setFilters((prev) => ({
            ...prev,
            [name]: parsedValue
        }));

        const updatedData = { ...filters, [name]: parsedValue };
        
        const result = filterVendorsSchema.safeParse(updatedData);
        if (!result.success) {
            const key = name as keyof typeof result.error.formErrors.fieldErrors;
            const fieldError = result.error.formErrors.fieldErrors[key]?.[0];

            setErrors((prev) => ({ ...prev, [name]: fieldError }));
        } else {
            setErrors((prev) => ({ ...prev, [name]: undefined }));
        }
    };

    return (
        <section className="flex flex-col" id="dashboard_vendors">
            <div className="flex space-x-5 mb-2">
                <h4 className="">Vendors</h4>
                <button className="text-sm px-1 mt-1 bg-green-700 hover:bg-green-600 rounded-md self-center">View All</button>
            </div>
            <TableLayout className="mr-5">
                <div className="flex border-1 border-green-800 p-2 bg-gray-600 text-center">
                    <p className="w-[5%]">Sr. No.</p>
                    <p className="w-[30%]">Vendor Name</p>
                    <p className="w-[30%]">Email</p>
                    <p className="w-[20%]">Earned</p>
                    <p className="w-[15%]">Joined</p>
                </div>
                <div className="flex flex-col border-1 border-green-800">
                    {
                        isFetchLoading ? (<NoContentTableRow displayMessage="Loading Data" tdColSpan={1}/>) :
                        isFetchError ? (<NoContentTableRow displayMessage="An error occurred" tdColSpan={1}/>) :

                        (vendorsList?.data && Array.isArray(vendorsList?.data) && vendorsList?.data.length <= 0) ? (<NoContentTableRow displayMessage="No vendors found" tdColSpan={1}/>) :
                        (Array.isArray(vendorsList?.data) && 
                            vendorsList?.data?.map((vendor, index) => (
                                <VendorListTableRow 
                                    key={vendor.id} 
                                    id={index + 1} 
                                    user_name={vendor.user_name} 
                                    email={vendor.email} 
                                    earned={5000} 
                                    created={vendor.emailVerified ?? new Date(2025, 0, 31)}
                                />
                            ))
                        )   
                    }
                </div>
            </TableLayout>

            <FilterSectionLayout className="mr-5" onSubmit={onSubmitFilterVendorSearch}>
                <div className="flex justify-left space-x-15">                   
                    <CustomSelectInput
                        label="Vendor Status"
                        name="user_status"
                        options={userStatusOptions}
                        value={filters?.user_status}
                        onChange={handleChange}
                        className="bg-gray-600"
                        error={errors.user_status}
                    />
                </div>

                <div className="flex justify-left space-x-6">
                    <CustomTextInput
                        label="Vendor Name"
                        placeholderText="Enter user name"
                        name="user_name"
                        value={filters?.user_name || ''}
                        onChange={handleChange}
                        error={errors.user_name}
                    />

                    <CustomTextInput
                        label="Email"
                        placeholderText="Enter user email"
                        name="email"
                        value={filters?.email || ''}
                        onChange={handleChange}
                        error={errors.email}
                    />
                </div>

                <div className="flex justify-left space-x-6">
                    <CustomTextInput
                        label="City"
                        placeholderText="Enter City"
                        name="city"
                        value={filters?.city || ''}
                        onChange={handleChange}
                        error={errors.city}
                    />

                    <CustomTextInput
                        label="Minimum Earned"
                        placeholderText="Enter minimum earned"
                        type="number"
                        name="minimum_earned"
                        value={filters?.minimum_earned || ''}
                        onChange={handleChange}
                        error={errors.minimum_spent}
                    />

                    <CustomTextInput
                        label="Minimum Order Count"
                        placeholderText="Enter minimum Orders completed"
                        type="number"
                        name="minimum_order_count"
                        value={filters?.minimum_order_count || ''}
                        onChange={handleChange}
                        error={errors.minimum_order_count}
                    />

                    <button 
                        className="flex self-end items-center p-2 ml-10 h-[60%] bg-green-700 hover:bg-green-600 text-white text-lg rounded-sm"
                        type="submit"
                    >
                        Filter Vendors
                    </button>

                    <button className="flex self-end items-center p-2 ml-10 h-[60%] bg-green-700 hover:bg-green-600text-white text-lg rounded-sm" 
                        type="button" onClick={() => {setFilters(defaultFilterValues); setErrors({})}}
                    >
                        Reset Filters
                    </button>
                </div>
            </FilterSectionLayout>

            <HorizontalDivider className="mr-5 my-10"/>
        </section>
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
            <p className="w-[20%]">{earned}</p>
            <p className="w-[15%]">{new Date(created).toDateString()}</p>
        </div>
    )
}

export function buildUserQueryString(filters: Partial<VendorFilter> | undefined | null) {
    if(!filters){
        return "role=ADMIN";
    }
    else{
        const params = new URLSearchParams();
        params.append("role", "ADMIN");

        Object.entries(filters).forEach(([key, value]) => {
            if (
            typeof value === "string" ||
            typeof value === "number"
            ) {
            if (value !== "") {
                params.append(key, String(value));
            }
            }
        });

        return params.toString();
    }
}