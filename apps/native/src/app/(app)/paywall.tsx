import { Text } from "@/components/ui/text";
import { useSubscription } from "@/hooks/use-subscription";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useMemo, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Linking,
  Pressable,
  ScrollView,
  View,
} from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import type { PurchasesPackage } from "react-native-purchases";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

type PlanId = "premium" | "unlimited";
type BillingPeriod = "monthly" | "quarterly" | "annually";

interface PlanDisplayInfo {
  id: PlanId;
  name: string;
  price: string;
  period: string;
  trial: string | null;
}

const PERIOD_LABELS: Record<BillingPeriod, string> = {
  monthly: "Monthly",
  quarterly: "Quarterly",
  annually: "Annually",
};

const FEATURES = [
  "Unlimited Access to All Content",
  "Exclusive Premium Stories",
  "Advanced Filters & Customization",
  "Ad-Free Experience",
];

const PERIOD_TEXT: Record<string, string> = {
  P1M: "month",
  P3M: "quarter",
  P1Y: "year",
};

function getPlanFromPackage(
  pkg: PurchasesPackage,
  planId: PlanId,
): PlanDisplayInfo {
  const product = pkg.product;
  const introPrice = product.introPrice;
  const hasTrial =
    introPrice?.price === 0 && introPrice?.periodNumberOfUnits > 0;
  const trialText = hasTrial
    ? `${introPrice!.periodNumberOfUnits}-day free trial`
    : null;

  return {
    id: planId,
    name: planId === "premium" ? "Premium Plan" : "Unlimited Plan",
    price: product.priceString,
    period: `Per ${PERIOD_TEXT[product.subscriptionPeriod ?? ""] ?? product.subscriptionPeriod}`,
    trial: trialText,
  };
}

