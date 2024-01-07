import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ImageBackground,
} from "react-native";

const Welcome = ({ navigation }) => {
  
  return (
    <ImageBackground
      source={require("../images/welcome.jpg")}
      className="w-full h-full flex justify-between">
      <SafeAreaView className=" ">
        <View className="h-5/6">
          <Text className="text-center mt-8 text-2xl font-bold text-gray-900">
            Agro Solutions
          </Text>
        </View>

        <View className="w-full   flex justify-end">
          <TouchableOpacity
            className="relative mb-20   mx-2   bg-white py-4 shadow-md px-6 rounded-lg "
            onPress={() => {
              navigation.navigate("login");
            }}>
            <Text className="text-center font-semibold text-green-500 ">
              Let Get Started
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Welcome;
