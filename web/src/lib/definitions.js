import { z } from "zod";

export const SignupFormSchema = z
  .object({
    username: z
      .string()
      .min(4, { message: "Username must be atleast 4 characters long" })
      .trim(),
    email: z
      .string()
      .email({ message: "Please enter a valid email" })
      .trim()
      .toLowerCase(),
    password: z
      .string()
      .min(8, { message: "Be at least 8 characters long" })
      .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
      .regex(/[0-9]/, { message: "Contain at least one number." })
      .regex(/[^a-zA-Z0-9]/, {
        message: "Contain at least one special character.",
      })
      .trim(),
    confirmPassword: z.string().trim(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
