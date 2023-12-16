import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import {
  TextInput,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";

import Store from "../components/Store";
import SellerStore from "../components/SellerStore";

const SellDetails = () => {
  const [searchActive, SetSearchActive] = useState(false);

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };
  return (
    <TouchableWithoutFeedback
      onPress={dismissKeyboard}
      className="w-full h-full">
      <View className="flex-row justify-between">
        <View
          className={
            searchActive
              ? "mt-2 ml-2  bg-gray-50 flex-row items-center justify-start border-gray-300 border-2 rounded-md"
              : "my-2 ml-2  bg-gray-50 flex-row items-center justify-start"
          }>
          <View
            className={
              searchActive ? "border-r-1 border-gray-400 px-1" : "px-1 my-4 "
            }>
            <TouchableOpacity
              onPress={() => {
                console.log(searchActive);
              }}>
              <FontAwesomeIcon
                name="search"
                size={searchActive ? 20 : 24}
                color={searchActive ? "green" : "gray"}
              />
            </TouchableOpacity>
          </View>
          <TextInput
            placeholder="Search"
            className={
              searchActive ? "mx-2 w-5/6 py-3 px-2 text-gray-800" : "w-0"
            }
          />
        </View>

        <TouchableOpacity>
          <Text>Sell Product</Text>
        </TouchableOpacity>
      </View>
      <View className="mt-4 ">
        <SellerStore />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({});

export default SellDetails;
