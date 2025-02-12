import { View, Text, Image, TextInput } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import netflixLogo from "../../assets/netflixlogoo.png"
import AntDesign from '@expo/vector-icons/AntDesign';

const search = () => {
  return (
    <SafeAreaView className="w-full h-full bg-black">
     <View className="items-center pt-10">
     <Image
     className="w-36 h-12"
     source={netflixLogo}
     />
     </View>
     <View className="items-center pt-3 relative">
      <TextInput placeholder='Enter a movie or series' className="border px-2  border-gray-500 w-[90%] placeholder:text-gray-200" />
      <AntDesign className="absolute right-7 top-5 cursor-pointer" size={24} name='search1' color="gray" />

      
     </View>
    </SafeAreaView>
  )
}

export default search