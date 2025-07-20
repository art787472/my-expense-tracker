import axios from "axios";

const instance = axios.create();

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
                const refreshToken = localStorage.getItem('refreshToken');
                const accessToken = localStorage.getItem('token');
                
                const res = await axios.post('https://localhost:7283/api/account/token', {
                    accessToken, 
                    refreshToken
                });
                
                console.log('成功refresh token');
                
                const newAccessToken = res.data.data.accessToken;
                const newRefreshToken = res.data.data.refreshToken;
                
                // 儲存新的 tokens
                localStorage.setItem('token', newAccessToken);
                localStorage.setItem('refreshToken', newRefreshToken);
                
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