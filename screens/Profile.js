import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Pressable,
  SafeAreaView,
  Platform,
  Keyboard,
  StyleSheet,
  DatePickerIOS,
} from "react-native";
import DropdownSelect from "react-native-input-select";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import { ScrollView } from "react-native-gesture-handler";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Picker } from "@react-native-picker/picker";
import DatePicker from "react-native-date-picker";

const Profile = () => {
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
    console.log("Birthdate:", birthdate.toISOString().split("T")[0]); // Format date as YYYY-MM-DD
    console.log("Location:", location);
    console.log("Agriculture Group:", agricultureGroup);
  };

  useEffect(() => {
    checkMediaLibraryPermission();

    // Add listeners for keyboard show and hide events
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      (event) => {
        setKeyboardHeight(event.endCoordinates.height);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardHeight(0);
      }
    );

    // Clean up listeners when component unmounts
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
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
    <View>
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
        <DatePicker date={birthdate} onDateChange={setBirthdate} />

        <Picker
          style={styles.input}
          selectedValue={gender}
          onValueChange={(itemValue) => setGender(itemValue)}>
          <Picker.Item label="Select Gender" value="" />
          <Picker.Item label="Male" value="male" />
          <Picker.Item label="Female" value="female" />
          <Picker.Item label="Other" value="other" />
              </Picker>
              
              
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Profile;
