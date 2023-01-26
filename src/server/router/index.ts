import { jobRouter } from './jobs';
import { userRouter } from './user';
// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { exampleRouter } from "./example";
import { protectedExampleRouter } from "./protected-example-router";

export const appRouter = createRouter()
    .transformer(superjson)
    .merge("example.", exampleRouter)
    .merge("question.", protectedExampleRouter)
    .merge('user.', userRouter)
    .merge('job.', jobRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
