import { errorResponse } from "@/utilities/utilities";
import { Role } from "@/types/enums";
import { withAdminRole } from "@/utilities/customMiddlewares";

import { ProductController } from "@/controllers";
import { ProductValidators } from "@/validators";

export async function GET(req: Request, {params}: {params: Promise<{product_id: string}>}) 
{
    const {product_id} = await params;

    try{
        return await ProductController.getProductDetail(product_id);
    }
    catch(error){
        return errorResponse(error);
    }
}

export const PUT = withAdminRole( async (req: Request, {params}: {params: Promise<{product_id: string}>}, self_user_data?: {user_id: string; email: string; role: Role}) => {
    const {product_id} = await params;
    
    const body = await req.json();

    const parsed = ProductValidators.updateProductSchema.safeParse(body);
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
        return await ProductController.updateProduct(product_id, self_user_data?.user_id ?? "", body);
    }
    catch(error) {
        return errorResponse(error);
    }  
}, Role.ADMIN);

export const DELETE = withAdminRole( async (req: Request, {params}: {params: Promise<{product_id: string}>}, self_user_data?: {user_id: string; email: string; role: Role}) => {
    const {product_id} = await params;
    
    try {
        return await ProductController.deleteProduct(product_id, self_user_data?.user_id ?? "");
    }
    catch(error) {
        return errorResponse(error);
    }  
}, Role.ADMIN);