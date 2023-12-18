import React from "react";
import { View, StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SocialMedia from "../screens/SocialMedia";
import AddTweet from "../screens/AddTweet";
import OneTweet from "../screens/oneTweet";

const SocialMediaRoute = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="socialmediamainpage" component={SocialMedia} />
      <Stack.Screen name="addtweet" component={AddTweet} />
      <Stack.Screen name="onetweet" component={OneTweet} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({});

export default SocialMediaRoute;
