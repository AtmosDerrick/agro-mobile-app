import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, TextInput } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import Fontisto from "react-native-vector-icons/Fontisto";

const img1 = require("../images/tweet1.jpg");
const img4 = require("../images/tweet4.jpg");
const img5 = require("../images/tweet5.jpg");
const tweetimg1 = require("../images/tweetimage1.jpg");
const tweetimg4 = require("../images/tweetimage4.jpg");

const OneTweet = () => {
  const tweet = {
    name: "John Doe",
    username: "@john_doe",
    timePosted: "2 hours ago",
    tweetText: "This is a sample tweet. #SampleTweet",
    image: tweetimg1, // URL to the image
    profileImage: img1,
    datePosted: "2023-12-16", // YYYY-MM-DD format
    timePosted: "14:30", // HH:mm format
    likes: 50, // Number of likes
    comments: 20, // Number of comments
    replies: [
      {
        id: 1,
        name: "Alice",
        username: "@alice",
        profileImage: img5,
        timePosted: "1 hour ago",
        replyText: "Nice tweet, John!",
        datePosted: "2023-12-16", // YYYY-MM-DD format
        timePosted: "14:30", // HH:mm format
        likes: 20,
      },
      {
        id: 2,
        name: "Bob",
        username: "@bob",
        profileImage: img4,
        image: tweetimg4,
        timePosted: "30 minutes ago",
        replyText: "I agree!",
        datePosted: "2023-12-16", // YYYY-MM-DD format
        timePosted: "14:30", // HH:mm format
        likes: 50,
      },
    ],
  };

  const [likeState, setLikeState] = useState(false);
  const [bookmarkState, setBookmarkState] = useState(false);
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [selectedTweetId, setSelectedTweetId] = useState(null);
  const [repliedLikesState, setRepliedLikeState] = useState(
    tweet.replies.map(() => false)
  );

  const [repliedBookmarksState, setRepliedBookmarkState] = useState(
    tweet.replies.map(() => false)
  );

  const handleLikePress = (index) => {
    // Update the like state for the clicked tweet
    const newLikeStates = [...repliedLikesState];
    newLikeStates[index] = !newLikeStates[index];
    setRepliedLikeState(newLikeStates);
  };

  const handleBookmarkPress = (index) => {
    // Update the like state for the clicked tweet
    const newbookmarkStates = [...repliedBookmarksState];
    newbookmarkStates[index] = !newbookmarkStates[index];
    setRepliedBookmarkState(newbookmarkStates);
  };

  return (
    <ScrollView>
      <View
        style={{
          backgroundColor: "#f0f0f0",
          marginVertical: 4,
          paddingBottom: 2,
          borderBottomColor: "#ccc",
          borderBottomWidth: 0.2,
        }}
        onPress={() => {
          // Handle tweet press
        }}>
        <View
          style={{ flexDirection: "row", paddingHorizontal: 8, paddingTop: 8 }}>
          <Image
            source={tweet.profileImage}
            style={{ width: 50, height: 50, borderRadius: 25, marginRight: 8 }}
          />
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: "row", marginBottom: 4 }}>
              <Text style={{ fontWeight: "bold" }}>{tweet.name}</Text>
              <Text style={{ fontSize: 12, color: "gray", marginLeft: 4 }}>
                {tweet.username}
              </Text>
              <Text style={{ fontSize: 12, color: "gray", marginLeft: "auto" }}>
                {tweet.timePosted}
              </Text>
            </View>
            <View>
              <Text style={{ fontSize: 14 }}>{tweet.tweetText}</Text>
              {tweet.image && (
                <Image
                  source={tweet.image}
                  style={{
                    width: "100%",
                    height: 200,
                    borderRadius: 10,
                    marginTop: 8,
                  }}
                  resizeMode="cover"
                />
              )}
            </View>
            <View style={{ flexDirection: "row", marginTop: 8 }}>
              <TouchableOpacity
                style={{ flexDirection: "row", marginRight: 16 }}
                onPress={() => handleLikePress(null)}>
                <Fontisto
                  name={likeState ? "like" : "like"}
                  size={20}
                  color={likeState ? "blue" : "gray"}
                />
                <Text>{tweet.likes}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ flexDirection: "row", marginRight: 16 }}>
                <Fontisto name="comments" size={15} color="gray" />
                <Text>{tweet.comments}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ flexDirection: "row" }}
                onPress={() => handleBookmarkPress(null)}>
                <Fontisto
                  name={bookmarkState ? "bookmark-alt" : "bookmark"}
                  size={20}
                  color={bookmarkState ? "blue" : "gray"}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View className="ml-8 mt-0">
          {tweet.replies.map((reply, index) => (
            <View className="border-b-[0.2px] pb-2 border-b-gray-400   my-4">
              <TouchableOpacity
                key={index}
                className="flex-row justify-start items-center gap-x-2  ">
                <Image
                  source={reply.profileImage}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    marginRight: 8,
                  }}
                />
                <View className="">
                  <View className="flex-row justify-between mt-4">
                    <Text style={{ fontWeight: "bold" }}>{reply.name}</Text>
                    <Text
                      style={{ fontSize: 12, color: "gray", marginLeft: 4 }}>
                      {reply.username}
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        color: "gray",
                        marginLeft: "auto",
                      }}>
                      {reply.timePosted}
                    </Text>
                  </View>
                  <Text style={{ fontSize: 14 }}>{reply.replyText}</Text>
                  {reply.image && (
                    <Image
                      source={reply.image}
                      className="w-[250px] h-[150px] rounded-lg mt-2"
                    />
                  )}
                </View>
              </TouchableOpacity>
              <View className="flex-row gap-x-4 ml-8 mt-4">
                <TouchableOpacity
                  className="flex-row gap-x-2"
                  onPress={() => handleLikePress(index)}>
                  <Fontisto
                    name={repliedLikesState[index] ? "like" : "like"}
                    size={20}
                    color={repliedLikesState[index] ? "blue" : "gray"}
                  />
                  <Text>{reply.likes}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="flex-row gap-x-2"
                  onPress={() => {
                    setShowCommentInput(!showCommentInput);
                    setSelectedTweetId(reply.id);
                  }}>
                  <Fontisto name="comments" size={15} color="gray" />
                  <Text>{reply.comments}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ flexDirection: "row", marginRight: 16 }}>
                  <Fontisto name="comments" size={15} color="gray" />
                  <Text>{tweet.comments}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="flex-row gap-x-2"
                  onPress={() => handleBookmarkPress(index)}>
                  <Fontisto
                    name={
                      repliedBookmarksState[index] ? "bookmark-alt" : "bookmark"
                    }
                    size={20}
                    color={repliedBookmarksState[index] ? "blue" : "gray"}
                  />
                </TouchableOpacity>
              </View>
              {showCommentInput && selectedTweetId === reply.id && (
                <View className="flex-row justify-between mx-4 mt-2 items-center gap-x-2">
                  <View className="w-5/6">
                    <TextInput
                      style={{
                        flex: 1,
                        padding: 8,
                        backgroundColor: "#e0e0e0",
                        borderRadius: 8,
                      }}
                      placeholder="Write a comment..."
                      multiline
                      maxLength={20}
                    />
                  </View>
                  <TouchableOpacity onPress={() => console.log("Send comment")}>
                    <FontAwesomeIcon name="send" size={20} color="gray" />
                  </TouchableOpacity>
                </View>
              )}
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default OneTweet;
