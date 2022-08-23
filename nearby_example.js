/**
 * @fileoverview Example of making a request to Google Places.
 */

import * as GooglePlaces from "./lib/google_places.js"

const latitude = 36.721347
const longitude = -4.420142

console.log('begin')

GooglePlaces.nearbySearch(latitude, longitude)
  .then(response => {
    console.log("--- ok ---")
    console.log(response)
  }).catch(message => {
    console.log("--- error ---")
    console.log(message)
  })

console.log('end')
