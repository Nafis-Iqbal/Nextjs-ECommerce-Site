/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { PaymentMethod } from "@/types/enums";
import { useSelector } from "react-redux";
import { redirect, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { queryClient } from "@/services/apiInstance";
import { OrderApi, UserApi } from "@/services/api";
import { useGlobalUI } from "@/hooks/state-hooks/globalStateHooks";
import * as cartActions from "@/global-state-context/cartUpdateSlice";

import { HorizontalDivider } from "@/components/custom-elements/UIUtilities"
import TableLayout from "@/components/layout-elements/TableLayout"
import { CustomTextInput, CustomSelectInput } from "@/components/custom-elements/CustomInputElements"
import { AddressManagerModule } from "@/components/modular-components/AddressManagerModule";

export default function CheckoutPage() {
    const cartUpdateState: {
        isOpen: boolean, 
        items: {
            itemId: string;
            productId: string;
            productName: string;
            productPrice: number;
            productQuantity: number;
        }[]
    } = useSelector((state: any) => state.cartUpdatePopUp);

    const router = useRouter();
    const dispatch = useDispatch();
    const {data: session} = useSession();

    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>("CASH_ON_DELIVERY");
    const [selectedAddressId, setSelectedAddressId] = useState<string>("");

    const { data: userDetailData } = UserApi.useGetUserDetailRQ(session?.user.user_id as string, true);

    const {openNotificationPopUpMessage} = useGlobalUI();

    const {mutate: createBuyerOrder} = OrderApi.useCreateBuyerOrderRQ(
        (responseData) => {
            if(responseData.status === "success")
            {
                dispatch(cartActions.clearCart());
                
                queryClient.invalidateQueries({ queryKey: ["cart"] });
                router.push(`/orders/${responseData.data.id}/confirmation`);
            }
            else {
                openNotificationPopUpMessage("Failed to confirm order. An error occured.");
            }
        },
        () => {
            openNotificationPopUpMessage("Failed to confirm order. An error occured.");
        }
    );

    const userDetail = (userDetailData?.data || {}) as User;

    const paymentMethodOptions = Object.values(PaymentMethod).map(method => ({
        value: method,
        label: method.replace("_", " ").toLowerCase().replace(/^\w/, c => c.toUpperCase())
    }));

    const openPaymentForm = () => {

    }

    const confirmBuyerOrder = () => {
        if(selectedAddressId === "") {
            openNotificationPopUpMessage("Please add a shipping address.");
            return;
        }

        if(!session){
            createBuyerOrder({cartItems: cartUpdateState.items.map(item => ({
                product_id: item.productId,
                product_quantity: item.productQuantity
            })), addressId: selectedAddressId});
        }
        else {
            createBuyerOrder({addressId: selectedAddressId});
        }
    }

    const totalCost = cartUpdateState.items.reduce((acc, item) => acc + item.productPrice * item.productQuantity, 0);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLTextAreaElement | HTMLInputElement>) => {
        const {name, value} = e.target;

        setSelectedPaymentMethod(value);
    };

    return (
        <div className="flex flex-col p-2 mt-5">
            <div className="ml-6 flex flex-col items-center text-left space-y-2 border-1 border-green-800 ">
                <h1 className="mt-7">Checkout</h1>

                <HorizontalDivider className="w-[95%] border-green-800"/>

                <div className="flex flex-col w-[60%] font-sans space-y-5">
                    <div className="flex flex-col">
                        {session ? 
                            (<>
                                <p className="text-green-300 text-xl">Name:&nbsp;&nbsp;<span className="text-white">{userDetail.user_name}</span></p>
                                <p className="text-green-300 text-xl">Email:&nbsp;&nbsp;<span className="text-white">{userDetail.email}</span></p>
                            </>) : 
                            (<>
                                <p className="text-green-300 text-xl">Guest User</p>
                            </>)
                        }
                    </div>

                    <AddressManagerModule 
                        userId={userDetail.id} 
                        addressBlockCustomStyle="w-[75%]" 
                        selectOnlyMode={true} 
                        setSelectedAddressId={setSelectedAddressId}
                    />

                    <div className="flex flex-col space-y-2">
                        <p className="text-green-300 text-xl">Items:</p>

                        <TableLayout className="">
                            <div className="flex p-2 w-full border-b-1 border-green-900 hover:bg-gray-600 text-center">
                                <p className="w-[5%] text-green-200">Sr No.</p>
                                <p className="w-[45%] text-green-200">Product Name</p>
                                <p className="w-[20%] text-green-200">Price</p>
                                <p className="w-[10%] text-green-200">Quantity</p>
                                <p className="w-[20%] text-green-200">Total</p>
                            </div>

                            {
                                cartUpdateState.items.map((item, index) => (
                                    <CartItemListRow 
                                        key={item.itemId}
                                        Sr={index + 1}
                                        productName={item.productName || "Unknown Product"} 
                                        quantity={item.productQuantity} 
                                        price={item.productPrice} 
                                    />
                                ))
                            }

                            <div className="flex flex-col w-[40%] self-end mr-3">
                                <div className="flex justify-between">
                                    <p className="text-green-200">Items Total:</p>
                                    <p className="w-[45%] text-center">{totalCost}</p>
                                </div>

                                <div className="flex justify-between">
                                    <p className="text-green-200">Shipping Cost::</p>
                                    <p className="w-[45%] text-center">0</p>
                                </div>

                                <div className="flex justify-between">
                                    <p className="text-green-200">Grand Total:</p>
                                    <p className="w-[45%] text-center">{totalCost}</p>
                                </div>
                            </div>
                        </TableLayout>
                    </div>
                    
                    <div className="flex flex-col space-y-2">
                        <p className="text-green-300">Apply Coupons:</p>

                        <div className="flex space-x-5">
                            <CustomTextInput></CustomTextInput>

                            <button className="px-2 py-1 bg-green-600 hover:bg-green-500 rounded-sm">Apply Coupon</button>
                        </div>
                    </div>
                    
                    <div className="flex flex-col space-y-2">
                        <p className="text-green-300">Payment Method:</p>

                        <div className="flex space-x-5">
                            <CustomSelectInput 
                                className="border-2 border-green-500 bg-gray-600"
                                options={paymentMethodOptions}
                                onChange={handleChange}
                                value={selectedPaymentMethod}
                            >
                                Choose Another
                            </CustomSelectInput>
                        </div>

                        <p>Badges & stuff</p>
                    </div>

                    <HorizontalDivider/>

                    <div className="flex justify-between items-center mb-10">
                        <div className="flex space-x-5">
                            <input className="w-6 h-6" type="checkbox"></input>
                            <p className="">Terms & Conditions box</p>
                        </div>

                        <button 
                            className="px-2 py-1 bg-green-600 hover:bg-green-500 rounded-sm" 
                            onClick={selectedPaymentMethod === "CASH_ON_DELIVERY" ? confirmBuyerOrder : openPaymentForm}
                        >
                            {selectedPaymentMethod === "CASH_ON_DELIVERY" ? "Confirm Order" : "Proceed to Payment"}
                        </button>
                    </div>  
                </div>
            </div>
        </div>
    )
}

const CartItemListRow = ({Sr, productName, quantity, price} : {Sr: number, productName: string, quantity: number, price: number}) => {
    return (
        <div className="flex p-2 w-full border-b-1 border-green-900 text-center">
            <p className="w-[5%]">{Sr}</p>
            <p className="w-[45%]">{productName}</p>
            <p className="w-[20%]">{price}</p>
            <p className="w-[10%]">{quantity}</p>
            <p className="w-[20%]">{quantity * price}</p>
        </div>
    )
}