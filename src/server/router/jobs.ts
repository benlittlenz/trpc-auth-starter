import { createRouter } from "./context";
import { z } from "zod";
import { Job } from "@prisma/client";

export const jobRouter = createRouter()
    .query("getAllJobs", {
        input: z
            .object({
                page: z.number(),
                rowsPerPage: z.number(),
                sortColumn: z.string(),
                sortDirection: z.string(),
                searchQuery: z.string(),
            }),
        async resolve({ ctx, input: { page, rowsPerPage, sortColumn = 'name', sortDirection, searchQuery } }) {
            const offset = (page - 1) * rowsPerPage;
            let jobs: Job[] = [];
            let count = 0;

            if (searchQuery) {
                console.time('searchQuery');
                const ids = await ctx.prisma.$queryRaw<{ id: number }[]>`
                SELECT id FROM "Job"
                WHERE "name" ILIKE ${`%${searchQuery}%`} OR
                    "description" ILIKE ${`%${searchQuery}%`}
                `;
                count = ids.length;
                jobs = await ctx.prisma.job.findMany({
                    where: { id: { in: ids.map((row) => row.id) } },
                    skip: offset,
                    take: rowsPerPage,
                    orderBy: {
                        [sortColumn]: sortDirection,
                    },
                });
                console.timeEnd('searchQuery');
            } else {
                jobs = await ctx.prisma.job.findMany({
                    skip: offset,
                    take: rowsPerPage,
                    orderBy: {
                        [sortColumn]: sortDirection,
                    },
                });
                count = await ctx.prisma.job.count();
            }


            return { jobs, count };
        },
    })

