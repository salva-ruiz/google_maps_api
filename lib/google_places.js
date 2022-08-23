/**
 * @fileoverview Provides a interface to Google Maps API.
 */

import {configSync} from "https://deno.land/std@0.152.0/dotenv/mod.ts";

const environmentConfig = configSync()
const googleMapsApiKey = environmentConfig.GOOGLE_MAPS_API_KEY

const googleMapsApiUrl = "https://maps.googleapis.com"
const googlePlacesNearBySearchEndPoint = "/maps/api/place/nearbysearch/json"

/**
 * Build a URL concatening the API URL, endpoint and query string.
 * @param {string} endPoint The Google Maps API endpoint.
 * @param {ObjType} params The request to Google Maps API.
 * @return {string} The resulting URL.
 */
function buildUrl(endPoint, params) {
  const queryString = new URLSearchParams(params)
  queryString.append("key", googleMapsApiKey)
  return googleMapsApiUrl + endPoint + "?" + queryString.toString()
}

/**
 * Makes a GET request to Google Maps API.
 * @param {string} endPoint The Google Maps API endpoint.
 * @param {ObjType} params The request to Google Maps API.
 * @return {Array<ObjType>} The Google Maps API response.
 */
function getRequest(endPoint, params) {
  return fetch(buildUrl(endPoint, params))
    .then(response => {
      if (response.ok && response.status == 200) {
        return response.json()
      } else {
        throw response
      }
    })
}

/**
 * Copy an object to other rejecting unused keys.
 * @param {ObjType} place A Google Place object.
 * @return {ObjType} The resulting object.
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
  ]

  return keys.reduce((acc, key) => {
    acc[key] = place[key] || null
    return acc
  }, {})
}

/**
 * Search Google Places by a GPS location.
 * @param {number} latitude The GPS latitude coordinate.
 * @param {number} longitude The GPS longitude coordinate.
 * @return {Array<ObjType>} The Google Places resulting.
 */
export function nearbySearch(latitude, longitude) {
  return getRequest(googlePlacesNearBySearchEndPoint, {
    location: `${latitude},${longitude}`,
    type: "restaurant",
    rankby: "distance",
    language: "es",
  }).then(result => {
    if (result.status == "OK") {
      return result.results
        .filter(place => place.business_status != "CLOSED_PERMANENTLY")
        .map(place => {
          if ("geometry" in place) {
            place.latitude = parseFloat(place.geometry.location.lat.toFixed(6))
            place.longitude = parseFloat(place.geometry.location.lng.toFixed(6))
          }
          return assignObject(place)
        })
    } else {
      throw result
    }
  })
}

