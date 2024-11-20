import { Hono } from "hono";
import { listCustomerSupportTickets, getCustomerSupportTickets, createCustomerSupportTickets, updateCustomerSupportTickets, deleteCustomerSupportTickets,customerSupportTickets} from "./customerSupportTickets.controller"
import { zValidator } from "@hono/zod-validator";
import { customerSupportTicketsSchema } from "../validators";
import { adminRoleAuth,userRoleAuth,userAdminRoleAuth} from "../middleware/bearAuth";
export const customerSupportTicketsRouter = new Hono();


customerSupportTicketsRouter.get("/customerSupportTickets",userAdminRoleAuth, listCustomerSupportTickets);

customerSupportTicketsRouter.get("/customerSupportTicketsData",userAdminRoleAuth, customerSupportTickets);

customerSupportTicketsRouter.get("/customerSupportTickets/:id",userAdminRoleAuth, getCustomerSupportTickets)

customerSupportTicketsRouter.post("/customerSupportTickets",zValidator('json',customerSupportTicketsSchema,(result,c) =>{
    if(!result.success){
        return c.json(result.error,400)
    }
}), userRoleAuth,createCustomerSupportTickets)

customerSupportTicketsRouter.put("/customerSupportTickets/:id",userAdminRoleAuth, updateCustomerSupportTickets)

customerSupportTicketsRouter.delete("/customerSupportTickets/:id",adminRoleAuth, deleteCustomerSupportTickets)
