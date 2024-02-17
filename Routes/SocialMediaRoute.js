import React from "react";
import { View, StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SocialMedia from "../screens/SocialMedia";
import AddTweet from "../screens/AddTweet";
import OneTweet from "../screens/oneTweet";
import Reply from "../screens/Reply";

const SocialMediaRoute = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="socialmediamainpage"
        component={SocialMedia}
        options={{
          title: "",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="addtweet"
        component={AddTweet}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="onetweet"
        component={OneTweet}
        options={{
          title: "",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="reply"
        component={Reply}
        options={{
          title: "",
          headerShown: true,
        }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({});

export default SocialMediaRoute;
