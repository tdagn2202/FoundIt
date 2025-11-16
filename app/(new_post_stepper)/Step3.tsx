import {Text, View} from "react-native";
import GreetingHeader from "@/components/Shared/Header";
import AnimatedInput from "@/components/UI/AnimatedInput";
import AnimatedPhoneInput from "@/components/UI/AnimatedPhoneInput";
import Button from "@/components/UI/Button";
import {useRouter} from "expo-router";
import AnimatedDropdown from "@/components/UI/AnimatedDropdown";
import {useState} from "react";

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

const Step3 = () => {
    const router = useRouter();
    const [selectedRoom, setSelectedRoom] = useState("");
    const [selectedBuilding, setSelectedBuilding] = useState("");

    return (
        <View className="flex justify-start items-center bg-white flex-1">
            <View className="pt-[10rem]">
                <Text>Map</Text>
            </View>
        </View>
    )
}

export default Step3;