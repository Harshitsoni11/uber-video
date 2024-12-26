const userModel = require("../models/user.model");
const userService = require("../services/user.service");

const { validationResult } = require("express-validator");
const blacklisttokenModel=require('../models/blacklisttoken.model');

module.exports.registerUser = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  console.log(req.body);
  const { fullname, email, password } = req.body;

  const isUserAlreadyExists = await userModel.findOne({ email });
  if (isUserAlreadyExists) {
    return res
      .status(400)
      .json({ message: "User with this email already exists" });
  }
  const hashedPassword = await userModel.hashPassword(password);

  const user = await userService.createUser({
    firstname: fullname.firstname,
    lastname: fullname.lastname,
    email,
    password: hashedPassword,
  });

  const token = user.generateAuthToken();
  res.status(200).json({ token, user });
};

module.exports.loginUser=async (req,res,next)=>{
   const errors = validationResult(req);

   if (!errors.isEmpty()) {
     return res.status(400).json({ errors: errors.array() });
   }

   const {email,password}=req.body;
   //                                          find krnai pr password aayega
   const user=await userModel.findOne({email}).select('+password');
   if(!user){
      return res.status(401).json({message:"user not found"});
   }

   const isMatch=await user.comparePassword(password);
   if(!isMatch){
      return res.status(401).json({message:"Invalid credentials"});
   }
   const token=user.generateAuthToken();

   res.cookie('token',token);
   res.status(200).json({token,user});

}


module.exports.getUserProfile=async (req,res,next)=>{
    res.status(200).json(req.user);
}

module.exports.logoutUser=async (req,res,next)=>{
  console.log(req.cookies);
    res.clearCookie('token');
    const token=req.cookies.token|| req.headers.authorization.split(' ')[1] || req.headers['x-access-token'];
    await blacklisttokenModel.create({token});


    res.status(200).json({message:"Logout successful"});
}
