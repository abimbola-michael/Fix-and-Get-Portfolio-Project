const { default: axios } = require("axios");

export function openGoogleMaps() {
  // Replace '1600 Amphitheatre Parkway, Mountain View, CA' with your desired address
  const address = "1600 Amphitheatre Parkway, Mountain View, CA";

  // Encode the address for the URL
  const encodedAddress = encodeURIComponent(address);
  getLatLngFromAddress(address);

  // Construct the Google Maps URL
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;

  // Open the URL in a new tab or window
  window.open(googleMapsUrl, "_blank");
}
export const getLatLngFromAddress = async (address) => {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        address
      )}&key=${process.env.API_KEY}`
    );

    if (response.data.results.length > 0) {
      const { lat, lng } = response.data.results[0].geometry.location;
      return { lat, lng };
    } else {
      console.error("No results found for the given address");
      return null;
    }
  } catch (error) {
    console.error("Error fetching data from Google Maps API:", error.message);
    return null;
  }
};
