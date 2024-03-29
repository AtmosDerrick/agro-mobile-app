import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Image,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import DropdownSelect from "react-native-input-select";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, child, push, update, get } from "firebase/database";
import {
  uploadBytes,
  ref as sRef,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

import { storage } from "../firebase.config";

const Profile = ({ navigation }) => {
  const [selectedImages, setSelectedImages] = useState(null);
  const [profileImages, setProfileImages] = useState(null);
  const [selectedImagesurl, setSelectedImagesurl] = useState(null);
  const [profileImagesurl, setProfileImagesurl] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [gender, setGender] = useState("");
  const [town, settown] = useState("");
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [agricultureGroup, setAgricultureGroup] = useState("");
  const [user, setUser] = useState("");

  const [loafing, setIsLoafing] = useState(false);

  const [userdata, setUserData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    username: "",
  });

  const db = getDatabase();
  const dbRef = ref(getDatabase());

  useEffect(() => {
    //getting user
    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
      if (user) {
        const userEmail = user.email;
        setUser(userEmail);
              } else {
        // User is signed out
        console.log("user is logout");
        // ...
      }
    });
  }, [user]);

  const regionsInGhana = [
    { name: "Greater Accra", code: "greater_accra" },
    { name: "Ashanti", code: "ashanti" },
    { name: "Brong-Ahafo", code: "brong_ahafo" },
    { name: "Central", code: "central" },
    { name: "Eastern", code: "eastern" },
    { name: "Northern", code: "northern" },
    { name: "Upper East", code: "upper_east" },
    { name: "Upper West", code: "upper_west" },
    { name: "Volta", code: "volta" },
    { name: "Western", code: "western" },
    { name: "Western North", code: "western_north" },
    { name: "Ahafo", code: "ahafo" },
    { name: "Bono", code: "bono" },
    { name: "Bono East", code: "bono_east" },
    { name: "Central East", code: "central_east" },
    { name: "Central West", code: "central_west" },
    { name: "North East", code: "north_east" },
    { name: "Oti", code: "oti" },
    { name: "Savannah", code: "savannah" },
    { name: "Western South", code: "western_south" },
    // Add more regions as needed
  ];

  const handleSave = () => {
    // Add your logic to save the profile
    setIsLoading(true);

    console.log("Gender:", gender);
    console.log("Location:", selectedRegion);

    console.log("Location:", town);
    console.log("Agriculture Group:", agricultureGroup);

    const splitEmail = user.split("@")[0];

    //update the profile
    get(child(dbRef, `users/${splitEmail}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const updates = {};
          updates[`/users/${splitEmail}`] = {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            username: splitEmail,
            profileImg: profileImagesurl,
            coverImage: selectedImages,
            profileImage: profileImages,
            category: agricultureGroup,
            city: town,
            gender,
            region: selectedRegion,
          };

          // Update the Firebase database with the 'updates' object
          update(ref(db), updates)
            .then(() => {
              console.log("Data edit successfully");
              setIsLoading(false);
              navigation.navigate("Home");
            })
            .catch((error) => {
              console.error("Error deleting data:", error);
            });

          setUserData({
            email: data.email,
            firstName: data.firstName,
            lastName: data.firstName,
            username: data.username,
          });
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const pickImage = async () => {
    setIsLoafing(true);
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImages(result.assets[0].uri);
      const uploadURL = await uploadImageAsync(result.assets[0].uri);
      setSelectedImages(uploadURL);
      setInterval(() => {
        setIsLoafing(false);
      }, 2000);
    } else {
      setInterval(() => {
        setImage(null);
        setIsLoafing(false);
      }, 2000);
    }

    async function uploadImageAsync(uri) {
      // Why are we using XMLHttpRequest? See:
      // https://github.com/expo/expo/issues/2402#issuecomment-443726662
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          resolve(xhr.response);
        };
        xhr.onerror = function (e) {
          console.log(e);
          reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", uri, true);
        xhr.send(null);
      });

      try {
        const storageRef = sRef(storage, "Cover Images/img" + Date.now());
        const result = await uploadBytes(storageRef, blob);

        blob.close();
        return getDownloadURL(storageRef);
      } catch (error) {
        alert(`Error: ${error}`);
      }
    }
  };

  const pickProfileImages = async () => {
    setIsLoafing(true);
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImages(result.assets[0].uri);
      const uploadURL = await uploadImageAsync(result.assets[0].uri);
      setProfileImages(uploadURL);
      setInterval(() => {
        setIsLoafing(false);
      }, 2000);
    } else {
      setInterval(() => {
        setProfileImages(null);
        setIsLoafing(false);
      }, 2000);
    }

    async function uploadImageAsync(uri) {
      // Why are we using XMLHttpRequest? See:
      // https://github.com/expo/expo/issues/2402#issuecomment-443726662
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          resolve(xhr.response);
        };
        xhr.onerror = function (e) {
          console.log(e);
          reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", uri, true);
        xhr.send(null);
      });

      try {
        const storageRef = sRef(storage, "Profile Image/img" + Date.now());
        const result = await uploadBytes(storageRef, blob);

        blob.close();
        return getDownloadURL(storageRef);
      } catch (error) {
        alert(`Error: ${error}`);
      }
    }
  };

  const inputClass =
    "py-2 px-3 border-b-[1px] mb-6 border-gray-700  text-gray-900";

  return !isLoading ? (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="height">
      <SafeAreaView className="w-full h-full mb-12">
        <ScrollView contentContainerStyle={styles.container}>
          <View>
            <View className=" w-full h-[150px] border-b-2 border-b-gray-500">
              <View
                className={
                  selectedImages ? "flex-row justify-between items-center" : ""
                }>
                <TouchableOpacity
                  className="flex-row justify-start gap-2 rounded-lg"
                  onPress={pickImage}>
                  {selectedImages ? (
                    <View className="w-full ">
                      <Image
                        source={{ uri: selectedImages }}
                        className="h-[150px] w-full  "
                      />
                      {console.log(selectedImages, "hoooo")}
                      {console.log(selectedImages[0], "mmmoooo")}
                    </View>
                  ) : (
                    <TouchableOpacity
                      onPress={pickImage}
                      className="absolute w-full">
                      <View className="w-full h-[150px]   rounded-xl lex-row justify-center items-center">
                        <View className="w-full">
                          <Image
                            source={require("../images/defaultcover.jpg")}
                            className="w-[100%] h-[150px] rounded-xl "
                          />
                        </View>
                        <View className="absolute">
                          <Text className="text-lg font-semibold">
                            Upload a Cover Image
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  )}
                </TouchableOpacity>
              </View>
            </View>
            <View>
              <View className="bg-white w-[100px] h-[100px] rounded-full ml-6 mt-[-35px] border-white border-4 ">
                {profileImages != null ? (
                  <View className="w-full ">
                    <Image
                      source={{ uri: profileImages }}
                      className="w-[90px] h-[90px]  rounded-full "
                    />
                    <TouchableOpacity
                      className="w-8 h-8 bg-green-600 flex-row justify-center items-center rounded-full absolute bottom-1 right-1 mr-[-12]"
                      onPress={pickProfileImages}>
                      <MaterialIcons name="add" size={24} color={"white"} />
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View>
                    <Image
                      source={require("../images/defaultprofileimage.jpg")}
                      className="w-[90px] h-[90px] rounded-full "
                    />
                    <TouchableOpacity
                      className="w-8 h-8 bg-green-600 flex-row justify-center items-center rounded-full absolute bottom-1 right-1 mr-[-12]"
                      onPress={pickProfileImages}>
                      <MaterialIcons name="add" size={24} color={"white"} />
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>
          </View>
          <View className="mx-4 mt-6">
            <View className="mt-2">
              <DropdownSelect
                placeholder="Select Region"
                options={regionsInGhana}
                optionLabel={"name"}
                optionValue={"code"}
                selectedValue={selectedRegion}
                onValueChange={(itemValue) => setSelectedRegion(itemValue)}
                dropdownStyle={{
                  paddingVertical: 5,
                  paddingHorizontal: 10,
                  minHeight: 50,
                  borderColor: "gray",
                }}
              />
            </View>
            <TextInput
              className={inputClass}
              placeholder="Town"
              value={town}
              onChangeText={settown}
            />

            <View>
              <View className="mt-2">
                <DropdownSelect
                  placeholder="Select Gender"
                  options={[
                    { name: "Male", code: "male" },
                    { name: "Female", code: "female" },
                  ]}
                  optionLabel={"name"}
                  optionValue={"code"}
                  selectedValue={gender}
                  onValueChange={(itemValue) => setGender(itemValue)}
                  dropdownStyle={{
                    paddingVertical: 5,
                    paddingHorizontal: 10,
                    minHeight: 50,
                    borderColor: "gray",
                  }}
                />
              </View>
            </View>
            <View>
              <View className="mt-2">
                <DropdownSelect
                  placeholder="Select Category"
                  isMultiple
                  options={[
                    { name: "Crop Farming", code: "crop" },
                    { name: "Animal Farming", code: "animal" },
                    { name: "Fish Farming", code: "fish" },
                    { name: "Poultry ", code: "poultry" },
                  ]}
                  optionLabel={"name"}
                  optionValue={"code"}
                  selectedValue={agricultureGroup}
                  onValueChange={(itemValue) => setAgricultureGroup(itemValue)}
                  dropdownStyle={{
                    paddingVertical: 5,
                    paddingHorizontal: 10,
                    minHeight: 50,
                    borderColor: "gray",
                  }}
                />
              </View>
            </View>
          </View>
          <View className="px-4">
            <View className=" flex-row justify-between gap-x-4">
              <TouchableOpacity
                onPress={handleSave}
                className="w-1/2  bg-green-600 py-3 rounded-lg mt-8">
                <Text className="text-center text-white font-semibold text-base">
                  Save
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Home");
                }}
                className="w-1/4  py-3 rounded-lg mt-8">
                <Text className=" text-center text-gray-900 font-semibold text-base">
                  Skip
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  ) : (
    <View className="bg-white w-full h-full flex-row justify-center items-center">
      <ActivityIndicator size="large" color="green" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
});

export default Profile;
