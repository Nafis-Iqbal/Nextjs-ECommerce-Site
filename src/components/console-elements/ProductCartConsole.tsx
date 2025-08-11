/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { CartApi } from "@/services/api";
import { queryClient } from "@/services/apiInstance";
import { useDispatch, useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import { useGlobalUI } from "@/hooks/state-hooks/globalStateHooks";
import * as cartActions from "@/global-state-context/cartUpdateSlice";

import { FaPlus, FaMinus, FaCartPlus, FaSync, FaTrash } from "react-icons/fa";
import { CustomMiniTextInput } from "../custom-elements/CustomInputElements";
import { PaymentConsole } from "./PaymentConsole";

const ProductCartConsole = ({
    productDetails, 
    className, 
    minimalMode = false, 
    tableRowMode = false, 
    itemId = '', 
    initialQuantity = 1
} : { 
    productDetails: Partial<Product>, 
    className?: string, 
    minimalMode?: boolean, 
    tableRowMode?: boolean, 
    itemId?: string, 
    initialQuantity?: number
}) => {
    const {data: session} = useSession();
    const dispatch = useDispatch();

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
    
    const [quantity, setQuantity] = useState(initialQuantity);
    const { openNotificationPopUpMessage, openCartUpdatePopUp } = useGlobalUI();

    useEffect(() => {
        setQuantity(initialQuantity);
    }, [initialQuantity]);

    const {mutate: addCartItem} = CartApi.useAddCartItemRQ(
        (responseData) => {
            if(responseData.status === "success")
            {
                openCartUpdatePopUp({
                    itemId: responseData.data.id || "",
                    productId: productDetails.id || "",
                    productName: productDetails.title || "Sample Product",
                    productPrice: productDetails.price || 29.99,
                    productQuantity: quantity
                });

                queryClient.invalidateQueries({ queryKey: ["cart"] });
            }
            else openNotificationPopUpMessage("Failed to add cart item");
            
        },
        () => {
            openNotificationPopUpMessage("Failed to add cart item");
        }
    );

    const {mutate: updateCartItem} = CartApi.useUpdateCartItemRQ(
        (responseData) => {
            if(responseData.status === "success")
            {
                if(!tableRowMode)
                {
                    openCartUpdatePopUp({
                        itemId: responseData.data.id || "",
                        productId: productDetails.id || "",
                        productName: productDetails.title || "Sample Product",
                        productPrice: productDetails.price || 29.99,
                        productQuantity: quantity
                    });
                }
                else{
                    dispatch(cartActions.updateCartItemQuantity({
                        productId: productDetails.id || "",
                        quantity
                    }));
                }
                
                queryClient.invalidateQueries({ queryKey: ["cart"] });
            }
            else openNotificationPopUpMessage("Failed to add cart item");
        },
        () => {
            openNotificationPopUpMessage("Failed to add cart item");
        }
    );

    const {mutate: deleteCartItem} = CartApi.useDeleteCartItemRQ(
        (responseData) => {
            if(responseData.status === "success")
            {
                dispatch(cartActions.removeCartItem(productDetails.id || ""));

                queryClient.invalidateQueries({ queryKey: ["cart"] });
            }
            else openNotificationPopUpMessage("Failed to remove cart item");
        },
        () => {
            openNotificationPopUpMessage("Failed to remove cart item");
        }
    );

    const handleIncrement = () => {
        setQuantity(prev => prev + 1);
    };

    const handleDecrement = () => {
        setQuantity(prev => Math.max(1, prev - 1));
    };

    const addToCart = () => {
        const match = cartUpdateState.items.find(item => item.productId === productDetails.id);

        if(session){
            if(match) updateCartItem({id: match.itemId, product_quantity: quantity});
            else addCartItem({product_id: productDetails.id || "failed", product_quantity: quantity});
        }
        else{
            openCartUpdatePopUp({
                itemId: crypto.randomUUID(),
                productId: productDetails.id || "",
                productName: productDetails.title || "Sample Product",
                productPrice: productDetails.price || 29.99,
                productQuantity: quantity
            });
        }
    };

    const handleUpdateQuantityTableRowMode = () => {
        if(session) updateCartItem({id: itemId || "", product_quantity: quantity, addQuantity: false});
        else dispatch(cartActions.updateCartItemQuantity({
            productId: productDetails.id || "",
            quantity
        }));
    }
    
    const handleProductRemoval = () => {
        if(session) deleteCartItem(itemId || "");
        else dispatch(cartActions.removeCartItem(productDetails.id || ""));
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let val = e.target.value;

        if (val === "") {
            setQuantity(0);
            return;
        }

        if (!/^\d+$/.test(val)) {
            return;
        }

        val = val.replace(/^0+/, "");

        if (val === "") val = "0";

        setQuantity(Number(val));
    };

    if(minimalMode) return (
        <button 
            className="" 
            onClick={addToCart}
        >
            <FaCartPlus className="absolute bottom-5 right-5 text-3xl text-green-600 hover:text-green-400 hover:scale-110 transition-all duration-150 cursor-pointer"/>
        </button>
    );

    if(tableRowMode) return (
        <div className="flex justify-center space-x-1 w-full">
            <CustomMiniTextInput
                type="number"
                value={quantity}
                onChange={handleChange}
                className="text-center w-[50px] h-[80%]"
            />

            <button onClick={handleUpdateQuantityTableRowMode} className="p-1 bg-gray-400 rounded hover:bg-gray-300 hover:scale-110">
                <FaSync className="text-xl text-green-700 cursor-pointer"/>
            </button>

            <button onClick={handleProductRemoval} className="p-1 bg-red-500 rounded hover:bg-red-400 hover:scale-110">
                <FaTrash className="text-xl text-black cursor-pointer"/>
            </button>
        </div>
    );

    return (
        <div className={`flex flex-col space-y-2 ${className}`}>
            <div className="flex items-center space-x-1 mb-10">
                <button onClick={handleDecrement} className="p-2 bg-gray-500 rounded hover:bg-gray-400">
                    <FaMinus />
                </button>

                <span className="px-3 text-lg">{quantity}</span>

                <button onClick={handleIncrement} className="p-2 bg-gray-500 rounded hover:bg-gray-400">
                    <FaPlus />
                </button>

                <button className="ml-4 px-4 py-2 text-white rounded-xs bg-green-600 hover:bg-green-500" onClick={addToCart}>Add to Cart</button>
            </div>

            <PaymentConsole/>
        </div>
    );
}

export default ProductCartConsole;