import {Image, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {SafeAreaView, useSafeAreaInsets} from "react-native-safe-area-context";
import {Ionicons} from '@expo/vector-icons';
import GreetingHeader from "@/components/Shared/Header";
import HorizontalCategory from "@/components/Shared/HorizontalCategory";
import PostList from "@/components/NewFeed/PostList"; // Add this import

const sampleData = [
    {
        userAvatar: "https://i.pravatar.cc/150?img=2",
        title: "Giúp người người trả oán",
        timeAgo: "55 minutes ago",
        description: "Mình bị mất nếtt, mọi người tìm giúp mình với a",
        type: "Card",
        building: "ATL",
        room: "303",
        images: ["https://i.pinimg.com/736x/fd/42/d2/fd42d22f09949d3992b2b5e6edec2a12.jpg"]
    },
    {
        userAvatar: "https://i.pravatar.cc/150?img=2",
        title: "Hận đời đen bạc",
        timeAgo: "100 minutes ago",
        description: "Mình bị mất nếtt, mọi người tìm giúp mình với a",
        type: "Card",
        building: "DI",
        room: "201",
        images: [
            "https://picsum.photos/400/600",
            "https://picsum.photos/400/601",
            "https://picsum.photos/400/602"
        ]
    },
    {
        userAvatar: "https://i.pravatar.cc/150?img=2",
        title: "Giúp người người trả oán",
        timeAgo: "55 minutes ago",
        description: "Mình bị mất nếtt, mọi người tìm giúp mình với a",
        type: "Card",
        building: "DI",
        room: "201",
        images: [
            "https://picsum.photos/400/600",
            "https://picsum.photos/400/601",
            "https://picsum.photos/400/602",
            "https://picsum.photos/400/602",
            "https://picsum.photos/400/602"
        ]
    },
    // More items...
];


const Index = () => {
    const insets = useSafeAreaInsets();

    return (
        <View className="bg-white flex-1" style={{ paddingTop: insets.top+70 }}>
            <View className="overflow-visible">
                <HorizontalCategory/>
            </View>

            <ScrollView
                className="h-auto mt-5 pl-0 pt-3"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingBottom: insets.bottom + 60
                }}
            >
                <PostList data={sampleData}/>
            </ScrollView>
        </View>
    )
}

export default Index