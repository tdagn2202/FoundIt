// import React, { useState } from "react";
// import { View, Text, TouchableOpacity, Modal, FlatList, ImageBackground } from "react-native";
// import Animated, { useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";
// import { LinearGradient } from "expo-linear-gradient"; // or 'react-native-linear-gradient'
//
// interface AnimatedDropdownProps {
//     className?: string;
//     size?: "large" | "small" | "medium";
//     placeholder?: string;
//     onValueChange?: (value: string) => void;
//     value?: string;
//     modalTitle?: string;
//     modalSubtitle?: string;
//     backgroundImage?: any; // ImageSourcePropType
//     dropdownValues: {label: string, value: string}[];
// }
//
//
//
// const AnimatedDropdown: React.FC<AnimatedDropdownProps> = ({
//                                                                placeholder = "Select an option",
//                                                                className = "",
//                                                                size = "medium",
//                                                                onValueChange,
//                                                                value,
//                                                                modalTitle = "Select Item Type",
//                                                                modalSubtitle = "Choose what you found",
//                                                                backgroundImage,
//                                                                 dropdownValues
//                                                            }) => {
//     const [isOpen, setIsOpen] = useState(false);
//     const [selectedValue, setSelectedValue] = useState(value || "");
//     const borderOpacity = useSharedValue(0);
//
//     const handleOpen = () => {
//         setIsOpen(true);
//         borderOpacity.value = withTiming(1, { duration: 300 });
//     };
//
//     const handleClose = () => {
//         setIsOpen(false);
//         borderOpacity.value = withTiming(0, { duration: 300 });
//     };
//
//     const handleSelect = (itemValue: string) => {
//         setSelectedValue(itemValue);
//         onValueChange?.(itemValue);
//         handleClose();
//     };
//
//     const animatedStyle = useAnimatedStyle(() => {
//         const grayOpacity = 1 - borderOpacity.value;
//         return {
//             borderColor:
//                 borderOpacity.value > 0
//                     ? `rgba(82, 80, 225, ${borderOpacity.value})`
//                     : `rgba(229, 231, 235, ${grayOpacity})`,
//         };
//     });
//
//     // Size variants
//     let sizeClasses = "";
//     switch (size) {
//         case "small":
//             sizeClasses = "py-4";
//             break;
//         case "large":
//             sizeClasses = "py-8";
//             break;
//         case "medium":
//         default:
//             sizeClasses = "py-6";
//             break;
//     }
//
//     const selectedLabel = dropdownValues.find((item) => item.value === selectedValue)?.label;
//
//     return (
//         <View className={"w-full"}>
//             <TouchableOpacity onPress={handleOpen}>
//                 <Animated.View
//                     style={animatedStyle}
//                     className={`border rounded-2xl w-full pl-[1.06rem] ${sizeClasses} ${className}`}
//                 >
//                     <Text
//                         className={`font-bold ${size === "small" ? "text-base" : size === "large" ? "text-xl" : "text-lg"}`}
//                         style={{ color: selectedValue ? "#000" : "#9ca3af" }}
//                     >
//                         {selectedLabel || placeholder}
//                     </Text>
//                 </Animated.View>
//             </TouchableOpacity>
//
//             <Modal visible={isOpen} transparent animationType="slide" onRequestClose={handleClose}>
//                 <TouchableOpacity
//                     style={{ flex: 1, backgroundColor: "rgba(0, 0, 0, 0.5)" }}
//                     activeOpacity={1}
//                     onPress={handleClose}
//                 >
//                     <View className="flex-1 justify-end">
//                         <TouchableOpacity activeOpacity={1}>
//                             <View className="bg-white rounded-t-3xl overflow-hidden">
//                                 {/* Title Section with Background Image */}
//                                 <View className="relative">
//                                     {backgroundImage && (
//                                         <ImageBackground
//                                             source={backgroundImage}
//                                             style={{
//                                                 position: "absolute",
//                                                 width: "100%",
//                                                 height: "100%",
//                                                 opacity: 0.3,
//                                             }}
//                                             resizeMode="cover"
//                                         />
//                                     )}
//
//                                     <View className="px-6 pt-6 pb-4">
//                                         <Text className="text-2xl font-bold text-gray-900">
//                                             {modalTitle}
//                                         </Text>
//                                         <Text className="text-base text-gray-600">
//                                             {modalSubtitle}
//                                         </Text>
//                                     </View>
//
//                                     {/* Gradient Overlay - white to transparent (bottom to top) */}
//                                     <LinearGradient
//                                         colors={["rgba(255, 255, 255, 1)", "rgba(255, 255, 255, 0)"]}
//                                         start={{ x: 0, y: 1 }}
//                                         end={{ x: 0, y: 0 }}
//                                         style={{
//                                             position: "absolute",
//                                             bottom: 0,
//                                             left: 0,
//                                             right: 0,
//                                             height: 40,
//                                         }}
//                                     />
//                                 </View>
//
//                                 {/* Options List - solid white background */}
//                                 <View className="bg-white">
//                                     <FlatList
//                                         data={dropdownValues}
//                                         keyExtractor={(item) => item.value}
//                                         renderItem={({ item }) => (
//                                             <TouchableOpacity
//                                                 onPress={() => handleSelect(item.value)}
//                                                 className={`py-5 px-6 border-b border-gray-200 ${
//                                                     selectedValue === item.value ? "bg-blue-50" : ""
//                                                 }`}
//                                             >
//                                                 <Text
//                                                     className={`text-lg font-bold ${
//                                                         selectedValue === item.value ? "text-blue-600" : "text-gray-800"
//                                                     }`}
//                                                 >
//                                                     {item.label}
//                                                 </Text>
//                                             </TouchableOpacity>
//                                         )}
//                                     />
//                                 </View>
//                             </View>
//                         </TouchableOpacity>
//                     </View>
//                 </TouchableOpacity>
//             </Modal>
//         </View>
//     );
// };
//
// export default AnimatedDropdown;


