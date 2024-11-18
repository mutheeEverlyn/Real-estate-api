import { Context } from "hono";
import { houseSpecificationsService, getHouseSpecificationsService, createHouseSpecificationsService, updateHouseSpecificationsService, deleteHouseSpecificationsService,houseSpecificationsData } from "./housespecification.service";

export const listHouseSpecifications= async (c: Context) => {
    try {

        const limit = Number(c.req.query('limit'))

        const data = await houseSpecificationsService(limit);
        if (data == null || data.length == 0) {
            return c.text("house specifications not found", 404)
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const getHouseSpecifications= async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const houseSpecifications = await getHouseSpecificationsService(id);
    if (houseSpecifications == undefined) {
        return c.text("house specifications not found", 404);
    }
    return c.json(houseSpecifications, 200);
}

export const getHouseSpecificationsData= async (c: Context) => {
    try {
        const data = await houseSpecificationsData();
        if (data == null || data.length == 0) {
            return c.text("house specifications not found", 404)
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}
export const createHouseSpecifications= async (c: Context) => {
    try {
        const houseSpecifications = await c.req.json();
        const createdHouseSpecifications = await createHouseSpecificationsService(houseSpecifications);


        if (!createdHouseSpecifications) return c.text("house specifications not created", 404);
        return c.json({ msg: createdHouseSpecifications}, 201);

    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const updateHouseSpecifications = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const houseSpecifications= await c.req.json();
    try {
        const searchedHouseSpecifications = await getHouseSpecificationsService(id);
        if (searchedHouseSpecifications == undefined) return c.text("house specifications not found", 404);
        const res = await updateHouseSpecificationsService(id, houseSpecifications);
        if (!res) return c.text("house specifications not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const deleteHouseSpecifications = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        const houseSpecifications = await getHouseSpecificationsService(id);
        if (houseSpecifications == undefined) return c.text("houseSpecifications not found", 404);

        const res = await deleteHouseSpecificationsService(id);
        if (!res) return c.text("house specifications not deleted", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}