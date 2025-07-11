import { NextRequest } from "next/server";
import { errorResponse } from "@/utilities/utilities";
import { Role } from "@/types/enums";
import { withUserData } from "@/utilities/customMiddlewares";

import { OrderController } from "@/controllers";
import { OrderValidators } from "@/validators";

export const POST = withUserData(async (req: Request, {}, self_user_data?: {user_id: string; email: string; role: Role}) => {
    try{
        const body = await req.json();

        let user_id: string | null;

        if(!self_user_data){
            user_id = null;

            const parsed = OrderValidators.createGuestOrderSchema.safeParse(body);

            if(parsed) return await OrderController.createOrderForGuest(body);
        }
        else{
            user_id = self_user_data.user_id;

            const parsed = OrderValidators.createUserOrderSchema.safeParse(body);

            if(parsed) return await OrderController.createOrderForUser(user_id, body);
        }

        return new Response(
            JSON.stringify({
                status: "failed",
                message: "Error creating Order.",
                data: []
            }),
            {status: 200}
        )
    }
    catch(error){
        return errorResponse(error);
    }
})

export const GET = withUserData(async (req: NextRequest, {}, self_user_data?: {user_id: string; email: string; role: Role}) => {
    try{
        const url_user_id = req.nextUrl.searchParams.get("user_id");

        if(url_user_id && self_user_data && (self_user_data.role === Role.ADMIN || self_user_data.role === Role.MASTER_ADMIN)){
            return await OrderController.getOrdersOfUser(url_user_id);
        }
        else if(url_user_id == null && self_user_data){
            return await OrderController.getOrdersOfUser(self_user_data?.user_id);
        }

        return new Response(
            JSON.stringify({
                status: "failed",
                message: "Error creating Order.",
                data: []
            }),
            {status: 200}
        )
    }
    catch(error){
        return errorResponse(error);
    }
})