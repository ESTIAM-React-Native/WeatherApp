import React from "react";
import Information from "../Components/Information";
import { View, StyleSheet, Styles } from "react-native";

function HomeScreen() {
  return (
    <View style={styles.container}>
      <Information />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightblue',
  },
});

export default HomeScreen;