import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native";
import ReactNavigation from "./navigation";
import Home from "./screens/Home";
import RestaurantDetail from "./screens/RestaurantDetail";

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <ReactNavigation />
    </>
  );
}
