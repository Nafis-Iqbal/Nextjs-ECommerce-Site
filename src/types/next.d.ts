import { JWT } from 'jose';

declare global {
  namespace NodeJS {
    interface Global {
      user: JWT;
    }
  }
}

declare module 'next/server' {
  interface Request {
    user?: JWT; // Add 'user' to the Request interface
  }
}
