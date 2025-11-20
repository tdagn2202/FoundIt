import axios from "axios";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

type loginProps = {
    email: string,
    password: string,
}

type signUpProps = {
    email: string,
    name: string,
    password: string,
    passwordConfirm: string,
}
export const login = async ({email, password}: loginProps) => {
    const res = await axios.post(`${Constants.expoConfig?.extra?.API_BASE}/auth/sign-in`, {
        email,
        password
    })
    console.log("TOKEN STORED IN LOCAL STORAGE")
    if (res) {
        await AsyncStorage.setItem("token", res.data.token)
        await AsyncStorage.setItem("email", email)
    }
    console.log(res.status)

    return res.status === 200

}

exports.logout = async ({email}: loginProps) => {
    await AsyncStorage.removeItem("token");
}

export const signUp = async ({email, password, passwordConfirm, name}: signUpProps) => {
    const res = await axios.post(`${Constants.expoConfig?.extra?.API_BASE}/auth/sign-up`, {
        email,
        password,
        passwordConfirm,
        name
    })

    return (res.status) !== 400
}