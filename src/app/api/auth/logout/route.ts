import { UserController } from "@/controllers";
import { errorResponse } from "@/utilities/utilities";

//logout user
export async function POST(req: Request)
{
    try {
        return await UserController.logoutUser();
    }
    catch(error) {
        return errorResponse(error);
    }
}