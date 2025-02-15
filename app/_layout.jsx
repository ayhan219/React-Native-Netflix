import { Stack } from "expo-router";
import "../global.css"
 import {UserContextProvider} from "../context/UserContext"

export default function RootLayout() {
  return (
    <UserContextProvider>
      <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="detail/[id]" />    
    </Stack>
    </UserContextProvider>
  );
}