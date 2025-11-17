import {Badge, Icon, Label, NativeTabs} from 'expo-router/unstable-native-tabs';
import {usePathname} from "expo-router";

export default function AppLayout() {

    const pathname = usePathname();

    const isChatActive = pathname.startsWith('/chat/') && pathname !== '/chat';

    console.log(isChatActive)
    return (
        <NativeTabs
            minimizeBehavior="automatic">
            <NativeTabs.Trigger name="lost">
                <Label>Lost</Label>
                <Icon sf={"magnifyingglass"} drawable="ic_menu_mylocation" selectedColor="#5250e1"/>
            </NativeTabs.Trigger>
            <NativeTabs.Trigger name="found">
                <Label>Found</Label>
                <Icon sf={"arrow.2.squarepath"} selectedColor="#5250e1"/>
            </NativeTabs.Trigger>
            <NativeTabs.Trigger name="chat">
                <Label>Chat</Label>
                <Icon sf={"captions.bubble"} selectedColor="#5250e1"/>
            </NativeTabs.Trigger>
            <NativeTabs.Trigger name="(profile)">
                <Label>Profile</Label>
                <Icon sf={"person"} selectedColor="#5250e1"/>
            </NativeTabs.Trigger>
            <NativeTabs.Trigger name="(new_post)" role={"search"}>
                <Label>Profile</Label>
                <Icon sf={"plus.app"} selectedColor="#5250e1"/>
            </NativeTabs.Trigger>
        </NativeTabs>
    );
}