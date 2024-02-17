import React, { useContext, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ImageBackground,
  ScrollView,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { UserContext } from "../ContextApi/Context";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const Login = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { setUser, user, setUserInfo, userInfo } = useContext(UserContext);

  const auth = getAuth();

  const handleLogin = async () => {
    //http://192.168.100.100:8000/auth/test
    // Add your login logic here

    setIsLoading(true);

    const auth = getAuth();

    if (username != "" || password != "") {
      const emailwork = username + "@agro.com";
      console.log(emailwork);
      signInWithEmailAndPassword(auth, emailwork, password)
        .then((userCredential) => {
          // Signed in

          setUser(userCredential.user);
          setIsLoading(false);
          navigation.navigate("Home");
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage1 = error.message;
          setError(true);
          setErrorMessage("Invalid credentials");
          setIsLoading(false);

          console.log(errorMessage1, "errorroror");
        });
    } else {
      // navigation.navigate("Home");
      // setError(true);
      // setTimeout(() => {
      //   setError(false);
      //   setErrorMessage(" Please, Enter you Credentials");
      // }, 3000);
    }
  };

  return !isLoading ? (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="height">
      <ScrollView keyboardShouldPersistTaps="handled" className="bg-white">
        <View className="mx-4 pb-8 h-full ">
          <View className=" flex-row justify-center">
            <View>
              <Image
                source={require("../images/logo.png")}
                className="w-[300px] h-[300px] rounded-xl "
              />
            </View>
          </View>
          {error && (
            <View className="mx-2">
              <Text className="text-red-500 font-semibold text-center">
                {errorMessage}
              </Text>
            </View>
          )}

          <View className="mt-4 mx-2">
            <TextInput
              placeholder="Username"
              value={username}
              onChangeText={setUsername}
              className="py-4 rounded-md text-gray-900 border-[1px] border-gray-300 mb-6 px-2"
            />

            <TextInput
              placeholder="Password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              className="py-4 rounded-md text-gray-900 border-[1px] border-gray-300 mb-6 px-2"
            />

            <TouchableOpacity className="mt-[-5px] mb-6">
              <Text className="text-gray-400 text-right">Forgot Password</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleLogin}
              className="bg-green-500 rounded-md mt-2  ">
              <Text className="text-center py-3  text-base font-semibold text-white">
                Login
              </Text>
            </TouchableOpacity>
          </View>

          <View className="mt-10 flex-row items-center gap-x-2 justify-center">
            <Text className="text-center">Don't have an account</Text>
            <Pressable
              className="text-green-500"
              onPress={() => {
                navigation.navigate("sign up");
              }}>
              <Text className="text-green-600 font-semibold">Signup</Text>
            </Pressable>
          </View>

          <View className="mt-8">
            <Text className="text-center text-gray-800">- Signup with - </Text>
            <View className="flex-row justify-between w-2/4 mx-auto mt-4">
              <Image
                source={require("../images/google.jpg")}
                className="w-[30px] h-[30px] rounded-xl "
              />
              <Image
                source={require("../images/facebook.png")}
                className="w-[30px] h-[30px] rounded-xl "
              />
              <Image
                source={require("../images/twitter.png")}
                className="w-[30px] h-[30px] rounded-xl "
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  ) : (
    <View className="bg-white w-full h-full flex-row justify-center items-center">
      <ActivityIndicator size="large" color="red" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  input: {
    height: 40,
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 10,
  },
  loginButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
  },
  loginButtonText: {
    color: "white",
    fontSize: 16,
  },
});
export default Login;
