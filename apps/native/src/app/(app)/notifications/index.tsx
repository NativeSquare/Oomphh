import { NotificationSettings } from "@/components/app/settings/notification-settings";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { router } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import { Pressable, ScrollView, View } from "react-native";

export default function Notifications() {
  return (
    <View className="flex-1 mt-safe">
      <ScrollView
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="interactive"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
        contentContainerClassName="px-4 pb-6"
      >
        <View className="w-full max-w-md self-center flex flex-1 gap-6">
          <View className="flex-row items-center justify-between px-5 pt-6">
            <Pressable
              onPress={() => router.dismissTo("/profile")}
              className="size-6"
            >
              <Icon as={ChevronLeft} size={24} className="text-white" />
            </Pressable>
            <Text className="text-xl font-medium text-white">
              Notifications
            </Text>
            <View className="size-6" />
          </View>

          <NotificationSettings />
        </View>
      </ScrollView>
    </View>
  );
}
