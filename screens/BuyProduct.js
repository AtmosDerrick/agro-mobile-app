import React from "react";
import { View, StyleSheet, Image, Text, Pressable } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const BuyProduct = () => {
  const img2 = require("../images/img2.jpg");

  const product = {
    id: 1, // Unique identifier for the product
    image: img2, // Image URL or path
    name: "Smartphone X",
    location: "City, Country",
    datePosted: "2023-01-01", // Date when the product was posted
    price: 499.99, // Price of the product
    brand: "ABC Electronics",
    model: "X-1000",
    condition: "New", // Possible values: "New", "Used", etc.
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ...", // Product description
    // You can add more attributes based on your requirements
    // For example: seller information, shipping details, etc.
    address: {
      street: "123 Main Street",
      city: "Cityville",
      state: "State",
      zipCode: "12345",
      country: "Country",
    },
  };

  return (
    <ScrollView className="w-full bg-gray-200 mb-4 ">
      <View className="bg-gray-50 pb-4">
        <View>
          <Image source={product.image} className="w-full h-[300px]" />
        </View>
        <View className="px-4 mt-4 ">
          <View className="flex-row  gap-x-2 mb-2">
            <MaterialIcons name="place" size={15} color={"gray"} />
            <Text className="text-xs font-semibold text-gray-500">
              {product.location}
            </Text>
            <Text className="text-xs font-semibold text-gray-500">
              {product.datePosted}
            </Text>
          </View>

          <Text className="text-lg font-semibold">{product.name}</Text>
          <Text className="text-base text-green-500 font-semibold">
            {`Gh\u20B5 `}
            {product.price}
          </Text>
        </View>
        <View className="flex-row justify-between  mt-4 gap-x-2 px-4 ">
          <Pressable className="border-2 border-green-500 py-2 px-6 rounded-lg flex-row justify-center gap-x-2 items-center">
            <MaterialIcons name="message" size={17} color={"green"} />
            <Text className="text-green-500">Make an Offer</Text>
          </Pressable>
          <Pressable className="border-2 border-green-500 py-2 px-6 rounded-lg flex-row justify-center gap-x-2 items-center">
            <MaterialIcons name="call" size={17} color={"green"} />
            <Text className="text-green-500">Call</Text>
          </Pressable>
        </View>
      </View>
      <View className="bg-gray-50 mt-2 p-4">
        <View className="flex-row justify-between items-center my-2">
          <Text>Brand</Text>
          <Text>{product.brand}</Text>
        </View>
        <View className="flex-row justify-between items-center my-2">
          <Text>Model</Text>
          <Text>{product.model}</Text>
        </View>
        <View className="flex-row justify-between items-center my-2">
          <Text>Condition</Text>
          <Text>{product.condition}</Text>
        </View>
      </View>
      <View className="bg-gray-50 mt-2 p-4">
        <View className="flex-row justify-between items-center my-2">
          <Text>{product.description}</Text>
        </View>
      </View>
      <View className="bg-gray-50 mt-2 p-4">
        <View className="flex-row justify-start items-center gap-x-2 my-2">
          <MaterialIcons name="place" size={15} color={"gray"} />

          <View>
            <Text>
              {product.address.state}, {""}
              {product.address.city}, {product.address.street},{" "}
              {product.address.country},
            </Text>
          </View>
        </View>
      </View>
      <View className="bg-gray-50 mt-2 p-4">
        <View className="flex-row justify-start items-center gap-x-2 my-2">
          <MaterialIcons name="access-time" size={15} color={"gray"} />

          <View>
            <Text>
              <Text className="text-green-500 text-xs"> Opennig Time</Text> {""}
              <Text>Mon. - Sat., 07:00 - 17:00</Text>
            </Text>
          </View>
        </View>
      </View>

      <View className="mx-4 mt-4">
        <Pressable className="border-2 border-green-500 py-3 px-6 rounded-md flex-row justify-center gap-x-2 items-center bg-white">
          <Text className="text-green-500">Request Seller to Call</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({});

export default BuyProduct;
