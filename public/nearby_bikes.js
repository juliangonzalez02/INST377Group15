// Replace 'YOUR_API_KEY' with your actual Google Maps API key
const apiKey = "AIzaSyDBQ2C3Jsilhs7py0W8Ox3g6OAk_dWsJgc";
const placeType = 'bicycle_rental'; // Adjust as per your needs, e.g., 'bicycle_store', 'bicycle_rental', 'parking', etc.
const universityCoords = { lat: 38.9869, lng: -76.9426 }; // University of Maryland College Park coordinates

// Function to fetch nearby places using Google Maps Places API
async function fetchNearbyPlaces() {
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${universityCoords.lat},${universityCoords.lng}&radius=3000&type=${placeType}&key=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        //console.log(data);
        return data.results;
    } catch (error) {
        console.error('Error fetching nearby places:', error);
        return [];
    }
}

// Function to display the results
function displayResults(places) {
    var map = L.map("map").setView([38.9869, -76.9426], 13);
    //console.log('Shared e-bikes and scooters around University of Maryland College Park:');
    places.forEach((place, index) => {
        //console.log(`${index + 1}. ${place.name} - ${place.vicinity} - ${place.geometry.location.lat} - ${place.geometry.location.lng}`);
        var marker = L.marker([place.geometry.location.lat, place.geometry.location.lng]).addTo(map);
        marker.bindPopup(`${place.vicinity}`).openPopup();
    });

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 15,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);
}

// Main function
async function main() {
    const places = await fetchNearbyPlaces();
    displayResults(places);
}

// Execute main function
main();
