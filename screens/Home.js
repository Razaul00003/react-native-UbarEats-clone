import { SafeAreaView, ScrollView, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import HeaderTabs from "../components/HeaderTabs";
import SearchBar from "../components/SearchBar";
import Categories from "../components/Categories";
import RestaurantItems, {
  localRestaurants,
} from "../components/RestaurantItems";
import { YELP_API } from "@env";
const YELP_API_KEY = YELP_API;

const Home = () => {
  const [restaurantData, setRestaurantData] = useState(localRestaurants);
  const [city, setCity] = useState("San Francisco");

  const getRestaurantsFromYelp = async () => {
    const yelpUrl = `https://api.yelp.com/v3/businesses/search?term=restaurants&location=${city}`;

    const apiOptions = {
      headers: {
        Authorization: `Bearer ${YELP_API_KEY}`,
      },
    };

    return await fetch(yelpUrl, apiOptions)
      .then((res) => res.json())
      .then((json) => setRestaurantData(json.businesses));
  };

  useEffect(() => {
    getRestaurantsFromYelp();
  }, [city]);

  return (
    <SafeAreaView style={{ backgroundColor: "#eee", height: "100%" }}>
      <View
        style={{
          width: "100%",
          backgroundColor: "white",
          padding: 15,
        }}
      >
        <HeaderTabs />
        <SearchBar cityHandler={setCity} />
      </View>
      <ScrollView showsHorizontalScrollIndicator={false}>
        <Categories />
        <RestaurantItems restaurantData={restaurantData} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
