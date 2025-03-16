import axios from 'axios'

const instance = axios.create({
    // baseURL: 'http://localhost:3001/',
    baseURL: 'http://localhost:8001/',
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
        console.log('in here')
        window.location.pathname = `/signup`
    }
    throw error
})

export default instance