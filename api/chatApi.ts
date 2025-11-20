// import {
//     collection,
//     addDoc,
//     query,
//     where,
//     orderBy,
//     onSnapshot,
//     getDocs,
//     doc,
//     updateDoc,
//     serverTimestamp,
//     Timestamp,
//     setDoc,
//     getDoc
// } from 'firebase/firestore';
// import { db } from '@/config/firebaseConfig';
//
// export interface Message {
//     id: string;
//     senderId: string;
//     text: string;
//     createdAt: Timestamp;
//     read: boolean;
// }
//
// export interface ChatParticipantData {
//     name: string;
//     avatar: string;
// }
//
// export interface Chat {
//     id: string;
//     participants: string[];
//     participantsData: {
//         [userId: string]: ChatParticipantData;
//     };
//     lastMessage: string;
//     lastMessageTime: Timestamp;
//     unreadCount: {
//         [userId: string]: number;
//     };
// }
//
// // Get or create a chat between two users
// export const getOrCreateChat = async (
//     currentUserId: string,
//     otherUserId: string,
//     currentUserData: { name: string; avatar: string },
//     otherUserData: { name: string; avatar: string }
// ) => {
//     try {
//         // Check if chat already exists
//         const chatsRef = collection(db, 'chats');
//         const q = query(
//             chatsRef,
//             where('participants', 'array-contains', currentUserId)
//         );
//
//         const querySnapshot = await getDocs(q);
//         let existingChatId = null;
//
//         querySnapshot.forEach((doc) => {
//             const data = doc.data();
//             if (data.participants.includes(otherUserId)) {
//                 existingChatId = doc.id;
//             }
//         });
//
//         if (existingChatId) {
//             return existingChatId;
//         }
//
//         // Create new chat
//         const chatDocRef = doc(chatsRef);
//         await setDoc(chatDocRef, {
//             participants: [currentUserId, otherUserId],
//             participantsData: {
//                 [currentUserId]: currentUserData,
//                 [otherUserId]: otherUserData
//             },
//             lastMessage: '',
//             lastMessageTime: serverTimestamp(),
//             createdAt: serverTimestamp(),
//             unreadCount: {
//                 [currentUserId]: 0,
//                 [otherUserId]: 0
//             }
//         });
//
//         return chatDocRef.id;
//     } catch (error) {
//         console.error('Error getting or creating chat:', error);
//         throw error;
//     }
// };
//
// // Send a message
// export const sendMessage = async (
//     chatId: string,
//     senderId: string,
//     text: string,
//     otherUserId: string
// ) => {
//     try {
//         const messagesRef = collection(db, `chats/${chatId}/messages`);
//
//         await addDoc(messagesRef, {
//             senderId,
//             text,
//             createdAt: serverTimestamp(),
//             read: false
//         });
//
//         // Update chat's last message and increment unread count
//         const chatRef = doc(db, 'chats', chatId);
//         const chatDoc = await getDoc(chatRef);
//         const chatData = chatDoc.data();
//
//         await updateDoc(chatRef, {
//             lastMessage: text,
//             lastMessageTime: serverTimestamp(),
//             [`unreadCount.${otherUserId}`]: (chatData?.unreadCount?.[otherUserId] || 0) + 1
//         });
//     } catch (error) {
//         console.error('Error sending message:', error);
//         throw error;
//     }
// };
//
// // Subscribe to messages (real-time)
// export const subscribeToMessages = (
//     chatId: string,
//     callback: (messages: Message[]) => void
// ) => {
//     const messagesRef = collection(db, `chats/${chatId}/messages`);
//     const q = query(messagesRef, orderBy('createdAt', 'asc'));
//
//     return onSnapshot(q, (snapshot) => {
//         const messages: Message[] = [];
//         snapshot.forEach((doc) => {
//             messages.push({ id: doc.id, ...doc.data() } as Message);
//         });
//         callback(messages);
//     });
// };
//
// // Subscribe to user's chats (real-time)
// export const subscribeToChats = (
//     userId: string,
//     callback: (chats: Chat[]) => void
// ) => {
//     const chatsRef = collection(db, 'chats');
//     const q = query(
//         chatsRef,
//         where('participants', 'array-contains', userId),
//         orderBy('lastMessageTime', 'desc')
//     );
//
//     return onSnapshot(q, (snapshot) => {
//         const chats: Chat[] = [];
//         snapshot.forEach((doc) => {
//             chats.push({ id: doc.id, ...doc.data() } as Chat);
//         });
//         callback(chats);
//     });
// };
//
// // Mark messages as read
// export const markMessagesAsRead = async (chatId: string, currentUserId: string) => {
//     try {
//         const messagesRef = collection(db, `chats/${chatId}/messages`);
//         const q = query(
//             messagesRef,
//             where('senderId', '!=', currentUserId),
//             where('read', '==', false)
//         );
//
//         const snapshot = await getDocs(q);
//         const updates = snapshot.docs.map((doc) =>
//             updateDoc(doc.ref, { read: true })
//         );
//
//         await Promise.all(updates);
//
//         // Reset unread count
//         const chatRef = doc(db, 'chats', chatId);
//         await updateDoc(chatRef, {
//             [`unreadCount.${currentUserId}`]: 0
//         });
//     } catch (error) {
//         console.error('Error marking messages as read:', error);
//     }
// };
//
// // Helper function to format timestamp for messages
// export const formatMessageTime = (timestamp: any) => {
//     if (!timestamp) return '';
//
//     const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
//     const now = new Date();
//     const diff = now.getTime() - date.getTime();
//     const minutes = Math.floor(diff / 60000);
//     const hours = Math.floor(diff / 3600000);
//     const days = Math.floor(diff / 86400000);
//
//     if (minutes < 1) return 'Just now';
//     if (minutes < 60) return `${minutes}m ago`;
//     if (hours < 24) return `${hours}h ago`;
//     if (days === 1) return 'Yesterday';
//     if (days < 7) return `${days}d ago`;
//
//     return date.toLocaleDateString();
// };
//
// // Helper function to format timestamp for chat time
// export const formatChatTime = (timestamp: any) => {
//     if (!timestamp) return '';
//
//     const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
//     const hours = date.getHours();
//     const minutes = date.getMinutes();
//     const ampm = hours >= 12 ? 'PM' : 'AM';
//     const formattedHours = hours % 12 || 12;
//     const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
//
//     return `${formattedHours}:${formattedMinutes} ${ampm}`;
// };

