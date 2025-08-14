import axios from "axios";
import https from 'https';
import Cookies from 'js-cookie'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
const instance = axios.create({
  
  httpsAgent: new https.Agent({  
    rejectUnauthorized: false 
  }),
  withCredentials: true
  })

instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if(token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

instance.interceptors.response.use(
    (response) => {
        // 成功回應直接返回
        return response;
    },
    async (error) => {
        console.log(error);
        const originalRequest = error.config;
        
        // 檢查是否為 401 錯誤且未重試過
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            
            try {
                
                
                const accessToken = Cookies.get('token');
                
                const res = await instance.post(`${baseUrl}/account/token`, {
                    accessToken
                   
                });
                
                console.log('成功refresh token');
                
                const newAccessToken = res.data.data.accessToken;
                
                
                // 儲存新的 tokens
                localStorage.setItem('token', newAccessToken);
                Cookies.remove('token')
                Cookies.set('token', accessToken)
                
                // 更新原始請求的 Authorization header
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                
                // 重新發送原始請求
                return instance(originalRequest);
                
            } catch (refreshError) {
                console.log('Refresh token 失效，請重新登入');
                localStorage.removeItem('token');
                localStorage.removeItem('refreshToken');
                // 導向登入頁面
                // window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }
        
        return Promise.reject(error);
    })

export default instance;