import { z } from "zod";

export const emailSchema = z
  .email({ message: "Invalid email format" })
  .min(1, { message: "Email is required" });

export const passwordSchema = z.string().min(6).max(30);

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const registerSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
  });
