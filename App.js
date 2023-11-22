import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import Home from "./src/Screens/Home";
import Header from "./src/Components/Header";

export default function App() {
  return (
    <View className="mt-10 px-4 bg-white">
      <Header />
      <Home />
      <StatusBar backgroundColor="white" style="auto" />
    </View>
  );
}
