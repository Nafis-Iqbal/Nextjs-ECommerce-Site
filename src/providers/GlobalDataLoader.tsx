/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import { CartApi } from "@/services/api";
import * as cartActions from "@/global-state-context/cartUpdateSlice";

export default function GlobalDataLoader() {
    const dispatch = useDispatch();
    const { data: session } = useSession();

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

    const { data: cartItemList, isLoading } = CartApi.useGetCartItemsRQ(session ? true : false);

    useEffect(() => {
        if (cartItemList?.data && !isLoading) {
            dispatch(cartActions.clearCart());
            
            (cartItemList.data).forEach((item) => {
                if(item) {
                    dispatch(cartActions.addCartItem({
                        itemId: item?.id ?? '',
                        productId: item.product_id ?? '',
                        productName: item.product?.title ?? '',
                        productPrice: item.product?.price ?? 0,
                        productQuantity: item.product_quantity ?? 0
                    }));
                }
            });
        }
    }, [cartItemList, isLoading]);

    return null;
}
