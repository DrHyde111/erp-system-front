import axios from "axios";

const API = axios.create({baseURL: 'http://localhost:8080/api'});

export async function signIn(email: string, password: string) {
    return await API.post('/auth/login', {
        Email: email,
        Password: password
    })
}