import {ScrollView, Text, View, Alert} from "react-native";
import AnimatedInput from "@/components/UI/AnimatedInput";
import {useState} from "react";
import AnimatedDropdown from "@/components/UI/AnimatedDropdown";
import AnimatedDateTimePicker from "@/components/UI/AnimatedDateTimePicker";
import AnimatedImagePickerComponent from "@/components/UI/AnimatedImagePicker";
import Button from "@/components/UI/Button";
import {useRouter} from "expo-router";
import NearbyMatchModal from "@/components/NewPost/NearByFoundModal";
import {posts} from "@/api/postsApi";
import * as MediaLibrary from "expo-media-library";
import * as FileSystem from "expo-file-system";
import Constants from "expo-constants";
import axios from "axios";

const dropdownValues = [
    {label: "None", value: ""},
    {label: "Phone", value: "1"},
    {label: "Key", value: "2"},
    {label: "Card", value: "3"},
    {label: "Wallet", value: "4"},
    {label: "Other", value: "5"},
];

const buildingValues = [
    {label: "None", value: ""},
    {
        label: "ATL",
        value: "1",
        children: [
            {label: "None", value: null},
            {label: "Room 101", value: "1"},
            {label: "Room 102", value: "2"},
            {label: "Room 103", value: "3"},
            {label: "Lab 1", value: "4"},
        ]
    },
    {
        label: "Information and Communications Technology (DI)",
        value: "2",
        children: [
            {label: "None", value: null},
            {label: "Room 201", value: "5"},
            {label: "Room 202", value: "6"},
            {label: "Computer Lab", value: "7"},
        ]
    },
    {
        label: "School of Economics (CSE)",
        value: "3",
        children: [
            {label: "None", value: null},
            {label: "Room 301", value: "8"},
            {label: "Room 302", value: "9"},
            {label: "Lecture Hall", value: "10"},

        ]
    },
    {
        label: "School of Education (SOE)",
        value: "4",
        children: [
            {label: "Room 401", value: "11"},
            {label: "Room 402", value: "12"},
        ]
    },
    {
        label: "College of Environment and Natural Resources (CENRES)",
        value: "5",
        children: [
            {label: "Room 501", value: "13"},
            {label: "Room 502", value: "14"},
            {label: "Research Lab", value: "15"},
        ]
    },
];

const lostFindValues = [
    {label: "None", value: ""},
    {label: "Lost", value: "Lost"},
    {label: "Found", value: "Found"},
]

