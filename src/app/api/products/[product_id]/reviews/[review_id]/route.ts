import { errorResponse } from "@/utilities/utilities";
import { Role } from "@/types/enums";
import { withUserData } from "@/utilities/customMiddlewares";

import { ReviewController } from "@/controllers";
import { ReviewValidators } from "@/validators";

export const PUT = withUserData(async (req: Request, {params}: {params: Promise<{review_id: string}>}, self_user_data?: {user_id: string; email: string; role: Role}) => { 
    if(!self_user_data){
        return new Response(
            JSON.stringify('Invalid or expired token'),
            { status: 401 }
        );
    }

    try{
        const {review_id} = await params;

        const body = await req.json();

        const parsed = ReviewValidators.updateReviewSchema.safeParse(body);
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

        return await ReviewController.updateProductReview(review_id, self_user_data?.user_id ?? "", body)
    }
    catch(error){
        return errorResponse(error);
    }
})

export const DELETE = withUserData(async (req: Request, {params}: {params: Promise<{review_id: string}>}, self_user_data?: {user_id: string; email: string; role: Role}) => { 
    if(!self_user_data){
        return new Response(
            JSON.stringify('Invalid or expired token'),
            { status: 401 }
        );
    }

    try{
        const {review_id} = await params;

        return await ReviewController.deleteProductReview(review_id, self_user_data?.user_id ?? "")
    }
    catch(error){
        return errorResponse(error);
    }
})