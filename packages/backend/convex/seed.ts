import { GeospatialIndex } from "@convex-dev/geospatial";
import { v } from "convex/values";
import { components, internal } from "./_generated/api";
import { Id } from "./_generated/dataModel";
import { internalAction, internalQuery } from "./_generated/server";
import { internalMutation } from "./utils/customMutations";

const geospatial = new GeospatialIndex<Id<"users">>(components.geospatial);

// ~100 fake users spread across major world capitals
const SEED_USERS = [
  // Europe
  { city: "Paris", lat: 48.8566, lng: 2.3522 },
  { city: "Paris", lat: 48.8606, lng: 2.3376 },
  { city: "Paris", lat: 48.8530, lng: 2.3499 },
  { city: "Paris", lat: 48.8738, lng: 2.2950 },
  { city: "Paris", lat: 48.8462, lng: 2.3464 },
  { city: "London", lat: 51.5074, lng: -0.1278 },
  { city: "London", lat: 51.5155, lng: -0.1419 },
  { city: "London", lat: 51.5013, lng: -0.1245 },
  { city: "Berlin", lat: 52.5200, lng: 13.4050 },
  { city: "Berlin", lat: 52.5163, lng: 13.3777 },
  { city: "Berlin", lat: 52.5244, lng: 13.4105 },
  { city: "Madrid", lat: 40.4168, lng: -3.7038 },
  { city: "Madrid", lat: 40.4200, lng: -3.7100 },
  { city: "Rome", lat: 41.9028, lng: 12.4964 },
  { city: "Rome", lat: 41.8902, lng: 12.4922 },
  { city: "Amsterdam", lat: 52.3676, lng: 4.9041 },
  { city: "Amsterdam", lat: 52.3702, lng: 4.8952 },
  { city: "Barcelona", lat: 41.3874, lng: 2.1686 },
  { city: "Barcelona", lat: 41.3851, lng: 2.1734 },
  { city: "Lisbon", lat: 38.7223, lng: -9.1393 },
  { city: "Vienna", lat: 48.2082, lng: 16.3738 },
  { city: "Brussels", lat: 50.8503, lng: 4.3517 },
  { city: "Prague", lat: 50.0755, lng: 14.4378 },
  { city: "Stockholm", lat: 59.3293, lng: 18.0686 },
  { city: "Copenhagen", lat: 55.6761, lng: 12.5683 },
  { city: "Dublin", lat: 53.3498, lng: -6.2603 },
  { city: "Warsaw", lat: 52.2297, lng: 21.0122 },
  { city: "Athens", lat: 37.9838, lng: 23.7275 },
  { city: "Budapest", lat: 47.4979, lng: 19.0402 },
  { city: "Zurich", lat: 47.3769, lng: 8.5417 },
  { city: "Milan", lat: 45.4642, lng: 9.1900 },
  { city: "Munich", lat: 48.1351, lng: 11.5820 },
  // North America
  { city: "New York", lat: 40.7128, lng: -74.0060 },
  { city: "New York", lat: 40.7580, lng: -73.9855 },
  { city: "New York", lat: 40.7282, lng: -73.7949 },
  { city: "Los Angeles", lat: 34.0522, lng: -118.2437 },
  { city: "Los Angeles", lat: 34.0195, lng: -118.4912 },
  { city: "San Francisco", lat: 37.7749, lng: -122.4194 },
  { city: "San Francisco", lat: 37.7849, lng: -122.4094 },
  { city: "Chicago", lat: 41.8781, lng: -87.6298 },
  { city: "Chicago", lat: 41.8827, lng: -87.6233 },
  { city: "Toronto", lat: 43.6532, lng: -79.3832 },
  { city: "Toronto", lat: 43.6510, lng: -79.3470 },
  { city: "Miami", lat: 25.7617, lng: -80.1918 },
  { city: "Miami", lat: 25.7907, lng: -80.1300 },
  { city: "Mexico City", lat: 19.4326, lng: -99.1332 },
  { city: "Washington DC", lat: 38.9072, lng: -77.0369 },
  { city: "Montreal", lat: 45.5017, lng: -73.5673 },
  { city: "Vancouver", lat: 49.2827, lng: -123.1207 },
  // South America
  { city: "São Paulo", lat: -23.5505, lng: -46.6333 },
  { city: "São Paulo", lat: -23.5475, lng: -46.6361 },
  { city: "Buenos Aires", lat: -34.6037, lng: -58.3816 },
  { city: "Buenos Aires", lat: -34.6083, lng: -58.3712 },
  { city: "Rio de Janeiro", lat: -22.9068, lng: -43.1729 },
  { city: "Bogotá", lat: 4.7110, lng: -74.0721 },
  { city: "Lima", lat: -12.0464, lng: -77.0428 },
  { city: "Santiago", lat: -33.4489, lng: -70.6693 },
  // Asia
  { city: "Tokyo", lat: 35.6762, lng: 139.6503 },
  { city: "Tokyo", lat: 35.6595, lng: 139.7004 },
  { city: "Tokyo", lat: 35.6894, lng: 139.6917 },
  { city: "Seoul", lat: 37.5665, lng: 126.9780 },
  { city: "Seoul", lat: 37.5510, lng: 126.9882 },
  { city: "Bangkok", lat: 13.7563, lng: 100.5018 },
  { city: "Bangkok", lat: 13.7466, lng: 100.5347 },
  { city: "Singapore", lat: 1.3521, lng: 103.8198 },
  { city: "Singapore", lat: 1.2994, lng: 103.8560 },
  { city: "Mumbai", lat: 19.0760, lng: 72.8777 },
  { city: "Mumbai", lat: 18.9220, lng: 72.8347 },
  { city: "Delhi", lat: 28.6139, lng: 77.2090 },
  { city: "Shanghai", lat: 31.2304, lng: 121.4737 },
  { city: "Shanghai", lat: 31.2397, lng: 121.4998 },
  { city: "Beijing", lat: 39.9042, lng: 116.4074 },
  { city: "Hong Kong", lat: 22.3193, lng: 114.1694 },
  { city: "Taipei", lat: 25.0330, lng: 121.5654 },
  { city: "Jakarta", lat: -6.2088, lng: 106.8456 },
  { city: "Manila", lat: 14.5995, lng: 120.9842 },
  { city: "Kuala Lumpur", lat: 3.1390, lng: 101.6869 },
  { city: "Dubai", lat: 25.2048, lng: 55.2708 },
  { city: "Tel Aviv", lat: 32.0853, lng: 34.7818 },
  { city: "Istanbul", lat: 41.0082, lng: 28.9784 },
  // Africa
  { city: "Cape Town", lat: -33.9249, lng: 18.4241 },
  { city: "Johannesburg", lat: -26.2041, lng: 28.0473 },
  { city: "Lagos", lat: 6.5244, lng: 3.3792 },
  { city: "Nairobi", lat: -1.2921, lng: 36.8219 },
  { city: "Cairo", lat: 30.0444, lng: 31.2357 },
  { city: "Marrakech", lat: 31.6295, lng: -7.9811 },
  { city: "Casablanca", lat: 33.5731, lng: -7.5898 },
  // Oceania
  { city: "Sydney", lat: -33.8688, lng: 151.2093 },
  { city: "Sydney", lat: -33.8568, lng: 151.2153 },
  { city: "Melbourne", lat: -37.8136, lng: 144.9631 },
  { city: "Melbourne", lat: -37.8100, lng: 144.9650 },
  { city: "Auckland", lat: -36.8485, lng: 174.7633 },
];

