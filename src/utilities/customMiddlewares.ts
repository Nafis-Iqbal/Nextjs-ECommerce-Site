/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { Role } from "@prisma/client";

export function withAuth(handler: (req: Request, context: any) => Promise<Response>) {
    return async function(req: Request, context: any){
        const authHeader = req.headers.get('Authorization');
      
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return new NextResponse('Authentication token is missing or malformed', { status: 401 });
        }
        
        const token = authHeader.slice(7); // Remove "Bearer " prefix
        
        try {
            const decoded = jwt.verify(token ?? "", process.env.JWT_SECRET ?? "abc");
            if (decoded && typeof decoded !== "string") {
                const userData = decoded as { id: number; email: string; role: Role };
                (req as any).user = userData;

                return handler(req, context);
            }
            else{
                return new NextResponse(
                    JSON.stringify('Invalid or expired token'),
                    { status: 401 }
                );
            }
        }
        catch(error){
            return new NextResponse(
                JSON.stringify('Invalid or expired token'),
                { status: 401 }
            );
        }
    }
}

export function withAdminRole(handler: (req: Request, context: any) => Promise<Response>, accessType: Role) {
    return async function(req: Request, context: any){
        const authHeader = req.headers.get('Authorization');
      
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return new NextResponse('Authentication token is missing or malformed', { status: 401 });
        }
        
        const token = authHeader.slice(7); // Remove "Bearer " prefix
        
        try {
            const decoded = jwt.verify(token ?? "", process.env.JWT_SECRET ?? "abc");
            if (decoded && typeof decoded !== "string") {
                const userData = decoded as { id: number; email: string; role: Role };
                (req as any).user = userData;

                if(userData.role === accessType) {
                    return handler(req, context);
                }
                else {
                    return new NextResponse(
                        JSON.stringify('User role restricted from access.'),
                        { status: 401 }
                    );
                }
            }
            else{
                return new NextResponse(
                    JSON.stringify('Invalid or expired token'),
                    { status: 401 }
                );
            }
        }
        catch(error){
            return new NextResponse(
                JSON.stringify('Invalid or expired token'),
                { status: 401 }
            );
        }
    }
}