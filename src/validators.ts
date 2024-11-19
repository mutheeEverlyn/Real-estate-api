import { z } from 'zod'

export const userSchema = z.object({
    full_name: z.string(),
    email: z.string(),
    contact_phone: z.string(),
    address:z.string(),
    password: z.string(),
    role: z.string(),
    created_at:z.string().optional(),
    updated_at:z.string().optional()
})
export const bookingsSchema = z.object({
    user_id: z.number(),
    house_id: z.number(),
    location_id: z.number(),
    booking_date: z.string().optional(),
    return_date: z.string().optional(),
    total_amount: z.number(),
    booking_status: z.string().optional(),
    created_at:z.string().optional(),
    updated_at:z.string().optional(),
})
export const paymentsSchema = z.object({
    booking_id: z.number(),
    amount: z.number(),
    payment_status: z.string(),
    payment_date: z.string().optional(),
    payment_method: z.string(),
    transaction_id: z.string().optional(),
    created_at:z.string().optional(),
    updated_at:z.string().optional()
})
export const customerSupportTicketsSchema=z.object({
    user_id:z.number(),
    subject:z.string(),
    description:z.string(),
    status:z.string(),
    created_at:z.string().optional(),
    updated_at:z.string().optional()
})
export const locationBranchesSchema = z.object({
    name: z.string(),
    address: z.string(),
    contact_phone:z.string(),
    created_at:z.string().optional(),
    updated_at:z.string().optional()
})
export const houseSpecificationsSchema=z.object({
    rooms: z.number(),
    bedrooms:z.number(),
    year_built:z.number(),
    color: z.string(),
    features: z.string(),
})