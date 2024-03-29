import { StatusBar } from "expo-status-bar";
import { Text, View, ImageBackground } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Welcome from "./screens/Welcome";
import Home from "./screens/Home";
import DrawerNav from "./screens/DrawerNav";
import "react-native-gesture-handler";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import Profile from "./screens/Profile";

import { UserContextProvider } from "./ContextApi/Context";
export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <UserContextProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Welcome"
            component={Welcome}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="login"
            component={Login}
            options={{
              headerShown: false,
              headerStyle: {
                backgroundColor: "#5d1425",
                borderColor: "#5d1425",
              },
              headerTitle: "",
              headerTintColor: "white",
            }}
          />
          <Stack.Screen name="sign up" component={Signup} />
          <Stack.Screen name="profile" component={Profile} />

          <Stack.Screen
            name="Home"
            component={DrawerNav}
            options={{
              headerShown: false,
              headerShadowVisible: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </UserContextProvider>
  );
}
