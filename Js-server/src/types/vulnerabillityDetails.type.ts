import z from "zod";

export const vulnerabilityDetailSchema = z.object({
  name: z.string(),
  desc: z.string(),
  impacts: z.array(
    z.object({
      name: z.string().min(1, "Name cannot be empty"), // Ensures name is a non-empty string
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
  evidences: z.array(
    z.object({
      name: z.string().min(1, "Name cannot be empty"), // Ensures name is a non-empty string
      desc: z.string().min(1, "Description cannot be empty"),
      image: z.string().min(1, "Image link cannot be empty"),
    })
  ),
});

type VulnerabilityDetailType = z.infer<typeof vulnerabilityDetailSchema>;

export default VulnerabilityDetailType;
