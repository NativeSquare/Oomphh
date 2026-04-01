import {
  PREMIUM_ENTITLEMENT_ID,
  UNLIMITED_ENTITLEMENT_ID,
  useRevenueCat,
  type SubscriptionTier,
} from "@/lib/revenue-cat";
import { SUBSCRIPTION_CAPABILITIES } from "@/lib/subscription-capabilities";
import { useCallback, useState } from "react";
import { Alert, Platform } from "react-native";
import Purchases, {
  type PurchasesPackage,
} from "react-native-purchases";

export function useSubscription() {
  const { customerInfo, tier, currentOffering, isReady } = useRevenueCat();
  const [isPurchasing, setIsPurchasing] = useState(false);

  const capabilities = SUBSCRIPTION_CAPABILITIES[tier];
  const gridLimit = capabilities.gridLimit;

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

  const findPackage = (id: string) =>
    currentOffering?.availablePackages?.find(
      (pkg) => pkg.identifier === id,
    ) ?? null;


  const premiumPackage = findPackage("premium_monthly");
  const unlimitedPackage = findPackage("unlimited_monthly");

  const packages = {
    premium: {
      monthly: premiumPackage,
      quarterly: findPackage("premium_quarterly"),
      annually: findPackage("premium_annually"),
    },
    unlimited: {
      monthly: unlimitedPackage,
      quarterly: findPackage("unlimited_quarterly"),
      annually: findPackage("unlimited_annually"),
    },
  };

  return {
    isReady,
    tier,
    isPurchasing,
    customerInfo,
    currentOffering,
    capabilities,
    gridLimit,
    premiumPackage,
    unlimitedPackage,
    packages,
    purchasePackage,
    restorePurchases,
  };
}
