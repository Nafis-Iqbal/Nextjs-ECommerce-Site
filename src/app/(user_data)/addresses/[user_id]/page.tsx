"use client";

import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { AddressApi } from "@/services/api";
import { Role } from "@/types/enums";
import { AddressManagerModule } from "@/components/modular-components/AddressManagerModule";

interface UserAddressListPageProps {
    params: { user_id: string };
}

export default function UserAddressListPage({ params }: UserAddressListPageProps) {
    const router = useRouter();
    const { data: session, status } = useSession();
    const { user_id } = useParams();

    // Session and permission checks
    useEffect(() => {
        if (status === "loading") return;
        
        if (!session) {
            router.push("/");
            return;
        }

        // Only MASTER_ADMIN can access other users' address pages
        if (session.user.role !== Role.MASTER_ADMIN && session.user.user_id !== user_id) {
            if (session.user.role === Role.ADMIN) {
                router.push("/dashboard");
            } else {
                router.push("/");
            }
            return;
        }
    }, [session, status, router, user_id]);

    const {
        data: addressesData,
        isLoading: isAddressesLoading,
        isError: isAddressesError,
        refetch: refetchAddresses
    } = AddressApi.useGetUserAddressesRQ(user_id as string);

    if (status === "loading" || isAddressesLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-900">
                <div className="text-white text-xl">Loading addresses...</div>
            </div>
        );
    }

    if (!session) {
        return null;
    }

    if (isAddressesError) {
        return (
            <div className="flex flex-col justify-center items-center min-h-screen bg-gray-900">
                <div className="text-red-400 text-xl mb-4">Error loading addresses</div>
                <button 
                    onClick={() => refetchAddresses()}
                    className="px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-md"
                >
                    Try Again
                </button>
            </div>
        );
    }

    const addresses = addressesData?.data || [];

    return (
        <div className="flex flex-col p-2 font-sans mt-5">
            <AddressManagerModule className="mt-5 ml-10" userId={user_id as string} showFullList={true} />
        </div>
    );
}