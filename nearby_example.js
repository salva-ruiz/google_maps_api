/**
 * @file An example to search for restaurants using the Google Place API.
 * @author Salva Ruiz <salva@salvaruiz.me>
 * @license MIT License
 */

import { configSync } from "https://deno.land/std@0.152.0/dotenv/mod.ts";
import * as GooglePlace from "./lib/google_place.js";

const googleMapsApiKey = configSync().GOOGLE_MAPS_API_KEY;

const latitude = 36.721347;
const longitude = -4.420142;

console.log("begin");

GooglePlace.nearbySearch(latitude, longitude, googleMapsApiKey)
  .then((response) => {
    console.log("--- ok ---");
    const [first] = response;
    console.log(first);
  }).catch((message) => {
    console.log("--- error ---");
    console.log(message);
  });

console.log("end");
