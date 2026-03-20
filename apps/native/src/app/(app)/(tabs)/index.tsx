import { HomeFiltersRow } from "@/components/app/home/home-filters-row";
import { HomeHeader } from "@/components/app/home/home-header";
import { LockedGridItem } from "@/components/app/home/locked-grid-item";
import { NearestUsersGridItem } from "@/components/app/home/nearest-users-grid-item";
import { NearestUsersGridItemSkeleton } from "@/components/app/home/nearest-users-grid-item-skeleton";
import { useSubscription } from "@/hooks/use-subscription";
import { cmToFeetInches, kgToLbs } from "@/utils/measurements";
import { usePresence } from "@convex-dev/presence/react-native";
import { api } from "@packages/backend/convex/_generated/api";
import type { Doc } from "@packages/backend/convex/_generated/dataModel";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { useQuery } from "convex/react";
import { router } from "expo-router";
import React, { useMemo } from "react";
import { Dimensions, ScrollView, View } from "react-native";
import { FilterData } from "../filters";
import { SEARCH_LOCATION_STORAGE_KEY } from "../location-search";

const FILTERS_STORAGE_KEY = "filters";

type SearchLocation = {
  latitude: number;
  longitude: number;
  name?: string;
  address?: string;
};
const DEFAULT_MIN_AGE = 18;
const DEFAULT_MAX_AGE = 99;
const DEFAULT_MIN_HEIGHT = 120;
const DEFAULT_MAX_HEIGHT = 220;
const DEFAULT_MIN_WEIGHT = 40;
const DEFAULT_MAX_WEIGHT = 150;

