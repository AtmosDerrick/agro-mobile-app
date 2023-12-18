import React from "react";
import { View, StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ExpertChats from "../screens/ExpertChats";
import Experts from "../screens/Experts";
import ExpertMessage from "../screens/ExpertMessage";

const ExpertRoute = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="expertchat" component={ExpertChats} />
      <Stack.Screen name="addexperts" component={Experts} />
      <Stack.Screen name="message" component={ExpertMessage} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({});

export default ExpertRoute;
