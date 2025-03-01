import { z } from "zod";

// Define Zod schema for validation
export const stepSchema = z.object({
  name: z
    .string()
    .optional()
    .refine((val) => val && !val.includes("--") && !val.includes("';"), {
      message: "String contains potentially malicious characters",
    }),
  pass: z.boolean().optional().default(false),
  fail: z.boolean().optional().default(false),
  noAns: z.boolean().optional().default(false),
});

export const testPerformedSchema = z.object({
  name: z.string(),
  step: z.array(stepSchema).optional(),
});

type testPerformedType = z.infer<typeof testPerformedSchema>;

export default testPerformedType;
