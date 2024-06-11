import React, {useEffect, useState} from "react"
import axios from 'axios'
const IssueCommentContext = React.createContext()

const userAxios = axios.create()

// User Authentication interceptor
userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("token")
    config.headers.Authorization = `Bearer ${token}`
    return config
})

const IssueCommentContextProvider = (props) => {
    const [count, setCount] = useState(0)
    const [listOfIssues, setListOfIssues] = useState([])
    const [allComments, setAllComments] = useState([])

    const getPublicIssueList =  async () => userAxios.get("/api/rock-the-vote-main/blog/publicIssues").then(res => 
        {
            setListOfIssues(res.data),
            console.log(res.data)
        }).catch(err => console.log(err))
    
    const getAllComments =  async () => userAxios.get("/api/rock-the-vote-main/blog/commentList").then(res => 
        {
            setAllComments(res.data),
            console.log(res.data)
        }).catch(err => console.log(err))

    

    const newIssuePost = async (item) => userAxios.post(`/api/rock-the-vote-main/blog/newIssue`, item).then(res => 
        {
            console.log(item)
            console.log(res.data)
            setCount(prev => prev + 1)
        }
    )

    const newCommentPost = async (item) => userAxios.post(`/api/rock-the-vote-main/blog/newComment`, item).then(res => 
        {
            console.log(item)
            console.log(res.data)
            setCount(prev => prev + 1)
        }
    )

    const upVotePost = async (issueId, likedPost) => 
        userAxios.put(`/api/rock-the-vote-main/blog/issues/upVote/${issueId}`)
        .then(res => {
            setListOfIssues(prevIssues => prevIssues.map(issue => issue._id === issueId ? res.data : issue))
        })
        .catch(err => console.log(err))
    
    const downVotePost = async (issueId, dislikedPost) => userAxios.put(`/api/rock-the-vote-main/blog/issues/downVote/${issueId}`)
    .then(res => {
        setListOfIssues(prevIssues => prevIssues.map(issue => issue._id === issueId ? res.data : issue))
    }).catch(err => console.log(err))
    
    
    console.log(listOfIssues, allComments)
    

    return(
        <IssueCommentContext.Provider value={{
            listOfIssues,
            allComments,
            getAllComments,
            getPublicIssueList,
            newIssuePost,
            newCommentPost,
            upVotePost,
            downVotePost,
            count
        }}>
            {props.children}
        </IssueCommentContext.Provider>
    )
}

export {IssueCommentContext, IssueCommentContextProvider}