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
    const latSum = nodes.reduce((acc, node) => acc + node.latitude, 0);
    const lngSum = nodes.reduce((acc, node) => acc + node.longitude, 0);
    return { latitude: latSum / nodes.length, longitude: lngSum / nodes.length };
};

/**
 * The function `getLatitudeLongitude` takes an address and an API key as parameters, and uses the
 * Google Maps Geocoding API to retrieve the latitude and longitude coordinates of the address.
 * @param address - The `address` parameter is a string that represents the address for which you want
 * to retrieve the latitude and longitude coordinates. It should be a valid address that can be
 * geocoded by the Google Maps Geocoding API.
 * @param apiKey - The `apiKey` parameter is the API key that is required to access the Google Maps
 * Geocoding API. This key is used to authenticate and authorize your requests to the API. You can
 * obtain an API key by creating a project in the Google Cloud Console and enabling the Geocoding API
 * for that project.
 */
const getLatitudeLongitude = async (address, apiKey) => {
    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
    
    try {
        const response = await fetch(geocodeUrl);
        const data = await response.json();
        if (data.status === 'OK') {
            const location = data.results[0].geometry.location;
            console.log('Latitude:', location.lat);
            console.log('Longitude:', location.lng);
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
 * @param apiKey - The `apiKey` parameter is the API key that you obtain from the Google Cloud Platform
 * Console. This key is required to authenticate your requests to the Google Places API.
 */
const findNearbyPlaces = async (center, type, apiKey) => {
    const radius = '500'; // Search within 500 meters
    const placesUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${center.latitude},${center.longitude}&radius=${radius}&type=${type}&key=${apiKey}`;

    try {
        const response = await fetch(placesUrl);
        const data = await response.json();
        console.log(data);
    } catch (err) {
        console.error('Error:', err);
    }
};

const nodes = [
    { latitude: 40.7128, longitude: -74.0060 }, 
    { latitude: 34.0522, longitude: -118.2437 }, 
];
const center = calculateGeographicalCenter(nodes);
const apiKey = 'YOUR_GOOGLE_API_KEY'; 

getLatitudeLongitude('902 Grand Avenue', apiKey);
findNearbyPlaces(center, 'restaurant', apiKey);
findNearbyPlaces(center, 'bar', apiKey);

module.exports = {
    calculateGeographicalCenter,
    getLatitudeLongitude,
    findNearbyPlaces
};
