import { authTables } from "@convex-dev/auth/server";
import { defineSchema } from "convex/server";
import { albums } from "./table/albums";
import { albumPhotos } from "./table/albums";
import { conversations } from "./table/conversations";
import { events } from "./table/events";
import { eventAttendees } from "./table/events";
import { eventMessages } from "./table/eventMessages";
import { feedback } from "./table/feedback";
import { messages } from "./table/messages";
import { stories } from "./table/stories";
import { storyLikes } from "./table/storyLikes";
import { taps } from "./table/taps";
import { users } from "./table/users";
import { views } from "./table/views";

export default defineSchema({
  ...authTables,
  albums,
  albumPhotos,
  conversations,
  events,
  eventAttendees,
  eventMessages,
  feedback,
  messages,
  stories,
  storyLikes,
  taps,
  users,
  views,
});
