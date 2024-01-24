import React, { useState, useEffect, useContext } from "react";
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
import { UserContext } from "../ContextApi/Context";

import {
  getDatabase,
  ref,
  onValue,
  child,
  push,
  update,
  get,
} from "firebase/database";

const SocialMedia = ({ navigation }) => {
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [selectedTweetId, setSelectedTweetId] = useState(null);
  const [tweets, setTweets] = useState([]);
  const [ready, setReady] = useState(false);
  const [pastPosts, setPastPost] = useState();
  const [likeLoading, setLikeLoading] = useState(false);
  const { setUser, user, setUserInfo, userInfo } = useContext(UserContext);

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

  const db = getDatabase();
  const dbRef = ref(getDatabase());

  useEffect(() => {
    fetchData();
    console.log("dont move");
  }, []);

  const fetchData = async () => {
    const starCountRef = ref(db, "Posts/");
    onValue(
      starCountRef,
      (snapshot) => {
        const data = snapshot.val();
        if (data) {
          // Convert the object values into an array
          const dataArray = Object.values(data);
          setTweets(dataArray);
        }
        setReady(false);
      },
      (error) => {
        console.error("Error fetching data:", error);
        setError("Error fetching data");
        setReady(false);
      }
    );
  };

  const [bookmarkStates, setbookmarkStates] = useState(tweets.map(() => false));

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
    const newbookmarkStates = [...bookmarkStates];
    newbookmarkStates[index] = !newbookmarkStates[index];
    setbookmarkStates(newbookmarkStates);
  };

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      className="bg-[#f0f0f0] my-4 border-b-[0.2px] pb-2 border-b-gray-400 "
      onPress={() => {
        navigation.navigate("onetweet", {
          id: item.id,
          userInfo,
        });
      }}>
      <View className="flex-row gap-x-1 ">
        <Image
          source={{ uri: item.profileImage }}
          className="w-[50px] h-[50px] rounded-full "
        />

        <View className="">
          <View className="flex-row gap-x-2">
            <Text style={{ fontWeight: "bold" }}>
              {item.profileFirstName} {item.profileLastName}
            </Text>
            <Text className="text-xs text-gray-600">@{item.username}</Text>

            <Text className="text-xs">{item.postDuration}</Text>
          </View>
          <View className="pr-16">
            <View className="">
              <Text className="text-sm pb-1  ">{item.text}</Text>
              {item.postImage && item.postImage.length > 0 ? (
                // Render the image if it exists
                <View className=" w-full h-[3rem] mt-3">
                  <Image
                    source={{ uri: item.postImage[0] }}
                    style={{ width: 250, height: 150, borderRadius: 10 }}
                    resizeMode="cover"
                  />
                </View>
              ) : null}
            </View>
            <View className="flex-row justify-start mt-2 gap-x-8 items-center">
              <TouchableOpacity
                className="flex-row gap-x-2"
                onPress={() => handleLikePress(item.id)}>
                {
                  //like icons
                }
                <Fontisto
                  name={
                    item.like && item.like.includes(userInfo.username)
                      ? "like"
                      : "like"
                  }
                  size={20}
                  color={
                    item.like && item.like.includes(userInfo.username)
                      ? "blue"
                      : "gray"
                  }
                />

                <View className="pt-1">
                  <Text>{item.like && item.like.length}</Text>
                </View>
              </TouchableOpacity>

              {
                // <TouchableOpacity
                // className="flex-row gap-x-2"
                // onPress={() => {
                //   setShowCommentInput(!showCommentInput);
                //   setSelectedTweetId(item.id);
                // }}>
                // {
                //   //like comment icons
                // }
                // <Fontisto name="comments" size={15} color="gray" />
                // <Text>{item.comments}</Text>
                // </TouchableOpacity>
              }

              <TouchableOpacity
                className="flex-row gap-x-2"
                onPress={() => handleBookmarkPress(index)}>
                {
                  //like comment
                }
                <Fontisto
                  name={bookmarkStates[index] ? "bookmark-alt" : "bookmark"}
                  size={20}
                  color={bookmarkStates[index] ? "blue" : "gray"}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      {
        // showCommentInput && selectedTweetId === item.id && (
        // <View className="flex-row justify-between mx-4 px-4 mt-4 items-center gap-x-2 ">
        //   <View className="w-5/6">
        //     <TextInput
        //       style={styles.commentInput}
        //       placeholder="Write a comment..."
        //       multiline
        //       maxLength={20}
        //     />
        //   </View>
        //   <TouchableOpacity>
        //     <FontAwesomeIcon name="send" size={20} color="gray" />
        //   </TouchableOpacity>
        // </View>
        // )
      }
    </TouchableOpacity>
  );

  return (
    <KeyboardAvoidingView className="mx-2 flex-1">
      <FlatList
        data={tweets}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
      <TouchableOpacity
        className="  flex-row justify-center items-center mt-2  rounded-full py-4 px-4 shadow-lg mr-4 bg-green-600 absolute bottom-3 right-3"
        onPress={() => {
          navigation.navigate("addtweet");
        }}>
        <View className="flex-row justify-between items-center gap-2">
          <FontAwesomeIcon name="plus" size={15} color={"white"} />
        </View>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({});

export default SocialMedia;
