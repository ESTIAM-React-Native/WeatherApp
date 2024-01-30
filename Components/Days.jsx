import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import axios from "axios";

function Days({ cityName }) {
  const apiKey = "1be727ee596eb0e6cdbea09cafc4c416";

  const [forecastData, setForecastData] = useState(null);

  const fetchForecastData = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric`
      );

      if (response.status === 200) {
        const forecastData = response.data;
        setForecastData(forecastData);
      } else {
        throw new Error(
          "Échec de la requête vers l'API OpenWeatherMap pour les prévisions"
        );
      }
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des données de prévisions météorologiques :",
        error
      );
      setForecastData(null);
    }
  };

  useEffect(() => {
    // Charger les prévisions météorologiques pour demain au chargement de l'application
    fetchForecastData();
  }, [cityName]);

  const getDatesAndTemperatures = () => {
    if (forecastData) {
      const forecasts = forecastData.list;
      const datesAndTemperatures = [];

      // Filtrer les prévisions pour les 3 prochains jours
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);

      let dayCounter = 0;
      for (let i = 0; i < forecasts.length; i++) {
        const forecast = forecasts[i];
        const forecastDate = new Date(forecast.dt * 1000);

        // Vérifiez si la date de prévision correspond au jour suivant
        if (forecastDate.getDate() === tomorrow.getDate()) {
          datesAndTemperatures.push({
            date: forecastDate.toLocaleDateString(),
            temperature: forecast.main.temp,
          });

          tomorrow.setDate(tomorrow.getDate() + 1);
          dayCounter++;

          // Arrêtez la boucle après avoir obtenu les prévisions pour les 3 prochains jours
          if (dayCounter === 3) {
            break;
          }
        }
      }

      return datesAndTemperatures;
    }

    return [];
  };

  const datesAndTemperatures = getDatesAndTemperatures();

  return (
    <View style={styles.container}>
      <Text>Météo des 3 prochains jours :</Text>
      {datesAndTemperatures.map((item, index) => (
        <View key={index}>
          <Text>Date : {item.date}</Text>
          <Text>Température : {item.temperature} °C</Text>
        </View>
      ))}
      {datesAndTemperatures.length === 0 && (
        <Text>
          Aucune donnée de prévision météorologique disponible pour les 3
          prochains jours.
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  rectangle: {
    width: 229,
    height: 123,
    flexShrink: 0,
    borderRadius: 5,
    backgroundColor: "rgba(123, 122, 172, 0.6117647290229797)",
    display: "flex",
    flexDirection: "row",
  },
});

export default Days;
