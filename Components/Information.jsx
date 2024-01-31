import React, { useEffect, useState } from "react";
import { Button, Image, StyleSheet, Text, TextInput, View } from "react-native";
import axios from "axios";
import Days from "./Days";
import * as Location from 'expo-location';

function Information() {
  const apiKey = "1be727ee596eb0e6cdbea09cafc4c416";

  const [units, setUnits] = useState("metric");
  const [cityName, setCityName] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  const fetchWeatherData = async (lat, lon) => {
    try {
      const url = lat && lon
        ? `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`
        : `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${units}`;

      const response = await axios.get(url);

      if (response.status === 200) {
        setWeatherData(response.data);
      } else {
        throw new Error("Échec de la requête vers l'API OpenWeatherMap");
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des données météorologiques :", error);
      setWeatherData(null);
    }
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      fetchWeatherData(location.coords.latitude, location.coords.longitude);
    })();
  }, [units]);

  const handleSearch = () => {
    if (cityName.trim() !== "") {
      fetchWeatherData(null, null);
    }
  };

  const toggleUnits = () => {
    setUnits((prevUnits) => (prevUnits === "metric" ? "imperial" : "metric"));
  };

  const getWeatherImage = (description) => {
    switch (description) {
      case "clear sky":
        return require("../assets/logoMeteo/sun.gif");
      case "few clouds":
        return require("../assets/logoMeteo/cloudy.gif");
      case "scattered clouds":
      case "broken clouds":
        return require("../assets/logoMeteo/nuageux.gif");
      case "shower rain":
      case "rain":
        return require("../assets/logoMeteo/pluie.gif");
      case "thunderstorm":
        return require("../assets/logoMeteo/eclaire.gif");
      case "snow":
        return require("../assets/logoMeteo/snow.gif");
      case "mist":
        return require("../assets/logoMeteo/nuageux.gif");
      default:
        return require("../assets/logoMeteo/cloudy.gif");
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Changer d'unités" onPress={toggleUnits} />
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Nom de la ville"
          value={cityName}
          onChangeText={(text) => setCityName(text)}
          style={styles.textInput}
        />
        <Button title="Rechercher" onPress={handleSearch} />
      </View>

      {weatherData ? (
        <View>
          <Text>Ville : {weatherData.name}</Text>
          <Text>
            Température actuelle : {weatherData.main.temp}{" "}
            {units === "metric" ? "°C" : "°F"}
          </Text>
          <Text>Humidité actuelle : {weatherData.main.humidity} %</Text>
          <Text>Description : {weatherData.weather[0].description}</Text>
          <Image
            source={getWeatherImage(weatherData.weather[0].description)}
            style={{ width: 100, height: 100 }}
          />
        </View>
      ) : (
        <Text>Aucune donnée météorologique disponible.</Text>
      )}
      <Days cityName={weatherData ? weatherData.name : ""} units={units} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 0,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  textInput: {
    flex: 1,
    marginRight: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
  },
});

export default Information;
