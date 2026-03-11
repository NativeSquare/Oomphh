import { DeleteAccountBottomSheet } from "@/components/app/settings/delete-account-bottom-sheet";
import { ManageCachedPicturesSheet } from "@/components/app/settings/manage-cached-pictures-sheet";
import { MeasurementSystemRow } from "@/components/app/settings/measurement-system-row";
import { MeasurementSystemSheet } from "@/components/app/settings/measurement-system-sheet";
import {
  SettingItem,
  SettingsRow,
} from "@/components/app/settings/settings-row";
import { Text } from "@/components/ui/text";
import { useSubscription } from "@/hooks/use-subscription";
import type { MeasurementSystem } from "@/utils/measurements";
import { useAuthActions } from "@convex-dev/auth/react";
import { api } from "@packages/backend/convex/_generated/api";
import { BottomSheetModal as GorhomBottomSheetModal } from "@gorhom/bottom-sheet";
import { useMutation, useQuery } from "convex/react";
import { router } from "expo-router";
import * as Linking from "expo-linking";
import {
  Bell,
  CalendarDays,
  Crown,
  File,
  FileText,
  Headset,
  Images,
  LockOpen,
  LogOut,
  MessageCircle,
  Pencil,
  ShieldCheck,
  UserMinus,
} from "lucide-react-native";
import React from "react";
import { Alert, Platform, ScrollView, View } from "react-native";
import RevenueCatUI from "react-native-purchases-ui";

export default function Profile() {
  const { signOut } = useAuthActions();
  const deleteUser = useMutation(api.table.users.del);
  const patchUser = useMutation(api.table.users.patch);
  const user = useQuery(api.table.users.currentUser);
  const { tier } = useSubscription();
  const deleteAccountBottomSheetRef =
    React.useRef<GorhomBottomSheetModal>(null);
  const measurementSystemSheetRef = React.useRef<GorhomBottomSheetModal>(null);
  const cachedPicturesSheetRef = React.useRef<GorhomBottomSheetModal>(null);

  const handleMeasurementSystemChange = React.useCallback(
    async (system: MeasurementSystem) => {
      if (!user?._id) return;
      await patchUser({ id: user._id, data: { measurementSystem: system } });
    },
    [user?._id, patchUser],
  );

  const handleDeleteAccount = React.useCallback(() => {
    deleteAccountBottomSheetRef.current?.present();
  }, []);

  const handleConfirmDeleteAccount = React.useCallback(() => {
    if (!user?._id) return;
    deleteUser({ id: user._id });
  }, []);

  const handleLogout = React.useCallback(() => {
    signOut();
  }, [signOut]);

  const handleManageSubscription = React.useCallback(async () => {
    if (Platform.OS === "web") return;
    try {
      await RevenueCatUI.presentCustomerCenter();
    } catch {
      Alert.alert(
        "Subscription Management",
        "Unable to open subscription management. Please try again.",
      );
    }
  }, []);

  const handleUpgrade = React.useCallback(() => {
    router.push("/paywall" as any);
  }, []);

  const settingsItems: SettingItem[] = [
    {
      label: "Edit Profile",
      icon: Pencil,
      onPress: () => router.push("/edit-profile"),
    },
    ...(tier === "unlimited"
      ? []
      : [
          {
            label: tier === "free" ? "Upgrade to Premium" : "Upgrade to Unlimited",
            icon: Crown,
            onPress: handleUpgrade,
          },
        ]),
    {
      label: "My Events",
      icon: CalendarDays,
      onPress: () => router.push("/my-events"),
    },
    {
      label: "Notifications",
      icon: Bell,
      onPress: () => router.push("/notifications"),
    },
    {
      label: "Cached Pictures",
      icon: Images,
      onPress: () => cachedPicturesSheetRef.current?.present(),
    },
    {
      label: "Terms & Conditions",
      icon: FileText,
      onPress: () => Linking.openURL("https://www.oomphh.cz/terms"),
    },
    {
      label: "Privacy Policy",
      icon: ShieldCheck,
      onPress: () => Linking.openURL("https://www.oomphh.cz/privacy"),
    },
    {
      label: "Send Feedback",
      icon: MessageCircle,
      onPress: () => router.push("/send-feedback"),
    },
    {
      label: "First Sentence Page",
      icon: File,
      onPress: () => router.push("/first-sentences"),
    },
    {
      label: "Permission Page",
      icon: LockOpen,
      onPress: () => router.push("/permissions"),
    },
    ...(tier !== "free"
      ? [
          {
            label: "Manage Subscription",
            icon: Headset,
            onPress: handleManageSubscription,
          },
        ]
      : []),
    {
      label: "Delete Account",
      icon: UserMinus,
      destructive: true,
      onPress: handleDeleteAccount,
    },
    {
      label: "Log Out",
      icon: LogOut,
      destructive: true,
      onPress: handleLogout,
    },
  ];

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerClassName="pt-safe px-5 pb-10"
      keyboardDismissMode="interactive"
      className="flex-1"
    >
      <View className="w-full max-w-2xl self-center gap-5">
        <Text className="text-xl font-medium leading-[30px] text-white mt-5">
          Profile Settings
        </Text>

        <View className="flex-col">
          <MeasurementSystemRow
            value={user?.measurementSystem ?? "metric"}
            onPress={() => measurementSystemSheetRef.current?.present()}
          />
          {settingsItems.map((item) => (
            <SettingsRow key={item.label} {...item} />
          ))}
        </View>
      </View>

      <DeleteAccountBottomSheet
        bottomSheetModalRef={deleteAccountBottomSheetRef}
        onConfirm={handleConfirmDeleteAccount}
      />

      <MeasurementSystemSheet
        ref={measurementSystemSheetRef}
        value={user?.measurementSystem ?? "metric"}
        onChange={handleMeasurementSystemChange}
      />

      <ManageCachedPicturesSheet ref={cachedPicturesSheetRef} />
    </ScrollView>
  );
}
