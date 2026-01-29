import axios from 'axios'

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL || '/',
})

instance.interceptors.request.use((request) => {
    const authToken = localStorage.getItem('token')
    request.headers.Authorization = authToken ? `Bearer ${authToken}` : ``
    return request
})

instance.interceptors.response.use((response) => {
    return response
}, (error) => {
    if (error?.response.status === 401) {
        window.location.pathname = `/signup`
    }
    throw error
})

export default instance