import {Image, Text, TouchableOpacity, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import Button from "@/components/UI/Button";

interface PostListProps {
    data: any[]
}

interface PostListItemProps {
    data: any
}


const PostListItem: React.FC<PostListItemProps> = ({ data }) => {
    return (
        <View className="bg-white rounded-3xl p-4 mx-4 mb-4"
              style={{
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 8,
                  elevation: 3,
              }}
        >
            {/* Header - User Info */}
            <View className="flex-row items-center mb-3">
                <Image
                    source={{ uri: data.userAvatar }}
                    className="w-12 h-12 rounded-full"
                />
                <View className="ml-3 flex-1">
                    <Text className="text-gray-900 font-semibold text-base">
                        {data.title}
                    </Text>
                    <View className="flex-row items-center mt-1">
                        <Ionicons name="time-outline" size={14} color="#5250e1" />
                        <Text className="text-[#5250e1] text-xs ml-1 font-medium">
                            {data.timeAgo}
                        </Text>
                    </View>
                </View>
            </View>

            {/* Description */}
            <Text className="text-[#464545] text-md mb-3">
                {data.description}
            </Text>

            {/* Tags */}
            <View className="flex-row items-center mb-4 flex-wrap">
                <View className="flex-row items-center bg-[#c9c8eb] px-3 py-1.5 rounded-full mr-2 mb-2">
                    <Ionicons name="card-outline" size={14} color="#5250e1" />
                    <Text className="text-[#5250e1] text-xs ml-1 font-medium">
                        Type: {data.type}
                    </Text>
                </View>
                <View className="flex-row items-center bg-gray-100 px-3 py-1.5 rounded-full mr-2 mb-2">
                    <Ionicons name="business-outline" size={14} color="#6B7280" />
                    <Text className="text-gray-600 text-xs ml-1">
                        Building: {data.building}
                    </Text>
                </View>
                <View className="flex-row items-center bg-gray-100 px-3 py-1.5 rounded-full mb-2">
                    <Ionicons name="location-outline" size={14} color="#6B7280" />
                    <Text className="text-gray-600 text-xs ml-1">
                        Room: {data.room}
                    </Text>
                </View>
            </View>

            {/* Student Card Image */}
            <Image
                source={{ uri: data.cardImage }}
                className="w-full h-72 rounded-2xl mb-4"
                resizeMode="contain"
            />

            {/* Action Button */}
            <Button text={"Got you, get in touch!"}/>
        </View>
    );
};

const PostList = ({data} : PostListProps) => {
    return (
        <View>
            {data.map((item, index) => (
                <PostListItem key={index} data={item} />
            ))}
        </View>
    )
}

export default PostList