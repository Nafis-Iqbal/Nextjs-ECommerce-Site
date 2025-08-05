import { errorResponse } from "@/utilities/utilities";
import { Role } from "@/types/enums";
import { withAdminRole } from "@/utilities/customMiddlewares";

import { ProductController } from "@/controllers";

export const PATCH = withAdminRole( async (req: Request, {params}: {params: Promise<{product_id: string}>}, self_user_data?: {user_id: string; email: string; role: Role}) => {
    const {product_id} = await params;
    
    const body = await req.json();

    try {
        return await ProductController.modifyProductCategories(product_id, self_user_data?.user_id ?? "", body);
    }
    catch(error) {
        return errorResponse(error);
    }  
}, Role.ADMIN);

export async function GET(req: Request, {params}: {params: Promise<{product_id: string}>})
{
    const {product_id} = await params;

    try {
        return await ProductController.getCategoriesOfProduct(product_id);
    }
    catch(error) {
        return errorResponse(error);
    } 
}