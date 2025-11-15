import {Stack} from 'expo-router';
import GreetingHeader from "@/components/Shared/Header";
import {NativeTabs} from "expo-router/unstable-native-tabs";
import {Image, Text, View} from "react-native";
import {useSearch} from "@/Contexts/SearchContext";
import {useChat} from "@/Contexts/ChatContext";
import {Header} from "@react-navigation/elements";
import ChatHeader from "@/components/Shared/ChatHeader";

export default function ChatLayout() {
    const {setSearchQuery} = useSearch()
    const {selectedChat} = useChat()
    return (
        <>
            <Stack>
                <Stack.Screen
                    name="index"
                    options={{
                        title: "Messages",
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
                <Stack.Screen
                    name="[id]"
                    options={{
                        headerShown: true,
                        title: selectedChat?.name,
                        headerTitle: () => {
                            return (
                                <ChatHeader
                                    className={"pt-7 overflow-visible h-[7rem] w-[85%] pr-5"}
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

                    }}
                >
                </Stack.Screen>
            </Stack>
        </>
    );
}
