"use node";

import { v } from "convex/values";
import { internal } from "./_generated/api";
import { internalAction } from "./_generated/server";

type ExpoPushMessage = {
  to: string;
  title: string;
  body: string;
  data?: Record<string, string>;
  sound?: "default" | null;
  badge?: number;
};

type ExpoPushTicket =
  | { status: "ok"; id: string }
  | { status: "error"; message: string; details?: { error: string } };

/**
 * Send a push notification to a user's device(s) via the Expo Push API.
 * Checks notification preferences before sending.
 */
export const sendPushNotification = internalAction({
  args: {
    recipientUserId: v.id("users"),
    title: v.string(),
    body: v.string(),
    data: v.optional(v.record(v.string(), v.string())),
    category: v.union(
      v.literal("messages"),
      v.literal("taps"),
      v.literal("storyLikes")
    ),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const prefs = await ctx.runQuery(
      internal.notificationHelpers.getPreferencesForUser,
      { userId: args.recipientUserId }
    );

    if (!prefs[args.category]) {
      return null;
    }

    const tokens = await ctx.runQuery(
      internal.notificationHelpers.getTokensForUser,
      { userId: args.recipientUserId }
    );

    if (tokens.length === 0) {
      return null;
    }

    const messages: Array<ExpoPushMessage> = tokens.map(({ token }) => ({
      to: token,
      title: args.title,
      body: args.body,
      data: args.data,
      sound: "default" as const,
    }));

    const response = await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(messages),
    });

    if (!response.ok) {
      console.error(
        `Expo Push API error: ${response.status} ${response.statusText}`
      );
      return null;
    }

    const result = (await response.json()) as { data: Array<ExpoPushTicket> };

    for (let i = 0; i < result.data.length; i++) {
      const ticket = result.data[i];
      if (
        ticket.status === "error" &&
        ticket.details?.error === "DeviceNotRegistered"
      ) {
        const staleToken = tokens[i].token;
        await ctx.runMutation(internal.table.pushTokens.removeStaleToken, {
          token: staleToken,
        });
      }
    }

    return null;
  },
});
