import { Stack } from "expo-router";
import "./global.css";
import {SearchProvider} from "@/Contexts/SearchContext";
import {ChatProvider} from "@/Contexts/ChatContext";
export default function RootLayout() {
  return <SearchProvider><ChatProvider><Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(splash)" />
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(app)" />
  </Stack></ChatProvider>    </SearchProvider>
}
