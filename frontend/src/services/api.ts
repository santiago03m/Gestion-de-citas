import axios from 'axios'


export const API_BASE = import.meta.env.VITE_API_URL ?? '/api'


const api = axios.create({
baseURL: API_BASE,
timeout: 15000,
})


// Interceptor opcional para agregar Authorization si hay token
api.interceptors.request.use((config) => {
const token = localStorage.getItem('accessToken')
if (token && config.headers) config.headers.Authorization = `Bearer ${token}`
return config
})


export default api