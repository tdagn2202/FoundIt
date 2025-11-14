import {Stack, Tabs} from 'expo-router';
import {Badge, Icon, Label, NativeTabs} from 'expo-router/unstable-native-tabs';

import {Ionicons} from '@expo/vector-icons';
import {Text} from "react-native";

export default function AppLayout() {
    return (
            <NativeTabs minimizeBehavior="automatic" >
                <NativeTabs.Trigger name="index">
                    <Label>Lost</Label>
                    <Icon sf={"magnifyingglass"} drawable="ic_menu_mylocation" selectedColor="#5250e1"/>
                </NativeTabs.Trigger>
                <NativeTabs.Trigger name="FoundPage">
                    <Label>Found</Label>
                    <Icon sf={"arrow.2.squarepath"} selectedColor="#5250e1"/>
                </NativeTabs.Trigger>
                <NativeTabs.Trigger name="ChatScreen">
                    <Label>Chat</Label>
                    <Icon sf={"captions.bubble"} selectedColor="#5250e1"/>
                </NativeTabs.Trigger>
                <NativeTabs.Trigger name="ProfileScreen" role={"search"}>
                    <Label>Profile</Label>
                    <Icon sf={"person"} selectedColor="#5250e1"/>
                </NativeTabs.Trigger>
            </NativeTabs>
        // <Tabs
        //     screenOptions={{
        //         tabBarActiveTintColor: '#5250e1',
        //         tabBarInactiveTintColor: '#8e9093',
        //         tabBarStyle: {
        //             backgroundColor: '#ffffff',
        //             borderTopWidth: 1,
        //             borderTopColor: '#e5e7eb',
        //             height: 60,
        //             paddingBottom: 8,
        //             paddingTop: 8,
        //         },
        //         headerShown: false,
        //     }}
        // >
        //     <Tabs.Screen
        //         name="index"
        //         options={{
        //             title: 'Feed',
        //             tabBarIcon: ({ color, size }) => (
        //                 <Ionicons name="newspaper" size={size} color={color} />
        //             ),
        //         }}
        //     />
        //     <Tabs.Screen
        //         name="ChatScreen"
        //         options={{
        //             title: 'Chat',
        //             tabBarIcon: ({ color, size }) => (
        //                 <Ionicons name="chatbubble" size={size} color={color} />
        //             ),
        //         }}
        //     />
        //     <Tabs.Screen
        //         name="ProfileScreen"
        //         options={{
        //             title: 'Profile',
        //             tabBarIcon: ({ color, size }) => (
        //                 <Ionicons name="person" size={size} color={color} />
        //             ),
        //         }}
        //     />
        //     <Tabs.Screen
        //         name="ThankScreen"
        //         options={{
        //             title: 'Thanks',
        //             tabBarIcon: ({ color, size }) => (
        //                 <Ionicons name="heart" size={size} color={color} />
        //             ),
        //         }}
        //     />
        // </Tabs>
    );
}