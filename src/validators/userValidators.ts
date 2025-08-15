import {z} from "zod";
import { Role } from "@/types/enums";

export const registerUserSchema = z.object({
    user_name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(8),
    passwordConfirmation: z.string()
}).refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords do not match",
    path: ["passwordConfirmation"],
});

export const loginUserSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8)
});

export const updateUserSchema = z.object({
    user_name: z.string().min(3).optional(),
    addressId: z.string().uuid().optional()
});

export const updateUserRoleSchema = z.object({
    role: z.nativeEnum(Role)
});

export const filterUsersSchema = z.object({
    minimum_spent: z.number().optional(),
    minimum_order_count: z.number().optional(),
    email: z.string().email().optional(),
});

export const filterVendorsSchema = z.object({
    minimum_earned: z.number().optional(),
    minimum_order_count: z.number().optional(),
    email: z.string().email().optional(),
});