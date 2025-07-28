import { NextRequest } from "next/server";
import { errorResponse } from "@/utilities/utilities";
import { Role } from "@/types/enums";
import { withUserData } from "@/utilities/customMiddlewares";

import { NotificationController } from "@/controllers";
import { NotificationValidators } from "@/validators";


export const PATCH = withUserData(async (req: NextRequest, {params}: {params: Promise<{notification_id: string}>}, self_user_data?: {user_id: string; email: string; role: Role}) => {
    if(!self_user_data){
        return new Response(
            JSON.stringify('Invalid or expired token'),
            { status: 401 }
        );
    }

    try{
        const {notification_id} = await params;

        const body = await req.json();
        
        const parsed = NotificationValidators.updateNotificationStatusSchema.safeParse(body);
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

        return await NotificationController.updateNotification(notification_id, self_user_data.user_id, body);
    }
    catch(error){
        return errorResponse(error);
    }
})

export const DELETE = withUserData(async (req: NextRequest, {params}: {params: Promise<{notification_id: string}>}, self_user_data?: {user_id: string; email: string; role: Role}) => {
    if(!self_user_data){
        return new Response(
            JSON.stringify('Invalid or expired token'),
            { status: 401 }
        );
    }

    try{
        const {notification_id} = await params;

        return await NotificationController.deleteNotification(notification_id, self_user_data.user_id);
    }
    catch(error){
        return errorResponse(error);
    }
})