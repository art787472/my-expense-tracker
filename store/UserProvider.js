import UserContext from "./user-context";
import { useState, useEffect } from "react";

const UserProvider = ({children}) => {
    const [userState, setUserState] = useState({
        user: {
            account: "",
            userId: ""
        },
        token: "",
        login: false,
        
    });
     useEffect(() => {
        console.log("UserProvider useEffect: 嘗試從 localStorage 載入數據");
        const storedToken = localStorage.getItem('token');
        const storedUserString = localStorage.getItem('user'); // 假設你把 user data 也存成了字串

        if (storedToken && storedUserString) {
            try {
                const parsedUser = JSON.parse(storedUserString); // 解析儲存的 user 資料
                setUserState({
                    user: parsedUser,
                    token: storedToken,
                    login: true // 設置為 true，表示用戶已登入
                });
                console.log("UserProvider useEffect: 成功載入用戶數據");
            } catch (error) {
                console.error("解析本地儲存的用戶數據失敗:", error);
                // 如果解析失敗，清除無效數據，防止循環錯誤
                localStorage.removeItem('token');
                localStorage.removeItem('user');
            }
        } else {
            console.log("UserProvider useEffect: 無儲存的用戶數據");
        }
    }, []);
    // 登入函數
    const loginUser = (userData, token) => {
        console.log("loginUser called with:", userData, token);
    
    // 確保數據不是 undefined 或 null
    if (!userData) {
      console.error("userData is null or undefined");
      return;
    }
        setUserState({
            user: {
                account: userData.account || userData.email,
                userId: userData.userId || userData.id
            },
            token: token,
            login: true
        });
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    // 登出函數
    const logoutUser = () => {
        setUserState({
            user: {
                account: "",
                userId: ""
            },
            token: "",
            login: false
        });
        
        
    };

    const contextValue = {
        ...userState,
        loginUser,
        logoutUser
    };

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;