import React, {useState} from "react"
import axios from 'axios'
const UserContext = React.createContext()

const userAxios = axios.create()

// User Authentication interceptor
userAxios.interceptors.request.use(config => {
    const token = JSON.parse(localStorage.getItem("token"))
    config.headers.Authorization = `Bearer ${token}`
    return config
})

const initState = {
    user: JSON.parse(localStorage.getItem("user")) || {},
    token: localStorage.getItem("token") || '',
    issues: []
    // errMsg: ''
}

const UserContextProvider = (props) => {

    const [count, setCount] = useState(0)

    const [userState, setUserState] = useState(initState)

    const signUp = async (credentials) => {
        axios.post(`/api/auth/signup`, credentials)
            .then(res => {
                const {user, token} = res.data
                localStorage.setItem("token", token)
                localStorage.setItem("user", JSON.stringify(user))
                setUserState(prevState => ({
                    ...prevState,
                    user,
                    token
                }))
                console.log(credentials)
            })
            .catch(err => console.log(err.response.data.errMsg))
    }    
    const login = (credentials) => {
        axios.post('/api/auth/login', credentials)
        .then(res => {
            const {user, token} = res.data
            localStorage.setItem("token", token)
            localStorage.setItem("user", JSON.stringify(user))
            setUserState(prevUserState => ({
                ...prevUserState, 
                user, 
                token
            }))
        })
        .catch(err => console.log(err.response.data.errMasg))
    }    
    const logout = () => {
        localStorage.removeItem(`token`)
        localStorage.removeItem(`user`)
        setUserState(initState)
    }
    return(
        <UserContext.Provider value={{
            ...userState,
            signUp,
            login,
            logout,
            count,
            // resetAuthErr
        }}>
            {props.children}
        </UserContext.Provider>
    )
}

export {UserContext, UserContextProvider}