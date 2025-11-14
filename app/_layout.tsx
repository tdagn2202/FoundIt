import { Stack } from "expo-router";
import "./global.css";
import {SearchProvider} from "@/Contexts/SearchContext";
export default function RootLayout() {
  return <SearchProvider><Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(splash)" />
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(app)" />
  </Stack> </SearchProvider>
}
