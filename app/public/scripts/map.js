
function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 51.5074, lng: 0.1278 },
    zoom: 12,
    key: "AIzaSyCkPjRJiiqhUZFJ4T_OJULzHnxlVXHzxEo",
  });

  // Fetch parking data from your API or manually create an array of parking objects
  const parkings = [
    // ... parking data
  ];

  parkings.forEach((parking) => {
    const marker = new google.maps.Marker({
      position: { lat: parking.latitude, lng: parking.longitude },
      map: map,
      title: parking.name,
      icon: "https://maps.google.com/mapfiles/kml/pal4/icon28.png",
    });

    // Add an info window to display parking details
    const infoWindow = new google.maps.InfoWindow({
      content: `
        <h3>${parking.name}</h3>
        <p>${parking.address}</p>
        <p>Available spaces: ${parking.availableSpaces}</p>
      `,
    });

    marker.addListener("click", () => {
      infoWindow.open(map, marker);
    });
  });
}