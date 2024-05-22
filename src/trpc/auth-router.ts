import { getPayloadClient } from "../get-payload";
import { AuthCredentialsvalidator } from "../lib/validators/account-credentials-validator";
import { TRPCError } from "@trpc/server";
import { publicProcedure, router } from "./trpc";

export const authRouter = router({
  createPayloadUser: publicProcedure
    .input(AuthCredentialsvalidator)
    .mutation(async ({ input }) => {
      const { email, password } = input;
      const payload = await getPayloadClient();

      // check if user already exists
      const { docs: user } = await payload.find({
        collection: "user",
        where: {
          email: {
            equals: email,
          },
        },
      });

      if (user.length !== 0) throw new TRPCError({ code: "CONFLICT" });

      await payload.create({
        collection: "user",
        data: {},
      });
    }),
});
