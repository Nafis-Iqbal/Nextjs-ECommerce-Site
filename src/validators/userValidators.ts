import {z} from "zod";

export const registerUserSchema = z.object({
    user_name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(8),
    confirm_password: z.string()
}).refine((data) => data.password === data.confirm_password, {
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