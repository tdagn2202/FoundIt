// import React, { useState } from "react";
// import { TextInput, TextInputProps } from "react-native";
// import Animated, { useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";
//
// const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);
//
// interface AnimatedInputProps extends Omit<TextInputProps, "onFocus" | "onBlur"> {
//     className?: string;
//     size?: "large" | "small" | "medium";
// }
//
// const AnimatedInput: React.FC<AnimatedInputProps> = ({
//                                                          placeholder = "",
//                                                          keyboardType = "default",
//                                                          secureTextEntry = false,
//                                                          autoCapitalize = "none",
//                                                          className = "",
//                                                          placeholderTextColor = "#9ca3af",
//                                                          size = "medium",
//                                                          ...props
//                                                      }) => {
//     const [focused, setFocused] = useState(false);
//     const borderOpacity = useSharedValue(0);
//
//     const handleFocus = () => {
//         setFocused(true);
//         borderOpacity.value = withTiming(1, { duration: 300 });
//     };
//
//     const handleBlur = () => {
//         setFocused(false);
//         borderOpacity.value = withTiming(0, { duration: 300 });
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
//
//
//     switch (size) {
//         case "small":
//             sizeClasses = "py-4 text-base";
//             break;
//
//         case "large":
//             sizeClasses = "py-[4.5rem] text-xl text-left";
//             break;
//
//         case "medium":
//         default:
//             sizeClasses = "py-6 text-lg";
//             break;
//     }
//
//     return (
//         <AnimatedTextInput
//             {...props}
//             style={animatedStyle}
//             className={`border rounded-2xl w-full pl-[1.06rem] font-bold p-3 items-start ${sizeClasses} ${className}`}
//             placeholder={placeholder}
//             multiline={size === "large"}
//             textAlignVertical="top"
//             placeholderTextColor={placeholderTextColor}
//             keyboardType={keyboardType}
//             autoCapitalize={autoCapitalize}
//             secureTextEntry={secureTextEntry}
//             onFocus={handleFocus}
//             onBlur={handleBlur}
//         />
//     );
// };
//
// export default AnimatedInput;

import React, { useState } from "react";
import { TextInput, TextInputProps } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

interface AnimatedInputProps extends Omit<TextInputProps, "onFocus" | "onBlur"> {
    className?: string;
    size?: "large" | "small" | "medium";
}

const AnimatedInput: React.FC<AnimatedInputProps> = ({
                                                         placeholder = "",
                                                         keyboardType = "default",
                                                         secureTextEntry = false,
                                                         autoCapitalize = "none",
                                                         className = "",
                                                         placeholderTextColor = "#9ca3af",
                                                         size = "medium",
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
            textAlignVertical: size === "large" ? "top" : "center",
        };
    });

    // Size variants
    let sizeClasses = "";

    switch (size) {
        case "small":
            sizeClasses = "py-4 text-base";
            break;

        case "large":
            sizeClasses = "pt-6 pb-[7.5rem] text-xl text-left";
            break;

        case "medium":
        default:
            sizeClasses = "py-6 text-lg";
            break;
    }

    return (
        <AnimatedTextInput
            {...props}
            style={animatedStyle}
            className={`border rounded-2xl w-full pl-[1.06rem] font-bold p-3 ${sizeClasses} ${className}`}
            placeholder={placeholder}
            multiline={size === "large"}
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