const FIRST_NAMES = [
  "Alex", "Jordan", "Sam", "Taylor", "Morgan", "Casey", "Riley", "Jamie",
  "Avery", "Quinn", "Blake", "Cameron", "Dakota", "Drew", "Emery", "Finley",
  "Harper", "Hayden", "Jesse", "Kai", "Logan", "Max", "Nico", "Owen",
  "Parker", "Reese", "River", "Robin", "Sage", "Skyler", "Theo", "Wren",
  "Adrian", "Chris", "Dominic", "Eli", "Frankie", "Gabriel", "Hugo", "Ivan",
  "Jack", "Leo", "Marco", "Nathan", "Oscar", "Pablo", "Rafael", "Sebastian",
  "Victor", "Yuki", "Ryo", "Min", "Wei", "Raj", "Arjun", "Kofi", "Liam",
  "Noah", "Lucas", "Mateo", "Ethan", "Daniel", "Mason", "Henry", "Aiden",
  "Julian", "Miles", "Ezra", "Felix", "Jasper", "Rowan", "Cole", "Asher",
  "Milo", "Dante", "Remy", "Atlas", "Zion", "Soren", "Arlo", "Beckett",
  "Caleb", "Declan", "Emmett", "Flynn", "Grant", "Heath", "Isaac", "Jude",
  "Kenji", "Lars", "Malik", "Nolan", "Orion", "Pierce", "Reed", "Silas",
];

