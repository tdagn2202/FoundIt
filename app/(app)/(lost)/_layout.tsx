import { Stack } from 'expo-router';
import GreetingHeader from "@/components/Shared/Header";
import {Image, Text, View} from "react-native";
import HeaderRight from "@/components/Shared/HeaderRight";

export default function LostLayout() {
    return (
        <Stack>
            <Stack.Screen
                name="index"
                options={{
                    title: "Lost Things",
                    headerShown: true,
                    headerTitle: () => {
                        return <GreetingHeader
                            screenTitle="Lost things"
                            subTitle="Still not found the owner yet" className={""}                        />
                    },
                    headerTransparent: true,
                    headerRight: () => <HeaderRight/>
                }}
            />
            <Stack.Screen
                name="[id]"
                options={{
                    title: "Item Details",
                    headerShown: true
                }}
            />
        </Stack>
    );
}