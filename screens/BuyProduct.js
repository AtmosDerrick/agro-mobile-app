import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  Pressable,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { database } from "../firebase.config";
import { useRoute } from "@react-navigation/native";
import { getDatabase, ref, child, get } from "firebase/database";
import BottomModal from "../components/BottomModal";
import call from "react-native-phone-call";

const BuyProduct = ({ navigation }) => {
  const img2 = require("../images/img2.jpg");
  const [products, setProducts] = useState();
  const [ready, setReady] = useState(false);
  const [makeAnOffer, setMakeAnOffer] = useState(false);
  const route = useRoute();

  const id = route.params?.id;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setReady(true);
    const dbRef = ref(getDatabase());
    get(child(dbRef, `Products/${id}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setProducts(snapshot.val());
          setReady(false);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  //call function
  const args = {
    number: products && products.phone, // String value with the number to call
    prompt: false, // Optional boolean property. Determines if the user should be prompted prior to the call
    skipCanOpen: true, // Skip the canOpenURL check
  };

  const handleCall = () => {
    call(args).catch(console.error);
  };

  // const product = {
  //   id: 1, // Unique identifier for the product
  //   image: img2, // Image URL or path
  //   name: "Smartphone X",
  //   location: "City, Country",
  //   datePosted: "2023-01-01", // Date when the product was posted
  //   price: 499.99, // Price of the product
  //   brand: "ABC Electronics",
  //   model: "X-1000",
  //   condition: "New", // Possible values: "New", "Used", etc.
  //   description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ...", // Product description
  //   // You can add more attributes based on your requirements
  //   // For example: seller information, shipping details, etc.
  //   address: {
  //     street: "123 Main Street",
  //     city: "Cityville",
  //     state: "State",
  //     zipCode: "12345",
  //     country: "Country",
  //   },
  // };

  useEffect(() => {
    navigation.getParent()?.setOptions({
      headerShown: false,
    });
    return () =>
      navigation.getParent()?.setOptions({
        headerShown: true,
      });
  }, [navigation]);

  if (ready) {
    <ActivityIndicator color={"#ff0000"} animating size={"large"} />;
  }

  return (
    <ScrollView className="w-full bg-gray-100 mb-28">
      {products ? (
        <View>
          {makeAnOffer ? <BottomModal /> : ""}
          <View className="bg-gray-50 pb-4">
            <View style={styles.imageContainer}>
              {products && products.productImage && products.productImage[0] ? (
                <Image
                  source={{ uri: products.productImage[0] }}
                  style={styles.image}
                  resizeMode="cover"
                />
              ) : null}
            </View>
            <View className="px-4 mt-4 ">
              <View className="flex-row justify-between">
                <View className="flex-row  gap-x-2 mb-2">
                  <MaterialIcons name="place" size={15} color={"gray"} />
                  <Text className="text-xs font-semibold text-gray-500">
                    {products.region}, {products.town}
                  </Text>
                  <Text className="text-xs font-semibold text-gray-500">
                    {products.datePosted}
                  </Text>
                </View>
                <Text className="text-orange-500">{products.serviceType}</Text>
              </View>

              <Text className="text-lg font-semibold">
                {products.productName}
              </Text>
              <Text className="text-base text-green-500 font-semibold">
                {`Gh\u20B5 `}
                {products.price}
              </Text>
            </View>
            <View className="flex-row justify-between  mt-4 gap-x-2 px-4 ">
              <TouchableOpacity
                className="border-2 border-green-500 py-2 px-6 rounded-lg flex-row justify-center gap-x-2 items-center"
                onPress={() => {
                  setMakeAnOffer(!makeAnOffer);
                }}>
                <MaterialIcons name="message" size={17} color={"green"} />
                <Text className="text-green-500">Make an Offer</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className=" bg-green-700 py-2 px-6 rounded-lg flex-row justify-center gap-x-2 items-center"
                onPress={handleCall}>
                <MaterialIcons name="call" size={17} color={"white"} />
                <Text className="text-white font-semibold">Call</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View className="bg-gray-50 mt-2 p-4">
            <View className="flex-row justify-between items-center my-2">
              <Text className=" text-gray-500">Brand</Text>
              <Text>{products.brand}</Text>
            </View>
            <View className="flex-row justify-between items-center my-2">
              <Text className=" text-gray-500">Model</Text>
              <Text>{products.model}</Text>
            </View>
            <View className="flex-row justify-between items-center my-2">
              <Text className="w-1/4 text-gray-500">Phone No.: </Text>
              <Text className="w-full font-semibold text-orange-500">
                {products.phone}
              </Text>
            </View>
          </View>
          <View className="bg-gray-50 mt-2 p-4">
            <View className="flex-row justify-between items-center my-2">
              <Text>{products.description}</Text>
            </View>
          </View>
          {
            // <View className="bg-gray-50 mt-2 p-4">
            // <View className="flex-row justify-start items-center gap-x-2 my-2">
            //   <MaterialIcons name="place" size={15} color={"gray"} />
            //   <View>
            //     <Text>
            //       {products.address.state}, {""}
            //       {products.address.city}, {products.address.street},{" "}
            //       {products.address.country},
            //     </Text>
            //   </View>
            // </View>
            // </View>
          }
          <View className="bg-gray-50 mt-2 p-4">
            <View className="flex-row justify-start items-center gap-x-2 my-2">
              <MaterialIcons name="access-time" size={15} color={"gray"} />

              {products.serviceType === "hiring" ? (
                <View>
                  <View>
                    <Text>
                      <Text className="text-green-500 text-xs">
                        {" "}
                        Opennig Time
                      </Text>{" "}
                      <Text>Mon. - Sat., 07:00 - 17:00</Text>
                    </Text>
                  </View>
                </View>
              ) : (
                ""
              )}
            </View>
          </View>

          <View className="mx-4 mt-4">
            <TouchableOpacity className="border-2 border-green-500 py-3 px-6 rounded-md flex-row justify-center gap-x-2 items-center bg-white">
              <Text className="text-green-500">Request Seller to Call</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View className="w-full h-[500px] flex-row justify-center items-center">
          <View>
            <ActivityIndicator color={"#ff0000"} animating size={"large"} />
          </View>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    width: "100%",
    height: 350,
    padding: 12,
    backgroundColor: "white",
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    overflow: "hidden",
  },
  image: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});
export default BuyProduct;
