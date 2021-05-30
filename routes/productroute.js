const express = require('express')
const requests = require('../controller/productcontroller')

const productrouter = express.Router();

productrouter.get('/products' , requests.getALLData);
productrouter.post('/add_product' , requests.addNewProduct)
productrouter.delete('/delete_product' , requests.deleteProduct)


module.exports = productrouter;