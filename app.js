const express = require('express')

const bodyParser = require('body-parser')
const cors = require('cors')
const fs = require('fs')
const path = require('path')
const morgan = require('morgan')
const router = require('./routes/route')
const productrouter = require('./routes/productroute')
const loginrouter = require('./routes/loginroute')
const postrouter = require('./routes/blogroute')
const likeroute = require('./routes/likeroute')
const commentroute = require('./routes/commentroute')
const responseroute = require('./routes/responseroute')
const tagrouter = require('./routes/tagroute')
const app = express()

app.use(cors())

// const swaggerUi = require('swagger-ui-express'),
// swaggerDocument = require('./swagger.json');



// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(morgan('dev'))

// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(path.join(__dirname, '/logs/access.log'), { flags: 'a' })
 
// setup the logger
app.use(morgan('combined', { stream: accessLogStream }))
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(router)
app.use(productrouter)
app.use(loginrouter)
app.use(postrouter);
app.use(likeroute);
app.use(commentroute);
app.use(responseroute);
app.use(tagrouter);


const port = 3000

app.listen(process.env.PORT || port , (err) => {
  if(err)
console.log('Unable to start the server!')
else
console.log('Server started running on : ' + port)
})