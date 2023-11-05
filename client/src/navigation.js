const getLocationButton = document.getElementById("getLocation");
getLocationButton.addEventListener("click", () => {
  navigator.geolocation.getCurrentPosition(showPosition, showError);
});

let lat;
let long;

function showPosition(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const accuracy = position.coords.accuracy;

  const output = `
        Latitude: ${latitude}
        Longitude: ${longitude}
        Accuracy: ${accuracy} meters
      `;

  alert(output);
  lat = position.coords.latitude;
  long = longitude;
}

function showError(error) {
  switch (error.code) {
    case 1:
      alert("Permission denied.");
      break;
    case 2:
      alert("Position unavailable.");
      break;
    case 3:
      alert("Timeout.");
      break;
    default:
      alert("Unknown error.");
  }
}

getLocationButton.addEventListener("click", () => {
  function openGoogleMapsWithLatitudeAndLongitudeAndSearch(lat, long) {
    const url = `https://www.google.com/maps/search/?api=1&query=hospitals+24/7+near+me+&destination=${lat},${long}`;
    window.open(url, "_blank");
  }
  openGoogleMapsWithLatitudeAndLongitudeAndSearch(lat, long);
});

