import { Image, Text, View, ScrollView, Dimensions } from "react-native";
import { GlassView } from "expo-glass-effect";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface ItemData {
    id: string | number;
    userAvatar: string;
    title: string;
    timeAgo: string;
    description: string;
    type: string;
    building: string;
    room: string;
    images: string[];
    contactName?: string;
    contactEmail?: string;
    contactPhone?: string;
}

const FoundItemDetailPage = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Sample data - this would come from route params in real app
    const itemData: ItemData = {
        id: 1,
        userAvatar: "https://i.pravatar.cc/150?img=2",
        title: "Found Student ID Card",
        timeAgo: "2 hours ago",
        description: "Found this student ID card near the library. The owner can contact me to claim it.",
        type: "ID Card",
        building: "ATL",
        room: "303",
        images: [
            "https://picsum.photos/400/300",
            "https://picsum.photos/400/301",
            "https://picsum.photos/400/302"
        ],
        contactName: "Nguyen Van A",
        contactEmail: "nguyenvana@example.com",
        contactPhone: "+84 123 456 789"
    };

    const handleScroll = (event: any) => {
        const slideSize = SCREEN_WIDTH;
        const index = Math.round(event.nativeEvent.contentOffset.x / slideSize);
        setCurrentImageIndex(index);
    };

    const InfoRow = ({ icon, label, value }: { icon: string; label: string; value: string }) => (
        <View className="py-3">
            <View className="flex-row items-center mb-1.5">
                <Ionicons name={icon as any} size={16} color="#6B7280" />
                <Text className="text-xs text-gray-500 ml-2 uppercase tracking-wider">{label}</Text>
            </View>
            <Text className="text-base font-semibold text-gray-900 ml-6">{value}</Text>
        </View>
    );

    return (
        <ScrollView style={{ flex: 1, backgroundColor: '#fff', paddingBottom: 20 }}>
            {/* Image Carousel */}
            <View className="relative">
                <ScrollView
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onScroll={handleScroll}
                    scrollEventThrottle={16}
                >
                    {itemData.images.map((image, index) => (
                        <Image
                            key={index}
                            source={{ uri: image }}
                            style={{ width: SCREEN_WIDTH, height: 300 }}
                            resizeMode="cover"
                        />
                    ))}
                </ScrollView>

                {/* Image Indicator Dots */}
                <View className="absolute bottom-4 left-0 right-0 flex-row justify-center">
                    {itemData.images.map((_, index) => (
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
                        {itemData.title}
                    </Text>
                    <View className="flex-row items-center">
                        <Ionicons name="time-outline" size={16} color="#5250e1" />
                        <Text className="text-[#5250e1] text-sm ml-1 font-medium">
                            {itemData.timeAgo}
                        </Text>
                    </View>
                </View>

                {/* Tags */}
                <View className="flex-row flex-wrap mb-5">
                    <View className="flex-row items-center bg-[#c9c8eb] px-4 py-2 rounded-full mr-2 mb-2">
                        <Ionicons name="pricetag" size={14} color="#5250e1" />
                        <Text className="text-[#5250e1] text-sm ml-2 font-medium">
                            {itemData.type}
                        </Text>
                    </View>
                    <View className="flex-row items-center bg-gray-100 px-4 py-2 rounded-full mr-2 mb-2">
                        <Ionicons name="business-outline" size={14} color="#6B7280" />
                        <Text className="text-gray-600 text-sm ml-2">
                            {itemData.building}
                        </Text>
                    </View>
                    <View className="flex-row items-center bg-gray-100 px-4 py-2 rounded-full mb-2">
                        <Ionicons name="location-outline" size={14} color="#6B7280" />
                        <Text className="text-gray-600 text-sm ml-2">
                            Room {itemData.room}
                        </Text>
                    </View>
                </View>

                {/* Description */}
                <View className="mb-5">
                    <Text className="text-base font-semibold text-gray-900 mb-2">Description</Text>
                    <Text className="text-base text-gray-700 leading-6">
                        {itemData.description}
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
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.05,
                            shadowRadius: 6,
                        }}
                    >
                        <InfoRow
                            icon="pricetag-outline"
                            label="Item Type"
                            value={itemData.type}
                        />
                        <View className="h-px bg-gray-200" />

                        <InfoRow
                            icon="business-outline"
                            label="Building"
                            value={itemData.building}
                        />
                        <View className="h-px bg-gray-200" />

                        <InfoRow
                            icon="location-outline"
                            label="Room Number"
                            value={itemData.room}
                        />
                        <View className="h-px bg-gray-200" />

                        <InfoRow
                            icon="time-outline"
                            label="Posted"
                            value={itemData.timeAgo}
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
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.05,
                            shadowRadius: 6,
                        }}
                    >
                        <InfoRow
                            icon="person-outline"
                            label="Contact Name"
                            value={itemData.contactName || "Not provided"}
                        />
                        <View className="h-px bg-gray-200" />

                        <InfoRow
                            icon="mail-outline"
                            label="Email Address"
                            value={itemData.contactEmail || "Not provided"}
                        />
                        <View className="h-px bg-gray-200" />

                        <InfoRow
                            icon="call-outline"
                            label="Phone Number"
                            value={itemData.contactPhone || "Not provided"}
                        />
                    </GlassView>
                </View>

                {/* Action Button */}
                <View className="mt-3">
                    <View
                        className="bg-[#5250e1] py-4 rounded-full items-center"
                        style={{
                            shadowColor: '#5250e1',
                            shadowOffset: { width: 0, height: 4 },
                            shadowOpacity: 0.3,
                            shadowRadius: 8,
                            elevation: 5,
                        }}
                    >
                        <Text className="text-white text-lg font-bold">Contact Owner</Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

export default FoundItemDetailPage;