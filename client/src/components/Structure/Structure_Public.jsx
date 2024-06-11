import {useNavigate, Link, Navigate} from 'react-router-dom'
import { Auth } from '../Auth'
import { useContext, useEffect } from 'react'
import { UserContext } from '../context/UserContext.jsx'
import { IssueCommentContext } from '../context/IssueCommentContext.jsx'

const Footer = () => {
    const navigate = useNavigate()
    return(
        <div style={{margin: 5}}>
            <button style={{margin: 1.5, width: 75}} onClick={() => navigate(-1)}>Back</button>
            <button style={{margin: 1.5, width: 75}} onClick={() => navigate(1)}>Forward</button>
            <div>
                <button style={{margin: 1.5, width: 75}}>Logout</button>
            </div>
        </div>
    )
}

const NavBar = () => {
    const {token} = useContext(UserContext)

    return(
        <div>
            {token && (
                <Link to={`/newpost`} style={{margin: 5}}>Make a Ruckus!</Link>
            )}
            <div style={{marginBottom: 15}}>
                {token && (
                    <>
                        <Link to={`/private`} style={{margin: 5}}>My Stuff</Link>
                        <Link to={`/public`} style={{margin: 5}}>Everyone's Stuff</Link>
                    </>
                )}
            </div>
        </div>
    )
}

const Masthead = () => {
    const {token, logout, count} = useContext(UserContext)

    

    const redirect = () => {
        () => logoutRedirect
        logout()
    }

    return (
        <div style={{padding: 15}}className='masthead-banner'>
            <div style={{padding: 5}}className='masthead--title--card'>
                <h1>Rock The Vote!!</h1>
            </div>
            {token && (
            <>
                <br />
                <button onClick={redirect}>Logout</button>
            </>
        )}
        </div>
    )
}

const AuthPage = () => {
    return (
        <>
                {NavBar()}
                <Auth />
        </>
    )
}



const NewPost = () => {
    return (
        <>
            {NavBar()}
                
             {/* NewPost Form */}
                    {/* -form */}
                <form >
                        {/* -two inputs */}
                    <div style={{padding: 5}} className='post--stats'>
                            {/* -title */}
                        <input style={{margin: 5}} type="text" placeholder='Post Title'/>
                            {/* -poster name */}
                        {/* <input style={{margin: 5}} type="text" placeholder='User Name'/> */}
                    </div>
                        {/* -textarea */}
                    <div>
                        {/* -content */}
                        <textarea style={{marginTop: 15}} 
                        name="content" 
                        placeholder={`What post are we Rockin' today?`}
                        cols="30" 
                        rows="10"
                        />
                    </div>
                        {/* -submit button */}
                    <button>Submit Post</button>
                {/* -/form */}
                </form>
                {Footer()}
        </>
    )
}

const HomePage = () => {
    
    const {token} = useContext(UserContext)

    const {listOfIssues, getPublicIssueList, getAllComments, count} = useContext(IssueCommentContext)
    
    useEffect(() => {
        getPublicIssueList(),
        getAllComments()
    }, [count])

    const mostUpVotes = listOfIssues.sort((a, b) => b.likedUsers.length - a.likedUsers.length) 

    console.log(mostUpVotes)
    
    const publicListing = mostUpVotes.map(issue => (
            <div key={issue._id}>
                <Link style={{fontSize: 25}}to={`/issuePosts/${issue._id}`} >{issue.title}</Link>
                <br />
                <img style={{width: 500}}src={issue.imgUrl} />
                <br />
                <p>{issue.content}</p>
            </div>
        )
    )


    return(
        <>
            {NavBar()}
            {!token && (
                <Link to={`/`} style={{margin: 5}}>Ready to Rumble?</Link>
            )}
            <div>
                <h1 className='publicList--card'>
                    Current Issues:
                </h1>
                <ul>
                    {/* List of all user-generated issues */}
                    {publicListing}
                </ul>
            </div>
            {Footer()}
        </>
    )
}



export {Masthead, Footer, NavBar, AuthPage, HomePage, NewPost}