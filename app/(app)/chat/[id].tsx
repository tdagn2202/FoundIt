// import {
//     Text,
//     View,
//     TextInput,
//     TouchableOpacity,
//     ScrollView,
//     KeyboardAvoidingView,
//     Platform,
//     Pressable,
//     ActivityIndicator,
//     Image
// } from "react-native";
// import { useLocalSearchParams } from "expo-router";
// import { useRef, useEffect, useState } from "react";
// import { useMessages } from "@/hooks/useChat";
// import { sendMessage, markMessagesAsRead, formatChatTime } from "@/api/chatApi";
// import { useMe } from "@/hooks/useMe";
// import * as Clipboard from 'expo-clipboard';
// import { Ionicons } from "@expo/vector-icons";
// import { GlassView } from "expo-glass-effect";
//
// const ChatRoom = () => {
//     const {
//         id,
//         otherUserEmail,
//         otherUserName,
//         otherUserAvatar,
//         // Post details from navigation params
//         postTitle,
//         postContent,
//         postType,
//         postBuilding,
//         postRoom,
//         postImage
//     } = useLocalSearchParams();
//
//     const { messages, loading } = useMessages(id as string);
//     const { userData } = useMe();
//     const [inputText, setInputText] = useState('');
//     const [sending, setSending] = useState(false);
//     const [showPostPreview, setShowPostPreview] = useState(false);
//     const scrollViewRef = useRef<ScrollView>(null);
//
//     // Check if this chat was opened from a post
//     const hasPostContext = postTitle && postContent;
//
//     useEffect(() => {
//         scrollViewRef.current?.scrollToEnd({ animated: true });
//     }, [messages]);
//
//     useEffect(() => {
//         if (id && userData?.email) {
//             markMessagesAsRead(id as string, userData.email);
//         }
//     }, [id, userData?.id]);
//
//     // Show post preview if opened from post and no messages sent yet
//     useEffect(() => {
//         if (hasPostContext && messages.length === 0) {
//             setShowPostPreview(true);
//         }
//     }, [hasPostContext, messages.length]);
//
//     const handleSend = async () => {
//         if (!inputText.trim() || !id || !userData?.id || !otherUserEmail) return;
//
//         setSending(true);
//         try {
//             await sendMessage(
//                 id as string,
//                 userData.email,
//                 inputText.trim(),
//                 otherUserEmail as string
//             );
//             setInputText('');
//             setShowPostPreview(false);
//         } catch (error) {
//             console.error('Error sending message:', error);
//         } finally {
//             setSending(false);
//         }
//     };
//
//     const handleSendPostInfo = async () => {
//         const postMessage = `Hi! I'm interested in your post:\n\n📌 ${postTitle}\n${postContent}\n\nType: ${postType}\nLocation: ${postBuilding} - Room ${postRoom}\n\nCan you provide more details?`;
//
//         setSending(true);
//         try {
//             await sendMessage(
//                 id as string,
//                 userData.email,
//                 postMessage,
//                 otherUserEmail as string
//             );
//             setShowPostPreview(false);
//         } catch (error) {
//             console.error('Error sending message:', error);
//         } finally {
//             setSending(false);
//         }
//     };
//
//     if (loading) {
//         return (
//             <View className="flex-1 items-center justify-center bg-white">
//                 <ActivityIndicator size="large" color="#007AFF" />
//             </View>
//         );
//     }
//
//     return (
//         <KeyboardAvoidingView
//             behavior={Platform.OS === "ios" ? "padding" : "height"}
//             className="flex-1"
//             keyboardVerticalOffset={30}
//         >
//             <View className="flex-1 bg-gradient-to-b from-gray-50 to-white">
//                 {/* Messages Area */}
//                 <ScrollView
//                     ref={scrollViewRef}
//                     className="flex-1 px-4 pt-[140px]"
//                     contentContainerStyle={{ paddingBottom: 20 }}
//                     showsVerticalScrollIndicator={false}
//                     onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
//                 >
//                     {messages.length === 0 && !showPostPreview ? (
//                         <View className="items-center justify-center mt-20">
//                             <GlassView
//                                 glassEffectStyle="regular"
//                                 style={{
//                                     paddingHorizontal: 24,
//                                     paddingVertical: 32,
//                                     borderRadius: 20,
//                                     alignItems: 'center',
//                                 }}
//                             >
//                                 <Ionicons name="chatbubbles-outline" size={48} color="#9CA3AF" />
//                                 <Text className="text-gray-400 text-base mt-4 font-semibold">No messages yet</Text>
//                                 <Text className="text-gray-400 text-sm mt-1">Start the conversation!</Text>
//                             </GlassView>
//                         </View>
//                     ) : (
//                         <>
//                             {/* Messages */}
//                             {messages.map((message, index) => {
//                                 const isMyMessage = message.senderEmail === userData?.email;
//                                 const currentTime = message.createdAt?.toDate ? message.createdAt.toDate().getTime() : new Date(message.createdAt).getTime();
//                                 const prevTime = index > 0
//                                     ? (messages[index - 1].createdAt?.toDate
//                                         ? messages[index - 1].createdAt.toDate().getTime()
//                                         : new Date(messages[index - 1].createdAt).getTime())
//                                     : 0;
//                                 const showTimestamp = index === 0 || (currentTime - prevTime > 300000);
//
//                                 return (
//                                     <View key={message.id}>
//                                         {showTimestamp && (
//                                             <View className="items-center my-4">
//                                                 <GlassView
//                                                     glassEffectStyle="clear"
//                                                     style={{
//                                                         paddingHorizontal: 12,
//                                                         paddingVertical: 4,
//                                                         borderRadius: 12,
//                                                     }}
//                                                 >
//                                                     <Text className="text-xs text-gray-500">
//                                                         {formatChatTime(message.createdAt)}
//                                                     </Text>
//                                                 </GlassView>
//                                             </View>
//                                         )}
//
//                                         <View
//                                             className={`flex-row mb-3 ${isMyMessage ? 'justify-end' : 'justify-start'}`}
//                                         >
//                                             <Pressable
//                                                 onLongPress={() => {
//                                                     Clipboard.setStringAsync(message.text);
//                                                 }}
//                                                 className="max-w-[75%]"
//                                             >
//                                                 <GlassView
//                                                     glassEffectStyle={isMyMessage ? "clear" : "regular"}
//                                                     style={{
//                                                         borderRadius: 20,
//                                                         paddingHorizontal: 16,
//                                                         paddingVertical: 12,
//                                                         backgroundColor: isMyMessage ? '#007AFF' : undefined,
//                                                         shadowColor: '#000',
//                                                         shadowOffset: { width: 0, height: 1 },
//                                                         shadowOpacity: 0.1,
//                                                         shadowRadius: 3,
//                                                         elevation: 2,
//                                                     }}
//                                                 >
//                                                     <Text
//                                                         selectable={true}
//                                                         className={`text-base leading-5 ${
//                                                             isMyMessage ? 'text-white' : 'text-gray-900'
//                                                         }`}
//                                                     >
//                                                         {message.text}
//                                                     </Text>
//                                                     <View className="flex-row items-center justify-end mt-1">
//                                                         <Text className={`text-[10px] ${
//                                                             isMyMessage ? 'text-white/70' : 'text-gray-500'
//                                                         }`}>
//                                                             {(message.createdAt?.toDate
//                                                                     ? message.createdAt.toDate()
//                                                                     : new Date(message.createdAt)
//                                                             ).toLocaleTimeString('en-US', {
//                                                                 hour: 'numeric',
//                                                                 minute: '2-digit',
//                                                                 hour12: true
//                                                             })}
//                                                         </Text>
//                                                         {isMyMessage && (
//                                                             <Ionicons
//                                                                 name={message.read ? "checkmark-done" : "checkmark"}
//                                                                 size={12}
//                                                                 color="rgba(255,255,255,0.7)"
//                                                                 style={{ marginLeft: 4 }}
//                                                             />
//                                                         )}
//                                                     </View>
//                                                 </GlassView>
//                                             </Pressable>
//                                         </View>
//                                     </View>
//                                 );
//                             })}
//                         </>
//                     )}
//                 </ScrollView>
//
//                 {showPostPreview && hasPostContext && (
//                     <View className="mb-6  px-3">
//                         <GlassView
//                             glassEffectStyle="regular"
//                             style={{
//                                 borderRadius: 20,
//                                 padding: 16,
//                                 shadowColor: '#000',
//                                 shadowOffset: { width: 0, height: 2 },
//                                 shadowOpacity: 0.1,
//                                 shadowRadius: 8,
//                                 elevation: 3,
//                             }}
//                         >
//                             <View className="flex-row items-center mb-3">
//                                 <Ionicons name="information-circle" size={24} color="#007AFF" />
//                                 <Text className="text-gray-700 font-semibold text-base ml-2">
//                                     About this post
//                                 </Text>
//                             </View>
//
//                             {postImage && (
//                                 <Image
//                                     source={{ uri: postImage as string }}
//                                     className="w-full h-40 rounded-xl mb-3"
//                                     resizeMode="cover"
//                                 />
//                             )}
//
//                             <Text className="text-gray-900 font-bold text-lg mb-2">
//                                 {postTitle}
//                             </Text>
//                             <Text className="text-gray-600 text-sm mb-3" numberOfLines={2}>
//                                 {postContent}
//                             </Text>
//
//                             <View className="flex-row flex-wrap gap-2 mb-4">
//                                 {postType && (
//                                     <View className="flex-row items-center bg-[#c9c8eb] px-3 py-1.5 rounded-full">
//                                         <Ionicons name="pricetag" size={12} color="#5250e1" />
//                                         <Text className="text-[#5250e1] text-xs ml-1 font-medium">
//                                             {postType}
//                                         </Text>
//                                     </View>
//                                 )}
//                                 {postBuilding && (
//                                     <View className="flex-row items-center bg-gray-100 px-3 py-1.5 rounded-full">
//                                         <Ionicons name="business-outline" size={12} color="#6B7280" />
//                                         <Text className="text-gray-600 text-xs ml-1">
//                                             {postBuilding}
//                                         </Text>
//                                     </View>
//                                 )}
//                                 {postRoom && (
//                                     <View className="flex-row items-center bg-gray-100 px-3 py-1.5 rounded-full">
//                                         <Ionicons name="location-outline" size={12} color="#6B7280" />
//                                         <Text className="text-gray-600 text-xs ml-1">
//                                             {postRoom}
//                                         </Text>
//                                     </View>
//                                 )}
//                             </View>
//
//                             <TouchableOpacity
//                                 onPress={handleSendPostInfo}
//                                 disabled={sending}
//                                 activeOpacity={0.7}
//                                 className="mt-2"
//                             >
//                                 <GlassView
//                                     glassEffectStyle="clear"
//                                     style={{
//                                         backgroundColor: '#007AFF',
//                                         borderRadius: 12,
//                                         paddingVertical: 12,
//                                         paddingHorizontal: 16,
//                                         shadowColor: '#007AFF',
//                                         shadowOffset: { width: 0, height: 2 },
//                                         shadowOpacity: 0.3,
//                                         shadowRadius: 4,
//                                         elevation: 3,
//                                     }}
//                                 >
//                                     <View className="flex-row items-center justify-center">
//                                         {sending ? (
//                                             <ActivityIndicator size="small" color="white" />
//                                         ) : (
//                                             <>
//                                                 <Ionicons name="send" size={16} color="white" />
//                                                 <Text className="text-white font-semibold ml-2">
//                                                     Send post details to owner
//                                                 </Text>
//                                             </>
//                                         )}
//                                     </View>
//                                 </GlassView>
//                             </TouchableOpacity>
//
//                             <TouchableOpacity
//                                 onPress={() => setShowPostPreview(false)}
//                                 className="mt-2"
//                             >
//                                 <Text className="text-gray-500 text-center text-sm">
//                                     Skip and type your own message
//                                 </Text>
//                             </TouchableOpacity>
//                         </GlassView>
//                     </View>
//                 )}
//
//
//                 {/* Input Area with Glass Effect */}
//                 <View className="px-4 py-3">
//                     <View className="flex-row items-center">
//                         <GlassView
//                             glassEffectStyle="regular"
//                             style={{
//                                 flex: 1,
//                                 borderRadius: 100,
//                                 paddingHorizontal: 16,
//                                 paddingVertical: 12,
//                                 marginRight: 8,
//                                 shadowColor: '#000',
//                                 shadowOffset: { width: 0, height: 1 },
//                                 shadowOpacity: 0.05,
//                                 shadowRadius: 2,
//                                 marginBottom: 10
//                             }}
//                         >
//                             <TextInput
//                                 value={inputText}
//                                 onChangeText={setInputText}
//                                 placeholder="Type a message..."
//                                 placeholderTextColor="#9CA3AF"
//                                 className="text-mb"
//                                 multiline
//                                 maxLength={500}
//                                 editable={!sending}
//                                 style={{ minHeight: 24, maxHeight: 100 }}
//                             />
//                         </GlassView>
//
//                         <TouchableOpacity
//                             onPress={handleSend}
//                             disabled={!inputText.trim() || sending}
//                             activeOpacity={0.7}
//                         >
//                             <GlassView
//                                 glassEffectStyle="clear"
//                                 style={{
//                                     width: 48,
//                                     height: 48,
//                                     borderRadius: 24,
//                                     alignItems: 'center',
//                                     justifyContent: 'center',
//                                     backgroundColor: inputText.trim() && !sending ? '#007AFF' : '#E5E7EB',
//                                     shadowColor: inputText.trim() ? '#007AFF' : '#000',
//                                     shadowOffset: { width: 0, height: 2 },
//                                     shadowOpacity: inputText.trim() ? 0.3 : 0.1,
//                                     shadowRadius: 4,
//                                     elevation: 3,
//                                     marginBottom: 10
//                                 }}
//                             >
//                                 {sending ? (
//                                     <ActivityIndicator size="small" color="white" />
//                                 ) : (
//                                     <Ionicons
//                                         name="send"
//                                         size={20}
//                                         color={inputText.trim() ? "white" : "#9CA3AF"}
//                                     />
//                                 )}
//                             </GlassView>
//                         </TouchableOpacity>
//                     </View>
//                 </View>
//             </View>
//         </KeyboardAvoidingView>
//     );
// };
//
// export default ChatRoom;


