const bcrypt = require('bcrypt')
const users = require('../model/users')
const jwt = require('jsonwebtoken')
require('dotenv').config();

exports.signup= async (req,res)=>{
    try{
        const {name,email,password,role} = req.body;

        // check if user already resisterred

        const existinusers= await users.findOne({email})

        if(existinusers){
            return res.status(400).json({
                success:false,
                message:"user already exist"
            })
        }
        // secure password
        let hashpassword;

        try{

            hashpassword= await bcrypt.hash(password,10);


        }
        catch(err){
             return res.status(500).json({
                success:false,
                message:"error in hasing password"

             });
        }
        // create entry

        const user = await users.create({
             name,email,password:hashpassword,role
        })

        return res.status(200).json({
            success:true,
            message:"user created succesfully"
        });
    }
    catch(err){
     console.error(err)

     return res.status(400).json({

        success:false,
        message:"user cant be resistered , please try again letter"

     })


    }
}

// login

exports.login= async (req,res)=>{
    try{
         // data fetch
         const {email,password}=req.body;

         // validation on email and password

         if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"please fill all the detail carefully"

            })
         }

         // check user is present

         let user = await users.findOne({email})

         //if not a resistered user

         if(!user){
            return res.status(401).json({
                success:false,
                message:"user is not resistered"
            })
         }

         const payload ={
            email:user.email,
            id:user._id,
            role:user.role
         };

         // verify password and generate a jwt token

         if(await bcrypt.compare(password,user.password)){
            // password match
            let token = jwt.sign(payload,
                                process.env.JWT_SECRET,{
                                   expiresIn:"2h",
                                });
                
                user = user.toObject();

                user.token=token;
                user.password=undefined;

                const Option={
                    expiresIn: new Date(Date.now+3*24*60*60*1000),
                    httpOnly:true
                    
                }

                res.cookie("token",token,Option).status(200).json({
                    success:true,
                    token,
                    user,
                    message:"User logged in success"
                })
                            
            
            }
         
         else{
            // password do not match
            return res.status(405).json({
                success:false,
                message:"password incorrect"
            })
         }
    }
    catch(err){
           console.log(err)
           return res.status(500).json({
            success:false,
            message:"try again letter",
           })
    }
}