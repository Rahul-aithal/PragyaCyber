import { z } from "zod";

export const userSchema = z.object({
  email: z
    .string()
    .email()
    .min(1, "Email is required")
    .refine((val) => !val.includes("--") && !val.includes("';"), {
      message: "String contains potentially malicious characters",
    }),
  password: z
    .string()
    .min(1, "Password is required")
    .refine((val) => !val.includes("--") && !val.includes("';"), {
      message: "String contains potentially malicious characters",
    }),
});

type userType = z.infer<typeof userSchema>;

export default userType;
