import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8080/blog', // 设置基础URL
    timeout: 10000, // 请求超时时间
});

export default axiosInstance;