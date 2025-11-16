import {
    Text,
    View,
    TextInput,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    Pressable
} from "react-native";
import {useLocalSearchParams} from "expo-router";
import {useRef, useEffect} from "react";
import {useChat} from "@/Contexts/ChatContext";
import * as Clipboard from 'expo-clipboard';

const ChatRoom = () => {
    const {id} = useLocalSearchParams();
    const {messages, inputText, setInputText, sendMessage} = useChat();
    const scrollViewRef = useRef<ScrollView>(null);

    useEffect(() => {
        scrollViewRef.current?.scrollToEnd({animated: true});
    }, [messages]);



    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            className="flex-1"
            keyboardVerticalOffset={100}
        >
            <View className="flex-1 bg-white">
                {/* Messages Area */}
                <ScrollView
                    ref={scrollViewRef}
                    className="flex-1 px-4 pt-[140px]"
                    contentContainerStyle={{paddingBottom: 20}}
                    showsVerticalScrollIndicator={false}
                >
                    {messages.map((message) => (
                        <View
                            key={message.id}
                            className={`flex-row mb-3 ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                        >
                            <View
                                className={`max-w-[75%] rounded-[20px] px-4 py-3 ${
                                    message.sender === 'me' ? 'bg-[#007AFF]' : 'bg-[#E9E9EB]'
                                }`}
                            >
                                <Pressable
                                    onLongPress={() => {
                                        Clipboard.setStringAsync(message.text);
                                        // Optionally show a toast or alert
                                    }}
                                >
                                    <Text
                                        selectable={true}
                                        className={`text-base leading-5 ${
                                            message.sender === 'me' ? 'text-white' : 'text-black'
                                        }`}
                                    >
                                        {message.text}
                                    </Text>
                                </Pressable>
                                <Text className={`text-[11px] mt-1 ${
                                    message.sender === 'me' ? 'text-white/70' : 'text-black/50'
                                }`}>
                                    {message.time}
                                </Text>
                            </View>
                        </View>
                    ))}
                </ScrollView>
            </View>
        </KeyboardAvoidingView>
    );
};

export default ChatRoom;