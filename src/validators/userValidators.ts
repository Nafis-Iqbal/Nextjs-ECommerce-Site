import {z} from "zod";
import { Role } from "@/types/enums";

export const registerUserSchema = z.object({
    user_name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(8),
    password_confirmation: z.string()
}).refine((data) => data.password === data.password_confirmation, {
    message: "Passwords do not match",
    path: ["confirm_password"],
});

export const loginUserSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8)
});

export const updateUserSchema = z.object({
    user_name: z.string().min(3)
});

export const updateUserRoleSchema = z.object({
    role: z.nativeEnum(Role)
});