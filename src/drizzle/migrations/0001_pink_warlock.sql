ALTER TABLE "house" RENAME COLUMN "vehicle_id" TO "house_id";--> statement-breakpoint
ALTER TABLE "bookings" DROP CONSTRAINT "bookings_house_id_house_vehicle_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bookings" ADD CONSTRAINT "bookings_house_id_house_house_id_fk" FOREIGN KEY ("house_id") REFERENCES "public"."house"("house_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
