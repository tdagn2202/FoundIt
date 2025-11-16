import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, ImageBackground, Image, Alert, ScrollView } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withSpring } from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";

interface AnimatedImagePickerProps {
    className?: string;
    size?: "large" | "small" | "medium";
    placeholder?: string;
    onValueChange?: (uris: string[]) => void;
    value?: string[];
    modalTitle?: string;
    modalSubtitle?: string;
    backgroundImage?: any;
    maxImages?: number;
}

const AnimatedImagePickerComponent: React.FC<AnimatedImagePickerProps> = ({
                                                                              placeholder = "Select images",
                                                                              className = "",
                                                                              size = "medium",
                                                                              onValueChange,
                                                                              value,
                                                                              modalTitle = "Add Images",
                                                                              modalSubtitle = "Take photos or choose from gallery",
                                                                              backgroundImage,
                                                                              maxImages = 5,
                                                                          }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedImages, setSelectedImages] = useState<string[]>(value || []);
    const borderOpacity = useSharedValue(0);
    const cameraScale = useSharedValue(1);
    const galleryScale = useSharedValue(1);

    const handleOpen = () => {
        setIsOpen(true);
        borderOpacity.value = withTiming(1, { duration: 300 });
    };

    const handleClose = () => {
        setIsOpen(false);
        borderOpacity.value = withTiming(0, { duration: 300 });
    };

    const requestPermissions = async (type: "camera" | "gallery") => {
        if (type === "camera") {
            const { status } = await ImagePicker.requestCameraPermissionsAsync();
            return status === "granted";
        } else {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            return status === "granted";
        }
    };

    const handleCamera = async () => {
        if (selectedImages.length >= maxImages) {
            Alert.alert("Limit Reached", `You can only select up to ${maxImages} images.`);
            return;
        }

        cameraScale.value = withSpring(0.9, {}, () => {
            cameraScale.value = withSpring(1);
        });

        const hasPermission = await requestPermissions("camera");
        if (!hasPermission) {
            Alert.alert("Permission Denied", "Camera permission is required to take photos.");
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.8,
        });

        if (!result.canceled && result.assets[0]) {
            const newImages = [...selectedImages, result.assets[0].uri];
            setSelectedImages(newImages);
            onValueChange?.(newImages);
        }
    };

    const handleGallery = async () => {
        const remaining = maxImages - selectedImages.length;
        if (remaining <= 0) {
            Alert.alert("Limit Reached", `You can only select up to ${maxImages} images.`);
            return;
        }

        galleryScale.value = withSpring(0.9, {}, () => {
            galleryScale.value = withSpring(1);
        });

        const hasPermission = await requestPermissions("gallery");
        if (!hasPermission) {
            Alert.alert("Permission Denied", "Gallery permission is required to select photos.");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            allowsMultipleSelection: true,
            quality: 0.8,
            selectionLimit: remaining,
        });

        if (!result.canceled && result.assets) {
            const newUris = result.assets.map(asset => asset.uri);
            const newImages = [...selectedImages, ...newUris].slice(0, maxImages);
            setSelectedImages(newImages);
            onValueChange?.(newImages);
        }
    };

    const handleRemoveImage = (index: number) => {
        const newImages = selectedImages.filter((_, i) => i !== index);
        setSelectedImages(newImages);
        onValueChange?.(newImages);
    };

    const handleClearAll = () => {
        setSelectedImages([]);
        onValueChange?.([]);
        handleClose();
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

    const cameraAnimatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: cameraScale.value }],
    }));

    const galleryAnimatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: galleryScale.value }],
    }));

    // Size variants
    let sizeClasses = "";
    let imageSize = "";
    switch (size) {
        case "small":
            sizeClasses = "py-4";
            imageSize = "w-12 h-12";
            break;
        case "large":
            sizeClasses = "py-8";
            imageSize = "w-20 h-20";
            break;
        case "medium":
        default:
            sizeClasses = "py-6";
            imageSize = "w-16 h-16";
            break;
    }

    return (
        <View className="w-full h-[10rem]">
            <Animated.View
                style={animatedStyle}
                className={`border rounded-2xl w-full pl-[1.06rem]  h-[10rem] ${sizeClasses} ${className}`}
            >
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    className="flex-1"
                    style={{maxWidth: "95%", paddingTop: 7}}
                    contentContainerStyle={{ gap: 7 }} // Add gap here
                >
                    {/* Display selected images */}
                    {selectedImages.map((uri, index) => (
                        <View key={index} className="relative">
                            <Image
                                source={{ uri }}
                                className={`${imageSize} rounded-xl`}
                                resizeMode="cover"
                            />
                            <TouchableOpacity
                                onPress={() => handleRemoveImage(index)}
                                className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1"
                            >
                                <Ionicons name="close" size={12} color="white" />
                            </TouchableOpacity>
                        </View>
                    ))}

                    {/* Plus button to add more images */}
                    {selectedImages.length < maxImages && (
                        <TouchableOpacity
                            onPress={handleOpen}
                            className={`${imageSize} rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 items-center justify-center`}
                        >
                            <Ionicons name="add" size={size === "large" ? 32 : size === "small" ? 20 : 24} color="#9ca3af" />
                        </TouchableOpacity>
                    )}

                    {/* Placeholder when no images */}
                    {selectedImages.length === 0 && (
                        <TouchableOpacity onPress={handleOpen} className="flex-1">
                            <Text
                                className={`font-bold ${size === "small" ? "text-base" : size === "large" ? "text-xl" : "text-lg"}`}
                                style={{ color: "#9ca3af" }}
                            >
                                {placeholder}
                            </Text>
                        </TouchableOpacity>
                    )}
                </ScrollView>
            </Animated.View>

            <Modal visible={isOpen} transparent animationType="slide" onRequestClose={handleClose}>
                <TouchableOpacity
                    style={{ flex: 1, backgroundColor: "rgba(0, 0, 0, 0.5)" }}
                    activeOpacity={1}
                    onPress={handleClose}
                >
                    <View className="flex-1 justify-end">
                        <TouchableOpacity activeOpacity={1}>
                            <View className="bg-white rounded-t-3xl overflow-hidden" style={{ maxHeight: "100%" }}>
                                {/* Title Section with Background Image */}
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
                                        <View className="flex-row items-center justify-between">
                                            <View>
                                                <Text className="text-2xl font-bold text-gray-900">
                                                    {modalTitle}
                                                </Text>
                                                <Text className="text-base text-gray-600">
                                                    {modalSubtitle}
                                                </Text>
                                            </View>
                                            <View className="bg-blue-100 px-3 py-1 rounded-full">
                                                <Text className="text-sm font-bold text-blue-600">
                                                    {selectedImages.length}/{maxImages}
                                                </Text>
                                            </View>
                                        </View>
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

                                {/* Selected Images Grid */}
                                {selectedImages.length > 0 && (
                                    <ScrollView

                                        className="bg-white px-6 py-4"
                                        style={{ maxHeight: 150 }}
                                    >
                                        <View className="flex-row gap-2">
                                            {selectedImages.map((uri, index) => (
                                                <View key={index} className="relative">
                                                    <Image
                                                        source={{ uri }}
                                                        className="w-24 h-24 rounded-xl"
                                                        resizeMode="cover"
                                                    />
                                                    <TouchableOpacity
                                                        onPress={() => handleRemoveImage(index)}
                                                        className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1"
                                                    >
                                                        <Ionicons name="close" size={16} color="white" />
                                                    </TouchableOpacity>
                                                </View>
                                            ))}
                                        </View>
                                    </ScrollView
                                      >
                                )}

                                {/* Options */}
                                <View className="bg-white px-6 py-4 gap-3">
                                    <Animated.View style={cameraAnimatedStyle}>
                                        <TouchableOpacity
                                            onPress={handleCamera}
                                            className="flex-row items-center gap-4 py-5 px-6 bg-blue-50 rounded-xl border-2 border-blue-200"
                                            disabled={selectedImages.length >= maxImages}
                                        >
                                            <View className={`p-3 rounded-full ${selectedImages.length >= maxImages ? 'bg-gray-400' : 'bg-blue-600'}`}>
                                                <Ionicons name="camera" size={24} color="white" />
                                            </View>
                                            <View className="flex-1">
                                                <Text className="text-lg font-bold text-gray-900">
                                                    Take Photo
                                                </Text>
                                                <Text className="text-sm text-gray-600">
                                                    Use your camera
                                                </Text>
                                            </View>
                                        </TouchableOpacity>
                                    </Animated.View>

                                    <Animated.View style={galleryAnimatedStyle}>
                                        <TouchableOpacity
                                            onPress={handleGallery}
                                            className="flex-row items-center gap-4 py-5 px-6 bg-purple-50 rounded-xl border-2 border-purple-200"
                                            disabled={selectedImages.length >= maxImages}
                                        >
                                            <View className={`p-3 rounded-full ${selectedImages.length >= maxImages ? 'bg-gray-400' : 'bg-purple-600'}`}>
                                                <Ionicons name="images" size={24} color="white" />
                                            </View>
                                            <View className="flex-1">
                                                <Text className="text-lg font-bold text-gray-900">
                                                    Choose from Gallery
                                                </Text>
                                                <Text className="text-sm text-gray-600">
                                                    Select multiple photos
                                                </Text>
                                            </View>
                                        </TouchableOpacity>
                                    </Animated.View>

                                    {selectedImages.length > 0 && (
                                        <TouchableOpacity
                                            onPress={handleClearAll}
                                            className="py-4 rounded-xl border-2 border-red-300 bg-red-50"
                                        >
                                            <Text className="text-center text-lg font-bold text-red-600">
                                                Remove All Images
                                            </Text>
                                        </TouchableOpacity>
                                    )}
                                </View>

                                {/*<View className="" />*/}
                            </View>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    );
};

export default AnimatedImagePickerComponent;