import {
    Text,
    View,
    TextInput,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ActivityIndicator,
    Image
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useRef, useEffect, useState } from "react";
import { useMessages } from "@/hooks/useChat";
import { sendMessage, markMessagesAsRead, formatChatTime } from "@/api/chatApi";
import { useMe } from "@/hooks/useMe";
import * as Clipboard from 'expo-clipboard';
import { Ionicons } from "@expo/vector-icons";
import { GlassView } from "expo-glass-effect";

const ChatRoom = () => {
    const {
        id,
        otherUserEmail,
        otherUserName,
        otherUserAvatar,
        // Post details from navigation params
        postTitle,
        postContent,
        postType,
        postBuilding,
        postRoom,
        postImage
    } = useLocalSearchParams();

    const { messages, loading } = useMessages(id as string);
    const { userData } = useMe();
    const [inputText, setInputText] = useState('');
    const [sending, setSending] = useState(false);
    const [showPostPreview, setShowPostPreview] = useState(false);
    const scrollViewRef = useRef<ScrollView>(null);

    // Check if this chat was opened from a post
    const hasPostContext = postTitle && postContent;

    useEffect(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
    }, [messages]);

    useEffect(() => {
        if (id && userData?.email) {
            markMessagesAsRead(id as string, userData.email);
        }
    }, [id, userData?.id]);

    // Show post preview if opened from post and no messages sent yet
    useEffect(() => {
        if (hasPostContext && messages.length === 0) {
            setShowPostPreview(true);
        }
    }, [hasPostContext, messages.length]);

    const handleSend = async () => {
        if (!inputText.trim() || !id || !userData?.id || !otherUserEmail) return;

        setSending(true);
        try {
            await sendMessage(
                id as string,
                userData.email,
                inputText.trim(),
                otherUserEmail as string
            );
            setInputText('');
            setShowPostPreview(false);
        } catch (error) {
            console.error('Error sending message:', error);
        } finally {
            setSending(false);
        }
    };

    const handleSendPostInfo = async () => {
        // Create a special message object with post data
        const postMessageData = {
            text: "This is what i'm looking for",
            type: "post_reference",
            postData: {
                title: postTitle,
                content: postContent,
                type: postType,
                building: postBuilding,
                room: postRoom,
                image: postImage
            }
        };

        setSending(true);
        try {
            await sendMessage(
                id as string,
                userData.email,
                JSON.stringify(postMessageData), // Send as JSON string
                otherUserEmail as string
            );
            setShowPostPreview(false);
        } catch (error) {
            console.error('Error sending message:', error);
        } finally {
            setSending(false);
        }
    };

    if (loading) {
        return (
            <View className="flex-1 items-center justify-center bg-white">
                <ActivityIndicator size="large" color="#007AFF" />
            </View>
        );
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            className="flex-1"
            keyboardVerticalOffset={30}
        >
            <View className="flex-1 bg-gradient-to-b from-gray-50 to-white">
                {/* Messages Area */}
                <ScrollView
                    ref={scrollViewRef}
                    className="flex-1 px-4 pt-[140px]"
                    contentContainerStyle={{ paddingBottom: 20 }}
                    showsVerticalScrollIndicator={false}
                    onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
                >
                    {messages.length === 0 && !showPostPreview ? (
                        <View className="items-center justify-center mt-20">
                            <GlassView
                                glassEffectStyle="regular"
                                style={{
                                    paddingHorizontal: 24,
                                    paddingVertical: 32,
                                    borderRadius: 20,
                                    alignItems: 'center',
                                }}
                            >
                                <Ionicons name="chatbubbles-outline" size={48} color="#9CA3AF" />
                                <Text className="text-gray-400 text-base mt-4 font-semibold">No messages yet</Text>
                                <Text className="text-gray-400 text-sm mt-1">Start the conversation!</Text>
                            </GlassView>
                        </View>
                    ) : (
                        <>
                            {/* Post Preview Card - Shows at top if opened from post */}

                            {/* Messages */}
                            {/* Messages */}
                            {messages.map((message, index) => {
                                const isMyMessage = message.senderEmail === userData?.email;
                                const currentTime = message.createdAt?.toDate ? message.createdAt.toDate().getTime() : new Date(message.createdAt).getTime();
                                const prevTime = index > 0
                                    ? (messages[index - 1].createdAt?.toDate
                                        ? messages[index - 1].createdAt.toDate().getTime()
                                        : new Date(messages[index - 1].createdAt).getTime())
                                    : 0;
                                const showTimestamp = index === 0 || (currentTime - prevTime > 300000);

                                // Try to parse message as post reference
                                let parsedMessage = null;
                                let isPostReference = false;
                                try {
                                    parsedMessage = JSON.parse(message.text);
                                    isPostReference = parsedMessage.type === "post_reference";
                                } catch (e) {
                                    // Not a JSON message, render as normal
                                }

                                return (
                                    <View key={message.id}>
                                        {showTimestamp && (
                                            <View className="items-center my-4">
                                                <GlassView
                                                    glassEffectStyle="clear"
                                                    style={{
                                                        paddingHorizontal: 12,
                                                        paddingVertical: 4,
                                                        borderRadius: 12,
                                                    }}
                                                >
                                                    <Text className="text-xs text-gray-500">
                                                        {formatChatTime(message.createdAt)}
                                                    </Text>
                                                </GlassView>
                                            </View>
                                        )}

                                        <View
                                            className={`flex-row mb-3 ${isMyMessage ? 'justify-end' : 'justify-start'}`}
                                        >
                                            {isPostReference ? (
                                                // Render Post Reference Card
                                                <View className="max-w-[85%]">
                                                    <GlassView
                                                        glassEffectStyle="regular"
                                                        style={{
                                                            borderRadius: 16,
                                                            padding: 12,
                                                            shadowColor: '#000',
                                                            shadowOffset: { width: 0, height: 2 },
                                                            shadowOpacity: 0.1,
                                                            shadowRadius: 6,
                                                            elevation: 3,
                                                        }}
                                                    >
                                                        <View className="flex-row items-center mb-2">
                                                            <Ionicons name="link-outline" size={16} color="#007AFF" />
                                                            <Text className="text-gray-600 text-xs ml-1 font-medium">
                                                                Post Reference
                                                            </Text>
                                                        </View>

                                                        {parsedMessage.postData.image && (
                                                            <Image
                                                                source={{ uri: parsedMessage.postData.image }}
                                                                className="w-full h-32 rounded-lg mb-2"
                                                                resizeMode="cover"
                                                            />
                                                        )}

                                                        <Text className="text-gray-900 font-bold text-base mb-1">
                                                            {parsedMessage.postData.title}
                                                        </Text>
                                                        <Text className="text-gray-600 text-xs mb-2" numberOfLines={2}>
                                                            {parsedMessage.postData.content}
                                                        </Text>

                                                        <View className="flex-row flex-wrap gap-1">
                                                            {parsedMessage.postData.type && (
                                                                <View className="flex-row items-center bg-[#c9c8eb] px-2 py-1 rounded-full">
                                                                    <Ionicons name="pricetag" size={10} color="#5250e1" />
                                                                    <Text className="text-[#5250e1] text-[10px] ml-1 font-medium">
                                                                        {parsedMessage.postData.type}
                                                                    </Text>
                                                                </View>
                                                            )}
                                                            {parsedMessage.postData.building && (
                                                                <View className="flex-row items-center bg-gray-100 px-2 py-1 rounded-full">
                                                                    <Ionicons name="business-outline" size={10} color="#6B7280" />
                                                                    <Text className="text-gray-600 text-[10px] ml-1">
                                                                        {parsedMessage.postData.building}
                                                                    </Text>
                                                                </View>
                                                            )}
                                                            {parsedMessage.postData.room && (
                                                                <View className="flex-row items-center bg-gray-100 px-2 py-1 rounded-full">
                                                                    <Ionicons name="location-outline" size={10} color="#6B7280" />
                                                                    <Text className="text-gray-600 text-[10px] ml-1">
                                                                        {parsedMessage.postData.room}
                                                                    </Text>
                                                                </View>
                                                            )}
                                                        </View>

                                                        <View className="flex-row items-center justify-between mt-2 pt-2 border-t border-gray-200">
                                                            <Text className="text-[#007AFF] text-xs font-medium">
                                                                {parsedMessage.text}
                                                            </Text>
                                                            <Text className="text-[10px] text-gray-500">
                                                                {(message.createdAt?.toDate
                                                                        ? message.createdAt.toDate()
                                                                        : new Date(message.createdAt)
                                                                ).toLocaleTimeString('en-US', {
                                                                    hour: 'numeric',
                                                                    minute: '2-digit',
                                                                    hour12: true
                                                                })}
                                                            </Text>
                                                        </View>
                                                    </GlassView>
                                                </View>
                                            ) : (
                                                // Render Normal Message
                                                <Pressable
                                                    onLongPress={() => {
                                                        Clipboard.setStringAsync(message.text);
                                                    }}
                                                    className="max-w-[75%]"
                                                >
                                                    <GlassView
                                                        glassEffectStyle={isMyMessage ? "clear" : "regular"}
                                                        style={{
                                                            borderRadius: 20,
                                                            paddingHorizontal: 16,
                                                            paddingVertical: 12,
                                                            backgroundColor: isMyMessage ? '#007AFF' : undefined,
                                                            shadowColor: '#000',
                                                            shadowOffset: { width: 0, height: 1 },
                                                            shadowOpacity: 0.1,
                                                            shadowRadius: 3,
                                                            elevation: 2,
                                                        }}
                                                    >
                                                        <Text
                                                            selectable={true}
                                                            className={`text-base leading-5 ${
                                                                isMyMessage ? 'text-white' : 'text-gray-900'
                                                            }`}
                                                        >
                                                            {message.text}
                                                        </Text>
                                                        <View className="flex-row items-center justify-end mt-1">
                                                            <Text className={`text-[10px] ${
                                                                isMyMessage ? 'text-white/70' : 'text-gray-500'
                                                            }`}>
                                                                {(message.createdAt?.toDate
                                                                        ? message.createdAt.toDate()
                                                                        : new Date(message.createdAt)
                                                                ).toLocaleTimeString('en-US', {
                                                                    hour: 'numeric',
                                                                    minute: '2-digit',
                                                                    hour12: true
                                                                })}
                                                            </Text>
                                                            {isMyMessage && (
                                                                <Ionicons
                                                                    name={message.read ? "checkmark-done" : "checkmark"}
                                                                    size={12}
                                                                    color="rgba(255,255,255,0.7)"
                                                                    style={{ marginLeft: 4 }}
                                                                />
                                                            )}
                                                        </View>
                                                    </GlassView>
                                                </Pressable>
                                            )}
                                        </View>
                                    </View>
                                );
                            })}
                        </>
                    )}
                </ScrollView>


                {showPostPreview && hasPostContext && (
                    <View className="mb-6 px-3">
                        <GlassView
                            glassEffectStyle="regular"
                            style={{
                                borderRadius: 20,
                                padding: 16,
                                shadowColor: '#000',
                                shadowOffset: { width: 0, height: 2 },
                                shadowOpacity: 0.1,
                                shadowRadius: 8,
                                elevation: 3,
                            }}
                        >
                            <View className="flex-row items-center mb-3">
                                <Ionicons name="information-circle" size={24} color="#007AFF" />
                                <Text className="text-gray-700 font-semibold text-base ml-2">
                                    About this post
                                </Text>
                            </View>

                            {postImage && (
                                <Image
                                    source={{ uri: postImage as string }}
                                    className="w-full h-40 rounded-xl mb-3"
                                    resizeMode="cover"
                                />
                            )}

                            <Text className="text-gray-900 font-bold text-lg mb-2">
                                {postTitle}
                            </Text>
                            <Text className="text-gray-600 text-sm mb-3" numberOfLines={2}>
                                {postContent}
                            </Text>

                            <View className="flex-row flex-wrap gap-2 mb-4">
                                {postType && (
                                    <View className="flex-row items-center bg-[#c9c8eb] px-3 py-1.5 rounded-full">
                                        <Ionicons name="pricetag" size={12} color="#5250e1" />
                                        <Text className="text-[#5250e1] text-xs ml-1 font-medium">
                                            {postType}
                                        </Text>
                                    </View>
                                )}
                                {postBuilding && (
                                    <View className="flex-row items-center bg-gray-100 px-3 py-1.5 rounded-full">
                                        <Ionicons name="business-outline" size={12} color="#6B7280" />
                                        <Text className="text-gray-600 text-xs ml-1">
                                            {postBuilding}
                                        </Text>
                                    </View>
                                )}
                                {postRoom && (
                                    <View className="flex-row items-center bg-gray-100 px-3 py-1.5 rounded-full">
                                        <Ionicons name="location-outline" size={12} color="#6B7280" />
                                        <Text className="text-gray-600 text-xs ml-1">
                                            {postRoom}
                                        </Text>
                                    </View>
                                )}
                            </View>

                            <TouchableOpacity
                                onPress={handleSendPostInfo}
                                disabled={sending}
                                activeOpacity={0.7}
                                className="mt-2"
                            >
                                <GlassView
                                    glassEffectStyle="clear"
                                    style={{
                                        backgroundColor: '#007AFF',
                                        borderRadius: 12,
                                        paddingVertical: 12,
                                        paddingHorizontal: 16,
                                        shadowColor: '#007AFF',
                                        shadowOffset: { width: 0, height: 2 },
                                        shadowOpacity: 0.3,
                                        shadowRadius: 4,
                                        elevation: 3,
                                    }}
                                >
                                    <View className="flex-row items-center justify-center">
                                        {sending ? (
                                            <ActivityIndicator size="small" color="white" />
                                        ) : (
                                            <>
                                                <Ionicons name="send" size={16} color="white" />
                                                <Text className="text-white font-semibold ml-2">
                                                    Send post details to owner
                                                </Text>
                                            </>
                                        )}
                                    </View>
                                </GlassView>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => setShowPostPreview(false)}
                                className="mt-2"
                            >
                                <Text className="text-gray-500 text-center text-sm">
                                    Skip and type your own message
                                </Text>
                            </TouchableOpacity>
                        </GlassView>
                    </View>
                )}

                {/* Input Area with Glass Effect */}
                <View className="px-4 py-3">
                    <View className="flex-row items-center">
                        <GlassView
                            glassEffectStyle="regular"
                            style={{
                                flex: 1,
                                borderRadius: 100,
                                paddingHorizontal: 16,
                                paddingVertical: 12,
                                marginRight: 8,
                                shadowColor: '#000',
                                shadowOffset: { width: 0, height: 1 },
                                shadowOpacity: 0.05,
                                shadowRadius: 2,
                                marginBottom: 10
                            }}
                        >
                            <TextInput
                                value={inputText}
                                onChangeText={setInputText}
                                placeholder="Type a message..."
                                placeholderTextColor="#9CA3AF"
                                className="text-mb"
                                multiline
                                maxLength={500}
                                editable={!sending}
                                style={{ minHeight: 24, maxHeight: 100 }}
                            />
                        </GlassView>

                        <TouchableOpacity
                            onPress={handleSend}
                            disabled={!inputText.trim() || sending}
                            activeOpacity={0.7}
                        >
                            <GlassView
                                glassEffectStyle="clear"
                                style={{
                                    width: 48,
                                    height: 48,
                                    borderRadius: 24,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: inputText.trim() && !sending ? '#007AFF' : '#E5E7EB',
                                    shadowColor: inputText.trim() ? '#007AFF' : '#000',
                                    shadowOffset: { width: 0, height: 2 },
                                    shadowOpacity: inputText.trim() ? 0.3 : 0.1,
                                    shadowRadius: 4,
                                    elevation: 3,
                                    marginBottom: 10
                                }}
                            >
                                {sending ? (
                                    <ActivityIndicator size="small" color="white" />
                                ) : (
                                    <Ionicons
                                        name="send"
                                        size={20}
                                        color={inputText.trim() ? "white" : "#9CA3AF"}
                                    />
                                )}
                            </GlassView>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
};

export default ChatRoom;