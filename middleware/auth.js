// auth ,isStudent,isAdmin

const jwt = require('jsonwebtoken')

require('dotenv').config();

exports.auth=(req,res,next)=>{
    try{
        // extract jwt token
        // pending - other way to fetch token

        // console.log( "cookie",req.cookie.token)
        // console.log( "body",req.body.token)
        const token = req.body.token || req.cookie.token || req.header("Autharization").replace("Bearer","");


        if(!token){
            return res.status(400).json({
                success:false,
                message:"token not found"
            })
        }

        // verify the token

        try{
            const payload = jwt.verify(token,process.env.JWT_SECRET);
            console.log( payload)
            req.user=payload;
        }
        catch(err){
           console.log(err)

           return res.status(401).json({
            success:false,
            message:"can't decode token"
           });
        }
       
        next();
    }
    catch(err){
      console.log(err)

      return res.status(401).json({
        success:false,
        message:"something went wrong"
      })
    }
}

exports.isStudent=(req,res,next)=>{
    try{
        if(req.user.role!=="Student"){
            return res.status(401).json({
                success:false,
                message:"This is protected for student "
            });
        }
        next();
    }
    catch(err){
        console.log(err)

        return res.status(501).json({
          success:false,
          message:"user role is not matching",
        })
    }
}

exports.isAdmin=(req,res,next)=>{
    try{
        if(req.user.role!=="Admin"){
            return res.status(401).json({
                success:false,
                message:"This is protected for admin "
            });
        }
        next();
    }
    catch(err){
        console.log(err)

        return res.status(501).json({
          success:false,
          message:"user role is not matching",
        })
    }
}