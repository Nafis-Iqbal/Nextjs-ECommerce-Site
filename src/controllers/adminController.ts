import prismadb from "@/prisma/prismadb";
import { NextResponse } from "next/server";
import { Role } from "@/types/enums";

export async function updateUserRole(id: string, data: {role: Role}) {
    const {role} = data;

    try {
        const updatedUser = await prismadb.user.update({
            where: {id},
            data: {
                role
            }
        });

        return new Response(
            
        );
    }
    catch(error) {
        return new Response("Internal server error", {status: 500});
    }
}