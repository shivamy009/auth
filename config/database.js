const mongoose = require('mongoose')

require('dotenv').config();

exports.connect=()=>{
    mongoose.connect(process.env.MONGODB_URL).then(()=>{
        console.log( "db connected succsse")
    }).catch((err)=>{
        console.log("db connecting issue")
        console.error(err);
        process.exit(1);
    })
}

