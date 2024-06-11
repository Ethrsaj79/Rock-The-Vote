const mongoose = require('mongoose')
const Schema = mongoose.Schema

// 'Issue' Schema
const issueSchema = new Schema({
    dateAndTimeMadeOn: {
        type: Date,
        default: Date.now
    },
    title:{
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    imgUrl:{
        type: String,
        required: true
    },
    content:{
        type: String,
        required: true
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    likedUsers: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    dislikedUsers: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
})

module.exports = mongoose.model("Issue", issueSchema)