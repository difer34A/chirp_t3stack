import { clerkClient } from "@clerk/nextjs/server";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
    createTRPCRouter,
    privateProcedure,
    publicProcedure,
} from "~/server/api/trpc";

import { filterUserForClient } from "~/server/helpers/filterForClient";
import type { Post } from "@prisma/client";

const addUserDataToPosts = async (posts: Post[]) => {
    const userId = posts.map((post) => post.authorId);
    const users = (
        await clerkClient.users.getUserList({
            userId: userId,
            limit: 110,
        })
    ).map(filterUserForClient);

    return posts.map((post) => {

        const author = users.find((user) => user.id === post.authorId);

        if (!author) {
            console.error("AUTHOR NOT FOUND", post);
            throw new TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: `Author for post not found. POST ID: ${post.id}, USER ID: ${post.authorId}`,
            });
        }
        if (!author.username) {
            // user the ExternalUsername
            if (!author.externalUsername) {
                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: `Author has no GitHub Account: ${author.id}`,
                });
            }
            author.username = author.externalUsername;
        }
        return {
            post,
            author: {
                ...author,
                username: author.username ?? "(username not found)",
            },
        };
    });
};


export const postsRouter = createTRPCRouter({
    getById: publicProcedure
        .input(z.object({ id: z.string() }))
        .query(async ({ ctx, input }) => {
            const post = await ctx.prisma.post.findUnique({
                where: { id: input.id },
            });

            if (!post) throw new TRPCError({ code: "NOT_FOUND" });

            return (await addUserDataToPosts([post]))[0];
        }),

    getAll: publicProcedure.query(async ({ ctx }) => {
        const posts = await ctx.prisma.post.findMany({
            take: 100,
            orderBy: [{ createdAt: "desc" }],
        });

        return addUserDataToPosts(posts);
    }),
    deletePost: publicProcedure
        .input(
            z.object({
                postId: z.string(),
            })
        )
        .mutation(({ ctx, input }) =>
            ctx.prisma.post
                .delete({
                    where: {
                        id: input.postId,
                    },
                })
                .then((deletedPost) => {
                    if (deletedPost) {
                        return { message: `Post with ID ${input.postId} deleted successfully.` };
                    } else {
                        return { message: `Post with ID ${input.postId} not found.` };
                    }
                })
        ),


    getPostsByUserId: publicProcedure
        .input(
            z.object({
                userId: z.string(),
            })
        )
        .query(({ ctx, input }) =>
            ctx.prisma.post
                .findMany({
                    where: {
                        authorId: input.userId,
                    },
                    take: 100,
                    orderBy: [{ createdAt: "desc" }],
                })
                .then(addUserDataToPosts)
        ),

    create: privateProcedure
        .input(
            z.object({
                content: z.string().min(5).max(280),
            })
        )
        .mutation(async ({ ctx, input }) => {
            const authorId = ctx.userId;

            const post = await ctx.prisma.post.create({
                data: {
                    authorId,
                    content: input.content,
                },
            });

            return post;
        }),
});