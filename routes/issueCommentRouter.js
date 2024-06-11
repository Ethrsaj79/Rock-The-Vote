const express = require("express")
const issueCommentRouter = express.Router()
const morgan = require("morgan")
const Issue = require('../models/Issue.js')
const Comment = require('../models/Comment.js')
const User = require('../models/User.js')

issueCommentRouter.use(express.json())
issueCommentRouter.use(morgan('dev'))


// Get all (Public Forum) issues for list of issues
issueCommentRouter.get('/publicIssues', async (req, res, next) => {
    try {
        const issueList = await Issue.find()
        res.status(200).send(issueList)
    } catch (err) {
        res.status(500)
        return next(err)
    }
})

// Get all (Public Forum) issues for list of issues
issueCommentRouter.get('/commentList', async (req, res, next) => {
    try {
        const listOfComments = await Comment.find()
        res.status(200).send(listOfComments)
    } catch (err) {
        res.status(500)
        return next(err)
    }
})

// Public Single Issue Page
issueCommentRouter.get('/issuePosts/:issueId', async (req, res, next) => {
    try {
        const issuePost = req.params.issueId
        const foundIssue = await Issue.find(issue => issue._id === issuePost.issueId)
        res.status(200).send(foundIssue)
    } catch (err) {
        res.status(500)
        return next(err)
    }
})

// Get all issues (Private List) made by a single user for their own page
issueCommentRouter.get('/issues/:userId', async (req, res, next) => {
    try {
        req.body.user = req.auth._id
        const userIssues = await Issue.find({user: req.auth._id})
        res.status(200).send(userIssues)
    } catch (err) {
        res.status(500)
        return next(err)
    }
})
// Get all comments (Public List) for a single issue
issueCommentRouter.get('/issues/publicComments/:issueId', async (req, res, next) => {
    try {
        const issueId = req.params.issueId
        const issueCommentList = await Comment.find(issue => issue._id === issueId.issueId)
        res.status(200).send(issueCommentList)
    } catch (err) {
        res.status(500)
        return next(err)
    }
})
// Make a new Issue post
issueCommentRouter.post('/newIssue', async (req, res, next) => {
    try {   
        const newIssue = new Issue(req.body)
        const savedIssue = await newIssue.save()
        res.status(201).send(savedIssue)
    } catch (err) {
        res.status(500)
        return next(err)
    }
})
// Upvote a Post
issueCommentRouter.put('/issues/upVote/:issueId', async (req, res, next) => {
    try {   
        req.body.user = req.auth._id
        console.log('Received request to downvote issue:', req.params.issueId);
        console.log('Current user ID:', req.auth._id);
        const issueToLike = await Issue.findOneAndUpdate(
            { _id: req.params.issueId },
            {
                $addToSet: { likedUsers: req.auth._id },
                $pull: { dislikedUsers: req.auth._id }
            },
            { new: true }
        )
        res.send(issueToLike)
    } catch (err) {
        res.status(500)
        return next(err)
    }
})
// Downvote a Post
issueCommentRouter.put('/issues/downVote/:issueId', async (req, res, next) => {
    try {   
        req.body.user = req.auth._id
        console.log('Received request to downvote issue:', req.params.issueId);
        console.log('Current user ID:', req.auth._id);

        const issueToDislike = await Issue.findOneAndUpdate(
            { _id: req.params.issueId },
            {
                $addToSet: { dislikedUsers: req.auth._id },
                $pull: { likedUsers: req.auth._id }
            },
            { new: true }
        )
        const dislikedIssue = issueToDislike
        console.log(dislikedIssue)
        res.status(200).send(issueToDislike)
        // // Ensure req.auth exists

        // if (!req.auth || !req.auth._id) {
        //     return res.status(401).send('Unauthorized');
        // }

        // req.body.user = req.auth._id;
        // console.log('Received request to downvote issue:', req.params.issueId);
        // console.log('Current user ID:', req.auth._id);

        // const issueToDislike = await Issue.findOneAndUpdate(
        //     { _id: req.params.issueId },
        //     {
        //         // $inc: { downVoteUsers: '1' },
        //         $addToSet: { downVoteUsers: req.auth._id },
        //         $pull: { upVotedUsers: req.auth._id }
        //     },
        //     { new: true }
        // );

        // if (!issueToDislike) {
        //     return res.status(404).send('Issue not found');
        // }

        // res.status(200).send(issueToDislike);
    } catch (err) {
        res.status(500)
        return next(err)
    }
})
// Make a new comment for an issue
issueCommentRouter.post('/newComment', async (req, res, next) => {
    try {
        const newComment = new Comment(req.body)
        const savedComment = await newComment.save()
        res.status(201).send(savedComment)
    } catch (err) {
        res.status(500)
        return next(err)
    }
})
// Let a user change an Issue they've made
issueCommentRouter.put('/issueUpdate/:issueId', async (req, res, next) => {})
// Let a user change one of their comments on an issue post
issueCommentRouter.put('/updatedComment/:commentId', async (req, res, next) => {})
// Let a user delete a post they made (plus all of the comments made on that Issue)
issueCommentRouter.delete('/deleteIss/:issueId', async (req, res, next) => {
    try {
        const issueToDelete = await Issue.findOneAndDelete(req.body)
        res.status(200).send(issueToDelete)   
    } catch (err) {
        res.status(500)
        return next(err)
    }
})
// Let a user delete their comment on an Issue post they commented on 
issueCommentRouter.delete('/deleteCom/:commentId', async (req, res, next) => {
    try {
        const commentToDelete = await Comment.findOneAndDelete(req.body)
        res.status(200).send(commentToDelete)
    } catch (err) {
        res.status(500)
        return next(err)
    }
})

module.exports = issueCommentRouter