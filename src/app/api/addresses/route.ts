import { NextRequest } from "next/server";
import { errorResponse } from "@/utilities/utilities";

import { AddressController } from "@/controllers";
import { AddressValidators } from "@/validators";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";

export async function POST(req: Request){
    const body = await req.json();

    const parsed = AddressValidators.createAddressSchema.safeParse(body);
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
        // Use the user_id from the request body if provided, otherwise use authenticated user's id
        let user_id: string | null;
                
        const session = await getServerSession(authOptions);
        if(!session){
            user_id = null;

            return await AddressController.createAddress(user_id, body);
        }
        else{
            user_id = session.user.user_id;

            return await AddressController.createAddress(user_id, body);
        }
    }
    catch(error) {
        return errorResponse(error);
    }  
};

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
  
    const filters: Record<string, string> = {};

    for (const [key, value] of searchParams.entries()) {
        if (value !== "") filters[key] = value;
    }

    try {
        return await AddressController.getAddresses(filters);
    }
    catch(error) {
        return errorResponse(error);
    } 
}