import type { MapStyleElement } from "react-native-maps";

/**
 * Simplified Google Maps style that hides POIs, transit, and
 * unnecessary labels to reduce rendering overhead.
 */
export const LITE_MAP_STYLE: MapStyleElement[] = [
  {
    featureType: "poi",
    elementType: "all",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "transit",
    elementType: "all",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "road",
    elementType: "labels.icon",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "administrative.land_parcel",
    elementType: "labels",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "landscape.man_made",
    elementType: "labels",
    stylers: [{ visibility: "off" }],
  },
];
