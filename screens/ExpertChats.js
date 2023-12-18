import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const img1 = require("../images/tweet1.jpg");
const img2 = require("../images/tweet2.jpg");
const img3 = require("../images/tweet3.jpg");
const img4 = require("../images/tweet4.jpg");
const img5 = require("../images/tweet5.jpg");

const ExpertChats = () => {
  const agricultureExperts = [
    {
      id: 1,
      name: "Dr. John Farmer",
      lastChatTime: "2 hrs",
      lastMessage: "Hello! How can I help you with your crops?",
      profilePicture: img1,
      unreadMessages: 2,
    },
    {
      id: 2,
      name: "Emily Agronomist",
      lastChatTime: "4 hrs",
      lastMessage: "Have you considered crop rotation for better yield?",
      profilePicture: img2,
      unreadMessages: 0, // No unread messages for Emily
    },
    {
      id: 3,
      name: "Tom Fisher, DVM",
      lastChatTime: "1 day ",
      lastMessage:
        "Is there anything specific you'd like to know about livestock health?",
      profilePicture: img3,
      unreadMessages: 1,
    },
    {
      id: 4,
      name: "Samantha Aquaculturist",
      lastChatTime: "3 days",
      lastMessage:
        "Thinking of starting a fish farm? I can provide some insights.",
      profilePicture: img4,
      unreadMessages: 0,
    },
    {
      id: 5,
      name: "Dr. Green Fields",
      lastChatTime: "1 week",
      lastMessage: "Considering organic farming? Let's discuss the benefits.",
      profilePicture: img5,
      unreadMessages: 3,
    },
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity className="flex-row justify-start gap-x-2 mt-4 bg-[#f0f0f0] my-4 border-b-[0.2px] pb-2 border-b-gray-400">
      <Image
        source={item.profilePicture}
        className=" w-[60px] h-[60px] rounded-xl "
      />
      <View style={styles.expertDetails}>
        <View className="flex-row justify-between">
          <View className="w-5/6">
            <View className="flex-row justify-between pr-4">
              <Text style={styles.expertName}>{item.name}</Text>
            </View>
            <Text style={styles.lastMessage}>{item.lastMessage}</Text>
          </View>
          {item.unreadMessages !== 0 ? (
            <View className="">
              <Text style={styles.lastChatTime} className="mb-2">
                {item.lastChatTime}
              </Text>
              <View className="w-6 h-6 rounded-full bg-green-500 flex-row justify-center items-center">
                <Text className="text-xs text-white">
                  {item.unreadMessages}
                </Text>
              </View>
            </View>
          ) : (
            ""
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="mx-4 h-full">
      <View className="flex-row justify-between gap-x-4 mb-2 shadow-sm">
        <View className="my-2 w-5/6   bg-gray-50 flex-row items-center justify-start border-gray-300 border-2 rounded-md">
          <View className="border-r-1 border-gray-400 pl-2">
            <FontAwesomeIcon name="search" size={15} color="green" />
          </View>
          <TextInput
            placeholder="Search"
            className="mx-2 w-5/6 py-3 px-2 text-gray-800"
          />
        </View>
        <TouchableOpacity className=" flex-row justify-center items-center mt-2   rounded-full py-3 px-3 shadow-lg mr-4 bg-green-600 ">
          <View className="flex-row justify-between items-center gap-2">
            <MaterialIcons name="person-add" size={15} color={"white"} />
          </View>
        </TouchableOpacity>
      </View>
      <FlatList
        data={agricultureExperts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  expertItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  expertDetails: {
    flex: 1,
  },
  expertName: {
    fontWeight: "bold",
    fontSize: 16,
  },
  lastChatTime: {
    color: "#666",
    fontSize: 12,
  },
  lastMessage: {
    color: "#333",
  },
});

export default ExpertChats;
