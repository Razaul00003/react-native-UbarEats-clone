import { SafeAreaView, Text, View } from "react-native";
import React from "react";
import HeaderTabs from "../components/HeaderTabs";
import SearchBar from "../components/SearchBar";
import Categories from "../components/Categories";

const Home = () => {
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
        <SearchBar />
      </View>
      <Categories />
    </SafeAreaView>
  );
};

export default Home;
