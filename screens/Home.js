import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Entypo from "@expo/vector-icons/Entypo";

import Buys from "./Buys";
import SellDetails from "./SellDetails";
import SocialMedia from "./SocialMedia";
import Experts from "./Experts";
import ExpertChats from "./ExpertChats";
import BuyRoute from "../Routes/BuyRoute";
import SocialMediaRoute from "../Routes/SocialMediaRoute";
import ExpertRoute from "../Routes/ExpertRoute";
import SellerRoute from "../Routes/SellRoute";
import { faL } from "@fortawesome/free-solid-svg-icons";

const CustomTitleComponent = () => {
  return (
    <View
      style={{ flexDirection: "row", alignItems: "center", marginRight: 24 }}>
      <View className="w-full">
        <Text style={{ color: "#fff", fontWeight: "bold", marginRight: 5 }}>
          Farm Tools & Materials
        </Text>
      </View>
      <View>
        <View className=" w-full mr-4">
          <TouchableOpacity>
            <FontAwesomeIcon name="shopping-cart" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const Home = ({ navigate }) => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      // screenOptions={({ route }) => ({
      //   activeTintColor: "green", // Change the color when the tab is active
      //   inactiveTintColor: "gray", // Change the color when the tab is inactive
      //   tabBarIcon: ({ color, size }) => {
      //     let iconComponent;

      //     if (route.name === "Buy") {
      //       iconComponent = (
      //         <FontAwesomeIcon name="shopping-cart" size={24} color={color} />
      //       );
      //     } else if (route.name === "sell") {
      //       iconComponent = (
      //         <FontAwesomeIcon name="tag" size={24} color={color} />
      //       );
      //     } else if (route.name === "media") {
      //       iconComponent = (
      //         <FontAwesomeIcon name="slideshare" size={24} color={color} />
      //       );
      //     } else if (route.name === "Experts") {
      //       iconComponent = (
      //         <Entypo name="help-with-circle" size={24} color={color} />
      //       );
      //     }

      //     return iconComponent;
      //   },
      // })}

      screenOptions={({ route }) => ({
        headerTitle: "",
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: "#5d1425",
        },
        headerTintColor: "#fff",
        textAlign: "left",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          display: "flex",
          position: "absolute",
          bottom: 20,
          left: 25,
          right: 25,
          elevation: 5,
          backgroundColor: "green",
          borderRadius: 15,
          height: 72,
        },

        tabBarShowLabel: false,
        headerShown: false,
      })}>
      <Tab.Screen
        name="Buy"
        component={BuyRoute}
        options={{
          headerTitle: (props) => <CustomTitleComponent {...props} />,
          headerTitleAlign: "left",
          headerStyle: {
            backgroundColor: "green",
          },
          headerTintColor: "#fff",
          textAlign: "left",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                top: Platform.OS === "ios" ? 10 : 0,
              }}>
              <View
                style={[
                  {
                    padding: 6,

                    borderRadius: 12,
                    borderWidth: 2,
                    borderColor: focused ? "transparent" : "transparent",
                    backgroundColor: focused ? "white" : "green",
                  },
                  focused ? {} : { borderWidth: 0 }, // If not focused, remove the border
                ]}>
                <FontAwesomeIcon
                  name="shopping-cart"
                  size={24}
                  color={focused ? "green" : "white"}
                />
              </View>
            </View>
          ),
          tabBarShowLabel: false,
        }}
      />
      <Tab.Screen
        name="sell"
        component={SellerRoute}
        options={{
          title: "Grow Your Agro Products",
          headerTitleAlign: "left",
          headerStyle: {
            backgroundColor: "green",
          },
          headerTintColor: "#fff",
          textAlign: "left",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                top: Platform.OS === "ios" ? 10 : 0,
              }}>
              <View
                style={[
                  {
                    padding: 6,

                    borderRadius: 12,
                    borderWidth: 2,
                    borderColor: focused ? "transparent" : "transparent",
                    backgroundColor: focused ? "white" : "green",
                  },
                  focused ? {} : { borderWidth: 0 }, // If not focused, remove the border
                ]}>
                <FontAwesomeIcon
                  name="tag"
                  size={24}
                  color={focused ? "green" : "white"}
                />
              </View>
            </View>
          ),
          tabBarLabel: () => null,
          tabBarShowLabel: false,
          tabBarBadge: 5,
        }}
      />
      <Tab.Screen
        name="media"
        component={SocialMediaRoute}
        options={{
          title: "Share your Ideas",
          headerTitleAlign: "left",
          headerStyle: {
            backgroundColor: "green",
          },
          headerTintColor: "#fff",
          textAlign: "left",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                top: Platform.OS === "ios" ? 10 : 0,
              }}>
              <View
                style={[
                  {
                    padding: 6,

                    borderRadius: 12,
                    borderWidth: 2,
                    borderColor: focused ? "transparent" : "transparent",
                    backgroundColor: focused ? "white" : "green",
                  },
                  focused ? {} : { borderWidth: 0 }, // If not focused, remove the border
                ]}>
                <FontAwesomeIcon
                  name="slideshare"
                  size={24}
                  color={focused ? "green" : "white"}
                />
              </View>
            </View>
          ),
          tabBarLabel: () => null,
          tabBarShowLabel: false,
          tabBarBadge: 2,
        }}
      />

      <Tab.Screen
        name="Experts"
        component={ExpertRoute}
        options={{
          title: "Get Helped",
          headerTitleAlign: "left",
          headerStyle: {
            backgroundColor: "green",
          },
          headerTintColor: "#fff",
          textAlign: "left",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                top: Platform.OS === "ios" ? 10 : 0,
              }}>
              <View
                style={[
                  {
                    padding: 6,

                    borderRadius: 12,
                    borderWidth: 2,
                    borderColor: focused ? "transparent" : "transparent",
                    backgroundColor: focused ? "white" : "green",
                  },
                  focused ? {} : { borderWidth: 0 }, // If not focused, remove the border
                ]}>
                <Entypo
                  name="help-with-circle"
                  size={24}
                  color={focused ? "green" : "white"}
                />
              </View>
            </View>
          ),
          tabBarLabel: () => null,
          tabBarShowLabel: false,
          headerShown: false,
          tabBarBadge: 3,
        }}
      />
    </Tab.Navigator>
  );
};

export default Home;
