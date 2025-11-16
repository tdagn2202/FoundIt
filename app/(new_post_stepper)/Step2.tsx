import {Modal, Text, View} from "react-native";
import GreetingHeader from "@/components/Shared/Header";
import AnimatedInput from "@/components/UI/AnimatedInput";
import AnimatedPhoneInput from "@/components/UI/AnimatedPhoneInput";
import Button from "@/components/UI/Button";
import {useRouter} from "expo-router";
import NearbyMatchModal from "@/components/NewPost/NearByFoundModal";
import {useState} from "react";

const Step2 = () => {
    const router = useRouter()
    const [showMatchModal, setShowMatchModal] = useState(false);
    const handleNext = () => {
        setShowMatchModal(true);
    };

    const handleSelectPost = (postId: string) => {
        console.log("Selected post:", postId);
        setShowMatchModal(false);
    };

    const handleContinuePosting = () => {
        console.log("Continue creating new post");
        setShowMatchModal(false);
        router.replace("/(app)");
    };

    const handleCloseModal = () => {
        setShowMatchModal(false);
    };

    interface MatchedPost {
        id: string;              // Unique post ID
        title: string;           // Item title
        description: string;     // Item description
        location: string;        // Where it was found/lost
        date: string;            // When it was posted
        image?: string;          // Optional image URL
        category: string;        // Item category
        distance: string;        // Distance from user
    }
    const mockMatchedPosts = [
        {
            id: "1", // Unique identifier for the post
            title: "Black iPhone 13 Pro", // Title/name of the lost item
            description: "Found in ATL building near the entrance. Has a blue case with some stickers.", // Detailed description
            location: "ATL - Room 101", // Building and room where it was found/lost
            date: "2 hours ago", // Time when it was posted (relative or absolute)
            image: "https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:format(webp):quality(75)/2022_3_19_637832821225225265_iphone-13-green-8-of-10.jpg", // URL to the image (optional)
            category: "Phone", // Category/type of item (Phone, Key, Wallet, etc.)
            distance: "50m away" // Distance from user's current location or selected location
        },
        {
            id: "2",
            title: "Set of Keys",
            description: "Found a keychain with multiple keys and a red tag.",
            location: "ATL - Room 102",
            date: "5 hours ago",
            image: undefined, // Can be undefined if no image
            category: "Key",
            distance: "75m away"
        },
        {
            id: "3",
            title: "Blue Leather Wallet",
            description: "Leather wallet found on the 3rd floor, contains some cards.",
            location: "ATL - Room 103",
            date: "1 day ago",
            image: "https://example.com/wallet.jpg",
            category: "Wallet",
            distance: "100m away"
        },
    ];

    return (
        <View className="flex justify-start items-center bg-white flex-1">
            <View className="pt-[9rem]  w-[90%] gap-2">
                <View>
                    <Text className="text-left w-full pl-2 font-bold">Enter your email</Text>
                    <AnimatedInput size={"small"} placeholder={"Email"}/>
                </View>
                <View>
                    <Text className="text-left w-full pl-2 font-bold">Enter your phone number</Text>
                    <AnimatedPhoneInput size={"small"} placeholder={"Phone number"} backgroundImage={require("../../assets/images/country_vector.png")}/>
                </View>
            </View>
            <NearbyMatchModal
                visible={showMatchModal}
                onClose={handleCloseModal}
                onSelectPost={handleSelectPost}
                onContinueAnyway={handleContinuePosting}
                matchedPosts={mockMatchedPosts}
                backgroundImage={require('../../assets/images/location_vector.png')}
            />
            <View className="flex justify-end flex-1 pb-5 ">

                <Button text={"Done"} onPress={() => {
                    handleNext()
                }}/>
            </View>
        </View>
    )
}

export default Step2;