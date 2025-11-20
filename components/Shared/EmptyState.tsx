import {View, Text, Image} from "react-native";

const EmptyState = () => {
    return (
        <View className="flex-1 items-center justify-center px-6 py-12">
            <View className="items-center">
                {/* Image Container */}
                <View className="mb-6">
                    <Image
                        source={require("../../assets/images/404_vector.png")}
                        className="w-48 h-48"
                        resizeMode="contain"
                    />
                </View>

                {/* Text Content */}
                <View className="items-center space-y-2">
                    <Text className="text-[#d0b2fa] font-bold text-2xl text-center">
                        No Posts Found
                    </Text>
                    <Text className="text-gray-500 text-base text-center mt-2 max-w-xs">
                        There are no posts for this category yet. Try selecting a different category or check back
                        later.
                    </Text>
                </View>
            </View>
        </View>
    );
};

export default EmptyState;