/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSession } from "next-auth/react";
import { CartApi } from "@/services/api";
import * as cartActions from "@/global-state-context/cartUpdateSlice";

export default function GlobalDataLoader() {
    const dispatch = useDispatch();
    const { data: session } = useSession();

    const { data: cartItemList, isLoading } = CartApi.useGetCartItemsRQ(session ? true : false);

    useEffect(() => {
        if (cartItemList?.data && !isLoading) {
            (cartItemList.data).forEach((item) => {
                if(item) {
                    dispatch(cartActions.addCartItem({
                        itemId: item?.id ?? '',
                        productId: item.product?.id ?? '',
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
