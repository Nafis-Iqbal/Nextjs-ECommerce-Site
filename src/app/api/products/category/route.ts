import { errorResponse } from "@/utilities/utilities";

import { ProductController } from "@/controllers";
import { ProductValidators } from "@/validators";

export async function POST(req: Request)
{
    const body = await req.json();
    
    const parsed = ProductValidators.filterProductSchema.safeParse(body);
    if(!parsed.success){
        return new Response(
            JSON.stringify({
                status: "Product filters missing.",
                message: "Request validation failed.",
                error: parsed.error.format(),
                data: []
            }),
            { status: 400 }
        );
    }

    try {
        return await ProductController.getProducts(body);
    }
    catch(error) {
        return errorResponse(error);
    } 
}