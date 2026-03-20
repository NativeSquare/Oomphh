import { getAuthUserId } from "@convex-dev/auth/server";
import { defineTable } from "convex/server";
import { v } from "convex/values";
import { mutation } from "../_generated/server";
import { generateFunctions } from "../utils/generateFunctions";

const documentSchema = {
  userId: v.id("users"),
  type: v.string(),
  feedbackText: v.string(),
  feedbackImages: v.optional(v.array(v.string())),
};

const partialSchema = {
  userId: v.optional(v.id("users")),
  type: v.optional(v.string()),
  feedbackText: v.optional(v.string()),
  feedbackImages: v.optional(v.array(v.string())),
};

export const feedback = defineTable(documentSchema)
  .index("by_user", ["userId"])
  .index("by_type", ["type"]);

export const {
  get,
  insert,
  patch,
  replace,
  delete: del,
} = generateFunctions("feedback", documentSchema, partialSchema);

/**
 * Submit user feedback (authenticated).
 */
export const sendFeedback = mutation({
  args: {
    type: v.optional(v.string()),
    feedbackText: v.optional(v.string()),
    feedbackImages: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");
    if (!args.type) throw new Error("Feedback type is required");
    if (!args.feedbackText?.trim()) throw new Error("Feedback text is required");

    await ctx.db.insert("feedback", {
      userId,
      type: args.type,
      feedbackText: args.feedbackText.trim(),
      feedbackImages: args.feedbackImages,
    });
  },
});
