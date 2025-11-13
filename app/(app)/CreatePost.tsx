import {Text, View} from "react-native";
import GreetingHeader from "@/components/Shared/Header";
import {SafeAreaView} from "react-native-safe-area-context";

const CreatePost = () => {
    return (
        <SafeAreaView className="flex-1 bg-white">
            <GreetingHeader screenTitle={"New post"} />
        </SafeAreaView>
    )
}

export default CreatePost