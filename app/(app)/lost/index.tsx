import {Image, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {SafeAreaView, useSafeAreaInsets} from "react-native-safe-area-context";
import HorizontalCategory from "@/components/Shared/HorizontalCategory";
import PostList from "@/components/NewFeed/PostList";
import {NativeTabs} from "expo-router/unstable-native-tabs";
import {useEffect, useRef, useState, useMemo} from "react";
import {getPost} from "@/api/postsApi";
import {PostData, PostListProps} from "@/types/postProps";
import Button from "@/components/UI/Button";
import {usePost} from "@/hooks/usePost";

const Index = () => {
    const insets = useSafeAreaInsets();
    const scrollRef = useRef<ScrollView>(null);
    const { posts } = usePost({options: "Lost"});
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);


    const filteredPosts = useMemo(() => {
        if (!selectedCategory) {
            return posts;
        }

        return posts.filter(post => {
            // Check if post has items and get the first item's type
            if (post.item && post.item.length > 0) {
                const itemType = post.item[0].type.name;
                return itemType?.toLowerCase() === selectedCategory.toLowerCase();
            }
            return false;
        });
    }, [posts, selectedCategory]);

    return (
        <View className="bg-white flex-1" style={{paddingTop: insets.top + 70}}>
            <View className="overflow-visible">
                <HorizontalCategory
                    selectedCategory={selectedCategory}
                    onSelectCategory={setSelectedCategory}
                />
            </View>

            <ScrollView
                ref={scrollRef}
                className="h-auto mt-5 pl-0 pt-3"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingBottom: insets.bottom + 60
                }}
            >
                <PostList data={filteredPosts}/>
            </ScrollView>
        </View>
    )
}

export default Index