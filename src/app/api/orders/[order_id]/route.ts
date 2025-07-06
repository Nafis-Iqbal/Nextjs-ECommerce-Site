import { NextRequest } from "next/server";
import { errorResponse } from "@/utilities/utilities";
import { Role } from "@/types/enums";
import { withUserData } from "@/utilities/customMiddlewares";

import { OrderController } from "@/controllers";
import { OrderValidators } from "@/validators";

export const PATCH = withUserData(async (req: NextRequest, {params}: {params: Promise<{order_id: string}>}, self_user_data?: {user_id: string; email: string; role: Role}) => {
    try{
        const {order_id} = await params;

        const body = await req.json();

        const parsed = OrderValidators.updateOrderStatusSchema.safeParse(body);
        if(!parsed.success){
            return new Response(
                JSON.stringify({
                    status: "failed",
                    error: parsed.error.format(),
                    data: []
                }),
                { status: 400 }
            );
        }

        if(self_user_data){
            return await OrderController.updateOrderStatus(order_id, body, self_user_data);
        }
        else{
            return new Response(
                JSON.stringify({
                    status: "failed",
                    message: "Invalid or expired token.",
                    data: []
                }),
                {status: 200}
            )
        }
        
    }
    catch(error){
        return errorResponse(error);
    }
})

export const GET = withUserData(async (req: NextRequest, {params}: {params: Promise<{order_id: string}>}, self_user_data?: {user_id: string; email: string; role: Role}) => {
    try{
        const {order_id} = await params;

        if(self_user_data){
            return await OrderController.getOrderDetail(order_id, self_user_data);
        }
        else{
            return new Response(
                JSON.stringify({
                    status: "failed",
                    message: "Invalid or expired token.",
                    data: []
                }),
                {status: 200}
            )
        }
    }
    catch(error){
        return errorResponse(error);
    }
})

export const DELETE = withUserData(async (req: NextRequest, {params}: {params: Promise<{order_id: string}>}, self_user_data?: {user_id: string; email: string; role: Role}) => {
    try{
        const {order_id} = await params;

        if(self_user_data){
            return await OrderController.deleteOrder(order_id, self_user_data);
        }
        else{
            return await OrderController.deleteOrder(order_id);
        }
    }
    catch(error){
        return errorResponse(error);
    }
})