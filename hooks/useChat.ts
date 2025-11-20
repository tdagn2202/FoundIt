// hooks/useChat.ts
import { useState, useEffect } from 'react';
import { subscribeToMessages, subscribeToChats, Message, Chat } from '@/api/chatApi';

export const useMessages = (chatId: string) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!chatId) return;

        const unsubscribe = subscribeToMessages(chatId, (newMessages) => {
            setMessages(newMessages);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [chatId]);

    return { messages, loading };
};

export const useChats = (userEmail: string) => {
    const [chats, setChats] = useState<Chat[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!userEmail) return;

        const unsubscribe = subscribeToChats(userEmail, (newChats) => {
            setChats(newChats);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [userEmail]);

    return { chats, loading };
};
