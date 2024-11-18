import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { z } from 'zod';
import {houseTable, tsHouse,tiHouse,houseSpecificationsTable} from "../drizzle/schema"

const houseSchema=z.object({
rooms:z.number(),
bedrooms:z.number(),
year_built:z.number(),
color: z.string(),
features: z.string(),
images:z.string(),
rental_rate: z.number(),
availability: z.string()
})
type houseInfo=z.infer<typeof houseSchema>;
export const createHouseService=async(house:houseInfo):Promise<number|null>=>{
    const parsedData=houseSchema.parse(house);
    const houseRecord=await db.insert(houseSpecificationsTable).values({
    rooms:parsedData.rooms,
    bedrooms:parsedData.bedrooms,
    year_built:parsedData.year_built,
    color:parsedData.color,
    features:parsedData.features,
    }).returning({houseSpec_id:houseSpecificationsTable.houseSpec_id})
    const houseSpec_id=houseRecord[0]?.houseSpec_id;
    if(!houseSpec_id) return null;
    await db.insert(houseTable).values({
    houseSpec_id:houseSpec_id,
    rental_rate: parsedData.rental_rate,
    availability:parsedData.availability,
    images:parsedData.images,  
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
    })
    return houseSpec_id;
};
export const houseService = async (limit?: number):Promise<tsHouse[] | null> => {
    if (limit) {
        return await db.query.houseTable.findMany({
            limit: limit
        });
    }
    return await db.query.houseTable.findMany();
}

export const getHouseService = async (id: number)  => {
    return await db.query.houseTable.findFirst({
        where: eq(houseTable.house_id, id)
    })
}
//with
export const houseData= async () => {
    return await db.query.houseTable.findMany({
        columns:{
              house_id:true,
              rental_rate:true,
              availability:true,
              images:true,
              created_at:true,
              updated_at:true
        },
        with:{
            specification:{
                columns:{
                    bedrooms:true,
                    color:true,
                    features:true,
                    rooms:true,
                    year_built:true,
                }
            }
        }
    })
  
}

// export const createVehicleService = async (vehicle:tiVehicle):Promise<string | null>   => {
//     await db.insert(vehiclesTable).values(vehicle)
//     return "vehicle created successfully";
// }

export const updateHouseService = async (id: number, house:tiHouse):Promise<string | null>  => {
    await db.update(houseTable).set(house).where(eq(houseTable.house_id, id))
    return "house updated successfully";
}

export const deleteHouseService = async (id: number):Promise<string | null>  => {
    await db.delete(houseTable).where(eq(houseTable.house_id, id))
    return "house deleted successfully";
}
