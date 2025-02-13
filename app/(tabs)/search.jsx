import {
  View,
  Text,
  Image,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import netflixLogo from "../../assets/netflixlogoo.png";
import AntDesign from "@expo/vector-icons/AntDesign";
import { UserContext } from "../../context/UserContext";
import key from "../../key/API";
import axios from "axios";
import SearchMovie from "../../components/SearchMovie";
import { ActivityIndicator, MD2Colors } from "react-native-paper";

const search = () => {
  const { setSearch, search, setDatasFromSearch, datasFromSearch } =
    useContext(UserContext);
  const [loading, setLoading] = useState(false);

  const getDatasOfSearch = async () => {
    setLoading(true);
    if (search.length === 0) return;
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${key.APIKEY}&query=${search}`
      );
      setDatasFromSearch(response.data.results);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="w-full h-full bg-black">
      <View className="items-center pt-10">
        <Image className="w-36 h-12" source={netflixLogo} />
      </View>
      <View className="items-center pt-3 relative">
        <TextInput
          onChangeText={(text) => setSearch(text)}
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

      {!loading ? (
        <FlatList
          contentContainerStyle={{ gap: 40 }}
          data={datasFromSearch}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <SearchMovie item={item} />}
        />
      ) : (
        <View className="pt-24">
          <ActivityIndicator
            size={"large"}
            animating={true}
            color={MD2Colors.blue800}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default search;
