import {Stack, useRouter} from "expo-router";
import GreetingHeader from "@/components/Shared/Header";
import NewPostHeaderRight from "@/components/NewPost/NewPostHeaderRight";

export default function NewPostLayout() {
    const router = useRouter()
    return (
        <Stack>
            <Stack.Screen
                name="index"
                options={{
                    title: "New post",
                    headerShown: true,

                    headerTintColor: '#5250e1',
                    headerTitle: () => {
                        return <GreetingHeader
                            screenTitle="Post manager"
                            subTitle="See what you're looking for" className={""}/>
                    },
                    headerTransparent: true,
                    headerRight: () => <NewPostHeaderRight onPress={() => router.push("/(new_post_stepper)")}/>,
                }}/>
        </Stack>
    )
}