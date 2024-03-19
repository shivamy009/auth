const express = require('express')
const app = express()

require('dotenv').config(); 

 let port=4000;

app.use(express.json())

const connect= require('./config/database')

connect.connect();

// route import

const user = require('./router/user')
app.use('/api/v1',user)

// activate

app.listen(port,()=>{
    console.log("App is listening")
})

