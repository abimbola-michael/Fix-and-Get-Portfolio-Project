import { useState } from "react";

export function useLocation() {
  const [location, setLocation] = useState({});
  const [error, setError] = useState(null);
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
      },
      (err) => {
        setError(`Error getting location: ${err.message}`);
      }
    );
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
  return { location, setLocation, error, setError };
}
