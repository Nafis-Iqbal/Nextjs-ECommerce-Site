import {z} from "zod";

export const addCartItemSchema = z.object({
    product_id: z.string().min(3),
    product_quantity: z.number()
});

export const updateCartItemSchema = z.object({
    product_quantity: z.number()
});