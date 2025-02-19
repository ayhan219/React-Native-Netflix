import {
  View,
  Text,
  StatusBar,
  Image,
  ScrollView,
  FlatList,
  Animated,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import key from "../../key/API";
import Footer from "../../components/Footer";
import MovieItem from "../../components/MovieItem";
import netflixLogo from "../../assets/netflixlogoo.png";
import { MotiImage, MotiText } from "moti";
import { AnimatePresence } from "moti";
import { useRouter } from "expo-router";
import { UserContext } from "../../context/UserContext";
import { useSearchParams } from "expo-router/build/hooks";

export default function HomeScreen() {
  const [popular, setPopular] = useState([]);
  const [movies, setMovies] = useState([]);
  const [series, setSeries] = useState([]);
  const [counter, setCounter] = useState(0);
  const router = useRouter();
  const {setSingleData,whereIsUser,setWhereIsUser} = useContext(UserContext);

  const searchParams = useSearchParams();
  const param = searchParams.get("param");
  

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prev) => (prev === 5 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
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
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${key.APIKEY}&language=en-US&page=1`
      );
      setMovies(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  const getSeries = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/tv/popular?api_key=${key.APIKEY}&language=en-US&page=1`
      );
      setSeries(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPopular();
    getMovies();
    getSeries();
    console.log(param);
    
  }, []);

  return (
    <SafeAreaView className="bg-black w-full h-full">
      <ScrollView>
        {/* Netflix Logo */}
        <View className="items-center pt-5">
          <Image
            source={netflixLogo}
            className="w-36 h-20"
            resizeMode="contain"
          />
        </View>

        {/* Hero Section with Overlay */}
        <TouchableOpacity onPress={()=>{
          setSingleData(popular[counter])
          router.push(`/detail/${popular[counter]?.id}`)

        }}>
        <View className="w-full h-[500px] relative p-4">
          <AnimatePresence exitBeforeEnter>
            <MotiImage
              key={popular[counter]?.id}
              from={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ type: "timing", duration: 1000 }}
              style={{ width: "100%", height: "100%", borderRadius: 10 }}
              source={{
                uri: `https://image.tmdb.org/t/p/w500${popular[counter]?.poster_path}`,
              }}
            />
          </AnimatePresence>
          <View className="absolute inset-0 bg-black opacity-30 rounded-lg" />
          <View className="absolute bottom-10 left-5">
            <MotiText
              from={{ opacity: 0, translateY: 20 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ type: "timing", duration: 800 }}
              className="text-white text-2xl font-bold"
            >
              {popular[counter]?.title}
            </MotiText>

            <MotiText
              from={{ opacity: 0, translateY: 20 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ type: "timing", duration: 1000, delay: 200 }}
              className="text-gray-300 font-semibold text-sm w-[50%]"
            >
              {popular[counter]?.overview.length > 120
                ? `${popular[counter]?.overview.slice(0, 120)}...`
                : popular[counter]?.overview}
            </MotiText>
          </View>
        </View>
        </TouchableOpacity>

        {/* Movie Categories */}
        <View className="flex-col ">
          {/* Popular Movies */}
          <View className="p-6">
            <Text className="text-gray-300 text-lg font-bold mb-3">
              🔥 Popular on Netflix
            </Text>
            <FlatList
              horizontal
              data={popular}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => <MovieItem item={item} />}
              contentContainerStyle={{ gap: 20 }}
              showsHorizontalScrollIndicator={false}
            />
          </View>

          {/* Movies */}
          <View className="p-6">
            <Text className="text-gray-300 text-lg font-bold mb-3">
              🎬 Movies
            </Text>
            <FlatList
              horizontal
              data={movies}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => <MovieItem item={item} />}
              contentContainerStyle={{ gap: 20 }}
              showsHorizontalScrollIndicator={false}
            />
          </View>

          {/* Series */}
          <View className="p-6">
            <Text className="text-gray-300 text-lg font-bold mb-3">
              📺 Series
            </Text>
            <FlatList
              horizontal
              data={series}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => <MovieItem item={item} />}
              contentContainerStyle={{ gap: 20 }}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </View>

        {/* Footer */}
        <Footer />
      </ScrollView>

      <StatusBar backgroundColor="black" barStyle="light-content" />
    </SafeAreaView>
  );
}
