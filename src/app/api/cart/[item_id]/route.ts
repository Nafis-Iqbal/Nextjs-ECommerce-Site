import { errorResponse } from "@/utilities/utilities";
import { Role } from "@/types/enums";
import { withUserData } from "@/utilities/customMiddlewares";

import { CartController } from "@/controllers";
import { CartValidators } from "@/validators";

export const PATCH = withUserData(async (req: Request, {params}: {params: Promise<{item_id: string}>}, self_user_data?: {user_id: string; email: string; role: Role}) => {
    if(!self_user_data){
        return new Response(
            JSON.stringify('Invalid or expired token'),
            { status: 401 }
        );
    }
    
    try{
        const {item_id} = await params;

        const body = await req.json();

        const parsed = CartValidators.updateCartItemSchema.safeParse(body);
        if(!parsed.success){
            return new Response(
                JSON.stringify({
                    status: "failed",
                    message: "Request validation failed.",
                    error: parsed.error.format(),
                    data: []
                }),
                { status: 400 }
            );
        }

        return await CartController.updateCartItem(self_user_data?.user_id ?? "", item_id, body);
    }
    catch(error){
        return errorResponse(error);
    }
})

export const DELETE = withUserData(async (req: Request, {params}: {params: Promise<{item_id: string}>}, self_user_data?: {user_id: string; email: string; role: Role}) => {
    if(!self_user_data){
        return new Response(
            JSON.stringify('Invalid or expired token'),
            { status: 401 }
        );
    }
    
    try{
        const {item_id} = await params;

        return await CartController.deleteCartItem(self_user_data?.user_id ?? "", item_id);
    }
    catch(error){
        return errorResponse(error);
    }
})