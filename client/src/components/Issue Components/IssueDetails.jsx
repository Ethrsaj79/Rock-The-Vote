import {useContext, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import { IssueCommentContext } from '../context/IssueCommentContext'
import { NewCommentForm } from '../Comment Components/NewCommentForm'
import { NavBar } from '../Structure/Structure_Public'


const IssueDetails = () => {
    const user = JSON.parse(localStorage.getItem("user"))
    const userId = user._id
    
    const { allComments, listOfIssues, getAllComments, getPublicIssueList, upVotePost, downVotePost, count } = useContext(IssueCommentContext)
    useEffect(() => {
        getPublicIssueList(),
        getAllComments()
    }, [count])
    // console.log(listOfIssues)
    const singleIssue = useParams()
    const commentsOnTheIssue = useParams()
    console.log(commentsOnTheIssue)
    // console.log(singleIssue)
    const foundIssue = listOfIssues.find(topic => topic._id === singleIssue.issueId)
    // console.log(foundIssue.title)
    const foundComments = allComments.filter(source => source.issue === singleIssue.issueId)
    console.log(foundComments)
    const issueCList = foundComments
    console.log(issueCList)
    const commentSectionListing = foundComments.map(comment => (
        <div key={comment._id}>
            <p>{comment.content}</p>
        </div>
    ))
    console.log(foundIssue.dislikedUsers.length)
    

    
    return(
        <>
            <NavBar/>
            <div>
                <br />
                <p>Upvotes: {foundIssue.likedUsers.length}</p>
                <p>Downvotes: {foundIssue.dislikedUsers.length}</p>
                <br />
                <button onClick={() => upVotePost(foundIssue._id)}>Upvote</button>
                <button onClick={() => downVotePost(foundIssue._id)}>Downvote</button>
                <br />
                <h1>{foundIssue.title}</h1>
                <br />
                <img src={foundIssue.imgUrl}/>
                <br />
                <NewCommentForm
                        issueId={singleIssue.issueId}
                />
                {commentSectionListing}
            </div>
        </>
    )

}

export {IssueDetails}