// app/(splash)/Welcome.jsx
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function Fourth() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-white justify-between px-6 pb-10 pt-16">
      {/* Top logo and app name */}
      <View className="items-center">
        {/* <Image
          source={require("../../assets/logo.png")} // replace with your logo path
          style={{ width: 60, height: 60, resizeMode: "contain" }}
        /> */}
        <Text className="text-lg font-semibold mt-2">Found It!</Text>
      </View>

      {/* Illustration */}
      <View className="items-center mt-6">
        {/* <Image
          source={require("../../assets/splash1.png")} // your illustrated image
          style={{ width: 220, height: 220, resizeMode: "contain" }}
        /> */}
      </View>

      {/* Text */}
      <View className="items-center mt-6">
        <Text className="text-xl font-bold text-center">Fourth screen</Text>
        <Text className="text-gray-500 text-center mt-2">
          Return lost items to their rightful owners
        </Text>
      </View>

      {/* Page indicator + Next button */}
      <View className="flex-row justify-between items-center mt-8">
        {/* Back button placeholder */}
        <TouchableOpacity>
          <Text className="text-gray-400">{`< Back`}</Text>
        </TouchableOpacity>

        {/* Dots */}
        <View className="flex-row space-x-2">
          <View className="w-2 h-2 rounded-full bg-gray-300" />
          <View className="w-2 h-2 rounded-full bg-blue-500" />
          <View className="w-2 h-2 rounded-full bg-gray-300" />
        </View>

        {/* Next button */}
        <TouchableOpacity
          className="bg-blue-600 px-6 py-2 rounded-full"
          onPress={() => router.push("/(auth)/Login")}
        >
          <Text className="text-white font-semibold">Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