import {
    collection,
    addDoc,
    query,
    where,
    orderBy,
    onSnapshot,
    getDocs,
    doc,
    updateDoc,
    serverTimestamp,
    Timestamp,
    setDoc,
    getDoc
} from 'firebase/firestore';
import { db } from '@/config/firebaseConfig';

export interface Message {
    id: string;
    senderEmail: string;
    text: string;
    createdAt: Timestamp;
    read: boolean;
}

export interface ChatParticipantData {
    name: string;
    avatar: string;
    email: string;
}

export interface Chat {
    id: string;
    participants: string[]; // Array of emails
    participantsData: {
        [userEmail: string]: ChatParticipantData;
    };
    lastMessage: string;
    lastMessageTime: Timestamp;
    unreadCount: {
        [userEmail: string]: number;
    };
}

// Get or create a chat between two users (using emails)
export const getOrCreateChat = async (
    currentUserEmail: string,
    otherUserEmail: string,
    currentUserData: { name: string; avatar: string },
    otherUserData: { name: string; avatar: string }
) => {
    try {
        // Check if chat already exists
        const chatsRef = collection(db, 'chats');
        const q = query(
            chatsRef,
            where('participants', 'array-contains', currentUserEmail)
        );

        const querySnapshot = await getDocs(q);
        let existingChatId = null;

        querySnapshot.forEach((doc) => {
            const data = doc.data();
            if (data.participants.includes(otherUserEmail)) {
                existingChatId = doc.id;
            }
        });

        if (existingChatId) {
            return existingChatId;
        }

        // Create new chat
        const chatDocRef = doc(chatsRef);
        await setDoc(chatDocRef, {
            participants: [currentUserEmail, otherUserEmail],
            participantsData: {
                [currentUserEmail]: {
                    ...currentUserData,
                    email: currentUserEmail
                },
                [otherUserEmail]: {
                    ...otherUserData,
                    email: otherUserEmail
                }
            },
            lastMessage: '',
            lastMessageTime: serverTimestamp(),
            createdAt: serverTimestamp(),
            unreadCount: {
                [currentUserEmail]: 0,
                [otherUserEmail]: 0
            }
        });

        return chatDocRef.id;
    } catch (error) {
        console.error('Error getting or creating chat:', error);
        throw error;
    }
};

