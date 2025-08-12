/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { OrderStatus } from "@/types/enums";
import { queryClient } from "@/services/apiInstance";
import { useGetSellerOrdersRQ } from "@/services/api/sellerOrderApi";
import { filterSellerOrdersSchema } from "@/validators/orderValidators";

import TableLayout from "../layout-elements/TableLayout";
import FilterSectionLayout from "../layout-elements/FilterSectionLayout";
import { CustomSelectInput, CustomTextInput } from "../custom-elements/CustomInputElements";
import { HorizontalDivider } from "../custom-elements/UIUtilities";
import { NoContentTableRow } from "../placeholder-components/NoContentTableRow";
import { useRouter } from "next/navigation";

// Filter type
type SellerOrderFilter = {
    orderStatus: OrderStatus;
    orderBuyerName: string;
    orderBuyer_id: string;
    minimum_total_amount: number;
};

const defaultFilterValues: SellerOrderFilter = {
    orderStatus: OrderStatus.PENDING,
    orderBuyerName: "",
    orderBuyer_id: "",
    minimum_total_amount: 0,
};

export const SellerOrderManagerModule = ({ className }: { className?: string }) => {
    const router = useRouter();
    const [filters, setFilters] = useState<SellerOrderFilter>(defaultFilterValues);
    const [errors, setErrors] = useState<Record<string, string | undefined>>({});
    const [queryString, setQueryString] = useState<string>('self=true');
    const { data: sellerOrdersList, isLoading: isFetchLoading, isError: isFetchError, refetch: refetchSellerOrderData } = useGetSellerOrdersRQ(queryString);

    useEffect(() => {
        refetchSellerOrderData();
    }, [queryString]);

    useEffect(() => {
        setFilters(defaultFilterValues);
    }, []);

    const orderStatusOptions = [
        { value: "", label: "All" },
        ...Object.values(OrderStatus).map((status) => ({
            value: status,
            label: status.replace("_", " ").toLowerCase().replace(/^\w/, (c) => c.toUpperCase()),
        })),
    ];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        const numericFields = new Set(["minimum_total_amount", "orderBuyer_id"]);

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
        
        const result = filterSellerOrdersSchema.safeParse(updatedData);
        if (!result.success) {
            const key = name as keyof typeof result.error.formErrors.fieldErrors;
            const fieldError = result.error.formErrors.fieldErrors[key]?.[0];

            setErrors((prev) => ({ ...prev, [name]: fieldError }));
        } else {
            setErrors((prev) => ({ ...prev, [name]: undefined }));
        }
    };

    const onSubmitFilterSellerOrderSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const query = buildSellerOrderQueryString(filters);
        queryClient.invalidateQueries({ queryKey: ["sellerOrders"] });
        setQueryString(query);
    };

    const onResetFilters = () => {
        setFilters(defaultFilterValues);
        setErrors({});
        setQueryString("");
    };

    return (
        <section className={`flex flex-col${className ? ` ${className}` : ""}`} id="dashboard_seller_orders">
            <div className="flex space-x-5 mb-2">
                <h4 className="">Sell Orders</h4>
                <button className="text-sm px-1 mt-1 bg-green-700 hover:bg-green-600 rounded-md self-center">View All</button>
            </div>

            <TableLayout className="mr-5">
                <div className="flex border-1 border-green-800 p-2 bg-gray-600 text-center">
                    <p className="w-[5%]">Sr. No.</p>
                    <p className="w-[30%]">Seller Order ID</p>
                    <p className="w-[25%]">Order Buyer</p>
                    <p className="w-[20%]">Total Amount</p>
                    <p className="w-[20%]">Order Status</p>
                </div>
                <div className="flex flex-col border-1 border-green-800">
                    {
                        isFetchLoading ? (
                            <NoContentTableRow displayMessage="Loading Data" tdColSpan={1} />
                        ) : isFetchError ? (
                            <NoContentTableRow displayMessage="An error occurred" tdColSpan={1} />
                        ) : (sellerOrdersList?.data && Array.isArray(sellerOrdersList.data) && sellerOrdersList.data.length <= 0) ? (
                            <NoContentTableRow displayMessage="No orders found" tdColSpan={1} />
                        ) : (Array.isArray(sellerOrdersList?.data) &&
                            sellerOrdersList?.data?.map((seller_order, index) => (
                                <SellerOrderListTableRow
                                    key={seller_order.id}
                                    id={index + 1}
                                    seller_order_id={seller_order.id}
                                    orderUserName={seller_order.buyer?.user_name || "Unknown"}
                                    totalAmount={seller_order.totalAmount || 0}
                                    orderStatus={seller_order.orderStatus}
                                    onClick={() => {router.push(`/seller-orders/${seller_order.id}`)}}
                                />
                            ))
                        )
                    }
                </div>
            </TableLayout>

            <FilterSectionLayout className="mr-5" onSubmit={onSubmitFilterSellerOrderSearch}>
                <div className="flex justify-between space-x-15">
                    <CustomSelectInput
                        label="Order Status"
                        name="orderStatus"
                        options={orderStatusOptions}
                        value={filters.orderStatus}
                        onChange={handleChange}
                        className="bg-gray-600"
                        error={errors.orderStatus}
                    />

                    <button className="flex self-end p-2 h-[60%] bg-green-700 hover:bg-green-600 text-white rounded-sm">
                        Show Completed Order History
                    </button>
                </div>

                <div className="flex justify-left space-x-6">
                    <CustomTextInput
                        type="text"
                        label="Order Buyer Name"
                        placeholderText="Enter buyer name"
                        name="orderBuyerName"
                        value={filters.orderBuyerName}
                        onChange={handleChange}
                        error={errors.orderUserName}
                    />

                    <CustomTextInput
                        type="number"
                        label="Order Buyer ID"
                        placeholderText="Enter Buyer ID"
                        name="orderBuyer_id"
                        value={filters.orderBuyer_id}
                        onChange={handleChange}
                        error={errors.orderUserId}
                    />

                    <CustomTextInput
                        type="number"
                        label="Minimum Total Amount"
                        placeholderText="Enter minimum earned"
                        name="minimum_total_amount"
                        value={filters.minimum_total_amount}
                        onChange={handleChange}
                        error={errors.minimum_total_amount}
                    />

                    <button
                        className="flex self-end items-center p-2 ml-10 h-[60%] bg-green-700 hover:bg-green-600 text-white text-lg rounded-sm"
                        type="submit"
                    >
                        Filter Orders
                    </button>

                    <button
                        className="flex self-end items-center p-2 ml-10 h-[60%] bg-green-700 hover:bg-green-600 text-white text-lg rounded-sm"
                        type="button"
                        onClick={onResetFilters}
                    >
                        Reset Filters
                    </button>
                </div>
            </FilterSectionLayout>

            <HorizontalDivider className="mr-5 my-10" />
        </section>
    );
};

const SellerOrderListTableRow = ({
    id,
    seller_order_id,
    orderUserName,
    totalAmount,
    orderStatus,
    onClick,
}: {
    id: number;
    seller_order_id: string;
    orderUserName: string;
    totalAmount: number;
    orderStatus: string;
    onClick: () => void;
}) => {
    return (
        <div className="flex p-2 w-full border-b-1 border-green-900 hover:bg-gray-600 text-center cursor-pointer" onClick={onClick}>
            <p className="w-[5%]">{id}</p>
            <p className="w-[30%]">{seller_order_id}</p>
            <p className="w-[25%]">{orderUserName}</p>
            <p className="w-[20%]">{totalAmount}</p>
            <p className="w-[20%]">{orderStatus}</p>
        </div>
    );
};

export function buildSellerOrderQueryString(filters: Partial<SellerOrderFilter> | undefined | null) {
    if (!filters) {
        return "";
    }

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