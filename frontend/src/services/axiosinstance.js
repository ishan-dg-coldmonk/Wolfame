import axios from 'axios'

const instance = axios.create({
    // baseURL: 'http://localhost:3001/',
    baseURL: 'https://delightful-plum-button.cyclic.app/',
})

instance.interceptors.request.use((request) => {
    const authToken = localStorage.getItem('token')
    request.headers.Authorization = authToken ? `Bearer ${authToken}` : ``
    return request
})

export default instance