import { View, Text, TouchableOpacity, FlatList } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome } from "@expo/vector-icons";
import { UserContext } from "../../context/UserContext";
import SearchMovie from "../../components/SearchMovie";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
import key from "../../key/API";
import { usePathname } from "expo-router";
import axios from "axios";

const series = () => {
  const [series, setSeries] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const searchParams = usePathname();
  const { setWhereIsUser } = useContext(UserContext);

  const getSeries = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/tv/popular?api_key=${key.APIKEY}&language=en-US&page=${page}
`
      );
      console.log(response.data.results);
      
      setSeries((prevMovies) => [...prevMovies, ...response.data.results]);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSeries();
    setWhereIsUser(searchParams);
  }, []);

  return (
    <SafeAreaView className="bg-black w-full h-full">
      <View className="flex-row justify-between items-center p-4 px-12 pt-10 bg-black">
        <View className="flex-row items-center">
          <Text className="text-2xl text-white font-bold">Series</Text>
        </View>
        <TouchableOpacity>
          <FontAwesome name="search" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={series}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        contentContainerStyle={{ gap: 60, paddingBottom: 30 }}
        renderItem={({ item }) => <SearchMovie item={item} />}
        showsVerticalScrollIndicator={false}
        onEndReached={getSeries}
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

export default series;
