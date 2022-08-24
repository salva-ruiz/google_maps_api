/**
 * @file Provides a interface to Google Maps API.
 * @module google_maps
 * @author Salva Ruiz
 * @license MIT License
 */

import { configSync } from "https://deno.land/std@0.152.0/dotenv/mod.ts";

/**
 * @constant {string}
 * @default
 */
const googleMapsApiUrl = "https://maps.googleapis.com";

/**
 * Get the Google Maps private API key from the .env file.
 *
 * @return {string} The API Key.
 */
function getGoogleMapsApiKey() {
  return configSync().GOOGLE_MAPS_API_KEY;
}

/**
 * Build a URL string combining the Google Maps API URL, the API endpoint and
 * the request params.
 *
 * @example
 * buildUrl("/maps/api/place/nearbysearch/json", {
 *   location: "36.721347,-4.420142"
 *   type: "restaurant",
 *   rankby: "distance",
 *   language: "es",
 *   key: "1234"});
 * // "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=36.721347%2C-4.420142&type=restaurant&rankby=distance&language=es&key=1234"
 *
 * @param {string} googleMapsEndpoint The Google Maps API endpoint.
 * @param {Object} params The query in the form of `{param: value, ...}`.
 * @return {string} The built URL string.
 */
function buildUrl(googleMapsEndpoint, params) {
  const url = new URL(googleMapsEndpoint, googleMapsApiUrl);
  const queryString = new URLSearchParams(params);
  queryString.append("key", getGoogleMapsApiKey());
  url.search = queryString;
  return url.href;
}

/**
 * Makes a HTTP GET request to Google Maps API.
 *
 * @param {string} googleMapsEndpoint The Google Maps API endpoint.
 * @param {Object} params The query in the form of `{param: value, ...}`.
 * @return {Promise} The Google Maps API response.
 * @throws {AbortError|TypeError|Response} The fetch exceptions.
 */
export function getRequest(googleMapsEndpoint, params) {
  const url = buildUrl(googleMapsEndpoint, params);

  return fetch(url)
    .then((response) => {
      if (response.ok && response.status == 200) {
        return response.json();
      } else {
        throw response;
      }
    });
}

/*
 * For testing only.
 */
export {
  googleMapsApiUrl as test_googleMapsApiUrl,
  getGoogleMapsApiKey as test_getGoogleMapsApiKey,
  buildUrl as test_buildUrl
};
