import React, { useEffect, useState } from "react";
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import axios from "axios";
import Days from "./Days";
import * as Location from "expo-location";

function Information() {
  const apiKey = "1be727ee596eb0e6cdbea09cafc4c416";

  const [units, setUnits] = useState("metric");
  const [cityName, setCityName] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  const fetchWeatherData = async (lat, lon) => {
    try {
      const url =
        lat && lon
          ? `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`
          : `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${units}`;

      const response = await axios.get(url);

      if (response.status === 200) {
        setWeatherData(response.data);
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

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission to access location was denied");
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
    <View>
      <View style={styles.container_research}>
        <View style={styles.container_research_input}>
          <TextInput
            placeholder="Nom de la ville"
            value={cityName}
            onChangeText={(text) => setCityName(text)}
            style={styles.textInput}
          />
        </View>
        <View style={styles.container_research_button}>
          <TouchableOpacity onPress={handleSearch}>
            <Image
              source={require("../assets/rechercher.png")}
              style={{ width: 35, height: 35, marginRight: 10, marginLeft: -5 }}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={toggleUnits}>
          <Image
            source={require("../assets/celsius.png")}
            style={{ width: 35, height: 35, marginRight: 10, marginLeft: -5 }}
          />
        </TouchableOpacity>
      </View>

      {weatherData ? (
        <View style={styles.weatherContainer}>
          <Text style={styles.weather_name}>{weatherData.name}</Text>
          <Text style={styles.metric}>
            {weatherData.main.temp} {units === "metric" ? "°C" : "°F"}
          </Text>
          <View style={styles.contain_humidity}>
            <View style={styles.humidity_image}>
              <Image
                source={require("../assets/eau.png")}
                style={{ width: 20, height: 20, marginRight: 5, marginLeft: 7 }}
              />
            </View>
            <View style={styles.humidity_pourcentage}>
              <Text style={styles.pourcentage}>
                {weatherData.main.humidity} %
              </Text>
            </View>
          </View>

          <View style={styles.img_weather}>
            <Image
              source={getWeatherImage(weatherData.weather[0].description)}
              style={{ width: 200, height: 200, marginTop: 20 }}
            />
          </View>
        </View>
      ) : (
        <Text>Aucune donnée météorologique disponible.</Text>
      )}

      <View style={styles.container_days}>
        <Days cityName={weatherData ? weatherData.name : ""} units={units} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container_research: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100,
  },
  container_research_input: {
    flex: 1,
    marginRight: 10,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 8,
    flex: 1,
    marginLeft: 5,
    backgroundColor: "white",
  },
  button_research: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    marginRight: 4,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  weather_name: {
    fontSize: 30,
    color: "white",
    marginLeft: 7,
    marginTop: 15,
  },
  metric: {
    fontSize: 50,
    color: "white",
    marginLeft: 6,
  },
  contain_humidity: {
    flexDirection: "row",
  },
  pourcentage: {
    color: "white",
  },
  img_weather: {
    alignItems: "center",
  },
  container_days: {
    backgroundColor: "#798FDD",
    marginRight: 10,
    marginLeft: 10,
    borderRadius: 5,
    marginTop: 60,
    padding: 10,
  },
});

export default Information;
