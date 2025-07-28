import { errorResponse } from "@/utilities/utilities";
import { Role } from "@/types/enums";
import { withUserData } from "@/utilities/customMiddlewares";

import { CartController } from "@/controllers";
import { CartValidators } from "@/validators";

export const POST = withUserData(async (req: Request, {}, self_user_data?: {user_id: string; email: string; role: Role}) => {
    if(!self_user_data){
        return new Response(
            JSON.stringify('Invalid or expired token'),
            { status: 401 }
        );
    }

    try{
        const body = await req.json();

        const parsed = CartValidators.addCartItemSchema.safeParse(body);
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

        return await CartController.addCartItem(self_user_data?.user_id ?? "", body);
    }
    catch(error){
        return errorResponse(error);
    }
})

export const GET = withUserData(async (req: Request, {}, self_user_data?: {user_id: string; email: string; role: Role}) => {
    if(!self_user_data){
        return new Response(
            JSON.stringify('Invalid or expired token'),
            { status: 401 }
        );
    }

    try{
        return await CartController.getCartItemList(self_user_data?.user_id ?? "");
    }
    catch(error){
        return errorResponse(error);
    }
})

export const DELETE = withUserData(async (req: Request, {}, self_user_data?: {user_id: string; email: string; role: Role}) => {
    if(!self_user_data){
        return new Response(
            JSON.stringify('Invalid or expired token'),
            { status: 401 }
        );
    }
    
    try{
        return await CartController.clearCartItemList(self_user_data?.user_id ?? "");
    }
    catch(error){
        return errorResponse(error);
    }
})