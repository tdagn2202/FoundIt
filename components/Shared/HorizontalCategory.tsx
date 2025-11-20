import { Animated, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import ScrollView = Animated.ScrollView;

interface HorCateProps {
    title: string;
    icon: string;
    isSelected: boolean;
    onPress: () => void;
}

const categories = [
    { icon: "📞", title: "Phone" },
    { icon: "🔑", title: "Key" },
    { icon: "🪪", title: "Card" },
    { icon: "👛", title: "Wallet" },
    { icon: "💵", title: "Other" },
];

const HorizontalCategoryItem = ({ title, icon, isSelected, onPress }: HorCateProps) => {
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={onPress}
            className={`flex-row gap-2 items-center justify-center px-4 py-3 mr-3 rounded-full ${
                isSelected ? "bg-[#d0b2fa]" : "bg-white"
            }`}
            style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.15,
                shadowRadius: 4,
                elevation: 3,
            }}
        >
            <Text className={isSelected ? "text-white font-semibold" : "text-gray-900 font-semibold"}>
                {icon}
            </Text>
            <Text className={isSelected ? "text-white font-semibold" : "text-gray-900 font-semibold"}>
                {title}
            </Text>
        </TouchableOpacity>
    );
};

interface CategoryListProps {
    selectedCategory: string | null;
    onSelectCategory: (category: string | null) => void;
}

const CategoryList = ({ selectedCategory, onSelectCategory }: CategoryListProps) => {
    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
                paddingHorizontal: 16,
                alignItems: "center",
            }}
            className="overflow-visible pl-1"
        >
            {categories.map((item, index) => (
                <HorizontalCategoryItem
                    key={index}
                    title={item.title}
                    icon={item.icon}
                    isSelected={selectedCategory === item.title}
                    onPress={() => {
                        onSelectCategory(selectedCategory === item.title ? null : item.title);
                    }}
                />
            ))}
        </ScrollView>
    );
};

interface HorizontalCategoryProps {
    selectedCategory: string | null;
    onSelectCategory: (category: string | null) => void;
}

const HorizontalCategory = ({ selectedCategory, onSelectCategory }: HorizontalCategoryProps) => {
    return <CategoryList selectedCategory={selectedCategory} onSelectCategory={onSelectCategory} />;
};

export default HorizontalCategory;