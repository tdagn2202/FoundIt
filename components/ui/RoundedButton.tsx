import {Text, TouchableOpacity, TouchableWithoutFeedback, View} from "react-native";
import React from "react";
import Animated, {useAnimatedStyle, useSharedValue, withSpring} from "react-native-reanimated";
import * as Haptics from "expo-haptics";

// @ts-ignore
const RoundedButton = ({text = "", onPress, ...props}) => {
    const scale = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    const handlePressIn = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        scale.value = withSpring(0.95, { damping: 15, stiffness: 100 });
    };

    const handlePressOut = () => {
        scale.value = withSpring(1, { damping: 15, stiffness: 100 });
    };


    return (
        <View className="w-full">
            <TouchableWithoutFeedback
                onPress={onPress}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                {...props}
            >
                <Animated.View
                    className="bg-[#5250E1] px-8 py-[1.19rem]"
                    style={[
                        {
                            borderRadius: 100,
                            shadowColor: "rgba(82, 80, 225, 0.66)",
                            shadowOffset: { width: -1, height: 6 },
                            shadowOpacity: 1,
                            shadowRadius: 49.5,
                            elevation: 10,
                        },
                        animatedStyle,
                    ]}
                >
                    <Text className="text-white text-xl font-semibold text-center">
                        {text}
                    </Text>
                </Animated.View>
            </TouchableWithoutFeedback>
        </View>
    );
}

export default RoundedButton