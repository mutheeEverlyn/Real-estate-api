import { pgTable, pgEnum, serial, text, integer, timestamp, varchar } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const roleEnum = pgEnum("role", ["admin", "user", "userAdminRoleAuth"]);

// Users Table
export const usersTable = pgTable("users", {
  user_id: serial("user_id").primaryKey(),
  full_name: text("full_name"),
  email: varchar("email", { length: 255 }).unique(),
  contact_phone: text("contact_phone"),
  address: text("address"),
  role: roleEnum("role").default("user"),
  created_at: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
  updated_at: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
});
// Location and Branches Table
export const locationBranchesTable = pgTable("location_branches", {
  location_id: serial("location_id").primaryKey(),
  name: text("name"),
  address: text("address"),
  contact_phone: text("contact_phone"),
  created_at: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
  updated_at: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
});
// house Specifications Table
export const houseSpecificationsTable = pgTable("house_specifications", {
  houseSpec_id: serial("houseSpec_id").primaryKey(),
  rooms: integer("rooms"),
  bedrooms:integer("bedrooms"),
  year_built:integer("year_built"),
  color: text("color"),
  features: text("features"),
});
// house Table
export const houseTable = pgTable("house", {
  house_id: serial("house_id").primaryKey(),
  houseSpec_id: integer("houseSpec_id").notNull().references(() => houseSpecificationsTable.houseSpec_id, { onDelete: "cascade" }),
  rental_rate: integer("rental_rate"),
  availability: text("availability"),
  images:text("images"),
  created_at: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
  updated_at: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
});
// Bookings Table
export const bookingsTable = pgTable("bookings", {
  booking_id: serial("booking_id").primaryKey(),
  user_id: integer("user_id").notNull().references(() => usersTable.user_id, { onDelete: "cascade" }),
  house_id: integer("house_id").notNull().references(() => houseTable.house_id, { onDelete: "cascade" }),
  location_id: integer("location_id").notNull().references(() => locationBranchesTable.location_id, { onDelete: "cascade" }),
  booking_date: timestamp("booking_date", { mode: "string" }),
  ending_date: timestamp("ending_date", { mode: "string" }),
  total_amount: integer("total_amount"),
  booking_status: text("booking_status").default("pending"),
  created_at: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
  updated_at: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
});

// Payments Table
export const paymentsTable = pgTable("payments", {
  payment_id: serial("payment_id").primaryKey(),
  booking_id: integer("booking_id").notNull().references(() => bookingsTable.booking_id, { onDelete: "cascade" }),
  amount: integer("amount"),
  payment_status: text("payment_status").default("pending"),
  payment_date: timestamp("payment_date").notNull().defaultNow(),
  payment_method: text("payment_method"),
  transaction_id: text("transaction_id"),
  created_at: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
  updated_at: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
});
// Customer Support Tickets Table
export const customerSupportTicketsTable = pgTable("customer_support_tickets", {
  ticket_id: serial("ticket_id").primaryKey(),
  user_id: integer("user_id").notNull().references(() => usersTable.user_id, { onDelete: "cascade" }),
  subject: text("subject"),
  description: text("description"),
  status: text("status"),
  created_at: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
  updated_at: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
});
// Authentication Table
export const AuthOnUsersTable = pgTable("auth_on_users", {
    auth_id: serial("auth_id").primaryKey(),
    user_id: integer("user_id").notNull().references(() => usersTable.user_id, { onDelete: "cascade" }),
    password: varchar("password", { length: 100 }),
    created_at: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
    updated_at: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
  });

  export const AuthOnUsersRelations = relations(usersTable, ({ one }) => ({
    user: one(AuthOnUsersTable, {
        fields: [usersTable.user_id],
        references: [AuthOnUsersTable.user_id]
    })
  }));
  // house Relationships
export const houseRelations = relations(houseTable, ({ one }) => ({
  specification: one(houseSpecificationsTable, {
    fields: [houseTable.houseSpec_id],
    references: [houseSpecificationsTable.houseSpec_id],
  }),
}));
  
  // Bookings Relationships
export const bookingsRelations = relations(bookingsTable, ({ one, many }) => ({
  user: one(usersTable, {
    fields: [bookingsTable.user_id],
    references: [usersTable.user_id],
  }),
  house: one(houseTable, {
    fields: [bookingsTable.house_id],
    references: [houseTable.house_id],
  }),
  location: one(locationBranchesTable, {
    fields: [bookingsTable.location_id],
    references: [locationBranchesTable.location_id],
  }),
}));

// Payments Relationships
export const paymentsRelations = relations(paymentsTable, ({ one }) => ({
  booking: one(bookingsTable, {
    fields: [paymentsTable.booking_id],
    references: [bookingsTable.booking_id],
  }),
}));

// Customer Support Tickets Relationships
export const customerSupportTicketsRelations = relations(customerSupportTicketsTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [customerSupportTicketsTable.user_id],
    references: [usersTable.user_id],
  }),
}));

export type tiUsers = typeof usersTable.$inferInsert;
export type tsUsers = typeof usersTable.$inferSelect;
export type tiAuthOnUsers = typeof AuthOnUsersTable.$inferInsert;
export type tsAuthOnUsers = typeof AuthOnUsersTable.$inferSelect;
export type tiHouse = typeof houseTable.$inferInsert;
export type tsHouse = typeof houseTable.$inferSelect;
export type tiBookings = typeof bookingsTable.$inferInsert;
export type tsBookings = typeof bookingsTable.$inferSelect;
export type tiPayments = typeof paymentsTable.$inferInsert;
export type tsPayments = typeof paymentsTable.$inferSelect;
export type tiCustomerSupportTickets = typeof customerSupportTicketsTable.$inferInsert;
export type tsCustomerSupportTickets = typeof customerSupportTicketsTable.$inferSelect;
export type tiLocationBranches = typeof locationBranchesTable.$inferInsert;
export type tsLocationBranches = typeof locationBranchesTable.$inferSelect;
export type tiHouseSpecifications = typeof houseSpecificationsTable.$inferInsert;
export type tsHouseSpecifications = typeof houseSpecificationsTable.$inferSelect;