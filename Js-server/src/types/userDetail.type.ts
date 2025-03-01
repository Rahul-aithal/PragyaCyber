import z from "zod";

export const userDetailSchema = z.object({
  url: z
    .string()
    .url()
    .min(1, "URL cannot be empty")
    .refine((val) => !val.includes("--") && !val.includes("';"), {
      message: "String contains potentially malicious characters",
    }),
  username: z
    .string()
    .nonempty("Username cannot be empty")
    .refine((val) => !val.includes("--") && !val.includes("';"), {
      message: "String contains potentially malicious characters",
    }),
});

type userDetailType = z.infer<typeof userDetailSchema>;

export default userDetailType;
