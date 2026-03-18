import { BottomSheetModal } from "@/components/custom/bottom-sheet";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { api } from "@packages/backend/convex/_generated/api";
import { Id } from "@packages/backend/convex/_generated/dataModel";
import { BottomSheetModal as GorhomBottomSheetModal } from "@gorhom/bottom-sheet";
import { useMutation } from "convex/react";
import { Check } from "lucide-react-native";
import React, { useState } from "react";
import { Alert, Pressable, TextInput, View } from "react-native";
import { Icon } from "@/components/ui/icon";

const REPORT_REASONS = [
  "Child Safety Concern",
  "Harassment or Bullying",
  "Inappropriate Content",
  "Underage User",
  "Spam or Scam",
  "Impersonation",
  "Other",
] as const;

interface ReportFormBottomSheetProps {
  bottomSheetModalRef: React.RefObject<GorhomBottomSheetModal | null>;
  userId: Id<"users">;
}

export function ReportFormBottomSheet({
  bottomSheetModalRef,
  userId,
}: ReportFormBottomSheetProps) {
  const [selectedReason, setSelectedReason] = useState<string | null>(null);
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const reportUser = useMutation(api.table.reports.reportUser);

  const handleSubmit = async () => {
    if (!selectedReason) return;

    setIsSubmitting(true);
    try {
      await reportUser({
        reportedUserId: userId,
        reason: selectedReason,
        description: description.trim() || undefined,
      });
      bottomSheetModalRef.current?.dismiss();
      setSelectedReason(null);
      setDescription("");
      Alert.alert(
        "Report Submitted",
        "Thank you for your report. We will review it promptly.",
      );
    } catch (error) {
      Alert.alert("Error", "Failed to submit report. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <BottomSheetModal ref={bottomSheetModalRef} snapPoints={["70%", "90%"]}>
      <View className="gap-4 px-4 pb-6 pt-3">
        <View className="gap-1">
          <Text className="text-xl font-semibold text-foreground">
            Report User
          </Text>
          <Text className="text-sm text-muted-foreground">
            Select a reason for your report
          </Text>
        </View>

        <View className="gap-1">
          {REPORT_REASONS.map((reason) => (
            <Pressable
              key={reason}
              className="flex-row items-center justify-between rounded-xl px-4 py-3 active:bg-secondary/50"
              onPress={() => setSelectedReason(reason)}
            >
              <Text
                className={`text-base ${selectedReason === reason ? "font-medium text-foreground" : "text-muted-foreground"}`}
              >
                {reason}
              </Text>
              {selectedReason === reason && (
                <Icon as={Check} size={18} className="text-primary" />
              )}
            </Pressable>
          ))}
        </View>

        <View className="gap-2">
          <Text className="text-sm font-medium text-muted-foreground">
            Additional details (optional)
          </Text>
          <TextInput
            className="min-h-[80px] rounded-xl border border-border bg-secondary/30 px-4 py-3 text-base text-foreground"
            placeholder="Describe the issue..."
            placeholderTextColor="#666"
            multiline
            textAlignVertical="top"
            value={description}
            onChangeText={setDescription}
          />
        </View>

        <Button
          onPress={handleSubmit}
          disabled={!selectedReason || isSubmitting}
          variant="destructive"
          className="mt-2"
        >
          <Text>{isSubmitting ? "Submitting..." : "Submit Report"}</Text>
        </Button>
      </View>
    </BottomSheetModal>
  );
}
