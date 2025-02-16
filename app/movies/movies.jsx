import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import key from "../../key/API";
import SearchMovie from "../../components/SearchMovie";
import { FontAwesome } from "@expo/vector-icons";
import { MD2Colors } from "react-native-paper";

const Movie = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const getMovies = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${key.APIKEY}&language=en-US&page=${page}`
      );

      setMovies((prevMovies) => [...prevMovies, ...response.data.results]);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <SafeAreaView className="bg-black w-full h-full">
      <View className="flex-row justify-between items-center p-4 px-12 pt-10 bg-black">
        <View className="flex-row items-center">
          <Text className="text-2xl text-white font-bold">Movies</Text>
        </View>
        <TouchableOpacity>
          <FontAwesome name="search" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={movies}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ gap: 60, paddingBottom: 30 }}
        renderItem={({ item }) => <SearchMovie item={item} />}
        showsVerticalScrollIndicator={false}
        onEndReached={getMovies}
        onEndReachedThreshold={0.8}
        ListFooterComponent={
          loading ? (
            <ActivityIndicator
              size={"large"}
              animating={true}
              color={MD2Colors.blue800}
            />
          ) : null
        }
      />
    </SafeAreaView>
  );
};

export default Movie;
