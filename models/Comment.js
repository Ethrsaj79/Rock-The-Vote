const mongoose = require('mongoose')
const Schema = mongoose.Schema

// 'Comment' Schema
const commentSchema = new Schema({
    dateAndTimeMadeOn: {
        type: Date,
        default: Date.now
    },
    content: {
        type: String,
        required: true
    },
    issue: {
        type: Schema.Types.ObjectId,
        ref: 'Issue'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
})

module.exports = mongoose.model("Comment", commentSchema)