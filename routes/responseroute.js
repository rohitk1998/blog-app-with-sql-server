const express = require('express')

const responserequest = require('../controller/responsecontroller')


const responseroute = express.Router();



responseroute.post('/api/addresponsetocomment',responserequest.AddNewResponseToCommentByUser);
responseroute.post('/api/getallresponsesonUserComment',responserequest.GetAllResponseByCommentId);

module.exports = responseroute ; 