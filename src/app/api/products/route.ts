import { NextRequest } from "next/server";
import { errorResponse } from "@/utilities/utilities";
import { Role } from "@/types/enums";
import { withAdminRole } from "@/utilities/customMiddlewares";

import { ProductController } from "@/controllers";
import { ProductValidators } from "@/validators";

export const POST = withAdminRole(async (req: Request, {}, self_user_data?: {user_id: string; email: string; role: Role}) => {
    const body = await req.json();

    const parsed = ProductValidators.createProductSchema.safeParse(body);
    if(!parsed.success){
        return new Response(
            JSON.stringify({
                status: "Product creation failed.",
                error: parsed.error.format(),
                data: []
            }),
            { status: 400 }
        );
    }
    
    try {
        return await ProductController.createProduct(self_user_data?.user_id ?? "", body);
    }
    catch(error) {
        return errorResponse(error);
    }  
}, Role.ADMIN); 

export async function GET(req: NextRequest)
{
    try {
        const user_id = req.nextUrl.searchParams.get("user_id");

        return await ProductController.getProductList({user_id});
    }
    catch(error) {
        return errorResponse(error);
    } 
}

