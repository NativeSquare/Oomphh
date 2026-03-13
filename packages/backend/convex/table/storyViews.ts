import { getAuthUserId } from "@convex-dev/auth/server";
import { defineTable } from "convex/server";
import { v } from "convex/values";
import { mutation, query } from "../_generated/server";

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Schema Definition ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

const documentSchema = {
  userId: v.id("users"),
  storyId: v.id("stories"),
};

export const storyViews = defineTable(documentSchema)
  .index("by_userId_storyId", ["userId", "storyId"])
  .index("by_userId", ["userId"])
  .index("by_storyId", ["storyId"]);

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Mutations Definition ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

/**
 * Record that the current user has viewed a story.
 * Idempotent — does nothing if already recorded.
 */
export const markStoryViewed = mutation({
  args: {
    storyId: v.id("stories"),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    const existing = await ctx.db
      .query("storyViews")
      .withIndex("by_userId_storyId", (q) =>
        q.eq("userId", userId).eq("storyId", args.storyId)
      )
      .first();

    if (existing) return null;

    await ctx.db.insert("storyViews", {
      userId,
      storyId: args.storyId,
    });

    return null;
  },
});

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Queries Definition ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

/**
 * Get all story IDs the current user has viewed.
 * Used client-side to determine which story groups have unviewed content.
 */
export const getViewedStoryIds = query({
  args: {},
  returns: v.array(v.id("stories")),
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return [];

    const views = await ctx.db
      .query("storyViews")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .collect();

    return views.map((view) => view.storyId);
  },
});
