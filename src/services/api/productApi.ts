/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiFetch } from "../apiInstance";
import { useQuery, useMutation } from '@tanstack/react-query';

async function createProduct(productData: Product) {
  const response = await apiFetch<ApiResponse<Product>>('/products', {
    method: 'POST',
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
  const response = await apiFetch<ApiResponse<Product[]>>(`/products${queryString ? `?${queryString}` : ""}`, {
    method: 'GET',
  });

  return response;
}

export function useGetProductsRQ(queryString?: string) {
    return useQuery<ApiResponse<Product[]>>({
        queryFn: () => getProducts(queryString),
        queryKey: ["products", queryString],
        staleTime: queryString ? 0 : 30_000, 
        gcTime: 30 * 1000,
        refetchOnMount: queryString ? "always" : false
    });
}

export async function getProductDetail(productId: string) {
  const response = await apiFetch<ApiResponse<Product>>(`/products/${productId}`, {
    method: 'GET',
  });

  return response;
}

export function useGetProductDetailRQ(productId: string, enabled = true) {
    return useQuery<ApiResponse<Product>>({
        queryFn: () => getProductDetail(productId),
        queryKey: ["products", productId],
        staleTime: 30_000, 
        gcTime: 30 * 1000,
        refetchOnMount: false,
        enabled
    });
}

export async function updateProduct(productData: { id: string } & Partial<Omit<Product, "id">>) {
  const response = await apiFetch<ApiResponse<Product>>(`/products/${productData.id}`, {
    method: 'PUT',
    body: JSON.stringify(productData),
  });

  return response;
}

export function useUpdateProductRQ(onSuccessFn: (ApiResponse: any) => void, onErrorFn: () => void) {
    return useMutation({
        mutationFn: updateProduct,
        onSuccess: (data) => {
            onSuccessFn(data);
        },
        onError: () => {
            onErrorFn();
        }
    });
}

export async function modifyProductCategories(productId: string, productCategories: string[], action: 'add' | 'remove') {
  const response = await apiFetch<ApiResponse<Product>>(`/products/${productId}/category`, {
    method: 'PATCH',
    body: JSON.stringify({ categories: productCategories, action }),
  });

  return response;
}

export function useModifyProductCategoriesRQ(onSuccessFn: (ApiResponse: any) => void, onErrorFn: () => void) {
    return useMutation({
        mutationFn: ({productId, productCategories, action} : {productId: string, productCategories: string[], action: 'add' | 'remove'}) => 
          modifyProductCategories(productId, productCategories, action),
        onSuccess: (data) => {
            onSuccessFn(data);
        },
        onError: () => {
            onErrorFn();
        }
    });
}

export async function getProductCategories(productId: string) {
  const response = await apiFetch<ApiResponse<Category[]>>(`/products/${productId}/category`, {
    method: 'GET',
  });

  return response;
}

export function useGetProductCategoriesRQ({productId, enabled = true} : {productId: string, enabled?: boolean}) {
    return useQuery<ApiResponse<Category[]>>({
        queryFn: () => getProductCategories(productId),
        queryKey: ["categories", productId],
        staleTime: 30_000, 
        gcTime: 30 * 1000,
        refetchOnMount: false,
        enabled
    });
}

export async function deleteProductImages(productId: string, imageIds: string[]) {
  const response = await apiFetch<ApiResponse<Category[]>>(`/products/${productId}/images`, {
    method: 'POST',
    body: JSON.stringify({ imageIds }),
  });

  return response;
}

export function useDeleteProductImagesRQ(onSuccessFn: (ApiResponse: any) => void, onErrorFn: () => void) {
    return useMutation({
        mutationFn: ({productId, imageIds} : {productId: string, imageIds: string[]}) => deleteProductImages(productId, imageIds),
        onSuccess: (data) => {
            onSuccessFn(data);
        },
        onError: () => {
            onErrorFn();
        }
    });
}