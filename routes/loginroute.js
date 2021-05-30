const express =  require('express');
const request = require('../controller/logincontroller')

const loginrouter = express.Router();
loginrouter.post('/api/loginUser', request.getUserLoggedIn);

module.exports = loginrouter;