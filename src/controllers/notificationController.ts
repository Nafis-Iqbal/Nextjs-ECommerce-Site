import prismadb from "@/prisma/prismadb";

import { errorResponse } from "@/utilities/utilities";
import { Priority } from "@/types/enums";

export async function createNotification(user_id: string, data: {content: string, notificationPriority: Priority})
{
    try{
        const {content, notificationPriority} = data;

        const newNotification = await prismadb.notification.create({
            data: {
                content,
                notificationPriority,
                user_id
            }
        });

        return new Response(
            JSON.stringify({
                status: "success",
                message: "Notifications created successfully.",
                data: newNotification
            }),
            {status: 200}
        )
    }
    catch(error){
        return errorResponse(error);
    }
}

export async function createNotificationAfterAssetCreation(user_id: string, data: {content: string, notificationPriority: Priority}): Promise<boolean>
{
    try{
        const {content, notificationPriority} = data;

        await prismadb.notification.create({
            data: {
                content,
                notificationPriority,
                user_id
            }
        });

        return true;
    }
    catch(error){
        throw error;
    }
}

export async function getNotificationList(user_id: string)
{
    try{
        const notificationList = await prismadb.notification.findMany({
            where: {
                user_id
            }
        })

        return new Response(
            JSON.stringify({
                status: "success",
                message: "Notifications retrieved successfully.",
                data: notificationList
            }),
            {status: 200}
        )
    }
    catch(error){
        return errorResponse(error);
    }
}

export async function updateNotification(id: string, user_id: string, data:{isRead: boolean})
{
    try{
        await prismadb.notification.update({
            where: {
                id_user_id: {
                    id,
                    user_id
                }
            },
            data
        })

        return new Response(
            JSON.stringify({
                status: "success",
                message: "Notification updated successfully.",
                data: []
            }),
            {status: 200}
        )
    }
    catch(error){
        return errorResponse(error);
    }
}

export async function deleteNotification(id: string, user_id: string)
{
    try{
        await prismadb.notification.delete({
            where: {
                id_user_id: {
                    id,
                    user_id
                }
            }
        })

        return new Response(
            JSON.stringify({
                status: "success",
                message: "Notification deleted successfully.",
                data: []
            }),
            {status: 200}
        )
    }
    catch(error){
        return errorResponse(error);
    }
}
