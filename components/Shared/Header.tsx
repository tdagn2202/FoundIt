import {Image, Text, View} from "react-native";
import {useEffect, useState} from "react";
import HorizontalCategory from "@/components/Shared/HorizontalCategory";

interface GreetingHeaderProps {
    screenTitle: string,
    subTitle: string,
}

interface UserData {
    name: string;
    avatar: string;
}

const GreetingHeader = ({ screenTitle, subTitle="" } : GreetingHeaderProps) => {
    const [userData, setUserData] = useState<UserData | undefined>();


    useEffect(() => {
        const getUser = async () => {
            setUserData({
                name: "Hai Dang",
                avatar: "https://scontent.fvca1-4.fna.fbcdn.net/v/t39.30808-6/487192037_2163322970850787_7171479331019526273_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeGS4kRzreWA2oHS6NyH8u80ZdS6lMQolpJl1LqUxCiWkkLbZOcJdHiNo4WRMXRoQlZEy4x_5DJZOFqIaOkfKuiu&_nc_ohc=1xq_K7e4GR0Q7kNvwEZCDJH&_nc_oc=AdkbpwzfkX_KK3SjFpEo--7u74HF2_Kn6yhIsis23X1gX3LE0nQZ3iULnKFNcEQjjNA&_nc_zt=23&_nc_ht=scontent.fvca1-4.fna&_nc_gid=zp7eTd1a7qUF-aAt3noZKQ&oh=00_Afi7sNBbH5kuCwsXTNy1S0pKxCjmAaiumfxBjMyCEppe0g&oe=691B6351"
            })
        }

        void getUser()
    }, [])


    return (
        <View className="flex-row items-center justify-between pt-3 pl-2">
            {/* Left side - Avatar and Greeting */}
            <View className="flex-1">
                <Text className="text-4xl font-bold">{screenTitle}</Text>
                <Text className="text-lg text-gray-500">{subTitle}</Text>
            </View>
            <View className="flex-row items-center">
                <Image
                    source={{ uri: `${userData?.avatar}` }}
                    className="w-12 h-12 rounded-full pr-20"
                />
            </View>
        </View>
    );
}

export default GreetingHeader
