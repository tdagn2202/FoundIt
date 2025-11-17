import {Text, TouchableOpacity, View} from "react-native";

type props = {
    onPress: () => void
}

const NewPostHeaderRight = ({onPress}:props) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View className="justify-center item-center px-1.5">
                <Text className="font-bold">New post</Text>
            </View>
        </TouchableOpacity>
    )
}

export default NewPostHeaderRight;