import { Image, Text, View, ScrollView, TextInput, TouchableOpacity } from "react-native";
import { GlassView } from "expo-glass-effect";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import GlassButton from "@/components/UI/GlassButton";

type props = {
    className?: string
}

interface UserData {
    name: string;
    avatar: string;
    email: string;
    phone: string;
    college: string;
    course: string;
}

const ProfileScreen = ({ className = "" }: props) => {
    const [userData, setUserData] = useState<UserData | undefined>();
    const [isEditing, setIsEditing] = useState(false);
    const [editedData, setEditedData] = useState<UserData | undefined>();

    useEffect(() => {
        const getUser = async () => {
            const data = {
                name: "Hai Dang",
                avatar: "https://scontent.fvca1-4.fna.fbcdn.net/v/t39.30808-6/487192037_2163322970850787_7171479331019526273_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeGS4kRzreWA2oHS6NyH8u80ZdS6lMQolpJl1LqUxCiWkkLbZOcJdHiNo4WRMXRoQlZEy4x_5DJZOFqIaOkfKuiu&_nc_ohc=1xq_K7e4GR0Q7kNvwEZCDJH&_nc_oc=AdkbpwzfkX_KK3SjFpEo--7u74HF2_Kn6yhIsis23X1gX3LE0nQZ3iULnKFNcEQjjNA&_nc_zt=23&_nc_ht=scontent.fvca1-4.fna&_nc_gid=zp7eTd1a7qUF-aAt3noZKQ&oh=00_Afi7sNBbH5kuCwsXTNy1S0pKxCjmAaiumfxBjMyCEppe0g&oe=691B6351",
                email: "haidang@example.com",
                phone: "+84 123 456 789",
                college: "CICT",
                course: "K48"
            };
            setUserData(data);
            setEditedData(data);
        };

        void getUser();
    }, []);

    const handleEditToggle = () => {
        if (isEditing) {
            // Cancel editing - restore original data
            setEditedData(userData);
        }
        setIsEditing(!isEditing);
    };

    const handleSave = () => {
        // Save the edited data
        setUserData(editedData);
        setIsEditing(false);
        console.log('Saved data:', editedData);
    };

    const updateField = (field: keyof UserData, value: string) => {
        setEditedData(prev => prev ? { ...prev, [field]: value } : prev);
    };

    const InfoRow = ({ label, value, field }: { label: string; value: string; field?: keyof UserData }) => (
        <View className="py-3">
            <Text className="text-xs text-gray-500 mb-1.5 uppercase tracking-wider">{label}</Text>
            {isEditing && field ? (
                <GlassView
                    glassEffectStyle="clear"
                    style ={{
                        borderRadius: 20
                    }}
                >

                <TextInput
                    value={editedData?.[field] || ""}
                    onChangeText={(text) => field && updateField(field, text)}
                    className="p-3 rounded-full"
                    style={{
                        borderWidth: 1,
                        borderColor: '#e5e7eb',
                    }}
                />
                </GlassView>
            ) : (
                <Text className="text-base font-semibold text-gray-900">{value}</Text>
            )}
        </View>
    );

    return (
        <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
            <View className="flex-1 px-5 pt-20">
                <View className={`items-center pt-7 ${className}`}>
                    {/* Avatar Section with Edit Button */}
                    <View className="relative mb-2">
                        <Image
                            source={{ uri: userData?.avatar }}
                            className="h-[7rem] w-[7rem] rounded-full"
                            resizeMode="cover"
                        />
                        {isEditing && (
                            <TouchableOpacity
                                className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-2"
                                style={{
                                    shadowColor: "#000",
                                    shadowOffset: { width: 0, height: 2 },
                                    shadowOpacity: 0.25,
                                    shadowRadius: 3.84,
                                    elevation: 5,
                                }}
                            >
                                <Ionicons name="camera" size={20} color="white" />
                            </TouchableOpacity>
                        )}
                    </View>

                    <GlassView
                        glassEffectStyle="regular"
                        style={{
                            paddingHorizontal: 15,
                            height: 32,
                            paddingTop: 0,
                            borderRadius: 100,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 8,
                        }}
                    >
                        <Text className="text-xl font-bold">
                            {isEditing ? editedData?.name : userData?.name}
                        </Text>
                    </GlassView>

                    {/* Information Card */}
                    <View className="w-full mb-6 pt-5">
                        <View className="flex-row justify-between items-center pb-2 px-2">
                            <Text className="text-lg font-bold text-gray-900">Personal Information</Text>
                            {/*<TouchableOpacity*/}
                            {/*    onPress={handleEditToggle}*/}
                            {/*    className="flex-row items-center"*/}
                            {/*>*/}
                            {/*    <Ionicons*/}
                            {/*        name={isEditing ? "close-circle" : "pencil"}*/}
                            {/*        size={20}*/}
                            {/*        color={isEditing ? "#ef4444" : "#5250e1"}*/}
                            {/*    />*/}
                            {/*    <Text className={`ml-1 font-semibold ${isEditing ? 'text-red-500' : 'text-[#5250e1]'}`}>*/}
                            {/*        {isEditing ? 'Cancel' : 'Edit'}*/}
                            {/*    </Text>*/}
                            {/*</TouchableOpacity>*/}
                        </View>

                        <GlassView
                            glassEffectStyle="regular"
                            style={{
                                paddingHorizontal: 20,
                                paddingVertical: 4,
                                borderRadius: 20,
                                shadowColor: '#000',
                                shadowOffset: { width: 0, height: 2 },
                                shadowOpacity: 0.05,
                                shadowRadius: 6,
                            }}
                        >
                            <InfoRow
                                label="Full Name"
                                value={editedData?.name || ""}
                                field="name"
                            />
                            <View className="h-px bg-gray-200" />

                            <InfoRow
                                label="Email Address"
                                value={editedData?.email || ""}
                                field="email"
                            />
                            <View className="h-px bg-gray-200" />

                            <InfoRow
                                label="Phone Number"
                                value={editedData?.phone || ""}
                                field="phone"
                            />
                            <View className="h-px bg-gray-200" />

                            <InfoRow
                                label="College"
                                value={editedData?.college || ""}
                                field="college"
                            />
                            <View className="h-px bg-gray-200" />

                            <InfoRow
                                label="Course"
                                value={editedData?.course || ""}
                                field="course"
                            />
                        </GlassView>
                    </View>

                    {/* Action Buttons */}
                    <View className="w-full gap-3 mb-8 flex-row justify-center">
                        {isEditing ? (
                            <>
                                <GlassButton
                                    text="Save Changes"
                                    textColor="text-green-600"
                                    textSize="text-xl"
                                    height={50}
                                    onPress={handleSave}
                                />
                                <GlassButton
                                    text="Cancel"
                                    textColor="text-gray-600"
                                    textSize="text-xl"
                                    height={50}
                                    onPress={handleEditToggle}
                                />
                            </>
                        ) : (
                            <>
                                <GlassButton
                                    text="Edit Profile"
                                    textColor="text-black"
                                    textSize="text-xl"
                                    height={50}
                                    onPress={handleEditToggle}
                                />
                                <GlassButton
                                    text="Sign Out"
                                    textColor="text-red-500"
                                    textSize="text-xl"
                                    height={50}
                                    onPress={() => {
                                        console.log('Sign out pressed');
                                    }}
                                />
                            </>
                        )}
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

export default ProfileScreen;