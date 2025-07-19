import { useRouter } from 'next/router'
import { useEffect } from 'react'
import axios from '../../utils/axios'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


export default function Logout() {
    const router = useRouter()
    useEffect(() => {

        const handleLogout = async () => {
            try {
                localStorage.removeItem('token')
                document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
                axios.post('logout')
                router.replace('/login')
            } catch (error) {
                router.replace('/login')
            }

        }




        handleLogout()
    }, [router])
    return (
        <Box
            sx={{
                p: 4, // 內部 padding
                backgroundColor: "rgba(255, 255, 255, 0.85)", // 背景半透明白色
                borderRadius: 2, // 圓角
                boxShadow: 3, // 陰影
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <Typography variant='h3'>登出中……</Typography>


        </Box>
    )
}