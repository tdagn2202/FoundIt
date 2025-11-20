// export interface PostData {
//     id: string | number;
//     userAvatar: string;
//     userName: string;
//     title: string;
//     timeAgo: string;
//     description: string;
//     type: string;
//     building: string;
//     room: string;
//     images: string[];
// }
//
// export interface PostListProps {
//     data: PostData[]
// }
//
// export interface PostListItemProps {
//     data: PostData
// }

export interface PostUser {
    id: number;
    name: string;
    avatar: string;
    phone: string | null;
}

export interface PostType {
    id: number;
    name: string;
}

export interface PostImage {
    id: number;
    url: string;
}

export interface  Facility {
    id: number;
    college: string;
}

export interface Room {
    id: number;
    name: string;
}

export interface PostItem {
    id: number;
    name: string;
    des: string;
    status: string;
    type: PostType;
    images: PostImage[];
}

export interface PostData {
    id: number;
    title: string;
    content: string;
    create_At: string;
    facility: Facility;
    room: Room;
    user: PostUser;
    item: PostItem[];
}

export interface PostListProps {
    data: PostData[];
    refetch?: () => Promise<void>;
}

export interface PostListItemProps {
    data: PostData;
    refetch?: () => Promise<void>;
}

export interface UserDataProps {
    name: string;
    email: string;
    avatar: string;
    phone: string | null;
    college: string | null;
    course: string | null;
}
