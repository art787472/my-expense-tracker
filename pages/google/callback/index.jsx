import { use, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
export default function HomePage() {
    const router = useRouter();

    useEffect(() => {
        const { code } = router.query;
        const handlelogin = async () => {
            try {
                const res = await axios.get(`https://localhost:7283/google/callback?code=${code}`);
                if (res.status === 200) {
                    const data = res.data.data;
                    console.log("登入成功:", data);
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
            // 在這裡處理 Google 登入的邏輯
            // 例如，使用 code 來獲取 access token 等
            console.log("Google 登入成功，code:", code);
            // 可以在這裡進行 API 請求或其他操作
            handlelogin();
        }
    }, [router.query]);
}