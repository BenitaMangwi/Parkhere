// Assuming the locationController object has a getLocations() method that returns an array of parking space objects
const locationController = require('./controllers/locationController');

function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 51.5074, lng: 0.1278 },
    zoom: 12,
  });

  async function displayParkingSpaces() {
    try {
      const locations = await locationController.getLocations(); // Fetch data from your database
  
      locations.forEach((location) => { // Iterate over the locations array
        if (location.availability === "Available") { // Filter for available parking spaces
          const marker = new google.maps.Marker({
            position: { lat: location.latitude, lng: location.longitude },
            map: map,
            title: location.name,
            icon: "https://maps.google.com/mapfiles/kml/pal4/icon28.png",
          });
  
          // Add an info window to display parking details
          const infoWindow = new google.maps.InfoWindow({
            content: `
              <h3>${location.name}</h3>
              <p>${location.address}</p>
              <p>Amenities: ${location.amenities}</p>
              <p>Price: $${location.price}/hour</p>
              <p>Available: ${location.availability}</p>
            `,
          });
  
          marker.addListener("click", () => {
            infoWindow.open(map, marker);
          });
        }
      });
    } catch (error) {
      console.error("Error fetching parking spaces:", error);
      // Handle the error gracefully, e.g., display an error message to the user
    }
  }
  displayParkingSpaces
}