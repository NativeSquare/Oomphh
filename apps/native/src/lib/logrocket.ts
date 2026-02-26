import LogRocket from '@logrocket/react-native';
/**
 * LogRocket helpers. Init from root layout with EXPO_PUBLIC_LOGROCKET_APP_ID set.
 */

let isInitialized = false;

export function initLogRocket(): void {
  const appId = process.env.EXPO_PUBLIC_LOGROCKET_APP_ID;
  if (!appId || isInitialized) return;
  try {
    LogRocket.init(appId);
    isInitialized = true;
  } catch {
    // LogRocket not available or init failed (e.g. dev without app id)
  }
}

export type LocationMapTimingPayload = {
  permissionMs: number;
  getPositionMs: number;
  totalMs: number;
  status: "granted" | "denied" | "error";
  errorMessage?: string;
};

export function logLocationMapTiming(payload: LocationMapTimingPayload): void {
  const message = "Location map load timing";
  if (isInitialized) {
    try {
      LogRocket.log(message, payload);
    } catch {
      console.info(message, payload);
    }
  } else {
    console.info(message, payload);
  }
}
