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
  ScrollView,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";

import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";

import Store from "../components/Store";

const Buys = ({ navigation }) => {
  const [index, setIndex] = useState("");
  const [search, setSearch] = useState("");
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const handleNavigate = (id) => {
    navigation.navigate("oneproduct", { id });
  };
  const handleInputChange = (text) => {
    setSearch(text);
  };
  return (
    <TouchableWithoutFeedback className="w-full h-full bg-white mb-12">
      <ScrollView className="mb-24">
        <View className="mt-2 mx-4  bg-gray-50 flex-row items-center justify-start border-gray-300 border-2 rounded-full">
          <TextInput
            placeholder="Search"
            className="mx-2 w-5/6 py-3 px-2 text-gray-800"
            onChangeText={handleInputChange}
            value={search}
          />
          <View className="border-r-1 border-gray-400 px-1">
            <TouchableOpacity>
              <FontAwesomeIcon name="search" size={20} color="green" />
            </TouchableOpacity>
          </View>
        </View>
        <View className="mt-4 mx-auto">
          <Store
            handleNavigate={handleNavigate}
            setIndex={setIndex}
            search={search}
          />
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({});

export default Buys;
