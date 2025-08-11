/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiFetch } from "../apiInstance";
import { useQuery, useMutation } from '@tanstack/react-query';

async function getCartItems(){
    const response = await apiFetch<ApiResponse<CartItem[]>>('/cart', {
        method: 'GET',
    });

    return response;
}

export function useGetCartItemsRQ(enabled: boolean) {
    return useQuery<ApiResponse<CartItem[]>>({
        queryFn: getCartItems,
        queryKey: ["cart"],
        staleTime: 30_000, // 30 seconds
        gcTime: 30 * 1000, // 30 seconds
        refetchOnMount: false,
        enabled
    });
}

export async function addCartItem(data: {product_id: string, product_quantity: number}) {
    const response = await apiFetch<ApiResponse<CartItem>>('/cart', {
        method: 'POST',
        body: JSON.stringify(data),
    });

    return response;
}

export function useAddCartItemRQ(onSuccessFn: (ApiResponse: any) => void, onErrorFn: () => void) {
    return useMutation({
        mutationFn: addCartItem,
        onSuccess: (data) => {
            onSuccessFn(data);
        },
        onError: () => {
            onErrorFn();
        }
    });
}

export async function updateCartItem(cartItemData: { id: string, addQuantity?: boolean } & Partial<Omit<CartItem, "id">>) {
    const response = await apiFetch<ApiResponse<CartItem>>(`/cart/${cartItemData.id}`, {
        method: 'PATCH',
        body: JSON.stringify(cartItemData),
    });

    return response;
}

export function useUpdateCartItemRQ(onSuccessFn: (ApiResponse: any) => void, onErrorFn: () => void) {
    return useMutation({
        mutationFn: updateCartItem,
        onSuccess: (data) => {
            onSuccessFn(data);
        },
        onError: () => {
            onErrorFn();
        }
    });
}

export async function deleteCartItem(cartItemId: string) {
    const response = await apiFetch<ApiResponse<{ message: string }>>(`/cart/${cartItemId}`, {
        method: 'DELETE',
    });

    return response;
}

export function useDeleteCartItemRQ(onSuccessFn: (ApiResponse: any) => void, onErrorFn: () => void) {
    return useMutation({
        mutationFn: deleteCartItem,
        onSuccess: (data) => {
            onSuccessFn(data);
        },
        onError: () => {
            onErrorFn();
        }
    });
}

export async function clearCartItemList() {
    const response = await apiFetch<ApiResponse<{ message: string }>>('/cart', {
        method: 'DELETE',
    });

    return response;
}

export function useClearCartItemListRQ(onSuccessFn: (ApiResponse: any) => void, onErrorFn: () => void) {
    return useMutation({
        mutationFn: clearCartItemList,
        onSuccess: (data) => {
            onSuccessFn(data);
        },
        onError: () => {
            onErrorFn();
        }
    });
}

export default getCartItems;