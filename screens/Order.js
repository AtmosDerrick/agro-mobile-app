import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  FlatList,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import { useRoute } from "@react-navigation/native";
import { getDatabase, ref, child, get } from "firebase/database";

const Order = ({ navigation }) => {
  const img1 = require("../images/img2.jpg");
  const [product, setProduct] = useState();

  const route = useRoute();

  const id = route.params?.id;

  useEffect(() => {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `Products/${id}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val(), "setting producte node");
          setProduct(snapshot.val());
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    navigation.getParent()?.setOptions({
      headerShown: false,
    });
    return () =>
      navigation.getParent()?.setOptions({
        headerShown: true,
      });
  }, [navigation]);

  const customers = [
    {
      id: 1,
      name: "John Doe",
      location: "City A",
      phoneNumber: "123-456-7890",
    },
    {
      id: 2,
      name: "Jane Smith",
      location: "City B",
      phoneNumber: "987-654-3210",
    },
    {
      id: 3,
      name: "Bob Johnson",
      location: "City C",
      phoneNumber: "555-123-4567",
    },
    // Add more customer objects as needed
  ];

  const renderItem = ({ item }) => (
    <View>
      {product && (
        <View className="my-2 border-b-[1px] pb-1 border-b-gray-400 flex-row justify-between items-center">
          <View>
            <Text className="text-base font-medium text-green-500">
              {item.name}
            </Text>
            <Text className="text-sm">{` ${item.location}`}</Text>
            <Text className="text-xs">{` ${item.phoneNumber}`}</Text>
          </View>
          <TouchableOpacity className="w-8 h-8 flex-row justify-center items-center bg-green-600 rounded-full shadow-md">
            <FontAwesomeIcon name="phone" size={20} color={"white"} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
  return (
    <View>
      <ScrollView className="mb-4">
        <View>
          {product ? (
            <View>
              {console.log(product, "ppp")}
              <View className="py-2 ">
                <Image
                  source={{ uri: product.productImage[0] }}
                  className="w-full h-[300px] "
                />
              </View>
              <View className="px-4 mt-4 flex-row justify-between">
                <View>
                  <Text className="text-lg font-medium text-gray-700">
                    {product.productName}
                  </Text>
                  <Text className="text-base font-medium text-gray-600">
                    {`Gh\u20B5 `}
                    {product.price}
                  </Text>
                </View>
                <View className=" flex-row justify-center items-center gap-4">
                  <FontAwesomeIcon
                    name="shopping-cart"
                    size={24}
                    color={"green"}
                  />
                  <Text className="text-lg font-medium">3</Text>
                </View>
              </View>
              <View className="mt-6  px-4">
                <View className="flex-row justify-between">
                  <Text className="text-base text-gray-600 font-medium">
                    Customers
                  </Text>
                  <TouchableOpacity>
                    <Text className="text-gray-500 font-medium">Clear</Text>
                  </TouchableOpacity>
                </View>
                <FlatList
                  data={customers}
                  renderItem={renderItem}
                  keyExtractor={(item) => item.id.toString()}
                />
              </View>
              <View className="w-full flex-row justify-between px-4 mt-8">
                <TouchableOpacity className=" bg-green-600 px-4 rounded-xl py-3 shadow-md">
                  <Text className="text-white font-medium">Edit Product</Text>
                </TouchableOpacity>
                <TouchableOpacity className=" border-green-600 border-2 px-4 rounded-xl py-3 shadow-md">
                  <Text className="text-green-600 font-medium">
                    Delete Product
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            ""
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Order;
