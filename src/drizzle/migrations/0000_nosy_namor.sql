DO $$ BEGIN
 CREATE TYPE "public"."role" AS ENUM('admin', 'user', 'userAdminRoleAuth');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "auth_on_users" (
	"auth_id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"password" varchar(100),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "bookings" (
	"booking_id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"house_id" integer NOT NULL,
	"location_id" integer NOT NULL,
	"booking_date" timestamp,
	"return_date" timestamp,
	"total_amount" integer,
	"booking_status" text DEFAULT 'pending',
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "customer_support_tickets" (
	"ticket_id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"subject" text,
	"description" text,
	"status" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "house_specifications" (
	"houseSpec_id" serial PRIMARY KEY NOT NULL,
	"rooms" integer,
	"bedrooms" integer,
	"year_built" integer,
	"color" text,
	"features" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "house" (
	"vehicle_id" serial PRIMARY KEY NOT NULL,
	"houseSpec_id" integer NOT NULL,
	"rental_rate" integer,
	"availability" text,
	"images" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "location_branches" (
	"location_id" serial PRIMARY KEY NOT NULL,
	"name" text,
	"address" text,
	"contact_phone" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "payments" (
	"payment_id" serial PRIMARY KEY NOT NULL,
	"booking_id" integer NOT NULL,
	"amount" integer,
	"payment_status" text DEFAULT 'pending',
	"payment_date" timestamp DEFAULT now() NOT NULL,
	"payment_method" text,
	"transaction_id" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"user_id" serial PRIMARY KEY NOT NULL,
	"full_name" text,
	"email" varchar(255),
	"contact_phone" text,
	"address" text,
	"role" "role" DEFAULT 'user',
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "auth_on_users" ADD CONSTRAINT "auth_on_users_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bookings" ADD CONSTRAINT "bookings_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bookings" ADD CONSTRAINT "bookings_house_id_house_vehicle_id_fk" FOREIGN KEY ("house_id") REFERENCES "public"."house"("vehicle_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bookings" ADD CONSTRAINT "bookings_location_id_location_branches_location_id_fk" FOREIGN KEY ("location_id") REFERENCES "public"."location_branches"("location_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "customer_support_tickets" ADD CONSTRAINT "customer_support_tickets_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "house" ADD CONSTRAINT "house_houseSpec_id_house_specifications_houseSpec_id_fk" FOREIGN KEY ("houseSpec_id") REFERENCES "public"."house_specifications"("houseSpec_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "payments" ADD CONSTRAINT "payments_booking_id_bookings_booking_id_fk" FOREIGN KEY ("booking_id") REFERENCES "public"."bookings"("booking_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
