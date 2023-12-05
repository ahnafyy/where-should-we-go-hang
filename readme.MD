
# 🌍📍 Where should we go hang? 🚀

This project provides a set of JavaScript utilities for geographical location services 🗺️. If you have a bunch of friends who want to find a place to go (restaurant and bar) that is close to all of them its often super hard to pin point where? Using the Google Maps API 🌐, it offers functionalities like finding the geographical center from multiple nodes, converting addresses to latitude and longitude, and searching for nearby places such as restaurants and bars.

## Features 🌟

- 📍 **Geographical Center Calculation**: Calculate the geographical center of multiple nodes.
- 🏠 **Address to Coordinates**: Convert a physical address to latitude and longitude 🌍.
- 🍔🍹 **Find Nearby Places**: Search for nearby restaurants, bars, or other places using Google Places API 🛍️.

## How to Use 🔍

### Prerequisites 📋

To use these scripts, you need a valid Google API key 🔑. Obtain your key from the [Google Cloud Platform Console](https://console.cloud.google.com/).

### Usage 🛠️

1. **Calculate Geographical Center**
   Provide an array of nodes with latitude and longitude to find their geographical center 🧭.

2. **Convert Address to Coordinates**
   Use `getLatLngFromAddress` to convert a given address to its geographical coordinates 🌐.

3. **Find Nearby Places**
   With `findNearbyPlaces`, find places like restaurants or bars near a given location 🍽️🍸.

## How to work it (TO-DO! MORE UPDATES COMING SOON)

```javascript
// Example nodes for Geographical Center Calculation
const nodes = [
    { latitude: 40.7128, longitude: -74.0060 }, 
    { latitude: 34.0522, longitude: -118.2437 }, 
    // Add more nodes here
];

// Calculate Geographical Center
const center = calculateGeographicalCenter(nodes);

// Use your Google API Key
const apiKey = 'YOUR_GOOGLE_API_KEY';

// Find nearby restaurants and bars
findNearbyPlaces(center, 'restaurant', apiKey);
findNearbyPlaces(center, 'bar', apiKey);

// Convert an address to latitude and longitude
getLatLngFromAddress('1600 Amphitheatre Parkway, Mountain View, CA', apiKey);
```

