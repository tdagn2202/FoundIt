import axios from "axios";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {PostData} from "@/types/postProps";


export const posts = async (data: any) => {
    try {
        const token = await AsyncStorage.getItem("token");

        const res = await axios.post(
            `${Constants.expoConfig?.extra?.API_BASE}/post`,
            data,
            {
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${token}`
                }
            }
        );

        console.log("Response:", res.data);
        return res;
    } catch (error) {
        // @ts-ignore
        console.error("API Error:", error.response?.data || error.message);
        throw error; // Re-throw so the calling function can handle it
    }
}

export const getPost = async (): Promise<PostData[]> => {
    try {
        const res = await axios.get(`${Constants.expoConfig?.extra?.API_BASE}/post`);
        return res.data;
    } catch (err) {
        console.error(err);
        return [];
    }
};

export const getPostById = async (id: number | string): Promise<PostData> => {
    try {
        const response = await fetch(`${Constants.expoConfig?.extra?.API_BASE}/post/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch post');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching post by id:', error);
        throw error;
    }
};

export const getAllPosts = async (): Promise<PostData[]> => {
    try {
        const res = await axios.get(`${Constants.expoConfig?.extra?.API_BASE}/post/me`);
        return res.data;
    } catch (err) {
        console.error(err);
        return [];
    }
}

export const postDone = async  (id:number | string) => {
    try {
        const res = await axios.patch(`${Constants.expoConfig?.extra?.API_BASE}/post/${id}/status`)
        return res.data
    } catch (e) {
        console.log(e)
        throw e
    }
}