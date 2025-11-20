import React, { useState } from "react";
import { TextInput, View, Text, TouchableOpacity, Modal, FlatList, ImageBackground } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

interface CountryCode {
    code: string;
    dialCode: string;
    flag: string;
    name: string;
}

const countryCodes: CountryCode[] = [
    { code: "VN", dialCode: "+84", flag: "🇻🇳", name: "Vietnam" },
    { code: "US", dialCode: "+1", flag: "🇺🇸", name: "United States" },
    { code: "GB", dialCode: "+44", flag: "🇬🇧", name: "United Kingdom" },
    { code: "CN", dialCode: "+86", flag: "🇨🇳", name: "China" },
    { code: "JP", dialCode: "+81", flag: "🇯🇵", name: "Japan" },
    { code: "KR", dialCode: "+82", flag: "🇰🇷", name: "South Korea" },
    { code: "TH", dialCode: "+66", flag: "🇹🇭", name: "Thailand" },
    { code: "SG", dialCode: "+65", flag: "🇸🇬", name: "Singapore" },
    { code: "MY", dialCode: "+60", flag: "🇲🇾", name: "Malaysia" },
    { code: "ID", dialCode: "+62", flag: "🇮🇩", name: "Indonesia" },
    { code: "PH", dialCode: "+63", flag: "🇵🇭", name: "Philippines" },
    { code: "IN", dialCode: "+91", flag: "🇮🇳", name: "India" },
    { code: "AU", dialCode: "+61", flag: "🇦🇺", name: "Australia" },
    { code: "CA", dialCode: "+1", flag: "🇨🇦", name: "Canada" },
    { code: "FR", dialCode: "+33", flag: "🇫🇷", name: "France" },
    { code: "DE", dialCode: "+49", flag: "🇩🇪", name: "Germany" },
];

interface AnimatedPhoneInputProps {
    className?: string;
    size?: "large" | "small" | "medium";
    placeholder?: string;
    onValueChange?: (phoneNumber: string, dialCode: string) => void;
    value?: string;
    defaultCountryCode?: string;
    modalTitle?: string;
    modalSubtitle?: string;
    backgroundImage?: any;
}

