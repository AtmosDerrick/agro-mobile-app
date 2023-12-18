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

const img1 = require("../images/tweet1.jpg");
const img2 = require("../images/tweet2.jpg");
const img3 = require("../images/tweet3.jpg");
const img4 = require("../images/tweet4.jpg");
const img5 = require("../images/tweet5.jpg");
const img6 = require("../images/tweet6.jpg");
const img7 = require("../images/tweet7.jpg");

const Experts = () => {
  const agricultureExperts = [
    {
      id: 1,
      profilePic: img1,
      name: "John Farmer",
      specialization: "Crop Management",
      location: "California, USA",
      group: "Crop Farming",
      rating: 4.8,
    },
    {
      id: 2,
      profilePic: img7,
      name: "Emily Agronomist",
      specialization: "Soil Health",
      location: "Iowa, USA",
      group: "Crop Farming",
      rating: 4.5,
    },
    {
      id: 3,
      profilePic: img3,
      name: "Mark Horticulturist",
      specialization: "Horticulture",
      location: "Florida, USA",
      group: "Crop Farming",
      rating: 4.7,
    },
    {
      id: 4,
      profilePic: img6,

      name: "Anna Agribusiness",
      specialization: "Agribusiness",
      location: "Texas, USA",
      group: "Agribusiness",
      rating: 3.2,
    },
    {
      id: 5,
      profilePic: img5,

      name: "Sam Agricultural Engineer",
      specialization: "Precision Farming",
      location: "Arizona, USA",
      group: "Precision Farming",
      rating: 4.9,
    },
    {
      id: 6,
      profilePic: img4,
      name: "Linda Veterinarian",
      specialization: "Animal Health",
      location: "New York, USA",
      group: "Veterinary Experts",
      rating: 1,
    },
    {
      id: 7,
      profilePic: img2,
      name: "Chris Fish Farmer",
      specialization: "Aquaculture",
      location: "Alaska, USA",
      group: "Fish Farming",
      rating: 4.4,
    },
  ];

  const StarRating = ({ rating }) => {
    const renderStars = () => {
      const stars = [];
      for (let i = 1; i <= 5; i++) {
        const starColor = i <= rating ? "blue" : "gray";
        stars.push(
          <FontAwesomeIcon key={i} name="star" size={15} color={starColor} />
        );
      }
      return stars;
    };

    return <View className="flex-row my-2">{renderStars()}</View>;
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity className="flex-row justify-between mx-3 mt-2">
      <View className="">
        <Image
          source={item.profilePic}
          className=" w-[155px] h-[155px] rounded-xl "
        />
        <View className="mt-2">
          <Text className="text-sm font-semibold">{item.name}</Text>
          <Text className="text-sm text-green-500">{item.group}</Text>

          <Text className="text-xs text-gray-700">{item.specialization}</Text>
          <Text className="text-xs text-gray-700">{item.location}</Text>
          <StarRating rating={item.rating} />
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="mx-2 ">
      <View className="my-2 mx-2  bg-gray-50 flex-row items-center justify-start border-gray-300 border-2 rounded-md">
        <TextInput
          placeholder="Search"
          className="mx-2 w-5/6 py-3 px-2 text-gray-800"
        />
        <View className="border-r-1 border-gray-400 px-1">
          <TouchableOpacity>
            <FontAwesomeIcon name="search" size={20} color="green" />
          </TouchableOpacity>
        </View>
      </View>
      <View className="pb-28">
        <FlatList
          data={agricultureExperts}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
        />
      </View>

      <TouchableOpacity className="  flex-row justify-center items-center mt-2  rounded-full py-4 px-4 shadow-lg mr-4 bg-green-600 absolute bottom-20 right-3">
        <View className="flex-row justify-between items-center gap-2">
          <MaterialCommunityIcons
            name="message-badge"
            size={15}
            color={"white"}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Experts;
