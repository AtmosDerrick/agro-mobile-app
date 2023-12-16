import React from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";

const SellerStore = ({ navigation }) => {
  const img1 = require("../images/img1.jpg");
  const img2 = require("../images/img2.jpg");
  const img3 = require("../images/img3.jpg");
  const img4 = require("../images/img4.jpg");
  const img5 = require("../images/img5.jpg");
  const img6 = require("../images/img6.jpg");
  const img7 = require("../images/img7.jpg");
  const img8 = require("../images/img8.jpg");

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
    {
      id: 7,
      productName: "Sprinkler System",
      price: "150",
      image: img7,
      location: "Wa, Upper West Region",
      serviceType: "Hiring",
    },
    {
      id: 8,
      productName: "Pesticides",
      price: "30",
      image: img8,
      location: "Koforidua, Eastern Region",
      serviceType: "Selling",
    },
  ];

  const renderItem = ({ item }) => (
    <View className="flex-row justify-start mx-3 mb-2 bg-gray-200 rounded-md ">
      <View>
        <View className="w-[100px] h-[100px] mr-4">
          <Image
            source={item.image}
            className="w-[100px] h-[100px] rounded-md "
          />
        </View>
      </View>
      <View className="">
        <Text className="text-sm">
          <Text>{`Gh\u20B5`}</Text>
          {item.price}
        </Text>
        <Text className=" font-medium text-sm">{item.productName}</Text>
        <Text style={styles.status} className="">
          {item.serviceType}
        </Text>
        <View className="flex-row gap-4 mt-1 pb-1 w-full">
          <TouchableOpacity>
            <FontAwesomeIcon name="edit" size={20} color="green" />
          </TouchableOpacity>
          <TouchableOpacity>
            <FontAwesomeIcon name="trash" size={20} color="red" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <FlatList
      data={products}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      numColumns={1} // Set the number of columns to 2 for a two-column grid
      contentContainerStyle={styles.flatListContainer}
    />
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
