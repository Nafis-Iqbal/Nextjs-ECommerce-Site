import {z} from "zod";

export const createAddressSchema = z.object({
    addressLine1: z.string(),
    city: z.string(),
    state: z.string(),
    postalCode: z.string(),
    country: z.string(),
    phoneNumber: z.string()
});

export const createUserOrderSchema = z.object({
    cartItems: z.array(z.object({
        product_id: z.string(), 
        product_quantity: z.number()
    }))
});

export const createGuestOrderSchema = z.object({
    cartItems: z.array(z.object({
        product_id: z.string(), 
        product_quantity: z.number()
    })),
    address: z.object({
        addressLine1: z.string(),
		city: z.string(),
		state: z.string(),
		postalCode: z.string(),
		country: z.string(),
		phoneNumber: z.string()
    })
});

export const updateOrderStatusSchema = z.object({
    orderStatus: z.enum(["CANCELLED", "PENDING"])
}).strict()

export const updateSellerOrderStatusSchema = z.object({
    orderStatus: z.enum(["FAILED", "PENDING", "SHIPPED", "COMPLETED"])
}).strict()