import { NextRequest } from "next/server";
import { errorResponse } from "@/utilities/utilities";
import { Role } from "@/types/enums";
import { withUserData } from "@/utilities/customMiddlewares";

import { SellerOrderController } from "@/controllers";
import { OrderValidators } from "@/validators";

export const PUT = withUserData( async (req: Request, {params}: {params: Promise<{seller_order_id: string}>}, self_user_data?: {user_id: string; email: string; role: Role}) => {
    const {seller_order_id} = await params;
    
    const body = await req.json();

    const parsed = OrderValidators.updateSellerOrderStatusSchema.safeParse(body);
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
    
    try {
        return await SellerOrderController.updateSellerOrder(seller_order_id, self_user_data?.user_id ?? "", body);
    }
    catch(error) {
        return errorResponse(error);
    }  
});