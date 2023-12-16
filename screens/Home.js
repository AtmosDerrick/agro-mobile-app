import React from "react";
import { View, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import IonIcon from "react-native-vector-icons/Ionicons";

import Entypo from "@expo/vector-icons/Entypo";

import Buys from "./Buys";

const Home = ({ navigate }) => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "Buy") {
            return (
              <FontAwesomeIcon name="shopping-cart" size={24} color="green" />
            );
          } else if (route.name === "sell") {
            return <MaterialIcons name="money" size={24} color="green" />;
          } else if (route.name === "Deliveries") {
            return <FontAwesomeIcon name="book" size={24} color="green" />;
          } else if (route.name === "Map") {
            return <Icon name="message" size={24} color="green" />;
          }
        },
      })}>
      <Tab.Screen
        name="Buy"
        component={Buys}
        options={{
          title: "Farm Tools & Materials",

          headerTitleAlign: "left",
          headerStyle: {
            backgroundColor: "green",
          },
          headerTintColor: "#fff",
          textAlign: "left",

          headerTitleStyle: {
            fontWeight: "bold",
          },
          tabBarLabel: () => null, // Set tabBarLabel to a function that returns null
          tabBarShowLabel: false,
        }}
      />
      <Tab.Screen name="sell" component={Buys} />
      <Tab.Screen name="Deliveries" component={Buys} />
      <Tab.Screen name="Map" component={Buys} />
    </Tab.Navigator>
  );
};

export default Home;
