/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CartApi } from "@/services/api"
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { queryClient } from "@/services/apiInstance";
import * as cartActions from "@/global-state-context/cartUpdateSlice";

import TableLayout from "@/components/layout-elements/TableLayout"
import DivGap, { HorizontalDivider } from "@/components/custom-elements/UIUtilities"
import { CustomTextInput } from "@/components/custom-elements/CustomInputElements"
import ConfirmationModal from "@/components/modals/ConfirmationModal";
import { useGlobalUI } from "@/hooks/state-hooks/globalStateHooks";

export default function CartPage() {
    const router = useRouter();
    const dispatch = useDispatch();
    const {data: session} = useSession();

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

    const [isCartClearConfirmationVisible, setCartClearConfirmationVisible] = useState(false);
    const { openNotificationPopUpMessage } = useGlobalUI();

    const { data: cartData, isLoading: isCartLoading, isError: isCartError } = CartApi.useGetCartItemsRQ(true);
    
    const { mutate: clearCartItemList } = CartApi.useClearCartItemListRQ(
        (responseData) => {
            if(responseData.status === "success")
            {
                dispatch(cartActions.clearCart());
                openNotificationPopUpMessage("Cart cleared successfully.");
                
                queryClient.invalidateQueries({ queryKey: ["cart"] });
            }
            else {
                openNotificationPopUpMessage("Failed to clear cart.");
            }
        },
        () => {
            openNotificationPopUpMessage("Failed to clear cart.");
        }
    );

    const totalCost = session
        ? cartData?.data?.reduce((acc, item) => acc + (item.product?.price || 0) * item.product_quantity, 0) ?? 0
        : cartUpdateState.items.reduce((acc, item) => acc + item.productPrice * item.productQuantity, 0);
    
    const isCartEmpty = !session
        ? cartUpdateState.items.length === 0
        : !Array.isArray(cartData?.data) || cartData.data.length === 0;

    const onClearCart = () => {
        setCartClearConfirmationVisible(true);
    };

    const onClearCartConfirmed = () => {
        if(session) {
            clearCartItemList();
        }
        else {
            dispatch(cartActions.clearCart());
            openNotificationPopUpMessage("Cart cleared successfully.");
        }

        setCartClearConfirmationVisible(false);
    }

    return (
        <div className="flex flex-col p-2 mt-5">
            <div className="ml-6 flex flex-col space-y-2 border-1 border-green-800 ">
                <div className="flex flex-col items-center text-left">
                    <h1 className="mt-7 font-satisfy">Cart</h1>

                    <ConfirmationModal 
                        isVisible={isCartClearConfirmationVisible}
                        message="Are you sure you want to clear the cart?"
                        onConfirm={() => onClearCartConfirmed()} 
                        onCancel={() => setCartClearConfirmationVisible(false)} 
                    />

                    <HorizontalDivider className="w-[95%] border-green-800"/>
                    {
                        isCartEmpty ? 
                        (
                            <div className="flex flex-col items-center justify-center p-8 w-full max-w-md mx-auto my-12 
                                border border-green-800 bg-gray-700 rounded-sm font-sans">
                                <h2 className="text-3xl font-semibold text-green-400 mb-4">Your Cart is Empty</h2>
                                <p className="text-green-200 mb-6 text-center">
                                    Looks like you haven't added any products to your cart yet.
                                </p>
                                <button
                                    type="button"
                                    onClick={() => router.push('/products')}
                                    className="px-6 py-2 bg-green-600 hover:bg-green-500 rounded-xs text-white text-lg transition"
                                    aria-label="Browse Products"
                                >
                                    Browse Products
                                </button>
                            </div>
                        ) : 
                        (
                            <div className="flex flex-col font-sans space-y-2 w-[85%]">
                                <h4 className="text-green-300">Ordered Items</h4>
                                <TableLayout className="">
                                    <div className="flex p-2 w-full border-b-1 border-green-900 hover:bg-gray-600 text-center">
                                        <p className="w-[5%] text-green-200">Sr No.</p>
                                        <p className="w-[60%] text-green-200">Product Name</p>
                                        <p className="w-[15%] text-green-200">Price</p>
                                        <p className="w-[5%] text-green-200">Quantity</p>
                                        <p className="w-[15%] text-green-200">Total</p>
                                    </div>

                                    {
                                        session ? (
                                            cartData?.data?.map((item, index) => (
                                                <OrderItemListRow 
                                                    key={item.id} 
                                                    id={index + 1} 
                                                    productName={item.product?.title || "Unknown Product"} 
                                                    quantity={item.product_quantity} 
                                                    price={item.product?.price || 0} 
                                                />
                                            ))
                                        ) : (
                                            cartUpdateState.items.map((item, index) => (
                                                <OrderItemListRow 
                                                    key={item.itemId} 
                                                    id={index + 1} 
                                                    productName={item.productName || "Unknown Product"} 
                                                    quantity={item.productQuantity} 
                                                    price={item.productPrice} 
                                                />
                                            ))
                                        )
                                    }

                                    <DivGap customHeightGap="h-[15px]"/>

                                    <div className="flex flex-col w-[30%] self-end mr-3">
                                        <div className="flex justify-between">
                                            <p className="text-green-200">Items Total:</p>
                                            <p>{totalCost}</p>
                                        </div>

                                        <div className="flex justify-between">
                                            <p className="text-green-200">Shipping Cost::</p>
                                            <p>0</p>
                                        </div>

                                        <div className="flex justify-between">
                                            <p className="text-green-200">Grand Total:</p>
                                            <p>{totalCost}</p>
                                        </div>
                                    </div>
                                </TableLayout>

                                <div className="flex flex-col space-y-2">
                                    <h4 className="text-green-300">Apply Coupons</h4>

                                    <div className="flex space-x-3 w-[100%]">
                                        <div className="flex space-x-2 w-[50%]">
                                            <CustomTextInput className="flex-grow"></CustomTextInput>
                                            <button className="px-2 py-1 bg-green-600 hover:bg-green-500 rounded-xs text-sm">Apply Coupon</button>
                                        </div>

                                        <div className="flex space-x-2 w-[50%]">
                                            <CustomTextInput className="flex-grow"></CustomTextInput>
                                            <button className="px-2 py-1 bg-green-600 hover:bg-green-500 rounded-xs text-sm">Apply Vouchers</button>    
                                        </div>
                                    </div>
                                </div>

                                <HorizontalDivider className="my-7 border-green-800"/>

                                <div className="flex justify-between mb-10">
                                    <div className="flex space-x-2">
                                        <button className="px-2 py-1 bg-green-600 hover:bg-green-500 rounded-xs" onClick={() => {router.push("/");}}>Continue Shopping</button> 

                                        <button 
                                            className="px-2 py-1 bg-red-600 hover:bg-red-500 hover:shadow-red-500 hover:shadow-sm rounded-xs"
                                            onClick={onClearCart}
                                        >
                                            Clear Cart
                                        </button> 
                                    </div>
                                    
                                    <button className="px-2 py-1 bg-green-600 hover:bg-green-500 rounded-xs" onClick={() => {router.push("/checkout");}}>Confirm Order</button>  
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

const OrderItemListRow = ({id, productName, quantity, price} : {id: number, productName: string, quantity: number, price: number}) => {
    return (
        <div className="flex p-2 w-full border-b-1 border-green-900 hover:bg-gray-600 text-center">
            <p className="w-[5%]">{id}</p>
            <p className="w-[60%]">{productName}</p>
            <p className="w-[15%]">{price}</p>
            <p className="w-[5%]">{quantity}</p>
            <p className="w-[15%]">{quantity * price}</p>
        </div>
    )
}