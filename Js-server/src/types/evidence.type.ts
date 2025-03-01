import { z } from "zod";

export const evidenceSchema = z.object({
  name: z
    .string()
    .min(1, "Name cannot be empty")
    .refine((val) => val && !val.includes("--") && !val.includes("';"), {
      message: "String contains potentially malicious characters",
    }), // Ensures name is a non-empty string
  desc: z.array(z.string()).optional(),
  image: z
    .string()
    .min(1, "Image link cannot be empty")
    ,
  extra: z
    .string()
    .optional()
  ,
});

type evidenceType = z.infer<typeof evidenceSchema>;

export default evidenceType;
