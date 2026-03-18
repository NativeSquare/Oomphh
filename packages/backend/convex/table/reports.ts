import { defineTable } from "convex/server";
import { v } from "convex/values";
import { generateFunctions } from "../utils/generateFunctions";
import { mutation } from "../_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

const documentSchema = {
  reporterId: v.id("users"),
  reportedUserId: v.id("users"),
  reason: v.string(),
  description: v.optional(v.string()),
};

const partialSchema = {
  reporterId: v.optional(v.id("users")),
  reportedUserId: v.optional(v.id("users")),
  reason: v.optional(v.string()),
  description: v.optional(v.string()),
};

export const reports = defineTable(documentSchema)
  .index("by_reporter", ["reporterId"])
  .index("by_reported_user", ["reportedUserId"]);

export const {
  get,
  insert,
  patch,
  replace,
  delete: del,
} = generateFunctions("reports", documentSchema, partialSchema);

export const reportUser = mutation({
  args: {
    reportedUserId: v.id("users"),
    reason: v.string(),
    description: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");
    if (userId === args.reportedUserId) {
      throw new Error("Cannot report yourself");
    }

    return await ctx.db.insert("reports", {
      reporterId: userId,
      reportedUserId: args.reportedUserId,
      reason: args.reason,
      description: args.description,
    });
  },
});
