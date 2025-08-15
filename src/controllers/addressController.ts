import prismadb from "@/prisma/prismadb";
import { errorResponse } from "@/utilities/utilities";
import { Role } from "@/types/enums";

export async function createAddress(user_id: string | null, data?: {addressLine1: string, addressLine2: string, city: string, state: string, postalCode: string, country: string, phoneNumber: string})
{
    try {
        if (!data) {
            return new Response(
                JSON.stringify({
                    status: "failure",
                    message: "Address data is required",
                    data: null
                }),
                { status: 400 }
            );
        }

        const {addressLine1, city, state, postalCode, country, phoneNumber, addressLine2} = data;

        const address = await prismadb.address.create({
            data: {
                addressLine1,
                addressLine2,
                city,
                state,
                postalCode,
                country,
                phoneNumber,
                user_id
            }
        });

        if(user_id === null) {
            return new Response(
                JSON.stringify({
                    status: "success",
                    message: "Address created successfully, with no user_id",
                    data: address
                }),
                { status: 201 }
            );
        }
        else{
            const userExists = await prismadb.user.findUnique({
                where: { 
                    id: user_id,
                    OR: [
                        { addressId: null },
                        { addressId: "" },
                        { addressId: undefined }
                    ],
                }
            });
            
            if (userExists) {
                await prismadb.user.update({
                    where: { id: user_id },
                    data: { addressId: address.id }
                });
            }

            return new Response(
                JSON.stringify({
                    status: "success",
                    message: "Address created successfully",
                    data: address
                }),
                { status: 201 }
            );
        }
    }
    catch(error) {
        return errorResponse(error);
    }
}

export async function updateAddress(address_id: string, requester_user_id?: string, requester_role?: Role, data?: {addressLine1: string, city: string, state: string, postalCode: string, country: string, phoneNumber: string, addressLine2?: string})
{
    try {
        if (!data) {
            return new Response(
                JSON.stringify({
                    status: "failure",
                    message: "Address data is required",
                    data: null
                }),
                { status: 400 }
            );
        }

        // Check if address exists and get ownership info
        const existingAddress = await prismadb.address.findUnique({
            where: { id: address_id }
        });
        
        if (!existingAddress) {
            return new Response(
                JSON.stringify({
                    status: "failure",
                    message: "Address not found",
                    data: null
                }),
                { status: 404 }
            );
        }

        // Only allow users to update their own addresses, unless they are admin
        if (requester_role !== Role.MASTER_ADMIN && existingAddress.user_id !== requester_user_id) {
            return new Response(
                JSON.stringify({
                    status: "failure",
                    message: "Unauthorized: You can only update your own addresses",
                    data: null
                }),
                { status: 403 }
            );
        }

        const {addressLine1, city, state, postalCode, country, phoneNumber, addressLine2} = data;

        const address = await prismadb.address.update({
            where: {
                id: address_id
            },
            data: {
                addressLine1,
                addressLine2,
                city,
                state,
                postalCode,
                country,
                phoneNumber,
            }
        });

        return new Response(
            JSON.stringify({
                status: "success",
                message: "Address updated successfully",
                data: address
            }),
            { status: 200 }
        );
    }
    catch(error) {
        return errorResponse(error);
    }
}

export async function getAddressesByUserID(user_id: string, requester_user_id?: string, requester_role?: Role)
{
    try {
        // Only allow users to get their own addresses, unless they are admin
        if (requester_role !== Role.MASTER_ADMIN && user_id !== requester_user_id) {
            return new Response(
                JSON.stringify({
                    status: "failure",
                    message: "Unauthorized: You can only access your own addresses",
                    data: null
                }),
                { status: 403 }
            );
        }

        const addresses = await prismadb.address.findMany({
            where: {
                user_id
            },
            orderBy: {
                id: 'desc'
            }
        });

        return new Response(
            JSON.stringify({
                status: "success",
                message: "Addresses retrieved successfully",
                data: addresses
            }),
            { status: 200 }
        );
    }
    catch(error) {
        return errorResponse(error);
    }
}

