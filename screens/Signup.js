import React, { useState } from "react";
import { SafeAreaView } from "react-native";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Image,
} from "react-native";

import "../firebaseConfig";

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";

const Signup = ({ navigation }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [alert, setAlert] = useState({
    status: false,
    message: "",
  });

  const inputClass =
    "py-2 px-3 border-b-[1px] mb-6 border-gray-700  text-gray-900";

  const handleSignup = () => {
    const auth = getAuth();
    const database = getDatabase();

    if (
      firstName !== "" ||
      lastName !== "" ||
      email !== "" ||
      username !== "" ||
      password !== "" ||
      confirmPassword !== ""
    ) {
      if (password === confirmPassword) {
        createUserWithEmailAndPassword(auth, username + "@agro.com", password)
          .then((userCredential) => {
            // Signed up
            const user = userCredential.user;

            set(ref(database, "users/" + firstName), {
              firstName,
              lastName,
              email,
              username,
              profileImg: "",
              coverImage: "",
              location: "",
              gender: "",
              category: "",
            })
              .then(() => {
                navigation.navigate("profile");
              })
              .catch((err) => {
                console.log(err.data);
              });

            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage, errorCode);
            setAlert({
              status: true,
              message: "Something went wrong, Please Try again",
            });

            setTimeout(() => {
              setAlert({
                status: false,
                message: "",
              });
            }, 3000);
            // ..
          });
      } else {
        setAlert({
          status: true,
          message: "password is not the same",
        });

        setTimeout(() => {
          setAlert({
            status: false,
            message: "",
          });
        }, 3000);
      }
    }

    // navigation.navigate("profile");
    else {
      setAlert({
        status: true,
        message: "Please complete your signup",
      });

      setTimeout(() => {
        setAlert({
          status: false,
          message: "",
        });
      }, 3000);
    }
  };
  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="height">
      <SafeAreaView className="w-full h-full mb-12">
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled">
          <View className="  px-4 items-center shadow-sm mt-[-54px] mb-8">
            <View>
              <Image
                source={require("../images/logo.png")}
                className="w-[100px] h-[100px] rounded-xl "
              />
            </View>
            <View className="mb-4">
              <Text className="text-lg font-semibold">
                Sign up for Agro Solution
              </Text>
            </View>
          </View>
          <View className="w-full">
            {alert.status && (
              <View>
                <Text className="text-center text-base text-red-400 mb-4">
                  {alert.message}
                </Text>
              </View>
            )}
            <View className="w-full px-4">
              <TextInput
                className={inputClass}
                placeholder="First Name"
                value={firstName}
                onChangeText={setFirstName}
              />

              <TextInput
                className={inputClass}
                placeholder="Last Name"
                value={lastName}
                onChangeText={setLastName}
              />

              <TextInput
                className={inputClass}
                placeholder="Email"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
              />

              <TextInput
                className={inputClass}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
              />

              <TextInput
                className={inputClass}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />

              <TextInput
                className={inputClass}
                placeholder="Confirm Password"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />

              <TouchableOpacity
                onPress={handleSignup}
                className="bg-green-600 py-3 rounded-lg mt-8">
                <Text className="text-center text-white font-semibold text-base">
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  formContainer: {
    width: "80%",
  },
  input: {
    height: 40,
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 10,
  },
  signupButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
    marginTop: 8,
  },
  signupButtonText: {
    color: "white",
    fontSize: 16,
  },
});

export default Signup;
