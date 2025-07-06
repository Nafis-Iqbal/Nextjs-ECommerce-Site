import prismadb from "@/prisma/prismadb";

import { errorResponse } from "@/utilities/utilities";

export async function createCategory(data: {title: string}) {
    try{
        const {title} = data;

        const newCategory = await prismadb.category.create({
            data: {
                title
            }
        });

        return new Response(
            JSON.stringify({
                status: "success",
                message: "Category created successfully",
                data: newCategory
            }),
            {status: 200}
        )
    }
    catch(error){
        return errorResponse(error);
    }
}

export async function getCategoryList() {
    try{
        const categoryList = await prismadb.category.findMany();

        return new Response(
            JSON.stringify({
                status: "success",
                message: "Category list retrieved successfully",
                data: categoryList
            }),
            {status: 200}
        )
    }
    catch(error){
        return errorResponse(error);
    }
}

export async function deleteCategory(id: string) {
    try{
        await prismadb.$transaction([
            prismadb.category.delete({
                where: {id}
            }),
            prismadb.productCategory.deleteMany({
                where: {
                    category_id: id
                }
            })
        ]);
        
        return new Response(
            JSON.stringify({
                status: "success",
                message: "Category deleted successfully",
                data: []
            }),
            {status: 200}
        )
    }
    catch(error){
        return errorResponse(error);
    }
}

export async function getProductsUnderCategory(id: string) {
    const productList = await prismadb.category.findUnique({
        where: { id },
        include: {
            productCategories: {
                include:{
                    product: true
                }
            }
        }
    });

    try{
        return new Response(
            JSON.stringify({
                status: "success",
                message: "Product list retrieved successfully",
                data: productList
            }),
            {status: 200}
        )
    }
    catch(error){
        return errorResponse(error);
    }
}