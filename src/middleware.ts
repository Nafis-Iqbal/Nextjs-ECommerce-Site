/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(req: Request) {
  if(process.env.MIDDLEWARE_DISABLED === 'true'){
    return NextResponse.next();
  }

  const authHeader = req.headers.get('Authorization');
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return new NextResponse('Authentication token is missing or malformed', { status: 401 });
  }

  const token = authHeader.slice(7); // Remove "Bearer " prefix

  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET || 'secret'));

    (req as any).user = payload; // Optionally store user info in the request for later use in handlers

    return NextResponse.next();
  } catch (error) {
    return new NextResponse('Invalid or expired token', { status: 401 });
  }
}

export const config = {
    matcher: [],
};