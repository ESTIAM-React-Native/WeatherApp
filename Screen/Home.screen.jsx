import React from "react";
import Days from "../Components/Days";
import Information from "../Components/Information";
import { View } from "react-native";
import OptionBar from "../Components/OptionBar";

function HomeScreen() {
  return (
    <View>
      <OptionBar />
      <Information />
      <Days />
    </View>
  );
}

export default HomeScreen;
