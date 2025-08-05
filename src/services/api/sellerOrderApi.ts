/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiFetch } from "../apiInstance";
import { useQuery, useMutation } from '@tanstack/react-query';

async function createSellerOrder(orderData: SellerOrder) {
  const response = await apiFetch<ApiResponse<SellerOrder>>('/seller-orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderData),
  });
  return response;
}

export function useCreateSellerOrderRQ(onSuccessFn: (ApiResponse: any) => void, onErrorFn: () => void) {
  return useMutation({
    mutationFn: createSellerOrder,
    onSuccess: (data) => onSuccessFn(data),
    onError: () => onErrorFn(),
  });
}

export async function getSellerOrders(queryString?: string) {
  const response = await apiFetch<ApiResponse<SellerOrder>>(`/seller-orders${queryString ? `?${queryString}` : ""}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  return response;
}

export function useGetSellerOrdersRQ(queryString?: string) {
  return useQuery<ApiResponse<SellerOrder>>({
    queryFn: () => getSellerOrders(queryString),
    queryKey: ["sellerOrders", queryString],
    staleTime: queryString ? 0 : 30_000,
    gcTime: 30 * 1000,
    refetchOnMount: queryString ? "always" : false,
  });
}