/**
 * @file Test file.
 * @author Salva Ruiz
 * @license MIT License
 */

import {
  assert,
  assertExists,
  assertEquals,
  assertObjectMatch
} from "https://deno.land/std@0.152.0/testing/asserts.ts";

import { configSync } from "https://deno.land/std@0.152.0/dotenv/mod.ts";

import {
  test_googleMapsApiUrl,
  test_getGoogleMapsApiKey,
  test_buildUrl,
  getRequest as googleMapsGetRequest
} from "./lib/google_maps.js";

import {
  test_googlePlaceNearbySearchEndpoint,
  test_assignObject,
  nearbySearch as googlePlaceNearbySearch
} from "./lib/google_place.js";

/*
 * lib/google_maps.js
 */

Deno.test("Get a Google Maps API key from .env file", () => {
  const apiKey = test_getGoogleMapsApiKey();
  assertExists(apiKey);
});

Deno.test("Build Google Maps URL", () => {
  const apiKey = test_getGoogleMapsApiKey();
  const builtUrl = test_buildUrl(
    test_googlePlaceNearbySearchEndpoint, {type: "restaurant"});

  const validUrl = [
    test_googleMapsApiUrl,
    test_googlePlaceNearbySearchEndpoint,
    `?type=restaurant&key=${apiKey}`
  ].join("")

  assertEquals(builtUrl, validUrl);
});

Deno.test("Google Maps API returns a valid response", async () => {
  const response = await googleMapsGetRequest(
    test_googlePlaceNearbySearchEndpoint, {
      location: "36.721347,-4.420142",
      type: "restaurant",
      rankby: "distance",
      language: "es",
  });

  assertEquals(response.status, "OK");
});

/*
 * lib/google_places.js
 */

Deno.test("Google Place API returns a list of places", async () => {
  const response = await googlePlaceNearbySearch(36.721347, -4.420142);

  assertExists(response);
});

Deno.test("Filter properties from Google Place object", () => {
  const place = {
    name: "Example",
    filtered: "prohibited"
  };

  const response = test_assignObject(place);

  assert(!("filtered" in response));
  assertObjectMatch(response, {name: "Example"});
});
