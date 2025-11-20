import { Stack } from 'expo-router';
import { useRef } from 'react';
import GreetingHeader from "@/components/Shared/Header";
import { useSearch } from "@/Contexts/SearchContext";
import ChatHeader from "@/components/Shared/ChatHeader";
// @ts-ignore
import { SearchBarCommands } from '@react-navigation/elements';

export default function ChatLayout() {
    const { setSearchQuery } = useSearch();
    const searchBarRef = useRef<SearchBarCommands>(null);

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
                                    className={"pt-7 overflow-visible h-[5rem] w-full"}
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
                />
                <Stack.Screen
                    name="[id]"
                    options={({ route }) => {
                        // Access params from the route
                        const params = route.params as {
                            otherUserName?: string;
                            otherUserAvatar?: string;
                        };

                        console.log('Layout route params:', params);

                        return {
                            headerShown: true,
                            navigationBarHidden: true,
                            title: params?.otherUserName || 'Chat',
                            headerTitle: () => {
                                return (
                                    <ChatHeader
                                        className="pt-[8rem]"
                                        otherUserName={params?.otherUserName}
                                        otherUserAvatar={params?.otherUserAvatar}
                                    />
                                )
                            },
                            headerTransparent: true,
                            presentation: 'modal'
                        };
                    }}
                />
            </Stack>
        </>
    );
}