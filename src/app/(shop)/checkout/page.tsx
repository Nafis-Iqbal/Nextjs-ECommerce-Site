/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { PaymentMethod } from "@/types/enums";
import { useSelector } from "react-redux";
import { redirect, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { OrderApi } from "@/services/api";
import { useGlobalUI } from "@/hooks/state-hooks/globalStateHooks";
import * as cartActions from "@/global-state-context/cartUpdateSlice";

import { HorizontalDivider } from "@/components/custom-elements/UIUtilities"
import TableLayout from "@/components/layout-elements/TableLayout"
import { CustomTextInput, CustomSelectInput } from "@/components/custom-elements/CustomInputElements"
import { queryClient } from "@/services/apiInstance";
import { UserInfoModule } from "@/components/modular-components/UserInfoModule";

const defaultUserAddress: Address = {
    id: "",
    addressLine1: "Default Address Line1",
    addressLine2: "Default Address Line2",
    city: "Dhaka",
    state: "Dhaka",
    postalCode: "2100",
    country: "Bangladesh",
    phoneNumber: "019XXXXXXXX",
    user_id: "ggiffy"
}

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

    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>("");
    const [userAddress, setUserAddress] = useState<Address>(defaultUserAddress);

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

    const paymentMethodOptions = Object.values(PaymentMethod).map(method => ({
        value: method,
        label: method.replace("_", " ").toLowerCase().replace(/^\w/, c => c.toUpperCase())
    }));

    const openPaymentForm = () => {

    }

    const confirmBuyerOrder = () => {
        if(!session){
            createBuyerOrder({cartItems: cartUpdateState.items.map(item => ({
                product_id: item.productId,
                product_quantity: item.productQuantity
            })), address: userAddress});
        }
        else {
            createBuyerOrder({address: userAddress});
        }
    }

    const totalCost = cartUpdateState.items.reduce((acc, item) => acc + item.productPrice * item.productQuantity, 0);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLTextAreaElement | HTMLInputElement>) => {
        const {name, value} = e.target;

        setSelectedPaymentMethod(value);
    };

    //if(cartUpdateState.items.length === 0) redirect("/cart");

    return (
        <div className="flex flex-col p-2 mt-5">
            <div className="ml-6 flex flex-col items-center text-left space-y-2 border-1 border-green-800 ">
                <h1 className="mt-7">Checkout</h1>

                <HorizontalDivider className="w-[95%] border-green-800"/>

                <div className="flex flex-col w-[60%] font-sans space-y-5">
                    <UserInfoModule/>
                    
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
                        
                        {
                            (selectedPaymentMethod === "CASH_ON_DELIVERY") ? (
                                <button 
                                    className="px-2 py-1 bg-green-600 hover:bg-green-500 rounded-sm"
                                    onClick={openPaymentForm}
                                >
                                    Proceed to Payment
                                </button>
                            ) : ( 
                                <button 
                                    className="px-2 py-1 bg-green-600 hover:bg-green-500 rounded-sm" 
                                    onClick={confirmBuyerOrder}
                                >
                                    Confirm Order
                                </button>
                            )
                        }
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