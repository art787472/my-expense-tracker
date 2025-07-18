"use client"
import { createContext } from "react"

const UserContext = createContext({
        user: {
            account: ""
        },
        token: "",
        login: false
    }
)

export default UserContext