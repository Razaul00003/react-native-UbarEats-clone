import { View, Text, TouchableOpacity, Modal } from "react-native";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { StyleSheet } from "react-native";
import OrderItem from "./OrderItem";
import db from "../../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const ViewCart = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
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

  const adOrderToFireBase = async () => {
    //adding to db
    try {
      setLoading(true);
      const docRef = await addDoc(collection(db, "orders"), {
        items,
        restaurantName,
        createdAt: serverTimestamp(),
      });
      setLoading(false);
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    setModalVisible(false);
    navigation.navigate("OrderCompleted");
  };

  const styles = StyleSheet.create({
    modalContainer: {
      flexGrow: 1,
      justifyContent: "flex-end",
      backgroundColor: "rgba(0,0,0,0.7)",
    },
    mocalCheckoutContainer: {
      backgroundColor: "white",
      padding: 16,
      height: 500,
      borderWidth: 1,
    },
    restaurantName: {
      textAlign: "center",
      fontWeight: "600",
      fontSize: 18,
      marginBottom: 10,
    },
    subtotalContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 15,
    },
    subtotalText: {
      textAlign: "left",
      fontWeight: "600",
      fontSize: 15,
      marginBottom: 10,
    },
  });

  const checkOutModalContent = () => {
    return (
      <>
        <View style={styles.modalContainer}>
          <View style={styles.mocalCheckoutContainer}>
            <Text style={styles.restaurantName}>{restaurantName}</Text>
            {items.map((item, index) => (
              <OrderItem key={index} item={item} />
            ))}
            <View style={styles.subtotalContainer}>
              <Text style={styles.subtotalText}>Subtotal</Text>
              <Text>{totalUSD}</Text>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <TouchableOpacity
                style={{
                  marginTop: 20,
                  backgroundColor: "black",
                  padding: 13,
                  borderRadius: 30,
                  width: 300,
                  flexDirection: "row",
                  justifyContent: "space-around",
                  position: "relative",
                  alignItems: "center",
                }}
                onPress={() => adOrderToFireBase()}
              >
                <Text style={{ color: "white", fontSize: 20 }}>Check Out</Text>
                <Text style={{ color: "white", fontSize: 20 }}>
                  ${totalUSD}
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{ textAlign: "center", alignItems: "center", padding: 30 }}
            >
              {loading && (
                <Text style={{ colo: "black", fontSize: 20 }}>
                  Adding to database...
                </Text>
              )}
            </View>
          </View>
        </View>
      </>
    );
  };
  return (
    <>
      <Modal
        animationType="slide"
        visible={modalVisible}
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        {checkOutModalContent()}
      </Modal>
      <>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            position: "absolute",
            bottom: 140,
            zIndex: 999,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <TouchableOpacity
              style={{
                marginTop: 20,
                backgroundColor: "black",
                alignItems: "center",
                padding: 15,
                borderRadius: 30,
                width: 300,
                position: "relative",
                justifyContent: "space-around",
                flexDirection: "row",
              }}
              onPress={() => setModalVisible(true)}
            >
              <Text style={{ color: "white", fontSize: 20, marginRight: 30 }}>
                View Cart
              </Text>
              <Text style={{ color: "white", fontSize: 20 }}>${totalUSD}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </>
    </>
  );
};

export default ViewCart;
