import { LocationAutocompleteInput } from "@/components/app/events/location-autocomplete-input";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { EVENT_SEARCH_LOCATION_STORAGE_KEY } from "@/constants/events";
import { api } from "@packages/backend/convex/_generated/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAction } from "convex/react";
import { CirclePlus, Settings2 } from "lucide-react-native";
import React, { useState } from "react";
import { View } from "react-native";

export type SearchLocation = {
  latitude: number;
  longitude: number;
  name?: string;
  address?: string;
};

export type EventsHeaderProps = {
  searchLocation?: SearchLocation | null;
  hasActiveFilters?: boolean;
  onFilterPress?: () => void;
  onCreatePress?: () => void;
  onLocationChange?: (location: SearchLocation | null) => void;
};

export function EventsHeader({
  searchLocation,
  hasActiveFilters,
  onFilterPress,
  onCreatePress,
  onLocationChange,
}: EventsHeaderProps) {
  const [searchText, setSearchText] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const placesDetails = useAction(api.table.places.details);

  const locationLabel =
    searchLocation?.name || searchLocation?.address || "";
  const displayValue = isEditing ? searchText : locationLabel;

  const handlePlaceSelect = async (place: {
    place_id: string;
    description: string;
  }) => {
    try {
      const details: any = await placesDetails({ placeId: place.place_id });
      const lat = details?.location?.latitude;
      const lng = details?.location?.longitude;

      if (typeof lat !== "number" || typeof lng !== "number") {
        console.error("Missing coordinates from place details");
        return;
      }

      const formattedAddress = (details?.formattedAddress as string) ?? "";
      const name =
        (details?.displayName?.text as string) ??
        formattedAddress.split(",")[0] ??
        place.description;

      const newLocation: SearchLocation = {
        latitude: lat,
        longitude: lng,
        name,
        address: formattedAddress,
      };

      await AsyncStorage.setItem(
        EVENT_SEARCH_LOCATION_STORAGE_KEY,
        JSON.stringify(newLocation),
      );

      setSearchText("");
      setIsEditing(false);
      onLocationChange?.(newLocation);
    } catch (error) {
      console.error("Error fetching place details:", error);
    }
  };

  const handleClearLocation = async () => {
    try {
      await AsyncStorage.removeItem(EVENT_SEARCH_LOCATION_STORAGE_KEY);
    } catch (error) {
      console.error("Error clearing location:", error);
    }
    setSearchText("");
    setIsEditing(false);
    onLocationChange?.(null);
  };

  const handleChangeText = (text: string) => {
    setSearchText(text);
    if (!isEditing) setIsEditing(true);
  };

  const handleFocus = () => {
    setIsEditing(true);
    setSearchText(locationLabel);
  };

  return (
    <View className="gap-3">
      <Text className="text-xl font-medium text-white">Events</Text>

      <View className="flex-row items-start gap-2" style={{ zIndex: 50 }}>
        <View className="flex-1" style={{ zIndex: 50 }}>
          <LocationAutocompleteInput
            value={displayValue}
            onChangeText={handleChangeText}
            onSelect={handlePlaceSelect}
            onFocus={handleFocus}
            placeholder="Search Location"
            showClear={!!searchLocation && !isEditing}
            onClear={handleClearLocation}
          />
        </View>
        <Button
          variant={hasActiveFilters ? "default" : "outline"}
          size="icon"
          onPress={onFilterPress}
        >
          <Icon as={Settings2} size={20} />
        </Button>
        <Button variant="outline" size="icon" onPress={onCreatePress}>
          <Icon as={CirclePlus} size={20} />
        </Button>
      </View>
    </View>
  );
}
