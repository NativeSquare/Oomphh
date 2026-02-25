import { v } from "convex/values";
import { internalQuery } from "./_generated/server";

export const getTokensForUser = internalQuery({
  args: { userId: v.id("users") },
  returns: v.array(v.object({ token: v.string() })),
  handler: async (ctx, args) => {
    const tokens = await ctx.db
      .query("pushTokens")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .collect();
    return tokens.map((t) => ({ token: t.token }));
  },
});

export const getPreferencesForUser = internalQuery({
  args: { userId: v.id("users") },
  returns: v.object({
    messages: v.boolean(),
    taps: v.boolean(),
    storyLikes: v.boolean(),
  }),
  handler: async (ctx, args) => {
    const prefs = await ctx.db
      .query("notificationPreferences")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .first();

    if (!prefs) {
      return { messages: true, taps: true, storyLikes: true };
    }

    return {
      messages: prefs.messages,
      taps: prefs.taps,
      storyLikes: prefs.storyLikes,
    };
  },
});
