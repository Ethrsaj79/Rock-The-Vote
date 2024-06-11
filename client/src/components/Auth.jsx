import React, {useContext, useEffect, useState} from 'react'
import { AuthForm } from "./AuthForm"
import { Footer } from './Structure/Structure_Public.jsx'
import { UserContext } from './context/UserContext'
import { Navigate } from 'react-router-dom'
import { IssueCommentContext } from './context/IssueCommentContext.jsx'


const initInputs = { username: "", password: "" }

const Auth = () => {
    
    const [inputs, setInputs] = useState(initInputs)
    const [toggle, setToggle] = useState(false)
    
    const { login, signUp} = useContext(UserContext)
    const { getAllComments, getPublicIssueList, count} = useContext(IssueCommentContext)
    
    const signUpRedirect = () => {<Navigate to="/public"/>}
    const loginRedirect = () => {<Navigate to="/private"/>}

    const handleChange = (e) => {
        const {name, value} = e.target
        setInputs(prevInputs => ({
            ...prevInputs,
            [name]: value
        }))
    } 
    const handleSignUp = (e) => {
        e.preventDefault()
        signUp(inputs)
        useEffect(() => {
            getPublicIssueList(),
            getAllComments()
        }, [count])
    } 
    const handleLogin = (e) => {
        e.preventDefault()
        login(inputs)
        useEffect(() => {
            getPublicIssueList(),
            getAllComments()
        }, [count])
    } 
    const toggleForm = () => {
        setToggle(prev => !prev)
        // resetAuth
    } 

    return (
        <div className='auth--box'>
            {!toggle ?
                <>
                    <AuthForm
                        handleChange = {handleChange}
                        handleSubmit = {handleSignUp}
                        inputs = {inputs}
                        redirect={signUpRedirect}
                        btnTxt = "Get Ready to Rock Some Votes!!"
                        // errMsg = {errMsg}
                        />
                    <p onClick={toggleForm}>Already Signed Up?</p>
                    {Footer}
                </>
                    :
                    <>
                    <AuthForm
                        handleChange = {handleChange}
                        handleSubmit = {handleLogin}
                        inputs = {inputs}
                        redirect={loginRedirect}
                        btnTxt = "Back to Rock Some More?"
                        // errMsg = {errMsg}
                        />
                    <p onClick={toggleForm}>Not a Member?</p>
                    {Footer}
                </>
                
            }
        </div>
    )
}

export {Auth}