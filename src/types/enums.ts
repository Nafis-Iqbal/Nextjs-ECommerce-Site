export enum Role {
  MASTER_ADMIN = "MASTER_ADMIN",
  ADMIN = "ADMIN",
  USER = "USER"
}

// export enum OrderStatus {
//   PAYMENT_PENDING = "PAYMENT_PENDING",
//   PENDING = "PENDING",
//   SHIPPED = "SHIPPED",
//   FAILED = "FAILED",
//   CANCELLED = "CANCELLED",
//   COMPLETED = "COMPLETED"
// }

// src/types/enums.ts
export { OrderStatus } from "@prisma/client";

export enum OrderItemStatus {
  SUCCESS = "SUCCESS",
  FAILED = "FAILED"
}

export enum UserStatus {
  ACTIVE = "ACTIVE",
  BANNED = "BANNED",
  RESTRICTED = "RESTRICTED"
}

export enum PaymentStatus {
  UNPAID = "UNPAID",
  PAID = "PAID",
}

export enum PaymentMethod {
  CASH_ON_DELIVERY = "CASH_ON_DELIVERY",
  BKASH = "BKASH",
  CREDIT_CARD = "CREDIT_CARD",
  DEBIT_CARD = "DEBIT_CARD",
  BANK_TRANSFER = "BANK_TRANSFER",
}

export enum ProductStatus {
  IN_STOCK = "IN_STOCK",
  OUT_OF_STOCK = "OUT_OF_STOCK",
  SUSPENDED = "SUSPENDED",
  BANNED = "BANNED"
}

export enum ComplaintStatus {
  PENDING = "PENDING",
  UNDER_REVIEW = "UNDER_REVIEW",
  UNSOLVED = "UNSOLVED",
  SOLVED = "SOLVED",
  CLOSED = "CLOSED"
}

export enum Priority {
  NORMAL = "NORMAL",
  URGENT = "URGENT"
}