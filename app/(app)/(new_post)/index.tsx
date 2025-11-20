import {View, Text, Button, ScrollView} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {GlassView} from "expo-glass-effect";
import {useRouter} from "expo-router";
import OwnPostList from "@/components/NewPost/OwnPostList";
import {usePost} from "@/hooks/usePost";

const NewPost = () => {
    const insets = useSafeAreaInsets();
    const router = useRouter()

    const {posts, refetch} = usePost({options: "All"});

    return (
        <ScrollView>
            <View className="pt-5">
                <OwnPostList data={posts} refetch={refetch}/>
            </View>
        </ScrollView>
    )
}
export default NewPost