import z from "zod";

export const amenitiesSchema = z.object({
    amenitiesName : z.string().min(1, 'Amenities are required'),
    tag: z.string().min(1, 'Tag is required'),
    description: z.string().min(10, 'Description is required'),
    image: z.array(z.string().url({message: 'image must be a valid URL'})).min(1, 'At least one image is required').max(1, 'only one image required'),
    creditedAt: z.string().optional(),
    updatedAt: z.string().optional(),
})