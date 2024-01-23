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

const Buys = ({ navigation }) => {
  const [index, setIndex] = useState("");
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const handleNavigate = (id) => {
    navigation.navigate("oneproduct", { id });
    console.log(id);
  };
  return (
    <TouchableWithoutFeedback
      onPress={dismissKeyboard}
      className="w-full h-full">
      <View className="mt-2 mx-4  bg-gray-50 flex-row items-center justify-start border-gray-300 border-2 rounded-md">
        <TextInput
          placeholder="Search"
          className="mx-2 w-5/6 py-3 px-2 text-gray-800"
        />
        <View className="border-r-1 border-gray-400 px-1">
          <TouchableOpacity>
            <FontAwesomeIcon name="search" size={20} color="green" />
          </TouchableOpacity>
        </View>
      </View>
      <View className="mt-4 ">
        <Store handleNavigate={handleNavigate} setIndex={setIndex} />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({});

export default Buys;
