import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import {houseSpecificationsTable, tsHouseSpecifications,tiHouseSpecifications} from "../drizzle/schema"


export const houseSpecificationsService = async (limit?: number):Promise<tsHouseSpecifications[] | null> => {
    if (limit) {
        return await db.query.houseSpecificationsTable.findMany({
            limit: limit
        });
    }
    return await db.query.houseSpecificationsTable.findMany();
}

export const getHouseSpecificationsService = async (id: number) => {
    return await db.query.houseSpecificationsTable.findFirst({
        where: eq(houseSpecificationsTable.houseSpec_id, id)
    })
}
//with columns
export const houseSpecificationsData = async () => {
    return await db.query.houseSpecificationsTable.findMany({
        columns:{
            bedrooms:true,
            color:true,
            year_built:true,
            features:true,
            rooms:true,
        }
    });
}
export const createHouseSpecificationsService = async (houseSpecifications:tiHouseSpecifications):Promise<string | null>  => {
    await db.insert(houseSpecificationsTable).values(houseSpecifications)
    return "house specifications created successfully";
}

export const updateHouseSpecificationsService = async (id: number, houseSpecifications: tiHouseSpecifications):Promise<string | null> => {
    await db.update(houseSpecificationsTable).set(houseSpecifications).where(eq(houseSpecificationsTable.houseSpec_id, id))
    return "house specifications updated successfully";
}

export const deleteHouseSpecificationsService = async (id: number):Promise<string | null> => {
    await db.delete(houseSpecificationsTable).where(eq(houseSpecificationsTable.houseSpec_id, id))
    return "house specifications deleted successfully";
}
