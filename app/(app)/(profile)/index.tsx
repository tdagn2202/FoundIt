import { Image, Text, View, ScrollView, TextInput, TouchableOpacity, Alert } from "react-native";
import { GlassView } from "expo-glass-effect";
import { useState, useCallback } from "react";
import { Ionicons } from "@expo/vector-icons";
import GlassButton from "@/components/UI/GlassButton";
import { useRouter } from "expo-router";
import { useMe } from "@/hooks/useMe";
import Constants from "expo-constants";
import axios from "axios";
import * as ImagePicker from 'expo-image-picker';
import {logout} from "@/api/authApi";

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
    const [isEditing, setIsEditing] = useState(false);
    const [editedData, setEditedData] = useState<UserData | undefined>();
    const [isLoading, setIsLoading] = useState(false);
    const { userData, fetchData } = useMe();

    const router = useRouter();

    const handleImagePick = async () => {
        try {
            // Request permission
            const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

            if (permissionResult.granted === false) {
                Alert.alert("Permission Required", "You need to grant camera roll permissions to change your avatar.");
                return;
            }

            // Launch image picker
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.8,
            });

            if (!result.canceled && result.assets[0]) {
                const selectedImage = result.assets[0];

                setEditedData(prev => prev ? { ...prev, avatar: selectedImage.uri } : prev);

                // Optional: Upload image immediately
                await uploadAvatar(selectedImage);
            }
        } catch (err) {
            console.error('Error picking image:', err);
            Alert.alert('Error', 'Failed to pick image. Please try again.');
        }
    };

    // Optional: Separate function to upload avatar to your server
    const uploadAvatar = async (imageAsset: ImagePicker.ImagePickerAsset) => {
        try {
            const formData = new FormData();

            // Create file object for upload
            const file = {
                uri: imageAsset.uri,
                type: 'image/jpeg',
                name: 'avatar.jpg',
            } as any;

            formData.append('file', file);

            const response = await axios.patch(
                `${Constants.expoConfig?.extra?.API_BASE}/users/update`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            if (response.data) {
                console.log('Avatar uploaded successfully:', response.data);
                await fetchData(); // Refresh user data
                Alert.alert('Success', 'Avatar updated successfully!');
            }
        } catch (err) {
            console.error('Error uploading avatar:', err);
            Alert.alert('Error', 'Failed to upload avatar. Please try again.');
        }
    };

    const handleEditToggle = () => {
        if (isEditing) {
            // Cancel editing - restore original data
            setEditedData(undefined);
        } else {
            // Start editing - initialize with current data
            setEditedData({
                name: userData?.name || "",
                avatar: userData?.avatar || "",
                email: userData?.email || "",
                phone: userData?.phone || "",
                college: userData?.college || "",
                course: userData?.course || ""
            });
        }
        setIsEditing(!isEditing);
    };

    const handleSave = async () => {
        if (!editedData) return;

        setIsLoading(true);
        try {
            // TODO: Replace with your actual API endpoint
            const response = await axios.patch(
                `${Constants.expoConfig?.extra?.API_BASE}/users/update`,
                editedData
            );

            if (response.data) {
                console.log('Profile updated successfully:', response.data);

                // Refresh user data from server
                await fetchData();

                setIsEditing(false);
                setEditedData(undefined);

                Alert.alert('Success', 'Profile updated successfully!');
            }
        } catch (err) {
            console.error('Error updating profile:', err);
            Alert.alert('Error', 'Failed to update profile. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const updateField = (field: keyof UserData, value: string) => {
        setEditedData(prev => prev ? { ...prev, [field]: value } : prev);
    };

    const renderInfoRow = useCallback(({ label, value, field }: { label: string; value: string; field?: keyof UserData }) => (
        <View className="py-3" key={field || label}>
            <Text className="text-xs text-gray-500 mb-1.5 uppercase tracking-wider">{label}</Text>
            {isEditing && field ? (
                <GlassView
                    glassEffectStyle="clear"
                    style={{
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
                        editable={!isLoading}
                    />
                </GlassView>
            ) : (
                <Text className="text-base font-semibold text-gray-900">{value}</Text>
            )}
        </View>
    ), [isEditing, editedData, isLoading]);

    return (
        <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
            <View className="flex-1 px-5 pt-20">
                <View className={`items-center pt-7 ${className}`}>
                    {/* Avatar Section with Edit Button */}
                    <View className="relative mb-2">
                        <Image
                            source={{ uri: isEditing && editedData?.avatar ? editedData.avatar : userData?.avatar }}
                            className="h-[7rem] w-[7rem] rounded-full"
                            resizeMode="cover"
                        />
                        {isEditing || !isEditing && (
                            <TouchableOpacity
                                className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-2"
                                style={{
                                    shadowColor: "#000",
                                    shadowOffset: { width: 0, height: 2 },
                                    shadowOpacity: 0.25,
                                    shadowRadius: 3.84,
                                    elevation: 5,
                                }}
                                disabled={isLoading}
                                onPress={handleImagePick}
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
                            {renderInfoRow({
                                label: "Full Name",
                                value: isEditing ? (editedData?.name || "") : (userData?.name || ""),
                                field: "name"
                            })}
                            <View className="h-px bg-gray-200" />

                            {renderInfoRow({
                                label: "Email Address",
                                value: isEditing ? (editedData?.email || "") : (userData?.email || ""),
                                field: "email"
                            })}
                            <View className="h-px bg-gray-200" />

                            {renderInfoRow({
                                label: "Phone Number",
                                value: isEditing ? (editedData?.phone || "") : (userData?.phone || "Not provided"),
                                field: "phone"
                            })}
                            <View className="h-px bg-gray-200" />

                            {renderInfoRow({
                                label: "College",
                                value: isEditing ? (editedData?.college || "") : (userData?.college || "Not provided"),
                                field: "college"
                            })}
                            <View className="h-px bg-gray-200" />

                            {renderInfoRow({
                                label: "Course",
                                value: isEditing ? (editedData?.course || "") : (userData?.course || "Not provided"),
                                field: "course"
                            })}
                        </GlassView>
                    </View>

                    {/* Action Buttons */}
                    <View className="w-full gap-3 mb-8 flex-row justify-center">
                        {isEditing ? (
                            <>
                                <GlassButton
                                    text={isLoading ? "Saving..." : "Save Changes"}
                                    textColor="text-green-600"
                                    textSize="text-xl"
                                    height={50}
                                    onPress={handleSave}
                                    disabled={isLoading}
                                />
                                <GlassButton
                                    text="Cancel"
                                    textColor="text-gray-600"
                                    textSize="text-xl"
                                    height={50}
                                    onPress={handleEditToggle}
                                    disabled={isLoading}
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
                                        logout().then(() => {
                                            router.replace("/(auth)/Login")
                                        })
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