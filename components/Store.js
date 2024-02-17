import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { getDatabase, ref, onValue } from "firebase/database";

const Store = ({ handleNavigate, setIndex, search }) => {
  const [fetchproducts, setFetchProducts] = useState([]);
  const [defaultProduct, setDefaultProduct] = useState([]);
  const [ready, setReady] = useState(true);
  const [error, setError] = useState(null);

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
          setFetchProducts(dataArray);
          setDefaultProduct(dataArray);
        }
        setReady(false);
      },
      (error) => {
        console.error("Error fetching data:", error);
        setError("Error fetching data");
        setReady(false);
      }
    );
  }, []);
  useEffect(() => {
    setFetchProducts(defaultProduct);
  }, [defaultProduct]);

  useEffect(() => {
    if (search !== "") {
      if (search.length >= 3) {
        const filteredProducts = defaultProduct.filter((product) => {
          return product.productName
            .toLowerCase()
            .includes(search.toLowerCase());
        });
        setFetchProducts(filteredProducts);
      }
    } else {
      setFetchProducts(defaultProduct);
    }
  }, [search]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      className="flex-row justify-between gap-4 mx-auto  mb-6"
      onPress={() => {
        handleNavigate(item.id);
      }}>
      <View>
        <View className="w-[160px] h-[160px]">
          {item.productImage && item.productImage.length > 0 ? (
            // Render the first image in the array
            <Image
              source={{ uri: item.productImage[0] }}
              className="w-[155px] h-[155px] rounded-xl border-[1px] border-gray-300 "
            />
          ) : (
            // Render a default image or some placeholder if no images are available
            // <Image
            //   source={require("../path/to/default/image.jpg")}
            //   className="w-[155px] h-[155px] rounded-xl "
            // />
            <View>
              <ActivityIndicator color={"#ff0000"} animating size={"large"} />
            </View>
          )}
        </View>
        <TouchableOpacity className="mb-2 ">
          <View className="flex-row justify-between">
            <Text className="text-green-500 text-sm font-semibold">
              <Text>{`Gh\u20B5`}</Text>
              {item.price}
            </Text>
            <Text style={styles.status} className="mr-2">
              {item.serviceType}
            </Text>
          </View>
          <Text className=" font-medium text-base">{item.productName}</Text>
          <Text className="text-xs mt-[-2px]">{item.region}</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView className="pb-12 bg-white">
      {ready ? (
        <View className="h-full flex-row items-center justify-center">
          <ActivityIndicator color={"#ff0000"} animating size={"large"} />
        </View>
      ) : error ? (
        <View>
          <Text>{error}</Text>
        </View>
      ) : (
        <FlatList
          data={fetchproducts}
          renderItem={renderItem}
          keyExtractor={(item) => item.name}
          numColumns={2} // Set the number of columns to 2 for a two-column grid
          contentContainerStyle={styles.flatListContainer}
        />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  flatListContainer: {
    paddingHorizontal: 6, // Add horizontal padding for a nice spread
    paddingBottom: 6,
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

export default Store;
