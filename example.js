/**
 * @file An example to search for restaurants using the Google Place API.
 * @author Salva Ruiz
 * @license MIT License
 */

import * as GooglePlace from "./lib/google_place.js";

const latitude = 36.721347;
const longitude = -4.420142;

console.log("begin");

GooglePlace.nearbySearch(latitude, longitude)
  .then((response) => {
    console.log("--- ok ---");
    const [first] = response;
    console.log(first);
  }).catch((message) => {
    console.log("--- error ---");
    console.log(message);
  });

console.log("end");
