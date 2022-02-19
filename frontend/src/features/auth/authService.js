import axios from 'axios'

const API_URL = '/api/user/'

// Register User
const register = async (userData) => {
    const response = await axios.post(API_URL, userData)

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data.data))
    }

    return response.data.data
}

// Login User
const login = async (userData) => {
    const response = await axios.post(API_URL + 'login', userData)

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data.data))
    }

    return response.data.data
}

// Logout User
const logout = async () => {
    localStorage.removeItem('user')
}

const authService = {
    register,
    logout,
    login
}

export default authService