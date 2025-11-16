import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, ImageBackground, Platform } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import DateTimePicker from "@react-native-community/datetimepicker";

interface AnimatedDateTimePickerProps {
    className?: string;
    size?: "large" | "small" | "medium";
    placeholder?: string;
    onValueChange?: (date: Date | null) => void;
    value?: Date;
    modalTitle?: string;
    modalSubtitle?: string;
    backgroundImage?: any;
    mode?: "date" | "time" | "datetime";
}

const AnimatedDateTimePicker: React.FC<AnimatedDateTimePickerProps> = ({
    placeholder = "Select date & time",
    className = "",
    size = "medium",
    onValueChange,
    value,
    modalTitle = "Select Date & Time",
    modalSubtitle = "Choose when you found it",
    backgroundImage,
    mode = "datetime",
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | null>(value || null);
    const [tempDate, setTempDate] = useState<Date>(value || new Date());
    const borderOpacity = useSharedValue(0);

    const handleOpen = () => {
        setIsOpen(true);
        borderOpacity.value = withTiming(1, { duration: 300 });
    };

    const handleClose = () => {
        setIsOpen(false);
        borderOpacity.value = withTiming(0, { duration: 300 });
    };

    const handleConfirm = () => {
        setSelectedDate(tempDate);
        onValueChange?.(tempDate);
        handleClose();
    };

    const handleClear = () => {
        setSelectedDate(null);
        setTempDate(new Date());
        onValueChange?.(null);
        handleClose();
    };

    const handleDateChange = (event: any, date?: Date) => {
        if (date) {
            setTempDate(date);
        }
    };

    const animatedStyle = useAnimatedStyle(() => {
        const grayOpacity = 1 - borderOpacity.value;
        return {
            borderColor:
                borderOpacity.value > 0
                    ? `rgba(82, 80, 225, ${borderOpacity.value})`
                    : `rgba(229, 231, 235, ${grayOpacity})`,
        };
    });

    // Size variants
    let sizeClasses = "";
    switch (size) {
        case "small":
            sizeClasses = "py-4";
            break;
        case "large":
            sizeClasses = "py-8";
            break;
        case "medium":
        default:
            sizeClasses = "py-6";
            break;
    }

    const formatDateTime = (date: Date) => {
        if (mode === "date") {
            return date.toLocaleDateString();
        } else if (mode === "time") {
            return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        } else {
            return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
        }
    };

    return (
        <View className="w-full">
            <TouchableOpacity onPress={handleOpen}>
                <Animated.View
                    style={animatedStyle}
                    className={`border rounded-2xl w-full pl-[1.06rem] ${sizeClasses} ${className}`}
                >
                    <Text
                        className={`font-bold ${size === "small" ? "text-base" : size === "large" ? "text-xl" : "text-lg"}`}
                        style={{ color: selectedDate ? "#000" : "#9ca3af" }}
                    >
                        {selectedDate ? formatDateTime(selectedDate) : placeholder}
                    </Text>
                </Animated.View>
            </TouchableOpacity>

            <Modal visible={isOpen} transparent animationType="slide" onRequestClose={handleClose}>
                <TouchableOpacity
                    style={{ flex: 1, backgroundColor: "rgba(0, 0, 0, 0.5)" }}
                    activeOpacity={1}
                    onPress={handleClose}
                >
                    <View className="flex-1 justify-end">
                        <TouchableOpacity activeOpacity={1}>
                            <View className="bg-white rounded-t-3xl overflow-hidden">
                                {/* Title Section with Background Image */}
                                <View className="relative">
                                    {backgroundImage && (
                                        <ImageBackground
                                            source={backgroundImage}
                                            style={{
                                                position: "absolute",
                                                width: "100%",
                                                height: "100%",
                                                opacity: 0.2,
                                            }}
                                            resizeMode="cover"
                                        />
                                    )}

                                    <View className="px-6 pt-6 pb-5">
                                        <Text className="text-2xl font-bold text-gray-900">
                                            {modalTitle}
                                        </Text>
                                        <Text className="text-xl text-gray-600">
                                            {modalSubtitle}
                                        </Text>
                                    </View>

                                    {/* Gradient Overlay */}
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

                                {/* DateTime Picker */}
                                <View className="bg-white items-center py-4">
                                    <DateTimePicker
                                        value={tempDate}
                                        mode={mode}
                                        display={Platform.OS === "ios" ? "spinner" : "default"}
                                        onChange={handleDateChange}
                                        style={{ width: "100%" }}
                                    />
                                </View>

                                {/* Action Buttons */}
                                <View className="bg-white px-6 pb-6 flex-row gap-3">
                                    <TouchableOpacity
                                        onPress={handleClear}
                                        className="flex-1 py-4 rounded-xl border-2 border-gray-300"
                                    >
                                        <Text className="text-center text-lg font-bold text-gray-700">
                                            Clear
                                        </Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        onPress={handleConfirm}
                                        className="flex-1 py-4 rounded-xl bg-[#6200ee]"
                                    >
                                        <Text className="text-center text-lg font-bold text-white">
                                            Confirm
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    );
};

export default AnimatedDateTimePicker;