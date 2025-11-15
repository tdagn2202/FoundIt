import React, { createContext, useContext, useState, ReactNode } from "react";

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

// Define the type for the context state
interface ChatContextType {
    selectedChat: Chat | null;
    setSelectedChat: (chat: Chat | null) => void;
}

// Create the context with a default value
const ChatContext = createContext<ChatContextType | undefined>(undefined);

// Provider component with proper types for children
export const ChatProvider = ({ children }: { children: ReactNode }) => {
    const [selectedChat, setSelectedChat] = useState<Chat | null>(null);

    return (
        <ChatContext.Provider value={{ selectedChat, setSelectedChat }}>
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