import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const BottomTabs = () => {
  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: "white",
        justifyContent: "space-between",
        width: "auto",
        paddingHorizontal: 10,
        paddingTop: 10,
        borderTopColor: "#eee",
        borderTopWidth: 5,
      }}
    >
      <Icon icon="home" text="Home" />
      <Icon icon="search" text="Browse" />
      <Icon icon="shopping-bag" text="Grocery" />
      <Icon icon="receipt" text="Orders" />
      <Icon icon="user" text="Account" />
    </View>
  );
};

export default BottomTabs;

const Icon = (props) => (
  <TouchableOpacity>
    <View>
      <FontAwesome5
        name={props.icon}
        size={25}
        style={{
          marginBottom: 3,
          alignSelf: "center",
        }}
      />
      <Text>{props.text}</Text>
    </View>
  </TouchableOpacity>
);
