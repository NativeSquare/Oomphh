import { getAuthUserId } from "@convex-dev/auth/server";
import { PushNotifications } from "@convex-dev/expo-push-notifications";
import { v } from "convex/values";
import { components } from "./_generated/api";
import { Id } from "./_generated/dataModel";
import { mutation, MutationCtx } from "./_generated/server";

const pushNotifications = new PushNotifications(components.pushNotifications);

type NotificationCategory = "messages" | "taps" | "storyLikes";

export async function sendNotification(
  ctx: MutationCtx,
  args: {
    userId: Id<"users">;
    title: string;
    body: string;
    data?: Record<string, string>;
    category: NotificationCategory;
  },
) {
  const prefs = await ctx.db
    .query("notificationPreferences")
    .withIndex("by_userId", (q) => q.eq("userId", args.userId))
    .first();

  if (prefs && !prefs[args.category]) return;

  try {
    await pushNotifications.sendPushNotification(ctx, {
      userId: args.userId,
      notification: {
        title: args.title,
        body: args.body,
        data: args.data,
        sound: "default",
        priority: "high",
        channelId: "default",
      },
    });
  } catch (error) {
    console.error(
      `Failed to send ${args.category} push notification to user ${args.userId}:`,
      error,
    );
  }
}

export const recordToken = mutation({
  args: { token: v.string() },
  returns: v.null(),
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");
    await pushNotifications.recordToken(ctx, { userId, pushToken: args.token });
    return null;
  },
});

export const removeToken = mutation({
  args: {},
  returns: v.null(),
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");
    await pushNotifications.removeToken(ctx, { userId });
    return null;
  },
});
