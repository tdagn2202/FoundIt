import {Image, Text, TouchableOpacity, View} from "react-native";
import {useEffect, useState} from "react";
import {useRouter} from "expo-router";
import {useMe} from "@/hooks/useMe";

interface UserData {
    name: string;
    avatar: string;
}

const HeaderRight = () => {
    const router = useRouter();
    const {userData} = useMe()

    return (
        <TouchableOpacity onPress={() => router.push("/(app)/(profile)")}>

            <View className={"flex-row-reverse gap-2 items-center"}>
                <Text className="font-bold text-lg pr-2">{userData?.name}</Text>
                <Image
                    source={{uri: userData?.avatar}}
                    className="w-10 h-10 rounded-full" // Removed pr-20
                />
            </View>
        </TouchableOpacity>
    )
}

export default HeaderRight;