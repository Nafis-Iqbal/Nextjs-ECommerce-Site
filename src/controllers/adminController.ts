import prismadb from "@/prisma/prismadb";

import { Role } from "@/types/enums";
import { errorResponse } from "@/utilities/utilities";

export async function updateUserRole(id: string, self_id: string, data: {role: Role}) {
    const {role} = data;

    try {
        //Careful with demoting MASTER ADMINS
        if(role !== Role.MASTER_ADMIN)
        {
            const masterAdminCount = await prismadb.user.count({
                where: {role: "MASTER_ADMIN"}
            });

            const userToUpdate = await prismadb.user.findUnique({
                where: {id}
            });
            
            //If altering a MASTER ADMIN's role
            if(userToUpdate?.role === Role.MASTER_ADMIN)
            {
                if(masterAdminCount <= 1)
                {
                    return new Response(
                        JSON.stringify({
                            status: "failed",
                            message: "Cannot update role. There must be atleast one MASTER ADMIN active.",
                            data: [],
                        }),
                        { status: 200 }
                    );
                }
                else if(self_id !== userToUpdate.id)
                {
                    return new Response(
                        JSON.stringify({
                            status: "failed",
                            message: "Cannot update role. Cannot demote other Master Admins.",
                            data: [],
                        }),
                        { status: 200 }
                    );
                }
            }
        }
        
        //Updating role
        const updatedUser = await prismadb.user.update({
            where: {id},
            data: {
                role
            }
        });

        return new Response(
            JSON.stringify({
                status: "success",
                message: "User role updated successfully",
                data: updatedUser,
            }),
            { status: 200 }
        );
    }
    catch(error) {
        return errorResponse(error);
    }
}