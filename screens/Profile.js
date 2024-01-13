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
} from "react-native";
import DropdownSelect from "react-native-input-select";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import "../firebaseConfig";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, child, push, update, get } from "firebase/database";
import {
  getStorage,
  uploadBytes,
  ref as sRef,
  getDownloadURL,
} from "firebase/storage";

const Profile = ({ navigation }) => {
  const [selectedImages, setSelectedImages] = useState(null);
  const [profileImages, setProfileImages] = useState(null);
  const [selectedImagesurl, setSelectedImagesurl] = useState(null);
  const [profileImagesurl, setProfileImagesurl] = useState(null);
  const [error, setError] = useState(null);

  const [gender, setGender] = useState("");
  const [town, settown] = useState("");
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [agricultureGroup, setAgricultureGroup] = useState("");
  const [user, setUser] = useState("");

  const [userdata, setUserData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    username: "",
  });

  const db = getDatabase();
  const dbRef = ref(getDatabase());
  const storage = getStorage();

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

    console.log("Gender:", gender);
    console.log("Location:", selectedRegion);

    console.log("Location:", town);
    console.log("Agriculture Group:", agricultureGroup);

    const splitEmail = user.split("@")[0];
    console.log(splitEmail);

    get(child(dbRef, `users/${splitEmail}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const updates = {};
          updates[`/users/${splitEmail}`] = {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            username: data.username,
            profileImg: profileImagesurl,
            coverImage: selectedImagesurl,
            category: agricultureGroup,
            city: town,
            gender,
            region: selectedRegion,
          };

          // Update the Firebase database with the 'updates' object
          update(ref(db), updates)
            .then(() => {
              console.log("Data edit successfully");
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

  useEffect(() => {
    checkMediaLibraryPermission();
  }, []);

  const checkMediaLibraryPermission = async () => {
    const { status } = await MediaLibrary.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert(
        "Sorry, we need media library permissions to select multiple images."
      );
    }
  };

  const pickMultipleImages = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: false,
      });

      if (!result.canceled) {
        // Update the file state variable with the selected images
        let file = result.assets.map((asset) => asset.uri);
        const limitedImages = file.slice(0, 1);
        console.log(limitedImages.length, "ll");
        setSelectedImages(limitedImages);
        console.log(selectedImages[0], "ee");
        const fileName = selectedImages[0].split("/");
        console.log(fileName.slice(-1), "ppp");

        const storageRef = sRef(storage, "coverImage/" + fileName.slice(-1));

        // 'file' comes from the Blob or File API

        uploadBytes(storageRef, selectedImages[0])
          .then((snapshot) => {
            console.log("Uploaded a blob or file!");
          })
          .then(() => {
            // Check if selectedImages is not null before calling getDownloadURL
            if (selectedImages && selectedImages[0]) {
              getDownloadURL(storageRef).then((imageUrl) => {
                console.log("image url", imageUrl);
                setSelectedImagesurl(imageUrl);
              });
            } else {
              console.log("No image selected to get URL from");
            }
          });

        // Clear any previous errors
        setError(null);
      } else {
        // Handle cancellation or other cases
        console.log("Image picker cancelled or failed");
      }
    } catch (error) {
      console.error("Error picking images: ", error);
      setError("Error picking images");
      console.log(error);
    }
  };

  const pickProfileImages = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: false,
      });

      if (!result.canceled) {
        // Update the file state variable with the selected images
        let file = result.assets.map((asset) => asset.uri);
        const limitedImages = file.slice(0, 4);
        console.log(limitedImages.length, "ll");
        setProfileImages(limitedImages);
        console.log(profileImages[0], "ee");
        const fileName = profileImages[0].split("/");
        console.log(fileName.slice(-1), "ppp");

        const storageRef = sRef(storage, "profileImage/" + fileName.slice(-1));

        // 'file' comes from the Blob or File API

        uploadBytes(storageRef, profileImages[0])
          .then((snapshot) => {
            console.log("Uploaded a blob or file!");
          })
          .then(() => {
            // Check if selectedImages is not null before calling getDownloadURL
            if (profileImages && profileImages[0]) {
              getDownloadURL(storageRef).then((imageUrl) => {
                console.log("image url", imageUrl);
                setProfileImagesurl(imageUrl);
              });
            } else {
              console.log("No image selected to get URL from");
            }
          });

        // Clear any previous errors
        setError(null);
      } else {
        // Handle cancellation or other cases
        console.log("Image picker cancelled or failed");
      }
    } catch (error) {
      console.error("Error picking images: ", error);
      setError("Error picking images");
      console.log(error);
    }
  };

  const inputClass =
    "py-2 px-3 border-b-[1px] mb-6 border-gray-700  text-gray-900";

  return (
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
                  onPress={pickMultipleImages}>
                  {selectedImages != null ? (
                    selectedImages.map((imageUri, index) => (
                      <View className="w-full ">
                        <Image
                          key={index}
                          source={{ uri: selectedImages[0] }}
                          className="h-[150px] w-full bg-red-500 "
                        />
                        {console.log(imageUri, "hoooo")}
                        {console.log(selectedImages[0], "mmmoooo")}
                      </View>
                    ))
                  ) : (
                    <TouchableOpacity
                      onPress={pickMultipleImages}
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
                  profileImages.map((imageUri, index) => (
                    <View className="w-full " key={index}>
                      <Image
                        source={{ uri: profileImages[0] }}
                        className="w-[90px] h-[90px]  rounded-full "
                      />
                      <TouchableOpacity
                        className="w-8 h-8 bg-green-600 flex-row justify-center items-center rounded-full absolute bottom-1 right-1 mr-[-12]"
                        onPress={pickProfileImages}>
                        <MaterialIcons name="add" size={24} color={"white"} />
                      </TouchableOpacity>
                    </View>
                  ))
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
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
});

export default Profile;