const BODY_TYPES = ["Slim", "Average", "Athletic", "Muscular", "Stocky"];
const ORIENTATIONS = ["Straight", "Gay", "Bisexual", "Queer", "Pansexual", "Asexual", "Demisexual", "Ask Me"];
const POSITIONS = ["Top", "Bottom", "Versatile", "Vers Top", "Vers Bottom", "Side", "Ask Me", "Not Specified"];
const LOOKING_FOR_OPTIONS = ["Chat", "Dates", "Friends", "Networking", "Relationship", "Hookups", "Not Specified"];
const ETHNICITIES = [
  "Asian", "Black", "Latino/Hispanic", "Middle Eastern", "Mixed",
  "Native American", "Pacific Islander", "South Asian", "White", "Other",
];
const RELATIONSHIP_STATUSES = [
  "Single", "Dating", "Committed", "Open relationship", "Married", "Partnered", "Polyamorous",
];

const TAP_EMOJIS = ["🍸", "❤️‍🔥", "❌", "😈", "⚡"];

const SEED_EVENTS = [
  {
    title: "Friday Night Out",
    location: "Le Marais, Paris",
    latitude: 48.8566,
    longitude: 2.3522,
    description: "Join us for a fun night out in Le Marais! Drinks, music, and great vibes.",
    eventType: "Party",
    maxAttendees: 50,
  },
  {
    title: "Brunch & Chill",
    location: "Shoreditch, London",
    latitude: 51.5235,
    longitude: -0.0765,
    description: "Relaxed brunch meetup. Great food, great company.",
    eventType: "Food & Drinks",
    maxAttendees: 20,
  },
  {
    title: "Beach Volleyball Tournament",
    location: "Bondi Beach, Sydney",
    latitude: -33.8915,
    longitude: 151.2767,
    description: "Friendly volleyball tournament followed by a BBQ. All levels welcome!",
    eventType: "Sports",
    maxAttendees: 30,
  },
  {
    title: "Art Gallery Opening",
    location: "Chelsea, New York",
    latitude: 40.7465,
    longitude: -74.0014,
    description: "Exclusive opening night at a contemporary art gallery. Wine and canapes provided.",
    eventType: "Art & Culture",
    maxAttendees: 40,
  },
  {
    title: "Rooftop Party",
    location: "Kreuzberg, Berlin",
    latitude: 52.4966,
    longitude: 13.3904,
    description: "Summer rooftop party with DJ sets and panoramic city views.",
    eventType: "Music",
    maxAttendees: 100,
  },
];

// Number of unique profile pictures to fetch from randomuser.me (portraits 0-99 available)
const PROFILE_PICTURE_COUNT = 30;

function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return s / 2147483647;
  };
}

function pick<T>(arr: T[], rand: () => number): T {
  return arr[Math.floor(rand() * arr.length)];
}

function pickMultiple<T>(arr: T[], min: number, max: number, rand: () => number): T[] {
  const count = min + Math.floor(rand() * (max - min + 1));
  const shuffled = [...arr].sort(() => rand() - 0.5);
  return shuffled.slice(0, count);
}

