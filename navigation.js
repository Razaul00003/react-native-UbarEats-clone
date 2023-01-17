import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider as ReduxProvider } from "react-redux";

import React from "react";
import Home from "./screens/Home";
import RestaurantDetail from "./screens/RestaurantDetail";
import configureStore from "./redux/store";

const store = configureStore();

export default function ReactNavigation() {
  const Stack = createNativeStackNavigator();
  const screenOptions = {
    headerShown: true,
  };
  return (
    <ReduxProvider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" screenOptions={screenOptions}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="RestaurantDetail" component={RestaurantDetail} />
        </Stack.Navigator>
      </NavigationContainer>
    </ReduxProvider>
  );
}
