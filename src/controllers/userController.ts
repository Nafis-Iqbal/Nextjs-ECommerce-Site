/* eslint-disable @typescript-eslint/no-explicit-any */
import prismadb from "@/prisma/prismadb";

import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

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

        const token = jwt.sign(
            {
                user_id: new_user.id,
                email: new_user.email,
                role: new_user.role
            },
            process.env.JWT_SECRET ?? "abc",
            {expiresIn: '1hr'}
        )
        
        if(new_user) {
            const {password_hashed, ...sanitized_user} = new_user;

            return new Response(
                JSON.stringify({
                    status: "success",
                    message: "User created successfully",
                    data: sanitized_user,
                    token: token
                }),
                { status: 200 }
            );
        }
    }
    catch(error) {
        return new Response("Internal server error", {status: 500});
    }
}

export async function getAllUsers() {
    try {
        const users = await prismadb.user.findMany({
            select: {
                id: true,
                user_name: true,
                email: true,
                role: true
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
        return new Response("Internal server error", {status: 500});
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
                role: true
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
        return new Response("Internal server error", {status: 500});
    }
}

export async function updateUserDetail(id: string, data: {user_name: string}) {
    const {user_name} = data;

    try {
        const updated_User = await prismadb.user.update({
            where: {id},
            data: {
                user_name
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
        return new Response("Internal server error", {status: 500});
    }
}

export async function deleteUserDetail(id: string) {
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

export async function loginUser(data: {email: string, password: string}) {
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
            
            return new Response(
                JSON.stringify({
                    status: "success",
                    message: "User logged in successfully",
                    data: sanitizedUser,
                    token: token
                }),
                { status: 200 }
            );
        }
    }
    catch(error) {
        return new Response("Internal server error", {status: 500});
    }
}

export async function logoutUser() {
    try {

    }
    catch(error) {
        return new Response("Internal server error", {status: 500});
    }
}