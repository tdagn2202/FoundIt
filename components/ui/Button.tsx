import * as Haptics from "expo-haptics";
import React, {useEffect, useRef} from "react";
import {ActivityIndicator, Animated, Text, TouchableOpacity} from "react-native";

type buttonTypeProps = {
    text: string,
    onPress: () => void,
    isLoading: boolean,
}

export default function Button({text, onPress, isLoading}: buttonTypeProps) {
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const rotateAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.sequence([
                Animated.timing(scaleAnim, {
                    toValue: 1.08,
                    duration: 200,
                    useNativeDriver: true,
                }),
                Animated.timing(scaleAnim, {
                    toValue: 1,
                    duration: 200,
                    useNativeDriver: true,
                }),
            ]),
            Animated.sequence([
                Animated.timing(rotateAnim, {
                    toValue: 1,
                    duration: 200,
                    useNativeDriver: true,
                }),
                Animated.timing(rotateAnim, {
                    toValue: 0,
                    duration: 200,
                    useNativeDriver: true,
                }),
            ]),
        ]).start();
    }, [text]);

    const rotate = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "2deg"],
    });

    const handlePress = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        onPress();
    };

    return (
        <Animated.View
            style={{
                transform: [{scale: scaleAnim}, {rotate}],
            }}
        >
            <TouchableOpacity
                className="bg-[#5250E1] px-8 py-3"
                style={{
                    borderRadius: 9,
                    shadowColor: "rgba(82, 80, 225, 0.45)",
                    shadowOffset: {width: -1, height: 6},
                    shadowOpacity: 1,
                    shadowRadius: 49.5,
                    elevation: 10,
                }}
                activeOpacity={0.8}
                onPress={handlePress}
            >
                {isLoading ? (
                    <ActivityIndicator size="small" color="#fff" />
                ) : (
                    <Text className="text-white text-lg font-semibold text-center">
                        {text}
                    </Text>
                )}

            </TouchableOpacity>
        </Animated.View>
    );
}
