import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import {locationBranchesTable, tsLocationBranches,tiLocationBranches} from "../drizzle/schema"


export const locationBranchesService = async (limit?: number):Promise<tsLocationBranches[]  | null> => {
    if (limit) {
        return await db.query.locationBranchesTable.findMany({
            limit: limit
        });
    }
    return await db.query.locationBranchesTable.findMany();
}

export const getLocationBranchesService = async (id: number) => {
    return await db.query.locationBranchesTable.findFirst({
        where: eq(locationBranchesTable.location_id, id)
    })
}
export const createLocationBranchesService = async (locationBranches:tiLocationBranches):Promise<string | null>  => {
    await db.insert(locationBranchesTable).values(locationBranches)
    return "locationBranches created successfully";
}

export const updateLocationBranchesService = async (id: number, locationBranches:tiLocationBranches):Promise<string | null>   => {
    await db.update(locationBranchesTable).set(locationBranches).where(eq(locationBranchesTable.location_id, id))
    return "locationBranches updated successfully";
}

export const deleteLocationBranchesService = async (id: number):Promise<string | null>  => {
    await db.delete(locationBranchesTable).where(eq(locationBranchesTable.location_id, id))
    return "locationBranches deleted successfully";
}
