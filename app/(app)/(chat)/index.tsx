import {Image, ScrollView, Text, TextInput, TouchableOpacity, View} from "react-native";
import {StatusBar} from "expo-status-bar";
import {useCallback, useState} from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import {useFocusEffect, useNavigation} from "expo-router";
import {useSearch} from "@/Contexts/SearchContext";

const ChatScreen = () => {
    const [chats, setChats] = useState([
        {
            id: 1,
            name: 'nê gips',
            avatar: "https://randomuser.me/api/portraits/men/1.jpg",
            lastMessage: 'Hey! Are we still meeting tomorrow?',
            time: '2m ago',
            unread: 2,
            online: true
        },
        {
            id: 2,
            name: 'Dev Team',
            avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
            lastMessage: 'John: The new feature is ready for testing',
            time: '15m ago',
            unread: 5,
            online: false,
            isGroup: true
        },
        {
            id: 3,
            name: 'Mike Chen',
            avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
            lastMessage: 'Thanks for your help! 🙏',
            time: '1h ago',
            unread: 0,
            online: true
        },
        {
            id: 4,
            name: 'Emma Rodriguez',
            avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
            lastMessage: 'Can you send me the files?',
            time: '3h ago',
            unread: 0,
            online: false
        },
        {
            id: 5,
            name: 'Family Group',
            avatar: 'https://randomuser.me/api/portraits/women/5.jpg',
            lastMessage: 'Mom: Dinner at 7 tonight',
            time: '5h ago',
            unread: 0,
            online: false,
            isGroup: true
        },
        {
            id: 6,
            name: 'Alex Thompson',
            avatar: 'https://randomuser.me/api/portraits/women/8.jpg',
            lastMessage: 'Check out this cool article',
            time: 'Yesterday',
            unread: 0,
            online: false
        }
    ]);
    const { searchQuery } = useSearch();

    const filteredChats = chats.filter(chat =>
        chat.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <SafeAreaView className="flex-1 bg-gray-50 pt-[3rem]">

            <StatusBar style={"dark"} />

            {/* Header */}
            <View className=" px-4 pb-4">
            </View>

            {/* Chat List */}
            <ScrollView className="flex-1">
                {filteredChats.map((chat) => (
                    <TouchableOpacity
                        key={chat.id}
                        className=""
                        activeOpacity={0.7}
                    >
                        <View className="flex-row p-4 justify-center">
                            {/* Avatar */}
                            <View className="relative mr-3  justify-center ">
                                <View className="w-14 h-14 rounded-full bg-blue-500 items-center justify-center">
                                    <Image
                                        source={{ uri: chat.avatar }}
                                        className="w-14 h-14 rounded-full"
                                        resizeMode="cover" // Ensure the image doesn't stretch
                                    />
                                </View>
                                {chat.online && (
                                    <View className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-green-500 border-2 border-white" />
                                )}
                            </View>

                            {/* Chat Info */}
                            <View className="flex-1 justify-center">
                                <View className="flex-row justify-between items-center mb-1">
                                    <Text className="text-xl font-semibold text-gray-800 flex-1 mr-2" numberOfLines={1}>
                                        {chat.name}
                                    </Text>
                                    <Text className="text-xs text-gray-500">{chat.time}</Text>
                                </View>
                                <View className="flex-row justify-between items-center">
                                    <Text className="text-md text-gray-600 flex-1 mr-2" numberOfLines={1}>
                                        {chat.lastMessage}
                                    </Text>
                                    {chat.unread > 0 && (
                                        <View className="bg-blue-500 rounded-full min-w-[20px] h-5 items-center justify-center px-1.5">
                                            <Text className="text-white text-xs font-bold">{chat.unread}</Text>
                                        </View>
                                    )}
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}

export default ChatScreen