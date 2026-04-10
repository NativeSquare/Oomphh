import { BottomSheetModal } from "@/components/custom/bottom-sheet";
import { ConfirmBottomSheet } from "@/components/custom/confirm-bottom-sheet";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { api } from "@packages/backend/convex/_generated/api";
import { Id } from "@packages/backend/convex/_generated/dataModel";
import { BottomSheetModal as GorhomBottomSheetModal } from "@gorhom/bottom-sheet";
import { useMutation } from "convex/react";
import { router } from "expo-router";
import { Ban, Flag } from "lucide-react-native";
import React, { useRef } from "react";
import { Alert, Pressable, View } from "react-native";
import { ReportFormBottomSheet } from "./report-form-bottom-sheet";

interface ReportBlockBottomSheetProps {
  bottomSheetModalRef: React.RefObject<GorhomBottomSheetModal | null>;
  userId: Id<"users">;
  userName?: string;
}

export function ReportBlockBottomSheet({
  bottomSheetModalRef,
  userId,
  userName = "this user",
}: ReportBlockBottomSheetProps) {
  const reportFormRef = useRef<GorhomBottomSheetModal>(null);
  const blockConfirmRef = useRef<GorhomBottomSheetModal>(null);
  const blockUser = useMutation(api.table.blocks.blockUser);

  const handleReportPress = () => {
    bottomSheetModalRef.current?.dismiss();
    setTimeout(() => {
      reportFormRef.current?.present();
    }, 300);
  };

  const handleBlockPress = () => {
    bottomSheetModalRef.current?.dismiss();
    setTimeout(() => {
      blockConfirmRef.current?.present();
    }, 300);
  };

  const handleBlockConfirm = async () => {
    try {
      await blockUser({ blockedUserId: userId });
      Alert.alert(
        "User Blocked",
        `${userName} has been blocked. They will no longer be able to contact you.`,
        [{ text: "OK", onPress: () => router.back() }],
      );
    } catch (error) {
      Alert.alert("Error", "Failed to block user. Please try again.");
    }
  };

  return (
    <>
      <BottomSheetModal ref={bottomSheetModalRef} enableDynamicSizing>
        <View className="gap-2 px-4 pb-6 pt-3">
          <Text className="text-lg font-semibold text-foreground mb-2">
            Actions
          </Text>
          <Pressable
            className="flex-row items-center gap-4 rounded-xl px-4 py-3 active:bg-secondary/50"
            onPress={handleReportPress}
          >
            <Icon as={Flag} size={20} className="text-destructive" />
            <View className="flex-1">
              <Text className="text-base font-medium text-foreground">
                Report User
              </Text>
              <Text className="text-sm text-muted-foreground">
                Report inappropriate behavior or content
              </Text>
            </View>
          </Pressable>
          <Pressable
            className="flex-row items-center gap-4 rounded-xl px-4 py-3 active:bg-secondary/50"
            onPress={handleBlockPress}
          >
            <Icon as={Ban} size={20} className="text-destructive" />
            <View className="flex-1">
              <Text className="text-base font-medium text-foreground">
                Block User
              </Text>
              <Text className="text-sm text-muted-foreground">
                Block and remove all conversations
              </Text>
            </View>
          </Pressable>
        </View>
      </BottomSheetModal>

      <ReportFormBottomSheet
        bottomSheetModalRef={reportFormRef}
        userId={userId}
      />

      <ConfirmBottomSheet
        bottomSheetModalRef={blockConfirmRef}
        title={`Block ${userName}?`}
        description="This will block the user and delete your conversation with them. You can unblock them later from settings."
        confirmLabel="Block"
        confirmVariant="destructive"
        onConfirm={handleBlockConfirm}
      />
    </>
  );
}
