import z from "zod";

export const targetScopeSchema = z.object({
  applicationType: z.string().nonempty("applicationType should not be empty").refine(
    (val) => !val.includes("--") && !val.includes("';"), 
    { message: "String contains potentially malicious characters" }
  ),
  address: z.string().url().nonempty(),
});

type targetScopeType = z.infer<typeof targetScopeSchema>;

export default targetScopeType;
