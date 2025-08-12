/* eslint-disable no-var */
import { PrismaClient } from '@prisma/client'
import { OrderStatus, Role, ProductStatus } from './enums';
import { Status } from '@prisma/client';

declare global {
  var client: PrismaClient | undefined; 

  interface ApiResponse<T> {
    message: string;
    status: "success" | "failure";
    data: T | null | undefined;
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
    image: Image;
  }

  interface Product {
    id: string;
    title?: string;
    description?: string;
    price?: number;
    quantity?: number;
    pendingOrderCount?: number;
    rating?: number;
    unitsSold?: number;
    earned?: number;
    productStatus?: string;
    user_id?: string;
    user: User;
    imagesURLs?: string[];
    images?: Image[];
  }

  interface Image {
    id: string;
    url: string;
    altText?: string;
    order?: number;    // display priority/order
    width?: number;    // pixels
    height?: number;    // pixels
    fileSize?: number;    // bytes
    product_id?: string;
    user_id?: string;
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
    id?: string;
    product_id: string;
    product_quantity: number;
    product?: Product;
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

    orderStatus: OrderStatus;
    createdAt?: DateTime;
    updatedAt?: DateTime;
    paidAt?: DateTime | null;

    isGuestUser: boolean;
    user?: User;
    address_id: string;

    items?: OrderItem[];
    sellerOrders?: SellerOrder[];
  }

  interface BuyerOrderPayload {
    cartItems?: {product_id: string, product_quantity: number}[],
    address: Address; 
  }

  interface SellerOrder {
    id: string;

    seller_id: string;
    buyer_id?: string | null;
    order_id: string;

    orderStatus: OrderStatus;
    createdAt?: DateTime;
    updatedAt?: DateTime;

    address_id: string;
    items?: OrderItem[];

    totalAmount?: number;
    buyer?: User;
  }

  interface OrderItem {
    id: string;

    order_id?: string;
    seller_order_id?: string;

    product_id?: string;
    product_name?: string;
    product_price?: number;
    product_quantity?: number;

    product_stock?: number;
    product_status?: ProductStatus;
  }
}

export {}
