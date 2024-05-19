const apiKey = "AIzaSyDBQ2C3Jsilhs7py0W8Ox3g6OAk_dWsJgc";
const placeType = 'bicycle_rental'; // Adjust as per your needs, e.g., 'bicycle_store', 'bicycle_rental', 'parking', etc.
const universityCoords = { lat: 38.9869, lng: -76.9426 }; // University of Maryland College Park coordinates

// Function to fetch nearby places using Google Maps Places API
async function fetchNearbyPlaces() {
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${universityCoords.lat},${universityCoords.lng}&radius=3000&type=${placeType}&key=${apiKey}`;

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
    var map = L.map("map").setView([38.9869, -76.9426], 13);
    places.forEach((place, index) => {
        var marker = L.marker([place.geometry.location.lat, place.geometry.location.lng]).addTo(map);
        marker.bindPopup(`${place.vicinity}`).openPopup();
    });

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 15,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);
}

// Main function
async function main() {
    const places = await fetchNearbyPlaces();
    displayResults(places);
}

// Execute main function
main();

// DOM Content for Fetching current stations database
document.addEventListener('DOMContentLoaded', () => {
    const collegeParkStationsButton = document.getElementById('collegeParkStationsButton');
    const infoArea = document.getElementById('info-area');
    const addStationForm = document.getElementById('addStationForm');
    const addStationResult = document.getElementById('addStationResult');

    collegeParkStationsButton.addEventListener('click', async () => {
        try {
            const response = await fetch('http://localhost:3001/api/college-park-stations');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            infoArea.innerHTML = `<h3>Number of Stations in College Park: ${data.count}</h3>`;
        } catch (error) {
            console.error('Error fetching College Park stations:', error);
            infoArea.innerHTML = '<h3>Error fetching data. Please try again later.</h3>';
        }
    });

    // Function to handle empty fields and ensure proper data types
    const getValue = (id, type = 'string') => {
        let value = document.getElementById(id).value.trim();
        if (value === '') return null;
        if (type === 'number' && isNaN(value)) return null;
        if (type === 'number') return parseFloat(value);
        return value;
    };

    // DOM Content for Adding new stations to database
    addStationForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        // Gather form data using getElementById
        const stationData = {
            the_geom: getValue('the_geom'),
            ID: getValue('ID', 'number'),
            FAC_ID: getValue('FAC_ID', 'number'),
            BIKE_ID: getValue('BIKE_ID', 'number'),
            SYSTEM_ID: getValue('SYSTEM_ID', 'number'),
            SYSTEM_NAME: getValue('SYSTEM_NAME'),
            YEAR: getValue('YEAR', 'number'),
            ASOFDATE: getValue('ASOFDATE'),
            FAC_NAME: getValue('FAC_NAME'),
            ADDRESS: getValue('ADDRESS'),
            CITY: getValue('CITY'),
            STATE: getValue('STATE'),
            ZIPCODE: getValue('ZIPCODE'),
            CBSA_CODE: getValue('CBSA_CODE', 'number'),
            LONGITUDE: getValue('LONGITUDE', 'number'),
            LATITUDE: getValue('LATITUDE', 'number'),
            STATION_TYPE: getValue('STATION_TYPE'),
            launchDate: getValue('launchDate'),
            endDate: getValue('endDate')
        };

        // Log stationData for debugging
        console.log("Station Data to be sent:", stationData);

        try {
            const response = await fetch('http://localhost:3001/api/stations', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(stationData),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log("Server response:", data);  // Log the server response
            addStationResult.innerHTML = `<h3>${data.message}</h3>`;
        } catch (error) {
            console.error('Error adding station:', error);
            addStationResult.innerHTML = '<h3>Error adding station. Please try again later.</h3>';
        }
    });
});
