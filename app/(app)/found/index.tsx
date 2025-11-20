import {ScrollView, Text, View} from "react-native";
import GreetingHeader from "@/components/Shared/Header";
import {SafeAreaView, useSafeAreaInsets} from "react-native-safe-area-context";
import AnimatedInput from "@/components/UI/AnimatedInput";
import {Stack} from "expo-router";
import HorizontalCategory from "@/components/Shared/HorizontalCategory";
import PostList from "@/components/NewFeed/PostList";
import PostFoundList from "@/components/FoundThing/PostFoundList";
import {useRef} from "react";
import {usePost} from "@/hooks/usePost";


const FoundPage = () => {
    const insets = useSafeAreaInsets();
    const scrollRef = useRef<ScrollView>(null);
    const { posts } = usePost({options: "Found"});

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
                <PostFoundList data={posts}/>
            </ScrollView>
        </View>
    )
}

export default FoundPage