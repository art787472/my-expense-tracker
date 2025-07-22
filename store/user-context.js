"use client"
import { createContext } from "react"

const UserContext = createContext({
        user: {
            account: "",
            userId: ""
        },
        token: "",
        login: false,
        loginUser: () => {}, // 加入預設的空函數
        logoutUser: () => {} // 加入預設的空函數
    }
)

export default UserContext