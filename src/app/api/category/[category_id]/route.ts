import { errorResponse } from "@/utilities/utilities";
import { Role } from "@/types/enums";
import { withAdminRole } from "@/utilities/customMiddlewares";

import { CategoryController } from "@/controllers";

export async function GET(req: Request, {params}: {params: Promise<{category_id: string}>}) {
    try{
        const {category_id} = await params;

        return await CategoryController.getProductsUnderCategory(category_id);
    }
    catch(error){
        return errorResponse(error);
    }
}

export const DELETE = withAdminRole(async (req: Request, {params}: {params: Promise<{category_id: string}>}) => {
    try{
        const {category_id} = await params;

        return await CategoryController.deleteCategory(category_id);
    }
    catch(error){
        return errorResponse(error);
    }
}, Role.MASTER_ADMIN) 