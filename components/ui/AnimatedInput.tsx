import React, { useState } from "react";
import { TextInput, TextInputProps } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";

// Reanimated wrapper
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

interface AnimatedInputProps extends Omit<TextInputProps, "onFocus" | "onBlur"> {
    className?: string;
}

const AnimatedInput: React.FC<AnimatedInputProps> = ({
                                                         placeholder = "",
                                                         keyboardType = "default",
                                                         secureTextEntry = false,
                                                         autoCapitalize = "none",
                                                         className = "",
                                                         placeholderTextColor = "#9ca3af",
                                                         ...props
                                                     }) => {
    const [focused, setFocused] = useState(false);
    const borderOpacity = useSharedValue(0);

    const handleFocus = () => {
        setFocused(true);
        borderOpacity.value = withTiming(1, { duration: 300 });
    };

    const handleBlur = () => {
        setFocused(false);
        borderOpacity.value = withTiming(0, { duration: 300 });
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

    return (
        <AnimatedTextInput
            {...props}
            style={animatedStyle}
            className={`border p-3 rounded-2xl w-full py-6 text-lg pl-[1.06rem] font-bold ${className}`}
            placeholder={placeholder}
            placeholderTextColor={placeholderTextColor}
            keyboardType={keyboardType}
            autoCapitalize={autoCapitalize}
            secureTextEntry={secureTextEntry}
            onFocus={handleFocus}
            onBlur={handleBlur}
        />
    );
};

export default AnimatedInput;
