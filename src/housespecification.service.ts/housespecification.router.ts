import { Hono } from "hono";
import { listHouseSpecifications, getHouseSpecifications, createHouseSpecifications, updateHouseSpecifications, deleteHouseSpecifications,getHouseSpecificationsData} from "./housespecification.controller"
import { zValidator } from "@hono/zod-validator";
import { houseSpecificationsSchema } from "../validators";
import { adminRoleAuth,userRoleAuth,userAdminRoleAuth} from "../middleware/bearAuth";
export const houseSpecificationsRouter = new Hono();


houseSpecificationsRouter .get("/houseSpecifications",userAdminRoleAuth, listHouseSpecifications);
houseSpecificationsRouter .get("/houseSpecifications/:id",userAdminRoleAuth, getHouseSpecifications);
houseSpecificationsRouter .post("/houseSpecifications",zValidator('json',houseSpecificationsSchema,(result,c) =>{
    if(!result.success){
        return c.json(result.error,400)
    }
}),adminRoleAuth, createHouseSpecifications);
houseSpecificationsRouter .put("/houseSpecifications/:id",adminRoleAuth, updateHouseSpecifications);

houseSpecificationsRouter .delete("/houseSpecifications/:id",adminRoleAuth, deleteHouseSpecifications);
houseSpecificationsRouter .get("/houseSpecificationsData",userAdminRoleAuth, getHouseSpecificationsData);
