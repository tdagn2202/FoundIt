import { Text, TouchableOpacity, View } from "react-native";
import { GlassView } from "expo-glass-effect";
import { useState } from "react";
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

type GlassEffectType = "clear" | "regular";

interface GlassButtonProps {
    onPress?: () => void;
    text: string;
    textColor?: string;
    textSize?: string;
    height?: number;
    paddingHorizontal?: number;
    borderRadius?: number;
    scaleAmount?: number;
    className?: string;
}

const GlassButton: React.FC<GlassButtonProps> = ({
                                                     onPress,
                                                     text,
                                                     textColor = "text-red-500",
                                                     textSize = "text-xl",
                                                     height = 50,
                                                     paddingHorizontal = 15,
                                                     borderRadius = 100,
                                                     scaleAmount = 1.1,
                                                     className = "",
                                                 }) => {
    const scale = useSharedValue(1);
    const [glassEffect, setGlassEffect] = useState<GlassEffectType>("regular");

    const handlePressIn = () => {
        setGlassEffect('clear');
        scale.value = withSpring(scaleAmount, {
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
        <TouchableOpacity
            className={`rounded-full ${className}`}
            onPress={onPress}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            activeOpacity={0.9}
        >
            <Animated.View style={animatedStyle}>
                <GlassView
                    glassEffectStyle={glassEffect}
                    style={{
                        paddingHorizontal,
                        height,
                        paddingTop: 0,
                        borderRadius,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <View className="p-3 justify-center items-center w-full rounded-full">
                        <Text className={`text-center ${textSize} font-bold ${textColor}`}>
                            {text}
                        </Text>
                    </View>
                </GlassView>
            </Animated.View>
        </TouchableOpacity>
    );
};

export default GlassButton;