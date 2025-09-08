import z from "zod";

export const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  number: z
    .string()
    .min(10, 'Phone number should be at least 10 digits')
    .max(12, 'Phone number should not exceed 15 digits'),
  message: z.string().min(1, 'Message is required'),
});