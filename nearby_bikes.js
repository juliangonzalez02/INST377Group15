// Replace 'YOUR_API_KEY' with your actual Google Maps API key
const apiKey = AIzaSyDBQ2C3Jsilhs7py0W8Ox3g6OAk_dWsJgc;
const placeType = 'bicycle_rental'; // Adjust as per your needs, e.g., 'bicycle_store', 'bicycle_rental', 'parking', etc.
const universityCoords = { lat: 38.9869, lng: -76.9426 }; // University of Maryland College Park coordinates

// Function to fetch nearby places using Google Maps Places API
async function fetchNearbyPlaces() {
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${universityCoords.lat},${universityCoords.lng}&radius=2000&type=${placeType}&key=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error('Error fetching nearby places:', error);
        return [];
    }
}

// Function to display the results
function displayResults(places) {
    console.log('Shared e-bikes and scooters around University of Maryland College Park:');
    places.forEach((place, index) => {
        console.log(`${index + 1}. ${place.name} - ${place.vicinity}`);
    });
}

// Main function
async function main() {
    const places = await fetchNearbyPlaces();
    displayResults(places);
}

// Execute main function
main();
