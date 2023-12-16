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
} from "react-native";
import DropdownSelect from "react-native-input-select";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import { ScrollView } from "react-native-gesture-handler";

const ProductForm = () => {
  const [serviceType, setServiceType] = useState("");
  const [productName, setProductName] = useState("");
  const [region, setRegion] = useState("");
  const [town, setTown] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedImages, setSelectedImages] = useState(null);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  // Stores the selected image URI
  const [file, setFile] = useState(null);

  // Stores any error message
  const [error, setError] = useState(null);

  const regionsInGhana = [
    "Greater Accra",
    "Ashanti",
    "Central",
    "Eastern",
    "Northern",
    "Western",
    "Volta",
    "Brong-Ahafo",
    "Upper East",
    "Upper West",
  ];

  const regionsAsObjects = regionsInGhana.map((region) => ({
    label: region,
    value: region,
  }));

  const selectServiceType = (value) => {
    setServiceType(value);
  };

  const selectRegion = (value) => {
    setRegion(value);
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

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
      className="mx-4">
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: keyboardHeight + 10, // Adjust the padding bottom as needed
        }}
        keyboardShouldPersistTaps="handled">
        <View className="mt-2">
          <DropdownSelect
            placeholder="Select Service Type"
            options={[
              { name: "Selling", code: "selling" },
              { name: "Hiring", code: "hiring" },
            ]}
            optionLabel={"name"}
            optionValue={"code"}
            selectedValue={serviceType}
            onValueChange={(itemValue) => setServiceType(itemValue)}
            dropdownStyle={{
              paddingVertical: 5,
              paddingHorizontal: 5,
              minHeight: 50,
              borderColor: "green",
            }}
          />
        </View>

        <Text className="text-base font-semibold text-gray-600 my-2">
          Image
        </Text>
        <View
          className={
            selectedImages ? "flex-row justify-between items-center" : ""
          }>
          <View className="flex-row justify-start gap-2 rounded-lg">
            {selectedImages
              ? selectedImages.map((imageUri, index) => (
                  <View className=" ">
                    <Image
                      key={index}
                      source={{ uri: imageUri }}
                      className="w-20 h-20 rounded-md shadow-md"
                    />
                  </View>
                ))
              : ""}
          </View>
          <TouchableOpacity onPress={pickMultipleImages} className="w-1/2">
            <View className="w-16 h-16 bg-green-500  rounded-xl lex-row justify-center items-center">
              <Text className="text-lg font-semibold">+</Text>
            </View>
          </TouchableOpacity>
        </View>
        <Text className="text-xs text-gray-400">
          First Picture is the title picture
        </Text>

        <View className="mt-2">
          <TextInput
            value={productName}
            onChangeText={(text) => setProductName(text)}
            placeholder="Product Name"
            className="h-14 border-[1px] border-green-700 rounded-lg px-4"
          />

          <View className="mt-4">
            <DropdownSelect
              placeholder="Select Region"
              options={regionsAsObjects}
              optionLabel={"label"}
              optionValue={"value"}
              selectedValue={region}
              onValueChange={(itemValue) => setRegion(itemValue)}
              dropdownStyle={{
                paddingVertical: 5,
                paddingHorizontal: 12,

                minHeight: 50,
                borderColor: "green",
              }}
            />
          </View>

          <TextInput
            value={town}
            onChangeText={(text) => setTown(text)}
            placeholder="Town"
            className="h-14 border-[1px] border-green-700 rounded-lg px-4"
          />

          <TextInput
            value={price}
            onChangeText={(text) => setPrice(text)}
            placeholder="Price"
            keyboardType="numeric"
            className="h-14 border-[1px] border-green-700 rounded-lg px-4 mt-4"
          />

          <TextInput
            value={description}
            onChangeText={(text) => setDescription(text)}
            placeholder="Description"
            multiline
            className="h-14 border-[1px] border-green-700 rounded-lg px-4 mt-4"
          />

          <TextInput
            value={name}
            onChangeText={(text) => setName(text)}
            placeholder="Name"
            className="h-14 border-[1px] border-green-700 rounded-lg px-4 mt-4"
          />

          <TextInput
            value={phone}
            onChangeText={(text) => setPhone(text)}
            placeholder="Phone Number"
            keyboardType="numeric"
            className="h-14 border-[1px] border-green-700 rounded-lg px-4 mt-4"
          />
        </View>

        <Pressable className="h-12 flex-row justify-center items-center bg-green-600  my-4">
          <Text className="text-white font-medium text-lg">Submit</Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ProductForm;