const AnimatedPhoneInput: React.FC<AnimatedPhoneInputProps> = ({
                                                                   placeholder = "Phone number",
                                                                   className = "",
                                                                   size = "medium",
                                                                   onValueChange,
                                                                   value = "",
                                                                   defaultCountryCode = "+84",
                                                                   modalTitle = "Select Country Code",
                                                                   modalSubtitle = "Choose your country",
                                                                   backgroundImage,
                                                               }) => {
    const [focused, setFocused] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [phoneNumber, setPhoneNumber] = useState(value);
    const [selectedCountry, setSelectedCountry] = useState<CountryCode>(
        countryCodes.find(c => c.dialCode === defaultCountryCode) || countryCodes[0]
    );
    const borderOpacity = useSharedValue(0);

    const handleFocus = () => {
        setFocused(true);
        borderOpacity.value = withTiming(1, { duration: 300 });
    };

    const handleBlur = () => {
        setFocused(false);
        borderOpacity.value = withTiming(0, { duration: 300 });
    };

    const handleOpen = () => {
        setIsOpen(true);
        setSearchQuery("");
    };

    const handleClose = () => {
        setIsOpen(false);
        setSearchQuery("");
    };

    const handleSelectCountry = (country: CountryCode) => {
        setSelectedCountry(country);
        onValueChange?.(phoneNumber, country.dialCode);
        handleClose();
    };

    const handlePhoneChange = (text: string) => {
        const cleaned = text.replace(/[^0-9]/g, '');
        setPhoneNumber(cleaned);
        onValueChange?.(cleaned, selectedCountry.dialCode);
    };

    const filteredCountries = countryCodes.filter(country =>
        country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        country.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        country.dialCode.includes(searchQuery)
    );

    const animatedStyle = useAnimatedStyle(() => {
        const grayOpacity = 1 - borderOpacity.value;
        return {
            borderColor:
                borderOpacity.value > 0
                    ? `rgba(82, 80, 225, ${borderOpacity.value})`
                    : `rgba(229, 231, 235, ${grayOpacity})`,
        };
    });

    let sizeClasses;
    let textSize;
    switch (size) {
        case "small":
            sizeClasses = "py-4";
            textSize = "text-base";
            break;
        case "large":
            sizeClasses = "py-8";
            textSize = "text-xl";
            break;
        case "medium":
        default:
            sizeClasses = "py-6";
            textSize = "text-lg";
            break;
    }

    return (
        <View>
            <Animated.View
                style={animatedStyle}
                className={`border rounded-2xl w-full flex-row items-center ${sizeClasses} ${className}`}>
                <TouchableOpacity
                    onPress={handleOpen}
                    className="flex-row items-center px-4 border-r border-gray-300">
                    <Text className="text-2xl mr-2">{selectedCountry.flag}</Text>
                    <Text className={`font-bold ${textSize} mr-1`}>{selectedCountry.dialCode}</Text>
                    <Ionicons name="chevron-down" size={16} color="#9ca3af" />
                </TouchableOpacity>
                <AnimatedTextInput
                    className={`flex-1 font-bold ${textSize} pl-4 pr-4`}
                    placeholder={placeholder}
                    placeholderTextColor="#9ca3af"
                    keyboardType="phone-pad"
                    value={phoneNumber}
                    onChangeText={handlePhoneChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />
            </Animated.View>

            <Modal visible={isOpen} transparent animationType="slide" onRequestClose={handleClose}>
                <TouchableOpacity
                    style={{ flex: 1, backgroundColor: "rgba(0, 0, 0, 0.5)" }}
                    activeOpacity={1}
                    onPress={handleClose}>
                    <View className="flex-1 justify-end">
                        <TouchableOpacity activeOpacity={1}>
                            <View className="bg-white rounded-t-3xl overflow-hidden pb-6">
                                <View className="relative">
                                    {backgroundImage && (
                                        <ImageBackground
                                            source={backgroundImage}
                                            style={{
                                                position: "absolute",
                                                width: "100%",
                                                height: "100%",
                                                opacity: 0.3,
                                            }}
                                            resizeMode="cover"
                                        />
                                    )}
                                    <View className="px-6 pt-6 pb-4">
                                        <Text className="text-2xl font-bold text-gray-900">
                                            {modalTitle}
                                        </Text>
                                        <Text className="text-base text-gray-600">
                                            {modalSubtitle}
                                        </Text>
                                    </View>
                                    <LinearGradient
                                        colors={["rgba(255, 255, 255, 1)", "rgba(255, 255, 255, 0)"]}
                                        start={{ x: 0, y: 1 }}
                                        end={{ x: 0, y: 0 }}
                                        style={{
                                            position: "absolute",
                                            bottom: 0,
                                            left: 0,
                                            right: 0,
                                            height: 40,
                                        }}
                                    />
                                </View>
                                <View className="bg-white px-6 py-3">
                                    <View className="flex-row items-center bg-gray-100 rounded-xl px-4 py-3">
                                        <Ionicons name="search" size={20} color="#9ca3af" />
                                        <TextInput
                                            className="flex-1 ml-2 text-base"
                                            placeholder="Search country..."
                                            placeholderTextColor="#9ca3af"
                                            value={searchQuery}
                                            onChangeText={setSearchQuery}
                                            autoCapitalize="none"
                                        />
                                        {searchQuery.length > 0 && (
                                            <TouchableOpacity onPress={() => setSearchQuery("")}>
                                                <Ionicons name="close-circle" size={20} color="#9ca3af" />
                                            </TouchableOpacity>
                                        )}
                                    </View>
                                </View>
                                <View className="bg-white" style={{ height: 400 }}>
                                    {filteredCountries.length > 0 ? (
                                        <FlatList
                                            data={filteredCountries}
                                            keyExtractor={(item) => item.code}
                                            renderItem={({ item }) => (
                                                <TouchableOpacity
                                                    onPress={() => handleSelectCountry(item)}
                                                    className={`py-5 px-6 border-b border-gray-200 flex-row items-center ${
                                                        selectedCountry.code === item.code ? "bg-blue-50" : ""
                                                    }`}>
                                                    <Text className="text-3xl mr-4">{item.flag}</Text>
                                                    <View className="flex-1">
                                                        <Text className="text-lg font-bold text-gray-900">
                                                            {item.name}
                                                        </Text>
                                                        <Text className="text-sm text-gray-500">{item.code}</Text>
                                                    </View>
                                                    <Text
                                                        className={`text-lg font-bold ${
                                                            selectedCountry.code === item.code
                                                                ? "text-blue-600"
                                                                : "text-gray-600"
                                                        }`}>
                                                        {item.dialCode}
                                                    </Text>
                                                </TouchableOpacity>
                                            )}
                                        />
                                    ) : (
                                        <View className="flex-1 items-center justify-center py-10">
                                            <Ionicons name="search-outline" size={48} color="#d1d5db" />
                                            <Text className="text-gray-500 text-base mt-4">No countries found</Text>
                                        </View>
                                    )}
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    );
};

export default AnimatedPhoneInput;