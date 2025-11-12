import Button from "@/components/UI/Button";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const steps = [
  {
    title: "Welcome to Found It!",
    description: "Return lost items to their rightful owners",
    gif: require("../../assets/images/gifs/walking.gif"),
  },
  {
    title: "Find Lost Items",
    description: "Easily report and locate lost items",
    gif: require("../../assets/images/gifs/posting.gif"),
  },
  {
    title: "Find your stuffs",
    description: "Communicate securely with finders",
    gif: require("../../assets/images/gifs/found.gif"),
  },
];

export default function Splash() {
  const router = useRouter();
  const [step, setStep] = useState(0);

  const nextStep = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const prevStep = () => setStep((s) => Math.max(s - 1, 0));

  const nextScreen = () => {
    router.navigate("/(auth)/Login");
  };

  return (
    <View className="flex-1 bg-white px-6 pt-16">
      {/* Top logo */}
      <View className="flex-0 items-center ">
        {/* <Text className="text-lg font-semibold mt-2">Found It!</Text> */}
        <Image
          source={require("../../assets/images/logo.png")}
          style={{
            width: 60,
            height: 60,
            resizeMode: "contain",
          }}
        />
      </View>

      {/* Illustration placeholder */}
      <View className="flex-[3] items-center justify-center pt-20">
        <Image
          source={steps[step].gif}
          style={{
            width: 350,
            height: 350,
            resizeMode: "contain",
            borderRadius: 20,
          }}
        />
      </View>

      {/* Text */}
      <View className="items-center mt-6 flex-1">
        <Text className="text-4xl font-bold text-center">
          {steps[step].title}
        </Text>
        <Text className="text-gray-500 text-center text-lg">
          {steps[step].description}
        </Text>
      </View>

      {/* Sticky bottom navigation */}
      <View className="flex-row justify-between items-center mt-8 pb-10">
        <TouchableOpacity onPress={prevStep} disabled={step === 0}>
          <View className="flex-row items-center">
            <View>
              <Image
                source={require("../../assets/images/icons/left-arrow.png")}
                style={{ height: 24, width: 24 }}
              />
            </View>
            <Text className="font-bold text-xl ml-2">Back</Text>
          </View>
        </TouchableOpacity>

        {/* Dots */}
        <View className="flex-row space-x-2">
          {steps.map((_, i) => (
            <View
              key={i}
              className={`w-2 h-2 rounded-full mx-1 ${
                i === step ? "bg-[#5250E1]" : "bg-gray-300"
              }`}
            />
          ))}
        </View>

        <Button
          text={step === 2 ? "Get started" : "Next"}
          onPress={step === 2 ? nextScreen : nextStep}
        />
      </View>
    </View>
  );
}
