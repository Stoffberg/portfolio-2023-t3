import { router } from "../trpc";
import { authRouter } from "./auth";
import { exampleRouter } from "./example";
import { linkRouter } from "./link";

export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
  link: linkRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
