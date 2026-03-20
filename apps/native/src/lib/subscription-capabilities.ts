import type { SubscriptionTier } from "./revenue-cat";

export type AlbumVisibilityOption =
  | "10min"
  | "1hour"
  | "24hours"
  | "viewOnce"
  | "unlimited";

export type SubscriptionCapabilities = {
  gridLimit: number;
  viewsVisible: number;
  tapsVisible: number;
  remoteBrowsing: boolean;
  remoteBrowsingLimit: number;
  maxStories: number;
  storyMessagingAllowed: boolean;
  maxCachedPhotos: number;
  maxPhotosPerSend: number;
  maxDisappearingPhotos: number;
  maxAlbums: number;
  maxPhotosPerAlbum: number;
  albumVisibilityOptions: AlbumVisibilityOption[];
  maxEventRSVPs: number;
  eventParticipantsVisible: boolean;
  maxTravelCities: number;
  freeBoostsPerMonth: number;
  chatTranslation: boolean;
  advancedFilters: boolean;
};

const ALL_VISIBILITY_OPTIONS: AlbumVisibilityOption[] = [
  "10min",
  "1hour",
  "24hours",
  "viewOnce",
  "unlimited",
];

export const SUBSCRIPTION_CAPABILITIES: Record<
  SubscriptionTier,
  SubscriptionCapabilities
> = {
  free: {
    gridLimit: 60,
    viewsVisible: 5,
    tapsVisible: 5,
    remoteBrowsing: false,
    remoteBrowsingLimit: 0,
    maxStories: 5,
    storyMessagingAllowed: false,
    maxCachedPhotos: 6,
    maxPhotosPerSend: 3,
    maxDisappearingPhotos: 3,
    maxAlbums: 1,
    maxPhotosPerAlbum: 3,
    albumVisibilityOptions: ["unlimited"],
    maxEventRSVPs: 3,
    eventParticipantsVisible: false,
    maxTravelCities: 0,
    freeBoostsPerMonth: 0,
    chatTranslation: false,
    advancedFilters: false,
  },
  premium: {
    gridLimit: 500,
    viewsVisible: Infinity,
    tapsVisible: Infinity,
    remoteBrowsing: true,
    remoteBrowsingLimit: 100,
    maxStories: 20,
    storyMessagingAllowed: true,
    maxCachedPhotos: 20,
    maxPhotosPerSend: Infinity,
    maxDisappearingPhotos: 6,
    maxAlbums: 3,
    maxPhotosPerAlbum: 5,
    albumVisibilityOptions: ALL_VISIBILITY_OPTIONS,
    maxEventRSVPs: 5,
    eventParticipantsVisible: true,
    maxTravelCities: 3,
    freeBoostsPerMonth: 2,
    chatTranslation: false,
    advancedFilters: true,
  },
  unlimited: {
    gridLimit: Infinity,
    viewsVisible: Infinity,
    tapsVisible: Infinity,
    remoteBrowsing: true,
    remoteBrowsingLimit: Infinity,
    maxStories: Infinity,
    storyMessagingAllowed: true,
    maxCachedPhotos: Infinity,
    maxPhotosPerSend: Infinity,
    maxDisappearingPhotos: Infinity,
    maxAlbums: 10,
    maxPhotosPerAlbum: 10,
    albumVisibilityOptions: ALL_VISIBILITY_OPTIONS,
    maxEventRSVPs: Infinity,
    eventParticipantsVisible: true,
    maxTravelCities: Infinity,
    freeBoostsPerMonth: 4,
    chatTranslation: true,
    advancedFilters: true,
  },
};
