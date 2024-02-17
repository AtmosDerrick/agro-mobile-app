import React, { useState, useEffect, useContext } from "react";
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
import { UserContext } from "../ContextApi/Context";

import { useRoute } from "@react-navigation/native";

import uuid from "react-native-uuid";

const Reply = ({ navigation }) => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [text, setText] = useState("");
  const [postImageUrl, setPostImageUrl] = useState([]);
  const { setUser, user, setUserInfo, userInfo } = useContext(UserContext);

  const database = getDatabase();
  const uid = uuid.v4();

  const route = useRoute();
  routename = route.params;

  const pastPost = {
    profileImage: routename?.profileImage,
    firstname: routename?.profileImage,
    lastname: routename?.lastname,
    username: routename?.username,
    text: routename?.text,
    image: routename?.postImage,
  };

  const User = route.params?.userInfo;

  useEffect(() => {
    navigation.getParent()?.setOptions({
      headerShown: false,
    });
    return () =>
      navigation.getParent()?.setOptions({
        headerShown: true,
      });
  }, [navigation]);

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

    // Clean up listeners when the component unmounts
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
      const storageRef = sRef(storage, "Post Images/" + Date.now());
      const result = await uploadBytes(storageRef, blob);

      blob.close();

      return getDownloadURL(storageRef);
    } catch (error) {
      alert(`Error: ${error}`);
    }
  }

  // const handleImageUpload = async (images) => {
  //   try {
  //     const uploadedImageUrls = await Promise.all(
  //       images.map(async (image) => {
  //         console.log(image, "llloooo");
  //         const uploadURL = await uploadImageAsync(image);
  //         console.log(uploadURL, "ooop");

  //         // Process uploaded image URL as needed
  //         return uploadURL;
  //       })
  //     );

  //     // Set selectedImages after all images are uploaded
  //     setSelectedImages(uploadedImageUrls);
  //   } catch (error) {
  //     console.error("Error uploading images: ", error);
  //     setError("Error uploading images");
  //   }
  // };

  const pickMultipleImages = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: false,
        aspect: [3, 4],
        quality: 1,
      });

      if (!result.canceled) {
        // Update the file state variable with the selected images
        let file = result.assets.map((asset) => asset.uri);
        const limitedImages = file.slice(0, 3);
        console.log(limitedImages.length, "ll");
        setSelectedImages(limitedImages);

        // Clear any previous errors
      } else {
        // Handle cancellation or other cases
        console.log("Image picker cancelled or failed");
      }
    } catch (error) {
      console.error("Error picking images: ", error);
    }
  };

  const deleteImage = (index) => {
    const updatedImages = [...selectedImages];
    updatedImages.splice(index, 1);
    setSelectedImages(updatedImages);
  };

  const handlePost = async () => {
    try {
      let uploadedImageUrls = [];

      if (selectedImages && selectedImages.length > 0) {
        uploadedImageUrls = await Promise.all(
          selectedImages.map(async (image) => {
            console.log(image, "llloooo");
            const uploadURL = await uploadImageAsync(image);
            return uploadURL;
          })
        );

        setPostImageUrl((prevUrls) => [...prevUrls, ...uploadedImageUrls]);
        console.log(postImageUrl, "ooop");
      }

      if (text !== "" || uploadedImageUrls.length > 0) {
        const postData = {
          text,
          postImage: uploadedImageUrls.length > 0 ? uploadedImageUrls : "",
          username: userInfo.username,
          profileImage: userInfo.profileImage,
          profileFirstName: userInfo.firstName,
          profileLastName: userInfo.lastName,
          id: uid,
          like: [],
          Comment: [],
        };

        console.log("Posting data:", postData);

        await set(ref(database, "Posts/" + uid), postData);
        setText("");
        console.log("Successful post");
        navigation.navigate("socialmediamainpage");
      }
    } catch (error) {
      console.error("Error handling post:", error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        <View className="bg-[#f0f0f0] my-4 border-b-[0.2px] pb-2 border-b-gray-400 ">
          <View className="flex-row gap-x-1 ">
            <Image
              source={{ uri: pastPost.profileImage }}
              className="w-[50px] h-[50px] rounded-full "
            />

            <View className="">
              <View className="flex-row gap-x-2">
                <Text style={{ fontWeight: "bold" }}>
                  {pastPost.firstname} {pastPost.lastname}
                </Text>
                <Text className="text-xs text-gray-600">
                  @{pastPost.username}
                </Text>
              </View>
              <View className="pr-16">
                <View className="">
                  <Text className="text-sm pb-1  ">{pastPost.text}</Text>
                  {pastPost.postImage && pastPost.postImage.length > 0 ? (
                    // Render the image if it exists
                    <View className=" w-full h-[3rem] mt-3">
                      <Image
                        source={{ uri: pastPost.postImage[0] }}
                        style={{ width: 250, height: 150, borderRadius: 10 }}
                        resizeMode="cover"
                      />
                    </View>
                  ) : null}
                </View>
                {
                  //                   <View className="flex-row justify-start mt-2 gap-x-8 items-center">
                  //   <TouchableOpacity
                  //     className="flex-row gap-x-2"
                  //     onPress={() => handleLikePress(item.id)}>
                  //     {
                  //       //like icons
                  //     }
                  //     <Fontisto
                  //       name={
                  //         item.like && item.like.includes(User.username)
                  //           ? "like"
                  //           : "like"
                  //       }
                  //       size={20}
                  //       color={
                  //         item.like && item.like.includes(User.username)
                  //           ? "blue"
                  //           : "gray"
                  //       }
                  //     />
                  //     <View className="pt-1">
                  //       <Text>{item.like && item.like.length}</Text>
                  //     </View>
                  //   </TouchableOpacity>
                  //   {
                  //     <TouchableOpacity
                  //       className="flex-row gap-x-2"
                  //       onPress={() => {
                  //         navigation.navigate("reply", { item, userInfo });
                  //       }}>
                  //       {
                  //         //like comment icons
                  //       }
                  //       <Fontisto name="comments" size={15} color="gray" />
                  //       <Text>{item.comments}</Text>
                  //     </TouchableOpacity>
                  //   }
                  //   <TouchableOpacity
                  //     className="flex-row gap-x-2"
                  //     onPress={() => handleBookmarkPress(index)}>
                  //     {
                  //       //like comment
                  //     }
                  //     <Fontisto
                  //       name={bookmarkStates[index] ? "bookmark-alt" : "bookmark"}
                  //       size={20}
                  //       color={bookmarkStates[index] ? "blue" : "gray"}
                  //     />
                  //   </TouchableOpacity>
                  //                   </View>
                }
              </View>
            </View>
          </View>
          {
            //   showCommentInput && selectedTweetId === item.id && (
            //   <View className="flex-row justify-between mx-4 px-4 mt-4 items-center gap-x-2 ">
            //     <View className="w-5/6">
            //       <TextInput
            //         style={styles.commentInput}
            //         placeholder="Write a comment..."
            //         multiline
            //         maxLength={20}
            //       />
            //     </View>
            //     <TouchableOpacity>
            //       <FontAwesomeIcon name="send" size={20} color="gray" />
            //     </TouchableOpacity>
            //   </View>
            // )
          }
        </View>
      </View>
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
              <TouchableOpacity onPress={handlePost}>
                <Text className="text-green-500 font-semibold drop-shadow-md">
                  Post
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ padding: 16, flexDirection: "row" }}>
            <View>
              <Image
                source={{ uri: userInfo.profileImage }}
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 15,
                  marginRight: 8,
                }}
              />
            </View>
            <View className="mt-4">
              <View
                style={{
                  flex: 1,
                  backgroundColor: "#f0f0f0",
                  borderRadius: 8,
                  flexDirection: "row",
                  alignItems: "center",
                  paddingTop: 12,
                }}>
                <TextInput
                  placeholder="What do you find today?"
                  style={{
                    padding: 8,
                    color: "#333",

                    height: 72,
                  }}
                  multiline
                  maxLength={250}
                  value={text}
                  className="mr-8"
                  onChangeText={(word) => setText(word)}
                />
              </View>
              <View className="mt-12">
                {selectedImages.map((imageUri, index) => (
                  <View key={index}>
                    <View>
                      <Image
                        source={{ uri: imageUri }}
                        style={{
                          width: 300,
                          height: 200,
                          borderRadius: 8,
                          marginRight: 8,
                        }}
                      />
                      <TouchableOpacity
                        className="absolute right-6 top-2 bg-red-600 w-8 h-8 rounded-full flex-row justify-center items-center border-2 border-white"
                        onPress={() => deleteImage(index)}>
                        <MaterialIcons
                          name="delete"
                          size={15}
                          color={"white"}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
              </View>
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
              {
                // selectedImages.map((imageUri, index) => (
                // <View key={index}>
                //   <TouchableOpacity onPress={() => deleteImage(index)}>
                //     <Image
                //       source={{ uri: imageUri }}
                //       style={{
                //         width: 50,
                //         height: 50,
                //         borderRadius: 8,
                //         marginRight: 8,
                //       }}
                //     />
                //   </TouchableOpacity>
                // </View>
                // ))
              }
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

export default Reply;