// Send a message (using email)
export const sendMessage = async (
    chatId: string,
    senderEmail: string,
    text: string,
    otherUserEmail: string
) => {
    try {
        const messagesRef = collection(db, `chats/${chatId}/messages`);

        await addDoc(messagesRef, {
            senderEmail,
            text,
            createdAt: serverTimestamp(),
            read: false
        });

        // Update chat's last message and increment unread count
        const chatRef = doc(db, 'chats', chatId);
        const chatDoc = await getDoc(chatRef);
        const chatData = chatDoc.data();

        await updateDoc(chatRef, {
            lastMessage: text,
            lastMessageTime: serverTimestamp(),
            [`unreadCount.${otherUserEmail}`]: (chatData?.unreadCount?.[otherUserEmail] || 0) + 1
        });
    } catch (error) {
        console.error('Error sending message:', error);
        throw error;
    }
};

// Subscribe to messages (real-time)
export const subscribeToMessages = (
    chatId: string,
    callback: (messages: Message[]) => void
) => {
    const messagesRef = collection(db, `chats/${chatId}/messages`);
    const q = query(messagesRef, orderBy('createdAt', 'asc'));

    return onSnapshot(q, (snapshot) => {
        const messages: Message[] = [];
        snapshot.forEach((doc) => {
            messages.push({ id: doc.id, ...doc.data() } as Message);
        });
        callback(messages);
    });
};

// Subscribe to user's chats (real-time) using email
export const subscribeToChats = (
    userEmail: string,
    callback: (chats: Chat[]) => void
) => {
    const chatsRef = collection(db, 'chats');
    const q = query(
        chatsRef,
        where('participants', 'array-contains', userEmail),
        orderBy('lastMessageTime', 'desc')
    );

    return onSnapshot(q, (snapshot) => {
        const chats: Chat[] = [];
        snapshot.forEach((doc) => {
            chats.push({ id: doc.id, ...doc.data() } as Chat);
        });
        callback(chats);
    });
};

// Mark messages as read (using email)
export const markMessagesAsRead = async (chatId: string, currentUserEmail: string) => {
    try {
        const messagesRef = collection(db, `chats/${chatId}/messages`);
        const q = query(
            messagesRef,
            where('senderEmail', '!=', currentUserEmail),
            where('read', '==', false)
        );

        const snapshot = await getDocs(q);
        const updates = snapshot.docs.map((doc) =>
            updateDoc(doc.ref, { read: true })
        );

        await Promise.all(updates);

        // Reset unread count
        const chatRef = doc(db, 'chats', chatId);
        await updateDoc(chatRef, {
            [`unreadCount.${currentUserEmail}`]: 0
        });
    } catch (error) {
        console.error('Error marking messages as read:', error);
    }
};

// Helper function to format timestamp for messages
export const formatMessageTime = (timestamp: any) => {
    if (!timestamp) return '';

    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days}d ago`;

    return date.toLocaleDateString();
};

// Helper function to format timestamp for chat time
export const formatChatTime = (timestamp: any) => {
    if (!timestamp) return '';

    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${formattedHours}:${formattedMinutes} ${ampm}`;
};