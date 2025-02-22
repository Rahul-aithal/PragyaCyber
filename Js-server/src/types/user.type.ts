import { z } from "zod";

export const userSchema = z.object({
  email: z.string().email().min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
});

type userType = z.infer<typeof userSchema>;

export default userType;
