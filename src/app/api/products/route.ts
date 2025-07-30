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
                status: "failed",
                message: "Request validation failed.",
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
    const { searchParams } = new URL(req.url);
  
    const filters: Record<string, string> = {};

    for (const [key, value] of searchParams.entries()) {
        if (value !== "") filters[key] = value;
    }

    try {
        const user_id = req.nextUrl.searchParams.get("user_id");

        return await ProductController.getProducts({user_id, filters});
    }
    catch(error) {
        return errorResponse(error);
    } 
}

