import {Stack} from 'expo-router';
import {useRef} from 'react';
import GreetingHeader from "@/components/Shared/Header";
import {useSearch} from "@/Contexts/SearchContext";
import {useChat} from "@/Contexts/ChatContext";
import ChatHeader from "@/components/Shared/ChatHeader";
// @ts-ignore
import {SearchBarCommands} from '@react-navigation/elements';

export default function ChatLayout() {
    const {setSearchQuery} = useSearch()
    const {selectedChat, sendMessage, inputText, setInputText} = useChat()
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
                        navigationBarHidden: true,
                        title: selectedChat?.name,
                        headerTitle: () => {
                            return (
                                <ChatHeader
                                    className={"pt-7 overflow-visible h-[7rem] w-[85%]"}
                                />
                            )
                        },
                        headerSearchBarOptions: {
                            ref: searchBarRef,
                            placement: 'inline',
                            placeholder: 'Enter message',

                            hideNavigationBar: false,

                            onChangeText: (e) => {
                                setInputText(e.nativeEvent.text);
                            },
                            onSearchButtonPress: () => {
                                sendMessage(inputText);

                                setInputText('');
                                searchBarRef.current?.clearText();
                                searchBarRef.current.cancelSearch();
                            },
                        },
                        headerTransparent: true,
                        presentation: 'modal'
                    }}
                >
                </Stack.Screen>
            </Stack>
        </>
    );
}