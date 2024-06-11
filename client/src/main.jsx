import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter as Router } from 'react-router-dom'
import {IssueCommentContextProvider} from '../src/components/context/IssueCommentContext.jsx'
import { UserContextProvider } from './components/context/UserContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserContextProvider>
      <IssueCommentContextProvider>
        <Router>
          <App />
        </Router>
      </IssueCommentContextProvider>
    </UserContextProvider>
  </React.StrictMode>,
)
