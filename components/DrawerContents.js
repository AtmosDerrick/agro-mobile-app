import React from "react";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";
import { View, Image, Text, TouchableOpacity, Pressable } from "react-native";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";

import "react-native-gesture-handler";

const DrawerContents = ({ navigation }) => {
  return (
    <DrawerContentScrollView>
      <TouchableOpacity>
        <View className="ml-8">
          <Image
            source={require("../images/driver.jpg")}
            style={{ width: 50, height: 50, borderRadius: 25, marginRight: 16 }}
          />
          <View>
            <Text className="text-gray-900 font-semibold mt-4">
              Derrick Kpordugbe
            </Text>
            <Text className="text-sm text-gray-700">@derrick</Text>
          </View>
        </View>
      </TouchableOpacity>

      <View className="ml-8 mt-8">
        <View style={{ marginLeft: 8, marginTop: 8 }}>
          <Pressable
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "start",
              alignItems: "center",
              gap: "12",
            }}>
            <View>
              <FontAwesomeIcon name="user" size={24} color="green" />
            </View>
            <Text style={{ fontSize: 18 }} className="font-semibold">
              Profile
            </Text>
          </Pressable>
        </View>
        <View style={{ marginLeft: 8, marginTop: 24 }}>
          <Pressable
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "start",
              alignItems: "center",
              gap: "12",
            }}>
            <View>
              <FontAwesomeIcon name="bookmark" size={24} color="green" />
            </View>
            <Text style={{ fontSize: 18 }} className="font-semibold">
              BookMarks
            </Text>
          </Pressable>
        </View>
      </View>

      {/* Add more DrawerItem components for additional menu items */}
    </DrawerContentScrollView>
  );
};

export default DrawerContents;
