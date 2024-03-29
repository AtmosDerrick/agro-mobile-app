import React, { useContext, useEffect, useState } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { View, TouchableOpacity, Image, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";

import { database } from "../firebase.config";

import Home from "./Home";
import "react-native-gesture-handler";
import DrawerContents from "../components/DrawerContents";
import { UserContext } from "../ContextApi/Context";
import { getDatabase, ref, child, get } from "firebase/database";
const DrawerNav = () => {
  const Drawer = createDrawerNavigator();
  const { setUser, user, setUserInfo, userInfo } = useContext(UserContext);
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    if (user) {
      const username = user.email.split("@")[0];
      console.log(username, "username");
      const dbRef = ref(getDatabase());
      get(child(dbRef, `users/${username}`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            setUserDetails(snapshot.val());
            setUserInfo(snapshot.val());
          } else {
            console.log("No data available");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [user]);

  const renderHeaderRight = () => (
    <View
      style={{ flexDirection: "row", alignItems: "center", marginRight: 6 }}>
      <View className="w-full">
        <Text className=" font-bold text-base uppercase text-white drop-shadow-md">
          AgriCon
        </Text>
      </View>
      <TouchableOpacity className="mr-4">
        <FontAwesomeIcon name="bell" size={20} color="white" />
      </TouchableOpacity>
      <Image
        source={{ uri: userDetails.profileImage }} // Replace with the path to your profile image
        style={{ width: 30, height: 30, borderRadius: 15, marginRight: 8 }}
      />

      {/* Add any other profile-related components or actions here */}
    </View>
  );

  return (
    <Drawer.Navigator
      drawerContent={(props) => (
        <DrawerContents {...props} screenOptions={{ drawerType: "front" }} />
      )}>
      <Drawer.Screen
        name="mainpage"
        component={Home}
        options={{
          title: "", // Hide the title
          headerStyle: {
            backgroundColor: "green",
            borderWidth: 0,
            elevation: 0,
            shadowOpacity: 0,
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
