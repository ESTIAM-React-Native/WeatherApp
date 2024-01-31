import { React, useEffect, useState } from "react";
import Geolocation from "@react-native-community/geolocation";

const Geolocation = () => {
  const [position, setPosition] = useState({
    latitude: null,
    longitude: null,
    error: null,
  });

  useEffect(() => {
    Geolocation.getCurrentPosition(
      (position) => {
        setPosition({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
      },
      (error) => setPosition({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }, []);

  return (
    <React.Fragment>
      <Text>Latitude: {position.latitude}</Text>
      <Text>Longitude: {position.longitude}</Text>
      {position.error ? <Text>Error: {position.error}</Text> : null}
    </React.Fragment>
  );
};

export default Geolocation;
