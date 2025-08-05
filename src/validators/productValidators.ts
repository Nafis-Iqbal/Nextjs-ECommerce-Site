import {z} from "zod";
import { ProductStatus } from "@/types/enums";

export const createProductSchema = z.object({
    title: z.string().min(3),
    description: z.string().min(10),
    price: z.number(),
    quantity: z.number()
});

export const updateProductSchema = z.object({
    title: z.string().min(3).optional(),
    description: z.string().min(10).optional(),
    price: z.number().optional(),
    quantity: z.number().optional(),
});

export const filterProductSchema = z.object({
    categories: z.array(z.string())
});

export const filterProductsSchema = z.object({
    productStatus: z.nativeEnum(ProductStatus).optional(),
    vendor_name: z.string().optional(),
    minimum_earned: z.number().optional(),
    minimum_units_sold: z.number().optional(),
    minimum_rating: z.number().optional(),
});