import React, { createContext, useContext, useEffect, useState } from "react";
import { Platform } from "react-native";
import Purchases, {
  type CustomerInfo,
  LOG_LEVEL,
  type PurchasesOffering,
} from "react-native-purchases";

const API_KEY = process.env.EXPO_PUBLIC_REVENUECAT_API_KEY!;

const PREMIUM_ENTITLEMENT_ID = "Premium";
const UNLIMITED_ENTITLEMENT_ID = "Unlimited";

export type SubscriptionTier = "free" | "premium" | "unlimited";

interface RevenueCatContextType {
  customerInfo: CustomerInfo | null;
  tier: SubscriptionTier;
  currentOffering: PurchasesOffering | null;
  isReady: boolean;
}

const RevenueCatContext = createContext<RevenueCatContextType>({
  customerInfo: null,
  tier: "free",
  currentOffering: null,
  isReady: false,
});

export function RevenueCatProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo | null>(null);
  const [currentOffering, setCurrentOffering] =
    useState<PurchasesOffering | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function init() {
      if (Platform.OS === "web") {
        setIsReady(true);
        return;
      }

      if (__DEV__) {
        Purchases.setLogLevel(LOG_LEVEL.VERBOSE);
      }

      Purchases.configure({ apiKey: API_KEY });

      const info = await Purchases.getCustomerInfo();
      setCustomerInfo(info);

      const offerings = await Purchases.getOfferings();
      if (__DEV__) {
        console.log(
          "[RevenueCat] Current offering:",
          offerings.current?.identifier,
        );
        console.log(
          "[RevenueCat] Available packages:",
          offerings.current?.availablePackages?.map((p) => ({
            identifier: p.identifier,
            productId: p.product.identifier,
            priceString: p.product.priceString,
          })),
        );
      }
      setCurrentOffering(offerings.current);

      setIsReady(true);

      Purchases.addCustomerInfoUpdateListener((updatedInfo) => {
        setCustomerInfo(updatedInfo);
      });
    }

    init();
  }, []);

  const tier: SubscriptionTier = (() => {
    if (!customerInfo) return "free";
    if (customerInfo.entitlements.active[UNLIMITED_ENTITLEMENT_ID]) {
      return "unlimited";
    }
    if (customerInfo.entitlements.active[PREMIUM_ENTITLEMENT_ID]) {
      return "premium";
    }
    return "free";
  })();

  return (
    <RevenueCatContext.Provider
      value={{
        customerInfo,
        tier,
        currentOffering,
        isReady,
      }}
    >
      {children}
    </RevenueCatContext.Provider>
  );
}

export function useRevenueCat() {
  return useContext(RevenueCatContext);
}

export { PREMIUM_ENTITLEMENT_ID, UNLIMITED_ENTITLEMENT_ID };
