import { z } from "zod";
import { router, publicProcedure } from "../trpc";

const generateKey = (x: number) => {
  const charset = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let result = "";
  for (let i = 0; i < x; i++) {
    result += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return result;
};

export const linkRouter = router({
  set: publicProcedure.input(z.object({ url: z.string() })).mutation(async ({ input, ctx }) => {
    const key = generateKey(8);
    console.info(`set ${key} to ${input.url}`);
    await ctx.redis.set(key, input.url);
    return `https://stoffberg.dev/link/${key}`;
  }),
  get: publicProcedure.input(z.object({ key: z.string() })).query(async ({ input, ctx }) => {
    return await ctx.redis.get<string | null>(input.key);
  }),
});
