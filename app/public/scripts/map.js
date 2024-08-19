


function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 51.5074, lng: 0.1278 },
    zoom: 12,
  });

  // Fetch parking data from your API or manually create an array of parking objects
  const parkings = [
    {
      name: "Eastside Parking Lot",
      address: "456 Elm St, Anytown, CA 91234",
      amenities: "None",
      price: 3,
      availability: "Available",
      latitude:-0.1279688 ,
      longitude: 51.5077286 ,
    },

  ];

  parkings.forEach((parking) => {
    if (parking.availability === "Available") { // Filter for parking locations
      const marker = new google.maps.Marker({
        position: { lat: parking.latitude, lng: parking.longitude },
        map: map,
        title: parking.name,
        icon: "/images/favicon1.png",
      });

      // Add an info window to display parking details
      const infoWindow = new google.maps.InfoWindow({
        content: `
          <h3>${parking.name}</h3>
          <p>${parking.address}</p>
          <p>Available spaces: ${parking.availability}</p>
        `,
      });

      marker.addListener("click", () => {
        infoWindow.open(map, marker);
      });
    }
  });
}