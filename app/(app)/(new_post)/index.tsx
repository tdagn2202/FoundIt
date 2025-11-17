import {View, Text, Button, ScrollView} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {GlassView} from "expo-glass-effect";
import {useRouter} from "expo-router";
import OwnPostList from "@/components/NewPost/OwnPostList";

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

const NewPost = () => {
    const insets = useSafeAreaInsets();
    const router = useRouter()
    return (
        <ScrollView>
            <View className="pt-5">
                <OwnPostList data={sampleData}/>
            </View>
        </ScrollView>
    )
}
export default NewPost