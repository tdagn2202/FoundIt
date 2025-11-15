import {Image, Text, View} from "react-native";
import {useChat} from "@/Contexts/ChatContext";
import {GlassView, isLiquidGlassAvailable} from "expo-glass-effect";
import {LinearGradient} from "expo-linear-gradient";

interface ChatHeaderProps {
    className: string
}

const ChatHeader = ({className}: ChatHeaderProps) => {
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
            <Image
                source={{uri: selectedChat?.avatar}}
                className="h-20 w-20 rounded-full z-10"
                resizeMode="contain"
                style={{ marginBottom: -5 }}
            />
            <GlassView
                glassEffectStyle="regular"
                style={{
                    paddingHorizontal: 15,
                    height: 30,
                    paddingTop: 0,
                    borderRadius: 100,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Text className="text-xl font-bold">{selectedChat?.name}</Text>
            </GlassView>
        </View>    )
}

export default ChatHeader;