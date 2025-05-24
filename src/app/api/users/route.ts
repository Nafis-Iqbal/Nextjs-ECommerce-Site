import { UserController } from "@/controllers";
import { errorResponse } from "@/utilities/utilities";
import { UserValidators } from "@/validators";

//create new user
//Validation must for password confirmation
export async function POST(req: Request)
{
    const body = await req.json();
    const parsed = UserValidators.registerUserSchema.safeParse(body);
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
        return await UserController.createUser(body);
    }
    catch(error) {
        return errorResponse();
    }
}

//get all users
export async function GET(req: Request)
{
    try {
        return await UserController.getAllUsers();
    }
    catch(error) {
        return errorResponse();
    }
}

