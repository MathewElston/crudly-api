import { z } from "zod";

export const SignupFormSchema = z.object({
  username: z
    .string()
    .min(4, { message: "Username must be atleast 4 characters long" })
    .trim(),
  email: z.email({ message: "Please enter a valid email" }).trim(),
  password: z
    .string()
    .min(8, { message: "Must be atleast 8 characters long" })
    .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
    .regex(/[0-9]/, { message: "Contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Contain at least one special character.",
    })
    .trim(),
});
