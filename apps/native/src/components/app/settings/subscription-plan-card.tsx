import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { useSubscription } from "@/hooks/use-subscription";
import {
  PREMIUM_ENTITLEMENT_ID,
  UNLIMITED_ENTITLEMENT_ID,
  type SubscriptionTier,
} from "@/lib/revenue-cat";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { ChevronRight, Crown, Sparkles, User } from "lucide-react-native";
import { Alert, Platform, Pressable, View } from "react-native";
import RevenueCatUI from "react-native-purchases-ui";

const PERIOD_LABELS: Record<string, string> = {
  P1M: "month",
  P3M: "quarter",
  P1Y: "year",
};

function formatRenewalDate(dateString: string | null): string | null {
  if (!dateString) return null;
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return null;
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

const PLAN_ICON: Record<SubscriptionTier, typeof Crown> = {
  free: User,
  premium: Crown,
  unlimited: Sparkles,
};

const PLAN_LABEL: Record<SubscriptionTier, string> = {
  free: "Free",
  premium: "Premium",
  unlimited: "Unlimited",
};

export function SubscriptionPlanCard() {
  const { tier, customerInfo, currentOffering } = useSubscription();

  // Resolve active subscription pricing from entitlement + offerings
  const activeEntitlement =
    tier === "unlimited"
      ? customerInfo?.entitlements.active[UNLIMITED_ENTITLEMENT_ID]
      : tier === "premium"
        ? customerInfo?.entitlements.active[PREMIUM_ENTITLEMENT_ID]
        : null;

  const activeProductId = activeEntitlement?.productIdentifier ?? null;

  const activePackage = activeProductId
    ? currentOffering?.availablePackages?.find(
        (pkg) => pkg.product.identifier === activeProductId,
      )
    : null;

  const priceString = activePackage?.product.priceString ?? null;
  const periodLabel =
    PERIOD_LABELS[activePackage?.product.subscriptionPeriod ?? ""] ?? null;

  const renewalDate = formatRenewalDate(
    activeEntitlement?.expirationDate ?? null,
  );
  const willRenew = activeEntitlement?.willRenew ?? false;

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

  if (tier === "free") {
    return (
      <View className="rounded-2xl border border-border bg-[#131316] overflow-hidden">
        <View className="p-5 gap-4">
          <View className="flex-row items-center gap-3">
            <View className="size-11 rounded-full bg-[#1a1a1e] items-center justify-center">
              <Icon as={User} size={22} color="#70707b" />
            </View>
            <View className="flex-1">
              <Text className="text-lg font-bold text-white">Free Plan</Text>
              <Text className="text-xs text-muted-foreground mt-0.5">
                Upgrade to unlock all features
              </Text>
            </View>
          </View>

          <Pressable
            onPress={() => router.push("/paywall" as any)}
            className="active:opacity-80 overflow-hidden rounded-xl"
          >
            <LinearGradient
              colors={["#E63B2E", "#C42A1F"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{
                paddingVertical: 14,
                alignItems: "center",
                borderRadius: 12,
              }}
            >
              <Text className="text-sm font-bold text-white tracking-wide">
                Upgrade Now
              </Text>
            </LinearGradient>
          </Pressable>
        </View>
      </View>
    );
  }

  // Paid plan card
  const isPremium = tier === "premium";

  return (
    <View className="rounded-2xl overflow-hidden">
      <LinearGradient
        colors={
          isPremium
            ? ["#1a0a08", "#1a0806", "#131316"]
            : ["#2a0e0c", "#1c0806", "#131316"]
        }
        start={{ x: 0, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      >
        <View className="border border-primary/25 rounded-2xl">
          <View className="p-5 gap-4">
            {/* Plan name + price */}
            <View className="flex-row items-start justify-between">
              <View className="flex-row items-center gap-3 flex-1">
                <View
                  className="size-11 rounded-full items-center justify-center"
                  style={{ backgroundColor: "rgba(230, 59, 46, 0.15)" }}
                >
                  <Icon
                    as={PLAN_ICON[tier]}
                    size={22}
                    color="#E63B2E"
                  />
                </View>
                <View>
                  <Text className="text-lg font-bold text-white">
                    {PLAN_LABEL[tier]}
                  </Text>
                  {renewalDate && (
                    <Text className="text-xs text-muted-foreground mt-0.5">
                      {willRenew ? "Renews" : "Expires"} {renewalDate}
                    </Text>
                  )}
                </View>
              </View>

              {priceString && periodLabel && (
                <View className="items-end">
                  <Text className="text-lg font-bold text-white">
                    {priceString}
                  </Text>
                  <Text className="text-xs text-muted-foreground">
                    per {periodLabel}
                  </Text>
                </View>
              )}
            </View>

            {/* Actions */}
            <View className="flex-row gap-2">
              {isPremium && (
                <Pressable
                  onPress={() => router.push("/paywall" as any)}
                  className="flex-1 py-3 rounded-xl items-center justify-center active:opacity-80 overflow-hidden"
                >
                  <LinearGradient
                    colors={["#E63B2E", "#C42A1F"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      borderRadius: 12,
                    }}
                  />
                  <Text className="text-sm font-semibold text-white">
                    Go Unlimited
                  </Text>
                </Pressable>
              )}

              <Pressable
                onPress={handleManageSubscription}
                className={`${isPremium ? "flex-1" : "flex-1"} flex-row items-center justify-center gap-1.5 py-3 rounded-xl bg-white/5 active:opacity-70`}
              >
                <Text className="text-sm font-medium text-[#d1d1d6]">
                  Manage
                </Text>
                <Icon
                  as={ChevronRight}
                  size={14}
                  color="#d1d1d6"
                />
              </Pressable>
            </View>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}
