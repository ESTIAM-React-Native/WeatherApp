import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import axios from "axios";

function Information() {
  const [weatherData, setWeatherData] = useState(null);

  const apiKey = "1be727ee596eb0e6cdbea09cafc4c416";

  const fetchWeatherData = async (cityName) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`
      );

      if (response.status === 200) {
        // Les données météorologiques sont dans response.data
        const weatherData = response.data;
        return weatherData;
      } else {
        throw new Error("Échec de la requête vers l'API OpenWeatherMap");
      }
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des données météorologiques :",
        error
      );
      throw error;
    }
  };

  useEffect(() => {
    fetchWeatherData("Paris").then((data) => {
      setWeatherData(data);
    });
  }, []);

  return (
    <View>
      <Text>Ville</Text>
      <Text>Temperature</Text>
      <Text>Humidité</Text>
      <Text>Image temperature</Text>
      {weatherData ? (
        <Text>Température : {weatherData.main.temp}°F</Text>
      ) : (
        <Text>Chargement en cours...</Text>
      )}
    </View>
  );
}

export default Information;
