import {z} from "zod";

export const createProductSchema = z.object({
    title: z.string().min(3),
    description: z.string().min(10),
    price: z.number()
});

export const updateProductSchema = z.object({
    title: z.string().min(3),
    description: z.string().min(10),
    price: z.number()
});

export const filterProductSchema = z.object({
    categories: z.array(z.string())
});