function randomBirthDate(rand: () => number): string {
  const age = 20 + Math.floor(rand() * 26);
  const year = new Date().getFullYear() - age;
  const month = 1 + Math.floor(rand() * 12);
  const day = 1 + Math.floor(rand() * 28);
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}T00:00:00Z`;
}

/**
 * Entry point: internalAction that fetches profile pictures from randomuser.me,
 * uploads them to Convex storage, then calls the mutation to create users.
 */
export const seedPreviewUsers = internalAction({
  args: {},
  handler: async (ctx): Promise<{ seeded: boolean; count: number }> => {
    // Check if already seeded
    const alreadySeeded: boolean = await ctx.runQuery(
      internal.seed.isAlreadySeeded,
      {}
    );
    if (alreadySeeded) {
      console.log("Preview users already seeded, skipping.");
      return { seeded: false, count: 0 };
    }

    // Fetch and upload profile pictures from randomuser.me
    console.log(`Fetching ${PROFILE_PICTURE_COUNT} profile pictures from randomuser.me...`);
    const storageIds: Id<"_storage">[] = [];

    for (let i = 0; i < PROFILE_PICTURE_COUNT; i++) {
      try {
        const imageUrl = `https://randomuser.me/api/portraits/men/${i}.jpg`;
        const response = await fetch(imageUrl);
        if (!response.ok) {
          console.warn(`Failed to fetch portrait ${i}: ${response.status}`);
          continue;
        }
        const blob = await response.blob();
        const storageId = await ctx.storage.store(blob);
        storageIds.push(storageId);
      } catch (e) {
        console.warn(`Error fetching portrait ${i}:`, e);
      }
    }

    console.log(`Uploaded ${storageIds.length}/${PROFILE_PICTURE_COUNT} profile pictures.`);

    // Create all users in a mutation
    const result = await ctx.runMutation(internal.seed.createSeedUsers, {
      profilePictureIds: storageIds.filter((id) => id !== null),
    });

    return result;
  },
});

export const isAlreadySeeded = internalQuery({
  args: {},
  handler: async (ctx) => {
    const existing = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), "seed-0@oomphh.preview"))
      .first();
    return existing !== null;
  },
});

