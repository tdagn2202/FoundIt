import {Stack} from "expo-router";
import GreetingHeader from "@/components/Shared/Header";

export default function NewPostLayoutStepper() {
    return (
        <Stack>
            <Stack.Screen
                name="index"
                options={{
                    title: "Basic information",
                    headerShown: true,
                    headerTitle: () => {
                        return <GreetingHeader
                            screenTitle="What you've lost?"
                            subTitle="Enter the most descriptive information." className={""}/>
                    },
                    headerTransparent: true
                }}/>
            <Stack.Screen
                name="Step2"
                options={{
                    title: "Phone number and email",
                    headerShown: true,

                    headerTransparent: true
                }}/>
            <Stack.Screen
                name="Step3"
                options={{
                    title: "Stuff information",
                    headerShown: true,

                    headerTransparent: true
                }}/>
        </Stack>
    )
}