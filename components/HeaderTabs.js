import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";

export default function HeaderTabs() {
  const [activeTab, setActiveTab] = useState("Delivery");

  return (
    <View style={{ flexDirection: "row", marginTop: 40, alignSelf: "center" }}>
      <HeaderButton
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        text="Delivery"
      />
      <HeaderButton
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        text="Pickup"
      />
    </View>
  );
}

const HeaderButton = (props) => (
  <TouchableOpacity
    style={{
      paddingVertical: 6,
      paddingHorizontal: 16,
      borderRadius: 30,
      backgroundColor: props.activeTab === props.text ? "black" : "white",
    }}
    onPress={() => props.setActiveTab(props.text)}
  >
    <Text
      style={{
        color: props.activeTab === props.text ? "white" : "black",
        fontSize: 15,
        fontWeight: "900",
      }}
    >
      {props.text}
    </Text>
  </TouchableOpacity>
);
