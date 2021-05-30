const express = require('express');
const commentrequest = require('../controller/commetcontroller')


const commentroute = express.Router();


commentroute.post('/api/addNewComment',commentrequest.AddCommentByUserOnPosts)
commentroute.post('/api/getAllComments', commentrequest.GetAllCommentsByPostId)

module.exports = commentroute ;