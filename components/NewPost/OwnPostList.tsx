import {Image, Text, TouchableOpacity, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import Button from "@/components/UI/Button";
import {GlassView} from "expo-glass-effect";
import GlassViewIos from "expo-glass-effect/src/GlassView.ios";
import {useRef, useState} from "react";
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';


interface PostData {
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
    data: any[]
}

interface PostListItemProps {
    data: any
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
    type GlassEffectType = "clear" | "regular";

    const scale = useSharedValue(1);
    const [glassEffect, setGlassEffect] = useState<GlassEffectType>("regular");

    const handlePressIn = () => {
        setGlassEffect('clear');
        scale.value = withSpring(1.1, {
            damping: 10,
            stiffness: 300,
        });
    };

    const handlePressOut = () => {
        setGlassEffect('regular');
        scale.value = withSpring(1, {
            damping: 40,
            stiffness: 450,

        });
    };

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: scale.value }],
        };
    });
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
            <TouchableOpacity
                className="rounded-full"
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                activeOpacity={0.9}
            >
                <Animated.View style={animatedStyle}>
                    <GlassView
                        glassEffectStyle={glassEffect}
                        style={{
                            paddingHorizontal: 15,
                            height: 50,
                            paddingTop: 0,
                            borderRadius: 100,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <View className="p-3 justify-center item-center w-full rounded-full">
                            <Text className="text-center text-xl font-bold text-red-500">
                                Found! Hide my post
                            </Text>
                        </View>
                    </GlassView>
                </Animated.View>
            </TouchableOpacity>

        </View>
    );
};

const OwnPostList = ({data}: PostListProps) => {
    return (
        <View>
            {data.map((item, index) => (
                <PostListItem key={index} data={item}/>
            ))}
        </View>
    )
}

export default OwnPostList