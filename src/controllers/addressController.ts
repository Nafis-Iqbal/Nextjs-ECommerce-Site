import prismadb from "@/prisma/prismadb";

import { errorResponse } from "@/utilities/utilities";

export async function createAddress(identifier_id:{user_id?: string, order_id?: string}, 
    data:{addressLine1: string, city: string, state: string, postalCode: string, country: string, phoneNumber: string, addressLine2?: string}): Promise<Address | null>
{
    try{
        const {user_id, order_id} = identifier_id;
        const {addressLine1, city, state, postalCode, country, phoneNumber, addressLine2} = data;

        return await prismadb.address.create({
            data: {
                addressLine1,
                addressLine2: addressLine2 ?? "",
                city,
                state,
                postalCode,
                country,
                phoneNumber,
                user_id: user_id ?? ""
            }
        })
    }
    catch(error)
    {
        throw error;
    }
}

export async function updateAddress(id: string, data:{addressLine1: string, city: string, state: string, postalCode: string, country: string, phoneNumber: string, addressLine2?: string}): Promise<boolean>
{
    try{
        const {addressLine1, city, state, postalCode, country, phoneNumber, addressLine2} = data;

        await prismadb.address.update({
            where: {
                id
            },
            data: {
                addressLine1,
                addressLine2: addressLine2 ?? "",
                city,
                state,
                postalCode,
                country,
                phoneNumber,
            }
        })

        return true;
    }
    catch(error)
    {
        return false;
    }
}

export async function getAddressByUserID(user_id: string): Promise<Address | null>
{
    try{
        const addressByUser = await prismadb.address.findFirst({
            where: {
                user_id
            }
        })

        return addressByUser;
    }
    catch(error){
        throw error;
    }
}

export async function getAddressByOrderID(order_id: string): Promise<Address | null>
{
    try{
        const orderData = await prismadb.order.findFirst({
            where: {
                id: order_id
            }
        })

        if(orderData){
            const addressByOrderId = await prismadb.address.findFirst({
                where: {
                    id: orderData.address_id
                }
            })

            return addressByOrderId;
        }
        else return null;
    }
    catch(error){
        throw error;
    }
}

export async function deleteAddress(id: string): Promise<boolean>
{
    try{
        await prismadb.address.delete({
            where: {
                id
            }
        });

        return true;
    }
    catch(error){
        return false;
    }
}