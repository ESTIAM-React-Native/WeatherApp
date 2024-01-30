import React, { useEffect, useState } from "react";
import { Button, Image, StyleSheet, Text, TextInput, View } from "react-native";
import axios from "axios";
import Days from "./Days";

function Information() {
  const apiKey = "1be727ee596eb0e6cdbea09cafc4c416";

  const [cityName, setCityName] = useState(""); // État pour stocker le nom de la ville
  const [weatherData, setWeatherData] = useState(null);

  const fetchWeatherData = async (cityName) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`
      );

      if (response.status === 200) {
        const weatherData = response.data;
        setWeatherData(weatherData);
      } else {
        throw new Error("Échec de la requête vers l'API OpenWeatherMap");
      }
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des données météorologiques :",
        error
      );
      setWeatherData(null);
    }
  };

  const handleSearch = () => {
    if (cityName.trim() !== "") {
      fetchWeatherData(cityName);
    }
  };

  useEffect(() => {
    // Charger les données initiales pour une ville par défaut au chargement de l'application
    fetchWeatherData("Paris");
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Nom de la ville"
          value={cityName}
          onChangeText={(text) => setCityName(text)}
          style={styles.textInput}
        />
        <Button title="Rechercher" onPress={handleSearch} />
        <Image source={require("../assets/rechercher.png")} style={{width: 40, height: 40}}></Image>
      </View>

      {weatherData ? (
        <View>
          <Text>Ville : {weatherData.name}</Text>
          <Text>Température actuelle : {weatherData.main.temp} °C</Text>
          <Text>Humidité actuelle : {weatherData.main.humidity} %</Text>
          <Text>Description : {weatherData.weather[0].description}</Text>
        </View>
      ) : (
        <Text>Aucune donnée météorologique disponible.</Text>
      )}
      <Image source={require("../assets/logoMeteo/pluie.gif")} style={{width: 100, height: 100}}></Image>
      <Days cityName={cityName}/>
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
