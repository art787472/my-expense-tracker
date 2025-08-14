import { use, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Cookies from 'js-cookie'
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from "@mui/material";
export default function HomePage() {
    const router = useRouter();

    useEffect(() => {
        const { code } = router.query;
        const handlelogin = async () => {
            try {
                const res = await axios.get(`https://localhost:7283/auth/line/callback?code=${code}`);
                if (res.status === 200) {
                    console.log("登入成功:", res.data);
                    const data = res.data.data;
                    
                    // 可以在這裡處理登入成功後的邏輯
                    const token = data.accessToken


                    localStorage.setItem('token', token);
                    localStorage.setItem('user', JSON.stringify(res.data.data.user));

                    Cookies.set('token', token)
                    Cookies.set('userId', res.data.data.user.id)

                    router.push('/');
                } else {
                    console.error("登入失敗:", res.statusText);
                }

            } catch (error) {
                console.error("發生錯誤:", error);
            }
        }
        if (code) {
            
            // 可以在這裡進行 API請求或其他操作
            handlelogin();
        }
    }, [router.query]);

    return (
         <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            gap={2}
            sx={{ minHeight: '200px' }}
        >
            <CircularProgress />
            <p>正在處理登入...</p>
        </Box>
    )
}