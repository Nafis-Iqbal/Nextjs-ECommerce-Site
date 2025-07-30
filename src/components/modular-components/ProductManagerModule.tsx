/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react"
import { ProductStatus } from "@/types/enums"
import { ProductApi } from "@/services/api"
import { queryClient } from "@/services/apiInstance"
import { filterProductsSchema } from "@/validators/productValidators"

import TableLayout from "../layout-elements/TableLayout"
import FilterSectionLayout from "../layout-elements/FilterSectionLayout"
import { CustomSelectInput } from "../custom-elements/CustomInputElements"
import { CustomTextInput } from "../custom-elements/CustomInputElements"
import { HorizontalDivider } from "../custom-elements/UIUtilities"
import { NoContentTableRow } from "../placeholder-components/NoContentTableRow"

type ProductFilter = {
    productStatus: ProductStatus;
    vendor_name: string;
    minimum_earned: number;
    minimum_units_sold: number;
    minimum_rating: number;
}

const defaultFilterValues: ProductFilter = {
    productStatus: ProductStatus.IN_STOCK,
    vendor_name: '',
    minimum_earned: 0,
    minimum_units_sold: 0,
    minimum_rating: 0
}

export const ProductManagerModule = () => {
    const [filters, setFilters] = useState<Partial<ProductFilter>>();
    const [errors, setErrors] = useState<Record<string, string | undefined>>({});
    const [queryString, setQueryString] = useState<string>("");
    const {data: productsList, isLoading: isFetchLoading, isError: isFetchError, refetch: refetchProductData} = ProductApi.useGetProductsRQ(queryString);

    useEffect(() => {
        refetchProductData();
    }, [queryString]);

    useEffect(() => {
        setFilters(defaultFilterValues);
    }, [])

    const productStatusOptions = Object.values(ProductStatus).map(status => ({
        value: status,
        label: status.replace("_", " ").toLowerCase().replace(/^\w/, c => c.toUpperCase())
    }));

    const onSubmitFilterProductSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        const query = buildProductQueryString(filters);
        queryClient.invalidateQueries({queryKey: ["products"]});

        setQueryString(query);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        const numericFields = new Set(["minimum_earned", "units_sold", "minimum_rating"]);

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
        
        const result = filterProductsSchema.safeParse(updatedData);
        if (!result.success) {
            const key = name as keyof typeof result.error.formErrors.fieldErrors;
            const fieldError = result.error.formErrors.fieldErrors[key]?.[0];

            setErrors((prev) => ({ ...prev, [name]: fieldError }));
        } else {
            setErrors((prev) => ({ ...prev, [name]: undefined }));
        }
    };

    return (
        <div className="flex flex-col">
            <div className="flex space-x-5 mb-2">
                <h4 className="">All Vendor Products</h4>
                <button className="text-sm px-1 mt-1 bg-green-700 hover:bg-green-600 rounded-md self-center">View All</button>
            </div>
            <TableLayout className="mr-5">
                <div className="flex border-1 border-green-800 p-2 bg-gray-600 text-center">
                    <p className="w-[5%]">Sr. No.</p>
                    <p className="w-[30%]">Product Name</p>
                    <p className="w-[20%]">Owner</p>
                    <p className="w-[10%]">Rating</p>
                    <p className="w-[10%]">Reviews</p>
                    <p className="w-[10%]">Total Units Sold</p>
                    <p className="w-[15%]">Total Earned</p>
                </div>
                <div className="flex flex-col border-1 border-green-800">
                    {
                        isFetchLoading ? (<NoContentTableRow displayMessage="Loading Data" tdColSpan={1}/>) :
                        isFetchError ? (<NoContentTableRow displayMessage="An error occurred" tdColSpan={1}/>) :

                        (productsList?.data && productsList?.data.length <= 0) ? (<NoContentTableRow displayMessage="No products found" tdColSpan={1}/>) :

                        productsList?.data?.map((product: Product, index: number) => (
                            <ProductListTableRow 
                                key={product.id} 
                                id={index + 1} 
                                product_name={product.title || ''} 
                                owner_name={product.user?.user_name || 'Unknown'}
                                rating={product.rating || 0} 
                                review_count={6} 
                                units_sold={product.unitsSold || 0} 
                                total_earned={product.earned || 0}
                            />
                        ))
                    }
                </div>
            </TableLayout>

            <FilterSectionLayout className="mr-5" onSubmit={onSubmitFilterProductSearch}>
                <div className="flex justify-left space-x-15">                   
                    <CustomSelectInput
                        label="Product Status"
                        name="productStatus"
                        options={productStatusOptions}
                        value={filters?.productStatus}
                        onChange={handleChange}
                        className="bg-gray-600"
                        error={errors.productStatus}
                    />
                </div>

                <div className="flex justify-left space-x-6">
                    <CustomTextInput
                        label="Vendor Name"
                        placeholderText="Enter Vendor name"
                        name="vendor_name"
                        value={filters?.vendor_name || ''}
                        onChange={handleChange}
                        error={errors.vendor_name}
                    />
                </div>

                <div className="flex justify-left space-x-6">
                    <CustomTextInput
                        label="Minimum Earned"
                        placeholderText="Enter minimum earned"
                        type="number"
                        name="minimum_earned"
                        value={filters?.minimum_earned || ''}
                        onChange={handleChange}
                        error={errors.minimum_earned}
                    />

                    <CustomTextInput
                        label="Minimum Units Sold"
                        placeholderText="Enter minimum units sold"
                        type="number"
                        name="minimum_units_sold"
                        value={filters?.minimum_units_sold || ''}
                        onChange={handleChange}
                        error={errors.units_sold}
                    />

                    <CustomTextInput
                        label="Minimum Rating"
                        placeholderText="Enter minimum rating"
                        type="number"
                        name="minimum_rating"
                        value={filters?.minimum_rating || ''}
                        onChange={handleChange}
                        error={errors.minimum_rating}
                    />

                    <button 
                        className="flex self-end items-center p-2 ml-10 h-[60%] bg-green-700 hover:bg-green-600 text-white text-lg rounded-sm"
                        type="submit"
                    >
                        Filter Products
                    </button>

                    <button className="flex self-end items-center p-2 ml-10 h-[60%] bg-green-700 hover:bg-green-600 text-white text-lg rounded-sm" 
                        type="button" onClick={() => {setFilters(defaultFilterValues); setErrors({}); setQueryString("")}}
                    >
                        Reset Filters
                    </button>
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
            <p className="w-[30%]">{product_name}</p>
            <p className="w-[20%]">{owner_name}</p>
            <p className="w-[10%]">{rating}</p>
            <p className="w-[10%]">{review_count}</p>
            <p className="w-[10%]">{units_sold}</p>
            <p className="w-[15%]">{total_earned}</p>
        </div>
    )
}

export function buildProductQueryString(filters: Partial<ProductFilter> | undefined | null) {
    if(!filters){
        return "";
    }
    else{
        const params = new URLSearchParams();

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

