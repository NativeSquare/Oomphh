import { Text } from "@/components/ui/text";
import { Ionicons } from "@expo/vector-icons";
import { Image, View } from "react-native";

export type EventMessageBubbleProps = {
  message: string;
  timestamp: string;
  isOutgoing: boolean;
  senderName: string;
  senderAvatarUrl: string | null;
};

export function EventMessageBubble({
  message,
  timestamp,
  isOutgoing,
  senderName,
  senderAvatarUrl,
}: EventMessageBubbleProps) {
  if (isOutgoing) {
    return (
      <View className="flex-col items-end mb-3">
        <View className="px-4 py-2.5 max-w-[80%] bg-[#f7cfb0] rounded-2xl">
          <Text className="text-sm leading-5 text-[#26272b]">{message}</Text>
          <Text className="text-xs leading-[18px] mt-1 text-[#51525c] text-right">
            {timestamp}
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View className="flex-col items-start mb-3">
      <View className="flex-row items-end gap-2 max-w-[85%]">
        {/* Sender avatar */}
        {senderAvatarUrl ? (
          <Image
            source={{ uri: senderAvatarUrl }}
            className="size-7 rounded-full"
          />
        ) : (
          <View className="size-7 rounded-full bg-[#1a1a1e] items-center justify-center">
            <Ionicons name="person" size={14} color="#70707b" />
          </View>
        )}

        <View className="flex-1">
          {/* Sender name */}
          <Text className="text-xs text-[#70707b] mb-1 ml-3">
            {senderName}
          </Text>

          {/* Message bubble */}
          <View className="px-4 py-2.5 max-w-[80%] bg-[#26272b] rounded-2xl self-start">
            <Text className="text-sm leading-5 text-[#d1d1d6]">
              {message}
            </Text>
            <Text className="text-xs leading-[18px] mt-1 text-[#70707b]">
              {timestamp}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
