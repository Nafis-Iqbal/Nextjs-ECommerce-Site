/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiFetch } from "../apiInstance";
import { useQuery, useMutation } from '@tanstack/react-query';

async function createUser(userData: UserData) {
  const response = await apiFetch<ApiResponse<User>>('/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  return response;
}

export function useCreateUserRQ(onSuccessFn: (ApiResponse: any) => void, onErrorFn: () => void) {
    return useMutation({
        mutationFn: createUser,
        onSuccess: (data) => {
            onSuccessFn(data);
        },
        onError: () => {
            onErrorFn();
        }
    });
}

export async function getUsers(queryString?: string) {
  const response = await apiFetch<ApiResponse<User>>(`/users${queryString ? `?${queryString}` : ""}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  });

  return response;
}

export function useGetUsersRQ(queryString?: string) {
    return useQuery<ApiResponse<User>>({
        queryFn: () => getUsers(queryString),
        queryKey: ["users", queryString],
        staleTime: queryString ? 0 : 30_000, 
        gcTime: 30 * 1000,
        refetchOnMount: queryString ? "always" : false
    });
}

export default createUser;
