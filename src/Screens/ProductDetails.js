import React from "react";
import { View, Text, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import Header from "../Components/Header";

const ProductDetails = ({ navigation, route }) => {
  const { ProductDetails } = route?.params;
  //   console.log("product", ProductDetails);
  return (
    <SafeAreaView className="h-full bg-white">
      <View className="px-4">
        <Header />
        <View className="mt-6 p-3">
          <View className="bg-gray-50 p-2 rounded-lg border border-gray-100 mb-5">
            <Image
              className="h-60 w-full"
              resizeMethod="resize"
              resizeMode="contain"
              source={{ uri: ProductDetails?.image }}
            />

            <View className="bg-black py-2 px-3 absolute bottom-[-10px] right-[-10px] rounded-xl shadow">
              <View className="flex flex-row items-center justify-center">
                <AntDesign name="star" size={12} color="yellow" />
                <Text className="ml-2 text-white text-sm font-bold">
                  {ProductDetails?.rating?.rate}
                </Text>
              </View>
              <Text className="mt-1 text-white text-xs font-bold">
                {ProductDetails?.rating?.count} Reviews
              </Text>
            </View>
          </View>
          <View className="flex items-stretch gap-3">
            <Text className="text-lg font-bold">{ProductDetails?.title}</Text>
            <Text className="text-lg font-bold">₹ {ProductDetails?.price}</Text>
            <Text className="text-sm font-bold capitalize text-gray-500">
              {ProductDetails?.category}
            </Text>
            <ScrollView
              className=" h-[25vh]"
              showsVerticalScrollIndicator={false}
            >
              <View className="">
                <Text className="my-2 text-lg font-bold">Description</Text>
                <Text className="text-sm font-bold text-gray-500">
                  {ProductDetails?.description}
                </Text>
              </View>
            </ScrollView>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProductDetails;
