import { z } from 'zod';

export const bookTourSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  email: z.string().email('Invalid email'),
  number: z.string().min(1, 'Phone number is required'),
  preferredDate: z.string().min(1, 'Date is required'),
  preferredTime: z.string().min(1, 'Time is required'),
  status: z.enum(['pending', 'approved']).default('pending'),
  message: z.string().optional(),
});
