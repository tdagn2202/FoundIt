import {Image, Text, TouchableOpacity, View} from "react-native";
import {useEffect, useState} from "react";
import {useRouter} from "expo-router";

interface UserData {
    name: string;
    avatar: string;
}

const HeaderRight = () => {
    const router = useRouter();
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
        <TouchableOpacity onPress={() => router.push("/(app)/(profile)")}>

            <View className={"flex-row-reverse gap-2 items-center"}>
                <Text className="font-bold text-lg pr-2">Hai Dang</Text>
                <Image
                    source={{uri: userData?.avatar}}
                    className="w-10 h-10 rounded-full" // Removed pr-20
                />
            </View>
        </TouchableOpacity>
    )
}

export default HeaderRight;