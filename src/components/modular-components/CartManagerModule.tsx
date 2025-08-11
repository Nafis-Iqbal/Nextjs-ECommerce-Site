/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useState } from "react"
import { CartApi } from "@/services/api"
import { queryClient } from "@/services/apiInstance"
import { useDispatch } from "react-redux"
import { useGlobalUI } from "@/hooks/state-hooks/globalStateHooks"
import * as cartActions from "@/global-state-context/cartUpdateSlice";

import TableLayout from "../layout-elements/TableLayout"
import { HorizontalDivider } from "../custom-elements/UIUtilities"
import ConfirmationModal from "../modals/ConfirmationModal"

export const CartManagerModule = ({className} : {className?: string}) => {
    const dispatch = useDispatch();

    const [isCartClearConfirmationVisible, setCartClearConfirmationVisible] = useState(false);
    const { openNotificationPopUpMessage } = useGlobalUI();

    const { data: cartItems, isLoading: isFetchLoading } = CartApi.useGetCartItemsRQ(true);

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

    const onClearCartConfirmed = () => {
        clearCartItemList();
        setCartClearConfirmationVisible(false);
    }

    const isCartEmpty = !Array.isArray(cartItems?.data) || cartItems.data.length === 0;

    return (
        <section className={`flex flex-col ${className}`} id="dashboard_cart">
            <ConfirmationModal 
                onConfirm={onClearCartConfirmed} 
                message="Are you sure you want to clear the cart?"
                isVisible={isCartClearConfirmationVisible} 
                onCancel={() => setCartClearConfirmationVisible(false)} 
            />

            <h4 className="mb-2">Your Cart</h4>
            <TableLayout className="mr-5">
                <div className="flex border-1 border-green-800 p-2 bg-gray-600 text-center">
                    <p className="w-[5%]">Sr. No.</p>
                    <p className="w-[40%]">Item</p>
                    <p className="w-[15%]">Quantity</p>
                    <p className="w-[30%]">Price</p>
                    <p className="w-[10%]">Stock</p>
                </div>
                <div className="flex flex-col border-1 border-green-800">
                    {!isFetchLoading && isCartEmpty ? (
                        <p className="text-center py-2 text-lg">Your cart is empty</p>
                    ) : (cartItems?.data &&
                        cartItems?.data.map((item, index) => (
                            <CartItemListTableRow key={item.id} id={index + 1} item={item.product?.title ?? ''} quantity={item.product_quantity} price={item.product?.price ?? 0} total={item.product_quantity * (item.product?.price ?? 0)} />
                        ))
                    )}
                </div>
            </TableLayout>

            <button className="self-start p-2 mt-10 mr-5 bg-red-700 hover:bg-red-600 text-white rounded-sm" onClick={() => setCartClearConfirmationVisible(true)}>Clear Cart</button>

            <HorizontalDivider className="mr-5 my-10"/>
        </section>
    );
};

const CartItemListTableRow = ({
    id, item, quantity, price, total
} : {
    id: number, item: string, quantity: number, price: number, total: number
}) => {
    return (
        <div className="flex p-2 w-full border-b-1 border-green-900 hover:bg-gray-600 text-center">
            <p className="w-[5%]">{id}</p>
            <p className="w-[40%]">{item}</p>
            <p className="w-[15%]">{quantity}</p>
            <p className="w-[30%]">{price}</p>
            <p className="w-[10%]">{total}</p>
        </div>
    )
}
