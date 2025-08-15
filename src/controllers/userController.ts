/* eslint-disable @typescript-eslint/no-explicit-any */
import prismadb from "@/prisma/prismadb";

import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import {serialize} from "cookie";
import { errorResponse } from "@/utilities/utilities";

export async function createUser(data: {user_name: string, email: string, password: string, password_confirmation: string}) {
    try {
        const {user_name, email, password} = data;
        
        const existingUser = await prismadb.user.findUnique({
            where: {email}
        });
        
        if(existingUser){
            return new Response(
                JSON.stringify({
                    status: "failed",
                    message: "Email already in use.",
                    data: []
                }),
                {status: 401}
            )
        }

        const password_hashed = await bcrypt.hash(password, 10);

        const user_count = await prismadb.user.count();

        const role = user_count === 0 ? 'MASTER_ADMIN' : undefined;

        const new_user = await prismadb.user.create({
            data: {
                user_name,
                email,
                password_hashed,
                ...(role && {role})
            },
        });
        
        if(new_user) {
            const {password_hashed, ...sanitized_user} = new_user;

            return new Response(
                JSON.stringify({
                    status: "success",
                    message: "User created successfully",
                    data: sanitized_user,
                }),
                { status: 200 }
            );
        }
    }
    catch(error) {
        return errorResponse(error);
    }
}

export async function getUserDetail(self: boolean, id: string) {
    try {
        const user_detail = await prismadb.user.findUnique({
            where: {id},
            select: {
                id: true,
                user_name: true,
                email: true,
                role: true,
                userStatus: true,
                paymentStatus: true,
                spent: true,
                earned: true,
                orderCount: true,
                createdAt: true,
                addressId: true
            }
        });

        if(!user_detail){
            return new Response(
                JSON.stringify({
                    status: "success",
                    message: "No user found with given id",
                    data: []
                }),
                { status: 200 }
            );
        }
        else{
            return new Response(
                JSON.stringify({
                    status: "success",
                    message: "Users detail retrieved successfully",
                    data: user_detail
                }),
                { status: 200 }
            );
        }
    }
    catch(error) {
        return errorResponse(error);
    }
}

export async function updateUserDetail(id: string, data: {user_name: string, addressId: string}) {
    const {user_name, addressId} = data;

    try {
        const updated_User = await prismadb.user.update({
            where: {id},
            data: {
                user_name,
                addressId
            }
        });

        return new Response(
            JSON.stringify({
                status: "success",
                message: "User updated successfully",
                data: updated_User
            }),
            { status: 200 }
        );
    }
    catch(error) {
        return errorResponse(error);
    }
}

export async function deleteUser(id: string) {
    try {
        const deleted_User = await prismadb.user.delete({
            where: {
                id,
                role: {
                    not: 'MASTER_ADMIN'
                }
            }
        })

        return new Response(
            JSON.stringify({
                status: "success",
                message: "User deleted successfully",
                data: deleted_User
            }),
            { status: 200 }
        );
    }
    catch(error) {
        return new Response("Internal server error, or trying to delete Master Admin", {status: 500});
    }
}

export async function getUsers(filters: Record<string, string>) {
    try {
        const where = buildPrismaUserFilter(filters);

        const users = await prismadb.user.findMany({
            where,
            select: {
                id: true,
                user_name: true,
                email: true,
                role: true,
                emailVerified: true
            }
        });

        return new Response(
            JSON.stringify({
                status: "success",
                message: "Users retrieved successfully",
                data: users
            }),
            { status: 200 }
        );
    }
    catch(error) {
        return errorResponse(error);
    }
}

export function buildPrismaUserFilter(filters: Record<string, string>) {
    const where: any = {};

    if (filters.user_name) {
        where.user_name = {
            contains: filters.user_name,
            mode: "insensitive"
        };
    }

    if (filters.role) where.role = filters.role;

    if (filters.email) {
        where.email = {
            contains: filters.email,
            mode: "insensitive"
        };
    }

    if (filters.emailVerified === "true" || filters.emailVerified === "false") {
        where.emailVerified = filters.emailVerified === "true";
    }

    if (filters.minimum_spent) {
        where.spent = {
            gte: Number(filters.minimum_spent)
        };
    }

    if (filters.minimum_order_count) {
        where.orderCount = {
            gte: Number(filters.minimum_order_count)
        };
    }

    return where;
}

