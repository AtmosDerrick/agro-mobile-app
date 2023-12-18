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
import ProductForm from "./Sell";
import Order from "./Order";

const SellDetails = () => {
  const [searchActive, SetSearchActive] = useState(false);
  const [menuClick, setMenuClick] = useState("products");
  const [activeMenu, setActiveMenu] = useState("products");

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };
  return (
    <KeyboardAvoidingView onPress={dismissKeyboard} className="w-full h-full">
      <View className="flex-row justify-between px-4  shadow-md gap-x-2 pb-4 mt-4">
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
            menuClick == "products"
              ? " shadow-md border-b-2 border-b-green-600 px-6"
              : "text-green-500 flex-row justify-center items-center mt-2 mr-4  px-2 "
          }
          onPress={() => {
            setMenuClick("products");
          }}>
          {searchActive ? (
            <Text className="text-lg font-semibold text-white rounded-full ">
              +
            </Text>
          ) : (
            <View className="flex-row justify-between items-center gap-2">
              <FontAwesomeIcon
                name="gift"
                size={searchActive ? 20 : 24}
                color={"green"}
              />
              <Text>Product</Text>
            </View>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          className={
            menuClick === "orders"
              ? "   shadow-md border-b-2 border-b-green-600 px-6"
              : "text-green-500   flex-row justify-center items-center mt-2  rounded-md px-6 "
          }
          onPress={() => {
            setMenuClick("orders");
          }}>
          {searchActive ? (
            ""
          ) : (
            <View className="flex-row justify-between items-center gap-2">
              <FontAwesomeIcon
                name="money"
                size={searchActive ? 20 : 24}
                color={"green"}
              />
              <Text>Orders</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {menuClick === "products" ? (
        <SellerStore />
      ) : menuClick == "add" ? (
        <ProductForm />
      ) : (
        <Order />
      )}

      <TouchableOpacity
        className={
          searchActive
            ? "bg-green-500  px-4 flex-row justify-center items-center mt-2 rounded-full shadow-md "
            : "  flex-row justify-center items-center mt-2  rounded-full py-3 px-3 shadow-lg mr-4 bg-green-600 absolute bottom-3 right-3"
        }
        onPress={() => {
          setMenuClick("add");
        }}>
        {searchActive ? (
          ""
        ) : (
          <View className="flex-row justify-between items-center gap-2">
            <FontAwesomeIcon
              name="plus"
              size={searchActive ? 20 : 24}
              color={"white"}
            />
          </View>
        )}
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({});

export default SellDetails;
