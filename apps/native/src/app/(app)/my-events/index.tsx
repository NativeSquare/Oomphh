import { EventCard } from "@/components/app/events/event-card";
import { ConfirmBottomSheet } from "@/components/custom/confirm-bottom-sheet";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { api } from "@packages/backend/convex/_generated/api";
import { Id } from "@packages/backend/convex/_generated/dataModel";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useMutation, useQuery } from "convex/react";
import { router } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import React from "react";
import { ActivityIndicator, Alert, Pressable, ScrollView, View } from "react-native";

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

export default function MyEvents() {
  const events = useQuery(api.table.events.getMyOrganizedEvents);
  const deleteEvent = useMutation(api.table.events.deleteEvent);
  const confirmRef = React.useRef<BottomSheetModal>(null);
  const [pendingDelete, setPendingDelete] = React.useState<{
    eventId: Id<"events">;
    title: string;
  } | null>(null);

  const handleEventPress = (eventId: string) => {
    router.push({ pathname: "/event-detail", params: { id: eventId } });
  };

  const handleDeletePress = (eventId: Id<"events">, title: string) => {
    setPendingDelete({ eventId, title });
    confirmRef.current?.present();
  };

  const handleConfirmDelete = async () => {
    if (!pendingDelete) return;
    try {
      await deleteEvent({ eventId: pendingDelete.eventId });
    } catch (error: any) {
      Alert.alert("Error", error.message ?? "Failed to delete event");
    }
    setPendingDelete(null);
  };

  const isLoading = events === undefined;

  return (
    <ScrollView
      contentContainerClassName="items-center p-4 py-8 mt-safe"
      showsVerticalScrollIndicator={false}
    >
      <View className="w-full max-w-sm gap-5">
        {/* Header */}
        <View className="flex-row items-center gap-3">
          <Pressable
            onPress={() => router.back()}
            className="size-6 items-center justify-center"
          >
            <Icon as={ArrowLeft} size={24} className="text-white" />
          </Pressable>
          <Text className="text-xl font-medium text-white">My Events</Text>
        </View>

        {/* Content */}
        {isLoading ? (
          <View className="items-center py-10">
            <ActivityIndicator size="large" color="#E63B2E" />
          </View>
        ) : events.length === 0 ? (
          <View className="items-center py-10">
            <Text className="text-sm text-[#70707b]">
              You haven't organized any events yet
            </Text>
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
                onPress={() => handleEventPress(event._id)}
                onJoinPress={() => handleDeletePress(event._id, event.title)}
                actionLabel="Delete"
                actionVariant="destructive"
              />
            ))}
          </View>
        )}
      </View>

      <ConfirmBottomSheet
        bottomSheetModalRef={confirmRef}
        title="Delete Event"
        description={`Are you sure you want to delete "${pendingDelete?.title}"? This action cannot be undone.`}
        confirmLabel="Delete"
        confirmVariant="destructive"
        onConfirm={handleConfirmDelete}
        onCancel={() => setPendingDelete(null)}
      />
    </ScrollView>
  );
}
