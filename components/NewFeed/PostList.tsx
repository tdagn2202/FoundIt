import {Alert, Image, Text, TouchableOpacity, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import Button from "@/components/UI/Button";
import {useRouter} from "expo-router";
import {PostImage, PostListItemProps, PostListProps} from "@/types/postProps";
import {timeAgoMinutesOrHours} from "@/helper/minuteAgo";
import {useMe} from "@/hooks/useMe";
import {getOrCreateChat} from "@/api/chatApi";
import EmptyState from "@/components/Shared/EmptyState";


const ImageGallery = ({images}: { images: PostImage[] }) => {
    if (!images || images.length === 0) {
        // console.log("This post has no images")
        return null;
    }

    const imageCount = images.length;

    // 1 image - Full width
    if (imageCount === 1) {
        return (
            <Image
                source={{uri: images[0].url}}
                className="w-full h-72 rounded-2xl"
                resizeMode="cover"
            />
        );
    }

    // 2 images - Side by side
    if (imageCount === 2) {
        return (
            <View className="flex-row gap-2">
                {images.slice(0, 2).map((img) => (
                    <Image
                        key={img.id}
                        source={{uri: img.url}}
                        className="flex-1 h-48 rounded-2xl"
                        resizeMode="cover"
                    />
                ))}
            </View>
        );
    }

    // 3 images - First image takes left half, two images stacked on right
    if (imageCount === 3) {
        return (
            <View className="flex-row gap-2 h-72">
                <Image
                    source={{uri: images[0].url}}
                    className="flex-1 rounded-2xl"
                    resizeMode="cover"
                />
                <View className="flex-1 gap-2">
                    <Image
                        source={{uri: images[1].url}}
                        className="flex-1 rounded-2xl"
                        resizeMode="cover"
                    />
                    <Image
                        source={{uri: images[2].url}}
                        className="flex-1 rounded-2xl"
                        resizeMode="cover"
                    />
                </View>
            </View>
        );
    }

    // 4+ images - 2x2 grid, last image with overlay if more than 4
    const remainingCount = imageCount - 4;
    const displayImages = images.slice(0, 4);

    return (
        <View className="gap-2">
            <View className="flex-row gap-2">
                {displayImages.slice(0, 2).map((img) => (
                    <Image
                        key={img.id}
                        source={{uri: img.url}}
                        className="flex-1 h-36 rounded-2xl"
                        resizeMode="cover"
                    />
                ))}
            </View>
            <View className="flex-row gap-2">
                {displayImages.slice(2, 4).map((img, idx) => (
                    <View key={img.id} className="flex-1 relative">
                        <Image
                            source={{uri: img.url}}
                            className="w-full h-36 rounded-2xl"
                            resizeMode="cover"
                        />
                        {/* Overlay for last image if more than 4 images */}
                        {idx === 1 && remainingCount > 0 && (
                            <View className="absolute inset-0 bg-black/60 rounded-2xl items-center justify-center">
                                <Text className="text-white text-3xl font-bold">
                                    +{remainingCount}
                                </Text>
                            </View>
                        )}
                    </View>
                ))}
            </View>
        </View>
    );
};

const PostListItem: React.FC<PostListItemProps> = ({data}) => {
    const router = useRouter();
    const {userData} = useMe();


    const handleContactOwner = async () => {
        if (!userData?.email || !data.user.email) {
            Alert.alert("Error", "Please login to contact the owner");
            return;
        }

        try {
            const chatId = await getOrCreateChat(
                userData.email,
                data.user.email,
                {name: userData.name, avatar: userData.avatar},
                {name: data.user.name, avatar: data.user.avatar}
            );

            // Pass post details to the chat room
            router.push({
                pathname: `/(app)/chat/${chatId}`,
                params: {
                    otherUserEmail: data.user.email,
                    otherUserName: data.user.name,
                    otherUserAvatar: data.user.avatar,
                    // Add post context
                    postTitle: data.title,
                    postContent: data.content,
                    postType: data.item[0].type.name,
                    postBuilding: data.facility?.college || '',
                    postRoom: data.room?.name || '',
                    postImage: data.item[0].images?.[0]?.url || ''
                }
            });
        } catch (error) {
            console.error("Error starting chat:", error);
            Alert.alert("Error", "Failed to start chat. Please try again.");
        }
    };

    return (
        <View className="bg-white rounded-3xl p-4 mx-4 mb-4"
              style={{
                  shadowColor: "#000",
                  shadowOffset: {width: 0, height: 2},
                  shadowOpacity: 0.1,
                  shadowRadius: 8,
                  elevation: 3,
              }}
        >
            {/* Header - User Info */}
            <View className="flex-row items-center mb-3">
                <Image
                    source={{uri: data.user.avatar}}
                    className="w-12 h-12 rounded-full"
                />
                <View className="ml-3 flex-1">
                    <Text className="text-gray-900 font-semibold text-base">
                        {data.user.name}
                    </Text>
                    <View className="flex-row items-center mt-1">
                        <Ionicons name="time-outline" size={14} color="#5250e1"/>
                        <Text className="text-[#5250e1] text-xs ml-1 font-medium">
                            {timeAgoMinutesOrHours(data.create_At)}
                        </Text>
                    </View>
                </View>
            </View>

            {/* Description */}
            <Text className="text-[#464545] text-md font-bold text-xl">
                {data.title}
            </Text>
            <Text className="text-[#464545] text-md mb-3">
                {data.content}
            </Text>

            {/* Tags */}
            <View className="flex-row items-center mb-4 flex-wrap">
                <View className="flex-row items-center bg-[#c9c8eb] px-3 py-1.5 rounded-full mr-2 mb-2">
                    <Ionicons name="card-outline" size={14} color="#5250e1"/>
                    <Text className="text-[#5250e1] text-xs ml-1 font-medium">
                        Type: {data.item[0].type.name}
                    </Text>
                </View>
                <View className="flex-row items-center bg-gray-100 px-3 py-1.5 rounded-full mr-2 mb-2">
                    <Ionicons name="business-outline" size={14} color="#6B7280"/>
                    <Text className="text-gray-600 text-xs ml-1">
                        Building: {data.facility?.college}
                    </Text>
                </View>
                <View className="flex-row items-center bg-gray-100 px-3 py-1.5 rounded-full mb-2">
                    <Ionicons name="location-outline" size={14} color="#6B7280"/>
                    <Text className="text-gray-600 text-xs ml-1">
                        Room: {data.room?.name}
                    </Text>
                </View>
            </View>

            {/* Image Gallery */}
            <View className="mb-4">
                <ImageGallery images={data.item[0].images}/>
            </View>


            {/* Action Button */}
            <Button text={"Got you, get in touch!"}
                    onPress={handleContactOwner}
                    isLoading={false}/>
        </View>
    );
};


const PostList = ({data}: PostListProps) => {
    const router = useRouter();
    const {userData} = useMe()

    if (!data || data.length === 0) {
        return <EmptyState />
    }

    const handlePress = (id: string | number) => {
        router.push(`/lost/${id}`)
    }

    return (
        <View>
            {data.map((item, index) => {
                return (
                    <TouchableOpacity
                        key={item.id || index}
                        activeOpacity={1}
                        onPress={() => {
                            console.log('TouchableOpacity pressed, item.id:', item.id);
                            handlePress(item.id);
                        }}
                    >
                        <PostListItem data={item}/>
                    </TouchableOpacity>
                )
            })}
        </View>
    )
}

export default PostList