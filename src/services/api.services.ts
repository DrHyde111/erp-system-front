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

export async function getWarehouses() {
    let response
    try {
        response = await API.get(`/warehouse`)
    } catch (error) {
        if (axios.isAxiosError(error) && error.response != undefined) {
            throw error.response.data.message
        } else {
            throw "Something went wrong."
        }
    }
    return response.data;
}

export async function getOverseerWarehouses(employeeId: string | undefined) {
    let response
    try {
        response = await API.post(`/warehouse/overseer/${employeeId}`)
    } catch (error) {
        if (axios.isAxiosError(error) && error.response != undefined) {
            throw error.response.data.message
        } else {
            throw "Something went wrong."
        }
    }
    return response.data;
}

export async function getWarehouse(id: string | undefined) {
    let response
    try {
        response = await API.get(`/warehouse/${id}`)
    } catch (error) {
        if (axios.isAxiosError(error) && error.response != undefined) {
            throw error.response.data.message
        } else {
            throw "Something went wrong."
        }
    }
    return response.data;
}

export async function createWarehouse(warehouse: Object) {
    let response
    try {
        response = await API.post(`/warehouse/create`, warehouse)
    } catch (error) {
        if (axios.isAxiosError(error) && error.response != undefined) {
            throw error.response.data.message
        } else {
            throw "Something went wrong."
        }
    }
    return response.data;
}

export async function deleteWarehouse(id: string | undefined) {
    let response
    try {
        response = await API.delete(`/warehouse/${id}`)
    } catch (error) {
        if (axios.isAxiosError(error) && error.response != undefined) {
            throw error.response.data.message
        } else {
            throw "Something went wrong."
        }
    }
    return response.data;
}

export async function getWarehouseOverseers(id: string | undefined) {
    let response
    try {
        response = await API.get(`/warehouse/${id}/overseers`)
    } catch (error) {
        if (axios.isAxiosError(error) && error.response != undefined) {
            throw error.response.data.message
        } else {
            throw "Something went wrong."
        }
    }
    return response.data;
}

export async function unasignWarehouseOverseer(id: string | undefined, overseerId: string | undefined) {
    let response
    try {
        response = await API.delete(`/warehouse/${id}/overseers/${overseerId}`)
    } catch (error) {
        if (axios.isAxiosError(error) && error.response != undefined) {
            throw error.response.data.message
        } else {
            throw "Something went wrong."
        }
    }
    return response.data;
}

export async function asignWarehouseOverseer(id: string | undefined, overseerId: string | undefined) {
    let response
    try {
        response = await API.post(`/warehouse/${id}/overseers/${overseerId}/assign`)
    } catch (error) {
        if (axios.isAxiosError(error) && error.response != undefined) {
            throw error.response.data.message
        } else {
            throw "Something went wrong."
        }
    }
    return response.data;
}

export async function getWarehouseProducts(id: string | undefined) {
    let response
    try {
        response = await API.get(`/warehouse/${id}/products`)
    } catch (error) {
        if (axios.isAxiosError(error) && error.response != undefined) {
            throw error.response.data.message
        } else {
            throw "Something went wrong."
        }
    }
    return response.data;
}

export async function addProduct(id: string | undefined, product: Object) {
    let response
    try {
        response = await API.post(`/warehouse/${id}/products/add`, product)
    } catch (error) {
        if (axios.isAxiosError(error) && error.response != undefined) {
            throw error.response.data.message
        } else {
            throw "Something went wrong."
        }
    }
    return response.data;
}

export async function getProduct(id: string | undefined, productId: string | undefined) {
    let response
    try {
        response = await API.get(`/warehouse/${id}/products/${productId}`)
    } catch (error) {
        if (axios.isAxiosError(error) && error.response != undefined) {
            throw error.response.data.message
        } else {
            throw "Something went wrong."
        }
    }
    return response.data;
}

export async function removeProduct(id: string | undefined, productId: string | undefined) {
    let response
    try {
        response = await API.delete(`/warehouse/${id}/products/${productId}`)
    } catch (error) {
        if (axios.isAxiosError(error) && error.response != undefined) {
            throw error.response.data.message
        } else {
            throw "Something went wrong."
        }
    }
    return response.data;
}

export async function moveProduct(id: string | undefined, productId: string | undefined, warehouseId: string | undefined, product: Object) {
    let response
    try {
        response = await API.post(`/warehouse/${id}/products/${productId}/move/${warehouseId}`, product)
    } catch (error) {
        if (axios.isAxiosError(error) && error.response != undefined) {
            throw error.response.data.message
        } else {
            throw "Something went wrong."
        }
    }
    return response.data;
}

export async function editProduct(id: string | undefined, productId: string | undefined, product: Object) {
    let response
    try {
        response = await API.post(`/warehouse/${id}/products/${productId}`, product)
        console.log(response)
    } catch (error) {
        if (axios.isAxiosError(error) && error.response != undefined) {
            throw error.response.data.message
        } else {
            throw "Something went wrong."
        }
    }
    return response.data;
}







