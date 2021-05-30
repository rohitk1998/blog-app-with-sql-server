const express =  require('express');
const controller = require('../controller/controller')

const router = express.Router();
router.get('/api/getAllUser', controller.getAllUser);
router.post('/api/addNewUser' , controller.addNewUser);
router.put('/api/updateUser',controller.updateData);
router.delete('/api/deleteUser' , controller.deleteData);

module.exports = router;