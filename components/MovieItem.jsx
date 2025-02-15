import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import {useRouter} from "expo-router"
import menuBackground from "../assets/menubackground.jpg";
import { UserContext } from "../context/UserContext";

const MovieItem = ({ item }) => {
  const router = useRouter();
  const {setSingleData} = useContext(UserContext);

  return (
    <View className="justify-center items-center">

      <TouchableOpacity onPress={()=>{
        router.push(`/detail/${item.id}`)
        setSingleData(item);
      }}>
      <Image 
        style={{ width: 120, height: 160, borderRadius: 8 }}
        source={{uri:`https://image.tmdb.org/t/p/w500${item?.poster_path}`}}
        resizeMode="cover"
      />
      </TouchableOpacity>
    </View>
  );
};

export default MovieItem;
