/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import * as cartActions from "@/global-state-context/cartUpdateSlice";

const CartUpdateModal = () => {
    const router = useRouter();
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
        recentProductName: string,
        recentProductId: string
    } = useSelector((state: any) => state.cartUpdatePopUp);

    const onClose = () => {
        dispatch(cartActions.setVisibility(false));
    }

    const cartTotalPrice = cartUpdateState.items.reduce((total, item) => total + item.productPrice * item.productQuantity, 0);
    const cartTotalQuantity = cartUpdateState.items.reduce((total, item) => total + item.productQuantity, 0);

    if (!cartUpdateState.isOpen) return null;

    return ReactDOM.createPortal(
        <div
            className="fixed z-60 inset-0 flex items-center justify-center bg-gray-100/50 font-sans"
            onClick={onClose} // Close modal when clicking outside
        >
            {/* Modal Animation */}
            <AnimatePresence>
                <motion.div
                    className="relative flex flex-col space-y-4 p-2 rounded-sm shadow-lg md:w-[40%] border-x-2 border-b-4"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
                >
                    <div className="flex mt-8">
                        <p className="w-[75%] text-lg ml-5">
                            {`You have added ${cartUpdateState.recentProductName} of `}
                            <Link 
                                href={`/products/${cartUpdateState.recentProductId}`} 
                                className="text-green-500 hover:underline"
                                onClick={onClose}
                            >
                                {cartUpdateState.recentProductName}
                            </Link>
                            {" to your cart!"}
                        </p>

                        <div className="flex flex-col w-[25%] p-2 border-1 border-green-800">
                            <div className="flex justify-between p-1 border-b-1 border-green-800">
                                <p>Cart Quantity: </p>
                                <p>{cartTotalQuantity}</p>
                            </div>

                            <div className="flex justify-between p-1">
                                <p>Cart Total: </p>
                                <p>{cartTotalPrice}</p>
                            </div>
                        </div>
                    </div>
                    
                    
                    <div className="flex items-center space-x-2 ml-2 p-2">
                        <button className="px-4 py-2 hover:bg-gray-600 border-1 border-green-800" onClick={() => {router.push("/cart"); onClose();}}>
                            View Cart
                        </button>

                        <button className="px-4 py-2 hover:bg-green-700 hover:shadow-green-600 hover:shadow-xs border-1 border-green-800 hover:border-green-600"
                            onClick={() => {router.push("/checkout"); onClose();}}>
                            Checkout
                        </button>
                    </div>

                    <button className="absolute top-1 right-1 px-2 py-1 text-xs bg-red-400 text-white rounded hover:bg-red-300" onClick={onClose}>
                        X
                    </button>
                </motion.div>
            </AnimatePresence>
        </div>
    , document.body);
};

export default CartUpdateModal;