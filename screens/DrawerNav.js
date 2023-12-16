import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { View, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";

import Home from "./Home";
import "react-native-gesture-handler";
import DrawerContents from "../components/DrawerContents";
const DrawerNav = () => {
  const Drawer = createDrawerNavigator();

  const renderHeaderRight = () => (
    <View
      style={{ flexDirection: "row", alignItems: "center", marginRight: 6 }}>
      <TouchableOpacity className="mr-4">
        <FontAwesomeIcon name="bell" size={20} color="white" />
      </TouchableOpacity>
      <Image
        source={require("../images/driver.jpg")} // Replace with the path to your profile image
        style={{ width: 30, height: 30, borderRadius: 15, marginRight: 8 }}
      />

      {/* Add any other profile-related components or actions here */}
    </View>
  );

  return (
    <Drawer.Navigator drawerContent={(props) => <DrawerContents {...props} />}>
      <Drawer.Screen
        name="mainpage"
        component={Home}
        options={{
          title: "", // Hide the title
          headerStyle: {
            backgroundColor: "green",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },

          headerRight: renderHeaderRight,
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNav;
