import { useContext, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import {
  Masthead,
  AuthPage, 
  HomePage,
} from './components/Structure/Structure_Public'
import './App.css'
import { UserContext } from './components/context/UserContext'
import { ProtectedRoute } from './components/ProtectedRoute'
import { NewIssueForm } from './components/Structure/NewIssueForm'
import {IssueDetails} from './components/Issue Components/IssueDetails'
import { UserList } from './components/Structure/UserList'

function App() {
  const { token } = useContext(UserContext)

  return (
    <>
      <Masthead/>

      <Routes>
        {/* Login/Non-token bearers Auto-Redirect page*/}
        <Route path={'/'} element={<AuthPage/>}/>
        {/* Public List of all user-generated issue posts */}
        <Route path={'/public'} element={<ProtectedRoute token={token}>
          <HomePage/>
        </ProtectedRoute>}/>
        {/* Create a new Post */}
        <Route path={'/issuePosts/:issueId'} element={<IssueDetails/>}/>
        <Route path={'/newpost'} element={<NewIssueForm/>}/>
        {/* Private List of user-only generated posts */}
        <Route path={'/private'} element={<UserList/>}/>
      </Routes>
    </>
  )
}

export default App