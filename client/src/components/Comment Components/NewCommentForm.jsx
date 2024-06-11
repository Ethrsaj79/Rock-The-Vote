import { useState, useContext } from "react";
import { IssueCommentContext } from "../context/IssueCommentContext";



const NewCommentForm = (props) => {
    const {issueId} = props
    const {newCommentPost, count} = useContext(IssueCommentContext)
    const user = JSON.parse(localStorage.getItem("user"))
    const userId = user._id
    
    const initValues = {
        content: '',
        issue: issueId,
        user: userId
    }

    const [newComment, setNewComment] = useState(initValues)

    const handleChange = (e) => {
        const {name, value} = e.target
        setNewComment(prev => ({
            ...prev,
            [name]: value
        }))
        console.log(newComment)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // new comment post request
        newCommentPost(newComment)
        // (re-render useEffect) function
        setNewComment(initValues)
    } 



    return (
        <form onSubmit={handleSubmit}>
            <textarea 
            name="content"
            value={newComment.content}
            onChange={handleChange}
            placeholder="Comment Section"
            />
            <br />
            <button>Submit New Comment</button>
        </form>
    )
} 

export {NewCommentForm}