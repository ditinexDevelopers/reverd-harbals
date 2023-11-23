import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import Home from "./src/Screens/Home";
import Header from "./src/Components/Header";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProductDetails from "./src/Screens/ProductDetails";
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ animation: "none" }}>
        <Stack.Screen
          options={{ headerShown: false }}
          name="home"
          component={Home}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="productDetails"
          component={ProductDetails}
        />
      </Stack.Navigator>
      <StatusBar backgroundColor="white" style="auto" />
    </NavigationContainer>
    // <View className="mt-10 px-4 bg-white">
    //   <Header />
    //   <Home />
    // </View>
  );
}
