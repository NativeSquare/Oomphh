import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "disappearing_photos_sent";

type DisappearingPhotoRecord = {
  count: number;
  resetAt: number; // Unix timestamp for when the counter resets (monthly)
};

function getNextResetDate(): number {
  const now = new Date();
  const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
  return nextMonth.getTime();
}

async function getRecord(): Promise<DisappearingPhotoRecord> {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    if (!data) return { count: 0, resetAt: getNextResetDate() };

    const record = JSON.parse(data) as DisappearingPhotoRecord;
    if (Date.now() >= record.resetAt) {
      return { count: 0, resetAt: getNextResetDate() };
    }
    return record;
  } catch {
    return { count: 0, resetAt: getNextResetDate() };
  }
}

async function saveRecord(record: DisappearingPhotoRecord): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(record));
}

/**
 * Tracks the number of disappearing (view-once) photos sent per month.
 * Resets automatically at the start of each month.
 */
export function useDisappearingPhotoCount() {
  const [count, setCount] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    getRecord().then((record) => {
      setCount(record.count);
      setIsLoaded(true);
    });
  }, []);

  const increment = useCallback(async () => {
    const record = await getRecord();
    record.count += 1;
    await saveRecord(record);
    setCount(record.count);
  }, []);

  return { count, increment, isLoaded };
}
