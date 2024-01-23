import React from "react";
import { View, StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SellDetails from "../screens/SellDetails";
import SellerStore from "../components/SellerStore";
import Order from "../screens/Order";

const SellerRoute = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="product"
        component={SellDetails}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="orders"
        component={Order}
        options={{ title: "Product Engagements" }}
      />
    </Stack.Navigator>
  );
};

export default SellerRoute;
