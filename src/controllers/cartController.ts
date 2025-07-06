import prismadb from "@/prisma/prismadb";

import { errorResponse } from "@/utilities/utilities";

export async function addCartItem(user_id: string, data: {product_id: string, product_quantity: number})
{
    try{
        const {product_id, product_quantity} = data;

        const newCartItem = await prismadb.cartItem.create({
            data: {
                user_id,
                product_id,
                product_quantity
            }
        })

        return new Response(
            JSON.stringify({
                status: "success",
                message: "Product added to cart created successfully.",
                data: newCartItem
            }),
            {status: 200}
        )
    }
    catch(error){
        return errorResponse(error);
    }
}

export async function updateCartItem(user_id: string, item_id: string, data: {product_quantity: number})
{
    try{
        const {product_quantity} = data;

        const updatedCartItem = await prismadb.cartItem.update({
            where: {
                id_user_id: {
                    id: item_id,
                    user_id
                }
            },
            data: {
                product_quantity
            }
        })

        return new Response(
            JSON.stringify({
                status: "success",
                message: "Cart items updated successfully.",
                data: updatedCartItem
            }),
            {status: 200}
        )
    }
    catch(error){
        return errorResponse(error);
    }
}

export async function deleteCartItem(user_id: string, item_id: string)
{
    try{
        const deletedCartItem = await prismadb.cartItem.delete({
            where: {
                id_user_id: {
                    id: item_id,
                    user_id
                }
            }
        })

        return new Response(
            JSON.stringify({
                status: "success",
                message: "Cart item deleted successfully.",
                data: []
            }),
            {status: 200}
        )
    }
    catch(error){
        return errorResponse(error);
    }
}

export async function getCartItemList(user_id: string)
{
    try{
        const cartItemsList = await prismadb.cartItem.findMany({
            where: {
                user_id
            }
        })

        return new Response(
            JSON.stringify({
                status: "success",
                message: "Cart items retrieved successfully.",
                data: cartItemsList
            }),
            {status: 200}
        )
    }
    catch(error){
        return errorResponse(error);
    }
}

export async function clearCartItemList(user_id: string)
{
    try{
        await prismadb.cartItem.deleteMany({
            where: {
                user_id
            }
        })

        return new Response(
            JSON.stringify({
                status: "success",
                message: "Cart items cleared successfully.",
                data: []
            }),
            {status: 200}
        )
    }
    catch(error){
        return errorResponse(error);
    }
}