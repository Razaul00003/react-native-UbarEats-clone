import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Pressable,
} from "react-native";
import React from "react";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useDispatch, useSelector } from "react-redux";

const MenuItem = ({ restaurantName, foods, hideCheckbox, marginLeft }) => {
  const dispatch = useDispatch();
  const selectItem = (item, checkboxValue) =>
    dispatch({
      type: "ADD_TO_CART",
      payload: {
        ...item,
        restaurantName: restaurantName,
        checkboxValue: checkboxValue,
      },
    });

  const cartItems = useSelector(
    (state) => state.cartReducer.selectedItems.items
  );
  const isFoodInCart = (food, cartItems) =>
    Boolean(cartItems.find((item) => item.title === food.title));

  const checkboxCheckHandler = (food, checkboxValue) => {
    selectItem(food, checkboxValue);
    console.log("checkbox clicked");
  };
  //return component
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {foods.map((food, index) => (
        <Pressable key={index}>
          <View style={{ borderBottomColor: "#eee", borderBottomWidth: 1 }}>
            <View style={styles.menuItemStyle}>
              {hideCheckbox ? (
                <></>
              ) : (
                <BouncyCheckbox
                  iconStyle={{ borderColor: "lightgray", borderRadius: 0 }}
                  fillColor="green"
                  isChecked={isFoodInCart(food, cartItems)}
                  onPress={(checkboxValue) =>
                    checkboxCheckHandler(food, checkboxValue)
                  }
                />
              )}
              <FoodInfo food={food} />
              <FoodImage food={food} marginLeft={marginLeft ? marginLeft : 0} />
            </View>
          </View>
        </Pressable>
      ))}
    </ScrollView>
  );
};

export default MenuItem;
const styles = StyleSheet.create({
  menuItemStyle: {
    flexDirection: "row",
    justifyContent: "center",
    margin: 10,
  },
  titleStyle: {
    fontSize: 19,
    fontWeight: "600",
  },
});

const FoodInfo = (props) => (
  <View style={{ width: 240, justifyContent: "space-evenly" }}>
    <Text style={styles.titleStyle}>{props.food.title}</Text>
    <Text>{props.food.description}</Text>
    <Text>{props.food.price}</Text>
  </View>
);

const FoodImage = (props) => (
  <View>
    <Image
      style={{
        width: 100,
        height: 100,
        borderRadius: 8,
        marginLeft: props.marginLeft,
      }}
      source={{
        uri: props.food.image,
      }}
    />
  </View>
);