export const createSeedUsers = internalMutation({
  args: {
    profilePictureIds: v.array(v.id("_storage")),
  },
  handler: async (ctx, args) => {
    let count = 0;
    const { profilePictureIds } = args;

    for (let i = 0; i < SEED_USERS.length; i++) {
      const { city, lat, lng } = SEED_USERS[i];
      const rand = seededRandom(i * 7919 + 42);

      const name = FIRST_NAMES[i % FIRST_NAMES.length];

      // Assign a profile picture (cycle through available ones)
      const profilePictures: Id<"_storage">[] = [];
      if (profilePictureIds.length > 0) {
        profilePictures.push(
          profilePictureIds[i % profilePictureIds.length]
        );
      }

      const userId = await ctx.db.insert("users", {
        name,
        email: `seed-${i}@oomphh.preview`,
        bio: `Hey from ${city}! 👋`,
        birthDate: randomBirthDate(rand),
        birthLocation: city,
        height: {
          value: 165 + Math.floor(rand() * 30),
          unit: "cm",
        },
        weight: {
          value: 60 + Math.floor(rand() * 40),
          unit: "kg",
        },
        bodyTypes: pick(BODY_TYPES, rand),
        orientation: pick(ORIENTATIONS, rand),
        position: pick(POSITIONS, rand),
        lookingFor: pickMultiple(LOOKING_FOR_OPTIONS, 1, 3, rand),
        ethnicity: pick(ETHNICITIES, rand),
        relationshipStatus: pick(RELATIONSHIP_STATUSES, rand),
        hasCompletedOnboarding: true,
        measurementSystem: "metric",
        profilePictures,
      });

      await geospatial.insert(ctx, userId, { latitude: lat, longitude: lng }, {});
      count++;
    }

    // Seed authenticated users (can actually log in)
    const AUTH_USERS = [
      {
        email: "maxime.gey@nativesquare.fr",
        password: "preview2026",
        name: "Maxime",
        city: "Paris",
        lat: 48.8566,
        lng: 2.3522,
      },
      {
        email: "testuser@oomphh.cz",
        password: "preview2026",
        name: "Test User",
        city: "Paris",
        lat: 48.8606,
        lng: 2.3376,
      },
    ];

    for (const authUser of AUTH_USERS) {
      const userId = await ctx.db.insert("users", {
        name: authUser.name,
        email: authUser.email,
        bio: `Hey from ${authUser.city}! 👋`,
        birthDate: "1995-06-15T00:00:00Z",
        birthLocation: authUser.city,
        height: { value: 180, unit: "cm" },
        weight: { value: 75, unit: "kg" },
        bodyTypes: "Athletic",
        orientation: "Gay",
        position: "Versatile",
        lookingFor: ["Connections", "Friends", "Dating"],
        ethnicity: "White",
        relationshipStatus: "Single",
        hasCompletedOnboarding: true,
        measurementSystem: "metric",
      });

      await ctx.db.insert("authAccounts", {
        userId,
        provider: "password",
        providerAccountId: authUser.email,
        secret: authUser.password,
      });

      await geospatial.insert(ctx, userId, { latitude: authUser.lat, longitude: authUser.lng }, {});
      count++;
    }

    // Collect all seed user IDs for seeding views, taps, stories, events
    const allSeedUsers = await ctx.db
      .query("users")
      .filter((q) => q.neq(q.field("email"), "maxime.gey@nativesquare.fr"))
      .filter((q) => q.neq(q.field("email"), "testuser@oomphh.cz"))
      .collect();

    // Find Maxime's user ID
    const maximeUser = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), "maxime.gey@nativesquare.fr"))
      .first();

    if (maximeUser && allSeedUsers.length >= 10) {
      // Seed 10 views from mock users to Maxime's profile
      for (let i = 0; i < 10; i++) {
        await ctx.db.insert("views", {
          fromUserId: allSeedUsers[i]._id,
          toUserId: maximeUser._id,
        });
      }
      console.log("Seeded 10 views to Maxime's profile.");

      // Seed 10 taps from mock users to Maxime's profile
      for (let i = 0; i < 10; i++) {
        await ctx.db.insert("taps", {
          fromUserId: allSeedUsers[i + 10]._id,
          toUserId: maximeUser._id,
          emoji: TAP_EMOJIS[i % TAP_EMOJIS.length],
        });
      }
      console.log("Seeded 10 taps to Maxime's profile.");
    }

    // Seed 20 stories from mock users (reuse profile picture storage IDs)
    if (args.profilePictureIds.length > 0) {
      const now = Date.now();
      const TWENTY_FOUR_HOURS_MS = 24 * 60 * 60 * 1000;
      for (let i = 0; i < 20 && i < allSeedUsers.length; i++) {
        await ctx.db.insert("stories", {
          authorId: allSeedUsers[i]._id,
          imageStorageId: args.profilePictureIds[i % args.profilePictureIds.length],
          expiresAt: now + TWENTY_FOUR_HOURS_MS,
        });
      }
      console.log("Seeded 20 stories from mock users.");
    }

    // Seed 5 events from mock users
    for (let i = 0; i < SEED_EVENTS.length && i < allSeedUsers.length; i++) {
      const event = SEED_EVENTS[i];
      const now = Date.now();
      // Schedule events 1-7 days in the future
      const eventDate = now + (i + 1) * 24 * 60 * 60 * 1000;

      const eventId = await ctx.db.insert("events", {
        organizerId: allSeedUsers[i]._id,
        title: event.title,
        location: event.location,
        latitude: event.latitude,
        longitude: event.longitude,
        date: eventDate,
        description: event.description,
        eventType: event.eventType,
        maxAttendees: event.maxAttendees,
      });

      // Organizer auto-joins
      await ctx.db.insert("eventAttendees", {
        eventId,
        userId: allSeedUsers[i]._id,
      });

      // Add a few random attendees
      for (let j = 1; j <= 3 && i + j < allSeedUsers.length; j++) {
        await ctx.db.insert("eventAttendees", {
          eventId,
          userId: allSeedUsers[i + j]._id,
        });
      }
    }
    console.log("Seeded 5 events from mock users.");

    console.log(`Seeded ${count} preview users (including ${AUTH_USERS.length} with login) across ${new Set(SEED_USERS.map((u) => u.city)).size}+ cities.`);
    return { seeded: true, count };
  },
});
