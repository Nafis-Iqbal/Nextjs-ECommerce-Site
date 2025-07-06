import prismadb from "@/prisma/prismadb";

import { errorResponse } from "@/utilities/utilities";
import { Role, Status } from "@/types/enums";

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

export async function updateSellerOrder(id: string, user_id: string, data: {orderStatus: Status})
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