import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import menuBackground from "../assets/menubackground.jpg";

const MovieItem = ({ item }) => {

  return (
    <View className="justify-center items-center">

      <Image
        style={{ width: 120, height: 160, borderRadius: 8 }}
        source={{uri:`https://image.tmdb.org/t/p/w500${item?.poster_path}`}}
        resizeMode="cover"
      />
    </View>
  );
};

export default MovieItem;
