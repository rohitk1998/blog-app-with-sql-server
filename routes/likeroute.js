const express = require('express');
const likerequest = require('../controller/likescontroller')


const likeroute = express.Router();



likeroute.post('/api/liked' , likerequest.addLikeByPost)
likeroute.post('/api/getLikesbyPost' , likerequest.getAllLikesByPostId)
likeroute.delete('/api/deltelike',likerequest.deleteLikeByUser)



module.exports = likeroute ; 