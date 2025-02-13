import { View, Text, Image, TextInput } from "react-native";
import React, { useContext, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import netflixLogo from "../../assets/netflixlogoo.png";
import AntDesign from "@expo/vector-icons/AntDesign";
import {UserContext} from "../../context/UserContext"
import key from "../../key/API"
import axios from "axios"
import backgroundImage from "../../assets/menubackground.jpg"




const search = () => {
  const { setSearch,search,setDatasForSearch } = useContext(UserContext);

  const getDatasOfSearch = async()=>{
    if(search.length<0) return;
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${key.APIKEY}&query=${search}`)
      setDatasForSearch(response.data.result)
      
    } catch (error) {
      console.log(error);  
    }
  }

  return (
    <SafeAreaView className="w-full h-full bg-black">
      <View className="items-center pt-10">
        <Image className="w-36 h-12" source={netflixLogo} />
      </View>
      <View className="items-center pt-3 relative">
        <TextInput
          onChangeText={(text) =>setSearch(text) }
          value={search}
          placeholder="Enter a movie or series"
          className="border px-2  border-gray-500 w-[90%] text-white placeholder:text-gray-200"
        />
        <AntDesign
          onPress={getDatasOfSearch}
          className="absolute right-7 top-5 cursor-pointer"
          size={24}
          name="search1"
          color="gray"
        />
      </View>
      <View className="w-full h-[400px] bg-white items-center">
        <Image
        className="w-[300px] h-[200px]"
        resizeMode="contain" 
        source={backgroundImage}
        />
        <View className="w-full p-5 px-10">
          <Text className="text-black">Imdb/10</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default search;
