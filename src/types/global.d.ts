/* eslint-disable no-var */
import { PrismaClient } from '@prisma/client'
import { Role } from './enums';
import { Status } from '@prisma/client';

declare global {
  var client: PrismaClient | undefined; 

  interface ApiResponse<T> {
    message: string;
    status: "success" | "failure";
    data: T[];
  }

  type UserData = {
    user_name: string;
    email: string;
    password: string;
    passwordConfirmation: string;
  }

  interface User {
    id: string;
    user_name: string;
    email: string;
    role: Role;
    emailVerified: Date;
  }

  interface Product {
    id: string;
    title?: string;
    description?: string;
    price?: number;
    quantity?: number;
    rating?: number;
    unitsSold?: number;
    earned?: number;
    productStatus?: string;
    user_id?: string;
    user: User;
  }

  interface Category {
    id: string;
    title: string;
  }

  interface Review {
    id?: string;
    description?: string;
    user_id?: string;
    product_id?: string;
  }

  interface CartItem {
    product_id: string;
    product_quantity: number;
  }

  interface Address {
    id: string;
    addressLine1: string;
    addressLine2?: string | null;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    phoneNumber: string;

    user_id?: string | null;
  }

  interface Order {
    id: string;
    totalAmount: number;

    orderStatus: Status;
    createdAt?: DateTime;
    updatedAt?: DateTime;
    paidAt?: DateTime | null;

    isGuestUser: boolean;
    user_id?: string | null;
    address_id: string;
  }

  interface SellerOrder {
    id: string;

    seller_id: string;
    buyer_id?: string | null;
    order_id: string;

    orderStatus: Status;
    createdAt?: DateTime;
    updatedAt?: DateTime;

    address_id: string;
  }
}

export {}
