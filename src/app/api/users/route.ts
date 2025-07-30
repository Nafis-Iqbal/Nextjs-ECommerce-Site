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
                message: "Request validation failed.",
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
        return errorResponse(error);
    }
}

//get all users
export async function GET(req: Request)
{
    const { searchParams } = new URL(req.url);
  
    const filters: Record<string, string> = {};

    for (const [key, value] of searchParams.entries()) {
        if (value !== "") filters[key] = value;
    }

    try {
        return await UserController.getUsers(filters);
    }
    catch(error) {
        return errorResponse(error);
    }
}

