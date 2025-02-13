import {
  View,
  Text,
  StatusBar,
  Image,
  ScrollView,
  FlatList,
  Animated,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import key from "../../key/API";
import Footer from "../../components/Footer";
import MovieItem from "../../components/MovieItem";
import netflixLogo from "../../assets/netflixlogoo.png";
import { UserContext } from "../../context/UserContext";

export default function HomeScreen() {
  const [popular, setPopular] = useState([]);
  const [movies, setMovies] = useState([]);
  const [series, setSeries] = useState([]);
  const [counter, setCounter] = useState(0);
  const [opacity] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      if (counter === 5) {
        setCounter(0);
      } else {
        setCounter((prevCounter) => prevCounter + 1);
      }
    }, 5000);
  }, [counter]);

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
        `https://api.themoviedb.org/3/tv/popular?api_key=${key.APIKEY}&language=en-US&page=1`
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

        <View className="w-full relative p-5">
          <Animated.Image
            style={{ width: "100%", height: 350, opacity }} // Animated opacity
            resizeMode="contain"
            source={{
              uri: `https://image.tmdb.org/t/p/w500${popular[counter]?.poster_path}`,
            }}
          />
        </View>

        <View className="flex-col ">
          <View className="p-7 flex-col gap-3">
            <Text className="text-gray-300 text-base  pt-6 font-bold">
              Popular on Netflix
            </Text>
            <FlatList
              className=""
              horizontal
              data={popular}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <MovieItem item={item} />}
              contentContainerStyle={{ gap: 20 }}
            />
          </View>

          <View className="p-7 flex-col gap-3">
            <Text className="text-gray-300 text-base  pt-6 font-bold">
              Movies
            </Text>
            <FlatList
              className=""
              horizontal
              data={movies}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <MovieItem item={item} />}
              contentContainerStyle={{ gap: 20 }}
            />
          </View>

          <View className="p-7 flex-col gap-3">
            <Text className="text-gray-300 text-base pt-6 font-bold">
              Series
            </Text>
            <FlatList
              className=""
              horizontal
              data={series}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <MovieItem item={item} />}
              contentContainerStyle={{ gap: 20 }}
            />
          </View>
        </View>

        <Footer />
      </ScrollView>

      <StatusBar backgroundColor="black" barStyle="light-content" />
    </SafeAreaView>
  );
}
