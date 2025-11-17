import {Image, Text, TouchableOpacity, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import Button from "@/components/UI/Button";
import {useRouter} from "expo-router";
import PostList from "@/components/NewFeed/PostList";


interface PostData {
    id: string | number;
    userAvatar: string;
    title: string;
    timeAgo: string;
    description: string;
    type: string;
    building: string;
    room: string;
    images: string[];
}

interface PostListProps {
    data: PostData[]
}

interface PostListItemProps {
    data: PostData
}

const ImageGallery = ({images}: { images: string[] }) => {
    const imageCount = images.length;

    // 1 image - Full width
    if (imageCount === 1) {
        return (
            <Image
                source={{uri: images[0]}}
                className="w-full h-72 rounded-2xl"
                resizeMode="cover"
            />
        );
    }

    // 2 images - Side by side
    if (imageCount === 2) {
        return (
            <View className="flex-row gap-2">
                {images.slice(0, 2).map((img, idx) => (
                    <Image
                        key={idx}
                        source={{uri: img}}
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
                    source={{uri: images[0]}}
                    className="flex-1 rounded-2xl"
                    resizeMode="cover"
                />
                <View className="flex-1 gap-2">
                    <Image
                        source={{uri: images[1]}}
                        className="flex-1 rounded-2xl"
                        resizeMode="cover"
                    />
                    <Image
                        source={{uri: images[2]}}
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
                {displayImages.slice(0, 2).map((img, idx) => (
                    <Image
                        key={idx}
                        source={{uri: img}}
                        className="flex-1 h-36 rounded-2xl"
                        resizeMode="cover"
                    />
                ))}
            </View>
            <View className="flex-row gap-2">
                {displayImages.slice(2, 4).map((img, idx) => (
                    <View key={idx} className="flex-1 relative">
                        <Image
                            source={{uri: img}}
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
                    source={{uri: data.userAvatar}}
                    className="w-12 h-12 rounded-full"
                />
                <View className="ml-3 flex-1">
                    <Text className="text-gray-900 font-semibold text-base">
                        {data.title}
                    </Text>
                    <View className="flex-row items-center mt-1">
                        <Ionicons name="time-outline" size={14} color="#5250e1"/>
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
                    <Ionicons name="card-outline" size={14} color="#5250e1"/>
                    <Text className="text-[#5250e1] text-xs ml-1 font-medium">
                        Type: {data.type}
                    </Text>
                </View>
                <View className="flex-row items-center bg-gray-100 px-3 py-1.5 rounded-full mr-2 mb-2">
                    <Ionicons name="business-outline" size={14} color="#6B7280"/>
                    <Text className="text-gray-600 text-xs ml-1">
                        Building: {data.building}
                    </Text>
                </View>
                <View className="flex-row items-center bg-gray-100 px-3 py-1.5 rounded-full mb-2">
                    <Ionicons name="location-outline" size={14} color="#6B7280"/>
                    <Text className="text-gray-600 text-xs ml-1">
                        Room: {data.room}
                    </Text>
                </View>
            </View>

            {/* Image Gallery */}
            <View className="mb-4">
                <ImageGallery images={data.images}/>
            </View>


            {/* Action Button */}
            <Button text={"Got you, get in touch!"}/>
        </View>
    );
};

const PostFoundList = ({data}: PostListProps) => {
    const router = useRouter();

    const handlePress = (id: string | number) => {
        console.log('Pressed item with id:', id)
        console.log('Navigating to:', `/found/${id}`)
        router.push(`/found/${id}`)
    }

    console.log('PostFoundList data:', data)
    return (
        <View>
            {data.map((item, index) => {
                console.log(`=== Item ${index} ===`);
                console.log('item.id:', item.id);
                console.log('Full item keys:', Object.keys(item));

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

export default PostFoundList;