const NewPostStepper = () => {
    const router = useRouter()
    const [itemTypeId, setItemTypeId] = useState("")
    const [postType, setPostType] = useState("")
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [lostDateTime, setLostDateTime] = useState<Date | undefined>(undefined);
    const [files, setFiles] = useState<string[]>([]);
    const [roomId, setRoomId] = useState("");
    const [facilityId, setFacilityId] = useState("");
    const [showMatchModal, setShowMatchModal] = useState(false);
    const [newPostId, setNewPostId] = useState("");
    const [similarPost, setSimilarPost] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    // Validation states
    const [errors, setErrors] = useState({
        title: false,
        itemTypeId: false,
        content: false,
        postType:false
    });

    const validateForm = () => {
        const newErrors = {
            title: !title.trim(),
            itemTypeId: !itemTypeId,
            content: !content.trim(),
            postType: !postType.trim(),
        };

        setErrors(newErrors);

        // Check if any field has an error
        const hasErrors = Object.values(newErrors).some(error => error);

        if (hasErrors) {
            const missingFields = [];
            if (newErrors.title) missingFields.push("Title");
            if (newErrors.itemTypeId) missingFields.push("Item Type");
            if (newErrors.content) missingFields.push("Description");
            if (newErrors.postType) missingFields.push("Post type");
            // if (newErrors.roomId || newErrors.facilityId) missingFields.push("Building & Room");

            // Alert.alert(
            //     "Missing Information",
            //     `Please fill in the following fields:\n${missingFields.join(", ")}`,
            //     [{text: "OK"}]
            // );

            console.log(`Please fill in the following fields:\n${missingFields.join(", ")}`)
            return false;
        }

        return true;
    };

    const handleNext = () => {
        if (!validateForm()) {
            return;
        }
        setShowMatchModal(true);
    };

    const handleSelectPost = (postId: string) => {
        console.log("Selected post:", postId);
        setShowMatchModal(false);
    };

    const handleGoHome = () => {
        setShowMatchModal(false);
        router.replace("/(app)/lost");
    }

    async function convertToRealFile(uri: any) {
        if (!uri.startsWith("ph://")) return uri;

        const asset = await MediaLibrary.createAssetAsync(uri);
        return asset.uri; // file://...
    }

    const findSimilar = async () => {
        try {
            const res = await axios.get(`${Constants.expoConfig?.extra?.API_BASE}/images/similar/${newPostId}`)
            console.log(newPostId)
            if (res.data.data) {
                setSimilarPost(res.data.data[0].similar)
                console.log("FIND SIMILAR LOG: ", res.data.data[0]?.similar)
            }
        } catch (err) {
            console.log(err);
        }
    }

    const handleContinuePosting = async () => {
        if (!validateForm()) {
            return;
        }
        setIsLoading(true)

        console.log("Continue creating new post");

        const formData = new FormData();

        // Basic fields
        formData.append('title', title.trim());
        formData.append('content', content.trim());
        formData.append('facility_id', facilityId);
        formData.append('room_id', roomId);

        // Nested object notation for item
        formData.append('item[type_id]', itemTypeId);
        formData.append('item[status]', postType);
        formData.append('item[name]', '');
        formData.append('item[des]', '');

        // ✅ FIXED: files is now string[] instead of Array<{ uri: string }>
        if (files && files.length > 0) {
            console.log(`Preparing ${files.length} files for upload`);

            files.forEach((uri, index) => {  // uri is directly a string
                // React Native FormData format
                const fileToUpload = {
                    uri: uri,
                    name: `image_${Date.now()}_${index}.jpg`,
                    type: 'image/jpeg',
                };

                console.log(`File ${index}:`, {
                    uri: uri.substring(0, 50) + '...',  // Show first 50 chars
                    name: fileToUpload.name,
                    type: fileToUpload.type
                });

                formData.append('files', fileToUpload as any);
            });

            console.log(`✅ All ${files.length} files appended to FormData`);
        } else {
            console.log('⚠️ No files to upload');
        }

        console.log("Number of files being sent: ", files.length);
        console.log("File URIs: ", files);
        console.log("Form sent: ", formData)
        // console.log("API RESPONSE: ", res)

        try {
            const res = await posts(formData);
            if (res) {
                console.log("Post successful", res.data);
                setNewPostId(res.data.item.id)
                setIsLoading(false)
                setShowMatchModal(true)
                console.log(res.data.item.id)
            }
        } catch (err: any) {
            console.log("Full error:", err);
            console.log("Error response:", err.response?.data);
            console.log("Error status:", err.response?.status);
            Alert.alert(
                "Error",
                err.response?.data?.message || "Failed to create post. Please try again."
            );
        }
    };

    const handleCloseModal = () => {
        setShowMatchModal(false);
    };


    return <View className={"pt-[9rem] justify-center items-center w-[100%] gap-2 bg-white "}>
        <ScrollView className="w-[90%]" showsVerticalScrollIndicator={false}>
            <Text className="text-left w-full pl-2 font-bold">
                You find or lost something? <Text className="text-red-500">*</Text>
            </Text>
            <AnimatedDropdown
                placeholder="Select item type"
                size="small"
                value={itemTypeId}
                onValueChange={(value) => {
                    setPostType(value);
                    console.log(value)
                    if (errors.itemTypeId && value) {
                        setErrors({...errors, itemTypeId: false});
                    }
                }}
                modalTitle="Select Item Type"
                modalSubtitle="Choose what you lost"
                backgroundImage={require('../../assets/images/search_vector.png')}
                dropdownValues={lostFindValues}
            />
            {errors.itemTypeId && (
                <Text className="text-red-500 text-xs pl-2 mt-1">Item type is required</Text>
            )}
            <Text className="text-left w-full pl-2 font-bold">
                Title of your post <Text className="text-red-500">*</Text>
            </Text>
            <AnimatedInput
                size={"small"}
                placeholder={"Title"}
                onChangeText={(text) => {
                    setTitle(text);
                    if (errors.title && text.trim()) {
                        setErrors({...errors, title: false});
                    }
                }}
                value={title}
            />
            {errors.title && (
                <Text className="text-red-500 text-xs pl-2 mt-1">Title is required</Text>
            )}

            <Text className="text-left w-full pl-2 font-bold pt-2">
               Type of stuff? <Text className="text-red-500">*</Text>
            </Text>
            <AnimatedDropdown
                placeholder="Select item type"
                size="small"
                value={itemTypeId}
                onValueChange={(value) => {
                    setItemTypeId(value);
                    if (errors.itemTypeId && value) {
                        setErrors({...errors, itemTypeId: false});
                    }
                }}
                modalTitle="Select Item Type"
                modalSubtitle="Choose what you lost"
                backgroundImage={require('../../assets/images/search_vector.png')}
                dropdownValues={dropdownValues}
            />
            {errors.itemTypeId && (
                <Text className="text-red-500 text-xs pl-2 mt-1">Item type is required</Text>
            )}

            <Text className="text-left w-full pl-2 font-bold pt-2">Date?</Text>
            <AnimatedDateTimePicker
                placeholder="Select date & time"
                size="medium"
                value={lostDateTime}
                onValueChange={(date) => setLostDateTime(date ?? undefined)}
                modalTitle="Select Date & Time"
                modalSubtitle="Choose when you lost it"
                backgroundImage={require('../../assets/images/date_vector.png')}
                mode="datetime"
            />

            <Text className="text-left w-full pl-2 font-bold pt-2">
                Leave a description or a message <Text className="text-red-500">*</Text>
            </Text>
            <AnimatedInput
                size={"large"}
                placeholder={"Description"}
                onChangeText={(text) => {
                    setContent(text);
                    if (errors.content && text.trim()) {
                        setErrors({...errors, content: false});
                    }
                }}
                value={content}
            />
            {errors.content && (
                <Text className="text-red-500 text-xs pl-2 mt-1">Description is required</Text>
            )}

            <Text className="text-left w-full pl-2 font-bold pt-2">Any image if available</Text>
            <AnimatedImagePickerComponent
                placeholder=""
                size="large"
                value={files}
                onValueChange={(uris) => setFiles(uris)}
                modalTitle="Add Image"
                modalSubtitle="Take a photo or choose from gallery"
                backgroundImage={require('../../assets/images/img_vector.png')}
            />

            <Text className="text-left w-full pl-2 font-bold mb-2 mt-2">
                At which building and room you&#39;ve lost/found this thing?
            </Text>
            <AnimatedDropdown
                modalTitle={"Select Building"}
                modalSubtitle={"Where you last see your things?"}
                size={"small"}
                placeholder={"Building & Room"}
                dropdownValues={buildingValues}
                hasNested={true}
                value={roomId}
                onValueChange={(roomValue, buildingValue) => {
                    setRoomId(roomValue);
                    setFacilityId(buildingValue || "");
                    if ((errors.roomId || errors.facilityId) && roomValue && buildingValue) {
                        setErrors({...errors, roomId: false, facilityId: false});
                    }
                    console.log("Room ID:", roomValue, "Facility ID:", buildingValue);
                }}
                backgroundImage={require('../../assets/images/location_vector.png')}
            />


            <View className="pb-10"/>
        </ScrollView>
        <NearbyMatchModal
            visible={showMatchModal}
            onClose={handleCloseModal}
            onOpen={findSimilar}
            onSelectPost={handleSelectPost}
            onContinueAnyway={handleGoHome}
            matchedPosts={similarPost || []}
            backgroundImage={require('../../assets/images/location_vector.png')}
        />
        <View className="pb-[6.5rem] w-full px-6">
            <Button text={"Done"} onPress={handleContinuePosting} isLoading = {isLoading}/>
        </View>
    </View>
}

export default NewPostStepper