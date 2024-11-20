import { Context } from "hono";
import { houseService, getHouseService, createHouseService, updateHouseService, deleteHouseService,houseData } from "./house.service";

export const listHouse= async (c: Context) => {
    try {

        const limit = Number(c.req.query('limit'))

        const data = await houseService(limit);
        if (data == null || data.length == 0) {
            return c.text("house not found", 404)
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const getHouse = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const house = await getHouseService(id);
    if (house == undefined) {
        return c.text("house not found", 404);
    }
    return c.json(house, 200);
}
//with
export const house= async (c: Context) => {
    try {
        const data = await houseData();
        console.log(data)
        if (data == null || data.length == 0) {
            return c.text("house not found", 404)
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}
export const createHouse= async (c: Context) => {
    try {
        const house = await c.req.json();
        const createdHouse= await createHouseService(house);


        if (!createdHouse) return c.text("house not created", 404);
        return c.json({ msg: createdHouse}, 201);

    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const updateHouse = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const house= await c.req.json();
    try {
        const searchedHouse = await getHouseService(id);
        if (searchedHouse == undefined) return c.text("house not found", 404);
        const res = await updateHouseService(id, house);
        if (!res) return c.text("house not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const deleteHouse = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        const house = await getHouseService(id);
        if (house== undefined) return c.text("house not found", 404);
        const res = await deleteHouseService(id);
        if (!res) return c.text("house not deleted", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}