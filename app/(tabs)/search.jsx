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
  const [isUserSearchedData, setIsUserSearchedData] = useState(false);

  const getDatasOfSearch = async () => {
    setLoading(true);
    if (search.length === 0) return;
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${key.APIKEY}&query=${search}`
      );
      setDatasFromSearch(response.data.results);
      setIsUserSearchedData(true);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setSearch("");
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
          className="border px-2  border-gray-500 w-[80%] text-white placeholder:text-gray-200"
        />
        <AntDesign
          onPress={getDatasOfSearch}
          className="absolute right-14 top-5 cursor-pointer"
          size={24}
          disabled={search === ""}
          name="search1"
          color="gray"
        />
      </View>
      {!loading ? (
        isUserSearchedData && datasFromSearch.length === 0 ? (
          <View className="items-center pt-40 w-full h-full opacity-80">
            <AntDesign name="frown" size={50} color="gray" />
            <Text className="text-white text-3xl font-bold mt-4">
              No Results Found
            </Text>
            <Text className="text-gray-400 text-base mt-2">
              Try searching for a different movie or series.
            </Text>
          </View>
        ) : (
          <FlatList
            contentContainerStyle={{ gap: 50 }}
            data={datasFromSearch}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <SearchMovie item={item} />}
          />
        )
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
