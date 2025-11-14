import {View, Text} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";

const NewPost = () => {
    const insets = useSafeAreaInsets();
    return (
        <View className="bg-white flex-1 pl-7" style={{ paddingTop: insets.top+70 }}>
            <Text>New post screen</Text>
        </View>
    )
}
export default NewPost