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
  StyleSheet,
  FlatList,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { ScrollView } from "react-native-gesture-handler";
const img1 = require("../images/tweet1.jpg");
const tweetimg1 = require("../images/tweetimage1.jpg");
const tweetimg4 = require("../images/tweetimage4.jpg");

const ExpertMessage = ({ navigation }) => {
  const [newMessage, setNewMessage] = useState("");
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const handleSend = () => {
    // Add your logic to send the message
    // For demonstration purposes, let's just log the message to the console
    console.log("Sending message:", newMessage);

    // Clear the input field after sending the message
    setNewMessage("");
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      (event) => {
        setKeyboardHeight(event.endCoordinates.height);
        console.log(event.endCoordinates.height);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardHeight(0);
      }
    );

    // Cleanup listeners when component unmounts
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  useEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: {
        display: "none",
      },
    });
    return () =>
      navigation.getParent()?.setOptions({
        tabBarStyle: undefined,
      });
  }, [navigation]);
  const expert = {
    id: 1,
    name: "Dr. John Farmer",
    lastChatTime: "2 hrs",
    profilePicture: img1,
    unreadMessages: 2,
    location: "Alaska, USA",
    group: "Fish Farming",
    specialization: "Aquaculture",
  };

  const messages = [
    {
      sender: "John",
      receiver: "Alice",
      text: "Hello Alice! How are you?",
      date: "2023-12-16",
      time: "14:30",
      senderMessageImage: null,
      receiverMessageImage: null,
    },
    {
      sender: "Alice",
      receiver: "John",
      text: "Hi John! I'm doing well, thank you.",
      date: "2023-12-16",
      time: "14:35",
      senderMessageImage: null,
      receiverMessageImage: null,
    },
    {
      sender: "John",
      receiver: "Alice",
      text: "That's great to hear! By the way, check out this image:",
      date: "2023-12-16",
      time: "14:40",
      senderMessageImage: tweetimg1,
      receiverMessageImage: null,
    },
    {
      sender: "Alice",
      receiver: "John",
      text: "Wow, that looks amazing!",
      date: "2023-12-16",
      time: "14:45",
      senderMessageImage: null,
      receiverMessageImage: null,
    },
    {
      sender: "John",
      receiver: "Alice",
      text: "Thanks! I thought you'd like it.",
      date: "2023-12-16",
      time: "14:50",
      senderMessageImage: null,
      receiverMessageImage: null,
    },
    {
      sender: "Alice",
      receiver: "John",
      text: "I do! It's really impressive.",
      date: "2023-12-16",
      time: "14:55",
      senderMessageImage: null,
      receiverMessageImage: tweetimg4,
    },
    {
      sender: "John",
      receiver: "Alice",
      text: "I'm glad you think so. Any plans for the weekend?",
      date: "2023-12-16",
      time: "15:00",
      senderMessageImage: null,
      receiverMessageImage: null,
    },
    {
      sender: "Alice",
      receiver: "John",
      text: "Not much, just some relaxing time at home. How about you?",
      date: "2023-12-16",
      time: "15:05",
      senderMessageImage: null,
      receiverMessageImage: null,
    },
    {
      sender: "John",
      receiver: "Alice",
      text: "I might catch up on some reading and watch a movie.",
      date: "2023-12-16",
      time: "15:10",
      senderMessageImage: null,
      receiverMessageImage: null,
    },
    {
      sender: "Alice",
      receiver: "John",
      text: "Sounds like a plan! Enjoy your weekend.",
      date: "2023-12-16",
      time: "15:15",
      senderMessageImage: null,
      receiverMessageImage: null,
    },
    {
      sender: "John",
      receiver: "Alice",
      text: "Thanks, you too! If you find any good movies, let me know.",
      date: "2023-12-16",
      time: "15:20",
      senderMessageImage: null,
      receiverMessageImage: null,
    },
    {
      sender: "Alice",
      receiver: "John",
      text: "Sure thing! Have a great day.",
      date: "2023-12-16",
      time: "15:25",
      senderMessageImage: null,
      receiverMessageImage: null,
    },
    // Add more messages as needed
    // ...
    // 9 more messages
  ];

  const renderItem = ({ item }) => {
    const isSender = item.sender === "John"; // Assuming John is the sender for this example

    return (
      <View
        style={isSender ? styles.senderContainer : styles.receiverContainer}>
        <View
          style={
            isSender
              ? styles.messageContainerSender
              : styles.messageContainerRecieve
          }>
          {item.senderMessageImage && (
            <Image
              source={item.senderMessageImage}
              style={{ width: "100%", height: 200, borderRadius: 10 }}
              resizeMode="cover"
            />
          )}
          {item.receiverMessageImage && (
            <Image
              source={item.receiverMessageImage}
              style={{ width: "100%", height: 200, borderRadius: 10 }}
              resizeMode="cover"
            />
          )}
          <Text style={styles.messageText}>{item.text}</Text>
        </View>
        <Text style={styles.messageTime}>{item.time}</Text>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      className=" bg-white mb-12"
      behavior={Platform.OS === "ios" ? "height" : undefined}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 8,
          borderBottomColor: "#ccc",
          borderBottomWidth: 1,
        }}>
        <View className="flex-row justify-start items-center gap-x-2">
          <Image
            source={expert.profilePicture}
            className=" w-[60px] h-[60px] rounded-xl "
          />
          <View>
            <Text className="font-semibold">{expert.name}</Text>
            <Text className="text-xs text-green-500">{expert.group}</Text>
          </View>
        </View>
        <View style={{ flexDirection: "row", gap: 16 }}>
          <TouchableOpacity className="p-3 bg-green-600 rounded-full">
            <MaterialIcons name="call" size={24} color={"white"} />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView className="mb-16">
        <View>
          <FlatList
            data={messages}
            renderItem={renderItem}
            keyExtractor={(item) => item.date + item.time}
          />
        </View>
        <View className="absolute bottom-12 pt-2 shadow-md  z-30 bg-gray-50  mt-4  ">
          <View className="  z-20 flex-row justify-between items-center px-4 bg-gray-50">
            <View>
              <TouchableOpacity>
                <MaterialIcons name="image" size={20} color="green" />
              </TouchableOpacity>
            </View>

            <TextInput
              placeholder="Search"
              className="mx-2 py-3 px-2 text-gray-800 border-2 w-5/6 border-gray-400 rounded-full"
            />

            <View>
              <TouchableOpacity>
                <MaterialIcons name="send" size={20} color="green" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  senderContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    marginVertical: 8,
    marginRight: 16,
  },
  receiverContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-end",
    marginVertical: 8,
    marginLeft: 16,
  },
  messageContainerRecieve: {
    maxWidth: "70%",
    backgroundColor: "green", // Blue color for sender, you can customize
    padding: 8,
    borderRadius: 8,
  },
  messageContainerSender: {
    maxWidth: "70%",
    backgroundColor: "#17b502", // Blue color for sender, you can customize
    color: "black",
    padding: 8,
    borderRadius: 8,
  },
  messageImage: {
    width: 150,
    height: 150,
    borderRadius: 8,
  },
  messageText: {
    color: "white",
  },
  messageTime: {
    fontSize: 12,
    color: "gray",
    marginLeft: 8,
  },
});

export default ExpertMessage;
