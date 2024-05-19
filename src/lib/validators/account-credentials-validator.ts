import { z } from "zod";

export const AuthCredentialsvalidator = z.object({
  email: z.string().email(),
  password: z.string().min(8, {
    message: "Password must be atleast os charecter long",
  }),
});

export type TAuthCredentialsvalidator = z.infer<typeof AuthCredentialsvalidator>;
