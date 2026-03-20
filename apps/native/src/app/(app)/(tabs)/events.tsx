import { EventCard } from "@/components/app/events/event-card";
import {
  EventsHeader,
  SearchLocation,
} from "@/components/app/events/events-header";
import { Text } from "@/components/ui/text";
import {
  EVENT_FILTERS_STORAGE_KEY,
  EVENT_SEARCH_LOCATION_STORAGE_KEY,
} from "@/constants/events";
import { api } from "@packages/backend/convex/_generated/api";
import { Id } from "@packages/backend/convex/_generated/dataModel";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { useMutation, useQuery } from "convex/react";
import { router } from "expo-router";
import React from "react";
import { Alert, ScrollView, View } from "react-native";
import { useSubscription } from "@/hooks/use-subscription";
import { EventFilterData } from "../event-filters";

function formatEventDate(timestamp: number): string {
  const date = new Date(timestamp);
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dayName = days[date.getDay()];
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  const displayHours = hours % 12 || 12;
  const displayMinutes = String(minutes).padStart(2, "0");
  return `${dayName}, ${displayHours}:${displayMinutes} ${ampm}`;
}

const defaultFilters: EventFilterData = {
  eventType: [],
  dateRange: "",
};

export default function Events() {
  const [filters, setFilters] = React.useState<EventFilterData>(defaultFilters);
  const [searchLocation, setSearchLocation] =
    React.useState<SearchLocation | null>(null);

  const loadFilters = React.useCallback(async () => {
    try {
      const saved = await AsyncStorage.getItem(EVENT_FILTERS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        const next: EventFilterData = {
          eventType: parsed.eventType ?? [],
          dateRange: parsed.dateRange ?? "",
        };
        setFilters((prev) => {
          if (JSON.stringify(prev) === JSON.stringify(next)) return prev;
          return next;
        });
      }
    } catch (error) {
      console.error("Error loading event filters:", error);
    }
  }, []);

  const loadSearchLocation = React.useCallback(async () => {
    try {
      const saved = await AsyncStorage.getItem(
        EVENT_SEARCH_LOCATION_STORAGE_KEY,
      );
      if (saved) {
        const parsed = JSON.parse(saved) as SearchLocation;
        setSearchLocation((prev) => {
          if (JSON.stringify(prev) === JSON.stringify(parsed)) return prev;
          return parsed;
        });
      } else {
        setSearchLocation((prev) => (prev === null ? prev : null));
      }
    } catch (error) {
      console.error("Error loading event search location:", error);
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

  const queryFilters: {
    eventType?: string[];
    dateRange?: string;
    searchLatitude?: number;
    searchLongitude?: number;
  } = {};

  if (filters.eventType.length > 0) {
    queryFilters.eventType = filters.eventType;
  }
  if (filters.dateRange && filters.dateRange !== "Any Time") {
    queryFilters.dateRange = filters.dateRange;
  }

  if (searchLocation) {
    queryFilters.searchLatitude = searchLocation.latitude;
    queryFilters.searchLongitude = searchLocation.longitude;
  }

  const hasActiveFilters =
    filters.eventType.length > 0 ||
    (filters.dateRange !== "" && filters.dateRange !== "Any Time");

  const { capabilities } = useSubscription();
  const events = useQuery(api.table.events.getEvents, queryFilters);
  const myRSVPCount = useQuery(api.table.events.getMyRSVPCount);
  const joinEvent = useMutation(api.table.events.joinEvent);
  const leaveEvent = useMutation(api.table.events.leaveEvent);

  const handleEventPress = (eventId: string) => {
    router.push({ pathname: "/event-detail", params: { id: eventId } });
  };

  const handleJoinPress = async (eventId: Id<"events">, hasJoined: boolean) => {
    if (!hasJoined && (myRSVPCount ?? 0) >= capabilities.maxEventRSVPs) {
      Alert.alert(
        "RSVP Limit Reached",
        `You can RSVP to up to ${capabilities.maxEventRSVPs} events on your current plan. Upgrade to join more.`,
        [
          { text: "Cancel", style: "cancel" },
          { text: "Upgrade", onPress: () => router.push("/paywall" as any) },
        ],
      );
      return;
    }

    try {
      if (hasJoined) {
        await leaveEvent({ eventId });
      } else {
        await joinEvent({ eventId });
      }
    } catch (error: any) {
      Alert.alert("Error", error.message ?? "Something went wrong");
    }
  };

  const handleLocationChange = (location: SearchLocation | null) => {
    setSearchLocation(location);
  };

  const isLoading = events === undefined;

  return (
    <ScrollView
      className="bg-background"
      keyboardShouldPersistTaps="handled"
      contentContainerClassName="items-center p-4 py-8 mt-safe"
      keyboardDismissMode="interactive"
      showsVerticalScrollIndicator={false}
    >
      <View className="w-full max-w-sm gap-5">
        <View style={{ zIndex: 50 }}>
          <EventsHeader
            searchLocation={searchLocation}
            hasActiveFilters={hasActiveFilters}
            onFilterPress={() => router.push("/event-filters")}
            onCreatePress={() => router.push("/create-event")}
            onLocationChange={handleLocationChange}
          />
        </View>

        {isLoading ? (
          <View className="items-center py-10">
            <Text className="text-sm text-[#70707b]">Loading events...</Text>
          </View>
        ) : events.length === 0 ? (
          <View className="items-center py-10">
            <Text className="text-sm text-[#70707b]">No events found</Text>
          </View>
        ) : (
          <View className="gap-4">
            {events.map((event) => (
              <EventCard
                key={event._id}
                id={event._id}
                title={event.title}
                date={formatEventDate(event.date)}
                location={event.location}
                imageUri={event.imageUrl ?? ""}
                attendeeAvatars={event.attendeeAvatars}
                totalAttendees={event.totalAttendees}
                hasJoined={event.hasJoined}
                onPress={() => handleEventPress(event._id)}
                onJoinPress={() => handleJoinPress(event._id, event.hasJoined)}
              />
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
}
