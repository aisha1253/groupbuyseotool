import { UserRole, OrderStatus, MessageStatus } from "@prisma/client"

export type { UserRole, OrderStatus, MessageStatus }

export interface UserMetadata {
  role?: UserRole
  storeId?: string
}

