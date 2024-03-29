import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import axios from "axios";

function Days({ cityName, units }) {
  const apiKey = "1be727ee596eb0e6cdbea09cafc4c416";

  const [forecastData, setForecastData] = useState(null);

  const fetchForecastData = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=${units}`
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
    fetchForecastData();
  }, [cityName, units]);

  const getDatesAndTemperatures = () => {
    if (forecastData) {
      const forecasts = forecastData.list;
      const datesAndTemperatures = [];
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);

      let dayCounter = 0;
      for (let i = 0; i < forecasts.length; i++) {
        const forecast = forecasts[i];
        const forecastDate = new Date(forecast.dt * 1000);

        if (forecastDate.getDate() === tomorrow.getDate()) {
          datesAndTemperatures.push({
            date: forecastDate.toLocaleDateString(),
            temperature: forecast.main.temp,
          });

          tomorrow.setDate(tomorrow.getDate() + 1);
          dayCounter++;

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
    <View>
      <Text style={styles.Trhee}>Météo des 3 prochains jours :</Text>
      {datesAndTemperatures.map((item, index) => (
        <View key={index} style={styles.horizontalContainer}>
          <Text style={styles.dateText}>{item.date}</Text>
          <Text style={styles.temperatureText}>
            Température : {item.temperature} {units === "metric" ? "°C" : "°F"}
          </Text>
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
  horizontalContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
    marginRight: 10,
    marginLeft: 10,
    marginTop: 10,
  },
  dateText: {
    marginRight: 8,
    color: "white",
  },
  temperatureText: {
    marginLeft: 8,
    color: "white",
  },
  Trhee: {
    color: "white",
    marginLeft: 8,
  },
});

export default Days;
