import { errorResponse } from "@/utilities/utilities";
import { Role } from "@/types/enums";
import { withAdminRole } from "@/utilities/customMiddlewares";

import { UserValidators } from "@/validators";
import { AdminController } from "@/controllers";

export const PATCH = withAdminRole(async (req: Request, {params} : {params: Promise<{user_id: string}>}, self_user_data?: {user_id: string; email: string; role: Role}) => {
    const {user_id} = await params;

    const body = await req.json();

    const parsed = UserValidators.updateUserRoleSchema.safeParse(body);
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
    
    try {
        return await AdminController.updateUserRole(user_id, self_user_data?.user_id ?? "", body);
    }
    catch(error) {
        return errorResponse(error);
    }  
}, Role.MASTER_ADMIN); 