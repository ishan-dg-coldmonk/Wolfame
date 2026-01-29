import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://wolfame-2k26-backend.onrender.com',
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