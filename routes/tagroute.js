const express = require('express')
const tagrequests = require('../controller/tagcontroller')


const tagrouter = express.Router();


tagrouter.post('/api/AddNewPostTagByUser',tagrequests.AddPostTags)
tagrouter.get('/api/GetAllPostTags',tagrequests.GetAllTags)
tagrouter.post('/api/GetTagsRelatedPostByTag' , tagrequests.GetTagsRelatedPostByTag)



module.exports = tagrouter ; 