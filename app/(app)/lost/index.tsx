import {Image, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {SafeAreaView, useSafeAreaInsets} from "react-native-safe-area-context";
import HorizontalCategory from "@/components/Shared/HorizontalCategory";
import PostList from "@/components/NewFeed/PostList";
import {NativeTabs} from "expo-router/unstable-native-tabs";
import {useEffect, useRef, useState} from "react";
import {getPost} from "@/api/postsApi";
import {PostData, PostListProps} from "@/types/postProps";
import Button from "@/components/UI/Button";
import {usePost} from "@/hooks/usePost"; // Add this import

const Index = () => {
    const insets = useSafeAreaInsets();
    const scrollRef = useRef<ScrollView>(null);
    const { posts } = usePost({options: "Lost"});

    return (
        <View className="bg-white flex-1" style={{paddingTop: insets.top + 70}}>
            <View className="overflow-visible">
                <HorizontalCategory/>
            </View>

            <ScrollView
                ref={scrollRef}
                className="h-auto mt-5 pl-0 pt-3"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingBottom: insets.bottom + 60
                }}
            >
                <PostList data={posts}/>
            </ScrollView>
        </View>
    )
}

export default Index