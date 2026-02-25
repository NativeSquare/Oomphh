import { useLocationTracking } from "@/hooks/use-location-tracking";
import { usePushNotifications } from "@/hooks/use-push-notifications";
import { Slot } from "expo-router";
import { View } from "react-native";

export default function AppLayout() {
  useLocationTracking();
  usePushNotifications();

  return (
    <View className="flex-1 bg-background">
      <Slot />
    </View>
  );
}
