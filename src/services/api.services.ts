import axios, {AxiosError} from "axios";
import {read} from "fs";

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
    return response.data;
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

    return response.data;
}

export async function getLastUserAttendance(id: number) {
    let response
    try {
        response = await API.get(`/employee/${id}/attendance/latest`)
    } catch (error) {
        if (axios.isAxiosError(error) && error.response != undefined) {
            throw error.response.data.message
        } else {
            throw "Something went wrong."
        }
    }
    return response.data;
}

export async function attendanceControl(id: number) {
    let response
    try {
        response = await API.put(`/employee/${id}/attendance/`)
    } catch (error) {
        if (axios.isAxiosError(error) && error.response != undefined) {
            throw error.response.data.message
        } else {
            throw "Something went wrong."
        }
    }
    return response.data;
}

export async function getEmployeeAttendances(id: number) {
    let response
    try {
        response = await API.get(`/employee/${id}/attendance/`)
    } catch (error) {
        if (axios.isAxiosError(error) && error.response != undefined) {
            throw error.response.data.message
        } else {
            throw "Something went wrong."
        }
    }
    return response.data;
}

export async function getEmployees() {
    let response
    try {
        response = await API.get(`/employee`)
    } catch (error) {
        if (axios.isAxiosError(error) && error.response != undefined) {
            throw error.response.data.message
        } else {
            throw "Something went wrong."
        }
    }
    return response.data;
}

export async function getEmployee(id: string | undefined) {
    let response
    try {
        response = await API.get(`/employee/${id}`)
    } catch (error) {
        if (axios.isAxiosError(error) && error.response != undefined) {
            throw error.response.data.message
        } else {
            throw "Something went wrong."
        }
    }
    return response.data;
}

export async function getRemarks(id: string | undefined, attendanceId: string | undefined) {
    let response
    try {
        response = await API.get(`/employee/${id}/attendance/${attendanceId}/remarks`)
    } catch (error) {
        if (axios.isAxiosError(error) && error.response != undefined) {
            throw error.response.data.message
        } else {
            throw "Something went wrong."
        }
    }
    return response.data;
}

export async function getSpecificRemark(id: string | undefined, attendanceId: string | undefined, remarkId: string | undefined) {
    let response
    try {
        response = await API.get(`/employee/${id}/attendance/${attendanceId}/remarks/${remarkId}`)
    } catch (error) {
        if (axios.isAxiosError(error) && error.response != undefined) {
            throw error.response.data.message
        } else {
            throw "Something went wrong."
        }
    }
    return response.data;
}

export async function createRemark(id: string | undefined, attendanceId: string | undefined, remark: Object) {
    let response
    try {
        response = await API.post(`/employee/${id}/attendance/${attendanceId}/remarks`, remark)
    } catch (error) {
        if (axios.isAxiosError(error) && error.response != undefined) {
            throw error.response.data.message
        } else {
            throw "Something went wrong."
        }
    }
    return response.data;
}

export async function deleteEmployee(id: string | undefined) {
    let response
    try {
        response = await API.delete(`/employee/${id}`)
    } catch (error) {
        if (axios.isAxiosError(error) && error.response != undefined) {
            throw error.response.data.message
        } else {
            throw "Something went wrong."
        }
    }
    return response.data;
}

export async function editEmployee(id: string | undefined, employee: Object) {
    let response
    try {
        response = await API.post(`/employee/${id}`, employee)
    } catch (error) {
        if (axios.isAxiosError(error) && error.response != undefined) {
            throw error.response.data.message
        } else {
            throw "Something went wrong."
        }
    }
    return response.data;
}

export async function createEmployee(employee: Object) {
    let response
    console.log(employee)
    try {
        response = await API.post("/employee/create", employee)
    } catch (error) {
        if (axios.isAxiosError(error) && error.response != undefined) {
            throw error.response.data.message
        } else {
            throw "Something went wrong."
        }
    }
    return response.data;
}


