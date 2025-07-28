import { UserController } from "@/controllers";
import { errorResponse } from "@/utilities/utilities";
import { UserValidators } from "@/validators";

//Get User detail
export async function GET(req: Request, {params} : {params: Promise<{user_id: string}>})
{
    const self: boolean = false;
    const {user_id} = await params;

    try {
        return await UserController.getUserDetail(self, user_id);
    }
    catch(error) {
        return errorResponse(error);
    }
}

//Update User data
export async function PUT(req: Request, {params} : {params: Promise<{user_id: string}>})
{
    const body = await req.json();
    const parsed = UserValidators.updateUserSchema.safeParse(body);
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

    const {user_id} = await params;

    try {
        return await UserController.updateUserDetail(user_id, body);
    }
    catch(error) {
        return errorResponse(error);
    }
}

//Delete User data
export async function DELETE(req: Request, {params} : {params: Promise<{user_id: string}>})
{
    const {user_id} = await params;

    try {
        return await UserController.deleteUserDetail(user_id);
    }
    catch(error) {
        return errorResponse(error);
    }
}

