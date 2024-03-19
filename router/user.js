const express =require('express')

const router = express.Router();

 const {login,signup}= require('../controller/Auth')

 const {auth,isStudent,isAdmin}=require('../middleware/auth')

 router.post('/login',login);

 router.post('/signup',signup);
 

 // testing protected routes for single middleware
 router.get('/test',auth,(req,res)=>{
    res.json({
        success:true,
        message:"welcome to the protected Test page"
    });
 })

 // protected route
 router.get('/student',auth,isStudent,(req,res)=>{
    res.json({
        success:true,
        message:"welcome to the protected Student page"
    });

 });

 router.get('/admin',auth,isAdmin,(req,res)=>{
    res.json({
        success:true,
        message:"welcome to the protected Admin page"
    });
 })

 module.exports=router;