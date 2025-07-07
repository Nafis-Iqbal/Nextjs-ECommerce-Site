import { NextRequest } from "next/server";
import { errorResponse } from "@/utilities/utilities";
import { Role } from "@/types/enums";
import { withUserData } from "@/utilities/customMiddlewares";

import { NotificationController } from "@/controllers";
import { NotificationValidators } from "@/validators";


export const GET = withUserData(async (req: NextRequest, {}, self_user_data?: {user_id: string; email: string; role: Role}) => {
    if(!self_user_data){
        return new Response(
            JSON.stringify('Invalid or expired token'),
            { status: 401 }
        );
    }

    try{
        return await NotificationController.getNotificationList(self_user_data.user_id);
    }
    catch(error){
        return errorResponse(error);
    }
})