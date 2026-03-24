import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { EVENT_SEARCH_LOCATION_STORAGE_KEY } from "@/constants/events";
import { LITE_MAP_STYLE } from "@/lib/map-style";
import { logLocationMapTiming } from "@/lib/logrocket";
import { api } from "@packages/backend/convex/_generated/api";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQuery } from "convex/react";
import * as Location from "expo-location";
import { useFocusEffect } from "@react-navigation/native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ArrowLeft, Crosshair, MapPin } from "lucide-react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

export const SEARCH_LOCATION_STORAGE_KEY = "search_location";

export default function LocationSearch() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    storageKey?: string;
  }>();
  const effectiveStorageKey = params.storageKey || SEARCH_LOCATION_STORAGE_KEY;
  const user = useQuery(api.table.users.currentUser);
  const mapRef = useRef<MapView>(null);
  const [region, setRegion] = useState({
    latitude: 37.7749, // Default to San Francisco
    longitude: -122.4194,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });
  const [selectedLocation, setSelectedLocation] = useState<{
    latitude: number;
    longitude: number;
    address?: string;
    name?: string;
  } | null>(null);
  const [isCurrentLocation, setIsCurrentLocation] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const isInitialMount = useRef(true);

  useFocusEffect(
    useCallback(() => {
      if (isInitialMount.current) {
        isInitialMount.current = false;
        return;
      }

      const reloadFromStorage = async () => {
        const useCurrent = await AsyncStorage.getItem(
          "__pending_use_current_location__",
        );
        if (useCurrent === "true") {
          await AsyncStorage.removeItem("__pending_use_current_location__");
          handleCurrentLocation();
          return;
        }

        const saved = await AsyncStorage.getItem(effectiveStorageKey);
        if (saved) {
          const parsed = JSON.parse(saved);
          const loc = {
            latitude: parsed.latitude,
            longitude: parsed.longitude,
            name: parsed.name,
            address: parsed.address,
          };
          setIsCurrentLocation(false);
          setSelectedLocation(loc);
          const newRegion = {
            ...loc,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          };
          setRegion(newRegion);
          mapRef.current?.animateToRegion(newRegion, 500);
        }
      };

      reloadFromStorage();
    }, [effectiveStorageKey]),
  );

  useEffect(() => {
    const initLocation = async () => {
      // Try loading a previously saved location from AsyncStorage
      try {
        const saved = await AsyncStorage.getItem(effectiveStorageKey);
        if (saved) {
          const parsed = JSON.parse(saved);
          const savedLoc = {
            latitude: parsed.latitude,
            longitude: parsed.longitude,
            name: parsed.name,
            address: parsed.address,
          };
          setSelectedLocation(savedLoc);
          setRegion({
            latitude: parsed.latitude,
            longitude: parsed.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          });
        }
      } catch (error) {
        console.error("Error loading saved location:", error);
      }

      // Also fetch device location to update the map if no saved location
      const t0 = Date.now();
      let permissionMs = 0;
      let getPositionMs = 0;
      let positionStart = t0;

      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        permissionMs = Date.now() - t0;

        if (status !== "granted") {
          logLocationMapTiming({
            permissionMs,
            getPositionMs: 0,
            totalMs: Date.now() - t0,
            status: "denied",
          });
          console.warn("Location permission not granted");
          setIsLoading(false);
          return;
        }

        positionStart = Date.now();
        const location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });
        getPositionMs = Date.now() - positionStart;

        const coords = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        };

        // Only use device location if no saved location was loaded
        setSelectedLocation((prev) => {
          if (prev) return prev;
          setRegion({
            ...coords,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          });
          return coords;
        });

        logLocationMapTiming({
          permissionMs,
          getPositionMs,
          totalMs: Date.now() - t0,
          status: "granted",
        });
        setIsLoading(false);
      } catch (error) {
        if (permissionMs > 0) {
          getPositionMs = Date.now() - positionStart;
        }
        logLocationMapTiming({
          permissionMs,
          getPositionMs,
          totalMs: Date.now() - t0,
          status: "error",
          errorMessage: error instanceof Error ? error.message : String(error),
        });
        console.error("Error getting location:", error);
        setIsLoading(false);
      }
    };

    initLocation();
  }, []);

  const saveLocation = async (
    location: {
      latitude: number;
      longitude: number;
      name?: string;
      address?: string;
    },
    isCurrentLoc: boolean,
  ) => {
    try {
      if (isCurrentLoc) {
        await AsyncStorage.removeItem(effectiveStorageKey);
      } else {
        const locationData = {
          latitude: location.latitude,
          longitude: location.longitude,
          name: location.name,
          address: location.address,
        };
        await AsyncStorage.setItem(
          effectiveStorageKey,
          JSON.stringify(locationData),
        );
      }
    } catch (error) {
      console.error("Error saving location:", error);
    }
  };

  const handleCurrentLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.warn("Location permission not granted");
        return;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };

      let finalLocation: {
        latitude: number;
        longitude: number;
        name?: string;
        address?: string;
      } = { ...coords, name: "My Location" };

      setIsCurrentLocation(true);
      setSelectedLocation(finalLocation);
      setRegion({
        ...coords,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });

      mapRef.current?.animateToRegion(
        {
          ...coords,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        },
        500,
      );

      try {
        const [result] = await Location.reverseGeocodeAsync(coords);
        if (result) {
          const addressParts = [
            result.street,
            result.city,
            result.region,
            result.country,
          ].filter(Boolean);
          const address = addressParts.join(", ");

          finalLocation = {
            ...coords,
            name: "My Location",
            address: address || undefined,
          };
          setSelectedLocation(finalLocation);
        }
      } catch (error) {
        console.error("Error reverse geocoding:", error);
      }

      await saveLocation(finalLocation, true);
    } catch (error) {
      console.error("Error getting current location:", error);
    }
  };

  const handleSearchPress = () => {
    router.push({
      pathname: "/(app)/location-search/autocomplete",
      params: params.storageKey ? { storageKey: params.storageKey } : undefined,
    });
  };

  const handleMapLongPress = async (event: {
    nativeEvent: { coordinate: { latitude: number; longitude: number } };
  }) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;

    let finalLocation: {
      latitude: number;
      longitude: number;
      address?: string;
      name?: string;
    } = { latitude, longitude };

    setIsCurrentLocation(false);
    setSelectedLocation(finalLocation);

    mapRef.current?.animateToRegion(
      {
        latitude,
        longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      },
      300,
    );

    try {
      const [result] = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });
      if (result) {
        const name =
          result.name ||
          result.street ||
          result.city ||
          `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
        const addressParts = [
          result.street,
          result.city,
          result.region,
          result.country,
        ].filter(Boolean);
        const address = addressParts.join(", ");

        finalLocation = {
          latitude,
          longitude,
          name,
          address: address || undefined,
        };
        setSelectedLocation(finalLocation);
      }
    } catch (error) {
      console.error("Error reverse geocoding:", error);
    }

    await saveLocation(finalLocation, false);
  };

  return (
    <View className="flex-1 bg-background">
      {/* Header with back button and search bar */}
      <View className="absolute top-0 left-0 right-0 z-10 pt-safe bg-background/95 backdrop-blur-sm">
        <View className="flex-row items-center gap-2 p-4">
          <Button
            variant="ghost"
            size="icon"
            onPress={() =>
              effectiveStorageKey === EVENT_SEARCH_LOCATION_STORAGE_KEY
                ? router.replace("/(app)/(tabs)/events")
                : router.back()
            }
            className="rounded-full"
          >
            <Icon as={ArrowLeft} size={20} />
          </Button>
          <Pressable onPress={handleSearchPress} className="flex-1">
            <View className="relative">
              <View className="absolute left-3 top-1/2 -translate-y-1/2 z-10">
                <Ionicons
                  name="search-outline"
                  size={20}
                  className="text-muted-foreground"
                />
              </View>
              <Input
                placeholder={selectedLocation?.name || "Search Location..."}
                className="pl-10"
                editable={false}
                pointerEvents="none"
              />
            </View>
          </Pressable>
        </View>
        {/* Selected location info */}
        {selectedLocation?.address && (
          <View className="px-4 pb-3">
            <Text className="text-sm text-muted-foreground" numberOfLines={1}>
              {selectedLocation.address}
            </Text>
          </View>
        )}
      </View>

      {/* Map View */}
      <View className="flex-1">
        {!isLoading && (
          <MapView
            ref={mapRef}
            provider={PROVIDER_GOOGLE}
            style={StyleSheet.absoluteFillObject}
            initialRegion={region}
            showsUserLocation={false}
            showsMyLocationButton={false}
            mapType="standard"
            loadingEnabled
            customMapStyle={LITE_MAP_STYLE}
            onLongPress={handleMapLongPress}
          >
            {selectedLocation && (
              <Marker
                coordinate={selectedLocation}
                anchor={{ x: 0.5, y: 1 }}
                flat={false}
              >
                <View style={styles.markerContainer}>
                  <View style={styles.markerIconContainer}>
                    <MapPin size={20} color="#fff" />
                  </View>
                  <View style={styles.markerPointer} />
                </View>
              </Marker>
            )}
          </MapView>
        )}
      </View>

      {/* Action Buttons */}
      <View className="absolute bottom-0 left-0 z-10 mb-safe pb-4 pl-8">
        <Button
          variant="outline"
          size="icon"
          onPress={handleCurrentLocation}
          className="rounded-full w-12 h-12"
        >
          <Icon as={Crosshair} size={20} />
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  markerContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  markerIconContainer: {
    backgroundColor: "#E63B2E", // primary red
    borderRadius: 9999,
    padding: 8,
  },
  markerPointer: {
    width: 0,
    height: 0,
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderTopWidth: 12,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: "#E63B2E", // primary red
  },
});
