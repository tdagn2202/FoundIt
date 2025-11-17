import {Image, Text, View} from "react-native";
import {useChat} from "@/Contexts/ChatContext";
import {GlassView, isLiquidGlassAvailable} from "expo-glass-effect";
import {LinearGradient} from "expo-linear-gradient";

interface ChatHeaderProps {
    className: string
}

const DetailScreenTitle = ({className}: ChatHeaderProps) => {
    const {selectedChat} = useChat()
    return (
        <View className={`justify-center items-center pt-[4rem] overflow-visible ${className}`}>
            <LinearGradient
                colors={['#FFFFFF', 'rgba(255, 255, 255, 0.7)', 'rgba(255, 255, 255, 0)']}
                style={{
                    position: 'absolute',
                    top: -20,
                    left: -9999, // Extend far left
                    right: -9999, // Extend far right
                    bottom: 0,
                    height: 200
                }}
                pointerEvents="none"
            />
        </View>
    )
}

export default DetailScreenTitle;