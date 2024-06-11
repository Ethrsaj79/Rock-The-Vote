const express = require("express")
const authRouter = express.Router()
const morgan = require("morgan")
const User = require('../models/User.js')
const jwt = require('jsonwebtoken')

authRouter.use(express.json())
authRouter.use(morgan('dev'))

authRouter.post('/signup', async (req, res, next) => {
    try {
        const userCheck = await User.findOne({ username: req.body.username, password: req.body.password })
        // // const userCheck = await User.findOne({ username: 'f' })
        if(userCheck){
            res.status(403)
            throw new Error('Account with given information exists, please try again.')
        }
        if(userCheck){
            res.status(403)
            throw new Error('Account with saved information exists, please login or try again.')
        }
        const newUser = new User(req.body) 
        const savedUser = await newUser.save()
        const token = jwt.sign(savedUser.toObject(), `${process.env.SQWEQWET}`)        
        return res.status(201).send({token, user: savedUser})
    } catch (err) {
        res.status(500)
        return next(err)
    }
})
authRouter.post('/login', async (req, res, next) => {
    try {
        const userCheck = await User.findOne({username: req.body.username.toLowerCase()})
        if(!userCheck){
            res.status(401)
            throw new Error(`No records found matching the given Username or Password, please try again.`)
        }
        const token = jwt.sign(userCheck.toObject(), `${process.env.SQWEQWET}`)
        res.status(200).send({token, user: userCheck})
    } catch (err) {
        res.status(500)
        return next(err)
    }
})

module.exports = authRouter