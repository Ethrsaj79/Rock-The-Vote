import { useContext, useEffect } from "react"
import { IssueCommentContext } from "../context/IssueCommentContext"
import { Link } from "react-router-dom"
import { NavBar } from "./Structure_Public"
// CommentForm import

const UserList = () => {
    const { listOfIssues, getAllComments, getPublicIssueList, count } = useContext(IssueCommentContext)
    useEffect(() => {
        getPublicIssueList(),
        getAllComments()
    }, [count])
    
    const user = JSON.parse(localStorage.getItem("user"))
    const userId = user._id
    
    const personalListing = listOfIssues.map(issue => issue.user === userId && (
        <li key={issue._id}>
            <Link to={`/issuePosts/${issue._id}`} style={{margin: 5}}>{issue.title}</Link>
            <img style={{width: 500}}src={issue.imgUrl} />
            <p>{issue.content}</p>
        </li>
    )
)

    
    return(
        <>
            <NavBar/>
            <br />
            <div style={{marginBottom: 15}}>
                <h1 className='title--card'>
                        {/* User-Created  */} Issues:
                    </h1>
                    <div className='list--card'>
                        <ol>
                            {personalListing}
                        </ol>
                    </div>
            </div>
            {/* {Footer()} */}
        </>
    )
}

export {UserList}