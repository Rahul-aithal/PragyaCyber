import { z } from "zod";

export const pieChartSchema = z.object({
  values: z.array(
    z.object({
      name: z.enum(["critical", "high", "medium", "low"]),
      value: z.number(),
    })
  ),
  image: z.string().optional(),
});

export const reportSchema = z.object({
  companyName: z.string().min(1, " Company name is required"),
  version: z.string().min(1, " Version is required"),
  author: z.string().min(1, " Author is required"),
  comment: z.string().optional(),
  date: z.date({
    required_error: " Date is required",
    invalid_type_error: " Invalid date format",
  }),
  summary: z.array(z.string().uuid()).optional(),
  securityTool: z.array(
    z.object({
      name: z.string().min(1, " Tool name is required"),
      desc: z.string().min(1, " Tool description is required"),
    })
  ),
  pieChart: pieChartSchema,
  web: z.boolean().default(true),
  api: z.boolean().default(false),
  chatbot: z.boolean().default(false),
  conclusion: z
    .array(
      z.object({
        name: z.string().optional(),
        desc: z.string().optional(),
      })
    )
    .optional(),
});

export type pieChartType = z.infer<typeof pieChartSchema>;

type reportType = z.infer<typeof reportSchema>;

export default reportType;
