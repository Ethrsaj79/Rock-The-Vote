const express = require('express') 
const morgan = require('morgan') 
const mongoose = require('mongoose') 
require('dotenv').config()
const app = express()
const {expressjwt} = require('express-jwt')

process.env.SQWEQWET


app.use(express.json())
app.use(morgan('dev'))

app.get("/", (req, res) => {
    res.send(`Welcome to the server`)
})
// Connect to Database
const connectedDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://storytellingsag3:taNbU6jYr5IkycE1@cluster0.nygw1e7.mongodb.net/politicsblog`)
        console.log(`Connected to Database`)
    } catch (err) {
        console.log(err)
    }
}

connectedDB()

// Routes
/* Authorization/User Creation route */   
app.use('/api/auth', require("./routes/authRouter.js"))
// Token Generation/Authorization route 
app.use('/api/rock-the-vote-main', expressjwt({ secret: `${process.env.SQWEQWET}`, algorithms: [`HS256`]})) 
/* Issue/Comment route */                 
app.use('/api/rock-the-vote-main/blog', require("./routes/issueCommentRouter.js"))  

// Error Handling
app.use((err, req, res, next) => {
    console.log()
    return res.send({errMsg: err.message})
})

app.listen(9000, () => {
    console.log("The server is running on Port 9000!")
})