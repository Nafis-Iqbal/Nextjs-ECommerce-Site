import { errorResponse } from "@/utilities/utilities";
import { Role } from "@/types/enums";
import { withUserData } from "@/utilities/customMiddlewares";

import { ReviewController } from "@/controllers";
import { ReviewValidators } from "@/validators";

export const POST = withUserData(async (req: Request, {params}: {params: Promise<{product_id: string}>}, self_user_data?: {user_id: string; email: string; role: Role}) => {
    if(!self_user_data){
        return new Response(
            JSON.stringify('Invalid or expired token'),
            { status: 401 }
        );
    }

    try{
        const {product_id} = await params;

        const body = await req.json();
        const parsed = ReviewValidators.createReviewSchema.safeParse(body);
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
        
        return await ReviewController.createProductReview(product_id, self_user_data?.user_id ?? "", body);
    }
    catch(error){
        return errorResponse(error);
    }
})

export async function GET(req: Request, {params}: {params: Promise<{product_id: string}>})
{
    const {product_id} = await params;

    try{
        return await ReviewController.getProductReviews(product_id);
    }
    catch(error){
        return errorResponse(error);
    }
}

