import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Linking,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import bg from "../../assets/menubackground.jpg";
import { UserContext } from "../../context/UserContext";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import { useRouter } from "expo-router";
import axios from "axios";
import key from "../../key/API";
import { ActivityIndicator, MD2Colors } from "react-native-paper";

const Detail = () => {
  const { singleData } = useContext(UserContext);
  const [detailData, setDetailData] = useState([]);
  const [endPoint, setEndPoint] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const getSpecificData = async () => {
    setLoading(true);
    try {
      const endpoint = singleData.first_air_date !== undefined ? "tv" : "movie";
      setEndPoint(endpoint);

      const response = await axios.get(
        `https://api.themoviedb.org/3/${endpoint}/${singleData.id}?api_key=${key.APIKEY}&language=en-US`
      );

      setDetailData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getSpecificData();
  }, []);

  return (
    <ScrollView className="w-full h-full bg-black relative">
      {!loading ? (
        <>
          <Image
            className="w-full h-[300px]"
            source={{
              uri: `https://image.tmdb.org/t/p/w500${singleData.backdrop_path}`,
            }}
            resizeMode="contain"
          />
          <AntDesign
            onPress={() => router.push("/home")}
            name="leftcircle"
            className="absolute top-14 left-4"
            size={30}
            color="gray"
          />

          <View className="p-4">
            <Text className="text-white text-3xl font-bold">
              {endPoint === "movie"
                ? singleData.original_title
                : detailData.name}
            </Text>
            <Text className="text-gray-400 text-lg mt-2">
              {endPoint === "movie"
                ? singleData.release_date
                : detailData.first_air_date}{" "}
              {"  |  "} ⭐ IMDb {singleData.vote_average.toFixed(1)} {"  |  "}{" "}
              ⏳{" "}
              {endPoint === "movie"
                ? `${detailData.runtime} min`
                : `${detailData.number_of_episodes} episodes`}{" "}
              | {"  |  "}
              {singleData.original_language.toUpperCase()}
            </Text>

            <Text className="text-gray-300 mt-4 text-base">
              {endPoint === "movie" ? singleData.overview : detailData.overview}
            </Text>
          </View>

          <View className="flex-row p-5 gap-9">
            <TouchableOpacity className="bg-red-600 px-6 py-3 rounded-lg flex-row items-center">
              <Ionicons name="play" size={24} color="white" />
              <Text className="text-white text-lg font-bold ml-2">Play</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-gray-700 px-6 py-3 rounded-lg flex-row items-center">
              <Ionicons name="add" size={24} color="white" />
              <Text className="text-white text-lg font-bold ml-2">
                Watchlist
              </Text>
            </TouchableOpacity>
          </View>
          <View className="w-full h-28 p-5 flex-row gap-10 ">
            <View className="items-center gap-3">
              <AntDesign name="pluscircleo" size={30} color="gray" />
              <Text className="text-white text-xs">Add to favorite</Text>
            </View>
            <View className="items-center gap-3">
              <AntDesign name="like1" size={30} color="gray" />
              <Text className="text-white text-xs">Like</Text>
            </View>
            <View className="items-center gap-3">
              <Entypo name="share-alternative" size={30} color="gray" />
              <Text className="text-white text-xs">Share</Text>
            </View>
          </View>
          <View className="items-center px-3">
            <View className="flex-row flex-wrap gap-2">
              {detailData.genres?.map((item) => (
                <View
                  key={item.id}
                  className="w-24 h-12 border border-gray-500 flex items-center justify-center rounded-md"
                >
                  <Text className="text-sm text-white font-semibold">
                    {item.name}
                  </Text>
                </View>
              ))}
            </View>
          </View>
          {detailData.tagline ? (
            <Text className="text-gray-300 italic px-5 pt-10">
              "{detailData.tagline}"
            </Text>
          ) : null}
          <View className="pt-10 px-6 flex-col">
            <Text className="text-gray-400 text-lg font-semibold">
              Production Companies
            </Text>
            <View className="pt-4 flex-col gap-1">
              {detailData.production_companies?.map((item) => (
                <Text key={item.id} className="text-gray-300 text-sm">
                  • {item.name}
                </Text>
              ))}
            </View>
          </View>
          <View className="w-full items-center">
            <TouchableOpacity
              className="bg-yellow-500 w-[90%] p-3 mt-5 rounded-lg items-center "
              onPress={() =>
                Linking.openURL(
                  `https://www.imdb.com/title/${detailData.imdb_id}`
                )
              }
            >
              <Text className="text-black font-bold">📽 View on IMDb</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <View className="pt-24">
          <ActivityIndicator
            size={"large"}
            animating={true}
            color={MD2Colors.blue800}
          />
        </View>
      )}
    </ScrollView>
  );
};

export default Detail;