import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, FlatList, ImageBackground } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

interface DropdownItem {
    label: string;
    value: string;
    children?: DropdownItem[];
}

interface AnimatedDropdownProps {
    className?: string;
    size?: "large" | "small" | "medium";
    placeholder?: string;
    onValueChange?: (value: string, parentValue?: string) => void;
    value?: string;
    modalTitle?: string;
    modalSubtitle?: string;
    backgroundImage?: any;
    dropdownValues: DropdownItem[];
    hasNested?: boolean;
}

const AnimatedDropdown: React.FC<AnimatedDropdownProps> = ({
                                                               placeholder = "Select an option",
                                                               className = "",
                                                               size = "medium",
                                                               onValueChange,
                                                               value,
                                                               modalTitle = "Select Item Type",
                                                               modalSubtitle = "Choose what you found",
                                                               backgroundImage,
                                                               dropdownValues,
                                                               hasNested = false,
                                                           }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(value || "");
    const [selectedParent, setSelectedParent] = useState<DropdownItem | null>(null);
    const [currentLevel, setCurrentLevel] = useState<"parent" | "child">("parent");
    const borderOpacity = useSharedValue(0);

    const handleOpen = () => {
        setIsOpen(true);
        setCurrentLevel("parent");
        setSelectedParent(null);
        borderOpacity.value = withTiming(1, { duration: 300 });
    };

    const handleClose = () => {
        setIsOpen(false);
        setCurrentLevel("parent");
        setSelectedParent(null);
        borderOpacity.value = withTiming(0, { duration: 300 });
    };

    const handleSelectParent = (item: DropdownItem) => {
        if (hasNested && item.children && item.children.length > 0) {
            setSelectedParent(item);
            setCurrentLevel("child");
        } else {
            setSelectedValue(item.value);
            onValueChange?.(item.value);
            handleClose();
        }
    };

    const handleSelectChild = (item: DropdownItem) => {
        setSelectedValue(item.value);
        onValueChange?.(item.value, selectedParent?.value);
        handleClose();
    };

    const handleBack = () => {
        setCurrentLevel("parent");
        setSelectedParent(null);
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

    // Find selected label
    const getSelectedLabel = () => {
        for (const parent of dropdownValues) {
            if (parent.value === selectedValue) {
                return parent.label;
            }
            if (parent.children) {
                const child = parent.children.find(c => c.value === selectedValue);
                if (child) {
                    return `${parent.label} - ${child.label}`;
                }
            }
        }
        return null;
    };

    const selectedLabel = getSelectedLabel();

    const currentData = currentLevel === "parent" ? dropdownValues : (selectedParent?.children || []);
    const currentTitle = currentLevel === "parent" ? modalTitle : selectedParent?.label || modalTitle;
    const currentSubtitle = currentLevel === "parent" ? modalSubtitle : "Select a room";

    return (
        <View className={"w-full"}>
            <TouchableOpacity onPress={handleOpen}>
                <Animated.View
                    style={animatedStyle}
                    className={`border rounded-2xl w-full pl-[1.06rem] ${sizeClasses} ${className}`}
                >
                    <Text
                        className={`font-bold ${size === "small" ? "text-base" : size === "large" ? "text-xl" : "text-lg"}`}
                        style={{ color: selectedValue ? "#000" : "#9ca3af" }}
                    >
                        {selectedLabel || placeholder}
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
                            <View className="bg-white rounded-t-3xl overflow-hidden pb-6">
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
                                        {/* Back button for nested level */}
                                        {currentLevel === "child" && (
                                            <TouchableOpacity
                                                onPress={handleBack}
                                                className="flex-row items-center mb-2"
                                            >
                                                <Ionicons name="arrow-back" size={24} color="#6200ee" />
                                                <Text className="text-[#6200ee] font-bold ml-2">Back</Text>
                                            </TouchableOpacity>
                                        )}

                                        <Text className="text-2xl font-bold text-gray-900">
                                            {currentTitle}
                                        </Text>
                                        <Text className="text-base text-gray-600">
                                            {currentSubtitle}
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

                                {/* Options List */}
                                <View className="bg-white" style={{ height: 400 }}>
                                    <FlatList
                                        data={currentData}
                                        keyExtractor={(item) => item.value}
                                        renderItem={({ item }) => (
                                            <TouchableOpacity
                                                onPress={() => currentLevel === "parent" ? handleSelectParent(item) : handleSelectChild(item)}
                                                className={`py-5 px-6 border-b border-gray-200 flex-row items-center justify-between ${
                                                    selectedValue === item.value ? "bg-blue-50" : ""
                                                }`}
                                            >
                                                <Text
                                                    className={`text-lg font-bold flex-1 ${
                                                        selectedValue === item.value ? "text-blue-600" : "text-gray-800"
                                                    }`}
                                                >
                                                    {item.label}
                                                </Text>
                                                {hasNested && currentLevel === "parent" && item.children && item.children.length > 0 && (
                                                    <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
                                                )}
                                            </TouchableOpacity>
                                        )}
                                    />
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    );
};

export default AnimatedDropdown;