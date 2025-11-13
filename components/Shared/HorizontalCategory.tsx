import { Animated, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ScrollView = Animated.ScrollView;

interface HorCateProps {
    title: string;
    icon: string
}

const categories = [
    { icon: "📞", title: "Phone" },
    { icon: "🔑", title: "Key" },
    { icon: "🪪", title: "Card" },
    { icon: "👛", title: "Wallet" },
    { icon: "💵", title: "Other" },
];

const HorizontalCategoryItem = ({title, icon}:HorCateProps) => {
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            className="flex-row gap-2 items-center justify-center bg-white px-4 py-3 mr-3 rounded-full"
            style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.15,
                shadowRadius: 4,
                elevation: 3,
            }}
        >
            <Text className="text-gray-900 font-semibold">{icon}</Text>
            <Text className="text-gray-900 font-semibold">{title}</Text>
        </TouchableOpacity>
    );
};

const CategoryList = () => {
    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
                paddingHorizontal: 16,
                paddingVertical: 8,
                alignItems: "center",
            }}
            className="overflow-visible pl-1"
        >
            {categories.map((item, index) => (
                <HorizontalCategoryItem key={index} title={item.title} icon={item.icon} />
            ))}
        </ScrollView>
    );
}

const HorizontalCategory = () => {
    return (
       <CategoryList />
    );
};

export default HorizontalCategory;
