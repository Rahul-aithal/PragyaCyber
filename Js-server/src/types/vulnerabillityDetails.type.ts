import z from "zod";

export const vulnerabilityDetailSchema = z.object({
  name: z.string().refine((val) => !val.includes("--") && !val.includes("';"), {
    message: "String contains potentially malicious characters",
  }),
  desc: z.string(),
  impacts: z.array(
    z.object({
      name: z
        .string()
        .min(1, "Name cannot be empty")
        .refine((val) => !val.includes("--") && !val.includes("';"), {
          message: "String contains potentially malicious characters",
        }), // Ensures name is a non-empty string
      desc: z.string().min(1, "Description cannot be empty"), // Ensures desc is a non-empty string
    })
  ),
  cvssScore: z.number(),
  mitigations: z.array(
    z.object({
      name: z.string().min(1, "Name cannot be empty"), // Ensures name is a non-empty string
      desc: z.string().min(1, "Description cannot be empty"), // Ensures desc is a non-empty string
    })
  ),
  evidences: z.string().array().min(1),
  type: z.enum(["criticals", "highs", "mediums", "lows"]),
});

type vulnerabilityDetailType = z.infer<typeof vulnerabilityDetailSchema>;

export default vulnerabilityDetailType;
