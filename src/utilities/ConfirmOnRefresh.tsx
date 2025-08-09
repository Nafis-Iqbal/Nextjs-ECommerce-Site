/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useSession } from "next-auth/react";

export default function ConfirmOnRefresh() {
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

    const shouldConfirm = !session && cartUpdateState.items.length > 0;

    useEffect(() => {
        if (!shouldConfirm) return;

        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            e.preventDefault();
            e.returnValue = ""; 
            return "";
        };

        window.addEventListener("beforeunload", handleBeforeUnload);
        return () => window.removeEventListener("beforeunload", handleBeforeUnload);
    }, [shouldConfirm]);

    return null;
}
