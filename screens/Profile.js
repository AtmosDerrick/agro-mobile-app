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

const Profile = ({ navigation }) => {
  const [selectedImages, setSelectedImages] = useState(null);
  const [profileImages, setProfileImages] = useState(null);
  const [error, setError] = useState(null);

  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [birthdate, setBirthdate] = useState(new Date());
  const [location, setLocation] = useState("");
  const [agricultureGroup, setAgricultureGroup] = useState("");

  const handleSave = () => {
    // Add your logic to save the profile
    console.log("Name:", name);
    console.log("Gender:", gender);
    console.log("Location:", location);
    console.log("Agriculture Group:", agricultureGroup);
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
        allowsMultipleSelection: true,
      });

      if (!result.canceled) {
        // Update the file state variable with the selected images
        let file = result.assets.map((asset) => asset.uri);
        const limitedImages = file.slice(0, 4);
        console.log(limitedImages.length, "ll");
        setSelectedImages(limitedImages);

        // Clear any previous errors
        setError(null);
      } else {
        // Handle cancellation or other cases
        console.log("Image picker cancelled or failed");
      }
    } catch (error) {
      console.error("Error picking images: ", error);
      setError("Error picking images");
      console.log(eror);
    }
  };

  const pickProfileImages = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: true,
      });

      if (!result.canceled) {
        // Update the file state variable with the selected images
        let file = result.assets.map((asset) => asset.uri);
        const limitedImages = file.slice(0, 1);
        console.log(limitedImages.length, "ll");
        setProfileImages(limitedImages);

        // Clear any previous errors
        setError(null);
      } else {
        // Handle cancellation or other cases
        console.log("Image picker cancelled or failed");
      }
    } catch (error) {
      console.error("Error picking images: ", error);
      setError("Error picking images");
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
                  {selectedImages
                    ? selectedImages.map((imageUri, index) => (
                        <View className="w-full ">
                          <Image
                            key={index}
                            source={{ uri: imageUri }}
                            className="h-[150px] w-full bg-red-500 "
                          />
                        </View>
                      ))
                    : ""}
                </TouchableOpacity>
                {!selectedImages ? (
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
                ) : (
                  ""
                )}
              </View>
            </View>
            <View>
              <View className="bg-white w-[100px] h-[100px] rounded-full ml-6 mt-[-35px] border-white border-4 ">
                {profileImages ? (
                  profileImages.map((imageUri, index) => (
                    <View className="w-full ">
                      <Image
                        key={index}
                        source={{ uri: imageUri }}
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
            <TextInput
              className={inputClass}
              placeholder="Name"
              value={name}
              onChangeText={setName}
            />

            <TextInput
              className={inputClass}
              placeholder="Location"
              value={location}
              onChangeText={setLocation}
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
