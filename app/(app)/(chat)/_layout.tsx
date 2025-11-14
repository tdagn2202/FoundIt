import {Stack} from 'expo-router';
import GreetingHeader from "@/components/Shared/Header";
import {NativeTabs} from "expo-router/unstable-native-tabs";
import {View} from "react-native";
import {useSearch} from "@/Contexts/SearchContext";

export default function ChatLayout() {
    const {setSearchQuery} = useSearch()
    return (
        <>
            <Stack>
                <Stack.Screen
                    name="index"
                    options={{
                        title: "New post",
                        headerShown: true,
                        headerTitle: () => {
                            return (
                                <GreetingHeader
                                    screenTitle="Messages"
                                    subTitle=""
                                    className={"pt-7  overflow-visible h-[5rem] w-full"}
                                />
                            )
                        },
                        headerSearchBarOptions: {
                            placement: 'integratedButton',
                            placeholder: 'Search',
                            onChangeText: (e) => {
                                setSearchQuery(e.nativeEvent.text);
                            },
                        },
                        headerTransparent: true
                    }}/>
            </Stack>
            <NativeTabs>
                <NativeTabs.Trigger name="search"/>
            </NativeTabs>
        </>
    );
}
