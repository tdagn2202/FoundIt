import {useCallback, useEffect, useState} from "react";
import {UserDataProps} from "@/types/postProps";
import Constants from "expo-constants";
import axios from "axios";

export function useMe() {
    const [userData, setUserData] = useState<UserDataProps>()

    const fetchData = useCallback(async () => {
        console.log("function fetchdata invoked")
        try {
            const data = await axios.get(`${Constants.expoConfig?.extra?.API_BASE}/auth/me`)

            if (data) {
                setUserData(data.data)
                console.log(data)
            } else {
                console.log("Error fetching data")
            }
        } catch (err) {
            console.log(err)
        }
    }, [])

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return {
        userData,
        fetchData
    }
}