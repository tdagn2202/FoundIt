import {useState} from "react";
import {useLocalSearchParams} from "expo-router";
import {usePost} from "@/hooks/usePost";
import {Dimensions, Image, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {timeAgoMinutesOrHours} from "@/helper/minuteAgo";
import {GlassView} from "expo-glass-effect";
import {useContactOwner} from "@/hooks/useContactOwner";

const {width: SCREEN_WIDTH} = Dimensions.get('window');

const FoundItemDetailPage = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const {id} = useLocalSearchParams();
    const {post} = usePost({postId: Number(id)})

    const {handleContactOwner} = useContactOwner()


    const handleScroll = (event: any) => {
        const slideSize = SCREEN_WIDTH;
        const index = Math.round(event.nativeEvent.contentOffset.x / slideSize);
        setCurrentImageIndex(index);
    };

    const InfoRow = ({icon, label, value}: { icon: string; label: string; value: string }) => (
        <View className="py-3">
            <View className="flex-row items-center mb-1.5">
                <Ionicons name={icon as any} size={16} color="#6B7280"/>
                <Text className="text-xs text-gray-500 ml-2 uppercase tracking-wider">{label}</Text>
            </View>
            <Text className="text-base font-semibold text-gray-900 ml-6">{value}</Text>
        </View>
    );

    return (
        <ScrollView style={{flex: 1, backgroundColor: '#fff', paddingBottom: 20}}>
            {/* Image Carousel */}
            <View className="relative">
                <ScrollView
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onScroll={handleScroll}
                    scrollEventThrottle={16}
                >
                    {post?.item[0].images.map((image, index) => (
                        <Image
                            key={index}
                            source={{uri: image.url}}
                            style={{width: SCREEN_WIDTH, height: 300}}
                            resizeMode="cover"
                        />
                    ))}
                </ScrollView>

                {/* Image Indicator Dots */}
                <View className="absolute bottom-4 left-0 right-0 flex-row justify-center">
                    {post?.item[0].images.map((_, index) => (
                        <View
                            key={index}
                            className={`h-2 rounded-full mx-1 ${
                                index === currentImageIndex
                                    ? 'w-8 bg-white'
                                    : 'w-2 bg-white/50'
                            }`}
                        />
                    ))}
                </View>
            </View>

            <View className="px-5 pt-5 pb-10">
                {/* Title Section */}
                <View className="mb-5">
                    <Text className="text-2xl font-bold text-gray-900 mb-2">
                        {post?.title}
                    </Text>
                    <View className="flex-row items-center">
                        <Ionicons name="time-outline" size={16} color="#5250e1"/>
                        <Text className="text-[#5250e1] text-sm ml-1 font-medium">
                            {timeAgoMinutesOrHours(post?.create_At)}
                        </Text>
                    </View>
                </View>

                {/* Tags */}
                <View className="flex-row flex-wrap mb-5">
                    <View className="flex-row items-center bg-[#c9c8eb] px-4 py-2 rounded-full mr-2 mb-2">
                        <Ionicons name="pricetag" size={14} color="#5250e1"/>
                        <Text className="text-[#5250e1] text-sm ml-2 font-medium">
                            {post?.item[0].type.name}
                        </Text>
                    </View>
                    <View className="flex-row items-center bg-gray-100 px-4 py-2 rounded-full mr-2 mb-2">
                        <Ionicons name="business-outline" size={14} color="#6B7280"/>
                        <Text className="text-gray-600 text-sm ml-2">
                            {post?.facility.college}
                        </Text>
                    </View>
                    <View className="flex-row items-center bg-gray-100 px-4 py-2 rounded-full mb-2">
                        <Ionicons name="location-outline" size={14} color="#6B7280"/>
                        <Text className="text-gray-600 text-sm ml-2">
                            Room {post?.room.name}
                        </Text>
                    </View>
                </View>

                {/* Description */}
                <View className="mb-5">
                    <Text className="text-base font-semibold text-gray-900 mb-2">Description</Text>
                    <Text className="text-base text-gray-700 leading-6">
                        {post?.content}
                    </Text>
                </View>

                {/* Item Information Card */}
                <View className="mb-5">
                    <Text className="text-lg font-bold text-gray-900 mb-3">Item Details</Text>
                    <GlassView
                        glassEffectStyle="regular"
                        style={{
                            paddingHorizontal: 20,
                            paddingVertical: 4,
                            borderRadius: 20,
                            shadowColor: '#000',
                            shadowOffset: {width: 0, height: 2},
                            shadowOpacity: 0.05,
                            shadowRadius: 6,
                        }}
                    >
                        <InfoRow
                            icon="pricetag-outline"
                            label="Item Type"
                            value={post?.item[0].type?.name || ""}
                        />
                        <View className="h-px bg-gray-200"/>

                        <InfoRow
                            icon="business-outline"
                            label="Building"
                            value={post?.facility.college || ""}
                        />
                        <View className="h-px bg-gray-200"/>

                        <InfoRow
                            icon="location-outline"
                            label="Room Number"
                            value={post?.room?.name || ""}
                        />
                        <View className="h-px bg-gray-200"/>

                        <InfoRow
                            icon="time-outline"
                            label="Posted"
                            value={timeAgoMinutesOrHours(post?.create_At)}
                        />
                    </GlassView>
                </View>

                {/* Contact Information Card */}
                <View className="mb-5">
                    <Text className="text-lg font-bold text-gray-900 mb-3">Contact Information</Text>
                    <GlassView
                        glassEffectStyle="regular"
                        style={{
                            paddingHorizontal: 20,
                            paddingVertical: 4,
                            borderRadius: 20,
                            shadowColor: '#000',
                            shadowOffset: {width: 0, height: 2},
                            shadowOpacity: 0.05,
                            shadowRadius: 6,
                        }}
                    >
                        <InfoRow
                            icon="person-outline"
                            label="Contact Name"
                            value={post?.user?.name || "Not provided"}
                        />
                        <View className="h-px bg-gray-200"/>

                        <InfoRow
                            icon="mail-outline"
                            label="Email Address"
                            value={post?.user?.email || "Not provided"}
                        />
                        <View className="h-px bg-gray-200"/>

                        <InfoRow
                            icon="call-outline"
                            label="Phone Number"
                            value={post?.user?.phone || "Not provided"}
                        />
                    </GlassView>
                </View>

                <TouchableOpacity onPress={() => post && handleContactOwner(post)}>
                    <View className="mt-3">
                        <View
                            className="bg-[#5250e1] py-4 rounded-full items-center"
                            style={{
                                shadowColor: '#5250e1',
                                shadowOffset: {width: 0, height: 4},
                                shadowOpacity: 0.3,
                                shadowRadius: 8,
                                elevation: 5,
                            }}
                        >
                            <Text className="text-white text-lg font-bold">Contact Owner</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default FoundItemDetailPage;