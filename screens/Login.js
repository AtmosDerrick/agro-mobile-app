import React, { useContext, useState } from "react";
import {
  Text,
  TextInput,
  Button,
  View,
  ImageBackground,
  SafeAreaView,
  Pressable,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import { withExpoSnack } from "nativewind";
import image from "../images/delivery.png";

export const Login = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const handleAuth = async () => {
    console.log("working fetching");
    const work = axios
      .get("http://127.0.0.1:8000/product/shippingproduct/accra", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data.data);

        // const sortedPackages = [...viewPackages].sort(
        //   (a, b) => new Date(b.datetime) - new Date(a.datetime)
        // );

        // setViewPackages(sortedPackages);
      })
      .catch((error) => {
        console.log(error, "pp");
      });
    // navigation.navigate("HomePage");

    // setLoggedIn(false);
    console.log("working fetching");
  };

  return (
    <SafeAreaView>
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <View>
          <ImageBackground
            source={image}
            className="h-80 mt-8 w-full "></ImageBackground>
          <View className=" w-full items-center justify-center ">
            <View className="px-4 w-full max-w-sm">
              <Text className="text-xl font-bold mb-6 text-gray-50">Login</Text>

              <View className="flex flex-col gap-8">
                <TextInput
                  placeholder="Enter email address"
                  className="border-2 py-3 rounded-md border-gray-300 px-2"
                  onChangeText={(e) => {
                    setUsername(e);
                    console.log(username);
                  }}
                  defaultValue={username}
                />
                <TextInput
                  placeholder="Enter password"
                  className="border-2 py-3 rounded-md border-gray-300 px-2"
                  onChangeText={(e) => {
                    setPassword(e);
                    console.log(password);
                  }}
                  defaultValue={password}
                  secureTextEntry
                />
              </View>

              <View className="flex flex-row justify-between items-center my-8">
                <View className="flex-row items-center">
                  <Pressable style="bg-gray-50 h-6 w-6 rounded-sm mr-2 "></Pressable>
                  <Text className="text-blue-500">Remember me</Text>
                </View>
                <Pressable>
                  <Text className="text-gray-900 font-bold">
                    Reset password
                  </Text>
                </Pressable>
              </View>
            </View>

            <View className="w-full mt-12">
              <TouchableOpacity
                onPress={handleAuth}
                className="bg-blue-500  mx-2  py-4 px-4">
                <Text className="text-center font-semibold text-white ">
                  SIgnin
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};
