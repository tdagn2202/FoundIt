import {Stack} from "expo-router";
import GreetingHeader from "@/components/Shared/Header";

export default function NewPostLayout() {
    return (
        <Stack>
            <Stack.Screen
                name="index"
                options={{
                      title: "New post",
                      headerShown: true,
                      headerTitle: () => {
                          return <GreetingHeader
                              screenTitle="Create new post"
                              subTitle="Annoucing that you've lost something" className={""}                          />
                      },
                      headerTransparent: true
                 }}/>
        </Stack>
    )
}