export default function Home() {
  const user = useQuery(api.table.users.currentUser);
  const { capabilities } = useSubscription();
  const advancedFiltersAllowed = capabilities.advancedFilters;
  const defaultFilters: FilterData = {
    minAge: DEFAULT_MIN_AGE,
    maxAge: DEFAULT_MAX_AGE,
    minHeight: DEFAULT_MIN_HEIGHT,
    maxHeight: DEFAULT_MAX_HEIGHT,
    minWeight: DEFAULT_MIN_WEIGHT,
    maxWeight: DEFAULT_MAX_WEIGHT,
    lookingFor: [],
    orientation: "",
    position: "",
    bodyType: "",
    ethnicity: "",
    relationshipStatus: "",
  };
  const [filters, setFilters] = React.useState<FilterData>(defaultFilters);
  const [showFavoritesOnly, setShowFavoritesOnly] = React.useState(false);
  const [showOnlineOnly, setShowOnlineOnly] = React.useState(false);
  const [searchLocation, setSearchLocation] =
    React.useState<SearchLocation | null>(null);
  const favorites = useQuery(api.table.users.getFavorites);

  const loadFilters = React.useCallback(async () => {
    try {
      const savedFilters = await AsyncStorage.getItem(FILTERS_STORAGE_KEY);
      if (savedFilters) {
        const parsed = JSON.parse(savedFilters);
        const next: FilterData = {
          minAge: parsed.minAge ?? DEFAULT_MIN_AGE,
          maxAge: parsed.maxAge ?? DEFAULT_MAX_AGE,
          minHeight: parsed.minHeight ?? DEFAULT_MIN_HEIGHT,
          maxHeight: parsed.maxHeight ?? DEFAULT_MAX_HEIGHT,
          minWeight: parsed.minWeight ?? DEFAULT_MIN_WEIGHT,
          maxWeight: parsed.maxWeight ?? DEFAULT_MAX_WEIGHT,
          lookingFor: parsed.lookingFor ?? [],
          orientation: parsed.orientation ?? "",
          position: parsed.position ?? "",
          bodyType: parsed.bodyType ?? "",
          ethnicity: parsed.ethnicity ?? "",
          relationshipStatus: parsed.relationshipStatus ?? "",
        };
        setFilters((prev) => {
          if (JSON.stringify(prev) === JSON.stringify(next)) return prev;
          return next;
        });
      }
    } catch (error) {
      console.error("Error loading filters:", error);
    }
  }, []);

  const loadSearchLocation = React.useCallback(async () => {
    try {
      const savedLocation = await AsyncStorage.getItem(
        SEARCH_LOCATION_STORAGE_KEY,
      );
      if (savedLocation) {
        const parsed = JSON.parse(savedLocation) as SearchLocation;
        setSearchLocation((prev) => {
          if (JSON.stringify(prev) === JSON.stringify(parsed)) return prev;
          return parsed;
        });
      } else {
        setSearchLocation((prev) => (prev === null ? prev : null));
      }
    } catch (error) {
      console.error("Error loading search location:", error);
    }
  }, []);

  React.useEffect(() => {
    loadFilters();
    loadSearchLocation();
  }, [loadFilters, loadSearchLocation]);

  useFocusEffect(
    React.useCallback(() => {
      loadFilters();
      loadSearchLocation();
    }, [loadFilters, loadSearchLocation]),
  );

  // Check if filters are active (non-default)
  const hasActiveFilters = useMemo(() => {
    const hasFreeFilters =
      filters.minAge !== DEFAULT_MIN_AGE ||
      filters.maxAge !== DEFAULT_MAX_AGE ||
      filters.minHeight !== DEFAULT_MIN_HEIGHT ||
      filters.maxHeight !== DEFAULT_MAX_HEIGHT ||
      filters.minWeight !== DEFAULT_MIN_WEIGHT ||
      filters.maxWeight !== DEFAULT_MAX_WEIGHT;

    const hasPremiumFilters = advancedFiltersAllowed && (
      filters.lookingFor.length > 0 ||
      filters.orientation !== "" ||
      filters.position !== "" ||
      filters.bodyType !== "" ||
      filters.ethnicity !== "" ||
      filters.relationshipStatus !== ""
    );

    return hasFreeFilters || hasPremiumFilters;
  }, [filters, advancedFiltersAllowed]);

  const favoriteIds = useMemo(() => {
    if (!favorites) return new Set<string>();
    return new Set(favorites.map((f) => f._id));
  }, [favorites]);

  // Get active filter labels
  const measurementSystem = user?.measurementSystem ?? "metric";
  const activeFilterLabels = useMemo(() => {
    const labels: string[] = [];

    if (
      filters.minAge !== DEFAULT_MIN_AGE ||
      filters.maxAge !== DEFAULT_MAX_AGE
    ) {
      labels.push(`${filters.minAge}-${filters.maxAge} yrs`);
    }

    if (
      filters.minHeight !== DEFAULT_MIN_HEIGHT ||
      filters.maxHeight !== DEFAULT_MAX_HEIGHT
    ) {
      const minH = filters.minHeight ?? DEFAULT_MIN_HEIGHT;
      const maxH = filters.maxHeight ?? DEFAULT_MAX_HEIGHT;
      if (measurementSystem === "imperial") {
        const minFt = cmToFeetInches(minH);
        const maxFt = cmToFeetInches(maxH);
        labels.push(
          `${minFt.feet}'${minFt.inches}"-${maxFt.feet}'${maxFt.inches}"`,
        );
      } else {
        labels.push(`${minH}-${maxH}cm`);
      }
    }

    if (
      filters.minWeight !== DEFAULT_MIN_WEIGHT ||
      filters.maxWeight !== DEFAULT_MAX_WEIGHT
    ) {
      const minW = filters.minWeight ?? DEFAULT_MIN_WEIGHT;
      const maxW = filters.maxWeight ?? DEFAULT_MAX_WEIGHT;
      if (measurementSystem === "imperial") {
        labels.push(`${kgToLbs(minW)}-${kgToLbs(maxW)}lbs`);
      } else {
        labels.push(`${minW}-${maxW}kg`);
      }
    }

    // Only show premium filter labels if user has advanced filters
    if (advancedFiltersAllowed) {
      if (filters.lookingFor.length > 0) {
        labels.push(...filters.lookingFor);
      }

      if (filters.orientation) {
        labels.push(filters.orientation);
      }

      if (filters.position) {
        labels.push(filters.position);
      }

      if (filters.bodyType) {
        labels.push(filters.bodyType);
      }

      if (filters.ethnicity) {
        labels.push(filters.ethnicity);
      }

      if (filters.relationshipStatus) {
        labels.push(filters.relationshipStatus);
      }
    }

    if (showFavoritesOnly) {
      labels.push("Favorites");
    }

    if (showOnlineOnly) {
      labels.push("Online");
    }

    return labels;
  }, [filters, measurementSystem, showFavoritesOnly, showOnlineOnly, advancedFiltersAllowed]);

  const handleClearAll = async () => {
    setFilters(defaultFilters);
    setShowFavoritesOnly(false);
    setShowOnlineOnly(false);
    try {
      await AsyncStorage.setItem(
        FILTERS_STORAGE_KEY,
        JSON.stringify(defaultFilters),
      );
    } catch (error) {
      console.error("Error clearing filters:", error);
    }
  };

  // Build filters object with only non-default values
  // Premium-only filters (lookingFor, orientation, position, bodyType, ethnicity, relationshipStatus)
  // are excluded for free users
  const activeFiltersForQuery = useMemo(() => {
    const result: Partial<FilterData> = {};

    // Free filters: age, height, weight
    if (filters.minAge !== DEFAULT_MIN_AGE) result.minAge = filters.minAge;
    if (filters.maxAge !== DEFAULT_MAX_AGE) result.maxAge = filters.maxAge;
    if (filters.minHeight !== DEFAULT_MIN_HEIGHT)
      result.minHeight = filters.minHeight;
    if (filters.maxHeight !== DEFAULT_MAX_HEIGHT)
      result.maxHeight = filters.maxHeight;
    if (filters.minWeight !== DEFAULT_MIN_WEIGHT)
      result.minWeight = filters.minWeight;
    if (filters.maxWeight !== DEFAULT_MAX_WEIGHT)
      result.maxWeight = filters.maxWeight;

    // Premium filters: only include if user has advanced filters capability
    if (advancedFiltersAllowed) {
      if (filters.lookingFor.length > 0) result.lookingFor = filters.lookingFor;
      if (filters.orientation) result.orientation = filters.orientation;
      if (filters.position) result.position = filters.position;
      if (filters.bodyType) result.bodyType = filters.bodyType;
      if (filters.ethnicity) result.ethnicity = filters.ethnicity;
      if (filters.relationshipStatus)
        result.relationshipStatus = filters.relationshipStatus;
    }

    return Object.keys(result).length > 0 ? result : undefined;
  }, [filters, advancedFiltersAllowed]);

  if (!user?._id) return <View className="flex-1 bg-background" />;

  return (
    <HomeContent
      user={user}
      activeFiltersForQuery={activeFiltersForQuery}
      searchLocation={searchLocation}
      showFavoritesOnly={showFavoritesOnly}
      showOnlineOnly={showOnlineOnly}
      favoriteIds={favoriteIds}
      hasActiveFilters={hasActiveFilters}
      activeFilterLabels={activeFilterLabels}
      handleClearAll={handleClearAll}
      setShowFavoritesOnly={setShowFavoritesOnly}
      setShowOnlineOnly={setShowOnlineOnly}
    />
  );
}

