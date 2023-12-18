import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  Pressable,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const Addtweet = ({ navigation }) => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

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

    // Clean up listeners when the component unmounts
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
        const limitedImages = file.slice(0, 3);
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
    }
  };

  const deleteImage = (index) => {
    const updatedImages = [...selectedImages];
    updatedImages.splice(index, 1);
    setSelectedImages(updatedImages);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1 }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 16,
              borderBottomColor: "#ccc",
              borderBottomWidth: 1,
            }}>
            <Pressable
              onPress={() => {
                navigation.navigate("socialmediamainpage");
              }}>
              <Text>Cancel</Text>
            </Pressable>
            <View style={{ flexDirection: "row", gap: 16 }}>
              <Pressable>
                <Text>Drafts</Text>
              </Pressable>
              <Pressable>
                <Text className="text-green-500 font-semibold drop-shadow-md">
                  Tweet
                </Text>
              </Pressable>
            </View>
          </View>
          <View style={{ padding: 16, flexDirection: "row" }}>
            <View>
              <Image
                source={require("../images/driver.jpg")}
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 15,
                  marginRight: 8,
                }}
              />
            </View>
            <View
              style={{
                flex: 1,
                backgroundColor: "#f0f0f0",
                borderRadius: 8,
                flexDirection: "row",
                alignItems: "center",
              }}>
              <TextInput
                placeholder="What do you find today?"
                style={{ flex: 1, padding: 8, color: "#333" }}
                multiline
                maxLength={250}
              />
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginHorizontal: 16,
              marginBottom: keyboardHeight,
            }}>
            <View style={{ flexDirection: "row", gap: 2, borderRadius: 8 }}>
              {selectedImages.map((imageUri, index) => (
                <View key={index}>
                  <TouchableOpacity onPress={() => deleteImage(index)}>
                    <Image
                      source={{ uri: imageUri }}
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: 8,
                        marginRight: 8,
                      }}
                    />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
            <View className="flex-row justify-between gap-x-4">
              <TouchableOpacity
                style={{ width: 40, height: 40, borderRadius: 8 }}>
                <View className="flex-row justify-center border-2 w-10 h-10 border-green-600 items-center rounded-lg ">
                  <MaterialIcons
                    name="keyboard-voice"
                    size={15}
                    color={"green"}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={pickMultipleImages}
                style={{ width: 40, height: 40, borderRadius: 8 }}>
                <View
                  style={{
                    flex: 1,
                    backgroundColor: "green",
                    borderRadius: 8,
                    justifyContent: "center",
                    alignItems: "center",
                  }}>
                  <MaterialIcons name="image" size={15} color={"white"} />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Addtweet;
