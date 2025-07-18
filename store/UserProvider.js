import UserContext from "./user-context";

const userContext = {
    user: {
            account: ""
        },
        token: "",
        login: false
}

const  UserProvider = ({children}) => {
    return <UserContext.Provider value={userContext}>{children}</UserContext.Provider>
}

export default UserProvider