export async function getAddresses(filters?: {user_id?: string, city?: string, state?: string, country?: string})
{
    try {
        const whereClause: Record<string, unknown> = {};
        
        if (filters?.user_id) {
            whereClause.user_id = filters.user_id;
        }
        
        if (filters?.city) {
            whereClause.city = {
                contains: filters.city,
                mode: 'insensitive'
            };
        }
        
        if (filters?.state) {
            whereClause.state = {
                contains: filters.state,
                mode: 'insensitive'
            };
        }
        
        if (filters?.country) {
            whereClause.country = {
                contains: filters.country,
                mode: 'insensitive'
            };
        }

        const addresses = await prismadb.address.findMany({
            where: whereClause,
            orderBy: {
                id: 'desc'
            }
        });

        return new Response(
            JSON.stringify({
                status: "success",
                message: "Addresses retrieved successfully",
                data: addresses
            }),
            { status: 200 }
        );
    }
    catch(error) {
        return errorResponse(error);
    }
}

export async function getAddressDetail(address_id: string)
{
    try {
        const address = await prismadb.address.findUnique({
            where: {
                id: address_id
            }
        });

        if (!address) {
            return new Response(
                JSON.stringify({
                    status: "failure",
                    message: "Address not found",
                    data: null
                }),
                { status: 404 }
            );
        }

        return new Response(
            JSON.stringify({
                status: "success",
                message: "Address retrieved successfully",
                data: address
            }),
            { status: 200 }
        );
    }
    catch(error) {
        return errorResponse(error);
    }
}

export async function deleteAddress(address_id: string, requester_user_id?: string, requester_role?: Role)
{
    try {
        // Check if address exists and get ownership info
        const addressToDelete = await prismadb.address.findUnique({
            where: { id: address_id }
        });

        if (!addressToDelete) {
            return new Response(
                JSON.stringify({
                    status: "failure",
                    message: "Address not found",
                    data: null
                }),
                { status: 404 }
            );
        }

        // Only allow users to delete their own addresses, unless they are admin
        if (requester_role !== Role.MASTER_ADMIN && addressToDelete.user_id !== requester_user_id) {
            return new Response(
                JSON.stringify({
                    status: "failure",
                    message: "Unauthorized: You can only delete your own addresses",
                    data: null
                }),
                { status: 403 }
            );
        }

        // Check if address is being used in orders
        const ordersUsingAddress = await prismadb.order.findFirst({
            where: {
                address_id,
                orderStatus: {
                    notIn: ['COMPLETED', 'CANCELLED', 'FAILED']
                }
            }
        });

        if (ordersUsingAddress) {
            return new Response(
                JSON.stringify({
                    status: "failure",
                    message: "Cannot delete address that is being used in orders",
                    data: null
                }),
                { status: 400 }
            );
        }

        //Check if user has other addresses
        const otherUserAddresses = await prismadb.address.findMany({
            where: {
                user_id: addressToDelete.user_id as string,
                id: {
                    not: address_id
                }
            }
        });

        if(otherUserAddresses.length === 0) {
            // If no other addresses exist, prevent deletion
            return new Response(
                JSON.stringify({
                    status: "failed",
                    message: "Cannot delete the only address",
                    data: null
                }),
                { status: 400 }
            );
        }

        await prismadb.address.delete({
            where: {
                id: address_id
            }
        });

        const nextDefaultAddress = otherUserAddresses[0];
        await prismadb.user.update({
            where: {
                id: addressToDelete.user_id as string
            },
            data: {
                addressId: nextDefaultAddress.id
            }
        });

        return new Response(
            JSON.stringify({
                status: "success",
                message: "Address deleted successfully",
                data: { success: true }
            }),
            { status: 200 }
        );
    }
    catch(error) {
        return errorResponse(error);
    }
}