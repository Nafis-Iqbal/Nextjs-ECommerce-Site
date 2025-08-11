/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiFetch } from "../apiInstance";
import { useQuery, useMutation } from '@tanstack/react-query';

async function createBuyerOrder(orderData: Order) {
  const response = await apiFetch<ApiResponse<Order>>('/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderData),
  });
  return response;
}

export function useCreateBuyerOrderRQ(onSuccessFn: (ApiResponse: any) => void, onErrorFn: () => void) {
  return useMutation({
    mutationFn: createBuyerOrder,
    onSuccess: (data) => onSuccessFn(data),
    onError: () => onErrorFn(),
  });
}

export async function getBuyerOrders(queryString?: string) {
  const response = await apiFetch<ApiResponse<Order>>(`/seller_orders${queryString ? `?${queryString}` : ""}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  return response;
}

export function useGetBuyerOrdersRQ(queryString?: string) {
  return useQuery<ApiResponse<Order>>({
    queryFn: () => getBuyerOrders(queryString),
    queryKey: ["buyerOrders", queryString],
    staleTime: queryString ? 0 : 30_000,
    gcTime: 30 * 1000,
    refetchOnMount: queryString ? "always" : false,
  });
}