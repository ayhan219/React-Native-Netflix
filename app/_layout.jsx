import { Stack } from "expo-router";
import "../global.css";
import { UserContextProvider } from "../context/UserContext";

export default function RootLayout() {
  return (
    <UserContextProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="detail/[id]" />
        <Stack.Screen name="movies/movies" />
        <Stack.Screen name="series/series" />
      </Stack>
    </UserContextProvider>
  );
}
