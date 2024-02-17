import React, { useState, useContext, useEffect } from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import { getDatabase, ref, onValue } from "firebase/database";
import { UserContext } from "../ContextApi/Context";

const SellerStore = ({ navigation, handleOrder }) => {
  const { user, setUserInfo, userInfo } = useContext(UserContext);

  const [product, setProduct] = useState();

  const img1 = require("../images/img1.jpg");
  const img2 = require("../images/img2.jpg");
  const img3 = require("../images/img3.jpg");
  const img4 = require("../images/img4.jpg");
  const img5 = require("../images/img5.jpg");
  const img6 = require("../images/img6.jpg");
  const img7 = require("../images/img7.jpg");
  const img8 = require("../images/img8.jpg");

  const db = getDatabase();

  useEffect(() => {
    const starCountRef = ref(db, "Products/");
    onValue(
      starCountRef,
      (snapshot) => {
        const data = snapshot.val();
        if (data) {
          // Convert the object values into an array
          const dataArray = Object.values(data);
          const filteredData = dataArray.filter((item) => {
            return item.username === userInfo.username;
          });
          setProduct(filteredData);
        }
      },
      (error) => {
        console.error("Error fetching data:", error);
        setError("Error fetching data");
        setReady(false);
      }
    );
  }, [userInfo.username]); // Include userInfo.username in the dependency array

  const products = [
    {
      id: 1,
      productName: "Irrigation Machine",
      price: "121",
      image: img1,
      location: "Kasoa, Eastern Region",
      serviceType: "Hiring",
    },
    {
      id: 2,
      productName: "Fertilizer",
      price: "50",
      image: img2,
      location: "Accra, Greater Accra Region",
      serviceType: "Selling",
    },

    {
      id: 3,
      productName: "Tractor",
      price: "300",
      image: img3,
      location: "Sunyani, Brong-Ahafo Region",
      serviceType: "Hiring",
    },
    {
      id: 4,
      productName: "Seeds Pack",
      price: "25",
      image: img4,
      location: "Tamale, Northern Region",
      serviceType: "Selling",
    },
    {
      id: 5,
      productName: "Plow",
      price: "80",
      image: img5,
      location: "Takoradi, Western Region",
      serviceType: "Hiring",
    },
    {
      id: 6,
      productName: "Gardening Tools Set",
      price: "40",
      image: img6,
      location: "Ho, Volta Region",
      serviceType: "Selling",
    },
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity
      className="flex-row justify-start mx-3 mb-2 bg-gray-200 rounded-md py-2 px-1 shadow-sm "
      onPress={() => {
        if (item.id) {
          handleOrder(item.id);
        } else {
          item.id = 0;
          handleOrder(0);
        }
      }}>
      <View>
        <View className="w-[100px] h-[100px] mr-4">
          <Image
            source={{ uri: item.productImage[0] }}
            className="w-[100px] h-[100px] rounded-md "
          />
        </View>
      </View>
      <View className="">
        <Text className="text-sm pt-4">
          <Text>{`Gh\u20B5`}</Text>
          {item.price}
        </Text>
        <Text className=" font-medium text-sm">{item.productName}</Text>
        <Text style={styles.status} className="">
          {item.serviceType}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View>
      <View className="">
        <View className="flex-row justify-between mx-4 items-center">
          <Text className="text-sm font-medium text-gray-600 my-4">
            Call Requested
          </Text>
          <View className="flex-row justify-start items-center gap-2">
            <View className="w-8 h-8 flex-row justify-center items-center bg-green-600 rounded-full">
              <Text className="font-semibold text-white drop-shadow-md">4</Text>
            </View>
          </View>
        </View>
        <FlatList
          data={product}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={1} // Set the number of columns to 2 for a two-column grid
          contentContainerStyle={styles.flatListContainer}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  flatListContainer: {
    paddingHorizontal: 6, // Add horizontal padding for a nice spread
  },
  itemContainer: {
    width: "100%",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between", // Add space between items
    marginBottom: 8,
  },
  imageContainer: {
    marginRight: 0,
  },
  image: {
    width: 180,
    height: 100,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "green",
  },

  price: {
    color: "#00cc00",
    fontSize: 16,
    fontWeight: "bold",
  },
  title: {
    fontSize: 14,
    fontWeight: "medium",
    color: "#333",
  },
  location: {
    fontSize: 10,
    color: "#666",
  },
  status: {
    fontSize: 12,
    color: "#ff0000",
  },
});

export default SellerStore;
