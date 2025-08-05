import {z} from "zod";
import { OrderStatus } from "@/types/enums";

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

export const filterSellerOrdersSchema = z.object({
    orderStatus: z.nativeEnum(OrderStatus).optional(),
    orderBuyer_id: z.number().optional(),
    minimum_total_amount: z.number().optional(),
    orderBuyerName: z.string().optional(),
});