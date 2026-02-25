import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Text } from "@/components/ui/text";
import { api } from "@packages/backend/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { View } from "react-native";

type NotificationCategory = "messages" | "taps" | "storyLikes";

const NOTIFICATION_OPTIONS: Array<{
  key: NotificationCategory;
  label: string;
  description: string;
}> = [
  { key: "messages", label: "Messages", description: "New direct messages" },
  { key: "taps", label: "Taps", description: "When someone taps you" },
  {
    key: "storyLikes",
    label: "Story Likes",
    description: "When someone likes your story",
  },
];

export function NotificationSettings() {
  const preferences = useQuery(
    api.table.notificationPreferences.getPreferences
  );
  const updatePreferences = useMutation(
    api.table.notificationPreferences.updatePreferences
  );

  if (!preferences) return null;

  return (
    <View className="gap-3">
      <View className="flex-col gap-4">
        {NOTIFICATION_OPTIONS.map((option, index) => (
          <View key={option.key}>
            <View className="flex-row items-center justify-between">
              <View className="flex-1 mr-4">
                <Label
                  nativeID={`notification-${option.key}`}
                  htmlFor={`notification-${option.key}`}
                >
                  {option.label}
                </Label>
                <Text className="text-xs text-muted-foreground mt-1">
                  {option.description}
                </Text>
              </View>
              <Switch
                checked={preferences[option.key]}
                onCheckedChange={(checked) =>
                  updatePreferences({ [option.key]: checked })
                }
                id={`notification-${option.key}`}
                nativeID={`notification-${option.key}`}
              />
            </View>
            {index < NOTIFICATION_OPTIONS.length - 1 && (
              <Separator className="mt-4" />
            )}
          </View>
        ))}
      </View>
    </View>
  );
}
