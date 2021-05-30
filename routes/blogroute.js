const express = require('express');
const request = require('../controller/blogcontroller');


const router = express.Router();


router.post('/api/create-post' , request.AddNewPost);
router.get('/api/posts' , request.GetAllPosts)
router.post('/api/getpostdata' , request.GetSpecifiedPost)
router.get('/api/getlastrecordid' , request.getIdOfLastInsertedPost)
router.post('/api/updatepoststatus' , request.updateStatusOfPost)

module.exports = router ; 