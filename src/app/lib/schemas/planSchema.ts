import { z } from 'zod';

export const planSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }).optional(),
 
   monthlyPrice: z.coerce.number().min(0).positive({ message: "Monthly price must be a positive number" }),
 
  yearlyPrice: z.coerce.number().min(0).positive({ message: "Yearly price must be a positive number" }),

  monthlyFeatures: z.array(z.string().min(3, { message: "Each monthly feature must be at least 3 characters" })).optional(),
  yearlyFeatures: z.array(z.string().min(3, { message: "Each yearly feature must be at least 3 characters" })).optional(),

  images: z.array(z.string().url({ message: "Each image must be a valid URL" }))
    .min(1, { message: "At least one image is required" })
    .max(5, { message: "Maximum 5 images allowed" }),

  available: z.boolean().default(true),
  popular: z.boolean().default(false),


  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});
