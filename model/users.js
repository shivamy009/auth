const mongooge = require('mongoose')

const userSchema = new mongooge.Schema({
    name:{
    type:String,
    required:true,
    trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true,

    },
    role:{
        type:String,
        enum:["Admin","Student","Visitor"]
    }
})

module.exports=mongooge.model("user",userSchema);