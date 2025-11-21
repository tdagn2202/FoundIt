import { Alert } from "react-native";
import { useRouter } from "expo-router";
import { getOrCreateChat } from "@/api/chatApi"; // Adjust path as needed
import { useMe } from "@/hooks/useMe"; // Adjust path as needed
import { PostData } from "@/types/postProps";

export const useContactOwner = () => {
    const router = useRouter();
    const { userData } = useMe();

    const handleContactOwner = async (postData: PostData) => {
        if (!userData?.email || !postData.user.email) {
            Alert.alert("Error", "Please login to contact the owner");
            return;
        }

        try {
            const chatId = await getOrCreateChat(
                userData.email,
                postData.user.email,
                { name: userData.name, avatar: userData.avatar },
                { name: postData.user.name, avatar: postData.user.avatar }
            );

            // Pass post details to the chat room
            router.push({
                pathname: `/(app)/chat/${chatId}` as any,
                params: {
                    otherUserEmail: postData.user.email,
                    otherUserName: postData.user.name,
                    otherUserAvatar: postData.user.avatar,
                    // Add post context
                    postTitle: postData.title,
                    postContent: postData.content,
                    postType: postData.item[0].type.name,
                    postBuilding: postData.facility?.college || '',
                    postRoom: postData.room?.name || '',
                    postImage: postData.item[0].images?.[0]?.url || ''
                }
            });
        } catch (error) {
            console.error("Error starting chat:", error);
            Alert.alert("Error", "Failed to start chat. Please try again.");
        }
    };

    return { handleContactOwner };
};