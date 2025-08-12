/* eslint-disable @typescript-eslint/no-explicit-any */
import { OrderStatus } from "@prisma/client";
import { apiFetch } from "../apiInstance";
import { useQuery, useMutation } from '@tanstack/react-query';

export async function getSellerOrders(queryString?: string) {
  const response = await apiFetch<ApiResponse<SellerOrder>>(`/seller_orders${queryString ? `?${queryString}` : ""}`, {
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

export async function updateSellerOrderStatus(orderId: string, orderData: {orderStatus: OrderStatus}) {
  const response = await apiFetch<ApiResponse<SellerOrder>>(`/seller_orders/${orderId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderData),
  });
  return response;
}

export function useUpdateSellerOrderStatusRQ(onSuccessFn: (ApiResponse: any) => void, onErrorFn: () => void) {
  return useMutation({
    mutationFn: ({orderId, orderData} : {orderId: string, orderData: {orderStatus: OrderStatus}}) => updateSellerOrderStatus(orderId, orderData),
    onSuccess: (data) => onSuccessFn(data),
    onError: () => onErrorFn(),
  });
}

export async function getSellerOrderDetail(sellerOrderId: string) {
  const response = await apiFetch<ApiResponse<SellerOrder>>(`/seller_orders/${sellerOrderId}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  return response;
}

export function useGetSellerOrderDetailRQ(sellerOrderId: string) {
  return useQuery<ApiResponse<SellerOrder>>({
    queryFn: () => getSellerOrderDetail(sellerOrderId),
    queryKey: ["sellerOrderDetail", sellerOrderId],
    staleTime: 30_000,
    gcTime: 30 * 1000,
  });
}