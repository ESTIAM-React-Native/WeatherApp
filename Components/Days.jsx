import React from "react";
import { StyleSheet, Text, View } from "react-native";

function Days() {
  return (
    <View style={stylesheet.rectangle}>
      <View style={stylesheet.dateContainer}>
        <Text style={stylesheet.dateName}>Lundi</Text>
        <Text style={stylesheet.dateName}>Mardi</Text>
        <Text style={stylesheet.dateName}>Mercredi</Text>
      </View>
      <View style={stylesheet.dateContainer}>
        <Text style={stylesheet.dateNumber}>13°</Text>
        <Text style={stylesheet.dateNumber}>14°</Text>
        <Text style={stylesheet.dateNumber}>15°</Text>
      </View>
    </View>
  );
}

const stylesheet = StyleSheet.create({
  rectangle: {
    width: 229,
    height: 123,
    flexShrink: 0,
    borderRadius: 5,
    backgroundColor: "rgba(123, 122, 172, 0.6117647290229797)",
    display: "flex",
    flexDirection: "row",
  },
  dateContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  dateName: {
    color: "rgba(255, 255, 255, 1)",
    fontSize: 18,
    fontStyle: "normal",
    fontWeight: "600",
  },
  dateNumber: {
    color: "rgba(255, 255, 255, 1)",
    fontSize: 18,
    fontStyle: "normal",
    fontWeight: "600",
    width: 100,
    textAlign: "center",
  },
});

export default Days;
