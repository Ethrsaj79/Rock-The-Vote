import { useContext, useState, useEffect } from "react"
import { IssueCommentContext } from "../context/IssueCommentContext"
import { NavBar } from "./Structure_Public"



const NewIssueForm = () => {
    const user = JSON.parse(localStorage.getItem('user'))
    const userId = user._id
    const {  getAllComments, getPublicIssueList, count } = useContext(IssueCommentContext)
    useEffect(() => {
        getPublicIssueList(),
        getAllComments()
    }, [count])
    
    const initValues = {
        title: '',
        imgUrl: '',
        content: '',
        user: userId || ''
    }
    
    const { newIssuePost } = useContext(IssueCommentContext)

    const [newPost, setNewPost] = useState(initValues)
    

    const handleChange = (e) => {
        const {name, value} = e.target
        setNewPost(prev => ({
            ...prev,
            [name]: value
        }))
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        newIssuePost(newPost)
        setNewPost(initValues)
    }

    return (
        <>  
            {NavBar()}
            <form onSubmit={handleSubmit}>
                <input 
                style={{margin: 5, padding: 5}}
                type="text" 
                name="title"
                onChange={handleChange}
                value={newPost.title}
                placeholder="Post Title"
                />
                <br />
                <input 
                type="text" 
                name="imgUrl"
                onChange={handleChange}
                value={newPost.imgUrl}
                placeholder="Image Url"
                />
                <br />
                <textarea 
                style={{marginTop: 15}}
                name="content"
                onChange={handleChange}
                value={newPost.content}
                placeholder="Explain in detail..."
                cols="15"
                rows= "15"
                />
                <br />
                
                <button>Submit</button>
            </form>
        </>
    )
}

export {NewIssueForm}