function HomeContent({
  user,
  activeFiltersForQuery,
  searchLocation,
  showFavoritesOnly,
  showOnlineOnly,
  favoriteIds,
  hasActiveFilters,
  activeFilterLabels,
  handleClearAll,
  setShowFavoritesOnly,
  setShowOnlineOnly,
}: {
  user: Doc<"users">;
  activeFiltersForQuery: Partial<FilterData> | undefined;
  searchLocation: { latitude: number; longitude: number; name?: string; address?: string } | null;
  showFavoritesOnly: boolean;
  showOnlineOnly: boolean;
  favoriteIds: Set<string>;
  hasActiveFilters: boolean;
  activeFilterLabels: string[];
  handleClearAll: () => void;
  setShowFavoritesOnly: React.Dispatch<React.SetStateAction<boolean>>;
  setShowOnlineOnly: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const presenceState = usePresence(api.presence, "public", user._id);
  const nearestUsers = useQuery(api.table.geospatial.getNearestUsers, {
    id: user._id,
    filters: activeFiltersForQuery,
    customLocation: searchLocation
      ? {
          latitude: searchLocation.latitude,
          longitude: searchLocation.longitude,
        }
      : undefined,
  });

  const { gridLimit, capabilities } = useSubscription();

  const displayUsers = useMemo(() => {
    if (!nearestUsers) return undefined;
    let users = nearestUsers;

    if (showFavoritesOnly) {
      users = users.filter((u) => favoriteIds.has(u._id));
    }

    if (showOnlineOnly) {
      users = users.filter((u) => {
        if (u.privacy?.hideOnlineStatus === true) return false;
        const presence = (presenceState || []).find(
          (state) => state.userId === u._id,
        );
        return presence?.online ?? false;
      });
    }

    // Apply remote browsing limit when using a custom search location
    if (searchLocation && isFinite(capabilities.remoteBrowsingLimit)) {
      users = users.slice(0, capabilities.remoteBrowsingLimit);
    }

    return users;
  }, [nearestUsers, showFavoritesOnly, showOnlineOnly, favoriteIds, presenceState, searchLocation, capabilities.remoteBrowsingLimit]);

  const { visibleUsers, lockedUsers } = useMemo(() => {
    if (!displayUsers) return { visibleUsers: undefined, lockedUsers: [] };
    return {
      visibleUsers: displayUsers.slice(0, gridLimit),
      lockedUsers: displayUsers.slice(gridLimit),
    };
  }, [displayUsers, gridLimit]);

  const userRows = useMemo(() => {
    if (!visibleUsers) return [];
    const allItems = [
      ...visibleUsers.map((u) => ({ type: "visible" as const, user: u })),
      ...lockedUsers.map((u) => ({ type: "locked" as const, user: u })),
    ];
    const rows: (typeof allItems)[] = [];
    const columnsPerRow = 3;
    for (let i = 0; i < allItems.length; i += columnsPerRow) {
      rows.push(allItems.slice(i, i + columnsPerRow));
    }
    return rows;
  }, [visibleUsers, lockedUsers]);

  const screenWidth = Dimensions.get("window").width;
  const maxWidth = 384; // max-w-sm (384px)
  const containerWidth = Math.min(screenWidth, maxWidth);
  const padding = 32; // px-4 on each side (16px * 2)
  const gap = 6; // gap-1.5 (6px)
  const gapsTotal = (3 - 1) * gap; // 2 gaps for 3 items
  const itemWidth = (containerWidth - padding - gapsTotal) / 3;

  return (
    <ScrollView
      className="bg-background"
      keyboardShouldPersistTaps="handled"
      contentContainerClassName="sm:flex-1 items-center justify-center p-4 py-8 sm:py-4 sm:p-6 mt-safe"
      keyboardDismissMode="interactive"
    >
      <View className="w-full max-w-sm gap-4">
        <HomeHeader
          user={user}
          searchLocation={searchLocation}
          hasActiveFilters={hasActiveFilters}
          onFilterPress={() => router.push("/filters")}
          showFavoritesOnly={showFavoritesOnly}
          onFavoritesToggle={() => setShowFavoritesOnly((prev) => !prev)}
          showOnlineOnly={showOnlineOnly}
          onOnlineToggle={() => setShowOnlineOnly((prev) => !prev)}
        />
        <HomeFiltersRow
          activeFilterLabels={activeFilterLabels}
          onClearAll={handleClearAll}
        />
        <View className="gap-1.5">
          {visibleUsers === undefined
            ? // Show skeleton loading state (3 rows, 3 items per row)
              Array.from({ length: 3 }).map((_, rowIndex) => (
                <View key={rowIndex} className="flex-row gap-1.5">
                  {Array.from({ length: 3 }).map((_, colIndex) => (
                    <View key={colIndex} style={{ width: itemWidth }}>
                      <NearestUsersGridItemSkeleton />
                    </View>
                  ))}
                </View>
              ))
            : userRows.map((row, rowIndex) => (
                <View key={rowIndex} className="flex-row gap-1.5">
                  {row.map((item) => (
                    <View key={item.user._id} style={{ width: itemWidth }}>
                      {item.type === "visible" ? (
                        <NearestUsersGridItem
                          userItem={item.user}
                          presenceState={presenceState}
                        />
                      ) : (
                        <LockedGridItem userItem={item.user} />
                      )}
                    </View>
                  ))}
                </View>
              ))}
        </View>
      </View>
    </ScrollView>
  );
}
