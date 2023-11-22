import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  Image,
  ScrollView,
} from "react-native";
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import { ActivityIndicator, Avatar } from "react-native-paper";
import { baseUrl } from "../Utils";

const ProductCard = ({ title, img, category, price }) => {
  return (
    <TouchableOpacity className="bg-white w-[45%] border border-gray-100 p-2 rounded-lg m-2">
      <Image
        className="h-28 w-full mb-3"
        resizeMethod="resize"
        resizeMode="contain"
        source={{ uri: img }}
      />
      <View className="flex items-center gap-1">
        <Text className="text-base font-bold">{title}</Text>
        <Text className="text-sm font-bold capitalize text-gray-500">
          {category}
        </Text>
        <Text className="text-base font-bold">₹ {price}</Text>
      </View>
    </TouchableOpacity>
  );
};

const Home = () => {
  const [products, setProducts] = useState([]);
  const [unchangedProducts, setUnchangedProducts] = useState([]);
  const [query, setQuery] = useState("");
  const [selectedCat, setSelectedCat] = useState(null);
  const [Loading, setLoading] = useState(false);
  const [DATA, setDATA] = useState([
    {
      id: "0",
      selected: true,
      title: "all products",
    },
    {
      id: "1",
      selected: false,
      title: "electronics",
    },
    {
      id: "2",
      selected: false,
      title: "jewelery",
    },
    {
      id: "3",
      selected: false,
      title: "men's clothing",
    },
    {
      id: "4",
      selected: false,
      title: "women's clothing",
    },
  ]);

  // console.log("prodcts", products);
  const onRadioBtnClick = (item) => {
    let updatedState = DATA.map((isLikedItem) =>
      isLikedItem.id === item.id
        ? { ...isLikedItem, selected: true }
        : { ...isLikedItem, selected: false }
    );
    setDATA(updatedState);
  };

  const getProducts = async () => {
    try {
      setLoading(true);
      let data;
      if (selectedCat && selectedCat != "all products")
        data = await fetch(
          `${baseUrl}/products/category/${selectedCat}?limit=10`
        );
      else data = await fetch(`${baseUrl}/products?limit=10`);
      const res = await data.json();
      setProducts(res);
      setUnchangedProducts(res);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("get product error ->", error);
    }
  };

  useEffect(() => {
    getProducts();
  }, [selectedCat]);

  useEffect(() => {
    if (query.length > 0) {
      const filterProducts = unchangedProducts.filter((item) =>
        item.title.includes(query)
      );
      setProducts(filterProducts);
    } else setProducts(unchangedProducts);
  }, [query]);

  return (
    <View>
      {/* *************** greetings and branding ********************/}
      <View className="flex gap-0.5">
        <Text className="font-bold text-2xl">Welcome to,</Text>
        <Text className="font-medium text-lg text-gray-500">
          Reverd Harbals Marketing Pvt. Ltd.
        </Text>
      </View>
      {/* *************** Searchbar and filter ********************/}
      <View className="flex flex-row items-center justify-between my-5">
        <View className="w-full bg-gray-100 py-2 px-5 flex flex-row items-center rounded-full">
          <AntDesign name="search1" size={24} color="black" />
          <TextInput
            className="ml-4 text-base text-gray-800"
            onChangeText={(text) => setQuery(text)}
            placeholder={`Search`}
            mode="outlined"
          />
        </View>
        {/* <TouchableOpacity>
          <Avatar.Icon
            className="bg-black"
            icon={() => (
              <MaterialCommunityIcons
                name="tune-variant"
                size={20}
                color="white"
              />
            )}
            size={40}
          />
        </TouchableOpacity> */}
      </View>
      {/* *************** category bar ********************/}
      <View>
        <Text className="text-lg font-bold mb-2">Categories</Text>
        <FlatList
          horizontal={true}
          data={DATA}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                onRadioBtnClick(item);
                setSelectedCat(item.title);
              }}
              className={`border border-gray-300 ${
                item.selected ? "bg-black" : "bg-transparent"
              } py-2 px-3 rounded-full mr-3`}
              key={item.id}
            >
              <Text
                className={`font-semibold text-sm capitalize ${
                  item.selected ? "text-white" : "text-black"
                }`}
              >
                {item.title}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
      {/* *************** top products ********************/}
      <View className="mt-5">
        {/* <Text className="text-lg font-bold mb-2">Top Products</Text> */}
        {Loading ? (
          <ActivityIndicator
            className="mt-20"
            animating={true}
            color="purple"
            size={"large"}
          />
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            className=" h-[55vh]"
          >
            <View className="flex flex-row flex-wrap">
              {products?.map((item) => (
                <ProductCard
                  key={item.id}
                  title={item?.title}
                  img={item?.image}
                  category={item?.category}
                  price={item?.price}
                />
              ))}
            </View>
          </ScrollView>
        )}
      </View>
    </View>
  );
};

export default Home;
