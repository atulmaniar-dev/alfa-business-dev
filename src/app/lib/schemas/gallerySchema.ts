import z from "zod";
export const GallerySchema = z.object({
  imageType: z.string().min(2).max(100),
  images: z.array(z.string().url()), 
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});
