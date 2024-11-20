import { Hono } from "hono";
import { listHouse, getHouse, createHouse, updateHouse, deleteHouse,house} from "./house.controller"
import { adminRoleAuth,userRoleAuth,userAdminRoleAuth} from "../middleware/bearAuth";
export const houseRouter = new Hono();


houseRouter.get("/house", userAdminRoleAuth, listHouse);
houseRouter.get("/house/:id",userAdminRoleAuth, getHouse);
houseRouter.post("/house",adminRoleAuth, createHouse);
houseRouter.put("/house/:id",adminRoleAuth, updateHouse);

houseRouter.delete("/house/:id",adminRoleAuth, deleteHouse);
//with
houseRouter.get("/houseData", userAdminRoleAuth, house);