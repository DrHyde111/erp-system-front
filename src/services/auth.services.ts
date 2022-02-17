import axios, {AxiosError} from "axios";

const API = axios.create({baseURL: 'http://localhost:8080/api'});

export async function signIn(email: string, password: string) {
    let response;
    try {
        response = await API.post('/auth/login', {
            Email: email,
            Password: password
        })
    } catch (error: any | AxiosError) {
        if (axios.isAxiosError(error) && error.response != undefined) {
            throw error.response.data.message
        } else {
            throw "Something went wrong."
        }
    }

    localStorage.setItem('token', response.data.token)
    return true;
}

export async function checkCurrentSession() {
    let token = localStorage.getItem('token')

    if (token === undefined) {
        throw "No token"
    }

    let response;
    try {
        response = await API.post('/auth/check', {
            token: token,
        })
    } catch (error) {
        localStorage.removeItem("token")
        if (axios.isAxiosError(error) && error.response != undefined) {
            throw error.response.data.message
        } else {
            throw "Something went wrong."
        }
    }

    return true;
}
