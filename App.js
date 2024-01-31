import { StyleSheet, Text, View } from "react-native";
import HomeScreen from "./Screen/Home.screen";

export default function App() {
  return <HomeScreen></HomeScreen>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
