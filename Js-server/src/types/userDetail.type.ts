import z from "zod";

export const userDetailSchema = z.object({
  url: z.string().url().min(1, "URL cannot be empty"),
  username: z.string().nonempty("Username cannot be empty"),
});

type userDetailType = z.infer<typeof userDetailSchema>;

export default userDetailType;
