/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiFetch } from "./apiInstance";
import { useQuery, useMutation } from '@tanstack/react-query';

async function createCategory(category: Category) {
  const response = await apiFetch<ApiResponse<Category>>('/category', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(category),
  });

  return response;
}

export function useCreateCategoryRQ(onSuccessFn: (ApiResponse: any) => void, onErrorFn: () => void) {
    return useMutation({
        mutationFn: createCategory,
        onSuccess: (data) => {
            onSuccessFn(data);
        },
        onError: () => {
            onErrorFn();
        }
    });
}

export async function getCategories() {
  const response = await apiFetch<ApiResponse<Category>>('/category', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  });

  return response;
}

export function useGetCategoriesRQ() {
    return useQuery<ApiResponse<Category>>({
        queryFn: getCategories,
        queryKey: ["categories"],
        staleTime: 30 * 1000,
        gcTime: 30 * 1000
    });
}

export async function deleteCategory(id: string) {
  const response = await apiFetch<ApiResponse<Category>>(`/category/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    }
  });

  return response;
}

export function useDeleteCategoryRQ(onSuccessFn: (ApiResponse: any) => void, onErrorFn: () => void) {
    return useMutation({
        mutationFn: deleteCategory,
        onSuccess: (data) => {
            onSuccessFn(data);
        },
        onError: () => {
            onErrorFn();
        }
    });
}

export default createCategory;