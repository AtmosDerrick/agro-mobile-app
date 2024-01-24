import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, TextInput } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import Fontisto from "react-native-vector-icons/Fontisto";

import { useRoute } from "@react-navigation/native";
import {
  getDatabase,
  ref,
  onValue,
  child,
  push,
  update,
  get,
} from "firebase/database";

const img1 = require("../images/tweet1.jpg");
const img4 = require("../images/tweet4.jpg");
const img5 = require("../images/tweet5.jpg");
const tweetimg1 = require("../images/tweetimage1.jpg");
const tweetimg4 = require("../images/tweetimage4.jpg");

const OneTweet = ({ navigation }) => {
  const [tweets, setTweets] = useState();
  const [pastPosts, setPastPost] = useState();

  const route = useRoute();

  const id = route.params?.id;
  const userInfo = route.params?.userInfo;

  console.log(id, "iiiiddd");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `Posts/${id}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val(), "setting producte node");
          setTweets(snapshot.val());
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

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
    const dbRef = ref(getDatabase());

    // Fetch the post data
    get(child(dbRef, `Posts/${index}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          // Use the callback function to get the latest state
          setPastPost((prevPost) => {
            const pastPosts = snapshot.val();

            // Check if the user's username is already in the like array
            const isUserLiked =
              pastPosts.like && pastPosts.like.includes(userInfo.username);

            // Toggle the like status
            const updatedLikes = isUserLiked
              ? pastPosts.like.filter(
                  (username) => username !== userInfo.username
                )
              : [...(pastPosts.like || []), userInfo.username];

            // Update the Firebase database with the updated like array
            update(child(dbRef, `Posts/${index}`), { like: updatedLikes })
              .then(() => {
                console.log("Like status updated successfully");
              })
              .catch((error) => {
                console.error("Error updating like status:", error);
              });

            // Return the updated post data
            return {
              ...prevPost,
              like: updatedLikes,
            };
          });
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleBookmarkPress = (index) => {
    // Update the like state for the clicked tweet
    const newbookmarkStates = [...repliedBookmarksState];
    newbookmarkStates[index] = !newbookmarkStates[index];
    setRepliedBookmarkState(newbookmarkStates);
  };

  useEffect(() => {
    navigation.getParent()?.setOptions({
      headerShown: false,
    });
    return () =>
      navigation.getParent()?.setOptions({
        headerShown: false,
      });
  }, [navigation]);
  return (
    <ScrollView>
      {tweets && (
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
            style={{
              flexDirection: "row",
              paddingHorizontal: 8,
              paddingTop: 8,
            }}>
            <Image
              source={{ uri: tweets.profileImage }}
              style={{
                width: 50,
                height: 50,
                borderRadius: 25,
                marginRight: 8,
              }}
            />
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: "row", marginBottom: 4 }}>
                <Text style={{ fontWeight: "bold" }}>
                  {tweets.profileFirstName} {tweets.profileLastName}
                </Text>
                <Text style={{ fontSize: 12, color: "gray", marginLeft: 4 }}>
                  {tweet.username}
                </Text>
                <Text
                  style={{ fontSize: 12, color: "gray", marginLeft: "auto" }}>
                  {tweet.timePosted}
                </Text>
              </View>
              <View>
                <Text style={{ fontSize: 14 }}>{tweets.text}</Text>
                {tweet.image && (
                  <Image
                    source={{ uri: tweets.postImage[0] }}
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
              <View
                style={{ flexDirection: "row" }}
                className="justify-start gap-x-4 items-center mt-4">
                <TouchableOpacity
                  className="flex-row gap-x-2"
                  onPress={() => handleLikePress(tweets.id)}>
                  {
                    //like icons
                  }
                  <Fontisto
                    name={
                      tweets.like && tweets.like.includes(userInfo.username)
                        ? "like"
                        : "like"
                    }
                    size={20}
                    color={
                      tweets.like && tweets.like.includes(userInfo.username)
                        ? "blue"
                        : "gray"
                    }
                  />

                  <View className="pt-1">
                    <Text>{tweets.like && tweets.like.length}</Text>
                  </View>
                </TouchableOpacity>

                {
                  // <TouchableOpacity
                  // style={{ flexDirection: "row", marginRight: 16 }}>
                  // <Fontisto name="comments" size={15} color="gray" />
                  // <Text>{tweet.comments}</Text>
                  // </TouchableOpacity>
                }
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

          {
            //   <View className="ml-8 mt-0">
            //   {tweet.replies.map((reply, index) => (
            //     <View className="border-b-[0.2px] pb-2 border-b-gray-400   my-4">
            //       <TouchableOpacity
            //         key={index}
            //         className="flex-row justify-start items-center gap-x-2  ">
            //         <Image
            //           source={reply.profileImage}
            //           style={{
            //             width: 40,
            //             height: 40,
            //             borderRadius: 20,
            //             marginRight: 8,
            //           }}
            //         />
            //         <View className="">
            //           <View className="flex-row justify-between mt-4">
            //             <Text style={{ fontWeight: "bold" }}>{reply.name}</Text>
            //             <Text
            //               style={{ fontSize: 12, color: "gray", marginLeft: 4 }}>
            //               {reply.username}
            //             </Text>
            //             <Text
            //               style={{
            //                 fontSize: 12,
            //                 color: "gray",
            //                 marginLeft: "auto",
            //               }}>
            //               {reply.timePosted}
            //             </Text>
            //           </View>
            //           <Text style={{ fontSize: 14 }}>{reply.replyText}</Text>
            //           {reply.image && (
            //             <Image
            //               source={reply.image}
            //               className="w-[250px] h-[150px] rounded-lg mt-2"
            //             />
            //           )}
            //         </View>
            //       </TouchableOpacity>
            //       <View className="flex-row gap-x-4 ml-8 mt-4">
            //         <TouchableOpacity
            //           className="flex-row gap-x-2"
            //           onPress={() => handleLikePress(index)}>
            //           <Fontisto
            //             name={
            //               tweets.like && tweets.like.includes(userInfo.username)
            //                 ? "like"
            //                 : "like"
            //             }
            //             size={20}
            //             color={
            //               tweets.like && tweets.like.includes(userInfo.username)
            //                 ? "blue"
            //                 : "gray"
            //             }
            //           />
            //           <Text>{reply.likes}</Text>
            //         </TouchableOpacity>
            //         <TouchableOpacity
            //           className="flex-row gap-x-2"
            //           onPress={() => {
            //             setShowCommentInput(!showCommentInput);
            //             setSelectedTweetId(reply.id);
            //           }}>
            //           <Fontisto name="comments" size={15} color="gray" />
            //           <Text>{reply.comments}</Text>
            //         </TouchableOpacity>
            //         <TouchableOpacity
            //           style={{ flexDirection: "row", marginRight: 16 }}>
            //           <Fontisto name="comments" size={15} color="gray" />
            //           <Text>{tweet.comments}</Text>
            //         </TouchableOpacity>
            //         <TouchableOpacity
            //           className="flex-row gap-x-2"
            //           onPress={() => handleBookmarkPress(index)}>
            //           <Fontisto
            //             name={
            //               repliedBookmarksState[index]
            //                 ? "bookmark-alt"
            //                 : "bookmark"
            //             }
            //             size={20}
            //             color={repliedBookmarksState[index] ? "blue" : "gray"}
            //           />
            //         </TouchableOpacity>
            //       </View>
            //       {showCommentInput && selectedTweetId === reply.id && (
            //         <View className="flex-row justify-between mx-4 mt-2 items-center gap-x-2">
            //           <View className="w-5/6">
            //             <TextInput
            //               style={{
            //                 flex: 1,
            //                 padding: 8,
            //                 backgroundColor: "#e0e0e0",
            //                 borderRadius: 8,
            //               }}
            //               placeholder="Write a comment..."
            //               multiline
            //               maxLength={20}
            //             />
            //           </View>
            //           <TouchableOpacity
            //             onPress={() => console.log("Send comment")}>
            //             <FontAwesomeIcon name="send" size={20} color="gray" />
            //           </TouchableOpacity>
            //         </View>
            //       )}
            //     </View>
            //   ))}
            // </View>
          }
        </View>
      )}
    </ScrollView>
  );
};

export default OneTweet;
