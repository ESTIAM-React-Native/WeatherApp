import React from "react";
// import Days from "../Components/Days";
import Information from "../Components/Information";
import { View, StyleSheet, Styles } from "react-native";
// import OptionBar from "../Components/OptionBar";

function HomeScreen() {
  return (
    <View style={styles.container}>
      {/* <OptionBar /> */}
      <Information />
      {/* <Days /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Utilisez flex: 1 pour que le composant occupe tout l'espace disponible
    backgroundColor: 'lightblue',
  },
});


export default HomeScreen;
