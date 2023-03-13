import { z } from "zod";
import { router, publicProcedure } from "../trpc";

const generateUUID = () => {
  let uuid = "";
  const chars = "abcdef0123456789";
  const sections = [8, 4, 4, 4, 12];

  for (const section of sections) {
    for (let i = 0; i < section; i++) {
      uuid += chars[Math.floor(Math.random() * chars.length)];
    }
    if (section !== sections[sections.length - 1]) {
      uuid += "-";
    }
  }

  return uuid;
};

export const linkRouter = router({
  set: publicProcedure.input(z.object({ url: z.string() })).mutation(async ({ input, ctx }) => {
    const key = generateUUID();
    await ctx.redis.set(key, input.url);
    return `https://stoffberg.dev/link/${key}`;
  }),
  get: publicProcedure.input(z.object({ key: z.string() })).query(async ({ input, ctx }) => {
    return await ctx.redis.get<string | null>(input.key);
  }),
});
