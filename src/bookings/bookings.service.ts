import {  eq } from "drizzle-orm";
import db from "../drizzle/db";
import {bookingsTable, tsBookings,tiBookings} from "../drizzle/schema"


export const  bookingsService = async (limit?: number) => {
    if (limit) {
        return await db.query.bookingsTable.findMany({
            limit: limit
        });
    }
    return await db.query.bookingsTable.findMany();
}

export const getBookingsService = async (id: number) => {
    return await db.query.bookingsTable.findFirst({
        where: eq(bookingsTable.booking_id, id)
    })
}

export const bookingsData= async ()  => {
    return await db.query.bookingsTable.findMany({
        columns:{
            booking_id:true,
            location_id:true,
            user_id:true,
            house_id:true,
          booking_date:true,
          ending_date:true,
          total_amount:true,
          booking_status:true,
          created_at:true,
          updated_at:true
        },with:{
           house:{
                columns:{
                 rental_rate:true,
                 availability:true,
                 created_at:true,
                 updated_at:true
                }
            },
           user:{
                columns:{
                   address:true,
                   email:true,
                   contact_phone:true,
                   full_name:true,
                   created_at:true,
                   updated_at:true
                }
            },
            location:{
                columns:{
                    name:true,
                    address:true,
                    contact_phone:true,
                    created_at:true,
                    updated_at:true
                }
            }
        }
    })
}

export const createBookingsService = async ( bookings:tiBookings):Promise<string | null>  => {
    await db.insert(bookingsTable).values( bookings)
    return "bookings created successfully";
}

export const updateBookingsService = async (id: number,  bookings: tiBookings):Promise<string | null>  => {
    await db.update(bookingsTable).set(bookings).where(eq(bookingsTable.booking_id, id))
    return "bookings updated successfully";
}

export const deleteBookingsService = async (id: number):Promise<string | null>  => {
    await db.delete(bookingsTable).where(eq(bookingsTable.booking_id, id))
    return "bookings deleted successfully";
}
