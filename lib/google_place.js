/**
 * @file Provides a interface to Google Place API.
 * @module google_place
 * @author Salva Ruiz
 * @license MIT License
 */

/**
 * @constant {string}
 * @default
 */
const googlePlaceNearbySearchEndpoint = "/maps/api/place/nearbysearch/json";

import { getRequest as googleMapsGetRequest } from "./google_maps.js";

/**
 * Reject the unused keys of an object.
 *
 * @param {Object} place A Google Place object.
 * @return {Object} The resulting object.
 */
function assignObject(place) {
  const keys = [
    "place_id",
    "name",
    "latitude",
    "longitude",
    "formatted_address",
    "address_components",
    "vicinity",
    "photos",
    "formatted_phone_number",
    "international_phone_number",
    "opening_hours",
    "price_level",
    "rating",
    "user_ratings_total",
    "website",
    "url",
  ];

  return keys.reduce((acc, key) => {
    acc[key] = place[key] || null;
    return acc;
  }, {});
}

/**
 * Search operational restaurants in Google Places nearby a GPS location.
 *
 * @param {number} latitude The GPS latitude coordinate.
 * @param {number} longitude The GPS longitude coordinate.
 * @param {string} apiKey The Google Maps private API key.
 * @return {Object[]} An array of Google Place objects.
 * @throws {AbortError|TypeError|Response}
 */
export function nearbySearch(latitude, longitude) {
  return googleMapsGetRequest(googlePlaceNearbySearchEndpoint, {
    location: `${latitude},${longitude}`,
    type: "restaurant",
    rankby: "distance",
    language: "es",
  }).then((result) => {
    if (result.status == "OK") {
      return result.results
        .filter((place) => place.business_status != "CLOSED_PERMANENTLY")
        .map((place) => {
          if ("geometry" in place) {
            place.latitude = parseFloat(place.geometry.location.lat.toFixed(6));
            place.longitude = parseFloat(
              place.geometry.location.lng.toFixed(6),
            );
          }
          return assignObject(place);
        });
    } else {
      throw result;
    }
  });
}

/*
 * For testing only.
 */
export {
  googlePlaceNearbySearchEndpoint as test_googlePlaceNearbySearchEndpoint,
  assignObject as test_assignObject,
  nearbySearch as test_nearbySearch
};
