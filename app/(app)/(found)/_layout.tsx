import { Stack } from 'expo-router';
import GreetingHeader from "@/components/Shared/Header";

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
                            subTitle="Waiting for the owner"
                        />
                    },
                    headerTransparent: true
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