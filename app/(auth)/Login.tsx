import React, {useEffect, useState} from "react";
import {Image, Text, TouchableOpacity, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import AnimatedInput from "../../components/UI/AnimatedInput";
import RoundedButton from "@/components/UI/RoundedButton";
import {useRouter} from "expo-router";
import Constants from "expo-constants";
import {login} from "@/api/authApi";
import AsyncStorage from "@react-native-async-storage/async-storage";

const GGOauth = () => {
    return (
        <View className="border border-[#edf1f1] rounded-3xl p-3 rounded-[1rem]">
            <Image source={require("../../assets/images/icons/google.png")} className="w-7 h-7" resizeMode="contain"/>
        </View>
    )
}

const Login = () => {
    const navigation = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        const checkCredentials = async () => {
            const token = await AsyncStorage.getItem("token");
            if (token) {
                navigation.replace("/(app)/lost");
            }
        }
        checkCredentials();
    }, []);

    const handleLogin = async () => {
        if (await login({email, password})) {
            navigation.replace("/(app)/lost")
        }
        console.log(Constants.expoConfig?.extra?.API_BASE)
    }


    return (
        <SafeAreaView className="flex-1 bg-[#fdfdfd] pt-20">
            {/* Header container */}
            <View className="flex-1 justify-center px-8">
                <Image source={require("../../assets/images/logo.png")} className="w-[6rem] h-[6rem]"/>
                <Text className="font-bold text-4xl pt-[0.63rem]">Sign in</Text>
                <Text className="text-2xl text-[#8e9093] pt-2">
                    Verify your identity before starting to search or find the item&#39;s owner.
                </Text>
            </View>

            {/* Input fields */}
            <View className="flex-1 justify-center items-center px-8 gap-4 pt-20">
                <AnimatedInput
                    placeholder="daisy@design.com"
                    keyboardType="email-address"
                    onChangeText={email => setEmail(email)}
                />
                <AnimatedInput
                    placeholder="Password"
                    secureTextEntry
                    onChangeText={password => setPassword(password)}
                />
                <View className="w-full">
                    <Text className="text-right text-lg text-[#5250E1] font-bold">Forgot password?</Text>
                </View>
                <RoundedButton text={"Login"} onPress={handleLogin}/>

            </View>

            {/* Oauth and login */}
            <View className="flex-1 justify-center items-center p-3 px-8">
                <Text className="pt-16 text-[#787b7f] text-sm">or continue with</Text>
                <GGOauth/>
                <View className="flex-row justify-center mt-4 pt-[3.31rem]">
                    <Text className="text-gray-700">
                        Don't have an account yet?{" "}
                    </Text>
                    <TouchableOpacity onPress={() => {
                        navigation.navigate("/(auth)/Register")
                    }}>
                        <Text className="text-[#5250E1] font-medium">
                            Register
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default Login;
