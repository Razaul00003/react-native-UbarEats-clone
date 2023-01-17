import { View, Text, SafeAreaView, ScrollView } from "react-native";
import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import LottieView from "lottie-react-native";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import db from "../firebase";
import { async } from "@firebase/util";
import MenuItem from "../components/restaurantDetail/MenuItems";

const OrderCompleted = () => {
  const [lastOrder, selectedOrder] = useState({
    items: [
      {
        title: "Lasagna",
        description: "With butter lettuce, tomato and sauce bechamel",
        price: "$13.50",
        image:
          "https://www.modernhoney.com/wp-content/uploads/2019/08/Classic-Lasagna-14-scaled.jpg",
      },
    ],
  });
  const { items, restaurantName } = useSelector(
    (state) => state.cartReducer.selectedItems
  );

  const total = items
    .map((item) => Number(item.price.replace("$", "")))
    .reduce((prev, curr) => prev + curr, 0);
  const totalUSD = total.toLocaleString("en", {
    style: "currency",
    currency: "USD",
  });

  const getDatafromFirestore = async () => {
    const querySnapshot = await getDocs(collection(db, "orders"));
    querySnapshot.docs.map((doc) => selectedOrder(doc.data()));
  };

  useEffect(() => {
    getDatafromFirestore();
  }, []);

  return (
    <SafeAreaView style={{ flexGrow: 1, backgroundColor: "white" }}>
      <View style={{ margin: 15, alignItems: "center", height: "100%" }}>
        <LottieView
          autoPlay
          speed={0.5}
          loop={false}
          style={{ height: 100, alignSelf: "center", marginBottom: 30 }}
          source={require("../assets/animations/check-mark.json")}
        />
        <View
          style={{ margin: 10, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 20 }}>
            Your order for at {restaurantName} for ${totalUSD} placed
            successfully
          </Text>
        </View>
        <ScrollView>
          <MenuItem foods={lastOrder.items} hideCheckbox={true} />
          <LottieView
            autoPlay
            speed={0.5}
            loop={true}
            style={{ height: 100, alignSelf: "center", marginBottom: 80 }}
            source={require("../assets/animations/cooking.json")}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default OrderCompleted;
