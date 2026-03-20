import { ConfirmBottomSheet } from "@/components/custom/confirm-bottom-sheet";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { api } from "@packages/backend/convex/_generated/api";
import { Id } from "@packages/backend/convex/_generated/dataModel";
import { BottomSheetModal as GorhomBottomSheetModal } from "@gorhom/bottom-sheet";
import { useMutation, useQuery } from "convex/react";
import { Image as ExpoImage } from "expo-image";
import { router } from "expo-router";
import { Ban, ChevronLeft } from "lucide-react-native";
import React, { useRef, useState } from "react";
import { Alert, Pressable, ScrollView, View } from "react-native";

export default function BlockedUsers() {
  const blockedUsers = useQuery(api.table.blocks.getBlockedUsers);
  const unblockUser = useMutation(api.table.blocks.unblockUser);
  const confirmRef = useRef<GorhomBottomSheetModal>(null);
  const [selectedUser, setSelectedUser] = useState<{
    id: Id<"users">;
    name: string;
  } | null>(null);

  const handleUnblockPress = (userId: Id<"users">, name: string) => {
    setSelectedUser({ id: userId, name });
    confirmRef.current?.present();
  };

  const handleUnblockConfirm = async () => {
    if (!selectedUser) return;
    try {
      await unblockUser({ blockedUserId: selectedUser.id });
    } catch {
      Alert.alert("Error", "Failed to unblock user. Please try again.");
    }
    setSelectedUser(null);
  };

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
              Blocked Users
            </Text>
            <View className="size-6" />
          </View>

          {blockedUsers?.length === 0 && (
            <View className="flex-1 items-center justify-center py-20">
              <Icon as={Ban} size={48} className="text-muted-foreground mb-4" />
              <Text className="text-muted-foreground text-base">
                No blocked users
              </Text>
            </View>
          )}

          {blockedUsers?.map((user) => (
            <View
              key={user._id}
              className="flex-row items-center gap-4 px-2 py-3 border-b border-[#1a1a1e]"
            >
              {user.profilePictureUrl ? (
                <ExpoImage
                  source={{ uri: user.profilePictureUrl }}
                  style={{ width: 44, height: 44, borderRadius: 22 }}
                />
              ) : (
                <View className="size-11 rounded-full bg-secondary items-center justify-center">
                  <Text className="text-foreground text-lg">
                    {user.name.charAt(0).toUpperCase()}
                  </Text>
                </View>
              )}
              <Text className="flex-1 text-base font-medium text-foreground">
                {user.name}
              </Text>
              <Pressable
                onPress={() => handleUnblockPress(user._id, user.name)}
                className="rounded-lg bg-secondary/50 px-4 py-2 active:opacity-70"
              >
                <Text className="text-sm font-medium text-foreground">
                  Unblock
                </Text>
              </Pressable>
            </View>
          ))}
        </View>
      </ScrollView>

      <ConfirmBottomSheet
        bottomSheetModalRef={confirmRef}
        title={`Unblock ${selectedUser?.name ?? "user"}?`}
        description="This user will be able to see your profile and contact you again."
        confirmLabel="Unblock"
        confirmVariant="default"
        onConfirm={handleUnblockConfirm}
      />
    </View>
  );
}
