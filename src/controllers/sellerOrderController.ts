import prismadb from "@/prisma/prismadb";

import { errorResponse } from "@/utilities/utilities";
import { Role, OrderStatus } from "@/types/enums";

export async function getSellerOrderList(self_user_data:{user_id: string, email: string, role: Role}, showSelfData: boolean, user_id?: string)
{
    try{
        let sellerOrderList: SellerOrder[];

        if(showSelfData === true){
            sellerOrderList = await prismadb.sellerOrder.findMany({
                where: {
                    seller_id: self_user_data.user_id
                }
            })
        }
        //seller orders of specific user
        else if(user_id && self_user_data.role === "MASTER_ADMIN"){
            sellerOrderList = await prismadb.sellerOrder.findMany({
                where: {
                    seller_id: user_id
                }
            })
        }
        else if(!user_id && self_user_data.role === "MASTER_ADMIN"){
            sellerOrderList = await prismadb.sellerOrder.findMany();
        }
        else sellerOrderList = [];

        return new Response(
            JSON.stringify({
                status: "success",
                message: "Seller Order list retrieved successfully",
                data: sellerOrderList
            }),
            {status: 200}
        )
    }
    catch(error){
        return errorResponse(error);
    }
}

export async function getSellerOrderDetail(user_id: string, sellerOrderId: string)
{
    try{
        const tempSellerOrder = await prismadb.sellerOrder.findUnique({
            where: {
                id_seller_id: {
                    id: sellerOrderId,
                    seller_id: user_id
                }
            },
            include: {
                items: true,
                buyer: true
            }
        });
        
        if(!tempSellerOrder){
            return new Response(
                JSON.stringify({
                    status: "failed",
                    message: "Seller Order not found",
                    data: []
                }),
                { status: 404 }
            );
        }

        const productIds = tempSellerOrder.items.map(item => item.product_id);

        const products = await prismadb.product.findMany({
            where: { id: { in: productIds } },
            select: { id: true, quantity: true, productStatus: true }
        });

        const sellerOrder = tempSellerOrder.items.map(item => ({
            ...item,
            productStock: products.find(p => p.id === item.product_id)?.quantity ?? null,
            productStatus: products.find(p => p.id === item.product_id)?.productStatus ?? null,
            seller_id: tempSellerOrder.seller_id,
            buyer_id: tempSellerOrder.buyer_id,
            address_id: tempSellerOrder.address_id,
            buyer_name: tempSellerOrder.buyer?.user_name,
            buyer_email: tempSellerOrder.buyer?.email,
            order_id: tempSellerOrder.id,
            orderStatus: tempSellerOrder.orderStatus
        }));

        return new Response(
            JSON.stringify({
                status: "success",
                message: "Seller Order retrieved successfully",
                data: sellerOrder
            }),
            { status: 200 }
        );
    }
    catch(error){
        return errorResponse(error);
    }
}

export async function updateSellerOrder(id: string, user_id: string, data: {orderStatus: OrderStatus})
{
    try{
        await prismadb.sellerOrder.update({
            where: {
                id_seller_id: {
                    id,
                    seller_id: user_id
                }
            },
            data
        })

        //Perform sister seller order status checks, update parent order status, if majority orders are completed/shipped.

        return new Response(
            JSON.stringify({
                status: "success",
                message: "Seller Order updated successfully",
                data: []
            }),
            {status: 200}
        )
    }
    catch(error){
        return errorResponse(error);
    }
}