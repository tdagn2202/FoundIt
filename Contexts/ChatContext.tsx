import React, {createContext, useContext, useState, ReactNode} from "react";

// Define the type for chat data
interface Chat {
    id: number;
    name: string;
    avatar: string;
    lastMessage: string;
    time: string;
    unread: number;
    online: boolean;
    isGroup?: boolean;
}

interface Message {
    id: number;
    text: string;
    sender: "me" | "other";
    time: string;
}

// Define the type for the context state
interface ChatContextType {
    selectedChat: Chat | null;
    setSelectedChat: (chat: Chat | null) => void;
    messages: Message[];
    setMessages: (messages: Message[]) => void;
    sendMessage: (text: string) => void;
    inputText: string;
    setInputText: (text: string) => void;
}

// Create the context with a default value
const ChatContext = createContext<ChatContextType | undefined>(undefined);

// Provider component with proper types for children
export const ChatProvider = ({children}: { children: ReactNode }) => {
    const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
    const [messages, setMessages] = useState<Message[]>([
        {id: 1, text: "Hey! How are you?", sender: "other", time: "10:30 AM"},
        {id: 2, text: "I'm good, thanks! How about you?", sender: "me", time: "10:31 AM"},
        {id: 3, text: "Doing great! Want to catch up later?", sender: "other", time: "10:32 AM"},
        {id: 4, text: "Sure! What time works for you?", sender: "me", time: "10:33 AM"},
    ]);
    const [inputText, setInputText] = useState("");

    const sendMessage = (text: string) => {
        if (text.trim()) {
            const newMessage: Message = {
                id: messages.length + 1,
                text: text,
                sender: "me",
                time: new Date().toLocaleTimeString('en-US', {hour: 'numeric', minute: '2-digit'})
            };
            setMessages([...messages, newMessage]);
            setInputText("");
        }
    };
    return (
        <ChatContext.Provider value={{
            selectedChat, setSelectedChat, messages,
            setMessages,
            sendMessage,
            inputText,
            setInputText
        }}>
            {children}
        </ChatContext.Provider>
    );
};

export const useChat = (): ChatContextType => {
    const context = useContext(ChatContext);
    if (!context) {
        throw new Error("useChat must be used within a ChatProvider");
    }
    return context;
};