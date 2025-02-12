import {
  View,
  Text,
  StatusBar,
  Image,
  ScrollView,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import netflixLogo from "../../assets/netflixlogoo.png";
import menuBackground from "../../assets/menubackground.jpg";
import MovieItem from "../../components/MovieItem";
import axios from "axios";
import key from "../key/API";
import Footer from "../../components/Footer";

export default function HomeScreen() {
  const [popular, setPopular] = useState([]);
  const [movies, setMovies] = useState([]);
  const [series, setSeries] = useState([]);

  const getPopular = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${key.APIKEY}&language=en-US&page=1`
      );
      setPopular(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  const getMovies = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${key.APIKEY}&language=en-US&page=2`
      );
      setSeries(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  const getSeries = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/tv/popular?api_key=${key.APIKEY}&language=en-US&page=1
`
      );
      setMovies(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPopular();
    getMovies();
    getSeries();
  }, []);
  return (
    <SafeAreaView className="bg-black w-full h-full">
      <ScrollView>
        <View className="items-center pt-8">
          <Image
            source={netflixLogo}
            className="w-32 h-24"
            resizeMode="contain"
          />
        </View>
        <View className="w-full  relative p-5">
          <Image
            className="w-full h-[350px]  "
            resizeMode="contain"
            source={{
              uri: `https://image.tmdb.org/t/p/w500${popular[1]?.poster_path}`,
            }}
          />
        </View>
        <View>
          <Text className="text-white text-base p-4 pt-6 font-bold">
            Popular on Netflix
          </Text>
          <FlatList
            className="pl-3"
            horizontal
            data={popular}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <MovieItem item={item} />}
            contentContainerStyle={{ gap: 20 }}
          />
        </View>

        <View>
          <Text className="text-white text-base p-4 pt-6 font-bold">
            Movies
          </Text>
          <FlatList
            className="pl-3"
            horizontal
            data={movies}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <MovieItem item={item} />}
            contentContainerStyle={{ gap: 20 }}
          />
        </View>

        <View>
          <Text className="text-white text-base p-4 pt-6 font-bold">
            Series
          </Text>
          <FlatList
            className="pl-3"
            horizontal
            data={series}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <MovieItem item={item} />}
            contentContainerStyle={{ gap: 20 }}
          />
        </View>
        <Footer />
      </ScrollView>
      
      <StatusBar backgroundColor="black" barStyle="light-content" />
    </SafeAreaView>
  );
}
