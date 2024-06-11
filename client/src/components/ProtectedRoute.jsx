import React from "react"
import {Navigate} from 'react-router-dom'
const ProtectedRoute = (props) => {
    const {token, children} = props
    console.log(token)
    return (token ? children : <Navigate to='/'/>)
}

export {ProtectedRoute}