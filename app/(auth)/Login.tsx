import React from "react";
import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AnimatedInput from "../../components/UI/AnimatedInput";

const Login = () => {

    return (
        <SafeAreaView className="flex-1 bg-[#fdfdfd]">
            {/* Header container */}
            <View className="flex-1 justify-center px-8">
                <Image source={require("../../assets/images/logo.png")} className="w-20 h-20" />
                <Text className="font-bold text-4xl">Sign in</Text>
                <Text className="text-2xl text-[#8e9093]">
                    Verify your identity before starting to search or find the item&#39;s owner.
                </Text>
            </View>

            {/* Input fields */}
            <View className="flex-1 justify-center items-center px-8 gap-4">
                <AnimatedInput
                    placeholder="daisy@design.com"
                    keyboardType="email-address"
                />
                <AnimatedInput
                    placeholder="Password"
                    secureTextEntry
                />
            </View>

            {/* Oauth and login */}
            <View className="flex-1 justify-center items-center bg-blue-300 p-3"></View>
        </SafeAreaView>
    );
};

export default Login;
