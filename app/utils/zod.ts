import { z } from "zod";

export const dataSchema = z.object({
    first_name: z.string({ required_error: "First name is required" }).min(2, "First name must be at least 2 characters"),
    last_name: z.string({ required_error: "Last name is required" }).min(2, "Last name must be at least 2 characters"),
    email: z.string({ required_error: "Email is required" }).email("Valid email address is required"),
});