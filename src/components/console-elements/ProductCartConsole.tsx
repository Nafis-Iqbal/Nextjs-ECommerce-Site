/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { CartApi } from "@/services/api";
import { FaPlus, FaMinus } from "react-icons/fa";
import { useGlobalUI } from "@/hooks/state-hooks/globalStateHooks";
import { queryClient } from "@/services/apiInstance";
import { useSelector } from "react-redux";
import { useSession } from "next-auth/react";

const ProductCartConsole = ({productDetails, className} : { productDetails: Partial<Product>, className?: string}) => {
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
    
    const [quantity, setQuantity] = useState(1);
    const { openNotificationPopUpMessage, openCartUpdatePopUp } = useGlobalUI();

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
            else {
                openNotificationPopUpMessage("Failed to add cart item");
            }
        },
        () => {
            openNotificationPopUpMessage("Failed to add cart item");
        }
    );

    const {mutate: updateCartItem} = CartApi.useUpdateCartItemRQ(
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
            else {
                openNotificationPopUpMessage("Failed to add cart item");
            }
        },
        () => {
            openNotificationPopUpMessage("Failed to add cart item");
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
            else addCartItem({product_id: productDetails.id || "", product_quantity: quantity});
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

            <div className="flex flex-col mt-auto space-y-3">
                <label>Payment Options:</label>

                <div className="flex justify-left space-x-10 w-full">
                    <div className="w-40% min-h-[80px] px-8 py-4 border-1 border-green-800">
                        Payment Option 1
                    </div>

                    <div className="w-40% min-h-[80px] px-8 py-4 border-1 border-green-800">
                        Payment Option 2
                    </div>

                    <div className="w-40% min-h-[80px] px-8 py-4 border-1 border-green-800">
                        Others
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductCartConsole;