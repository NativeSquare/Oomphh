import { Text } from "@/components/ui/text";
import { Doc } from "@packages/backend/convex/_generated/dataModel";
import { api } from "@packages/backend/convex/_generated/api";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "convex/react";
import { router } from "expo-router";
import { Image, Pressable, View } from "react-native";

interface LockedGridItemProps {
  userItem: Doc<"users"> & { distance: number };
}

export function LockedGridItem({ userItem }: LockedGridItemProps) {
  const imageUrl = useQuery(
    api.storage.getImageUrl,
    userItem.profilePictures?.[0]
      ? { storageId: userItem.profilePictures[0] }
      : "skip",
  );

  return (
    <Pressable
      onPress={() => router.push("/paywall" as any)}
      className="relative aspect-square overflow-hidden rounded-xl border border-border/60 bg-secondary/60"
    >
      {imageUrl ? (
        <Image
          source={{ uri: imageUrl }}
          blurRadius={20}
          style={{ width: "100%", height: "100%" }}
        />
      ) : (
        <View className="size-full items-center justify-center bg-secondary/60">
          <Ionicons name="person" size={48} className="text-muted-foreground" />
        </View>
      )}
      <View className="absolute inset-0 bg-black/40" />
      <View className="absolute inset-0 items-center justify-center">
        <View className="items-center gap-1.5">
          <Ionicons name="lock-closed" size={22} color="white" />
          <Text className="text-xs font-semibold text-white">Unlock More</Text>
        </View>
      </View>
    </Pressable>
  );
}
