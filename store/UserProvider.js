import UserContext from "./user-context";
import { useState } from "react";

const UserProvider = ({children}) => {
    const [userState, setUserState] = useState({
        user: {
            account: "",
            userId: ""
        },
        token: "",
        login: false
    });

    // 登入函數
    const loginUser = (userData, token) => {
        setUserState({
            user: {
                account: userData.account || userData.email,
                userId: userData.userId || userData.id
            },
            token: token,
            login: true
        });
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