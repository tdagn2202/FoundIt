import React from "react";
import { View, Text, TouchableOpacity, Modal, FlatList, Image, ScrollView, ImageBackground } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

interface MatchedPost {
    id: string;
    title: string;
    description: string;
    location: string;
    date: string;
    image?: string;
    category: string;
    distance: string;
}

interface NearbyMatchModalProps {
    visible: boolean;
    onClose: () => void;
    onSelectPost: (postId: string) => void;
    onContinueAnyway: () => void;
    matchedPosts: MatchedPost[];
    backgroundImage?: any;
}

const NearbyMatchModal: React.FC<NearbyMatchModalProps> = ({
                                                               visible,
                                                               onClose,
                                                               onSelectPost,
                                                               onContinueAnyway,
                                                               matchedPosts,
                                                               backgroundImage,
                                                           }) => {
    return (
        <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
            <View style={{ flex: 1, backgroundColor: "rgba(0, 0, 0, 0.6)" }}>
                <View className="flex-1 justify-end">
                    <View className="bg-white rounded-t-3xl overflow-hidden" style={{ maxHeight: "85%", height: 700 }}>
                        {/* Header Section with Background Image */}
                        <View className="relative">
                            {backgroundImage && (
                                <ImageBackground
                                    source={backgroundImage}
                                    style={{
                                        position: "absolute",
                                        width: "100%",
                                        height: "100%",
                                        opacity: 0.3,
                                    }}
                                    resizeMode="cover"
                                />
                            )}

                            <View className="px-6 pt-8 pb-6">
                                <View className="flex-row items-center justify-between mb-4">
                                    <View className="flex-1">
                                        <View className="flex-row items-center mb-2">
                                            <View className="bg-blue-100 p-2 rounded-full mr-3">
                                                <Ionicons name="location" size={24} color="#5250E1" />
                                            </View>
                                            <Text className="text-gray-900 text-2xl font-bold">
                                                Nearby Matches
                                            </Text>
                                        </View>
                                        <Text className="text-gray-600 text-base">
                                            We found {matchedPosts.length} similar {matchedPosts.length === 1 ? 'post' : 'posts'} nearby that might match your item
                                        </Text>
                                    </View>
                                    <TouchableOpacity
                                        onPress={onClose}
                                        className="bg-gray-200 p-2 rounded-full"
                                    >
                                        <Ionicons name="close" size={24} color="#374151" />
                                    </TouchableOpacity>
                                </View>
                            </View>

                            {/* Gradient Overlay - white to transparent (bottom to top) */}
                            <LinearGradient
                                colors={["rgba(255, 255, 255, 1)", "rgba(255, 255, 255, 0)"]}
                                start={{ x: 0, y: 1 }}
                                end={{ x: 0, y: 0 }}
                                style={{
                                    position: "absolute",
                                    bottom: 0,
                                    left: 0,
                                    right: 0,
                                    height: 40,
                                }}
                            />
                        </View>

                        {/* Info Banner */}
                        <View className="bg-amber-50 border-l-4 border-amber-400 px-6 py-4 mx-6 mt-4 rounded-lg pb-2">
                            <View className="flex-row items-start">
                                <Ionicons name="information-circle" size={20} color="#f59e0b" />
                                <Text className="flex-1 ml-2 text-amber-800 text-sm">
                                    These post are some recommendation for the information you've inputted, check it out for any matching!
                                </Text>
                            </View>
                        </View>

                        {/* Matched Posts List */}
                        <ScrollView className="flex-1 px-6 py-4">
                            {matchedPosts.map((post, index) => (
                                <TouchableOpacity
                                    key={post.id}
                                    onPress={() => onSelectPost(post.id)}
                                    className="mb-4 bg-white rounded-2xl border-2 border-gray-200 overflow-hidden"
                                    style={{
                                        shadowColor: "#000",
                                        shadowOffset: { width: 0, height: 2 },
                                        shadowOpacity: 0.1,
                                        shadowRadius: 8,
                                        elevation: 3,
                                    }}
                                >
                                    <View className="flex-row">
                                        {/* Image */}
                                        {post.image ? (
                                            <Image
                                                source={{ uri: post.image }}
                                                className="w-24 h-40 bg-gray-200"
                                                resizeMode="cover"
                                            />
                                        ) : (
                                            <View className="w-24 h-60 bg-gray-200 items-center justify-center">
                                                <Ionicons name="image-outline" size={32} color="#9ca3af" />
                                            </View>
                                        )}

                                        {/* Content */}
                                        <View className="flex-1 p-4">
                                            <View className="flex-row items-start justify-between mb-2">
                                                <Text className="text-lg font-bold text-gray-900 flex-1" numberOfLines={1}>
                                                    {post.title}
                                                </Text>
                                            </View>

                                            <Text className="text-sm text-gray-600 mb-2" numberOfLines={2}>
                                                {post.description}
                                            </Text>

                                            <View className="flex-row items-center gap-3">
                                                <View className="flex-row items-center">
                                                    <Ionicons name="location-outline" size={14} color="#6b7280" />
                                                    <Text className="text-xs text-gray-500 ml-1" numberOfLines={1}>
                                                        {post.location}
                                                    </Text>
                                                </View>

                                            </View>

                                            <View className="flex-row items-center mt-2">
                                                <View className="bg-blue-100 px-2 py-1 rounded-full">
                                                    <Text className="text-xs font-bold text-blue-600">
                                                        {post.category}
                                                    </Text>
                                                </View>
                                                <View className="flex-row items-center ml-2">
                                                    <Ionicons name="time-outline" size={12} color="#9ca3af" />
                                                    <Text className="text-xs text-gray-400 ml-1">
                                                        {post.date}
                                                    </Text>
                                                </View>
                                            </View>
                                        </View>

                                        {/* Arrow */}
                                        <View className="items-center justify-center px-3">
                                            <Ionicons name="chevron-forward" size={24} color="#d1d5db" />
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>

                        {/* Action Buttons */}
                        <View className="bg-white px-6 pb-6 pt-4 border-t border-gray-200">
                            <TouchableOpacity
                                onPress={onContinueAnyway}
                                className="bg-blue-600 py-4 rounded-xl mb-3"
                            >
                                <Text className="text-center text-white text-lg font-bold">
                                    None Match - Go to home page and wait!
                                </Text>
                            </TouchableOpacity>


                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default NearbyMatchModal;