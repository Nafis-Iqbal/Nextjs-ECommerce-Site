import prismadb from "@/prisma/prismadb";

import { errorResponse } from "@/utilities/utilities";

export async function createProductReview(product_id: string, user_id: string, data: {description: string, rating: number}) {
    try{
        const {description, rating} = data;

        const newReview = await prismadb.review.create({
            data: {
                description,
                rating,
                user: {
                    connect: {id: user_id}
                },
                product: {
                    connect: {id: product_id}
                }
            }
        });

        return new Response(
            JSON.stringify({
                status: "success",
                message: "Product review submitted successfully",
                data: newReview
            }),
            {status: 200}
        )
    }
    catch(error){
        return errorResponse(error);
    }
}

export async function updateProductReview(id: string, user_id: string, data: {description?: string, rating?: number}) {
    try{
        const {description, rating} = data;

        const updatedReview = await prismadb.review.update({
            where: {
                id_user_id: {
                    id,
                    user_id
                }
            },
            data: {
                description,
                rating
            }
        })

        return new Response(
            JSON.stringify({
                status: "success",
                message: "Product review updated successfully",
                data: updatedReview
            }),
            {status: 200}
        )
    }
    catch(error){
        return errorResponse(error);
    }
}

export async function deleteProductReview(id: string, user_id: string) {
    try{
        await prismadb.review.delete({
            where: {
                id_user_id: {
                    id,
                    user_id
                }
            }
        })

        return new Response(
            JSON.stringify({
                status: "success",
                message: "Product review deleted successfully",
                data: []
            }),
            {status: 200}
        )
    }
    catch(error){
        return errorResponse(error);
    }
}

export async function getProductReviews(id: string) {
    try{
        const reviews = await prismadb.product.findUnique({
            where: {id},
            select: {
                reviews: true
            }
        });

        return new Response(
            JSON.stringify({
                status: "success",
                message: "Product reviews retrieved successfully",
                data: reviews
            }),
            {status: 200}
        )
    }
    catch(error){
        return errorResponse(error);
    }
}