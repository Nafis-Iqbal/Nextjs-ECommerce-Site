import { errorResponse } from "@/utilities/utilities";
import { Role } from "@/types/enums";
import { withUserData } from "@/utilities/customMiddlewares";

import { AddressController } from "@/controllers";

export const GET = withUserData(async (req: Request, {params}: {params: Promise<{user_id: string}>}, self_user_data?: {user_id: string; email: string; role: Role}) => {
    const {user_id} = await params;

    try {
        return await AddressController.getAddressesByUserID(user_id, self_user_data?.user_id, self_user_data?.role);
    }
    catch(error) {
        return errorResponse(error);
    }
});