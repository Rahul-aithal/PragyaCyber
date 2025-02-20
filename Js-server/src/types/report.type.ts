import { z } from "zod";

export const reportSchema = z.object({
  companyName: z.string().min(1, " Company name is required"),
  version: z.string().min(1, " Version is required"),
  Author: z.string().min(1, " Author is required"),
  Comment: z.string().optional(),
  Date: z.date({
    required_error: " Date is required",
    invalid_type_error: " Invalid date format",
  }),
  targetScopeTable: z.array(z.string().uuid()).optional(), // Assuming ObjectId is stored as a string
  userDeatialTable: z.array(z.string().uuid()).optional(),
  summary: z.array(z.string().uuid()).optional(),
  securityTool: z.array(
    z.object({
      name: z.string().min(1, " Tool name is required"),
      desc: z.string().min(1, " Tool description is required"),
    })
  ),
  pieChart: z
    .object({
      values: z.array(
        z.object({
          name: z.string().nonempty(),
          value: z.number(),
        })
      ),
      image: z.string().optional(),
    })
    .optional(),
  criticals: z.array(z.string().uuid()).optional(),
  highs: z.array(z.string().uuid()).optional(),
  mediums: z.array(z.string().uuid()).optional(),
  low: z.array(z.string().uuid()).optional(),
  web: z.boolean().default(true),
  api: z.boolean().default(false),
  chatbot: z.boolean().default(false),
  vulnerabilities: z.array(z.any()).optional(),
  testPerfom: z.array(z.any()).optional(),
  conclusion: z
    .array(
      z.object({
        name: z.string().optional(),
        desc: z.string().optional(),
      })
    )
    .optional(),
});

type reportType = z.infer<typeof reportSchema>;

export default reportType;