//Probably don't need it.
export async function loginUserOld(data: {email: string, password: string}) {
    try {
        const {email, password} = data;
        
        const existingUser = await prismadb.user.findUnique({
            where: {email}
        });
        
        if(!existingUser){
            return new Response(
                JSON.stringify({
                    status: "failed",
                    message: "Email doesn't exist.",
                    data: []
                }),
                {status: 400}
            )
        }

        if(!existingUser.password_hashed){
            return new Response(
                JSON.stringify({
                    status: "failed",
                    message: "This account does not have a password. Please sign in with Google/Facebook.",
                    data: []
                }),
                {status: 400}
            )
        }
        
        const password_match = await bcrypt.compare(password, existingUser.password_hashed);
        
        if(!password_match){
            return new Response(
                JSON.stringify({
                    status: "failed",
                    message: "Wrong email or password.",
                    data: []
                }),
                {status: 400}
            )
        }
        
        const token = jwt.sign(
            {
                user_id: existingUser.id,
                email: existingUser.email,
                role: existingUser.role
            },
            process.env.JWT_SECRET ?? "abc",
            {expiresIn: '1hr'}
        )

        if(existingUser) {
            const {password_hashed, ...sanitizedUser} = existingUser;

            const cookie = serialize('session-token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                path: '/',
                maxAge: 60 * 60, // 1 hour in seconds
            });
            
            return new Response(
                JSON.stringify({
                    status: "success",
                    message: "User logged in successfully",
                    data: sanitizedUser,
                }),
                { 
                    status: 200,
                    headers: {
                        'Set-Cookie': cookie
                    }
                }
            );
        }
    }
    catch(error) {
        return errorResponse(error);
    }
}

export async function logoutUserOld() {
    try {

    }
    catch(error) {
        return errorResponse(error);
    }
}

export async function createUserOld(data: {user_name: string, email: string, password: string, password_confirmation: string}) {
    try {
        const {user_name, email, password} = data;
        
        const existingUser = await prismadb.user.findUnique({
            where: {email}
        });
        
        if(existingUser){
            return new Response(
                JSON.stringify({
                    status: "failed",
                    message: "Email already in use.",
                    data: []
                }),
                {status: 401}
            )
        }

        const password_hashed = await bcrypt.hash(password, 10);

        const user_count = await prismadb.user.count();

        const role = user_count === 0 ? 'MASTER_ADMIN' : undefined;

        const new_user = await prismadb.user.create({
            data: {
                user_name,
                email,
                password_hashed,
                ...(role && {role})
            },
        });

        // const token = jwt.sign(
        //     {
        //         user_id: new_user.id,
        //         email: new_user.email,
        //         role: new_user.role
        //     },
        //     process.env.JWT_SECRET ?? "abc",
        //     {expiresIn: '1hr'}
        // )
        
        if(new_user) {
            const {password_hashed, ...sanitized_user} = new_user;

            return new Response(
                JSON.stringify({
                    status: "success",
                    message: "User created successfully",
                    data: sanitized_user,
                }),
                { status: 200 }
            );

            // Cookie auth implementation
            // const cookie = serialize('session-token', token, {
            //     httpOnly: true,
            //     secure: process.env.NODE_ENV === 'production',
            //     sameSite: 'lax',
            //     path: '/',
            //     maxAge: 60 * 60, // 1 hour in seconds
            // });

            // return new Response(
            //     JSON.stringify({
            //         status: "success",
            //         message: "User created successfully",
            //         data: sanitized_user,
            //     }),
            //     { 
            //         status: 200,
            //         headers: {
            //             'Set-Cookie': cookie
            //         }
            //     }
            // );
        }
    }
    catch(error) {
        return errorResponse(error);
    }
}