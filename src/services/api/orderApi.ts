/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiFetch } from "../apiInstance";
import { useQuery, useMutation } from '@tanstack/react-query';

async function createBuyerOrder(orderData: Partial<BuyerOrderPayload>) {
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
  const response = await apiFetch<ApiResponse<Order>>(`/orders${queryString ? `?${queryString}` : ""}`, {
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

export async function getBuyerOrderDetail(order_id: string) {
  const response = await apiFetch<ApiResponse<Order>>(`/orders/${order_id}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  return response;
}

export function useGetBuyerOrderDetailRQ(order_id: string) {
  return useQuery<ApiResponse<Order>>({
    queryFn: () => getBuyerOrderDetail(order_id),
    queryKey: ["buyerOrderDetail", order_id],
    staleTime: 30_000,
    gcTime: 30 * 1000,
  });
}

export async function updateBuyerOrderStatus(order_id: string, orderData: Partial<Order>) {
  const response = await apiFetch<ApiResponse<Order>>(`/orders/${order_id}`, {
    method: 'PATCH',
    body: JSON.stringify(orderData),
  });
  return response;
}

export function useUpdateBuyerOrderStatusRQ(onSuccessFn: (ApiResponse: any) => void, onErrorFn: () => void) {
  return useMutation({
    mutationFn: ({order_id, orderData}: {order_id: string, orderData: Partial<Order>}) => updateBuyerOrderStatus(order_id, orderData),
    onSuccess: (data) => onSuccessFn(data),
    onError: () => onErrorFn(),
  });
}
