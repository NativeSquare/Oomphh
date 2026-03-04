import { useLocationTracking } from "@/hooks/use-location-tracking";
import { usePushNotifications } from "@/hooks/use-push-notifications";
import { Stack } from "expo-router";
import { View } from "react-native";

export default function AppLayout() {
  useLocationTracking();
  usePushNotifications();

  return (
    <View className="flex-1 bg-background">
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "fade",
          animationDuration: 150,
          contentStyle: { backgroundColor: "transparent" },
        }}
      />
    </View>
  );
}
