import React from "react";
import { View, StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ExpertChats from "../screens/ExpertChats";
import Experts from "../screens/Experts";
import ExpertMessage from "../screens/ExpertMessage";

const ExpertRoute = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="expertchat"
        component={ExpertChats}
        options={{
          title: "",
          headerShown: false,
        }}
      />
      <Stack.Screen name="addexperts" component={Experts} />
      <Stack.Screen
        name="message"
        component={ExpertMessage}
        options={{
          title: "Agro Solution",
          headerShown: true,
        }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({});

export default ExpertRoute;
