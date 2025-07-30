/* eslint-disable @typescript-eslint/no-explicit-any */
import prismadb from "@/prisma/prismadb";

import { errorResponse } from "@/utilities/utilities";

export async function createProduct(user_id: string, data: {title: string, description: string, price: number}) {
    const {title, description, price} = data;

    try{
        const newProduct = await prismadb.product.create({
            data: {
                title,
                description,
                price,
                user_id
            }
        });

        return new Response(
            JSON.stringify({
                status: "success",
                message: "Product created successfully.",
                data: newProduct
            }),
            {status: 200}
        )
    }
    catch(error){
        return errorResponse(error);
    }
}

export async function updateProduct(id: string, user_id: string, data: {title?: string, description?: string, price?: number, quantity?: number}) {
    const {title, description, price, quantity} = data;
    
    try{
        const updatedProduct = await prismadb.product.update({
            where: {
                id_user_id: {
                    id,
                    user_id
                }
            },
            data: {
                title,
                description,
                price,
                quantity
            }
        });

        return new Response(
            JSON.stringify({
                status: "success",
                message: "Product updated successfully",
                data: updatedProduct
            }),
            {status: 200}
        );
    }
    catch(error){
        return errorResponse(error);
    }
}

export async function deleteProduct(id: string, user_id: string) {
    try{
        await prismadb.$transaction([
            prismadb.review.deleteMany({
                where: {product_id: id}
            }),
            prismadb.productCategory.deleteMany({
                where: {product_id: id}
            }),
            prismadb.product.delete({
                where: {
                    id_user_id: {
                        id,
                        user_id
                    }
                }
            }),
        ]);
        
        return new Response(
            JSON.stringify({
                status: "success",
                message: "Product deleted successfully",
                data: []
            }),
            {status: 200}
        )
    }
    catch(error){
        return errorResponse(error);
    }
}

export async function getProductDetail(id: string) {
    try{
        const productDetail = await prismadb.product.findUnique({
            where: {
                id
            },
            include: {
                productCategories: {
                    select: {
                        category_id: true
                    }
                },
                reviews : true
            }
        })

        return new Response(
            JSON.stringify({
                status: "success",
                message: "Product detail found.",
                data: productDetail
            }),
            {status: 200}
        )
    }
    catch(error){
        return errorResponse(error);
    }
}

export async function modifyProductCategories(id: string, user_id: string, data:{categories: string[], action: string}) {
    try{
        const productToModify = await prismadb.product.findUnique({
            where:{
                id_user_id: {
                    id,
                    user_id
                }
            }
        })

        if(!productToModify){
            return new Response(
                JSON.stringify({
                    status: "failed",
                    message: "Product not owned by user",
                    data: []
                }),
                {status: 200}
            )
        }
        else{
            const {categories, action} = data;

            if(action === "add"){
                await Promise.all(
                    categories.map(
                        categoryId => 
                            prismadb.productCategory.create({
                                data: {
                                    product: {connect: {id}},
                                    category: {connect: {id: categoryId}}
                                }
                            })
                    )
                );
            }
            else if(action === "remove"){
                await prismadb.$transaction(
                    categories.map(
                        categoryId =>
                            prismadb.productCategory.deleteMany({
                                where: {
                                    product_id: id,
                                    category_id: categoryId
                                }
                            })
                    )
                );
            }

            return new Response(
                JSON.stringify({
                    status: "success",
                    message: "Product categories modified successfully",
                    data: []
                }),
                {status: 200}
            )
        }
    }
    catch(error){
        return errorResponse(error);
    }
}

export async function getCategoriesOfProduct(id: string) {
    try{
        const categories = await prismadb.productCategory.findMany({
            where: {
                product_id: id
            },
            select: {
                category: true
            }
        });

        return new Response(
            JSON.stringify({
                status: "success",
                message: "Product categories retrieved successfully",
                data: categories
            }),
            {status: 200}
        )
    }
    catch(error){
        return errorResponse(error);
    }
}

//Retrieves both product list and products under categories
export async function getProducts(data: {categories?: string[], user_id?: string | null, filters?: Record<string, string>}) {
    try{
        const {categories, user_id} = data;
        
        if(user_id) {
            const productList = await prismadb.product.findMany({
                where: {
                    user_id
                }
            });
            
            return new Response(
                JSON.stringify({
                    status: "success",
                    message: "Products of user retrieved successfully",
                    data: productList
                }),
                {status: 200}
            )
        }
        else if(categories) {
            const productList = await prismadb.category.findMany({
                where: {}
            });
            
            return new Response(
                JSON.stringify({
                    status: "success",
                    message: "Product list matching categories, retrieved successfully",
                    data: productList
                }),
                {status: 200}
            )
        } 
        else {
            const where = buildPrismaProductFilter(data.filters || {});

            const productList = await prismadb.product.findMany(
                {
                    where,
                    include: {
                        user:{
                            select: {
                                id: true,
                                user_name: true,
                            }
                        }
                    }
                }
            );
            
            return new Response(
                JSON.stringify({
                    status: "success",
                    message: "Product list retrieved successfully",
                    data: productList
                }),
                {status: 200}
            )
        }
    }
    catch(error){
        return errorResponse(error);
    }
}

export function buildPrismaProductFilter(filters: Record<string, string>) {
    const where: any = {};

    if (filters.vendor_name) {
        where.user_name = {
            contains: filters.user_name,
            mode: "insensitive"
        };
    }

    if (filters.productStatus) where.productStatus = filters.productStatus;

    if (filters.minimum_earned) {
        where.earned = {
            gte: Number(filters.minimum_earned)
        };
    }

    if (filters.minimum_units_sold) {
        where.unitsSold = {
            gte: Number(filters.minimum_units_sold)
        };
    }

    if (filters.minimum_rating) {
        where.rating = {
            gte: Number(filters.minimum_rating)
        };
    }

    return where;
}