/**
 * @file Provides a interface to Google Maps API.
 * @module google_maps
 * @author Salva Ruiz <salva@salvaruiz.me>
 * @license MIT License
 */

/**
 * @constant {string}
 * @default
 */
const googleMapsApiUrl = "https://maps.googleapis.com";

/**
 * Build a URL string concatenating the Google Maps API URL, the API endpoint
 * and the query string.
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
  return [
    googleMapsApiUrl,
    googleMapsEndpoint,
    "?",
    new URLSearchParams(params).toString(),
  ].join("");
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