export default function PaywallScreen() {
  const insets = useSafeAreaInsets();
  const {
    isReady,
    packages,
    purchasePackage,
    restorePurchases,
    isPurchasing,
  } = useSubscription();
  const [selectedPlan, setSelectedPlan] = useState<PlanId>("unlimited");
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>("monthly");

  const plans = useMemo(() => {
    const result: PlanDisplayInfo[] = [];
    const premiumPkg = packages.premium[billingPeriod];
    const unlimitedPkg = packages.unlimited[billingPeriod];
    if (premiumPkg) {
      result.push(getPlanFromPackage(premiumPkg, "premium"));
    }
    if (unlimitedPkg) {
      result.push(getPlanFromPackage(unlimitedPkg, "unlimited"));
    }
    return result;
  }, [packages, billingPeriod]);

  // Determine which billing periods are available (have at least one package)
  const availablePeriods = useMemo(() => {
    const periods: BillingPeriod[] = [];
    for (const period of ["monthly", "quarterly", "annually"] as const) {
      if (packages.premium[period] || packages.unlimited[period]) {
        periods.push(period);
      }
    }
    return periods;
  }, [packages]);

  const handlePurchase = async () => {
    const pkg = packages[selectedPlan][billingPeriod];
    if (!pkg) {
      Alert.alert(
        "Not Available",
        "Subscription packages are not available right now. Please try again later.",
      );
      return;
    }
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

  const selectedPlanData = plans.find((p) => p.id === selectedPlan);

  if (!isReady) {
    return (
      <View className="flex-1 bg-background items-center justify-center">
        <ActivityIndicator size="large" color="#e56400" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-background">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: insets.bottom + 24 }}
        bounces={false}
      >
        {/* Hero Image */}
        <View>
          <Image
            source={require("../../../assets/images/paywall-picture.png")}
            style={{ width: SCREEN_WIDTH, height: SCREEN_WIDTH * 0.95 }}
            contentFit="cover"
          />
          {/* Gradient overlay at bottom of image */}
          <LinearGradient
            colors={["transparent", "#0a0a0a"]}
            locations={[0, 0.95]}
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 160,
            }}
          />
          {/* Close button */}
          <Pressable
            onPress={() => router.canGoBack() && router.back()}
            className="absolute size-10 items-center justify-center rounded-full bg-black/40"
            style={{ top: insets.top + 8, left: 16 }}
          >
            <Ionicons name="close" size={22} color="white" />
          </Pressable>
        </View>

        <View className="px-5 -mt-10">
          {/* Title */}
          <Text className="text-[26px] font-bold text-white mb-1">
            Get Unlimited Access
          </Text>
          <Text className="text-sm text-muted-foreground mb-6">
            Choose subscription plan to continue
          </Text>

          {/* Feature List */}
          <View className="gap-4 mb-8">
            {FEATURES.map((feature) => (
              <View key={feature} className="flex-row items-center gap-3">
                <Ionicons
                  name="checkmark-circle-outline"
                  size={22}
                  color="#e56400"
                />
                <Text className="text-[15px] text-white">{feature}</Text>
              </View>
            ))}
          </View>

          {/* Billing Period Toggle */}
          {availablePeriods.length > 1 && (
            <View className="flex-row rounded-xl bg-secondary/30 p-1 mb-6">
              {availablePeriods.map((period) => {
                const isActive = billingPeriod === period;
                return (
                  <Pressable
                    key={period}
                    onPress={() => setBillingPeriod(period)}
                    className={`flex-1 items-center py-2.5 rounded-lg ${
                      isActive ? "bg-[#e56400]" : ""
                    }`}
                  >
                    <Text
                      className={`text-sm font-semibold ${
                        isActive ? "text-white" : "text-muted-foreground"
                      }`}
                    >
                      {PERIOD_LABELS[period]}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          )}

          {/* Plan Selection */}
          <View className="gap-3 mb-8">
            {plans.map((plan) => {
              const isSelected = selectedPlan === plan.id;
              return (
                <Pressable
                  key={plan.id}
                  onPress={() => setSelectedPlan(plan.id)}
                  className={`flex-row items-center rounded-2xl border-2 px-4 py-3.5 ${
                    isSelected
                      ? "border-[#e56400] bg-[#e56400]/10"
                      : "border-border bg-secondary/30"
                  }`}
                >
                  {/* Radio button */}
                  <View
                    className={`size-6 items-center justify-center rounded-full border-2 mr-3 ${
                      isSelected
                        ? "border-[#e56400]"
                        : "border-muted-foreground"
                    }`}
                  >
                    {isSelected && (
                      <View className="size-3.5 rounded-full bg-[#e56400]" />
                    )}
                  </View>

                  {/* Plan name */}
                  <Text className="text-[15px] font-semibold text-white flex-1">
                    {plan.name}
                  </Text>

                  {/* Price */}
                  {plan.price !== "Free" && (
                    <View className="flex-row items-baseline gap-1">
                      <Text className="text-[15px] font-bold text-white">
                        {plan.price}
                      </Text>
                      <Text className="text-xs text-muted-foreground">
                        {plan.period}
                      </Text>
                    </View>
                  )}
                </Pressable>
              );
            })}
          </View>

          {/* Subscribe Button */}
          <Pressable
            onPress={handlePurchase}
            disabled={isPurchasing}
            className="h-14 rounded-full bg-[#e56400] items-center justify-center active:opacity-80"
          >
            {isPurchasing ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-base font-bold text-white">
                {selectedPlanData?.trial
                  ? `Start Free Trial`
                  : `Subscribe — ${selectedPlanData?.price ?? ""}${selectedPlanData ? ` ${selectedPlanData.period}` : ""}`}
              </Text>
            )}
          </Pressable>

          {/* Restore */}
          <Pressable onPress={handleRestore} className="items-center mt-4">
            <Text className="text-sm text-muted-foreground">
              Restore purchases
            </Text>
          </Pressable>

          {/* Legal */}
          <Text className="text-[10px] text-muted-foreground text-center mt-6 leading-4">
            Payment will be charged to your Apple ID account at the confirmation
            of purchase. Subscription automatically renews unless it is canceled
            at least 24 hours before the end of the current period. You can
            manage or cancel your subscription in your App Store account
            settings.{" "}
            <Text
              className="text-[10px] underline text-muted-foreground"
              onPress={() => Linking.openURL("https://www.oomphh.cz/terms")}
            >
              Terms of Use
            </Text>
            {" & "}
            <Text
              className="text-[10px] underline text-muted-foreground"
              onPress={() => Linking.openURL("https://www.oomphh.cz/privacy")}
            >
              Privacy Policy
            </Text>
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
