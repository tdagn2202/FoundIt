import {Text, View} from "react-native";
import {useLocalSearchParams, useRouter} from "expo-router";

const ChatRoom = () => {
    const {id} = useLocalSearchParams();
    return(
        <View className={"flex justify-center items-center"}>
            <Text>Chat room {id}</Text>
        </View>
    )
}

export default ChatRoom