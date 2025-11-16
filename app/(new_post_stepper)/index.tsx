import {ScrollView, Text, View} from "react-native";
import AnimatedInput from "@/components/UI/AnimatedInput";
import {useState} from "react";
import AnimatedDropdown from "@/components/UI/AnimatedDropdown";
import AnimatedDateTimePicker from "@/components/UI/AnimatedDateTimePicker";
import AnimatedImagePickerComponent from "@/components/UI/AnimatedImagePicker";
import Button from "@/components/UI/Button";
import {useRouter} from "expo-router";

const dropdownValues = [
    {label: "None", value: ""},
    {label: "Phone", value: "phone"},
    {label: "Key", value: "key"},
    {label: "Card", value: "card"},
    {label: "Wallet", value: "wallet"},
    {label: "Other", value: "other"},
];

const buildingValues = [
    {label: "None", value: ""},
    {
        label: "ATL",
        value: "atl",
        children: [
            {label: "Room 101", value: "atl-101"},
            {label: "Room 102", value: "atl-102"},
            {label: "Room 103", value: "atl-103"},
            {label: "Lab 1", value: "atl-lab1"},
        ]
    },
    {
        label: "Information and Communications Technology (DI)",
        value: "di",
        children: [
            {label: "Room 201", value: "di-201"},
            {label: "Room 202", value: "di-202"},
            {label: "Computer Lab", value: "di-complab"},
        ]
    },
    {
        label: "School of Economics (CSE)",
        value: "cse",
        children: [
            {label: "Room 301", value: "cse-301"},
            {label: "Room 302", value: "cse-302"},
            {label: "Lecture Hall", value: "cse-hall"},
        ]
    },
    {
        label: "School of Education (SOE)",
        value: "soe",
        children: [
            {label: "Room 401", value: "soe-401"},
            {label: "Room 402", value: "soe-402"},
        ]
    },
    {
        label: "College of Environment and Natural Resources (CENRES)",
        value: "cenres",
        children: [
            {label: "Room 501", value: "cenres-501"},
            {label: "Room 502", value: "cenres-502"},
            {label: "Research Lab", value: "cenres-lab"},
        ]
    },
];

const NewPostStepper = () => {
    const [itemType, setItemType] = useState("")
    const [lostDateTime, setLostDateTime] = useState<Date | undefined>(undefined);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [selectedRoom, setSelectedRoom] = useState("");
    const [selectedBuilding, setSelectedBuilding] = useState("");
    const router = useRouter()
    // @ts-ignore
    // @ts-ignore
    return <View className={"pt-[9rem] justify-center items-center w-[100%] gap-2 bg-white "}>
        <ScrollView className="w-[90%]" showsVerticalScrollIndicator={false}>
            <Text className="text-left w-full pl-2 font-bold">What you&#39;ve lost?</Text>
            <AnimatedInput size={"small"} placeholder={"Name"}/>
            <Text className="text-left w-full pl-2 font-bold pt-2">Type of your stuff?</Text>
            <AnimatedDropdown
                placeholder="Select item type"
                size="small"
                value={itemType}
                onValueChange={(value) => setItemType(value)}
                modalTitle="Select Item Type"
                modalSubtitle="Choose what you found"
                backgroundImage={require('../../assets/images/search_vector.png')}
                dropdownValues={dropdownValues}
            />
            <Text className="text-left w-full pl-2 font-bold pt-2">Date?</Text>
            <AnimatedDateTimePicker
                placeholder="Select date & time"
                size="medium"
                value={lostDateTime}
                onValueChange={(date) => setLostDateTime(date ?? undefined)}
                modalTitle="Select Date & Time"
                modalSubtitle="Choose when you found it"
                backgroundImage={require('../../assets/images/date_vector.png')}
                mode="datetime"
            />
            <Text className="text-left w-full pl-2 font-bold pt-2">Leave a description or a message (optional)</Text>
            <AnimatedInput size={"large"} placeholder={"Description"}/>

            <Text className="text-left w-full pl-2 font-bold pt-2">Any image if available</Text>
            <AnimatedImagePickerComponent
                placeholder=""
                size="large"
                value={imageUrl}
                onValueChange={(uri) => setImageUrl(uri)}
                modalTitle="Add Image"
                modalSubtitle="Take a photo or choose from gallery"
                backgroundImage={require('../../assets/images/img_vector.png')}
            />

            <Text className="text-left w-full pl-2 font-bold mb-2 mt-2">
                At which building and room you&#39;ve lost your thing?
            </Text>
            <AnimatedDropdown
                modalTitle={"Select Building"}
                modalSubtitle={"Where you last see your things?"}
                size={"small"}
                placeholder={"Building & Room"}
                dropdownValues={buildingValues}
                hasNested={true}
                value={selectedRoom}
                onValueChange={(roomValue, buildingValue) => {
                    setSelectedRoom(roomValue);
                    setSelectedBuilding(buildingValue || "");
                    console.log("Room:", roomValue, "Building:", buildingValue);
                }}
                backgroundImage={require('../../assets/images/location_vector.png')}
            />

        <View className="pb-10"/>
        </ScrollView>
        <View className="pb-[6rem]">

            <Button text={"Next"} onPress={() => router.push("/Step2")}/>
        </View>
    </View>
}

export default NewPostStepper