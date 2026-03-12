import {
  PREMIUM_ENTITLEMENT_ID,
  UNLIMITED_ENTITLEMENT_ID,
  useRevenueCat,
  type SubscriptionTier,
} from "@/lib/revenue-cat";
import { useCallback, useState } from "react";
import { Alert, Platform } from "react-native";
import Purchases, {
  type PurchasesPackage,
} from "react-native-purchases";

const GRID_LIMITS: Record<SubscriptionTier, number> = {
  free: 2,
  premium: 5,
  unlimited: Infinity,
};

export function useSubscription() {
  const { customerInfo, tier, currentOffering, isReady } = useRevenueCat();
  const [isPurchasing, setIsPurchasing] = useState(false);

  const gridLimit = GRID_LIMITS[tier];

  const purchasePackage = useCallback(
    async (pkg: PurchasesPackage) => {
      if (Platform.OS === "web") return false;
      setIsPurchasing(true);
      try {
        const { customerInfo } = await Purchases.purchasePackage(pkg);
        return (
          customerInfo.entitlements.active[PREMIUM_ENTITLEMENT_ID] !==
            undefined ||
          customerInfo.entitlements.active[UNLIMITED_ENTITLEMENT_ID] !==
            undefined
        );
      } catch (error: any) {
        if (!error.userCancelled) {
          Alert.alert(
            "Purchase Error",
            error.message ?? "An error occurred during purchase.",
          );
        }
        return false;
      } finally {
        setIsPurchasing(false);
      }
    },
    [],
  );

  const restorePurchases = useCallback(async () => {
    if (Platform.OS === "web") return false;
    try {
      const info = await Purchases.restorePurchases();
      return (
        info.entitlements.active[PREMIUM_ENTITLEMENT_ID] !== undefined ||
        info.entitlements.active[UNLIMITED_ENTITLEMENT_ID] !== undefined
      );
    } catch (error: any) {
      Alert.alert(
        "Restore Error",
        error.message ?? "An error occurred while restoring purchases.",
      );
      return false;
    }
  }, []);

  // Match by product identifier — consistent across test store and production
  const premiumPackage = currentOffering?.availablePackages?.find(
    (pkg) => pkg.product.identifier === "com.oomphh.premium_monthly",
  ) ?? null;

  const unlimitedPackage = currentOffering?.availablePackages?.find(
    (pkg) => pkg.product.identifier === "com.oomphh.unlimited_monthly",
  ) ?? null;

  return {
    isReady,
    tier,
    isPurchasing,
    customerInfo,
    currentOffering,
    gridLimit,
    premiumPackage,
    unlimitedPackage,
    purchasePackage,
    restorePurchases,
  };
}
