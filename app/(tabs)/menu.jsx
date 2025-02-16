import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import netflixLogo from "../../assets/netflixlogoo.png";
import { useRouter } from "expo-router";

const Menu = () => {
  const router = useRouter();
  return (
    <SafeAreaView className="flex-1 bg-black px-6">
      {/* Netflix Logo */}
      <View className="items-center my-6">
        <Image source={netflixLogo} className="w-32 h-20" resizeMode="contain" />
      </View>

      {/* Menu Items */}
      <View className="mt-4">
        <TouchableOpacity
        onPress={()=>router.push("/home")}
        className="flex-row items-center gap-4 py-3 px-4 rounded-md">
          <Ionicons name="home-outline" size={24} color="white" />
          <Text className="text-white text-lg">Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
        onPress={()=>router.push("/search")}
        className="flex-row items-center gap-4 py-3 px-4 rounded-md">
          <Ionicons name="search-outline" size={24} color="white" />
          <Text className="text-white text-lg">Search</Text>
        </TouchableOpacity>

        <TouchableOpacity
        onPress={()=>router.push("/movies/movie")}
        className="flex-row items-center gap-4 py-3 px-4 rounded-md">
          <MaterialIcons name="movie" size={24} color="white" />
          <Text className="text-white text-lg">Movies</Text>
        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center gap-4 py-3 px-4 rounded-md">
          <Ionicons name="tv-outline" size={24} color="white" />
          <Text className="text-white text-lg">TV Series</Text>
        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center gap-4 py-3 px-4 rounded-md">
          <Ionicons name="bookmark-outline" size={24} color="white" />
          <Text className="text-white text-lg">My List</Text>
        </TouchableOpacity>
      </View>

     
    </SafeAreaView>
  );
};

export default Menu;
