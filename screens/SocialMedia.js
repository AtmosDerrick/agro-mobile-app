import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import Fontisto from "react-native-vector-icons/Fontisto";

const SocialMedia = () => {
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [selectedTweetId, setSelectedTweetId] = useState(null);

  const img1 = require("../images/tweet1.jpg");
  const img2 = require("../images/tweet2.jpg");
  const img3 = require("../images/tweet3.jpg");
  const img4 = require("../images/tweet4.jpg");
  const img5 = require("../images/tweet5.jpg");

  const tweetimg1 = require("../images/tweetimage1.jpg");
  const tweetimg2 = require("../images/tweetimage2.jpg");
  const tweetimg3 = require("../images/tweetimage3.jpg");
  const tweetimg4 = require("../images/tweetimage4.jpg");
  const tweetimg5 = require("../images/tweetimage5.jpg");

  const agricultureTweets = [
    {
      id: 1,
      profileImage: img1,
      name: "John Farmer",
      username: "@johnfarmer",
      postDuration: "2 hrs ago",
      tweet:
        "Just harvested the best crop of tomatoes from my farm! 🍅 #FarmLife #Agriculture",
      likes: 25,
      comments: 8,
    },
    {
      id: 2,
      profileImage: img2,
      name: "Emily Agro",
      username: "@emily_agro",
      postDuration: "4 hrs ",
      tweet:
        "Excited to share my latest blog post on sustainable farming practices. Check it out! #SustainableAg #Farming",
      likes: 45,
      comments: 12,
      images: [tweetimg1], // Add an "images" property with an array of images
    },
    {
      id: 3,
      profileImage: img3,
      name: "Green Fields Co.",
      username: "@greenfields",
      postDuration: "6 hrs ",
      tweet:
        "Our team is working hard to bring you fresh, organic produce straight from our fields. Stay tuned for updates! 🌱 #OrganicFarming",
      likes: 60,
      comments: 20,
    },
    {
      id: 4,
      profileImage: img4,
      name: "Agritech Innovations",
      username: "@agritech_inno",
      postDuration: "10 hrs ",
      tweet:
        "Introducing our new smart irrigation system! Save water, increase efficiency. #Agritech #Innovation",
      likes: 32,
      comments: 10,
      images: [tweetimg3], // Add an "images" property with an array of images
    },
    {
      id: 5,
      profileImage: img5,
      name: "Farmers United",
      username: "@farmers_united",
      postDuration: "1 day ",
      tweet:
        "Join us this weekend for a farmers' market showcasing the best local produce. Support local farmers! 🚜🌾 #FarmersMarket",
      likes: 75,
      comments: 15,
      images: [tweetimg4], // Add an "images" property with an array of images
    },
  ];

  const [likeStates, setLikeStates] = useState(
    agricultureTweets.map(() => false)
  );

  const [bookmarkStates, setbookmarkStates] = useState(
    agricultureTweets.map(() => false)
  );

  const handleLikePress = (index) => {
    // Update the like state for the clicked tweet
    const newLikeStates = [...likeStates];
    newLikeStates[index] = !newLikeStates[index];
    setLikeStates(newLikeStates);
  };

  const handleBookmarkPress = (index) => {
    // Update the like state for the clicked tweet
    const newbookmarkStates = [...bookmarkStates];
    newbookmarkStates[index] = !newbookmarkStates[index];
    setbookmarkStates(newbookmarkStates);
  };

  const renderItem = ({ item, index }) => (
    <View className="bg-[#f0f0f0] my-4 border-b-[0.2px] pb-2 border-b-gray-400 ">
      <View className="flex-row gap-x-1 ">
        <Image
          source={item.profileImage}
          className="w-[50px] h-[50px] rounded-full "
        />
        <View className="">
          <View className="flex-row gap-x-2">
            <Text style={{ fontWeight: "bold" }}>{item.name}</Text>
            <Text className="text-xs text-gray-600">{item.username}</Text>
            <Text className="text-xs">{item.postDuration}</Text>
          </View>
          <View className="pr-16">
            <View className="">
              <Text className="text-sm pb-1  ">{item.tweet}</Text>
              {item.images && item.images.length > 0 ? (
                // Render the image if it exists
                <Image
                  source={item.images[0]}
                  style={{ width: "100%", height: 200, borderRadius: 10 }}
                  resizeMode="cover"
                />
              ) : null}
            </View>
            <View className="flex-row justify-start mt-2 gap-x-8">
              <TouchableOpacity
                className="flex-row gap-x-2"
                onPress={() => handleLikePress(index)}>
                <Fontisto
                  name={likeStates[index] ? "like" : "like"}
                  size={15}
                  color={likeStates[index] ? "blue" : "gray"}
                />
                <Text>{item.likes}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="flex-row gap-x-2"
                onPress={() => {
                  setShowCommentInput(!showCommentInput);
                  setSelectedTweetId(item.id);
                }}>
                <Fontisto name="comments" size={15} color="gray" />
                <Text>{item.comments}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="flex-row gap-x-2"
                onPress={() => handleBookmarkPress(index)}>
                <Fontisto
                  name={bookmarkStates[index] ? "bookmark-alt" : "bookmark"}
                  size={15}
                  color={bookmarkStates[index] ? "blue" : "gray"}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      {showCommentInput && selectedTweetId === item.id && (
        <View className="flex-row justify-between mx-4 items-center gap-x-2">
          <View className="w-5/6">
            <TextInput
              style={styles.commentInput}
              placeholder="Write a comment..."
              multiline
              maxLength={10}
            />
          </View>
          <TouchableOpacity>
            <FontAwesomeIcon name="send" size={20} color="gray" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  return (
    <KeyboardAvoidingView className="mx-2">
      <FlatList
        data={agricultureTweets}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
      <TouchableOpacity className="  flex-row justify-center items-center mt-2  rounded-full py-4 px-4 shadow-lg mr-4 bg-green-600 absolute bottom-3 right-3">
        <View className="flex-row justify-between items-center gap-2">
          <FontAwesomeIcon name="plus" size={15} color={"white"} />
        </View>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({});

export default SocialMedia;
