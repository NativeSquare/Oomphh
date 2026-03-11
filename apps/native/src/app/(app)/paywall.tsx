import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useSubscription } from "@/hooks/use-subscription";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Pressable, ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type PlanId = "premium" | "unlimited";

const PLANS = [
  {
    id: "premium" as PlanId,
    name: "Premium",
    price: "€7",
    period: "/month",
    trial: "7-day free trial",
    features: [
      "Browse up to 5 profiles",
      "See who viewed your profile",
      "Priority in search results",
    ],
  },
  {
    id: "unlimited" as PlanId,
    name: "Unlimited",
    price: "€15",
    period: "/month",
    trial: null,
    badge: "Best Value",
    features: [
      "Browse unlimited profiles",
      "See who viewed your profile",
      "Priority in search results",
      "Unlimited messages",
      "Advanced filters",
    ],
  },
];

export default function PaywallScreen() {
  const insets = useSafeAreaInsets();
  const {
    premiumPackage,
    unlimitedPackage,
    purchasePackage,
    restorePurchases,
    isPurchasing,
  } = useSubscription();
  const [selectedPlan, setSelectedPlan] = useState<PlanId>("unlimited");

  const handlePurchase = async () => {
    const pkg =
      selectedPlan === "premium" ? premiumPackage : unlimitedPackage;
    if (!pkg) return;
    const success = await purchasePackage(pkg);
    if (success && router.canGoBack()) {
      router.back();
    }
  };

  const handleRestore = async () => {
    const success = await restorePurchases();
    if (success && router.canGoBack()) {
      router.back();
    }
  };

  const selectedPlanData = PLANS.find((p) => p.id === selectedPlan)!;

  return (
    <ScrollView
      className="flex-1 bg-background"
      contentContainerStyle={{
        paddingTop: insets.top + 16,
        paddingBottom: insets.bottom + 24,
        paddingHorizontal: 20,
      }}
    >
      {/* Header */}
      <View className="flex-row items-center mb-6">
        <Pressable
          onPress={() => router.canGoBack() && router.back()}
          className="size-10 items-center justify-center rounded-full bg-secondary/60"
        >
          <Ionicons name="close" size={22} color="white" />
        </Pressable>
      </View>

      {/* Title */}
      <View className="items-center mb-8">
        <Text className="text-2xl font-bold text-white mb-2">
          Upgrade Your Experience
        </Text>
        <Text className="text-sm text-muted-foreground text-center">
          Choose the plan that works best for you
        </Text>
      </View>

      {/* Plan Cards */}
      <View className="gap-3 mb-8">
        {PLANS.map((plan) => {
          const isSelected = selectedPlan === plan.id;
          return (
            <Pressable
              key={plan.id}
              onPress={() => setSelectedPlan(plan.id)}
              className={`rounded-2xl border-2 p-4 ${
                isSelected
                  ? "border-[#e56400] bg-[#e56400]/10"
                  : "border-border bg-secondary/30"
              }`}
            >
              <View className="flex-row items-center justify-between mb-3">
                <View className="flex-row items-center gap-2">
                  <Text className="text-lg font-bold text-white">
                    {plan.name}
                  </Text>
                  {plan.badge && (
                    <View className="rounded-full bg-[#e56400] px-2.5 py-0.5">
                      <Text className="text-[10px] font-bold text-white">
                        {plan.badge}
                      </Text>
                    </View>
                  )}
                </View>
                <View
                  className={`size-6 items-center justify-center rounded-full border-2 ${
                    isSelected ? "border-[#e56400]" : "border-muted-foreground"
                  }`}
                >
                  {isSelected && (
                    <View className="size-3.5 rounded-full bg-[#e56400]" />
                  )}
                </View>
              </View>

              <View className="flex-row items-baseline gap-0.5 mb-2">
                <Text className="text-2xl font-bold text-white">
                  {plan.price}
                </Text>
                <Text className="text-sm text-muted-foreground">
                  {plan.period}
                </Text>
              </View>

              {plan.trial && (
                <View className="mb-3 rounded-lg bg-[#e56400]/15 px-3 py-1.5 self-start">
                  <Text className="text-xs font-semibold text-[#e56400]">
                    {plan.trial}
                  </Text>
                </View>
              )}

              <View className="gap-2">
                {plan.features.map((feature) => (
                  <View key={feature} className="flex-row items-center gap-2">
                    <Ionicons
                      name="checkmark-circle"
                      size={16}
                      color={isSelected ? "#e56400" : "#a1a1aa"}
                    />
                    <Text
                      className={`text-sm ${isSelected ? "text-white" : "text-muted-foreground"}`}
                    >
                      {feature}
                    </Text>
                  </View>
                ))}
              </View>
            </Pressable>
          );
        })}
      </View>

      {/* Subscribe Button */}
      <Button
        onPress={handlePurchase}
        disabled={isPurchasing}
        className="h-14 bg-[#e56400] active:bg-[#e56400]/80"
      >
        {isPurchasing ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text className="text-base font-bold text-white">
            {selectedPlanData.trial
              ? `Start Free Trial — then ${selectedPlanData.price}${selectedPlanData.period}`
              : `Subscribe — ${selectedPlanData.price}${selectedPlanData.period}`}
          </Text>
        )}
      </Button>

      {/* Restore */}
      <Pressable onPress={handleRestore} className="items-center mt-4">
        <Text className="text-sm text-muted-foreground">
          Restore purchases
        </Text>
      </Pressable>

      {/* Legal */}
      <Text className="text-[10px] text-muted-foreground text-center mt-6 leading-4">
        Payment will be charged to your Apple ID account at the confirmation of
        purchase. Subscription automatically renews unless it is canceled at
        least 24 hours before the end of the current period. Your account will
        be charged for renewal within 24 hours prior to the end of the current
        period.
      </Text>
    </ScrollView>
  );
}
