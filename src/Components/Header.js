import React from "react";
import { View, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Avatar } from "react-native-paper";
import Logo from "../../assets/icon.png";

const Header = () => {
  return (
    <View className="flex flex-row items-center justify-between px-2 py-4">
      <TouchableOpacity>
        <Avatar.Icon
          className="bg-black"
          icon={() => <AntDesign name="bars" color="white" size={24} />}
          size={40}
        />
      </TouchableOpacity>
      <Avatar.Image source={Logo} size={40} />
    </View>
  );
};

export default Header;
