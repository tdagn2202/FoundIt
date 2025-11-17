import { Stack } from 'expo-router';
import GreetingHeader from "@/components/Shared/Header";
import {Image, Text, View} from "react-native";
import HeaderRight from "@/components/Shared/HeaderRight";
import ChatHeader from "@/components/Shared/ChatHeader";
import DetailScreenTitle from "@/components/FoundThing/DetailScreenTitle";

export default function FoundLayout() {
    return (
        <Stack>
            <Stack.Screen
                name="index"
                options={{
                    title: "Found Things",
                    headerShown: true,
                    headerTitle: () => {
                        return <GreetingHeader
                            screenTitle="Found Things"
                            subTitle="Waiting for the owner" className={""}
                        />
                    },
                    headerTransparent: true,
                    headerRight: () => <HeaderRight/>
                }}
            />
            <Stack.Screen
                name="[id]"
                options={{
                    title: "Item Details",
                    headerShown: true,
                    headerTransparent: true,
                    
                }}
            />
        </Stack>
    );
}