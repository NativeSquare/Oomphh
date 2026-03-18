import { getAuthUserId } from "@convex-dev/auth/server";
import { defineTable } from "convex/server";
import { v } from "convex/values";
import { mutation as rawMutation, query } from "../_generated/server";
import { mutation, triggers } from "../utils/customMutations";
import { generateFunctions, makePartialSchema } from "../utils/generateFunctions";

const documentSchema = {
  blockerId: v.id("users"),
  blockedUserId: v.id("users"),
};

export const blocks = defineTable(documentSchema)
  .index("by_blocker", ["blockerId"])
  .index("by_blocked_user", ["blockedUserId"])
  .index("by_both", ["blockerId", "blockedUserId"]);

export const {
  get,
  insert,
  patch,
  replace,
  delete: del,
} = generateFunctions("blocks", documentSchema, makePartialSchema(documentSchema));

export const blockUser = rawMutation({
  args: {
    blockedUserId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");
    if (userId === args.blockedUserId) {
      throw new Error("Cannot block yourself");
    }

    // Check if already blocked
    const existing = await ctx.db
      .query("blocks")
      .withIndex("by_both", (q) =>
        q.eq("blockerId", userId).eq("blockedUserId", args.blockedUserId)
      )
      .first();

    if (existing) return existing._id;

    // Create block
    const blockId = await ctx.db.insert("blocks", {
      blockerId: userId,
      blockedUserId: args.blockedUserId,
    });

    // Delete conversation between users if it exists
    const [participant1Id, participant2Id] =
      userId < args.blockedUserId
        ? [userId, args.blockedUserId]
        : [args.blockedUserId, userId];

    const conversation = await ctx.db
      .query("conversations")
      .withIndex("participants", (q) =>
        q.eq("participant1Id", participant1Id).eq("participant2Id", participant2Id)
      )
      .first();

    if (conversation) {
      // Delete all messages in the conversation
      for await (const message of ctx.db
        .query("messages")
        .withIndex("conversationId", (q) =>
          q.eq("conversationId", conversation._id)
        )) {
        await ctx.db.delete(message._id);
      }
      await ctx.db.delete(conversation._id);
    }

    return blockId;
  },
});

export const unblockUser = rawMutation({
  args: {
    blockedUserId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const block = await ctx.db
      .query("blocks")
      .withIndex("by_both", (q) =>
        q.eq("blockerId", userId).eq("blockedUserId", args.blockedUserId)
      )
      .first();

    if (block) {
      await ctx.db.delete(block._id);
    }
  },
});

export const isBlocked = query({
  args: {
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const currentUserId = await getAuthUserId(ctx);
    if (!currentUserId) return false;

    const block = await ctx.db
      .query("blocks")
      .withIndex("by_both", (q) =>
        q.eq("blockerId", currentUserId).eq("blockedUserId", args.userId)
      )
      .first();

    return !!block;
  },
});

export const getBlockedUsers = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return [];

    const blockedEntries = await ctx.db
      .query("blocks")
      .withIndex("by_blocker", (q) => q.eq("blockerId", userId))
      .collect();

    return blockedEntries.map((entry) => entry.blockedUserId);
  },
});
