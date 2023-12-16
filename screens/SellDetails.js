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
    <KeyboardAvoidingView onPress={dismissKeyboard} className="w-full h-full">
      <View className="flex-row justify-between ml-2 shadow-md">
        {
          // <View
          // className={
          //   searchActive
          //     ? "mt-2 ml-2   flex-row items-center justify-start border-gray-300 border-2 rounded-md"
          //     : "my-2 ml-2   flex-row items-center justify-start"
          // }>
          // <View
          //   className={
          //     searchActive ? "border-r-1 border-gray-400 px-1  " : "px-1 my-2 "
          //   }>
          //   <TouchableOpacity
          //     onPress={() => {
          //       SetSearchActive(!searchActive);
          //     }}>
          //     <View className=" ">
          //       <FontAwesomeIcon
          //         name="search"
          //         size={searchActive ? 20 : 24}
          //         color={"green"}
          //       />
          //     </View>
          //   </TouchableOpacity>
          // </View>
          // <TextInput
          //   placeholder="Search"
          //   className={
          //     searchActive ? "mx-2 w-4/6 py-3 px-2 text-gray-800" : "w-0"
          //   }
          // />
          // </View>
        }

        <TouchableOpacity
          className={
            searchActive
              ? "bg-green-500  px-4 flex-row justify-center items-center mt-2 rounded-full shadow-md "
              : "bg-green-500   flex-row justify-center items-center mt-2  rounded-md py-2 px-6 "
          }>
          {searchActive ? (
            ""
          ) : (
            <View className="flex-row justify-between items-center gap-2">
              <FontAwesomeIcon
                name="money"
                size={searchActive ? 20 : 24}
                color={"white"}
              />
              <Text>Order</Text>
            </View>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          className={
            searchActive
              ? "bg-green-500  px-4 flex-row justify-center items-center mt-2 mr-4 rounded-full shadow-md "
              : "bg-green-500   flex-row justify-center items-center mt-2 mr-4 rounded-md py-2 px-6 "
          }>
          {searchActive ? (
            <Text className="text-lg font-semibold text-white rounded-full ">
              +
            </Text>
          ) : (
            <View className="flex-row justify-between items-center gap-2">
              <FontAwesomeIcon
                name="shopping-cart"
                size={searchActive ? 20 : 24}
                color={"white"}
              />
              <Text>Sell Product</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
      <View className="mt-4 ">
        <SellerStore />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({});

export default SellDetails;
