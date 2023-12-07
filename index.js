/**
 * The function calculates the geographical center of a set of nodes based on their latitude and
 * longitude coordinates.
 * @param nodes - The `nodes` parameter is an array of objects representing geographical nodes. Each
 * node object should have a `latitude` and `longitude` property, which are numerical values
 * representing the coordinates of the node's location on the Earth's surface.
 * @returns The function `calculateGeographicalCenter` returns an object with the properties `latitude`
 * and `longitude`, which represent the calculated geographical center based on the input `nodes`.
 */
const calculateGeographicalCenter = (nodes) => {
    console.log('Calculating geographical center...');
    // console.log('Nodes:', nodes);
    const latitudesSum = nodes.reduce((acc, node) => acc + node.lat, 0);
    const longitudesSum = nodes.reduce((acc, node) => acc + node.lng, 0);
    return { latitude: latitudesSum / nodes.length, longitude: longitudesSum / nodes.length };
};

/**
 * The function `getLatitudeLongitude` takes an address and an API key as parameters, and uses the
 * Google Maps Geocoding API to retrieve the latitude and longitude coordinates of the address.
 * @param address - The `address` parameter is a string that represents the address for which you want
 * to retrieve the latitude and longitude coordinates. It should be a valid address that can be
 * geocoded by the Google Maps Geocoding API.
 */
const getLatitudeLongitude = async (address) => {
    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=AIzaSyA_mmI-elWh_pASDm9bTxAzbP4jsqEMc_g`;

    try {
        const response = await fetch(geocodeUrl);
        const data = await response.json();
        if (data.status === 'OK') {
            const location = data.results[0].geometry.location;
            // console.log('Address:', address);
            // console.log('Latitude:', location.lat);
            // console.log('Longitude:', location.lng);
            return location;
        } else {
            console.error('Geocoding failed:', data.status);
        }
    } catch (error) {
        console.error('Error:', error);
    }
};


/**
 * The function `findNearbyPlaces` uses the Google Places API to search for nearby places of a specific
 * type within a given radius from a center point.
 * @param center - The center parameter is an object that represents the latitude and longitude
 * coordinates of the center point from which you want to search for nearby places. It should have the
 * following structure: { latitude: number, longitude: number }
 * @param type - The "type" parameter in the "findNearbyPlaces" function is used to specify the type of
 * places you want to search for. It can be any valid place type supported by the Google Places API,
 * such as "restaurant", "cafe", "park", etc.
 */
const findNearbyPlaces = async (center, type) => {
    const radius = '500'; // Search within 500 meters
    const placesUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${center.latitude},${center.longitude}&radius=${radius}&type=${type}&key=AIzaSyA_mmI-elWh_pASDm9bTxAzbP4jsqEMc_g`;
    console.log('Searching for nearby places...');
    console.log('Center:', center);
    console.log('Type:', type);
    try {
        const response = await fetch(placesUrl);
        const data = await response.json();
        // console.log(data);
        if (data.status === 'OK') {
            return data.results;
        } else {
            console.error('Places search failed:', data.status);
        }
    } catch (err) {
        console.error('Error:', err);
    }
};


/**
 * The function retrieves the coordinates of given addresses, calculates the geographical center, and
 * finds nearby restaurants and bars.
 * @param addresses - An array of addresses for which you want to retrieve nearby restaurants and bars.
 * @returns The function `retrieveRestaurantsAndBars` returns an object with two properties:
 * `restaurants` and `bars`. The `restaurants` property contains the nearby restaurants, and the `bars`
 * property contains the nearby bars.
 */
const retrieveRestaurantsAndBars = async (addresses) => {
    // Geocode all addresses to get their coordinates
    const coords = await Promise.all(addresses.map(address => getLatitudeLongitude(address)));

    // Calculate the geographical center of all coordinates
    const center = calculateGeographicalCenter(coords);

    // Find nearby restaurants and bars
    const restaurants = await findNearbyPlaces(center, 'restaurant');
    const bars = await findNearbyPlaces(center, 'bar');

    return { restaurants, bars };
};

const { addresses } = require('./config.json');

retrieveRestaurantsAndBars(addresses).then(results => {
    // Extracting restaurant and bar names from the results
    const restaurantNames = results.restaurants.map(place => place.name);
    const barNames = results.bars.map(place => place.name);
    
    // If one is both a bar and restaurant 
    const both = restaurantNames.filter(name => barNames.includes(name));

    console.log('Restaurant and Bar:', both);
    console.log('Restaurants:', restaurantNames);
    console.log('Bars:', barNames);
});


module.exports = {
    calculateGeographicalCenter,
    getLatitudeLongitude,
    findNearbyPlaces,
    retrieveRestaurantsAndBars
};
