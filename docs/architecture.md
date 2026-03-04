# Oomphh — Architecture Deep Dive

_Generated: 2026-03-01 by Jarvis_

## Overview

**Oomphh** is a location-based social/dating app targeting the LGBTQ+ community. It features proximity-based user discovery, real-time messaging, ephemeral stories, events, and photo albums. Based in Czech Republic (domain: oomphh.cz).

## Monorepo Structure

```
Oomphh/
├── apps/
│   ├── native/        — Expo (React Native) mobile app
│   ├── web/           — Next.js marketing site + web app
│   └── admin/         — Next.js admin dashboard
├── packages/
│   ├── backend/       — Convex backend (schema, functions, auth)
│   ├── shared/        — Shared constants (APP_NAME, APP_SLUG, etc.)
│   └── transactional/ — React Email templates (Resend)
├── turbo.json         — Turborepo config
└── pnpm-workspace.yaml
```

**Package manager:** pnpm 9.0.0
**Build system:** Turborepo 2.6.2
**Node requirement:** >=20.19.4

## Apps

### Native App (Expo / React Native)
- **Router:** Expo Router (file-based)
- **Route groups:**
  - `(auth)` — sign-in, sign-up, forgot/reset password, email verification
  - `(onboarding)` — new user onboarding flow
  - `(app)` — main app with tab navigation
- **Tab screens:** Home (discovery grid), Taps, Chat, Events, Profile
- **Key screens:** user profiles, 1:1 chat, event detail/creation, story viewer, album viewer, filters, location search, notification preferences, feedback
- **Dependencies:** @convex-dev/auth, @gorhom/bottom-sheet, LogRocket, Expo Notifications, react-native-maps, expo-image-picker, expo-location

### Web App (Next.js)
- **Route groups:** (marketing), (auth), (app)
- **UI:** Tailwind CSS, custom components
- **Same Convex backend** as native

### Admin App (Next.js)
- **Route groups:** (auth), (app)
- **UI:** Radix UI, dnd-kit, TanStack Table, shadcn-style components
- **Purpose:** Content moderation, user management, data inspection

## Backend (Convex)

### Database Tables (15 custom + auth tables)

| Table | Purpose |
|-------|---------|
| users | User profiles (bio, birth date, height, weight, body type, orientation, position, ethnicity, relationship status, privacy, profile pictures, favorites, first sentences) |
| conversations | 1:1 conversation pairs (participant1, participant2, last message tracking) |
| messages | Chat messages (text, images, view-once photos, time-limited album sharing, read receipts) |
| events | User-created events (title, location with lat/lng, date, description, max attendees, event type, social links) |
| eventAttendees | Event join records |
| eventMessages | Event group chat messages |
| albums | User photo albums |
| albumPhotos | Photos within albums |
| stories | Ephemeral stories (24h expiry, image storage) |
| storyLikes | Story like interactions |
| taps | "Tap" interactions between users (emoji-based) |
| views | Profile view tracking |
| feedback | User feedback submissions |
| pushTokens | Expo push notification tokens (iOS/Android) |
| notificationPreferences | Per-user notification toggles (messages, taps, story likes) |

### Convex Components (5)
- **@convex-dev/geospatial** — Proximity-based user discovery (nearest users, up to 5000km)
- **@convex-dev/auth** — Authentication (Password + OTP via Resend, GitHub, Google, Apple)
- **@convex-dev/resend** — Transactional emails
- **@convex-dev/presence** — Online presence tracking
- **@convex-dev/migrations** — Database migration framework

### Key Patterns

1. **Custom mutations with triggers** (utils/customMutations.ts)
   - Cascade deletions (albums->photos, conversations->messages, events->attendees, users->auth/tokens/prefs)
   - Auto-update conversation lastMessageId on message insert/delete

2. **Generated CRUD functions** (utils/generateFunctions.ts)
   - Auto-generates get, insert, patch, replace, delete for tables
   - Takes document schema + partial schema for type-safe updates

3. **Geospatial filtering** — Client-side filtering after geospatial query (body type, ethnicity, looking for, position, orientation, age, height, weight) because the geospatial component doesn't support multi-value IN filters

4. **View-once photos** — Snapchat-style disappearing photos in chat. Image URL cleared after first view.

5. **Time-limited album sharing** — Albums shared in chat with expiration timestamps

6. **Push notifications** — Via Expo Push API, with per-user category preferences (messages, taps, story likes). Stale token cleanup.

### Authentication
- **Providers:** Password (with email OTP verification via Resend), GitHub, Google, Apple
- **Auth config:** Custom domain-based (CONVEX_SITE_URL)
- **Redirect validation:** Only allows oomphh:// (native) and http://localhost:3000 (dev)

### Cron Jobs
- Hourly cleanup of old Resend emails (7 days finalized, 4 weeks abandoned)
- Story expiry cleanup (via cleanupExpiredStories)

### HTTP Routes
- Auth routes (Convex Auth)
- Resend webhook (/resend-webhook) for email delivery tracking

## External Services
- **Google Places API** — Location autocomplete and city search
- **Expo Push API** — Push notifications
- **Resend** — Transactional emails (OTP, password reset)
- **LogRocket** — Session replay / error tracking (native app)

## Key Technical Decisions

1. **Convex Cloud** (not self-hosted) — Standard Convex deployment
2. **pnpm** (not bun) — Package manager
3. **Expo Router** — File-based routing for native
4. **Next.js App Router** — For both web and admin
5. **No test suite** — Manual verification only
6. **Geospatial component** — For efficient proximity search
7. **Denormalized data in messages** — Album title, cover URL, photo count stored directly in message docs for performance
