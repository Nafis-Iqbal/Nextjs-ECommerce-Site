import { errorResponse } from "@/utilities/utilities";

import { UserController } from "@/controllers";
import { UserValidators } from "@/validators"; 

//login user
export async function POST(req: Request)
{
    const body = await req.json();
    const parsed = UserValidators.loginUserSchema.safeParse(body);
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
        return await UserController.loginUser(body);
    }
    catch(error) {
        return errorResponse(error);
    }
}