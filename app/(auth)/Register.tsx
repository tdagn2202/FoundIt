import React, {useState} from "react";
import {Image, Text, TouchableOpacity, View} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AnimatedInput from "../../components/UI/AnimatedInput";
import Button from "@/components/UI/Button";
import RoundedButton from "@/components/UI/RoundedButton";
import {useRouter} from "expo-router";
import {signUp} from "@/api/authApi";

const GGOauth = () => {
    return(
        <View className="border border-[#edf1f1] rounded-3xl p-3 rounded-[1rem]">
            <Image source={require("../../assets/images/icons/google.png")} className="w-7 h-7" resizeMode="contain"/>
        </View>
    )
}

const Register = () => {
    const navigation = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    const handleRegister = async () => {
        if(await signUp({name, email, password, passwordConfirm})) {
            navigation.navigate("/Login");
        }
    }

    return (
        <SafeAreaView className="flex-1 bg-[#fdfdfd] pt-[4.5rem]">
            {/* Header container */}
            <View className="flex-1 justify-center px-8">
                <Image source={require("../../assets/images/logo.png")} className="w-[6rem] h-[6rem]" />
                <Text className="font-bold text-4xl pt-[0.63rem] w-[12.5rem]">Create an account</Text>
                <Text className="text-2xl text-[#8e9093] pt-2">
                    Verify your identity before starting to search or find the item&#39;s owner.
                </Text>
            </View>

            {/* Input fields */}
            <View className="flex-1 justify-center items-center px-8 gap-4 pt-[12rem]">
                <AnimatedInput
                    placeholder="Enter your name"
                    keyboardType="default"
                    onChangeText={setName}
                />
                <AnimatedInput
                    placeholder="daisy@design.com"
                    keyboardType="email-address"
                    onChangeText={setEmail}
                />
                <AnimatedInput
                    placeholder="Password"
                    secureTextEntry
                    onChangeText={setPassword}
                />
                <AnimatedInput
                    placeholder="Re-enter password"
                    secureTextEntry
                    onChangeText={setPasswordConfirm}
                />

                <RoundedButton text={"Sign in"} onPress={handleRegister}/>

            </View>

            {/* Oauth and login */}
            <View className="flex-1 justify-center items-center p-3 px-8 pt-[7rem]">
                <Text className="pt-16 text-[#787b7f] text-sm">or continue with</Text>
                <GGOauth />
                <View className="flex-row justify-center mt-4 pt-[0rem]">
                    <Text className="text-gray-700">
                        Already have an account?{" "}
                    </Text>
                    <TouchableOpacity onPress={() => {navigation.back()}}>
                        <Text className="text-[#5250E1] font-medium">
                            Sign in
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

        </SafeAreaView>
    );
};

export default Register;
