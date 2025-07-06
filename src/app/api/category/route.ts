import { errorResponse } from "@/utilities/utilities";
import { Role } from "@/types/enums";
import { withAdminRole } from "@/utilities/customMiddlewares";

import { CategoryController } from "@/controllers";
import { CategoryValidators } from "@/validators";

export const POST = withAdminRole(async (req: Request) => {
    const body = await req.json();

    try{
        return await CategoryController.createCategory(body);
    }
    catch(error) {
        return errorResponse(error);
    }
}, Role.MASTER_ADMIN);

export async function GET(req: Request)
{
    try{
        return await CategoryController.getCategoryList();
    }
    catch(error) {
        return errorResponse(error);
    }
}