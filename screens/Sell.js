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

import { storage } from "../firebase.config";
import {
  getDatabase,
  ref,
  set,
  child,
  push,
  update,
  get,
} from "firebase/database";
import {
  getStorage,
  uploadBytes,
  ref as sRef,
  getDownloadURL,
} from "firebase/storage";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import uuid from "react-native-uuid";
const ProductForm = () => {
  const [serviceType, setServiceType] = useState("");
  const [productName, setProductName] = useState("");
  const [region, setRegion] = useState("");
  const [town, setTown] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [productImageUrl, setProductImageUrl] = useState([]);
  const [user, setUser] = useState("");

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

  // Stores any error message
  const [error, setError] = useState(null);

  const uid = uuid.v4();

  //firebase
  const database = getDatabase();
  const dbRef = ref(getDatabase());
  const storage = getStorage();
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

  //   const selectServiceType = (value) => {
  //     setServiceType(value);
  //   };

  //   const selectRegion = (value) => {
  //     setRegion(value);
  //   };

  useEffect(() => {
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

  async function uploadImageAsync(uri, productname) {
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
      const storageRef = sRef(storage, "Products/" + Date.now());
      const result = await uploadBytes(storageRef, blob);

      blob.close();

      return getDownloadURL(storageRef);
    } catch (error) {
      alert(`Error: ${error}`);
    }
  }

  const pickMultipleImages = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: true,
        aspect: [3, 4],
        quality: 1,
      });

      if (!result.canceled) {
        // Update the file state variable with the selected images
        let file = result.assets.map((asset) => asset.uri);
        const limitedImages = file.slice(0, 3);

        // Clear any previous errors
        setError(null);

        // Call a function to handle the upload and set selectedImages after upload
        handleImageUpload(limitedImages);
      } else {
        // Handle cancellation or other cases
        console.log("Image picker cancelled or failed");
      }
    } catch (error) {
      console.error("Error picking images: ", error);
      setError("Error picking images");
    }
  };

  const handleImageUpload = async (images) => {
    try {
      const uploadedImageUrls = await Promise.all(
        images.map(async (image) => {
          console.log(image, "llloooo");
          const uploadURL = await uploadImageAsync(image);
          console.log(uploadURL, "ooop");

          // Process uploaded image URL as needed
          return uploadURL;
        })
      );

      // Set selectedImages after all images are uploaded
      setSelectedImages(uploadedImageUrls);
    } catch (error) {
      console.error("Error uploading images: ", error);
      setError("Error uploading images");
    }
  };

  const handleSubmit = async () => {
    console.log(serviceType);
    console.log(selectedImages);
    console.log(productName);
    console.log(region);
    console.log(town);
    console.log(price);
    console.log(description);
    console.log(name);
    console.log(phone);

    if (
      serviceType != "" ||
      selectedImages != "" ||
      productName != "" ||
      region != "" ||
      town != "" ||
      price != "" ||
      name != "" ||
      phone != ""
    ) {
      selectedImages &&
        (await Promise.all(
          selectedImages.map(async (image) => {
            console.log(image, "llloooo");
            const uploadURL = await uploadImageAsync(image);
            setProductImageUrl((prevUrls) => [...prevUrls, uploadURL]);
            console.log(productImageUrl, "ooop");

            // Process uploaded image URL as needed
          })
        ));
    }

    if (productImageUrl && productImageUrl.length != 0) {
      set(ref(database, "Products/" + uid), {
        serviceType,
        productImage: productImageUrl && productImageUrl,
        productName,
        region,
        town,
        price,
        description,
        name,
        phone,
        username: user && user.split("@")[0],
        id: uid,
      })
        .then(() => {
          setProductName("");
          setPrice("");
          setDescription("");
          setTown("");

          console.log("successful");
        })
        .catch((err) => {
          console.log(err.data);
        });
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
      className="mx-0 mt-4">
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: 5 + keyboardHeight, // Adjust the padding bottom as needed
        }}
        className="mx-4"
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
          Product Images
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
        <Text className="text-xs text-gray-400 pt-2">
          First Picture is the title picture
        </Text>

        <View className="mt-2">
          <TextInput
            value={productName}
            onChangeText={(text) => setProductName(text)}
            placeholder="Product Name"
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
            value={name}
            onChangeText={(text) => setName(text)}
            placeholder="Full Name"
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

        <TouchableOpacity
          className="h-12 flex-row justify-center items-center bg-green-600  my-4"
          onPress={handleSubmit}>
          <Text className="text-white font-medium text-lg">Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ProductForm;
