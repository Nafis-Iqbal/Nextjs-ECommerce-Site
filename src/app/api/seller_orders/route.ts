import { NextRequest } from "next/server";
import { errorResponse } from "@/utilities/utilities";
import { Role } from "@/types/enums";
import { withUserData } from "@/utilities/customMiddlewares";

import { SellerOrderController } from "@/controllers";

export const GET = withUserData(async (req: NextRequest, {}, self_user_data?:{user_id: string, email: string, role: Role}) => {
    if(!self_user_data){
        return new Response(
            JSON.stringify('Invalid or expired token'),
            { status: 401 }
        );
    }
    
    try {
        const user_id = req.nextUrl.searchParams.get("user_id");
        const self_user = req.nextUrl.searchParams.get("self");

        if(!user_id && !self_user){
            //all seller orders if master admin, or none
            return await SellerOrderController.getSellerOrderList(self_user_data, false);
        }
        else if(self_user && self_user === "true"){
            //Own seller orders
            return await SellerOrderController.getSellerOrderList(self_user_data, true);
        }
        else if(user_id){
            //View vendor seller orders, viewer is master admin 
            return await SellerOrderController.getSellerOrderList(self_user_data, false, user_id);
        }

        return new Response(
            JSON.stringify({
                status: "failed",
                message: "Unable to retrieve Seller Order. Check query values.",
                data: []
            }),
            {status: 200}
        )
    }
    catch(error) {
        return errorResponse(error);
    } 
})