import { Image, Text, View } from "react-native";
import { GlassView } from "expo-glass-effect";
import { LinearGradient } from "expo-linear-gradient";

interface ChatHeaderProps {
    className: string;
    otherUserName?: string | string[];
    otherUserAvatar?: string | string[];
}

const ChatHeader = ({ className, otherUserName, otherUserAvatar }: ChatHeaderProps) => {
    // Handle array case from route params
    const name = Array.isArray(otherUserName) ? otherUserName[0] : otherUserName;
    const avatar = Array.isArray(otherUserAvatar) ? otherUserAvatar[0] : otherUserAvatar;

    return (
        <View className={`justify-center items-center pt-[4rem] overflow-visible ${className}`}>
            <LinearGradient
                colors={['#FFFFFF', 'rgba(255, 255, 255, 0.7)', 'rgba(255, 255, 255, 0)']}
                style={{
                    position: 'absolute',
                    top: -20,
                    left: -9999,
                    right: -9999,
                    bottom: 0,
                    height: 200
                }}
                pointerEvents="none"
            />
            <Image
                source={{ uri: otherUserAvatar as string }}
                className="h-20 w-20 rounded-full z-10"
                resizeMode="cover"
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
                <Text className="text-xl font-bold">
                    {otherUserName || 'Chat'}
                </Text>
            </GlassView>
        </View>
    );
};

export default ChatHeader;