import { getAuthUserId } from "@convex-dev/auth/server";
import { defineTable } from "convex/server";
import { v } from "convex/values";
import { internalMutation, mutation } from "../_generated/server";

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Schema Definition ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

const documentSchema = {
  userId: v.id("users"),
  token: v.string(),
  platform: v.union(v.literal("ios"), v.literal("android")),
};

export const pushTokens = defineTable(documentSchema)
  .index("by_userId", ["userId"])
  .index("by_token", ["token"]);

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Mutations Definition ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

/**
 * Upsert a push token for the authenticated user.
 * If the token already exists for this user, it's a no-op.
 * If the token exists for a different user, it's reassigned.
 */
export const savePushToken = mutation({
  args: {
    token: v.string(),
    platform: v.union(v.literal("ios"), v.literal("android")),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    const existing = await ctx.db
      .query("pushTokens")
      .withIndex("by_token", (q) => q.eq("token", args.token))
      .first();

    if (existing) {
      if (existing.userId === userId) {
        return null;
      }
      // Token was registered to a different user — reassign
      await ctx.db.patch(existing._id, { userId, platform: args.platform });
      return null;
    }

    await ctx.db.insert("pushTokens", {
      userId,
      token: args.token,
      platform: args.platform,
    });
    return null;
  },
});

/**
 * Remove a stale token detected by the Expo Push API (DeviceNotRegistered).
 */
export const removeStaleToken = internalMutation({
  args: { token: v.string() },
  returns: v.null(),
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("pushTokens")
      .withIndex("by_token", (q) => q.eq("token", args.token))
      .first();

    if (existing) {
      await ctx.db.delete(existing._id);
    }
    return null;
  },
});

/**
 * Remove a push token (e.g. on logout).
 */
export const removePushToken = mutation({
  args: {
    token: v.string(),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    const existing = await ctx.db
      .query("pushTokens")
      .withIndex("by_token", (q) => q.eq("token", args.token))
      .first();

    if (existing && existing.userId === userId) {
      await ctx.db.delete(existing._id);
    }

    return null;
  },
});
