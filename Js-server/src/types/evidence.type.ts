import { z } from "zod";

export const evidenceSchema = z.array(
  z.object({
    name: z.string().min(1, "Name cannot be empty"), // Ensures name is a non-empty string
    desc: z.string().min(1, "Description cannot be empty"),
    image: z.string().min(1, "Image link cannot be empty"),
  })
);

type evidenceType = z.infer<typeof evidenceSchema>;

export default evidenceType;
