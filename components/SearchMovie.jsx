import { View, Text, Image } from 'react-native'
import React from 'react'
import backgroundImage from "../assets/menubackground.jpg";

const SearchMovie = ({item}) => {
  return (
    <View className="w-full h-[350px] items-center pt-4">
        <View className="w-[80%] h-auto border border-gray-500 items-center">
          <Image
            className="w-[300px] h-[150px]"
            resizeMode="cover"
            source={{uri:`https://image.tmdb.org/t/p/w500${item.backdrop_path}`}}
          />
          <View className="w-full p-4  rounded-lg shadow-lg">
            {/* Movie Name */}
            <View className="flex-row items-center gap-2 mb-2">
              <Text className="text-white font-bold text-base">🎬 Name:</Text>
              <Text className="text-gray-300 text-base">{item.title}</Text>
            </View>

            {/* IMDb Rating */}
            <View className="flex-row items-center gap-2 mb-2">
              <Text className="text-white font-bold text-sm">⭐ IMDb:</Text>
              <Text className="text-yellow-400 text-sm">{item.vote_average.toFixed(1)}/10</Text>
            </View>

            {/* Release Date */}
            <View className="flex-row items-center gap-2 mb-2">
              <Text className="text-white font-bold text-sm">📅 Release Date:</Text>
              <Text className="text-gray-300 text-sm">{item.release_date}</Text>
            </View>

            {/* Genre */}
            <View className="flex-row items-center gap-2 mb-2">
              <Text className="text-white font-bold text-sm">🎭 Popularity:</Text>
              <Text className="text-gray-300 text-sm">{item.popularity}</Text>
            </View>

            {/* Duration */}
            <View className="flex-row items-center gap-2 mb-2">
              <Text className="text-white font-bold text-sm">⏳ Duration:</Text>
              <Text className="text-gray-300 text-sm">2h 10m</Text>
            </View>

            {/* Separator Line */}
            <View className="border-t border-gray-700 my-2" />

            {/* Movie Description */}
            <Text className="text-gray-400 text-xs">
              {item.overview.split("").slice(0,200).join("")}...
            </Text>
          </View>
        </View>
      </View>
  )
}

export default SearchMovie