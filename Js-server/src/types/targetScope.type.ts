import z from "zod";

export const targetScopeSchema = z.object({
  applicationType: z.string().nonempty("applicationType should not be empty"),
  address: z.string().url().nonempty(),
});

type targetScopeType = z.infer<typeof targetScopeSchema>;

export default targetScopeType;
