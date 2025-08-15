import { errorResponse } from "@/utilities/utilities";
import { Role } from "@/types/enums";
import { withUserData } from "@/utilities/customMiddlewares";

import { AddressController } from "@/controllers";
import { AddressValidators } from "@/validators";

export async function GET(req: Request, {params}: {params: Promise<{address_id: string}>}) 
{
    const {address_id} = await params;

    try {
        return await AddressController.getAddressDetail(address_id);
    }
    catch(error) {
        return errorResponse(error);
    }
}

export const PUT = withUserData(async (req: Request, {params}: {params: Promise<{address_id: string}>}, self_user_data?: {user_id: string; email: string; role: Role}) => {
    const {address_id} = await params;
    
    const body = await req.json();

    const parsed = AddressValidators.updateAddressSchema.safeParse(body);
    if (!parsed.success) {
        return new Response(
            JSON.stringify({
                status: "failure",
                message: "Request validation failed.",
                error: parsed.error.format(),
                data: null
            }),
            { status: 400 }
        );
    }
    
    try {
        return await AddressController.updateAddress(address_id, self_user_data?.user_id, self_user_data?.role, body);
    }
    catch(error) {
        return errorResponse(error);
    }  
});

export const DELETE = withUserData(async (req: Request, {params}: {params: Promise<{address_id: string}>}, self_user_data?: {user_id: string; email: string; role: Role}) => {
    const {address_id} = await params;
    
    try {
        return await AddressController.deleteAddress(address_id, self_user_data?.user_id, self_user_data?.role);
    }
    catch(error) {
        return errorResponse(error);
    }  
});
