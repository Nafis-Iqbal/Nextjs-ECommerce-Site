/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiFetch } from "../apiInstance";
import { useQuery, useMutation } from '@tanstack/react-query';

async function createProduct(productData: Product) {
  const response = await apiFetch<ApiResponse<Product>>('/products', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(productData),
  });

  return response;
}            

export function useCreateProductRQ(onSuccessFn: (ApiResponse: any) => void, onErrorFn: () => void) {
    return useMutation({
        mutationFn: createProduct,
        onSuccess: (data) => {
            onSuccessFn(data);
        },
        onError: () => {
            onErrorFn();
        }
    });
}

export async function getProducts(queryString?: string) {
  const response = await apiFetch<ApiResponse<Product>>(`/products${queryString ? `?${queryString}` : ""}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  });

  return response;
}

export function useGetProductsRQ(queryString?: string) {
    return useQuery<ApiResponse<Product>>({
        queryFn: () => getProducts(queryString),
        queryKey: ["products", queryString],
        staleTime: queryString ? 0 : 30_000, 
        gcTime: 30 * 1000,
        refetchOnMount: queryString ? "always" : false
    });
}