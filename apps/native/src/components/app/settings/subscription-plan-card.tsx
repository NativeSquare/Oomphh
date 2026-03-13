import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { useSubscription } from "@/hooks/use-subscription";
import type { SubscriptionTier } from "@/lib/revenue-cat";
import { router } from "expo-router";
import { Crown, Sparkles, User, ChevronRight } from "lucide-react-native";
import { Alert, Platform, Pressable, View } from "react-native";
import RevenueCatUI from "react-native-purchases-ui";

const PLAN_CONFIG: Record<
  SubscriptionTier,
  {
    label: string;
    description: string;
    icon: typeof Crown;
    accentColor: string;
    bgColor: string;
    borderColor: string;
  }
> = {
  free: {
    label: "Free Plan",
    description: "Basic features with limited access",
    icon: User,
    accentColor: "#70707b",
    bgColor: "bg-secondary/30",
    borderColor: "border-border",
  },
  premium: {
    label: "Premium Plan",
    description: "Enhanced features and more access",
    icon: Crown,
    accentColor: "#e56400",
    bgColor: "bg-[#e56400]/5",
    borderColor: "border-[#e56400]/30",
  },
  unlimited: {
    label: "Unlimited Plan",
    description: "Full access to everything",
    icon: Sparkles,
    accentColor: "#e56400",
    bgColor: "bg-[#e56400]/10",
    borderColor: "border-[#e56400]/40",
  },
};

export function SubscriptionPlanCard() {
  const { tier } = useSubscription();
  const config = PLAN_CONFIG[tier];

  const handleManageSubscription = async () => {
    if (Platform.OS === "web") return;
    try {
      await RevenueCatUI.presentCustomerCenter();
    } catch {
      Alert.alert(
        "Subscription Management",
        "Unable to open subscription management. Please try again.",
      );
    }
  };

  return (
    <View
      className={`rounded-2xl border ${config.borderColor} ${config.bgColor} p-4 gap-4`}
    >
      {/* Plan info */}
      <View className="flex-row items-center gap-3">
        <View
          className="size-10 rounded-full items-center justify-center"
          style={{ backgroundColor: `${config.accentColor}20` }}
        >
          <Icon as={config.icon} size={20} color={config.accentColor} />
        </View>
        <View className="flex-1">
          <Text className="text-base font-semibold text-white">
            {config.label}
          </Text>
          <Text className="text-xs text-muted-foreground">
            {config.description}
          </Text>
        </View>
      </View>

      {/* Action buttons */}
      <View className="gap-2">
        {tier !== "unlimited" && (
          <Button
            className="w-full bg-[#e56400] rounded-full"
            onPress={() => router.push("/paywall" as any)}
          >
            <Text className="text-sm font-semibold text-white">
              {tier === "free" ? "Upgrade to Premium" : "Upgrade to Unlimited"}
            </Text>
          </Button>
        )}

        {tier !== "free" && (
          <Pressable
            onPress={handleManageSubscription}
            className="flex-row items-center justify-center gap-1.5 py-2.5 rounded-full active:opacity-70"
          >
            <Text className="text-sm font-medium text-muted-foreground">
              Manage Subscription
            </Text>
            <Icon as={ChevronRight} size={14} className="text-muted-foreground" />
          </Pressable>
        )}
      </View>
    </View>
  );
}
