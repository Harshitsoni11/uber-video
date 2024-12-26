const userModel=require('../models/user.model');
const bcrypt=require('bcrypt');
const jwt = require('jsonwebtoken');
const blacklisttokenModel=require('../models/blacklisttoken.model');
const captionModel=require("../models/caption.model");

module.exports.authUser=async (req,res,next)=>{

    const token=req.cookies.token || req.headers.authorization?.split(' ')[1] || req.headers['x-access-token']; // Express headers are auto converted to lowercase
    // console.log(token,'tokkkkkkkkkkkkkkk');
    if(!token){
        
        return res.status(401).json({message:"Unauthorized"});
    }

    const blacklistedToken=await blacklisttokenModel.findOne({token});
    if(blacklistedToken){
       
        return res.status(401).json({message:"Unauthorized"});
    }

    try{
        // console.log('whyyyyyyyyyyy');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // console.log(decoded,"decoded");
        const user = await userModel.findById(decoded._id);
        // console.log(user,"uuuuu");
        req.user=user;
        next();
    }catch(err){
        return res.status(401).json({message:"Unauthorized"});
    }

}

module.exports.authCaption=async (req,res,next)=>{

    const token=req.cookies.token || req.headers.authorization?.split(' ')[1] || req.headers['x-access-token']; // Express headers are auto converted to lowercase

    if(!token){
        return res.status(401).json({message:"Unauthorized"});
    }

    const blacklistedToken=await blacklisttokenModel.findOne({token});
    if(blacklistedToken){
        
        return res.status(401).json({message:"Unauthorized"});
    }
    try{
        console.log('heloo');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('hiii');
        const caption = await captionModel.findById(decoded._id);
       
        req.caption=caption;
        next();
    }catch(err){
        console.log(err);
        return res.status(401).json({message:"Unauthorized"});
    }
}