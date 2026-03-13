import { GeospatialIndex } from "@convex-dev/geospatial";
import { components } from "./_generated/api";
import { Id } from "./_generated/dataModel";
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
const ORIENTATIONS = ["Gay", "Bisexual", "Queer", "Pansexual"];
const POSITIONS = ["Top", "Bottom", "Versatile", "Side"];
const LOOKING_FOR_OPTIONS = ["Connections", "Friends", "Dating"];
const ETHNICITIES = [
  "Asian", "Black", "Latino/Hispanic", "Middle Eastern", "Mixed",
  "Pacific Islander", "South Asian", "White", "Other",
];
const RELATIONSHIP_STATUSES = [
  "Single", "In a relationship", "Open relationship", "Married",
];

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
  // Ages between 20 and 45
  const age = 20 + Math.floor(rand() * 26);
  const year = new Date().getFullYear() - age;
  const month = 1 + Math.floor(rand() * 12);
  const day = 1 + Math.floor(rand() * 28);
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}T00:00:00Z`;
}

export const seedPreviewUsers = internalMutation({
  args: {},
  handler: async (ctx) => {
    // Check if we already seeded by looking for a user with a seed email pattern
    const existing = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), "seed-0@oomphh.preview"))
      .first();

    if (existing) {
      console.log("Preview users already seeded, skipping.");
      return { seeded: false, count: 0 };
    }

    let count = 0;

    for (let i = 0; i < SEED_USERS.length; i++) {
      const { city, lat, lng } = SEED_USERS[i];
      const rand = seededRandom(i * 7919 + 42);

      const name = FIRST_NAMES[i % FIRST_NAMES.length];

      const userId = await ctx.db.insert("users", {
        name,
        email: `seed-${i}@oomphh.preview`,
        bio: `Hey from ${city}! 👋`,
        birthDate: randomBirthDate(rand),
        birthLocation: city,
        height: {
          value: 165 + Math.floor(rand() * 30), // 165-194 cm
          unit: "cm",
        },
        weight: {
          value: 60 + Math.floor(rand() * 40), // 60-99 kg
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
      });

      // Register in the geospatial index so they appear in discovery
      await geospatial.insert(ctx, userId, { latitude: lat, longitude: lng }, {});

      count++;
    }

    console.log(`Seeded ${count} preview users across ${new Set(SEED_USERS.map((u) => u.city)).size} cities.`);
    return { seeded: true, count };
  },
});
